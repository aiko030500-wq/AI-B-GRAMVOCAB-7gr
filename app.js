(() => {
  const $ = (s) => document.querySelector(s);

  const STUDENT_PIN = "2844";
  const TEACHER_LOGIN = "Teacher";
  const TEACHER_PIN = "3244";

  const studentLogins = [
    ...Array.from({length:15}, (_,i)=>`7BL${i+1}`),
    ...Array.from({length:15}, (_,i)=>`7VS${i+1}`),
  ];

  const LS_KEY = "AI_BAYAN_EXCEL7_STATE_V2";

  const state = load() || {
    user: null,
    screen: "login",        // login | menu | module | lesson | teacher
    activeModule: null,
    activeLessonKey: null,  // "m1|1"
    activeTab: "vocab",      // vocab | grammar | ex
    stars: {},              // login_module -> stars
    attempts: {},           // login_lesson_exId -> true (locked after 1 try)
    ai: {},                 // login_lastAI -> date
    aiLog: ""
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

  function shade(hex, t){
    const c = hex.replace("#","").trim();
    const r = parseInt(c.slice(0,2),16), g = parseInt(c.slice(2,4),16), b = parseInt(c.slice(4,6),16);
    const mix = (x) => Math.max(0, Math.min(255, Math.round(x + (t>=0 ? (255-x)*t : x*t))));
    return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
  }

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
  function totalStarsForLogin(login){
    const pref = login + "_";
    return Object.keys(state.stars)
      .filter(k => k.startsWith(pref))
      .reduce((sum,k)=>sum + Number(state.stars[k]||0), 0);
  }
  function totalStars(){
    if(!state.user) return 0;
    return totalStarsForLogin(state.user.login);
  }

  function attemptKey(exId){
    if(!state.user || !state.activeLessonKey) return null;
    return `${state.user.login}_${state.activeLessonKey}_${exId}`;
  }
  function isLocked(exId){
    const k = attemptKey(exId);
    if(!k) return false;
    return !!state.attempts[k];
  }
  function lockAttempt(exId){
    const k = attemptKey(exId);
    if(!k) return;
    state.attempts[k] = true;
    save();
  }

  function aiKey(){ return state.user ? `${state.user.login}_lastAI` : null; }
  function aiStatusText(){
    if(!state.user || state.user.role!=="student") return "Teacher / unlimited";
    const k = aiKey();
    const last = state.ai[k] || "";
    return (last === todayStr()) ? "Limit reached today" : "Available";
  }

  function render(){
    const { appTitle, modules } = window.APP_DATA;

    $("#app").innerHTML = `
      <div class="wrap">
        <div class="topbar">
          <div class="logo">${logoEl()}</div>
          <div class="brand">
            <b>${appTitle}</b>
            <span>🍉 Watermelon theme · Grade 7</span>
          </div>
          <div class="pill">
            <span>${state.user ? (state.user.role==="teacher" ? "👩‍🏫 Teacher" : "👤 Student") : "🔒 Guest"}</span>
            ${state.user ? `<span>•</span><b style="color:var(--text)">${state.user.login}</b>` : ""}
          </div>
        </div>

        ${state.screen==="login" ? screenLogin() : ""}
        ${state.screen==="menu" ? screenMenu(modules) : ""}
        ${state.screen==="teacher" ? screenTeacher() : ""}
        ${state.screen==="module" ? screenModule(modules) : ""}
        ${state.screen==="lesson" ? screenLesson(modules) : ""}
      </div>
    `;

    bind();
  }

  function logoEl(){
    return `<img src="logo.png" alt="logo" onerror="this.style.display='none'; this.parentElement.innerHTML='🍉';" />`;
  }

  function screenLogin(){
    return `
      <div class="card">
        <div class="grid">
          <div class="col-6">
            <div class="label">Login</div>
            <input id="login" class="input" placeholder="7BL1...7BL15 / 7VS1...7VS15 / Teacher" autocomplete="off"/>
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
    return `
      <div class="card">
        <div class="row">
          <button id="btnLogout" class="btn secondary">Выйти</button>
          ${state.user?.role==="teacher"
            ? `<button id="btnTeacher" class="btn">Teacher Journal</button>`
            : ``}
          <div class="kpi">
            <div class="box">⭐ Stars: <b>${totalStars()}</b></div>
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
          <div class="small" style="margin-top:6px">Вопрос по теме урока: грамматика/слова/ошибки.</div>
          <div class="chatBox" style="margin-top:10px">
            <textarea id="aiQ" class="input" placeholder="Например: Explain PS vs PC in RU + formula + 5 examples"></textarea>
            <button id="btnAI" class="btn">Ask AI</button>
          </div>
          <div id="aiLog" class="chatLog" style="${state.aiLog ? "" : "display:none"}">${escapeHtml(state.aiLog)}</div>
        </div>
      </div>
    `;
  }

  function moduleCard(m){
    const base = m.color;
    const moduleStars = getStarsFor(m.id);
    return `
      <div class="col-6">
        <div class="moduleCard" style="background:linear-gradient(135deg, ${shade(base,-0.25)}, rgba(0,0,0,.12));">
          <div class="moduleHead">
            <b>${m.title}</b>
            <span class="tag">⭐ ${moduleStars}</span>
          </div>
          <div class="small" style="margin-top:6px;color:rgba(255,255,255,.80)">Яркий модуль · Уроки оттенками</div>
          <div class="row" style="margin-top:10px">
            <button class="btn secondary" data-open-module="${m.id}">Открыть</button>
          </div>
        </div>
      </div>
    `;
  }

  function screenTeacher(){
    const rows = studentLogins.map(login => {
      const total = totalStarsForLogin(login);
      return `<div class="qRow" style="justify-content:space-between">
        <b>${login}</b>
        <span class="small">⭐ ${total}</span>
      </div>`;
    }).join("");

    return `
      <div class="card">
        <div class="row">
          <button id="btnBackMenu" class="btn secondary">← Назад</button>
          <div class="kpi">
            <div class="box">👩‍🏫 Journal</div>
            <div class="box">Students: <b>${studentLogins.length}</b></div>
          </div>
        </div>
        <div class="hr"></div>
        <div class="msg">Список учеников и их ⭐ (сумма по модулям):</div>
        <div class="card" style="margin-top:10px">${rows}</div>
      </div>
    `;
  }

  function screenModule(modules){
    const m = modules.find(x => x.id === state.activeModule);
    if(!m) return `<div class="card msg">Модуль не найден</div>`;

    const lessons = Array.from({length:m.lessonsCount}, (_,i)=>({
      n: i+1,
      title: `Lesson ${i+1}`,
      key: `${m.id}|${i+1}`,
      color: shade(m.color, -0.25 + (i*(0.5/(Math.max(1,m.lessonsCount-1)))))
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
            <button class="lessonBtn" data-lesson="${L.key}" style="background:linear-gradient(135deg, ${L.color}, rgba(0,0,0,.18));">
              <b>${L.title}</b>
              <span>${window.APP_DATA.lessonContent[L.key] ? "✅ content ready" : "… soon"}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }

  function screenLesson(modules){
    const key = state.activeLessonKey;
    const content = window.APP_DATA.lessonContent[key];
    const [mid] = key.split("|");
    const m = modules.find(x => x.id === mid);
    if(!m) return `<div class="card msg">Lesson not found</div>`;

    const title = content?.title || `Lesson ${key}`;

    return `
      <div class="card">
        <div class="row">
          <button id="btnBackToModule" class="btn secondary">← Module</button>
          <div class="kpi">
            <div class="box"><b>${title}</b></div>
            <div class="box">⭐ Module stars: <b>${getStarsFor(mid)}</b></div>
          </div>
        </div>

        <div class="tabs">
          <button class="tabBtn ${state.activeTab==="vocab"?"active":""}" data-tab="vocab">Vocabulary</button>
          <button class="tabBtn ${state.activeTab==="grammar"?"active":""}" data-tab="grammar">Grammar</button>
          <button class="tabBtn ${state.activeTab==="ex"?"active":""}" data-tab="ex">Exercises</button>
        </div>

        <div class="hr"></div>

        ${!content ? `<div class="msg">Контент этого урока пока не добавлен.</div>` : ""}
        ${content && state.activeTab==="vocab" ? vocabView(content) : ""}
        ${content && state.activeTab==="grammar" ? grammarView(content) : ""}
        ${content && state.activeTab==="ex" ? exercisesView(content, m.color) : ""}
      </div>
    `;
  }

  function vocabView(c){
    const list = c.vocab.map(w=>`<div class="qRow" style="justify-content:space-between">
      <b>${escapeHtml(w.en)}</b><span class="small">${escapeHtml(w.ru)}</span>
    </div>`).join("");
    return `<div class="card" style="margin:0">
      <b>Words</b>
      <div class="hr"></div>
      ${list}
    </div>`;
  }

  function grammarView(c){
    const g = c.grammar;
    return `<div class="card" style="margin:0">
      <b>${escapeHtml(g.title)}</b>
      <div class="hr"></div>
      <div class="msg"><b>EN:</b><br>${escapeHtml(g.enRule)}</div>
      <div class="msg" style="margin-top:10px"><b>RU:</b><br>${escapeHtml(g.ruRule)}</div>
      <div class="msg" style="margin-top:10px"><b>FORMULA:</b><br>${escapeHtml(g.formula)}</div>
    </div>`;
  }

  function exercisesView(c, moduleColor){
    const vocab = c.vocab;

    // build matching exercise auto from vocab
    const ex1 = c.exercises.find(x=>x.id==="ex1");
    let matchHtml = "";
    if(ex1){
      const pairs = vocab.slice(0, ex1.pairsCount);
      // shuffle RU
      const ruList = pairs.map(p=>p.ru).sort(()=>Math.random()-0.5);
      matchHtml = `
        <div class="card" style="margin:0">
          <div class="row" style="justify-content:space-between">
            <b>${escapeHtml(ex1.title)}</b>
            <span class="small ${isLocked("ex1") ? "bad" : "ok"}">${isLocked("ex1") ? "LOCKED" : "1 TRY"}</span>
          </div>
          <div class="hr"></div>
          ${pairs.map((p,i)=>`
            <div class="qRow">
              <b style="min-width:180px">${escapeHtml(p.en)}</b>
              <select class="input" data-match="${i}" ${isLocked("ex1")?"disabled":""}>
                <option value="">— choose RU —</option>
                ${ruList.map(r=>`<option value="${escapeAttr(r)}">${escapeHtml(r)}</option>`).join("")}
              </select>
            </div>
          `).join("")}
          <div class="row">
            <button class="btn ${isLocked("ex1")?"secondary locked":""}" id="check_ex1">Check</button>
            <span id="msg_ex1" class="small"></span>
          </div>
        </div>
      `;
    }

    const ex2 = c.exercises.find(x=>x.id==="ex2");
    const missingHtml = ex2 ? `
      <div class="card" style="margin-top:12px">
        <div class="row" style="justify-content:space-between">
          <b>${escapeHtml(ex2.title)}</b>
          <span class="small ${isLocked("ex2") ? "bad" : "ok"}">${isLocked("ex2") ? "LOCKED" : "1 TRY"}</span>
        </div>
        <div class="hr"></div>
        ${ex2.items.map((it,idx)=>`
          <div class="qRow">
            <b style="min-width:180px">${escapeHtml(it.q)}</b>
            <input class="input" data-miss="${idx}" placeholder="type word" ${isLocked("ex2")?"disabled":""}/>
          </div>
        `).join("")}
        <div class="row">
          <button class="btn ${isLocked("ex2")?"secondary locked":""}" id="check_ex2">Check</button>
          <span id="msg_ex2" class="small"></span>
        </div>
      </div>
    ` : "";

    const ex3 = c.exercises.find(x=>x.id==="ex3");
    const chooseHtml = ex3 ? `
      <div class="card" style="margin-top:12px">
        <div class="row" style="justify-content:space-between">
          <b>${escapeHtml(ex3.title)}</b>
          <span class="small ${isLocked("ex3") ? "bad" : "ok"}">${isLocked("ex3") ? "LOCKED" : "1 TRY"}</span>
        </div>
        <div class="hr"></div>
        ${ex3.items.map((it,idx)=>`
          <div class="qRow" style="align-items:flex-start">
            <div style="flex:1">
              <div class="small">${idx+1})</div>
              <b>${escapeHtml(it.q)}</b>
            </div>
            <select class="input" data-choose="${idx}" ${isLocked("ex3")?"disabled":""} style="max-width:220px">
              <option value="">— choose —</option>
              ${it.opts.map(o=>`<option value="${escapeAttr(o)}">${escapeHtml(o)}</option>`).join("")}
            </select>
          </div>
        `).join("")}
        <div class="row">
          <button class="btn ${isLocked("ex3")?"secondary locked":""}" id="check_ex3">Check</button>
          <span id="msg_ex3" class="small"></span>
        </div>
      </div>
    ` : "";

    const ex4 = c.exercises.find(x=>x.id==="ex4");
    const buildHtml = ex4 ? `
      <div class="card" style="margin-top:12px">
        <div class="row" style="justify-content:space-between">
          <b>${escapeHtml(ex4.title)}</b>
          <span class="small ${isLocked("ex4") ? "bad" : "ok"}">${isLocked("ex4") ? "LOCKED" : "1 TRY"}</span>
        </div>
        <div class="hr"></div>
        ${ex4.items.map((it,idx)=>`
          <div class="msg" style="margin:10px 0">
            <b>${idx+1})</b> ${escapeHtml(it.words.join(" / "))}<br>
            <input class="input" data-build="${idx}" placeholder="Write the sentence" ${isLocked("ex4")?"disabled":""} style="margin-top:8px"/>
          </div>
        `).join("")}
        <div class="row">
          <button class="btn ${isLocked("ex4")?"secondary locked":""}" id="check_ex4">Check</button>
          <span id="msg_ex4" class="small"></span>
        </div>
      </div>
    ` : "";

    return `
      ${matchHtml}
      ${missingHtml}
      ${chooseHtml}
      ${buildHtml}
    `;
  }

  function bind(){
    if(state.screen==="login"){
      $("#btnLogin")?.addEventListener("click", doLogin);
      $("#pin")?.addEventListener("keydown", (e)=>{ if(e.key==="Enter") doLogin(); });
    }

    if(state.screen==="menu"){
      $("#btnLogout")?.addEventListener("click", logout);
      $("#btnTeacher")?.addEventListener("click", ()=>{ state.screen="teacher"; save(); render(); });

      document.querySelectorAll("[data-open-module]").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          state.activeModule = btn.getAttribute("data-open-module");
          state.screen = "module";
          save(); render();
        });
      });

      $("#btnAI")?.addEventListener("click", askAI);
    }

    if(state.screen==="teacher"){
      $("#btnBackMenu")?.addEventListener("click", ()=>{ state.screen="menu"; save(); render(); });
    }

    if(state.screen==="module"){
      $("#btnBack")?.addEventListener("click", ()=>{ state.screen="menu"; save(); render(); });
      document.querySelectorAll("[data-lesson]").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          state.activeLessonKey = btn.getAttribute("data-lesson");
          state.activeTab = "vocab";
          state.screen = "lesson";
          save(); render();
        });
      });
    }

    if(state.screen==="lesson"){
      $("#btnBackToModule")?.addEventListener("click", ()=>{ state.screen="module"; save(); render(); });

      document.querySelectorAll("[data-tab]").forEach(b=>{
        b.addEventListener("click", ()=>{
          state.activeTab = b.getAttribute("data-tab");
          save(); render();
        });
      });

      // checks
      $("#check_ex1")?.addEventListener("click", ()=>checkMatch());
      $("#check_ex2")?.addEventListener("click", ()=>checkMissing());
      $("#check_ex3")?.addEventListener("click", ()=>checkChoose());
      $("#check_ex4")?.addEventListener("click", ()=>checkBuild());
    }
  }

  function doLogin(){
    const login = ($("#login").value || "").trim();
    const pin = ($("#pin").value || "").trim();
    const msg = $("#loginMsg");

    if(login === TEACHER_LOGIN && pin === TEACHER_PIN){
      state.user = { role:"teacher", login };
      state.screen = "menu";
      save(); render(); return;
    }

    if(studentLogins.includes(login) && pin === STUDENT_PIN){
      state.user = { role:"student", login };
      state.screen = "menu";
      save(); render(); return;
    }

    msg.innerHTML = `<span class="bad">Неверный логин или PIN</span>`;
  }

  function logout(){
    state.user = null;
    state.screen = "login";
    state.activeModule = null;
    state.activeLessonKey = null;
    save(); render();
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

    state.aiLog =
`AI Bayan (demo):
• Rule + formula + 2 examples
• Want 5 practice sentences? ✅

Q: ${q}`;
    save(); render();
  }

  // --- Exercise checks (1 try) ---
  function burst(el){
    if(!el) return;
    const s = document.createElement("span");
    s.className = "starBurst";
    s.textContent = "⭐";
    el.appendChild(s);
    setTimeout(()=>s.remove(), 650);
  }

  function currentModuleId(){
    return state.activeLessonKey ? state.activeLessonKey.split("|")[0] : state.activeModule;
  }

  function checkMatch(){
    if(isLocked("ex1")) return;
    const content = window.APP_DATA.lessonContent[state.activeLessonKey];
    if(!content) return;

    const pairs = content.vocab.slice(0, content.exercises.find(x=>x.id==="ex1").pairsCount);
    let correct = 0;

    document.querySelectorAll("[data-match]").forEach(sel=>{
      const i = Number(sel.getAttribute("data-match"));
      const chosen = sel.value;
      if(chosen && chosen === pairs[i].ru) correct++;
    });

    lockAttempt("ex1");
    const msg = $("#msg_ex1");
    if(correct === pairs.length){
      msg.innerHTML = `<span class="ok">✅ Correct! +1⭐</span>`;
      addStars(currentModuleId(), 1);
      burst(msg);
    }else{
      msg.innerHTML = `<span class="bad">❌ ${correct}/${pairs.length}</span>`;
    }
    save(); render();
  }

  function checkMissing(){
    if(isLocked("ex2")) return;
    const content = window.APP_DATA.lessonContent[state.activeLessonKey];
    const ex = content.exercises.find(x=>x.id==="ex2");
    let correct = 0;

    document.querySelectorAll("[data-miss]").forEach(inp=>{
      const i = Number(inp.getAttribute("data-miss"));
      const ans = (inp.value||"").trim().toLowerCase();
      if(ans && ans === ex.items[i].a.toLowerCase()) correct++;
    });

    lockAttempt("ex2");
    const msg = $("#msg_ex2");
    if(correct === ex.items.length){
      msg.innerHTML = `<span class="ok">✅ Perfect! +1⭐</span>`;
      addStars(currentModuleId(), 1);
      burst(msg);
    }else{
      msg.innerHTML = `<span class="bad">❌ ${correct}/${ex.items.length}</span>`;
    }
    save(); render();
  }

  function checkChoose(){
    if(isLocked("ex3")) return;
    const content = window.APP_DATA.lessonContent[state.activeLessonKey];
    const ex = content.exercises.find(x=>x.id==="ex3");
    let correct = 0;

    document.querySelectorAll("[data-choose]").forEach(sel=>{
      const i = Number(sel.getAttribute("data-choose"));
      if(sel.value && sel.value === ex.items[i].a) correct++;
    });

    lockAttempt("ex3");
    const msg = $("#msg_ex3");
    if(correct === ex.items.length){
      msg.innerHTML = `<span class="ok">✅ Great! +1⭐</span>`;
      addStars(currentModuleId(), 1);
      burst(msg);
    }else{
      msg.innerHTML = `<span class="bad">❌ ${correct}/${ex.items.length}</span>`;
    }
    save(); render();
  }

  function norm(s){
    return (s||"").trim().replace(/\s+/g," ").toLowerCase();
  }

  function checkBuild(){
    if(isLocked("ex4")) return;
    const content = window.APP_DATA.lessonContent[state.activeLessonKey];
    const ex = content.exercises.find(x=>x.id==="ex4");
    let correct = 0;

    document.querySelectorAll("[data-build]").forEach(inp=>{
      const i = Number(inp.getAttribute("data-build"));
      if(norm(inp.value) === norm(ex.items[i].a)) correct++;
    });

    lockAttempt("ex4");
    const msg = $("#msg_ex4");
    if(correct === ex.items.length){
      msg.innerHTML = `<span class="ok">✅ Excellent! +1⭐</span>`;
      addStars(currentModuleId(), 1);
      burst(msg);
    }else{
      msg.innerHTML = `<span class="bad">❌ ${correct}/${ex.items.length}</span>`;
    }
    save(); render();
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, m => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[m]));
  }
  function escapeAttr(s){ return escapeHtml(s); }

  render();
})();
