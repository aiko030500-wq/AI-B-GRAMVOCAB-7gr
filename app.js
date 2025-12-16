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
    root.innerHTML =
      "<div style='padding:16px;font:16px system-ui'>❌ APP_DATA не найден. Проверь подключение data.js</div>";
    return;
  }
  // ✅ ВАЖНО: дальше работаем через APP_DATA
  const APP_DATA = window.APP_DATA;

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

  // ---------- screens ----------
  function renderLogin() {
    const c = (APP_DATA.modules?.[0]?.color) || "#00b86b";
    setTheme(c);

    root.innerHTML = `
      <div class="wrap">
        ${topBar("AI Bayan · Excel 7", "Login", c)}

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
        STATE.moduleId = APP_DATA.modules?.[0]?.id || "m1"; // ✅ после входа
        STATE.screen = "modules";
        render();
        return;
      }
      if (pin === A.teacherPin) {
        STATE.user = { role: "teacher", login };
        STATE.moduleId = APP_DATA.modules?.[0]?.id || "m1"; // ✅ после входа
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
        ${topBar("AI Bayan · Excel 7", STATE.user ? `${STATE.user.login} · ${STATE.user.role}` : "Modules", c)}

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
            const border = shadeForLessonCard(mod.color, i, total);
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
    const ex1 = L.exercise1 || null;
    const ex2 = L.exercise2 || null;
    const extras = Array.isArray(L.extras) ? L.extras : [];

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

          ${ex1 ? renderCategorise(ex1) : ""}
          ${ex2 ? renderItsPhrases(ex2) : ""}

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

    document.querySelectorAll("[data-say]").forEach(btn => {
      btn.onclick = () => speak(btn.getAttribute("data-say"));
    });

    wireInteractions();
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

  // ---------- exercises ----------
  function renderCategorise(ex) {
    const id = "cat_" + Math.random().toString(16).slice(2);
    return `
      <div class="card" id="${id}">
        <div class="title">${escapeHtml(ex.title || "Exercise")}</div>
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
          <button class="btn btnGhost" data-action="reset">Reset</button>
          <span class="small">Задание на классификацию (как в книге).</span>
        </div>
      </div>
    `;
  }

  function renderItsPhrases(ex) {
    const id = "its_" + Math.random().toString(16).slice(2);
    return `
      <div class="card" id="${id}">
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
        <div class="small">Формула: I like … because it’s … / I don’t like … because it’s …</div>
      </div>
    `;
  }

  function wireInteractions() {
    // Categorise
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

      const resetBtn = box.querySelector("[data-action='reset']");
      if (resetBtn) {
        resetBtn.onclick = () => {
          const itemsRow = box.querySelector("[data-role='items']");
          box.querySelectorAll("[data-word]").forEach(p => itemsRow.appendChild(p));
          box.querySelectorAll(".pill").forEach(x => x.classList.remove("selected"));
          selectedWordEl = null;
        };
      }
    });

    // It’s… selections highlight
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
  // ✅ СТАРТ ВСЕГДА С ЛОГИНА
  STATE.screen = "login";
  STATE.moduleId = null;
  STATE.lessonKey = null;
  render();
})();
