<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rozmównica</title>
<style>
  :root{
    --bg:#12151a; --panel:#181c22; --panel2:#1f242b; --line:#2a2f37;
    --text:#e7e9ec; --muted:#8a919c; --accent:#c9a86a; --accent-dim:#7a6a45;
    --danger:#c26a5b; --ok:#6a9c7a; --radius:10px;
  }
  *{box-sizing:border-box;}
  html,body{height:100%;}
  body{margin:0;background:var(--bg);color:var(--text);font-family:"Iowan Old Style","Georgia",serif;display:flex;}
  #app{width:100%;height:100vh;display:flex;flex-direction:column;}
  .brand{padding:14px 20px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;background:var(--panel);}
  .brand h1{font-size:17px;font-weight:600;letter-spacing:.04em;margin:0;}
  .brand h1 span{color:var(--accent);}
  .who{font-size:12.5px;color:var(--muted);font-family:ui-sans-serif,system-ui,sans-serif;display:flex;gap:10px;align-items:center;}
  .who b{color:var(--text);}
  .btn{font-family:ui-sans-serif,system-ui,sans-serif;font-size:12.5px;border:1px solid var(--line);background:var(--panel2);color:var(--text);padding:6px 12px;border-radius:7px;cursor:pointer;}
  .btn:hover{border-color:var(--accent-dim);}
  .btn.primary{background:var(--accent);border-color:var(--accent);color:#1a1610;font-weight:600;}
  .btn.primary:hover{opacity:.9;}
  .btn.small{padding:3px 9px;font-size:11.5px;}
  .btn.danger{color:var(--danger);border-color:var(--danger);background:transparent;}
  .btn.ok{color:var(--ok);border-color:var(--ok);background:transparent;}
  .center{flex:1;display:flex;align-items:center;justify-content:center;padding:20px;}
  .card{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);padding:32px;width:100%;max-width:380px;}
  .card h2{margin:0 0 4px;font-size:20px;}
  .card p.sub{color:var(--muted);font-size:13px;margin:0 0 20px;font-family:ui-sans-serif,system-ui,sans-serif;}
  .tabs{display:flex;gap:6px;margin-bottom:18px;}
  .tabs button{flex:1;font-family:ui-sans-serif,system-ui,sans-serif;padding:8px;border-radius:7px;border:1px solid var(--line);background:transparent;color:var(--muted);cursor:pointer;font-size:13px;}
  .tabs button.active{background:var(--panel2);color:var(--text);border-color:var(--accent-dim);}
  label{display:block;font-size:12px;color:var(--muted);margin:12px 0 4px;font-family:ui-sans-serif,system-ui,sans-serif;}
  input[type=text],input[type=password]{width:100%;padding:9px 10px;border-radius:7px;border:1px solid var(--line);background:var(--panel2);color:var(--text);font-size:14px;font-family:ui-sans-serif,system-ui,sans-serif;}
  input:focus{outline:1px solid var(--accent-dim);}
  .msg{font-size:12.5px;margin-top:10px;font-family:ui-sans-serif,system-ui,sans-serif;}
  .msg.err{color:var(--danger);}
  .msg.ok{color:var(--ok);}
  .submit{width:100%;margin-top:18px;padding:10px;}
  .note{font-size:11px;color:var(--muted);margin-top:16px;line-height:1.5;font-family:ui-sans-serif,system-ui,sans-serif;}
  .layout{flex:1;display:flex;min-height:0;}
  .sidebar{width:230px;border-right:1px solid var(--line);background:var(--panel);display:flex;flex-direction:column;}
  .sidebar h3{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin:16px 16px 8px;font-family:ui-sans-serif,system-ui,sans-serif;}
  .room-list{flex:1;overflow-y:auto;padding:0 8px;}
  .room-item{padding:9px 12px;border-radius:7px;cursor:pointer;font-size:14px;color:var(--text);margin-bottom:2px;}
  .room-item .topic{display:block;font-size:11px;color:var(--muted);font-family:ui-sans-serif,system-ui,sans-serif;}
  .room-item:hover{background:var(--panel2);}
  .room-item.active{background:var(--panel2);border-left:2px solid var(--accent);}
  .chat-col{flex:1;display:flex;flex-direction:column;min-width:0;}
  .chat-head{padding:14px 20px;border-bottom:1px solid var(--line);}
  .chat-head h2{margin:0;font-size:16px;}
  .chat-head p{margin:2px 0 0;font-size:12px;color:var(--muted);font-family:ui-sans-serif,system-ui,sans-serif;}
  .messages{flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:12px;}
  .bubble{max-width:70%;}
  .bubble .meta{font-size:11px;color:var(--muted);margin-bottom:2px;font-family:ui-sans-serif,system-ui,sans-serif;}
  .bubble .meta b{color:var(--accent);}
  .bubble .text{background:var(--panel2);padding:8px 12px;border-radius:9px;font-size:14.5px;line-height:1.4;white-space:pre-wrap;word-break:break-word;}
  .bubble.mine .text{background:#2a2418;border:1px solid var(--accent-dim);}
  .bubble.mine{align-self:flex-end;}
  .composer{display:flex;gap:8px;padding:14px 20px;border-top:1px solid var(--line);}
  .composer input{flex:1;font-family:"Iowan Old Style","Georgia",serif;font-size:14.5px;}
  .empty{color:var(--muted);font-size:13px;text-align:center;margin-top:40px;font-family:ui-sans-serif,system-ui,sans-serif;}
  .admin-panel{width:300px;border-left:1px solid var(--line);background:var(--panel);overflow-y:auto;padding:16px;}
  .admin-panel h3{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--accent);margin:0 0 10px;font-family:ui-sans-serif,system-ui,sans-serif;}
  .admin-section{margin-bottom:22px;}
  .admin-row{display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--line);font-size:13px;font-family:ui-sans-serif,system-ui,sans-serif;}
  .admin-row .name{display:flex;flex-direction:column;}
  .admin-row .tag{font-size:10.5px;color:var(--muted);}
  .admin-row .actions{display:flex;gap:4px;}
  .new-room-form{display:flex;flex-direction:column;gap:6px;margin-bottom:10px;}
  .new-room-form input{font-family:ui-sans-serif,system-ui,sans-serif;font-size:13px;}
  .status-screen{flex:1;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;}
  .status-screen .box{max-width:380px;}
  .status-screen h2{margin-bottom:8px;}
  .status-screen p{color:var(--muted);font-size:13.5px;line-height:1.6;font-family:ui-sans-serif,system-ui,sans-serif;}
  ::-webkit-scrollbar{width:8px;}
  ::-webkit-scrollbar-thumb{background:var(--line);border-radius:4px;}
</style>
</head>
<body>
<div id="app"></div>
<script>
const POLL_MS = 3000;
const TOKEN_KEY = "rozmownica_token";

const el = (tag, attrs={}, ...children) => {
  const e = document.createElement(tag);
  for (const [k,v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  }
  children.flat().forEach(c => {
    if (c === null || c === undefined) return;
    e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return e;
};

function getToken(){ return localStorage.getItem(TOKEN_KEY); }
function setToken(t){ localStorage.setItem(TOKEN_KEY, t); }
function clearToken(){ localStorage.removeItem(TOKEN_KEY); }

async function api(path, opts={}){
  const headers = Object.assign({"Content-Type":"application/json"}, opts.headers||{});
  const token = getToken();
  if (token) headers["Authorization"] = "Bearer " + token;
  const res = await fetch(path, {
    method: opts.method || "GET",
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  let json = {};
  try{ json = await res.json(); }catch(e){}
  if (!res.ok) throw new Error(json.error || ("Błąd " + res.status));
  return json;
}

let state = {
  loggedIn: false, username:null, isAdmin:false, status:null,
  rooms: [], users: [], currentRoom: null, messages: [],
  authTab:"login", authError:"", authNotice:"",
};
let pollTimer = null;

async function loadState(){
  const s = await api("/api/state");
  state.username = s.username; state.isAdmin = s.isAdmin; state.status = s.status;
  state.rooms = s.rooms; if (s.users) state.users = s.users;
  if (!state.currentRoom && state.rooms.length) state.currentRoom = state.rooms[0].id;
}
async function loadMessages(){
  if (!state.currentRoom || state.status !== "approved") { state.messages = []; return; }
  const r = await api("/api/messages?room=" + encodeURIComponent(state.currentRoom));
  state.messages = r.messages;
}
function startPolling(){
  stopPolling();
  pollTimer = setInterval(async ()=>{
    try{ await loadState(); await loadMessages(); render(); }catch(e){ /* silent */ }
  }, POLL_MS);
}
function stopPolling(){ if (pollTimer) clearInterval(pollTimer); pollTimer = null; }

function render(){
  const app = document.getElementById("app");
  app.innerHTML = "";
  if (!state.loggedIn){ app.appendChild(renderAuth()); return; }
  if (state.status === "banned"){ app.appendChild(renderBanned()); return; }
  if (state.status === "pending"){ app.appendChild(renderPending()); return; }
  app.appendChild(renderMain());
}

function renderAuth(){
  const wrap = el("div", {class:"center"});
  const card = el("div", {class:"card"});
  card.appendChild(el("h2", {}, "Rozmównica"));
  card.appendChild(el("p", {class:"sub"}, "Pokoje rozmów na różne tematy."));
  const tabs = el("div", {class:"tabs"});
  tabs.appendChild(el("button", {class: state.authTab==="login"?"active":"", onclick:()=>{state.authTab="login";state.authError="";render();}}, "Zaloguj się"));
  tabs.appendChild(el("button", {class: state.authTab==="register"?"active":"", onclick:()=>{state.authTab="register";state.authError="";render();}}, "Załóż konto"));
  card.appendChild(tabs);
  const userInput = el("input", {type:"text", placeholder:"np. michal"});
  const passInput = el("input", {type:"password"});
  card.appendChild(el("label", {}, "Nazwa użytkownika"));
  card.appendChild(userInput);
  card.appendChild(el("label", {}, "Hasło"));
  card.appendChild(passInput);
  if (state.authError) card.appendChild(el("div",{class:"msg err"}, state.authError));
  if (state.authNotice) card.appendChild(el("div",{class:"msg ok"}, state.authNotice));

  const submit = el("button", {class:"btn primary submit", onclick: async ()=>{
    const username = userInput.value.trim();
    const password = passInput.value;
    state.authError = ""; state.authNotice = "";
    if (!username || !password){ state.authError = "Podaj nazwę i hasło."; render(); return; }
    try{
      const path = state.authTab === "register" ? "/api/register" : "/api/login";
      const r = await api(path, {method:"POST", body:{username, password}});
      setToken(r.token);
      state.loggedIn = true;
      await loadState();
      await loadMessages();
      startPolling();
      render();
    }catch(err){
      state.authError = err.message;
      render();
    }
  }}, state.authTab === "login" ? "Zaloguj się" : "Załóż konto");
  card.appendChild(submit);

  if (state.authTab === "register"){
    card.appendChild(el("div",{class:"note"}, "Jeśli to pierwsze konto na tym serwerze, zostaje ono automatycznie administratorem. Kolejne konta czekają na zatwierdzenie."));
  }
  wrap.appendChild(card);
  return wrap;
}

function renderPending(){
  const wrap = el("div",{class:"status-screen"});
  const box = el("div",{class:"box"});
  box.appendChild(el("h2",{},"Konto oczekuje na zatwierdzenie"));
  box.appendChild(el("p",{},"Administrator musi jeszcze zaakceptować Twoje konto. Wróć za chwilę."));
  box.appendChild(el("button",{class:"btn", style:"margin-top:16px", onclick: logout},"Wyloguj się"));
  wrap.appendChild(box);
  return wrap;
}
function renderBanned(){
  const wrap = el("div",{class:"status-screen"});
  const box = el("div",{class:"box"});
  box.appendChild(el("h2",{},"Brak dostępu"));
  box.appendChild(el("p",{},"To konto zostało zablokowane przez administratora."));
  box.appendChild(el("button",{class:"btn", style:"margin-top:16px", onclick: logout},"Wyloguj się"));
  wrap.appendChild(box);
  return wrap;
}
function logout(){
  stopPolling(); clearToken();
  state = {loggedIn:false, username:null, isAdmin:false, status:null, rooms:[], users:[], currentRoom:null, messages:[], authTab:"login", authError:"", authNotice:""};
  render();
}

function renderMain(){
  const root = el("div", {style:"display:flex;flex-direction:column;height:100vh;"});
  root.appendChild(el("div",{class:"brand"},
    el("h1",{}, "Rozmówn", el("span",{},"ica")),
    el("div",{class:"who"},
      el("b",{}, state.username),
      state.isAdmin ? el("span",{style:"color:var(--accent);font-size:11px;"},"ADMIN") : null,
      el("button",{class:"btn small", onclick: logout}, "Wyloguj")
    )
  ));
  const layout = el("div",{class:"layout"});

  const sidebar = el("div",{class:"sidebar"});
  sidebar.appendChild(el("h3",{},"Pokoje"));
  const roomList = el("div",{class:"room-list"});
  if (!state.rooms.length) roomList.appendChild(el("div",{class:"empty"},"Brak pokoi."));
  state.rooms.forEach(r=>{
    roomList.appendChild(el("div",{
      class: "room-item" + (r.id===state.currentRoom ? " active":""),
      onclick: async ()=>{ state.currentRoom = r.id; await loadMessages(); render(); }
    }, r.name, el("span",{class:"topic"}, r.topic||"")));
  });
  sidebar.appendChild(roomList);
  layout.appendChild(sidebar);

  const room = state.rooms.find(r=>r.id===state.currentRoom);
  const chatCol = el("div",{class:"chat-col"});
  if (room){
    chatCol.appendChild(el("div",{class:"chat-head"}, el("h2",{}, room.name), el("p",{}, room.topic||"")));
    const msgsWrap = el("div",{class:"messages", id:"messages-scroll"});
    if (!state.messages.length) msgsWrap.appendChild(el("div",{class:"empty"},"Brak wiadomości. Napisz pierwszą."));
    state.messages.forEach(m=>{
      const mine = m.user === state.username;
      msgsWrap.appendChild(el("div",{class:"bubble"+(mine?" mine":"")},
        el("div",{class:"meta"}, el("b",{},m.user), " · " + new Date(m.ts).toLocaleTimeString("pl-PL",{hour:"2-digit",minute:"2-digit"})),
        el("div",{class:"text"}, m.text)
      ));
    });
    chatCol.appendChild(msgsWrap);
    const input = el("input",{type:"text", placeholder:"Napisz wiadomość…"});
    const send = async ()=>{
      const text = input.value.trim();
      if (!text) return;
      input.value = "";
      try{
        await api("/api/messages", {method:"POST", body:{room: room.id, text}});
        await loadMessages();
        render();
        setTimeout(()=>{ const s=document.getElementById("messages-scroll"); if (s) s.scrollTop = s.scrollHeight; }, 0);
      }catch(e){ alert(e.message); }
    };
    input.addEventListener("keydown", (e)=>{ if (e.key==="Enter") send(); });
    chatCol.appendChild(el("div",{class:"composer"}, input, el("button",{class:"btn primary", onclick:send},"Wyślij")));
    setTimeout(()=>{ const s=document.getElementById("messages-scroll"); if (s) s.scrollTop = s.scrollHeight; }, 0);
  } else {
    chatCol.appendChild(el("div",{class:"empty", style:"margin-top:80px"}, state.isAdmin ? "Utwórz pierwszy pokój w panelu administratora." : "Brak pokoi. Poczekaj, aż administrator je utworzy."));
  }
  layout.appendChild(chatCol);
  if (state.isAdmin) layout.appendChild(renderAdminPanel());
  root.appendChild(layout);
  return root;
}

function renderAdminPanel(){
  const panel = el("div",{class:"admin-panel"});
  const pending = state.users.filter(u=>u.status==="pending");
  const secPending = el("div",{class:"admin-section"});
  secPending.appendChild(el("h3",{},"Oczekujący (" + pending.length + ")"));
  if (!pending.length) secPending.appendChild(el("div",{class:"admin-row"}, el("span",{style:"color:var(--muted)"},"Brak zgłoszeń")));
  pending.forEach(u=>{
    secPending.appendChild(el("div",{class:"admin-row"},
      el("span",{},u.username),
      el("div",{class:"actions"},
        el("button",{class:"btn small ok", onclick: async ()=>{ await setStatus(u.username,"approved"); }},"Akceptuj"),
        el("button",{class:"btn small danger", onclick: async ()=>{ await setStatus(u.username,"banned"); }},"Odrzuć")
      )
    ));
  });
  panel.appendChild(secPending);

  const secUsers = el("div",{class:"admin-section"});
  secUsers.appendChild(el("h3",{},"Wszyscy użytkownicy"));
  state.users.forEach(u=>{
    if (u.username === state.username) return;
    secUsers.appendChild(el("div",{class:"admin-row"},
      el("div",{class:"name"}, u.username, el("span",{class:"tag"}, u.isAdmin? "administrator" : u.status)),
      el("div",{class:"actions"}, u.isAdmin ? null :
        (u.status==="banned"
          ? el("button",{class:"btn small ok", onclick: async ()=>{ await setStatus(u.username,"approved"); }},"Odblokuj")
          : el("button",{class:"btn small danger", onclick: async ()=>{ await setStatus(u.username,"banned"); }},"Zablokuj"))
      )
    ));
  });
  panel.appendChild(secUsers);

  const secRooms = el("div",{class:"admin-section"});
  secRooms.appendChild(el("h3",{},"Pokoje"));
  const nameInput = el("input",{type:"text", placeholder:"Nazwa pokoju"});
  const topicInput = el("input",{type:"text", placeholder:"Temat (opcjonalnie)"});
  secRooms.appendChild(el("div",{class:"new-room-form"}, nameInput, topicInput,
    el("button",{class:"btn", onclick: async ()=>{
      const name = nameInput.value.trim();
      if (!name) return;
      try{
        const r = await api("/api/admin/room", {method:"POST", body:{name, topic: topicInput.value.trim()}});
        await loadState();
        state.currentRoom = r.id;
        await loadMessages();
        render();
      }catch(e){ alert(e.message); }
    }}, "Dodaj pokój")
  ));
  state.rooms.forEach(r=>{
    secRooms.appendChild(el("div",{class:"admin-row"},
      el("span",{},r.name),
      el("button",{class:"btn small danger", onclick: async ()=>{
        try{
          await api("/api/admin/room", {method:"DELETE", body:{roomId:r.id}});
          await loadState();
          if (state.currentRoom === r.id) state.currentRoom = state.rooms[0]?.id || null;
          await loadMessages();
          render();
        }catch(e){ alert(e.message); }
      }},"Usuń")
    ));
  });
  panel.appendChild(secRooms);
  return panel;
}

async function setStatus(targetUsername, status){
  try{
    await api("/api/admin/status", {method:"POST", body:{targetUsername, status}});
    await loadState();
    render();
  }catch(e){ alert(e.message); }
}

(async function boot(){
  const token = getToken();
  if (!token){ render(); return; }
  try{
    state.loggedIn = true;
    await loadState();
    await loadMessages();
    startPolling();
  }catch(e){
    clearToken();
    state.loggedIn = false;
  }
  render();
})();
</script>
</body>
</html>
