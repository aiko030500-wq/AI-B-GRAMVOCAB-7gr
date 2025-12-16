(() => {
  const root = document.getElementById("app");

  const STATE = {
    screen: "login",      // login | modules | lessons | lesson | chat
    moduleId: null,
    lessonKey: null,
    user: null,
    chat: { messages: [] },
  };

  const $ = (sel) => document.querySelector(sel);

  // ---------- guard ----------
  if (!window.APP_DATA) {
    root.innerHTML = "<div style='padding:16px;font:16px system-ui'>❌ APP_DATA не найден. Проверь: data.js подключён ДО app.js</div>";
    return;
  }

  // ---------- helpers ----------
  function escapeHtml(s) {
    return String(s ?? "").replace(/[&<>"]/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
    }[c]));
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
    document.documentElement.style.setProperty("--accent", color || "#0aa35f");
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
        </div>
      </div>
    `;
  }

  function shadeForLessonCard(moduleColor, idx, total) {
    const t = 0.20 + (idx / Math.max(1, total - 1)) * 0.55;
    return mixWithWhite(moduleColor, t);
  }

  // ---------- storage: attempts + stars ----------
  function keyPrefix() {
    const u = STATE.user?.login || "guest";
    return `aibayan_excel7:${u}`;
  }

  function getLessonState(lessonKey) {
    try {
      const raw = localStorage.getItem(`${keyPrefix()}:lesson:${lessonKey}`);
      return raw ? JSON.parse(raw) : { submitted: false, stars: 0 };
    } catch {
      return { submitted: false, stars: 0 };
    }
  }

  function setLessonState(lessonKey, st) {
    localStorage.setItem(`${keyPrefix()}:lesson:${lessonKey}`, JSON.stringify(st));
  }

  function addStars(lessonKey, n) {
    const cur = getLessonState(lessonKey);
    const next = { ...cur, stars: (cur.stars || 0) + n };
    setLessonState(lessonKey, next);
    return next.stars;
  }

  function markSubmitted(lessonKey) {
    const cur = getLessonState(lessonKey);
    const next = { ...cur, submitted: true };
    setLessonState(lessonKey, next);
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

  function printLesson(moduleColor) {
    ensurePrintLayers();
    document.documentElement.style.setProperty("--wmColor", moduleColor || "rgba(0,0,0,.25)");
    window.print();
  }

  // ---------- login ----------
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

  // ---------- modules ----------
  function renderModules() {
    const modules = APP_DATA.modules || [];
    const c = modules[0]?.color || "#00b86b";
    setTheme(c);

    root.innerHTML = `
      <div class="wrap">
        ${topBar(APP_DATA.appTitle || "AI Bayan · Excel 7",
          STATE.user ? `${STATE.user.login} · ${STATE.user.role}` : "Modules", c)}

        <div class="grid">
          ${modules.map(mod => `
            <button class="lessonCard" style="border-color:${mod.color}" data-mid="${mod.id}">
              <div class="lessonTop">
                <div>
                  <div class="title">${escapeHtml(mod.title)}</div>
                  <div class="muted">${mod.lessonsCount || 10} lessons</div>
                </div>
                <div class="badge">Open</div>
              </div>
            </button>
          `).join("")}
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

  // ---------- lessons list ----------
  function renderLessons() {
    const mod = (APP_DATA.modules || []).find(x => x.id === STATE.moduleId) || (APP_DATA.modules || [])[0];
    if (!mod) { STATE.screen = "modules"; render(); return; }
    setTheme(mod.color);

    const total = mod.lessonsCount || 10;
    const keys = Array.from({ length: total }, (_, i) => `${mod.id}|${i + 1}`);
    const lessons = keys.map((k, idx) => {
      const data = APP_DATA.lessonContent?.[k] || null;
      const st = getLessonState(k);
      return { key: k, idx, data, st };
    });

    root.innerHTML = `
      <div class="wrap">
        ${topBar(mod.title, "Choose a lesson", mod.color)}

        <div class="btnRow" style="margin-top:12px">
          <button class="btn btnGhost" id="backMods">← Back</button>
        </div>

        <div class="grid">
          ${lessons.map((L, i) => {
            const d = L.data || { title: `Lesson ${i + 1}` };
            const border = shadeForLessonCard(mod.color, i, total);
            const stars = L.st?.stars || 0;
            const submitted = !!L.st?.submitted;
            return `
              <button class="lessonCard" style="border-color:${border}" data-lkey="${L.key}">
                <div class="lessonTop">
                  <div>
                    <div class="title">${escapeHtml(d.title || `Lesson ${i + 1}`)}</div>
                    <div class="muted">
                      ${d.bookPage ? `Book p.${d.bookPage}` : ""}
                      ${submitted ? ` · ✅ done` : ""}
                      ${stars ? ` · ⭐ ${stars}` : ""}
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

  // ---------- AUTO RENDER BLOCKS ----------
  function blockCard(title, innerHtml) {
    return `
      <div class="card">
        ${title ? `<div class="title">${escapeHtml(title)}</div>` : ""}
        ${title ? `<div class="line"></div>` : ""}
        ${innerHtml}
      </div>
    `;
  }

  function renderVocabCards(vocab) {
    if (!Array.isArray(vocab) || !vocab.length) return "";
    return blockCard("Vocabulary", `
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
    `);
  }

  function renderReadingBlocks(L) {
    let out = "";

    // readingA / readingB
    if (L.readingA?.text) {
      out += blockCard(L.readingA.title || "Reading A", `<div class="p">${escapeHtml(L.readingA.text)}</div>`);
    }
    if (L.readingB?.text) {
      out += blockCard(L.readingB.title || "Reading B", `<div class="p">${escapeHtml(L.readingB.text)}</div>`);
    }

    // generic reading.text
    if (L.reading?.text) {
      out += blockCard(L.reading.title || "Reading", `<div class="p">${escapeHtml(L.reading.text)}</div>`);
    }

    return out;
  }

  function renderGrammarBlock(g) {
    if (!g) return "";
    const html = `
      ${g.enRule ? `<div class="p"><b>EN:</b> ${escapeHtml(g.enRule)}</div>` : ""}
      ${g.ruRule ? `<div class="p"><b>RU:</b> ${escapeHtml(g.ruRule)}</div>` : ""}
      ${g.formula ? `<pre class="formula">${escapeHtml(g.formula)}</pre>` : ""}
    `;
    return blockCard(g.title || "Grammar", html);
  }

  // --- CHECKABLE: MCQ list (items: {q, opts[], a}) ---
  function renderMcq(ex, id) {
    const items = ex?.items || [];
    if (!items.length) return "";
    return `
      <div class="card" data-ex="${id}" data-kind="mcq">
        <div class="title">${escapeHtml(ex.title || "Exercise")}</div>
        <div class="muted">Choose the correct answer.</div>
        <div class="line"></div>

        ${items.map((it, idx) => `
          <div class="qblock" data-i="${idx}">
            <div class="q">${escapeHtml(it.q || "")}</div>
            <div class="opts">
              ${(it.opts || []).map(opt => `
                <button class="opt" data-opt="${escapeHtml(opt)}">${escapeHtml(opt)}</button>
              `).join("")}
            </div>
            <div class="resultLine" aria-hidden="true"></div>
          </div>
        `).join("")}

        <div class="line"></div>
        <div class="btnRow">
          <button class="btn btnPrimary checkBtn">Check</button>
          <button class="btn btnGhost resetBtn">Reset</button>
          <div class="scoreBox">⭐ <span class="score">0</span></div>
        </div>
      </div>
    `;
  }

  // --- CHECKABLE: True/False (items: {q,a:true/false}) ---
  function renderTrueFalse(tf, id) {
    const items = tf?.items || [];
    if (!items.length) return "";
    return `
      <div class="card" data-ex="${id}" data-kind="tf">
        <div class="title">${escapeHtml(tf.title || "True / False")}</div>
        <div class="muted">Tap T or F.</div>
        <div class="line"></div>

        ${items.map((it, idx) => `
          <div class="qblock" data-i="${idx}">
            <div class="q">${escapeHtml(it.q || "")}</div>
            <div class="opts">
              <button class="opt" data-opt="T">T</button>
              <button class="opt" data-opt="F">F</button>
            </div>
            <div class="resultLine" aria-hidden="true"></div>
          </div>
        `).join("")}

        <div class="line"></div>
        <div class="btnRow">
          <button class="btn btnPrimary checkBtn">Check</button>
          <button class="btn btnGhost resetBtn">Reset</button>
          <div class="scoreBox">⭐ <span class="score">0</span></div>
        </div>
      </div>
    `;
  }

  // --- CHECKABLE: Fill blanks (array of strings) with optional answers[] ---
  // Use: complete: { title, items: ["... ____ ...", ...], answers:["skills","creative",...]}
  function renderComplete(complete, id) {
    const items = complete?.items || [];
    if (!items.length) return "";
    const answers = complete?.answers || null;

    return `
      <div class="card" data-ex="${id}" data-kind="complete">
        <div class="title">${escapeHtml(complete.title || "Complete")}</div>
        <div class="muted">Type answers in blanks.</div>
        <div class="line"></div>

        ${items.map((s, idx) => {
          const parts = String(s).split("__________");
          const left = parts[0] ?? s;
          const right = parts[1] ?? "";
          return `
            <div class="qblock" data-i="${idx}">
              <div class="q">
                ${escapeHtml(left)}
                <input class="blank" data-blank="${idx}" placeholder="..." />
                ${escapeHtml(right)}
              </div>
              <div class="resultLine" aria-hidden="true"></div>
            </div>
          `;
        }).join("")}

        <div class="line"></div>
        <div class="btnRow">
          <button class="btn btnPrimary checkBtn" ${answers ? "" : "disabled"}>Check</button>
          <button class="btn btnGhost resetBtn">Reset</button>
          <div class="scoreBox">⭐ <span class="score">0</span></div>
          ${answers ? "" : `<div class="muted small">Нет answers[] в data.js → проверка выключена.</div>`}
        </div>
      </div>
    `;
  }

  // --- PRACTICE: categorise (no right answers in your structure) ---
  function renderCategorise(ex, id) {
    return `
      <div class="card" data-ex="${id}" data-kind="categorise">
        <div class="title">${escapeHtml(ex.title || "Categorise")}</div>
        <div class="muted">Tap a word → tap a category box.</div>
        <div class="line"></div>

        <div class="pillRow" data-role="items">
          ${(ex.items || []).map(w => `<span class="pill" data-word="${escapeHtml(w)}">${escapeHtml(w)}</span>`).join("")}
        </div>

        <div class="line"></div>

        <div class="catGrid">
          ${(ex.categories || []).map(c => `
            <div class="catBox" data-cat="${escapeHtml(c)}">
              <div class="catTitle">${escapeHtml(c)}</div>
              <div class="pillRow" data-bucket="${escapeHtml(c)}"></div>
            </div>
          `).join("")}
        </div>

        <div class="line"></div>
        <div class="btnRow">
          <button class="btn btnGhost resetBtn">Reset</button>
          <span class="small muted">Practice (без проверки, потому что нет ключа правильных ответов).</span>
        </div>
      </div>
    `;
  }

  // --- PRACTICE: phrases (no scoring) ---
  function renderItsPhrases(ex, id) {
    return `
      <div class="card" data-ex="${id}" data-kind="phrases">
        <div class="title">${escapeHtml(ex.title || "Exercise")}</div>
        <div class="muted">Choose adjectives and write sentences.</div>
        <div class="line"></div>

        <div class="title">It’s… (positive)</div>
        <div class="pillRow">
          ${(ex.itsGood || []).map(w => `<span class="pill" data-good="${escapeHtml(w)}">${escapeHtml(w)}</span>`).join("")}
        </div>

        <div class="title" style="margin-top:10px">It’s… (negative)</div>
        <div class="pillRow">
          ${(ex.itsBad || []).map(w => `<span class="pill" data-bad="${escapeHtml(w)}">${escapeHtml(w)}</span>`).join("")}
        </div>

        <div class="line"></div>

        ${(ex.prompts || []).map((p, i) => `
          <div class="small" style="margin-top:8px">${escapeHtml(p)}</div>
          <input class="input" placeholder="Type here..." data-prompt="${i}">
        `).join("")}

        <div class="line"></div>
        <div class="small muted">Формула: I like … because it’s … / I don’t like … because it’s …</div>
      </div>
    `;
  }

  function renderExtras(extras) {
    if (!Array.isArray(extras) || !extras.length) return "";
    return blockCard("Extra", extras.map(x => `
      <div style="margin-bottom:12px">
        <div class="title">${escapeHtml(x.title || "")}</div>
        <div class="muted">${escapeHtml(x.note || "")}</div>
      </div>
    `).join(""));
  }

  // ---------- lesson screen ----------
  function renderLesson() {
    const mod = (APP_DATA.modules || []).find(x => x.id === STATE.moduleId) || (APP_DATA.modules || [])[0];
    if (!mod) { STATE.screen = "modules"; render(); return; }
    setTheme(mod.color);

    const L = APP_DATA.lessonContent?.[STATE.lessonKey];
    if (!L) {
      root.innerHTML = `<div class="wrap">${topBar(mod.title, "Lesson not found", mod.color)}<div class="card">Нет данных урока.</div></div>`;
      return;
    }

    const ls = getLessonState(STATE.lessonKey);
    const submitted = !!ls.submitted;

    // auto blocks by keys you use in data.js
    let blocks = "";
    blocks += (L.note ? blockCard("Note", `<div class="muted">${escapeHtml(L.note)}</div>`) : "");
    blocks += renderVocabCards(L.vocabCards);
    blocks += renderReadingBlocks(L);

    // grammar blocks: grammar, grammar1, grammar2
    blocks += renderGrammarBlock(L.grammar);
    blocks += renderGrammarBlock(L.grammar1);
    blocks += renderGrammarBlock(L.grammar2);

    // exercises: exercise1.. exercise5
    // we auto-detect by structure
    const exKeys = Object.keys(L).filter(k => /^exercise\d+$/.test(k)).sort();
    exKeys.forEach((k, idx) => {
      const ex = L[k];
      const id = `${STATE.lessonKey}:${k}`;

      if (!ex) return;

      // MCQ
      if (Array.isArray(ex.items) && ex.items.length && typeof ex.items[0] === "object" && ex.items[0].opts) {
        blocks += renderMcq(ex, id);
        return;
      }

      // categorise
      if (Array.isArray(ex.categories) && Array.isArray(ex.items)) {
        blocks += renderCategorise(ex, id);
        return;
      }

      // its phrases
      if (Array.isArray(ex.itsGood) || Array.isArray(ex.itsBad)) {
        blocks += renderItsPhrases(ex, id);
        return;
      }

      // "plural form" list etc (practice only)
      if (Array.isArray(ex.items) && ex.items.length && typeof ex.items[0] === "string") {
        blocks += blockCard(ex.title || "Exercise", `
          <div class="muted">Practice</div>
          <div class="pillRow">
            ${ex.items.map(w => `<span class="pill">${escapeHtml(w)}</span>`).join("")}
          </div>
        `);
        return;
      }

      // fallback
      blocks += blockCard(ex.title || "Exercise", `<div class="muted">Нет шаблона вывода для этого упражнения.</div>`);
    });

    // trueFalse, complete
    if (L.trueFalse?.items) blocks += renderTrueFalse(L.trueFalse, `${STATE.lessonKey}:trueFalse`);
    if (L.complete?.items) blocks += renderComplete(L.complete, `${STATE.lessonKey}:complete`);

    blocks += renderExtras(L.extras);

    root.innerHTML = `
      <div class="wrap">
        ${topBar(L.title || "Lesson", L.bookPage ? `Book page: ${L.bookPage}` : "", mod.color)}

        <div class="btnRow" style="margin-top:12px; align-items:center">
          <button class="btn btnGhost" id="backLessons">← Back</button>
          <button class="btn btnPrimary" id="printLessonBtn"
            style="background:linear-gradient(90deg,${mod.color},${mixWithWhite(mod.color,0.20)});color:#fff">
            🖨 Print
          </button>
          <div class="starsPill" title="Stars in this lesson">
            ⭐ <span id="starsNow">${ls.stars || 0}</span>
            ${submitted ? `<span class="tinyOk">✅</span>` : ""}
          </div>
        </div>

        ${submitted ? `<div class="card warn"><b>1 attempt:</b> этот урок уже был проверен. Можно смотреть, но “Check” заблокирован.</div>` : ""}

        <div class="grid">
          ${blocks}
        </div>
      </div>
    `;

    $("#backLessons").onclick = () => { STATE.screen = "lessons"; render(); };
    $("#printLessonBtn").onclick = () => printLesson(mod.color);

    // TTS
    document.querySelectorAll("[data-say]").forEach(btn => {
      btn.onclick = () => speak(btn.getAttribute("data-say"));
    });

    // wire interactions for pills (categorise + phrases)
    wirePracticeInteractions();

    // wire checkable exercises
    wireCheckables(submitted);
  }

  function wirePracticeInteractions() {
    // Categorise move pills
    document.querySelectorAll("[data-kind='categorise']").forEach(box => {
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

      const resetBtn = box.querySelector(".resetBtn");
      if (resetBtn) {
        resetBtn.onclick = () => {
          const itemsRow = box.querySelector("[data-role='items']");
          box.querySelectorAll("[data-word]").forEach(p => itemsRow.appendChild(p));
          box.querySelectorAll(".pill").forEach(x => x.classList.remove("selected"));
          selectedWordEl = null;
        };
      }
    });

    // Phrases highlight
    document.querySelectorAll("[data-kind='phrases']").forEach(box => {
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
  }

  // ---------- checking + stars ----------
  function wireCheckables(disabled) {
    // select option buttons
    document.querySelectorAll("[data-kind='mcq'],[data-kind='tf']").forEach(card => {
      card.querySelectorAll(".qblock").forEach(qb => {
        qb.querySelectorAll(".opt").forEach(optBtn => {
          optBtn.onclick = () => {
            qb.querySelectorAll(".opt").forEach(b => b.classList.remove("chosen"));
            optBtn.classList.add("chosen");
            qb.setAttribute("data-chosen", optBtn.getAttribute("data-opt"));
          };
        });
      });
    });

    // reset
    document.querySelectorAll(".resetBtn").forEach(btn => {
      btn.onclick = () => {
        const card = btn.closest(".card");
        if (!card) return;

        card.querySelectorAll(".opt").forEach(o => o.classList.remove("chosen", "okOpt", "noOpt"));
        card.querySelectorAll(".resultLine").forEach(r => r.innerHTML = "");
        card.querySelectorAll(".qblock").forEach(q => q.removeAttribute("data-chosen"));
        card.querySelectorAll(".blank").forEach(i => { i.value = ""; i.classList.remove("okIn","noIn"); });

        const scoreEl = card.querySelector(".score");
        if (scoreEl) scoreEl.textContent = "0";
      };
    });

    // check buttons
    document.querySelectorAll(".checkBtn").forEach(btn => {
      const card = btn.closest(".card");
      if (!card) return;

      if (disabled) {
        btn.disabled = true;
        return;
      }

      btn.onclick = () => {
        const kind = card.getAttribute("data-kind");
        let got = 0;
        let total = 0;

        if (kind === "mcq") {
          // find source exercise to get answers
          const exId = card.getAttribute("data-ex"); // "m1|3:exercise1" etc
          const [lk, exKey] = exId.split(":");
          const ex = APP_DATA.lessonContent?.[lk]?.[exKey];
          if (!ex?.items) return;

          card.querySelectorAll(".qblock").forEach((qb, idx) => {
            total++;
            const chosen = qb.getAttribute("data-chosen");
            const ans = ex.items[idx]?.a;

            const res = qb.querySelector(".resultLine");
            qb.querySelectorAll(".opt").forEach(o => o.classList.remove("okOpt","noOpt"));

            if (chosen && ans && String(chosen) === String(ans)) {
              got++;
              res.innerHTML = `<span class="ok">✅ Correct</span>`;
              const chosenBtn = qb.querySelector(`.opt[data-opt="${CSS.escape(chosen)}"]`);
              if (chosenBtn) chosenBtn.classList.add("okOpt");
            } else {
              res.innerHTML = `<span class="no">❌ Wrong</span>` + (ans ? ` <span class="muted small">Answer: <b>${escapeHtml(ans)}</b></span>` : "");
              const chosenBtn = chosen ? qb.querySelector(`.opt[data-opt="${CSS.escape(chosen)}"]`) : null;
              if (chosenBtn) chosenBtn.classList.add("noOpt");
            }
          });
        }

        if (kind === "tf") {
          const exId = card.getAttribute("data-ex");
          const lk = exId.split(":")[0];
          const tf = APP_DATA.lessonContent?.[lk]?.trueFalse;
          if (!tf?.items) return;

          card.querySelectorAll(".qblock").forEach((qb, idx) => {
            total++;
            const chosen = qb.getAttribute("data-chosen"); // "T"|"F"
            const ansBool = !!tf.items[idx]?.a;
            const ans = ansBool ? "T" : "F";

            const res = qb.querySelector(".resultLine");
            qb.querySelectorAll(".opt").forEach(o => o.classList.remove("okOpt","noOpt"));

            if (chosen && chosen === ans) {
              got++;
              res.innerHTML = `<span class="ok">✅ Correct</span>`;
              const chosenBtn = qb.querySelector(`.opt[data-opt="${CSS.escape(chosen)}"]`);
              if (chosenBtn) chosenBtn.classList.add("okOpt");
            } else {
              res.innerHTML = `<span class="no">❌ Wrong</span> <span class="muted small">Answer: <b>${ans}</b></span>`;
              const chosenBtn = chosen ? qb.querySelector(`.opt[data-opt="${CSS.escape(chosen)}"]`) : null;
              if (chosenBtn) chosenBtn.classList.add("noOpt");
            }
          });
        }

        if (kind === "complete") {
          const exId = card.getAttribute("data-ex");
          const lk = exId.split(":")[0];
          const comp = APP_DATA.lessonContent?.[lk]?.complete;
          const answers = comp?.answers;
          if (!Array.isArray(answers) || !answers.length) return;

          card.querySelectorAll(".qblock").forEach((qb, idx) => {
            total++;
            const inp = qb.querySelector(".blank");
            const user = (inp?.value || "").trim().toLowerCase();
            const ans = String(answers[idx] || "").trim().toLowerCase();

            const res = qb.querySelector(".resultLine");
            if (!inp) return;

            inp.classList.remove("okIn","noIn");
            if (user && ans && user === ans) {
              got++;
              inp.classList.add("okIn");
              res.innerHTML = `<span class="ok">✅ Correct</span>`;
            } else {
              inp.classList.add("noIn");
              res.innerHTML = `<span class="no">❌ Wrong</span> <span class="muted small">Answer: <b>${escapeHtml(answers[idx] || "")}</b></span>`;
            }
          });
        }

        // stars
        const scoreEl = card.querySelector(".score");
        if (scoreEl) scoreEl.textContent = String(got);

        // 1 attempt for whole lesson: after any check -> lock lesson
        const newStars = addStars(STATE.lessonKey, got);
        $("#starsNow").textContent = String(newStars);

        markSubmitted(STATE.lessonKey);

        // lock all check buttons
        document.querySelectorAll(".checkBtn").forEach(b => b.disabled = true);

        // small toast
        showToast(`⭐ +${got} stars (saved)`);
      };
    });
  }

  function showToast(text) {
    let t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.className = "toast show";
    setTimeout(() => t.className = "toast", 1600);
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

  // start
  STATE.moduleId = APP_DATA.modules?.[0]?.id || "m1";
  render();
})();
