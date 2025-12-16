// app.js — AI Bayan · Excel 7
(() => {
  const $ = (sel) => document.querySelector(sel);

  // ---------- safety ----------
  if (!window.APP_DATA) {
    document.body.innerHTML = `<div style="padding:16px;font-family:system-ui">❌ APP_DATA не найден. Проверь data.js (подключён ДО app.js)</div>`;
    return;
  }

  const LS = {
    user: "aiBayanExcel7_user",
    stars: "aiBayanExcel7_stars",
    attempts: "aiBayanExcel7_attempts"
  };

  const loadJSON = (k, fallback) => {
    try { return JSON.parse(localStorage.getItem(k) || "") ?? fallback; }
    catch { return fallback; }
  };
  const saveJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  // ---------- state ----------
  const state = {
    screen: "login", // login | menu | lessons | lesson
    user: loadJSON(LS.user, null), // {login, role}
    current: { moduleId: "m1", lessonNo: 1 }
  };

  // stars & attempts are per login
  const getStars = () => loadJSON(LS.stars, {});
  const setStars = (all) => saveJSON(LS.stars, all);

  const getAttempts = () => loadJSON(LS.attempts, {});
  const setAttempts = (all) => saveJSON(LS.attempts, all);

  function userKey() {
    return state.user?.login || "guest";
  }

  function starsForUser() {
    const all = getStars();
    return all[userKey()] || 0;
  }

  function addStars(n) {
    const all = getStars();
    all[userKey()] = (all[userKey()] || 0) + n;
    setStars(all);
    render();
  }

  function attemptKey(moduleId, lessonNo, exId) {
    return `${userKey()}::${moduleId}|${lessonNo}::${exId}`;
  }

  function isLocked(moduleId, lessonNo, exId) {
    const all = getAttempts();
    return !!all[attemptKey(moduleId, lessonNo, exId)];
  }

  function lockExercise(moduleId, lessonNo, exId) {
    const all = getAttempts();
    all[attemptKey(moduleId, lessonNo, exId)] = true;
    setAttempts(all);
  }

  // ---------- UI helpers ----------
  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function speak(text) {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch {}
  }

  function openBookAt(page) {
    // простой открывающий просмотр: просто открываем PDF (страницу пользователь листает)
    window.open(`${APP_DATA.bookPdf}#page=${page}`, "_blank");
  }

  // ---------- render screens ----------
  function renderTopBar(title, subtitle, color) {
    return `
      <div class="topbar" style="--accent:${color || "#0aa35f"}">
        <div class="topbar__title">${escapeHtml(title)}</div>
        ${subtitle ? `<div class="topbar__sub">${escapeHtml(subtitle)}</div>` : ""}
        <div class="topbar__right">
          <div class="pill">⭐ ${starsForUser()}</div>
          <div class="pill pill--user">${escapeHtml(userKey())}</div>
        </div>
      </div>
    `;
  }

  function renderLogin() {
    const mod = APP_DATA.modules[0];
    return `
      ${renderTopBar(APP_DATA.appTitle, "Login", mod.color)}
      <div class="card">
        <h2>Enter login + PIN</h2>
        <div class="grid2">
          <label class="field">
            <span>Login</span>
            <input id="loginInp" placeholder="7BLr1 / 7VSt16 ..." autocomplete="off" />
          </label>
          <label class="field">
            <span>PIN</span>
            <input id="pinInp" placeholder="2844 or 3244" type="password" inputmode="numeric" />
          </label>
        </div>
        <button class="btn btn--primary" id="btnLogin">Login</button>
        <p class="hint">Student PIN: 2844 · Teacher PIN: 3244</p>
      </div>
    `;
  }

  function renderMenu() {
    return `
      ${renderTopBar(APP_DATA.appTitle, "Modules", "#0aa35f")}
      <div class="list">
        ${APP_DATA.modules.map(m => `
          <button class="module" data-mid="${m.id}" style="--accent:${m.color}">
            <div class="module__name">${escapeHtml(m.title)}</div>
            <div class="module__meta">${m.lessonsCount} lessons</div>
          </button>
        `).join("")}
      </div>
    `;
  }

  function renderLessons(moduleId) {
    const mod = APP_DATA.modules.find(m => m.id === moduleId);
    const lessons = [];
    for (let i=1; i<=mod.lessonsCount; i++) lessons.push(i);

    return `
      ${renderTopBar(mod.title, "Lessons", mod.color)}
      <div class="row">
        <button class="btn" id="backToMenu">← Back</button>
      </div>

      <div class="list">
        ${lessons.map(no => {
          const key = `${moduleId}|${no}`;
          const lc = APP_DATA.lessonContent[key];
          return `
            <button class="lesson" data-lno="${no}">
              <div class="lesson__title">${escapeHtml(lc?.title || `Lesson ${no}`)}</div>
              <div class="lesson__meta">Book page: ${lc?.bookPage || (lc?.bookPages?.[0] ?? "—")}</div>
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderLesson(moduleId, lessonNo) {
    const mod = APP_DATA.modules.find(m => m.id === moduleId);
    const key = `${moduleId}|${lessonNo}`;
    const lc = APP_DATA.lessonContent[key];
    if (!lc) {
      return `
        ${renderTopBar(mod.title, `Lesson ${lessonNo}`, mod.color)}
        <div class="card">
          <p>❌ No lesson content found for <b>${escapeHtml(key)}</b></p>
          <button class="btn" id="backToLessons">← Back</button>
        </div>
      `;
    }

    const bookPage = lc.bookPage || (lc.bookPages?.[0] ?? "");
    const bookPagesText = lc.bookPages ? `Pages: ${lc.bookPages.join(", ")}` : (bookPage ? `Page: ${bookPage}` : "");

    return `
      ${renderTopBar(mod.title, lc.title, mod.color)}

      <div class="row">
        <button class="btn" id="backToLessons">← Back</button>
        ${bookPage ? `<button class="btn btn--primary" id="openBookBtn">📘 Open book (PDF)</button>` : ""}
      </div>

      ${bookPagesText ? `<div class="note">${escapeHtml(bookPagesText)}${lc.openBookHint ? ` · ${escapeHtml(lc.openBookHint)}` : ""}</div>` : ""}

      ${lc.vocabCards ? `
        <div class="card">
          <h3>Vocabulary</h3>
          <div class="vgrid">
            ${lc.vocabCards.map(w => `
              <div class="vcard">
                <div class="vemoji">${escapeHtml(w.emoji || "🔤")}</div>
                <div class="vtext">
                  <div class="ven">${escapeHtml(w.en)}</div>
                  <div class="vru">${escapeHtml(w.ru || "")}</div>
                </div>
                <button class="iconbtn" data-tts="${escapeHtml(w.tts || w.en)}" title="Listen">🔊</button>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      ${lc.exercises ? lc.exercises.map(ex => renderExercise(moduleId, lessonNo, ex)).join("") : ""}

      <div class="footerSpace"></div>
    `;
  }

  function renderExercise(moduleId, lessonNo, ex) {
    const locked = isLocked(moduleId, lessonNo, ex.id);

    return `
      <div class="card ex" data-exid="${escapeHtml(ex.id)}">
        <div class="ex__head">
          <h3>${escapeHtml(ex.title)}</h3>
          <div class="ex__meta">${locked ? `<span class="lock">🔒 1 attempt used</span>` : `<span class="try">1 attempt</span>`}</div>
        </div>

        ${ex.note ? `<div class="note">${escapeHtml(ex.note)}</div>` : ""}

        ${ex.type === "mcq" ? renderMCQ(ex, locked) : ""}
        ${ex.type === "fill" || ex.type === "fill_verbs" || ex.type === "table_fill" ? renderFill(ex, locked) : ""}
        ${ex.type === "tfds" ? renderTFDS(ex, locked) : ""}
        ${ex.type === "odd_one_out" ? renderOdd(ex, locked) : ""}
        ${ex.type === "dragcat" ? renderDragCat(ex, locked) : ""}
        ${ex.type === "pairs" ? renderPairs(ex) : ""}

        ${ex.type !== "pairs" ? `
          <div class="ex__actions">
            <button class="btn btn--primary" ${locked ? "disabled" : ""} data-action="check">Check</button>
            <button class="btn" data-action="reset">Reset</button>
          </div>
          <div class="ex__result" aria-live="polite"></div>
        ` : `
          <div class="note">No auto-check here (speaking/writing).</div>
        `}
      </div>
    `;
  }

  function renderMCQ(ex, locked) {
    return `
      <div class="qList">
        ${ex.items.map((it, idx) => `
          <div class="qItem" data-idx="${idx}">
            <div class="qText">${escapeHtml(it.q)}</div>
            <div class="opts">
              ${it.opts.map(o => `
                <label class="opt">
                  <input type="radio" name="${escapeHtml(ex.id)}_${idx}" value="${escapeHtml(o)}" ${locked ? "disabled" : ""}/>
                  <span>${escapeHtml(o)}</span>
                </label>
              `).join("")}
            </div>
            <div class="mark"></div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderFill(ex, locked) {
    return `
      ${ex.bank ? `<div class="bank">Word bank: ${ex.bank.map(escapeHtml).join(", ")}</div>` : ""}
      <div class="qList">
        ${ex.items.map((it, idx) => `
          <div class="qItem" data-idx="${idx}">
            <div class="qText">${escapeHtml(it.q)}</div>
            <input class="inp" ${locked ? "disabled" : ""} placeholder="Type answer..." />
            <div class="mark"></div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderTFDS(ex, locked) {
    const opts = ["T","F","DS"];
    return `
      <div class="qList">
        ${ex.items.map((it, idx) => `
          <div class="qItem" data-idx="${idx}">
            <div class="qText">${escapeHtml(it.q)}</div>
            <div class="opts">
              ${opts.map(o => `
                <label class="opt">
                  <input type="radio" name="${escapeHtml(ex.id)}_${idx}" value="${o}" ${locked ? "disabled" : ""}/>
                  <span>${o}</span>
                </label>
              `).join("")}
            </div>
            <div class="mark"></div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderOdd(ex, locked) {
    return `
      <div class="qList">
        ${ex.items.map((it, idx) => `
          <div class="qItem" data-idx="${idx}">
            <div class="qText">${escapeHtml(it.q)}</div>
            <input class="inp" ${locked ? "disabled" : ""} placeholder="Type the odd word..." />
            <div class="mark"></div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // Drag & drop categorise
  function renderDragCat(ex, locked) {
    const items = ex.items.map((it, i) =>
      `<button class="chip" draggable="${locked ? "false" : "true"}" data-chip="${i}" data-cat="${escapeHtml(it.cat)}">${escapeHtml(it.text)}</button>`
    ).join("");

    const cats = ex.categories.map(c =>
      `<div class="dropzone" data-zone="${escapeHtml(c)}">
         <div class="dropzone__title">${escapeHtml(c)}</div>
         <div class="dropzone__body"></div>
       </div>`
    ).join("");

    return `
      <div class="note">Drag a chip → drop into a category.</div>
      <div class="chips">${items}</div>
      <div class="zones">${cats}</div>
    `;
  }

  function renderPairs(ex) {
    return `
      ${ex.groups?.map(g => `
        <div class="bank"><b>${escapeHtml(g.label)}</b>: ${g.items.map(escapeHtml).join(", ")}</div>
      `).join("") || ""}
      <div class="note">${escapeHtml(ex.prompts?.join(" · ") || "")}</div>
    `;
  }

  // ---------- check logic ----------
  function normalize(s) {
    return String(s || "").trim().toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[.?!]/g, "");
  }

  function checkExercise(moduleId, lessonNo, ex, exEl) {
    if (isLocked(moduleId, lessonNo, ex.id)) return;

    let correct = 0;
    let total = 0;

    const resultEl = exEl.querySelector(".ex__result");

    const setMark = (qItemEl, ok) => {
      const mark = qItemEl.querySelector(".mark");
      mark.innerHTML = ok
        ? `<span class="ok">✅</span><span class="starPop">⭐</span>`
        : `<span class="bad">❌</span>`;
      if (ok) {
        mark.classList.add("pop");
        setTimeout(() => mark.classList.remove("pop"), 450);
      }
    };

    if (ex.type === "mcq" || ex.type === "tfds") {
      const qItems = [...exEl.querySelectorAll(".qItem")];
      qItems.forEach((qi, idx) => {
        total++;
        const chosen = qi.querySelector("input[type=radio]:checked")?.value || "";
        const ok = normalize(chosen) === normalize(ex.items[idx].a);
        if (ok) correct++;
        setMark(qi, ok);
      });
    }

    if (ex.type === "fill" || ex.type === "fill_verbs" || ex.type === "table_fill" || ex.type === "odd_one_out") {
      const qItems = [...exEl.querySelectorAll(".qItem")];
      qItems.forEach((qi, idx) => {
        total++;
        const val = qi.querySelector(".inp")?.value || "";
        const ok = normalize(val) === normalize(ex.items[idx].a);
        if (ok) correct++;
        setMark(qi, ok);
      });
    }

    if (ex.type === "dragcat") {
      const zones = [...exEl.querySelectorAll(".dropzone")];
      const chips = [...exEl.querySelectorAll(".chip")];

      // if chips still not placed, count them wrong
      const placed = new Map(); // chipIndex -> zoneTitle
      zones.forEach(z => {
        const title = z.dataset.zone;
        [...z.querySelectorAll(".chip")].forEach(ch => {
          placed.set(ch.dataset.chip, title);
        });
      });

      total = ex.items.length;
      correct = 0;

      chips.forEach(ch => {
        const idx = ch.dataset.chip;
        const expected = ch.dataset.cat; // правильная категория в data.js
        const got = placed.get(idx) || "__none__";
        const ok = normalize(got) === normalize(expected);
        if (ok) correct++;
      });

      // simple feedback at top (no per-chip marks)
      resultEl.innerHTML = `<div class="scoreLine">Score: <b>${correct}/${total}</b></div>`;
    } else {
      resultEl.innerHTML = `<div class="scoreLine">Score: <b>${correct}/${total}</b></div>`;
    }

    // add stars = number of correct answers
    if (total > 0) addStars(correct);

    // lock attempt
    lockExercise(moduleId, lessonNo, ex.id);

    // disable inputs
    exEl.querySelectorAll("input,button.btn--primary").forEach(el => {
      if (el.matches("button.btn--primary")) el.disabled = true;
      if (el.matches("input")) el.disabled = true;
    });

    // lock label
    const meta = exEl.querySelector(".ex__meta");
    if (meta) meta.innerHTML = `<span class="lock">🔒 1 attempt used</span>`;
  }

  function resetExercise(ex, exEl) {
    // reset only UI (attempt stays locked if already checked)
    exEl.querySelectorAll("input[type=radio]").forEach(r => r.checked = false);
    exEl.querySelectorAll("input.inp").forEach(i => i.value = "");
    exEl.querySelectorAll(".mark").forEach(m => m.innerHTML = "");
    const res = exEl.querySelector(".ex__result");
    if (res) res.innerHTML = "";

    // drag chips back
    if (ex.type === "dragcat") {
      const chipsWrap = exEl.querySelector(".chips");
      const chips = [...exEl.querySelectorAll(".chip")];
      chips.forEach(ch => chipsWrap.appendChild(ch));
    }
  }

  // ---------- drag events ----------
  function setupDrag(root) {
    let dragEl = null;

    root.addEventListener("dragstart", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      dragEl = chip;
      chip.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });

    root.addEventListener("dragend", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      chip.classList.remove("dragging");
      dragEl = null;
    });

    root.addEventListener("dragover", (e) => {
      const zone = e.target.closest(".dropzone__body");
      if (!zone) return;
      e.preventDefault();
    });

    root.addEventListener("drop", (e) => {
      const body = e.target.closest(".dropzone__body");
      if (!body || !dragEl) return;
      e.preventDefault();
      body.appendChild(dragEl);
    });
  }

  // ---------- main render ----------
  function render() {
    const app = $("#app");
    if (!app) return;

    if (state.screen === "login") app.innerHTML = renderLogin();
    if (state.screen === "menu") app.innerHTML = renderMenu();
    if (state.screen === "lessons") app.innerHTML = renderLessons(state.current.moduleId);
    if (state.screen === "lesson") app.innerHTML = renderLesson(state.current.moduleId, state.current.lessonNo);

    bind();
    setupDrag(app);
  }

  // ---------- bind events ----------
  function bind() {
    const app = $("#app");
    if (!app) return;

    // login
    const btnLogin = $("#btnLogin");
    if (btnLogin) {
      btnLogin.onclick = () => {
        const login = ($("#loginInp").value || "").trim();
        const pin = ($("#pinInp").value || "").trim();

        const allowed = APP_DATA.auth.allowedLogins.includes(login);
        const isStudent = pin === APP_DATA.auth.studentPin;
        const isTeacher = pin === APP_DATA.auth.teacherPin;

        if (!allowed) return alert("Login not allowed.");
        if (!isStudent && !isTeacher) return alert("Wrong PIN.");

        state.user = { login, role: isTeacher ? "teacher" : "student" };
        saveJSON(LS.user, state.user);
        state.screen = "menu";
        render();
      };
    }

    // modules click
    app.querySelectorAll(".module").forEach(btn => {
      btn.onclick = () => {
        state.current.moduleId = btn.dataset.mid;
        state.screen = "lessons";
        render();
      };
    });

    // back to menu
    const backToMenu = $("#backToMenu");
    if (backToMenu) backToMenu.onclick = () => {
      state.screen = "menu";
      render();
    };

    // lessons click
    app.querySelectorAll(".lesson").forEach(btn => {
      btn.onclick = () => {
        state.current.lessonNo = Number(btn.dataset.lno);
        state.screen = "lesson";
        render();
      };
    });

    // back to lessons
    const backToLessons = $("#backToLessons");
    if (backToLessons) backToLessons.onclick = () => {
      state.screen = "lessons";
      render();
    };

    // open book
    const openBookBtn = $("#openBookBtn");
    if (openBookBtn) openBookBtn.onclick = () => {
      const key = `${state.current.moduleId}|${state.current.lessonNo}`;
      const lc = APP_DATA.lessonContent[key];
      const page = lc.bookPage || (lc.bookPages?.[0] ?? 1);
      openBookAt(page);
    };

    // tts
    app.querySelectorAll("[data-tts]").forEach(b => {
      b.onclick = () => speak(b.dataset.tts);
    });

    // exercise actions
    app.querySelectorAll(".card.ex").forEach(exEl => {
      const exId = exEl.dataset.exid;
      const key = `${state.current.moduleId}|${state.current.lessonNo}`;
      const lc = APP_DATA.lessonContent[key];
      const ex = lc.exercises.find(x => x.id === exId);

      exEl.querySelectorAll("[data-action]").forEach(btn => {
        btn.onclick = () => {
          const act = btn.dataset.action;
          if (act === "check") checkExercise(state.current.moduleId, state.current.lessonNo, ex, exEl);
          if (act === "reset") resetExercise(ex, exEl);
        };
      });
    });
  }

  // ---------- init ----------
  if (state.user) state.screen = "menu";
  render();
})();
