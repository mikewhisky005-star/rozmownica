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
        return
