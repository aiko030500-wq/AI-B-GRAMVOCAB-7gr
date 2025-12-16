(() => {
  const root = document.getElementById("app");

  const STATE = {
    screen: "login",      // login | modules | lessons | lesson | chat
    moduleId: null,
    lessonKey: null,
    user: null,
    chat: { messages: [] }
  };

  const $ = (sel) => document.querySelector(sel);

  // ---------- safety ----------
  if (!window.APP_DATA) {
    root.innerHTML = "<div style='padding:16px;font:16px system-ui'>❌ APP_DATA не найден. Проверь data.js</div>";
    return;
  }
  const APP_DATA = window.APP_DATA;

  // ---------- storage / stars / attempts ----------
  function LSKEY(suffix){
    const u = STATE.user?.login || "guest";
    return `AIB_EX7_${u}_${suffix}`;
  }

  function getJSON(key, fallback){
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  }
  function setJSON(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

  function getStars(){
    return Number(localStorage.getItem(LSKEY("stars")) || 0);
  }
  function setStars(v){
    localStorage.setItem(LSKEY("stars"), String(v));
    const el = document.getElementById("starsCounter");
    if (el) el.textContent = `⭐ ${v}`;
  }
  function addStar(n=1){
    setStars(getStars() + (n||0));
  }

  function attemptKey(lessonKey, exId){
    return LSKEY(`attempt_${lessonKey}_${exId}`);
  }
  function isLocked(lessonKey, exId){
    return localStorage.getItem(attemptKey(lessonKey, exId)) === "1";
  }
  function lock(lessonKey, exId){
    localStorage.setItem(attemptKey(lessonKey, exId), "1");
  }

  function markResult(outEl, ok){
    if (!outEl) return;
    outEl.innerHTML = ok ? `<span class="ok">✅</span>` : `<span class="no">❌</span>`;
  }

  // ---------- lesson progress ----------
  function lessonBaseKey(lessonKey){
    return LSKEY(`lesson_${lessonKey}`);
  }
  function getLessonProgress(lessonKey){
    return getJSON(lessonBaseKey(lessonKey), { stars:0, done:false, doneParts:0, totalParts:0 });
  }
  function setLessonProgress(lessonKey, patch){
    const cur = getLessonProgress(lessonKey);
    const next = { ...cur, ...patch };
    setJSON(lessonBaseKey(lessonKey), next);
    return next;
  }
  function addLessonStars(lessonKey, n){
    const p = getLessonProgress(lessonKey);
    setLessonProgress(lessonKey, { stars: (p.stars||0) + (n||0) });
  }

  function calcLessonParts(L){
    let parts = 0;
    if (L?.exercise1) parts++;
    if (L?.exercise2) parts++;
    if (L?.trueFalse) parts++;
    if (L?.complete) parts++;
    if (L?.readingA) parts++;
    if (L?.readingB) parts++;
    if (L?.grammar1) parts++;
    if (L?.grammar2) parts++;
    if (L?.grammar) parts++;
    if (L?.review) parts++;
    if (L?.fun) parts++;
    return Math.max(1, parts);
  }

  function computeLessonPercent(lessonKey, L){
    const totalParts = calcLessonParts(L);
    let doneParts = 0;

    const parts = [
      ["exercise1", !!L?.exercise1],
      ["exercise2", !!L?.exercise2],
      ["trueFalse", !!L?.trueFalse],
      ["complete",  !!L?.complete],
      ["readingA",  !!L?.readingA],
      ["readingB",  !!L?.readingB],
      ["grammar1",  !!L?.grammar1],
      ["grammar2",  !!L?.grammar2],
      ["grammar",   !!L?.grammar],
      ["review",    !!L?.review],
      ["fun",       !!L?.fun],
    ];

    parts.forEach(([id, exists])=>{
      if (!exists) return;

      // чтение/грамматику считаем как "пройдено" автоматически (текст показан)
      const autoDone = (id.startsWith("reading") || id.startsWith("grammar") || id==="review" || id==="fun");
      if (autoDone) doneParts++;
      else if (isLocked(lessonKey, id)) doneParts++;
    });

    const percent = Math.round((doneParts / totalParts) * 100);
    const p = getLessonProgress(lessonKey);
    const done = percent >= 90;
    setLessonProgress(lessonKey, { totalParts, doneParts, done });
    return { percent, done, doneParts, totalParts, stars: (p.stars||0) };
  }

  // ---------- helpers ----------
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));
  }

  function mixWithWhite(hex, t) {
    const c = (hex || "#0aa35f").replace("#", "");
    const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16);
    const rr = Math.round(r * (1 - t) + 255 * t);
    const gg = Math.round(g * (1 - t) + 255 * t);
    const bb = Math.round(b * (1 - t) + 255 * t);
    return `rgb(${rr},${gg},${bb})`;
  }

  function setTheme(color) {
    const light = mixWithWhite(color, 0.90);
    document.documentElement.style.setProperty("--pageBg", light);
  }

  function shadeForLessonCard(moduleColor, idx, total) {
    const t = 0.20 + (idx / Math.max(1, total - 1)) * 0.55;
    return mixWithWhite(moduleColor, t);
  }

  function topBar(title, subtitle, color) {
    const c2 = mixWithWhite(color, 0.25);
    return `
      <div class="top" style="background:linear-gradient(90deg, ${color}, ${c2});">
        <div class="topRow">
          <img class="logoImg" src="./logo.png" onerror="this.style.display='none'" />
          <div>
            <div class="h1">${escapeHtml(title)}</div>
            <div class="sub">${escapeHtml(subtitle || "")}</div>
          </div>
          <div style="margin-left:auto" class="stars" id="starsCounter">⭐ ${getStars()}</div>
        </div>
      </div>
    `;
  }

  // ---------- TTS ----------
  function speak(text) {
    const t = String(text || "").trim();
    if (!t) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(t);
      u.lang = "en-US";
      u.rate = 0.9;
      u.pitch = 1.05;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  // ---------- PRINT ----------
  function ensurePrintLayers() {
    if (!document.getElementById("printWatermark")) {
      const wm = document.createElement("div");
      wm.id = "printWatermark";
      wm.style.display = "none";
      wm.innerHTML = `
        <div class="wmWrap">
          <img src="./logo.png" onerror="this.style.display='none'"/>
          <div class="wmText">AI BAYAN · Excel 7</div>
        </div>`;
      document.body.appendChild(wm);
    }

    if (!document.getElementById("printFooter")) {
      const ft = document.createElement("div");
      ft.id = "printFooter";
      ft.style.display = "none";
      ft.innerHTML = `
        <div class="row">
          <div>Class: __________  Name: __________</div>
          <div>Date: __________  Teacher: __________</div>
        </div>`;
      document.body.appendChild(ft);
    }
  }

  function setPrintColor(moduleColor) {
    document.documentElement.style.setProperty("--wmColor", moduleColor || "rgba(0,0,0,.25)");
  }

  function printLesson(moduleColor) {
    ensurePrintLayers();
    setPrintColor(moduleColor || "#0aa35f");
    window.print();
  }

  // ---------- render blocks ----------
  function renderReadingBlock(title, text){
    return `
      <div class="card">
        <div class="title">${escapeHtml(title || "Reading")}</div>
        <div class="line"></div>
        <div class="readingText">${escapeHtml(text || "").replace(/\n/g,"<br>")}</div>
      </div>
    `;
  }

  function renderGrammar(g){
    return `
      <div class="card">
        <div class="title">${escapeHtml(g.title || "Grammar")}</div>
        <div class="line"></div>
        <div class="small"><b>EN:</b> ${escapeHtml(g.enRule || "")}</div>
        <div class="small" style="margin-top:6px"><b>RU:</b> ${escapeHtml(g.ruRule || "")}</div>
        ${g.formula ? `<div class="line"></div><div class="small"><b>Formula:</b><br>${escapeHtml(g.formula).replace(/\n/g,"<br>")}</div>` : ""}
      </div>
    `;
  }

  function renderMCQ(ex, exId){
    const id = "mcq_" + Math.random().toString(16).slice(2);
    const locked = isLocked(STATE.lessonKey, exId);
    return `
      <div class="card" id="${id}">
        <div class="title">${escapeHtml(ex.title || "Exercise")}</div>
        <div class="muted">${locked ? "⛔ One attempt used" : "Choose the correct answer"}</div>
        <div class="line"></div>

        ${(ex.items || []).map((it, i)=>`
          <div class="small" style="margin-top:10px"><b>${i+1}.</b> ${escapeHtml(it.q)}</div>
          <div class="pillRow" style="margin-top:6px">
            ${(it.opts || []).map(opt=>`
              <button class="pill" ${locked?"disabled":""}
                data-mcq="${id}|${exId}|${i}|${escapeHtml(opt)}">${escapeHtml(opt)}</button>
            `).join("")}
            <span class="small" data-msg="${id}|${i}"></span>
          </div>
        `).join("")}

        <div class="line"></div>
        <div class="btnRow">
          <button class="btn btnGhost" ${locked?"disabled":""} data-finish="${id}|${exId}">Finish</button>
          <span class="small" data-score="${id}"></span>
        </div>
      </div>
    `;
  }

  function renderTrueFalse(tf, exId){
    const id = "tf_" + Math.random().toString(16).slice(2);
    const locked = isLocked(STATE.lessonKey, exId);
    return `
      <div class="card" id="${id}">
        <div class="title">${escapeHtml(tf.title || "True / False")}</div>
        <div class="muted">${locked ? "⛔ One attempt used" : "Choose True or False"}</div>
        <div class="line"></div>

        ${(tf.items||[]).map((it,i)=>`
          <div class="small" style="margin-top:10px"><b>${i+1}.</b> ${escapeHtml(it.q)}</div>
          <div class="btnRow" style="margin-top:6px">
            <button class="btn btnGhost" ${locked?"disabled":""} data-tf="${id}|${exId}|${i}|true">True</button>
            <button class="btn btnGhost" ${locked?"disabled":""} data-tf="${id}|${exId}|${i}|false">False</button>
            <span class="small" data-msg="${id}|${i}"></span>
          </div>
        `).join("")}

        <div class="line"></div>
        <div class="btnRow">
          <button class="btn btnGhost" ${locked?"disabled":""} data-finish="${id}|${exId}">Finish</button>
          <span class="small" data-score="${id}"></span>
        </div>
      </div>
    `;
  }

  function renderComplete(comp, exId){
    const id = "comp_" + Math.random().toString(16).slice(2);
    const locked = isLocked(STATE.lessonKey, exId);
    return `
      <div class="card" id="${id}">
        <div class="title">${escapeHtml(comp.title || "Complete")}</div>
        <div class="muted">${locked ? "⛔ One attempt used" : "Write answers"}</div>
        <div class="line"></div>

        ${(comp.items||[]).map((s,i)=>`
          <div class="small" style="margin-top:10px"><b>${i+1}.</b> ${escapeHtml(s)}</div>
          <input class="input" ${locked?"disabled":""} placeholder="Type..." data-comp="${id}|${i}">
        `).join("")}

        <div class="line"></div>
        <div class="btnRow">
          <button class="btn btnPrimary" ${locked?"disabled":""} data-submit="${id}|${exId}">Submit</button>
          <span class="small" data-score="${id}"></span>
        </div>
      </div>
    `;
  }

  // categorise (без правильных ответов в data → даём 1⭐ за Submit)
  function renderCategorise(ex, exId) {
    const id = "cat_" + Math.random().toString(16).slice(2);
    const locked = isLocked(STATE.lessonKey, exId);
    return `
      <div class="card" id="${id}">
        <div class="title">${escapeHtml(ex.title || "Exercise")}</div>
        <div class="muted">${locked ? "⛔ One attempt used" : "Tap a word → tap a category box."}</div>
        <div class="line"></div>

        <div class="pillRow" data-role="items">
          ${(ex.items || []).map(w => `<span class="pill" ${locked?"style='opacity:.6;pointer-events:none'":""} data-word="${escapeHtml(w)}">${escapeHtml(w)}</span>`).join("")}
        </div>

        <div class="line"></div>

        <div class="catGrid">
          ${(ex.categories || []).map(c => `
            <div class="catBox" ${locked?"style='opacity:.6;pointer-events:none'":""} data-cat="${escapeHtml(c)}">
              <div class="catTitle">${escapeHtml(c)}</div>
              <div class="pillRow" data-bucket="${escapeHtml(c)}"></div>
            </div>
          `).join("")}
        </div>

        <div class="line"></div>
        <div class="btnRow">
          <button class="btn btnGhost" ${locked?"disabled":""} data-reset="${id}">Reset</button>
          <button class="btn btnPrimary" ${locked?"disabled":""} data-submit="${id}|${exId}">Submit</button>
          <span class="small" data-score="${id}"></span>
        </div>
      </div>
    `;
  }

  // its phrases (даём 1⭐ за Submit)
  function renderItsPhrases(ex, exId) {
    const id = "its_" + Math.random().toString(16).slice(2);
    const locked = isLocked(STATE.lessonKey, exId);
    return `
      <div class="card" id="${id}">
        <div class="title">${escapeHtml(ex.title || "Exercise")}</div>
        <div class="muted">${locked ? "⛔ One attempt used" : "Choose adjectives and write sentences."}</div>
        <div class="line"></div>

        <div class="title">It’s… (positive)</div>
        <div class="pillRow">
          ${(ex.itsGood || []).map(w => `<span class="pill" ${locked?"style='opacity:.6;pointer-events:none'":""} data-good="${escapeHtml(w)}">${escapeHtml(w)}</span>`).join("")}
        </div>

        <div class="title" style="margin-top:10px">It’s… (negative)</div>
        <div class="pillRow">
          ${(ex.itsBad || []).map(w => `<span class="pill" ${locked?"style='opacity:.6;pointer-events:none'":""} data-bad="${escapeHtml(w)}">${escapeHtml(w)}</span>`).join("")}
        </div>

        <div class="line"></div>

        ${(ex.prompts || []).map((p, i) => `
          <div class="small" style="margin-top:8px">${escapeHtml(p)}</div>
          <input class="input" ${locked?"disabled":""} placeholder="Type here..." data-prompt="${id}|${i}">
        `).join("")}

        <div class="line"></div>
        <div class="small">Формула: I like … because it’s … / I don’t like … because it’s …</div>

        <div class="line"></div>
        <div class="btnRow">
          <button class="btn btnPrimary" ${locked?"disabled":""} data-submit="${id}|${exId}">Submit</button>
          <span class="small" data-score="${id}"></span>
        </div>
      </div>
    `;
  }

  function wireInteractions(L) {
    // Categorise interactions
    document.querySelectorAll("[id^='cat_']").forEach(box => {
      let selectedWordEl = null;

      box.querySelectorAll("[data-word]").forEach(p => {
        p.onclick = () => {
          box.querySelectorAll("[data-word]").forEach(x => x.classList.remove("selected"));
          p.classList.add("selected");
          selectedWordEl = p;
        };
      });

      box.querySelectorAll("[data-cat]").forEach(cbox => {
        cbox.onclick = () => {
          if (!selectedWordEl) return;
          const cat = cbox.getAttribute("data-cat");
          const bucket = box.querySelector(`[data-bucket="${CSS.escape(cat)}"]`);
          if (bucket) bucket.appendChild(selectedWordEl);
          selectedWordEl.classList.remove("selected");
          selectedWordEl = null;
        };
      });

      const reset = box.querySelector("[data-reset]");
      if (reset) {
        reset.onclick = () => {
          const itemsRow = box.querySelector("[data-role='items']");
          box.querySelectorAll("[data-word]").forEach(p => itemsRow.appendChild(p));
          box.querySelectorAll(".pill").forEach(x => x.classList.remove("selected"));
          selectedWordEl = null;
        };
      }
    });

    // It’s highlight
    document.querySelectorAll("[id^='its_']").forEach(box => {
      box.querySelectorAll("[data-good]").forEach(p => {
        p.onclick = () => {
          box.querySelectorAll("[data-good]").forEach(x => x.classList.remove("selected"));
          p.classList.add("selected");
        };
      });
      box.querySelectorAll("[data-bad]").forEach(p => {
        p.onclick = () => {
          box.querySelectorAll("[data-bad]").forEach(x => x.classList.remove("selected"));
          p.classList.add("selected");
        };
      });
    });

    // TTS buttons
    document.querySelectorAll("[data-say]").forEach(btn => {
      btn.onclick = () => speak(btn.getAttribute("data-say"));
    });

    // MCQ click + store choice + ✅/❌
    document.querySelectorAll("[data-mcq]").forEach(btn=>{
      btn.onclick = () => {
        const [cardId, exId, idx, opt] = btn.getAttribute("data-mcq").split("|");
        const i = Number(idx);
        const ex = L?.exercise1;
        const ok = (ex?.items?.[i]?.a === opt);

        const msg = document.querySelector(`[data-msg="${cardId}|${idx}"]`);
        markResult(msg, ok);

        const store = getJSON(LSKEY(`pick_${STATE.lessonKey}_${exId}`), {});
        store[i] = { opt, ok };
        setJSON(LSKEY(`pick_${STATE.lessonKey}_${exId}`), store);
      };
    });

    // True/False click + store + ✅/❌
    document.querySelectorAll("[data-tf]").forEach(btn=>{
      btn.onclick = () => {
        const [cardId, exId, idx, val] = btn.getAttribute("data-tf").split("|");
        const i = Number(idx);
        const ok = (String(L.trueFalse.items[i].a) === val);

        const msg = document.querySelector(`[data-msg="${cardId}|${idx}"]`);
        markResult(msg, ok);

        const store = getJSON(LSKEY(`pick_${STATE.lessonKey}_${exId}`), {});
        store[i] = { opt: val, ok };
        setJSON(LSKEY(`pick_${STATE.lessonKey}_${exId}`), store);
      };
    });

    // Finish MCQ/TF -> stars + lock
    document.querySelectorAll("[data-finish]").forEach(b=>{
      b.onclick = () => {
        const [cardId, exId] = b.getAttribute("data-finish").split("|");
        if (isLocked(STATE.lessonKey, exId)) return;

        const store = getJSON(LSKEY(`pick_${STATE.lessonKey}_${exId}`), {});
        const total = Math.max(1, Object.keys(store).length);
        const correct = Object.values(store).filter(x=>x.ok).length;

        addStar(correct);
        addLessonStars(STATE.lessonKey, correct);

        lock(STATE.lessonKey, exId);

        const score = document.querySelector(`[data-score="${cardId}"]`);
        if (score) score.textContent = `Score: ${correct}/${total}  (+${correct}⭐)`;

        render();
      };
    });

    // Submit (Complete / Categorise / Its) -> +1⭐ + lock
    document.querySelectorAll("[data-submit]").forEach(b=>{
      b.onclick = () => {
        const [cardId, exId] = b.getAttribute("data-submit").split("|");
        if (isLocked(STATE.lessonKey, exId)) return;

        addStar(1);
        addLessonStars(STATE.lessonKey, 1);
        lock(STATE.lessonKey, exId);

        const score = document.querySelector(`[data-score="${cardId}"]`);
        if (score) score.textContent = `Submitted ✅ (+1⭐)`;

        render();
      };
    });
  }

  // ---------- screens ----------
  function renderLogin() {
    const c = (APP_DATA.modules?.[0]?.color) || "#00b86b";
    setTheme(c);

    root.innerHTML = `
      <div class="wrap">
        ${topBar(APP_DATA.appTitle || "AI Bayan · Excel 7", "Login", c)}

        <div class="loginCard">
          <div class="title">Student / Teacher</div>
          <div class="muted">Введите Login и PIN</div>
          <div class="line"></div>

          <div class="label">Login</div>
          <input class="input" id="login" placeholder="например: 7BLr1" autocomplete="off"/>

          <div class="label">PIN</div>
          <input class="input" id="pin" placeholder="****" inputmode="numeric" autocomplete="off"/>

          <div class="btnRow" style="margin-top:12px">
            <button class="btn btnPrimary" id="go"
              style="background:linear-gradient(90deg,${c},${mixWithWhite(c,0.20)});color:#fff">
              Enter
            </button>
          </div>

          <div class="muted" id="msg" style="margin-top:10px"></div>
        </div>
      </div>
    `;

    $("#go").onclick = () => {
      const login = $("#login").value.trim();
      const pin = $("#pin").value.trim();
      const A = APP_DATA.auth;

      if (!A) { $("#msg").innerHTML = "<span class='no'>❌ auth не найден в data.js</span>"; return; }

      const okLogin = (A.allowedLogins || []).includes(login);
      if (!okLogin) { $("#msg").innerHTML = "<span class='no'>❌ Неверный Login</span>"; return; }

      if (pin === A.studentPin) {
        STATE.user = { role: "student", login };
        STATE.screen = "modules";
        STATE.moduleId = APP_DATA.modules?.[0]?.id || "m1";
        setStars(getStars()); // обновить ⭐ под новым логином
        render();
        return;
      }
      if (pin === A.teacherPin) {
        STATE.user = { role: "teacher", login };
        STATE.screen = "modules";
        STATE.moduleId = APP_DATA.modules?.[0]?.id || "m1";
        setStars(getStars());
        render();
        return;
      }
      $("#msg").innerHTML = "<span class='no'>❌ Неверный PIN</span>";
    };
  }

  function renderModules() {
    const modules = APP_DATA.modules || [];
    const c = modules[0]?.color || "#00b86b";
    setTheme(c);

    // module progress
    function moduleDoneCount(mod){
      const total = mod.lessonsCount || 10;
      let done = 0;
      for (let i=1;i<=total;i++){
        const key = `${mod.id}|${i}`;
        const d = APP_DATA.lessonContent?.[key] || {};
        const p = computeLessonPercent(key, d);
        if (p.done) done++;
      }
      return { done, total };
    }

    root.innerHTML = `
      <div class="wrap">
        ${topBar(APP_DATA.appTitle || "AI Bayan · Excel 7", STATE.user ? `${STATE.user.login} · ${STATE.user.role}` : "Modules", c)}

        <div class="grid">
          ${modules.map(mod => {
            const pr = moduleDoneCount(mod);
            return `
              <button class="lessonCard" style="border-color:${mod.color}" data-mid="${mod.id}">
                <div class="lessonTop">
                  <div>
                    <div class="title">${escapeHtml(mod.title)}</div>
                    <div class="muted">${mod.lessonsCount || 10} lessons</div>
                    <div class="muted">Progress: ${pr.done}/${pr.total}</div>
                  </div>
                  <div class="badge">Open</div>
                </div>
              </button>
            `;
          }).join("")}
        </div>

        <div class="bottomBar">
          <button class="bottomBtn" id="openChat"
            style="background:linear-gradient(90deg,#00b86b,#18c27a);color:#fff">
            💬 Chat with AI Bayan
          </button>
        </div>
      </div>
    `;

    document.querySelectorAll("[data-mid]").forEach(b => {
      b.onclick = () => {
        STATE.moduleId = b.getAttribute("data-mid");
        STATE.screen = "lessons";
        render();
      };
    });

    $("#openChat").onclick = () => {
      STATE.screen = "chat";
      render();
    };
  }

  function renderLessons() {
    const mod = (APP_DATA.modules || []).find(x => x.id === STATE.moduleId) || (APP_DATA.modules || [])[0];
    if (!mod) { STATE.screen = "modules"; render(); return; }
    setTheme(mod.color);

    const total = mod.lessonsCount || 10;
    const keys = Array.from({ length: total }, (_, i) => `${mod.id}|${i + 1}`);
    const lessons = keys.map(k => ({ key: k, data: APP_DATA.lessonContent?.[k] }));

    root.innerHTML = `
      <div class="wrap">
        ${topBar(mod.title, "Choose a lesson", mod.color)}

        <div class="btnRow" style="margin-top:12px">
          <button class="btn btnGhost" id="backMods">← Back</button>
        </div>

        <div class="grid">
          ${lessons.map((L, i) => {
            const d = L.data || { title: `Lesson ${i + 1}` };
            const prog = computeLessonPercent(L.key, d);
            const border = shadeForLessonCard(mod.color, i, total);
            return `
              <button class="lessonCard" style="border-color:${border}" data-lkey="${L.key}">
                <div class="lessonTop">
                  <div>
                    <div class="title">${escapeHtml(d.title || `Lesson ${i + 1}`)}</div>
                    <div class="muted">${d.bookPage ? `Book p.${d.bookPage}` : ""}</div>

                    <div class="metaRow">
                      <span class="chip">⭐ ${prog.stars || 0}</span>
                      <span class="chip">${prog.percent}%</span>
                      ${prog.done ? `<span class="chip okChip">✅ Completed</span>` : `<span class="chip noChip">⏳ In progress</span>`}
                    </div>
                  </div>
                  <div class="badge">Open</div>
                </div>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    `;

    $("#backMods").onclick = () => { STATE.screen = "modules"; render(); };
    document.querySelectorAll("[data-lkey]").forEach(b => {
      b.onclick = () => {
        STATE.lessonKey = b.getAttribute("data-lkey");
        STATE.screen = "lesson";
        render();
      };
    });
  }

  function renderLesson() {
    const mod = (APP_DATA.modules || []).find(x => x.id === STATE.moduleId) || (APP_DATA.modules || [])[0];
    if (!mod) { STATE.screen = "modules"; render(); return; }
    setTheme(mod.color);

    const L = APP_DATA.lessonContent?.[STATE.lessonKey];
    if (!L) {
      root.innerHTML = `<div class="wrap">${topBar(mod.title, "Lesson not found", mod.color)}<div class="card">Нет данных урока.</div></div>`;
      return;
    }

    const vocab = Array.isArray(L.vocabCards) ? L.vocabCards : [];
    const extras = Array.isArray(L.extras) ? L.extras : [];

    // choose exercise1 renderer
    let ex1Html = "";
    if (L.exercise1) {
      const items = L.exercise1.items || [];
      const isObj = Array.isArray(items) && typeof items[0] === "object";
      ex1Html = isObj ? renderMCQ(L.exercise1, "exercise1") : renderCategorise(L.exercise1, "exercise1");
    }

    const ex2Html = L.exercise2 ? renderItsPhrases(L.exercise2, "exercise2") : "";

    root.innerHTML = `
      <div class="wrap">
        ${topBar(L.title || "Lesson", L.bookPage ? `Book page: ${L.bookPage}` : "", mod.color)}

        <div class="btnRow" style="margin-top:12px">
          <button class="btn btnGhost" id="backLessons">← Back</button>
          <button class="btn btnPrimary" id="printLessonBtn"
            style="background:linear-gradient(90deg,${mod.color},${mixWithWhite(mod.color,0.20)});color:#fff">
            🖨 Print
          </button>
        </div>

        <div class="grid">
          ${L.note ? `<div class="card"><div class="title">Note</div><div class="muted">${escapeHtml(L.note)}</div></div>` : ""}

          ${vocab.length ? `
            <div class="card">
              <div class="title">Vocabulary (cards)</div>
              <div class="muted">Tap 🔊 for AI Bayan voice</div>
              <div class="vgrid">
                ${vocab.map(v => `
                  <div class="vcard">
                    <div class="vemojiRow">
                      <div class="vemoji">${escapeHtml(v.emoji || "📌")}</div>
                      <button class="vplay" data-say="${escapeHtml(v.tts || v.en || "")}">🔊</button>
                    </div>
                    <div class="ven">${escapeHtml(v.en || "")}</div>
                    <div class="vru">${escapeHtml(v.ru || "")}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}

          ${L.readingA ? renderReadingBlock(L.readingA.title || "Text A", L.readingA.text || "") : ""}
          ${L.readingB ? renderReadingBlock(L.readingB.title || "Text B", L.readingB.text || "") : ""}

          ${L.grammar1 ? renderGrammar(L.grammar1) : ""}
          ${L.grammar2 ? renderGrammar(L.grammar2) : ""}
          ${L.grammar ? renderGrammar(L.grammar) : ""}

          ${L.trueFalse ? renderTrueFalse(L.trueFalse, "trueFalse") : ""}
          ${L.complete ? renderComplete(L.complete, "complete") : ""}

          ${ex1Html}
          ${ex2Html}

          ${extras.length ? `
            <div class="card">
              <div class="title">Extra</div>
              <div class="line"></div>
              ${extras.map(x => `
                <div style="margin-bottom:10px">
                  <div class="title">${escapeHtml(x.title || "")}</div>
                  <div class="muted">${escapeHtml(x.note || "")}</div>
                </div>
              `).join("")}
            </div>
          ` : ""}
        </div>
      </div>
    `;

    $("#backLessons").onclick = () => { STATE.screen = "lessons"; render(); };
    $("#printLessonBtn").onclick = () => printLesson(mod.color);

    wireInteractions(L);
  }

  function renderChat() {
    const mod = (APP_DATA.modules || [])[0] || { color: "#00b86b" };
    setTheme(mod.color);

    const msgs = STATE.chat.messages;
    root.innerHTML = `
      <div class="wrap">
        ${topBar("AI Bayan", "Chat", mod.color)}
        <div class="btnRow" style="margin-top:12px">
          <button class="btn btnGhost" id="backHome">← Back</button>
        </div>

        <div class="card">
          <div class="title">Chat</div>
          <div class="muted">Ask AI Bayan (English / Russian)</div>
          <div class="line"></div>

          <div id="chatList" style="display:grid;gap:10px"></div>

          <div class="line"></div>
          <input class="input" id="chatInput" placeholder="Type a message..." />
          <div class="btnRow" style="margin-top:10px">
            <button class="btn btnPrimary" id="sendMsg"
              style="background:linear-gradient(90deg,${mod.color},${mixWithWhite(mod.color,0.20)});color:#fff">
              Send
            </button>
          </div>
        </div>
      </div>
    `;

    $("#backHome").onclick = () => { STATE.screen = "modules"; render(); };

    function draw() {
      const list = $("#chatList");
      list.innerHTML = msgs.map(m => `
        <div class="vcard" style="border-radius:14px">
          <div class="small"><b>${m.role === "user" ? "You" : "AI Bayan"}</b></div>
          <div style="margin-top:6px">${escapeHtml(m.text)}</div>
        </div>
      `).join("");
    }

    function replyAI(userText) {
      const t = userText.trim();
      if (!t) return "Write a short question 😊";
      return "I’m AI Bayan ✅ I can help with vocabulary, grammar, and reading. Ask me a question!";
    }

    $("#sendMsg").onclick = () => {
      const v = $("#chatInput").value.trim();
      if (!v) return;
      msgs.push({ role: "user", text: v });
      $("#chatInput").value = "";
      msgs.push({ role: "ai", text: replyAI(v) });
      draw();
    };

    draw();
  }

  // ---------- router ----------
  function render() {
    if (STATE.screen === "login") renderLogin();
    else if (STATE.screen === "modules") renderModules();
    else if (STATE.screen === "lessons") renderLessons();
    else if (STATE.screen === "chat") renderChat();
    else renderLesson();
  }

  // ---------- start ----------
  STATE.screen = "login";
  STATE.moduleId = null;
  STATE.lessonKey = null;
  render();
})();
