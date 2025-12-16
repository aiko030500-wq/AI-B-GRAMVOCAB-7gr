(() => {
  const root = document.getElementById("app");
  const STATE = {
    screen: "login", // login | modules | lessons | lesson | chat
    moduleId: null,
    lessonKey: null,
    user: null,
    chat: { messages: [] },
  };

  const $ = (sel) => document.querySelector(sel);

  // ---------- safety ----------
  if (!window.APP_DATA) {
    root.innerHTML =
      "<div style='padding:16px;font:16px system-ui'>❌ APP_DATA не найден. Проверь, что <b>data.js</b> подключён ДО <b>app.js</b> в index.html</div>";
    return;
  }

  // ---------- storage helpers ----------
  const LS_PREFIX = "AIB_EXCEL7_";
  const userKey = () => (STATE.user?.login ? `${LS_PREFIX}${STATE.user.login}` : `${LS_PREFIX}GUEST`);

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(userKey()) || "{}");
    } catch {
      return {};
    }
  }
  function saveProgress(obj) {
    localStorage.setItem(userKey(), JSON.stringify(obj));
  }
  function ensurePath(obj, pathArr, defVal) {
    let cur = obj;
    for (let i = 0; i < pathArr.length; i++) {
      const k = pathArr[i];
      if (i === pathArr.length - 1) {
        if (cur[k] === undefined) cur[k] = defVal;
      } else {
        if (!cur[k] || typeof cur[k] !== "object") cur[k] = {};
      }
      cur = cur[k];
    }
    return cur;
  }

  function getStarTotal() {
    const p = loadProgress();
    return Number(p?.starsTotal || 0);
  }
  function addStar(n = 1) {
    const p = loadProgress();
    p.starsTotal = Number(p.starsTotal || 0) + n;
    saveProgress(p);
  }

  // ---------- helpers ----------
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  function mixWithWhite(hex, t) {
    const c = (hex || "#0aa35f").replace("#", "");
    const r = parseInt(c.slice(0, 2), 16),
      g = parseInt(c.slice(2, 4), 16),
      b = parseInt(c.slice(4, 6), 16);
    const rr = Math.round(r * (1 - t) + 255 * t);
    const gg = Math.round(g * (1 - t) + 255 * t);
    const bb = Math.round(b * (1 - t) + 255 * t);
    return `rgb(${rr},${gg},${bb})`;
  }

  function setTheme(color) {
    const light = mixWithWhite(color, 0.9);
    document.documentElement.style.setProperty("--pageBg", light);
    document.documentElement.style.setProperty("--accent", color || "#00b86b");
  }

  function topBar(title, subtitle, color) {
    const c2 = mixWithWhite(color, 0.25);
    const stars = getStarTotal();
    return `
      <div class="top" style="background:linear-gradient(90deg, ${color}, ${c2});">
        <div class="topRow">
          <img class="logoImg" src="./logo.png" onerror="this.style.display='none'" />
          <div class="topText">
            <div class="h1">${escapeHtml(title)}</div>
            <div class="sub">${escapeHtml(subtitle || "")}</div>
          </div>
          <div class="topRight">
            <div class="stars">⭐ ${stars}</div>
          </div>
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
    } catch {}
  }

  // ---------- PRINT ----------
  function ensurePrintLayers() {
    if (!document.getElementById("printWatermark")) {
      const wm = document.createElement("div");
      wm.id = "printWatermark";
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
      ft.innerHTML = `
        <div class="printFooterRow">
          <div>Class: __________  Name: __________</div>
          <div>Date: __________  Teacher: __________</div>
        </div>`;
      document.body.appendChild(ft);
    }
  }
  function setPrintColor(moduleColor) {
    document.documentElement.style.setProperty("--wmColor", moduleColor || "rgba(0,0,0,.18)");
  }
  function printLesson(moduleColor) {
    ensurePrintLayers();
    setPrintColor(moduleColor || "#00b86b");
    window.print();
  }

  // ---------- attempt + check UI ----------
  function keyForItem(lessonKey, exId, itemId) {
    return `${lessonKey}::${exId}::${itemId}`;
  }

  function getAttemptState(itemKey) {
    const p = loadProgress();
    return p?.attempts?.[itemKey] || null;
  }

  function setAttemptState(itemKey, value) {
    const p = loadProgress();
    ensurePath(p, ["attempts"], {});
    p.attempts[itemKey] = value; // { tried:true, correct:true/false }
    saveProgress(p);
  }

  function setMark(el, ok) {
    el.innerHTML = ok
      ? `<span class="mark ok">✅ Correct</span>`
      : `<span class="mark no">❌ Wrong</span>`;
  }

  // ---------- screens ----------
  function renderLogin() {
    const c = APP_DATA.modules?.[0]?.color || "#00b86b";
    setTheme(c);

    root.innerHTML = `
      <div class="wrap">
        ${topBar(APP_DATA.appTitle || "AI Bayan · Excel 7", "Login", c)}

        <div class="card loginCard">
          <div class="title">Student / Teacher</div>
          <div class="muted">Введите Login и PIN</div>
          <div class="line"></div>

          <div class="label">Login</div>
          <input class="input" id="login" placeholder="например: 7BLr1" autocomplete="off"/>

          <div class="label">PIN</div>
          <input class="input" id="pin" placeholder="****" inputmode="numeric" autocomplete="off"/>

          <div class="btnRow" style="margin-top:12px">
            <button class="btn btnPrimary" id="go"
              style="background:linear-gradient(90deg,${c},${mixWithWhite(c,0.2)});color:#fff">
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

      if (!A) {
        $("#msg").innerHTML = "<span class='no'>❌ auth не найден в data.js</span>";
        return;
      }

      const okLogin = (A.allowedLogins || []).includes(login);
      if (!okLogin) {
        $("#msg").innerHTML = "<span class='no'>❌ Неверный Login</span>";
        return;
      }

      if (pin === A.studentPin) {
        STATE.user = { role: "student", login };
        STATE.screen = "modules";
        render();
        return;
      }
      if (pin === A.teacherPin) {
        STATE.user = { role: "teacher", login };
        STATE.screen = "modules";
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

    root.innerHTML = `
      <div class="wrap">
        ${topBar(APP_DATA.appTitle || "AI Bayan · Excel 7", STATE.user ? `${STATE.user.login} · ${STATE.user.role}` : "Modules", c)}

        <div class="grid">
          ${modules
            .map(
              (mod) => `
            <button class="lessonCard" style="border-color:${mod.color}" data-mid="${mod.id}">
              <div class="lessonTop">
                <div>
                  <div class="title">${escapeHtml(mod.title)}</div>
                  <div class="muted">${mod.lessonsCount || 10} lessons</div>
                </div>
                <div class="badge">Open</div>
              </div>
            </button>
          `
            )
            .join("")}
        </div>

        <div class="bottomBar">
          <button class="bottomBtn" id="openChat"
            style="background:linear-gradient(90deg,#00b86b,#18c27a);color:#fff">
            💬 Chat with AI Bayan
          </button>
        </div>
      </div>
    `;

    document.querySelectorAll("[data-mid]").forEach((b) => {
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
    const mod = (APP_DATA.modules || []).find((x) => x.id === STATE.moduleId) || (APP_DATA.modules || [])[0];
    if (!mod) {
      STATE.screen = "modules";
      render();
      return;
    }
    setTheme(mod.color);

    const total = mod.lessonsCount || 10;
    const keys = Array.from({ length: total }, (_, i) => `${mod.id}|${i + 1}`);
    const lessons = keys.map((k, i) => ({ key: k, idx: i + 1, data: APP_DATA.lessonContent?.[k] }));

    root.innerHTML = `
      <div class="wrap">
        ${topBar(mod.title, "Choose a lesson", mod.color)}

        <div class="btnRow" style="margin-top:12px">
          <button class="btn btnGhost" id="backMods">← Main Menu</button>
        </div>

        <div class="grid">
          ${lessons
            .map((L, i) => {
              const d = L.data || { title: `Lesson ${i + 1}` };
              const border = mixWithWhite(mod.color, 0.2 + (i / Math.max(1, total - 1)) * 0.55);
              return `
                <button class="lessonCard" style="border-color:${border}" data-lkey="${L.key}">
                  <div class="lessonTop">
                    <div>
                      <div class="title">${escapeHtml(d.title || `Lesson ${i + 1}`)}</div>
                      <div class="muted">${d.bookPage ? `Book p.${d.bookPage}` : ""}</div>
                    </div>
                    <div class="badge">Open</div>
                  </div>
                </button>
              `;
            })
            .join("")}
        </div>
      </div>
    `;

    $("#backMods").onclick = () => {
      STATE.screen = "modules";
      render();
    };
    document.querySelectorAll("[data-lkey]").forEach((b) => {
      b.onclick = () => {
        STATE.lessonKey = b.getAttribute("data-lkey");
        STATE.screen = "lesson";
        render();
      };
    });
  }

  // ---------- lesson renderer (auto) ----------
  function renderLesson() {
    const mod = (APP_DATA.modules || []).find((x) => x.id === STATE.moduleId) || (APP_DATA.modules || [])[0];
    if (!mod) {
      STATE.screen = "modules";
      render();
      return;
    }
    setTheme(mod.color);

    const L = APP_DATA.lessonContent?.[STATE.lessonKey];
    if (!L) {
      root.innerHTML = `<div class="wrap">${topBar(mod.title, "Lesson not found", mod.color)}<div class="card">Нет данных урока.</div></div>`;
      return;
    }

    root.innerHTML = `
      <div class="wrap">
        ${topBar(L.title || "Lesson", L.bookPage ? `Book page: ${L.bookPage}` : "", mod.color)}

        <div class="btnRow" style="margin-top:12px">
          <button class="btn btnGhost" id="backLessons">← Back</button>
          <button class="btn btnGhost" id="toModules">🏠 Main Menu</button>
          <button class="btn btnPrimary" id="printLessonBtn"
            style="background:linear-gradient(90deg,${mod.color},${mixWithWhite(mod.color,0.2)});color:#fff">
            🖨 Print
          </button>
        </div>

        <div class="grid" id="lessonGrid"></div>
      </div>
    `;

    $("#backLessons").onclick = () => {
      STATE.screen = "lessons";
      render();
    };
    $("#toModules").onclick = () => {
      STATE.screen = "modules";
      render();
    };
    $("#printLessonBtn").onclick = () => printLesson(mod.color);

    const grid = $("#lessonGrid");

    // 1) vocab cards
    if (Array.isArray(L.vocabCards) && L.vocabCards.length) {
      grid.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card">
          <div class="title">Vocabulary</div>
          <div class="muted">Tap 🔊 to listen</div>
          <div class="vgrid">
            ${L.vocabCards
              .map(
                (v) => `
              <div class="vcard">
                <div class="vemojiRow">
                  <div class="vemoji">${escapeHtml(v.emoji || "📌")}</div>
                  <button class="vplay" data-say="${escapeHtml(v.tts || v.en || "")}">🔊</button>
                </div>
                <div class="ven">${escapeHtml(v.en || "")}</div>
                <div class="vru">${escapeHtml(v.ru || "")}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `
      );
    }

    // 2) reading blocks (если есть)
    if (L.readingA?.text || L.readingB?.text || L.reading?.text) {
      const blocks = [];
      if (L.readingA?.text) blocks.push({ title: L.readingA.title || "Text A", text: L.readingA.text });
      if (L.readingB?.text) blocks.push({ title: L.readingB.title || "Text B", text: L.readingB.text });
      if (L.reading?.text) blocks.push({ title: L.reading.title || "Reading", text: L.reading.text });

      grid.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card">
          <div class="title">Reading</div>
          <div class="line"></div>
          ${blocks
            .map(
              (b) => `
            <div class="readBlock">
              <div class="readTitle">${escapeHtml(b.title)}</div>
              <div class="readText">${escapeHtml(b.text)}</div>
            </div>
          `
            )
            .join("")}
        </div>
      `
      );
    }

    // 3) Render exercises automatically
    const exerciseEntries = Object.entries(L).filter(([k, v]) => /^exercise\d+$/i.test(k) && v);
    // also known blocks:
    // trueFalse, complete, task, speaking, listening, phrases, review
    const extraBlocks = ["trueFalse", "complete", "task", "speaking", "listening", "phrases", "review", "grammar", "grammar1", "grammar2", "study"];

    exerciseEntries.forEach(([k, ex], idx) => {
      grid.insertAdjacentHTML("beforeend", renderExerciseAuto(ex, `${k}`));
    });

    extraBlocks.forEach((k) => {
      if (L[k]) {
        grid.insertAdjacentHTML("beforeend", renderBlockAuto(L[k], k));
      }
    });

    // 4) extras list
    if (Array.isArray(L.extras) && L.extras.length) {
      grid.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card">
          <div class="title">Extra</div>
          <div class="line"></div>
          ${L.extras
            .map(
              (x) => `
            <div class="extraItem">
              <div class="title">${escapeHtml(x.title || "")}</div>
              <div class="muted">${escapeHtml(x.note || "")}</div>
            </div>
          `
            )
            .join("")}
        </div>
      `
      );
    }

    // wire TTS buttons
    document.querySelectorAll("[data-say]").forEach((btn) => {
      btn.onclick = () => speak(btn.getAttribute("data-say"));
    });

    // wire checking logic
    wireCheckers();
  }

  function renderExerciseAuto(ex, exId) {
    const title = escapeHtml(ex.title || "Exercise");
    const items = ex.items || [];

    // CASE A: categorize (items are strings, categories exist)
    if (Array.isArray(items) && items.length && typeof items[0] === "string" && Array.isArray(ex.categories)) {
      return renderCategorise(ex, exId);
    }

    // CASE B: MCQ (items objects with opts + a)
    if (Array.isArray(items) && items.length && typeof items[0] === "object" && items[0]?.opts) {
      return renderMCQ(ex, exId);
    }

    // CASE C: list input with answers (plural, etc)
    if (Array.isArray(items) && items.length && typeof items[0] === "string") {
      // use ex.answers map or array
      // ex.answers can be { child:"children", ... } OR array aligned with items
      return renderInputList(ex, exId);
    }

    return `
      <div class="card">
        <div class="title">${title}</div>
        <div class="muted">Нет поддерживаемого формата задания. Добавь items/opts/answers в data.js</div>
      </div>
    `;
  }

  function renderBlockAuto(block, blockId) {
    // grammar blocks
    if (block?.enRule || block?.ruRule || block?.formula) {
      return `
        <div class="card">
          <div class="title">${escapeHtml(block.title || "Grammar")}</div>
          ${block.enRule ? `<div class="muted"><b>EN:</b> ${escapeHtml(block.enRule)}</div>` : ""}
          ${block.ruRule ? `<div class="muted"><b>RU:</b> ${escapeHtml(block.ruRule)}</div>` : ""}
          ${block.formula ? `<pre class="formula">${escapeHtml(block.formula)}</pre>` : ""}
        </div>
      `;
    }

    // true/false block
    if (blockId === "trueFalse" && Array.isArray(block.items)) {
      return renderTrueFalse(block, blockId);
    }

    // complete sentences block
    if (blockId === "complete" && Array.isArray(block.items)) {
      return renderComplete(block, blockId);
    }

    // phrases list
    if (blockId === "phrases" && Array.isArray(block)) {
      return `
        <div class="card">
          <div class="title">Phrases</div>
          <div class="line"></div>
          ${block.map((p) => `<div class="pill">${escapeHtml(p)}</div>`).join("")}
        </div>
      `;
    }

    // task (writing)
    if (blockId === "task" && block?.plan) {
      return `
        <div class="card">
          <div class="title">${escapeHtml(block.title || "Task")}</div>
          <div class="line"></div>
          <ul class="ul">
            ${(block.plan || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("")}
          </ul>
        </div>
      `;
    }

    // speaking prompts
    if (blockId === "speaking" && Array.isArray(block.prompts)) {
      return `
        <div class="card">
          <div class="title">${escapeHtml(block.title || "Speaking")}</div>
          <div class="line"></div>
          <ul class="ul">
            ${block.prompts.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}
          </ul>
        </div>
      `;
    }

    // listening note
    if (blockId === "listening") {
      return `
        <div class="card">
          <div class="title">${escapeHtml(block.title || "Listening")}</div>
          ${block.note ? `<div class="muted">${escapeHtml(block.note)}</div>` : ""}
        </div>
      `;
    }

    // review items
    if (blockId === "review" && Array.isArray(block.items)) {
      return `
        <div class="card">
          <div class="title">${escapeHtml(block.title || "Review")}</div>
          <div class="line"></div>
          <ul class="ul">
            ${block.items.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}
          </ul>
        </div>
      `;
    }

    // fallback
    if (typeof block === "string") {
      return `<div class="card"><div class="title">${escapeHtml(blockId)}</div><div class="muted">${escapeHtml(block)}</div></div>`;
    }

    return `
      <div class="card">
        <div class="title">${escapeHtml(block.title || blockId)}</div>
        <div class="muted">Блок есть в data.js, но формат не поддержан. Скажи какой тип — добавлю.</div>
      </div>
    `;
  }

  // ---------- exercise renderers ----------
  function renderCategorise(ex, exId) {
    const id = "cat_" + Math.random().toString(16).slice(2);
    return `
      <div class="card" id="${id}" data-exid="${escapeHtml(exId)}">
        <div class="title">${escapeHtml(ex.title || "Exercise")}</div>
        <div class="muted">Tap a word → tap a category box.</div>
        <div class="line"></div>

        <div class="pillRow" data-role="items">
          ${(ex.items || []).map((w, i) => `<span class="pill" data-word="${escapeHtml(w)}" data-itemid="w${i}">${escapeHtml(w)}</span>`).join("")}
        </div>

        <div class="line"></div>

        <div class="catGrid">
          ${(ex.categories || [])
            .map(
              (c) => `
            <div class="catBox" data-cat="${escapeHtml(c)}">
              <div class="catTitle">${escapeHtml(c)}</div>
              <div class="pillRow" data-bucket="${escapeHtml(c)}"></div>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="line"></div>
        <div class="btnRow">
          <button class="btn btnGhost" data-action="reset">Reset</button>
          <span class="small">Классификация</span>
        </div>
      </div>
    `;
  }

  function renderMCQ(ex, exId) {
    const id = "mcq_" + Math.random().toString(16).slice(2);
    return `
      <div class="card" id="${id}" data-exid="${escapeHtml(exId)}">
        <div class="title">${escapeHtml(ex.title || "Exercise")}</div>
        <div class="muted">Choose one answer. One attempt.</div>
        <div class="line"></div>

        <div class="qList">
          ${(ex.items || [])
            .map((it, i) => {
              const itemId = `q${i + 1}`;
              return `
                <div class="qCard" data-item="${itemId}" data-answer="${escapeHtml(it.a)}">
                  <div class="qText">${escapeHtml(it.q)}</div>
                  <div class="opts">
                    ${(it.opts || [])
                      .map(
                        (o) => `
                      <button class="optBtn" data-opt="${escapeHtml(o)}">${escapeHtml(o)}</button>
                    `
                      )
                      .join("")}
                  </div>
                  <div class="markRow" data-mark></div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  function renderTrueFalse(block, exId) {
    const id = "tf_" + Math.random().toString(16).slice(2);
    return `
      <div class="card" id="${id}" data-exid="${escapeHtml(exId)}">
        <div class="title">${escapeHtml(block.title || "True / False")}</div>
        <div class="muted">Choose True or False. One attempt.</div>
        <div class="line"></div>

        <div class="qList">
          ${(block.items || [])
            .map((it, i) => {
              const itemId = `tf${i + 1}`;
              return `
                <div class="qCard" data-item="${itemId}" data-answer="${String(it.a)}">
                  <div class="qText">${escapeHtml(it.q)}</div>
                  <div class="opts">
                    <button class="optBtn" data-opt="true">True</button>
                    <button class="optBtn" data-opt="false">False</button>
                  </div>
                  <div class="markRow" data-mark></div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  function renderInputList(ex, exId) {
    const id = "in_" + Math.random().toString(16).slice(2);
    return `
      <div class="card" id="${id}" data-exid="${escapeHtml(exId)}">
        <div class="title">${escapeHtml(ex.title || "Exercise")}</div>
        <div class="muted">Type answer → Check. One attempt.</div>
        <div class="line"></div>

        <div class="qList">
          ${(ex.items || [])
            .map((w, i) => {
              const itemId = `in${i + 1}`;
              // answers: ex.answers can be map or array
              let ans = "";
              if (ex.answers && typeof ex.answers === "object" && !Array.isArray(ex.answers)) ans = ex.answers[w] || "";
              if (Array.isArray(ex.answers)) ans = ex.answers[i] || "";
              return `
                <div class="qCard" data-item="${itemId}" data-answer="${escapeHtml(ans)}">
                  <div class="qText">${escapeHtml(w)}</div>
                  <div class="inRow">
                    <input class="input" data-input placeholder="Type..." />
                    <button class="btn btnPrimary" data-check>Check</button>
                  </div>
                  <div class="markRow" data-mark></div>
                  ${ans ? "" : `<div class="hint">⚠️ Добавь ответы в data.js: <b>exercise.answers</b></div>`}
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  function renderComplete(block, exId) {
    const id = "cmp_" + Math.random().toString(16).slice(2);
    // block.items can be strings OR {q,a}
    return `
      <div class="card" id="${id}" data-exid="${escapeHtml(exId)}">
        <div class="title">${escapeHtml(block.title || "Complete")}</div>
        <div class="muted">Type answer → Check. One attempt.</div>
        <div class="line"></div>

        <div class="qList">
          ${(block.items || [])
            .map((it, i) => {
              const itemId = `c${i + 1}`;
              const q = typeof it === "string" ? it : it.q;
              const a = typeof it === "string" ? "" : it.a;
              return `
                <div class="qCard" data-item="${itemId}" data-answer="${escapeHtml(a || "")}">
                  <div class="qText">${escapeHtml(q || "")}</div>
                  <div class="inRow">
                    <input class="input" data-input placeholder="Type..." />
                    <button class="btn btnPrimary" data-check>Check</button>
                  </div>
                  <div class="markRow" data-mark></div>
                  ${a ? "" : `<div class="hint">⚠️ Для автопроверки сделай так в data.js: { q:"...", a:"..." }</div>`}
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  // ---------- wire interactions ----------
  function wireCheckers() {
    // MCQ + TF
    document.querySelectorAll(".qCard").forEach((card) => {
      const exWrap = card.closest("[data-exid]");
      if (!exWrap) return;
      const exId = exWrap.getAttribute("data-exid") || "ex";
      const itemId = card.getAttribute("data-item") || "item";
      const itemKey = keyForItem(STATE.lessonKey, exId, itemId);

      const prev = getAttemptState(itemKey);
      if (prev?.tried) {
        // lock + show previous result
        const markEl = card.querySelector("[data-mark]");
        if (markEl) setMark(markEl, !!prev.correct);
        card.querySelectorAll("button").forEach((b) => (b.disabled = true));
        const inp = card.querySelector("[data-input]");
        if (inp) inp.disabled = true;
      }

      // option buttons
      card.querySelectorAll(".optBtn").forEach((btn) => {
        btn.onclick = () => {
          const prev2 = getAttemptState(itemKey);
          if (prev2?.tried) return;

          const chosen = btn.getAttribute("data-opt");
          const ans = card.getAttribute("data-answer");
          const ok = String(chosen).trim().toLowerCase() === String(ans).trim().toLowerCase();

          setAttemptState(itemKey, { tried: true, correct: ok });
          if (ok) addStar(1);

          const markEl = card.querySelector("[data-mark]");
          if (markEl) setMark(markEl, ok);

          // lock
          card.querySelectorAll("button").forEach((b) => (b.disabled = true));
          renderTopStarsOnly();
        };
      });

      // input check button
      const checkBtn = card.querySelector("[data-check]");
      if (checkBtn) {
        checkBtn.onclick = () => {
          const prev2 = getAttemptState(itemKey);
          if (prev2?.tried) return;

          const inp = card.querySelector("[data-input]");
          const userVal = (inp?.value || "").trim().toLowerCase();
          const ans = (card.getAttribute("data-answer") || "").trim().toLowerCase();

          if (!ans) {
            const markEl = card.querySelector("[data-mark]");
            if (markEl) markEl.innerHTML = `<span class="mark warn">⚠️ No answer in data.js</span>`;
            return;
          }

          const ok = userVal === ans;

          setAttemptState(itemKey, { tried: true, correct: ok });
          if (ok) addStar(1);

          const markEl = card.querySelector("[data-mark]");
          if (markEl) setMark(markEl, ok);

          // lock
          card.querySelectorAll("button").forEach((b) => (b.disabled = true));
          if (inp) inp.disabled = true;
          renderTopStarsOnly();
        };
      }
    });

    // Categorise tap-move + reset
    document.querySelectorAll("[id^='cat_']").forEach((box) => {
      let selectedWordEl = null;

      box.querySelectorAll("[data-word]").forEach((p) => {
        p.onclick = () => {
          box.querySelectorAll("[data-word]").forEach((x) => x.classList.remove("selected"));
          p.classList.add("selected");
          selectedWordEl = p;
        };
      });

      box.querySelectorAll("[data-cat]").forEach((cbox) => {
        cbox.onclick = () => {
          if (!selectedWordEl) return;
          const cat = cbox.getAttribute("data-cat");
          const bucket = box.querySelector(`[data-bucket="${CSS.escape(cat)}"]`);
          if (bucket) bucket.appendChild(selectedWordEl);
          selectedWordEl.classList.remove("selected");
          selectedWordEl = null;
        };
      });

      const resetBtn = box.querySelector("[data-action='reset']");
      if (resetBtn) {
        resetBtn.onclick = () => {
          const itemsRow = box.querySelector("[data-role='items']");
          box.querySelectorAll("[data-word]").forEach((p) => itemsRow.appendChild(p));
          box.querySelectorAll(".pill").forEach((x) => x.classList.remove("selected"));
          selectedWordEl = null;
        };
      }
    });
  }

  // update only stars in topbar without rerender whole page
  function renderTopStarsOnly() {
    const el = document.querySelector(".stars");
    if (el) el.textContent = `⭐ ${getStarTotal()}`;
  }

  // ---------- chat ----------
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
              style="background:linear-gradient(90deg,${mod.color},${mixWithWhite(mod.color,0.2)});color:#fff">
              Send
            </button>
          </div>
        </div>
      </div>
    `;

    $("#backHome").onclick = () => {
      STATE.screen = "modules";
      render();
    };

    function draw() {
      const list = $("#chatList");
      list.innerHTML = msgs
        .map(
          (m) => `
        <div class="vcard" style="border-radius:14px">
          <div class="small"><b>${m.role === "user" ? "You" : "AI Bayan"}</b></div>
          <div style="margin-top:6px">${escapeHtml(m.text)}</div>
        </div>
      `
        )
        .join("");
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

  // start
  STATE.moduleId = APP_DATA.modules?.[0]?.id || "m1";
  render();
})();
