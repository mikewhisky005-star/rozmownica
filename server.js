// Rozmównica – samodzielny serwer (bez zależności zewnętrznych)
// Uruchomienie: node server.js
// Domyślnie: http://localhost:3000

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const url = require("url");

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data.json");
const PUBLIC_DIR = path.join(__dirname, "public");

// ---------- trwałe dane na dysku ----------
function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    return { users: {}, rooms: [], messages: {} };
  }
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (e) {
    console.error("Błąd odczytu data.json, startuję z pustą bazą:", e.message);
    return { users: {}, rooms: [], messages: {} };
  }
}
let data = loadData();
let saveTimer = null;
function saveData() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  }, 50);
}

// ---------- hasła ----------
function hashPassword(password, salt) {
  salt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256").toString("hex");
  return { hash, salt };
}
function verifyPassword(password, salt, hash) {
  const check = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256").toString("hex");
  return check === hash;
}

// ---------- sesje (token w pamięci) ----------
const sessions = new Map(); // token -> username
function makeToken() {
  return crypto.randomBytes(24).toString("hex");
}

// ---------- pomocnicze HTTP ----------
function sendJSON(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > 1_000_000) { req.destroy(); reject(new Error("Body too large")); return; }
      chunks.push(c);
    });
    req.on("end", () => {
      if (!chunks.length) return resolve({});
      try { resolve(JSON.parse(Buffer.concat(chunks).toString("utf8"))); }
      catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}
function getUserFromToken(token) {
  const username = sessions.get(token);
  if (!username) return null;
  const rec = data.users[username];
  if (!rec) return null;
  return { username, rec };
}
function requireAuth(req) {
  const auth = req.headers["authorization"] || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return null;
  return getUserFromToken(token);
}

// ---------- statyczne pliki ----------
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};
function serveStatic(req, res, pathname) {
  let filePath = pathname === "/" ? "/index.html" : pathname;
  filePath = path.join(PUBLIC_DIR, filePath);
  if (!filePath.startsWith(PUBLIC_DIR)) { res.writeHead(403); res.end(); return; }
  fs.readFile(filePath, (err, content) => {
    if (err) { res.writeHead(404); res.end("Not found"); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(content);
  });
}

// ---------- API ----------
async function handleApi(req, res, pathname) {
  try {
    if (pathname === "/api/register" && req.method === "POST") {
      const { username, password } = await readBody(req);
      if (!username || !password || username.length < 2 || password.length < 4) {
        return sendJSON(res, 400, { error: "Podaj nazwę (min. 2 znaki) i hasło (min. 4 znaki)." });
      }
      if (data.users[username]) return sendJSON(res, 400, { error: "Ta nazwa jest zajęta." });
      const { hash, salt } = hashPassword(password);
      const isFirst = Object.keys(data.users).length === 0;
      data.users[username] = {
        passwordHash: hash, salt,
        status: isFirst ? "approved" : "pending",
        isAdmin: isFirst,
        createdAt: Date.now(),
      };
      if (isFirst && data.rooms.length === 0) {
        data.rooms.push({ id: "ogolny", name: "Ogólny", topic: "Rozmowy na każdy temat", createdAt: Date.now() });
      }
      saveData();
      const token = makeToken();
      sessions.set(token, username);
      return sendJSON(res, 200, { token, username, isAdmin: isFirst, status: data.users[username].status });
    }

    if (pathname === "/api/login" && req.method === "POST") {
      const { username, password } = await readBody(req);
      const rec = data.users[username];
      if (!rec || !verifyPassword(password, rec.salt, rec.passwordHash)) {
        return sendJSON(res, 401, { error: "Błędna nazwa użytkownika lub hasło." });
      }
      const token = makeToken();
      sessions.set(token, username);
      return sendJSON(res, 200, { token, username, isAdmin: rec.isAdmin, status: rec.status });
    }

    // wszystko poniżej wymaga tokenu
    const auth = requireAuth(req);
    if (!auth) return sendJSON(res, 401, { error: "Brak autoryzacji. Zaloguj się ponownie." });
    const { username, rec } = auth;

    if (pathname === "/api/state" && req.method === "GET") {
      return sendJSON(res, 200, {
        username, isAdmin: rec.isAdmin, status: rec.status,
        rooms: data.rooms,
        users: rec.isAdmin ? Object.entries(data.users).map(([n, u]) => ({
          username: n, status: u.status, isAdmin: u.isAdmin,
        })) : undefined,
      });
    }

    if (pathname === "/api/messages" && req.method === "GET") {
      if (rec.status !== "approved") return sendJSON(res, 403, { error: "Konto nie jest zatwierdzone." });
      const q = url.parse(req.url, true).query;
      const room = q.room;
      return sendJSON(res, 200, { messages: (data.messages[room] || []).slice(-300) });
    }

    if (pathname === "/api/messages" && req.method === "POST") {
      if (rec.status !== "approved") return sendJSON(res, 403, { error: "Konto nie jest zatwierdzone." });
      const { room, text } = await readBody(req);
      if (!room || !text || !text.trim()) return sendJSON(res, 400, { error: "Brak treści wiadomości." });
      if (!data.rooms.find(r => r.id === room)) return sendJSON(res, 404, { error: "Pokój nie istnieje." });
      if (!data.messages[room]) data.messages[room] = [];
      data.messages[room].push({ user: username, text: text.trim(), ts: Date.now() });
      data.messages[room] = data.messages[room].slice(-300);
      saveData();
      return sendJSON(res, 200, { ok: true });
    }

    // ---- admin ----
    if (pathname === "/api/admin/status" && req.method === "POST") {
      if (!rec.isAdmin) return sendJSON(res, 403, { error: "Tylko administrator." });
      const { targetUsername, status } = await readBody(req);
      if (!data.users[targetUsername]) return sendJSON(res, 404, { error: "Brak takiego użytkownika." });
      if (data.users[targetUsername].isAdmin) return sendJSON(res, 400, { error: "Nie można zmienić statusu administratora." });
      data.users[targetUsername].status = status;
      saveData();
      return sendJSON(res, 200, { ok: true });
    }

    if (pathname === "/api/admin/room" && req.method === "POST") {
      if (!rec.isAdmin) return sendJSON(res, 403, { error: "Tylko administrator." });
      const { name, topic } = await readBody(req);
      if (!name || !name.trim()) return sendJSON(res, 400, { error: "Podaj nazwę pokoju." });
      const id = name.toLowerCase().replace(/[^a-z0-9ąćęłńóśźż]+/gi, "-").replace(/^-+|-+$/g, "") + "-" + Date.now().toString(36).slice(-4);
      data.rooms.push({ id, name: name.trim(), topic: (topic || "").trim(), createdAt: Date.now() });
      saveData();
      return sendJSON(res, 200, { ok: true, id });
    }

    if (pathname === "/api/admin/room" && req.method === "DELETE") {
      if (!rec.isAdmin) return sendJSON(res, 403, { error: "Tylko administrator." });
      const { roomId } = await readBody(req);
      data.rooms = data.rooms.filter(r => r.id !== roomId);
      delete data.messages[roomId];
      saveData();
      return sendJSON(res, 200, { ok: true });
    }

    sendJSON(res, 404, { error: "Nieznana ścieżka API." });
  } catch (err) {
    console.error(err);
    sendJSON(res, 500, { error: "Błąd serwera: " + err.message });
  }
}

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;
  if (pathname.startsWith("/api/")) {
    handleApi(req, res, pathname);
  } else {
    serveStatic(req, res, pathname);
  }
});

server.listen(PORT, () => {
  console.log("");
  console.log("  Rozmównica działa: http://localhost:" + PORT);
  console.log("  Dane zapisywane w: " + DATA_FILE);
  console.log("  Aby udostępnić w internecie, wystaw ten serwer na publicznym adresie (np. VPS, Render, Railway) i podaj ten link innym.");
  console.log("");
});
