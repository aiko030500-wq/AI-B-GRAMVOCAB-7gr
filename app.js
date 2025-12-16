(() => {
  const $ = (s) => document.querySelector(s);

  // --- логины ---
  const STUDENT_PIN = "2844";
  const TEACHER_LOGIN = "Teacher";
  const TEACHER_PIN = "3244";

  const studentLogins = [
    ...Array.from({length:15}, (_,i)=>`7BL${i+1}`),
    ...Array.from({length:15}, (_,i)=>`7VS${i+1}`),
  ];

  // --- state/storage ---
  const LS_KEY = "AI_BAYAN_EXCEL7_STATE_V1";

  const state = load() || {
    user: null,         // {role, login}
    screen: "login",    // login | menu | module
    activeModule: null, // module id
    stars: {},          // key: `${login}_${moduleId}` -> number
    ai: {}              // key: `${login}_lastAI` -> "YYYY-MM-DD"
  };

  function save(){ localStorage.setItem(LS_KEY, JSON.stringify(state)); }
  function load(){ try { return JSON.parse(localStorage.getItem(LS_KEY)||""); } catch { return null; } }

  function todayStr(){
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,"0");
    const day = String(d.getDate()).padStart(2,"0");
    return `${y}-${m}-${day}`;
  }

  // --- helpers for colors ---
  function shade(hex, t){ // t: -0.35..+0.35
    const c = hex.replace("#","").trim();
    const r = parseInt(c.slice(0,2),16), g = parseInt(c.slice(2,4),16), b = parseInt(c.slice(4,6),16);
    const mix = (x) => Math.max(0, Math.min(255, Math.round(x + (t>=0 ? (255-x)*t : x*t))));
    const rr = mix(r), gg = mix(g), bb = mix(b);
    return `rgb(${rr},${gg},${bb})`;
  }

  // --- render ---
  function render(){
    const { appTitle, modules } = window.APP_DATA;

    $("#app").innerHTML = `
      <div class="wrap">
        <div class="topbar">
          <div class="logo">${logoEl()}</div>
          <div class="brand">
            <b>${appTitle}</b>
            <span>🍉 Smart English Trainer · Grade 7</span>
          </div>
          <div class="pill">
            <span>${state.user ? (state.user.role==="teacher" ? "👩‍🏫 Teacher" : "👤 Student") : "🔒 Guest"}</span>
            ${state.user ? `<span>•</span><b style="color:var(--text)">${state.user.login}</b>` : ""}
          </div>
        </div>

        ${state.screen==="login" ? screenLogin() : ""}
        ${state.screen==="menu" ? screenMenu(modules) : ""}
        ${state.screen==="module" ? screenModule(modules) : ""}
      </div>
    `;

    bind();
  }

  function logoEl(){
    // если logo.png есть, покажет; если нет — запасной круг
    return `<img src="logo.png" alt="logo" onerror="this.style.display='none'; this.parentElement.innerHTML='🍉';" />`;
  }

  function screenLogin(){
    return `
      <div class="card">
        <div class="grid">
          <div class="col-6">
            <div class="label">Login</div>
            <input id="login" class="input" placeholder="7BL1 ... 7BL15 или 7VS1 ... 7VS15 или Teacher" autocomplete="off"/>
          </div>
          <div class="col-6">
            <div class="label">PIN</div>
            <input id="pin" class="input" placeholder="****" type="password" autocomplete="off"/>
          </div>
          <div class="col-12 row">
            <button id="btnLogin" class="btn">Войти</button>
            <span id="loginMsg" class="small"></span>
          </div>
        </div>
      </div>
    `;
  }

  function screenMenu(modules){
    const starsTotal = totalStars();
    return `
      <div class="card">
        <div class="row">
          <button id="btnLogout" class="btn secondary">Выйти</button>
          <div class="kpi">
            <div class="box">⭐ Stars: <b>${starsTotal}</b></div>
            <div class="box">📚 Modules: <b>${modules.length}</b></div>
            <div class="box">🧠 AI Bayan: <b>${aiStatusText()}</b></div>
          </div>
        </div>

        <div class="hr"></div>

        <div class="grid">
          ${modules.map(m => moduleCard(m)).join("")}
        </div>

        <div class="hr"></div>

        <div class="card" style="margin:0;border-radius:18px;">
          <b>AI Bayan (1 вопрос в день)</b>
          <div class="small" style="margin-top:6px">Задай вопрос по грамматике/словам из текущего модуля.</div>
          <div class="chatBox" style="margin-top:10px">
            <textarea id="aiQ" class="input" placeholder="Например: Explain Present Continuous in Russian + formula"></textarea>
            <button id="btnAI" class="btn">Ask AI</button>
          </div>
          <div id="aiLog" class="chatLog" style="display:none"></div>
        </div>
      </div>
    `;
  }

  function moduleCard(m){
    const base = m.color;
    const moduleStars = getStarsFor(m.id);
    return `
      <div class="col-6">
        <div class="moduleCard" style="border-color:rgba(255,255,255,.14); background:linear-gradient(135deg, ${shade(base,-0.25)}, rgba(0,0,0,.12));">
          <div class="moduleHead">
            <b>${m.title}</b>
            <span class="tag">⭐ ${moduleStars}</span>
          </div>
          <div class="small" style="margin-top:6px;color:rgba(255,255,255,.80)">Яркий модуль • Уроки оттенками</div>
          <div class="row" style="margin-top:10px">
            <button class="btn secondary" data-open-module="${m.id}">Открыть</button>
            ${state.user?.role==="teacher" ? `<span class="small">Teacher view</span>` : ``}
          </div>
        </div>
      </div>
    `;
  }

  function screenModule(modules){
    const m = modules.find(x => x.id === state.activeModule);
    if(!m) return `<div class="card msg">Модуль не найден</div>`;

    const lessons = Array.from({length:m.lessonsCount}, (_,i)=>({
      n: i+1,
      title: `Lesson ${i+1}`,
      color: shade(m.color, -0.25 + (i*(0.5/(Math.max(1,m.lessonsCount-1))))) // заметные оттенки
    }));

    return `
      <div class="card">
        <div class="row">
          <button id="btnBack" class="btn secondary">← Назад</button>
          <div class="kpi">
            <div class="box">📘 <b>${m.title}</b></div>
            <div class="box">⭐ Stars: <b>${getStarsFor(m.id)}</b></div>
          </div>
        </div>

        <div class="hr"></div>

        <div class="lessons">
          ${lessons.map(L => `
            <button class="lessonBtn" data-lesson="${m.id}|${L.n}" style="background:linear-gradient(135deg, ${L.color}, rgba(0,0,0,.18));">
              <b>${L.title}</b>
              <span>Vocabulary • Grammar • Reading • Listening • Speaking</span>
            </button>
          `).join("")}
        </div>

        <div class="hr"></div>
        <div class="msg">
          Сейчас уроки — как “карточки”. Следующий шаг: я добавлю внутрь каждого Lesson
          вкладки <b>Vocabulary/Grammar/Worksheets</b> + авто-проверку + ⭐ сохранение.
        </div>
      </div>
    `;
  }

  // --- actions ---
  function bind(){
    if(state.screen==="login"){
      $("#btnLogin")?.addEventListener("click", doLogin);
      $("#pin")?.addEventListener("keydown", (e)=>{ if(e.key==="Enter") doLogin(); });
    }
    if(state.screen==="menu"){
      $("#btnLogout")?.addEventListener("click", logout);
      document.querySelectorAll("[data-open-module]").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          state.activeModule = btn.getAttribute("data-open-module");
          state.screen = "module";
          save(); render();
        });
      });
      $("#btnAI")?.addEventListener("click", askAI);
    }
    if(state.screen==="module"){
      $("#btnBack")?.addEventListener("click", ()=>{
        state.screen="menu"; save(); render();
      });
      document.querySelectorAll("[data-lesson]").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          // пока демо: за клик +1 звезда (потом заменим на реальную проверку заданий)
          addStars( state.activeModule, 1 );
          alert("⭐ +1 (demo). Следующий шаг — добавим упражнения по книге.");
          render();
        });
      });
    }
  }

  function doLogin(){
    const login = ($("#login").value || "").trim();
    const pin = ($("#pin").value || "").trim();
    const msg = $("#loginMsg");

    // Teacher
    if(login === TEACHER_LOGIN && pin === TEACHER_PIN){
      state.user = { role:"teacher", login };
      state.screen = "menu";
      save(); render();
      return;
    }

    // Student
    if(studentLogins.includes(login) && pin === STUDENT_PIN){
      state.user = { role:"student", login };
      state.screen = "menu";
      save(); render();
      return;
    }

    msg.innerHTML = `<span class="bad">Неверный логин или PIN</span>`;
  }

  function logout(){
    state.user = null;
    state.screen = "login";
    state.activeModule = null;
    save(); render();
  }

  // --- stars ---
  function keyStars(moduleId){
    if(!state.user) return null;
    return `${state.user.login}_${moduleId}`;
  }
  function getStarsFor(moduleId){
    const k = keyStars(moduleId);
    if(!k) return 0;
    return Number(state.stars[k] || 0);
  }
  function addStars(moduleId, n){
    const k = keyStars(moduleId);
    if(!k) return;
    state.stars[k] = getStarsFor(moduleId) + n;
    save();
  }
  function totalStars(){
    if(!state.user) return 0;
    const pref = state.user.login + "_";
    return Object.keys(state.stars)
      .filter(k => k.startsWith(pref))
      .reduce((sum,k)=>sum + Number(state.stars[k]||0), 0);
  }

  // --- AI Bayan (1 question per day) ---
  function aiKey(){ return state.user ? `${state.user.login}_lastAI` : null; }
  function aiStatusText(){
    if(!state.user || state.user.role!=="student") return "Teacher / unlimited";
    const k = aiKey();
    const last = state.ai[k] || "";
    return (last === todayStr()) ? "Limit reached today" : "Available";
  }

  function askAI(){
    if(!state.user){ alert("Сначала войди"); return; }
    const q = ($("#aiQ").value||"").trim();
    if(!q){ alert("Напиши вопрос"); return; }

    if(state.user.role==="student"){
      const k = aiKey();
      const last = state.ai[k] || "";
      if(last === todayStr()){
        alert("Сегодня лимит AI: 1 вопрос. Завтра снова ✅");
        return;
      }
      state.ai[k] = todayStr();
      save();
    }

    // Здесь будет реальный AI (Cloudflare Worker / OpenAI). Пока — умный шаблон-ответ.
    const demoAnswer =
`AI Bayan:
• I got your question ✅
• Tip: Write the rule + formula, then 2 examples.
• If you want, I can explain in RU and give 5 practice sentences.

Your question:
${q}`;

    const log = $("#aiLog");
    log.style.display = "block";
    log.textContent = demoAnswer;
    render(); // обновит статус лимита
  }

  // start
  render();
})();
