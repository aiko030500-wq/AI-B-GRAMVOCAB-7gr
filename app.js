(() => {
  const DATA = window.APP_DATA;

  const $ = (s) => document.querySelector(s);

  const store = {
    get(k, d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d; }catch{ return d; } },
    set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
  };

  const state = {
    screen: "modules", // modules | lessons | lesson | exercise
    currentModule: null,
    currentLessonNo: null,
    currentLessonKey: null,
    currentExerciseId: null,
    shades: null,
    stars: store.get("excel7_stars", 0),
  };

  // ===== COLOR: hex -> 8 shades, bg = lightest =====
  function hexToRgb(hex){
    hex = (hex || "").replace("#","").trim();
    if(hex.length === 3) hex = hex.split("").map(c=>c+c).join("");
    const n = parseInt(hex, 16);
    return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
  }
  function rgbToHex({r,g,b}){
    const h = (x)=> x.toString(16).padStart(2,"0");
    return "#" + h(r) + h(g) + h(b);
  }
  function mix(c1, c2, t){
    return {
      r: Math.round(c1.r*(1-t) + c2.r*t),
      g: Math.round(c1.g*(1-t) + c2.g*t),
      b: Math.round(c1.b*(1-t) + c2.b*t),
    };
  }
  function makeShades(hex){
    const base = hexToRgb(hex);
    const white = {r:255,g:255,b:255};
    const black = {r:0,g:0,b:0};

    const shades = [];
    const lightSteps = [0.92, 0.84, 0.72, 0.58, 0.42];
    lightSteps.forEach(t => shades.push(rgbToHex(mix(base, white, t))));
    shades.push(rgbToHex(mix(base, black, 0.08)));
    shades.push(rgbToHex(mix(base, black, 0.16)));
    shades.push(rgbToHex(mix(base, black, 0.26)));
    return shades;
  }
  function applyThemeByHex(hex){
    const shades = makeShades(hex);

    document.documentElement.style.setProperty("--bg", shades[0]);     // ✅ фон = самый светлый
    document.documentElement.style.setProperty("--header", hex);       // ✅ шапка = цвет модуля

    // meta theme-color
    const meta = document.querySelector('meta[name="theme-color"]');
    if(meta) meta.setAttribute("content", hex);

    state.shades = shades;
    return shades;
  }

  // ===== HELPERS =====
  function keyAttempt(moduleId, lessonNo, exId){
    return `attempt_${moduleId}_${lessonNo}_${exId}`;
  }
  function isLocked(moduleId, lessonNo, exId){
    return store.get(keyAttempt(moduleId, lessonNo, exId), 0) >= 1;
  }
  function lockAttempt(moduleId, lessonNo, exId){
    store.set(keyAttempt(moduleId, lessonNo, exId), 1);
  }
  function addStars(n){
    state.stars += n;
    store.set("excel7_stars", state.stars);
  }

  function pickVocabPairs(vocab, count){
    const plain = vocab.map(v => ({
      en: (v.en || "").replace(/^[^\w]+/u, "").trim(), // убрать эмодзи в матчинг
      ru: v.ru
    }));
    const shuffled = plain.slice().sort(()=>Math.random()-0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  // ===== UI TEMPLATES =====
  function headerHTML(sub){
    return `
      <div class="header">
        <div class="headerRow">
          <img class="logo" src="logo.png" alt="logo">
          <div>
            <div class="brandTitle">${DATA.appTitle}</div>
            <div class="brandSub">${sub || ""}</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderModules(){
    state.screen = "modules";
    // общий цвет на меню — зелёный книги
    applyThemeByHex("#0aa35f");

    const cards = DATA.modules.map(m=>{
      const b = makeShades(m.color)[3];
      return `
        <div class="unitCard" style="border-color:${b}" data-mid="${m.id}">
          <div class="unitTitle">${m.title.split("—")[0].trim()}</div>
          <div class="unitTopic">${m.title}</div>
        </div>
      `;
    }).join("");

    $("#app").innerHTML = `
      ${headerHTML("Main Menu")}
      <div class="container">
        ${cards}
        <div class="card">
          <span class="smallTag">Progress</span>
          <h3>⭐ Total stars: ${state.stars}</h3>
          <div class="note">Excel 7 · Modules</div>
        </div>
      </div>
    `;

    document.querySelectorAll(".unitCard").forEach(el=>{
      el.addEventListener("click", ()=>{
        const mod = DATA.modules.find(x=>x.id === el.dataset.mid);
        openModule(mod);
      });
    });
  }

  function openModule(mod){
    state.screen = "lessons";
    state.currentModule = mod;
    state.currentLessonNo = null;
    state.currentLessonKey = null;
    state.currentExerciseId = null;

    const shades = applyThemeByHex(mod.color);

    const lessonBtns = Array.from({length: mod.lessonsCount}, (_,i)=>{
      const n = i+1;
      const bg = shades[(n % 7) + 1]; // 2..8 оттенки
      return `<button class="lessonBtn" style="background:${bg}" data-ln="${n}">Lesson ${n}</button>`;
    }).join("");

    $("#app").innerHTML = `
      ${headerHTML(mod.title)}
      <div class="container">
        <div class="toolbar">
          <button class="pill" id="backMain">⬅ Main menu</button>
          <button class="pill" id="openPdf">📘 Book</button>
        </div>

        <div class="card">
          <span class="smallTag">Module</span>
          <h3>${mod.title}</h3>
          <div class="note">Choose a lesson</div>
        </div>

        <div class="lessonGrid" id="lessonsWrap">
          ${lessonBtns}
        </div>
      </div>
    `;

    $("#backMain").onclick = renderModules;
    $("#openPdf").onclick = () => { window.open(DATA.bookPdf, "_blank"); };

    document.querySelectorAll(".lessonBtn").forEach(b=>{
      b.addEventListener("click", ()=>{
        const ln = Number(b.dataset.ln);
        openLesson(mod, ln);
      });
    });
  }

  function openLesson(mod, lessonNo){
    state.screen = "lesson";
    state.currentLessonNo = lessonNo;
    state.currentLessonKey = `${mod.id}|${lessonNo}`;

    const shades = applyThemeByHex(mod.color);
    const lesson = DATA.lessonContent[state.currentLessonKey];

    // если нет контента — показываем заглушку аккуратно
    if(!lesson){
      $("#app").innerHTML = `
        ${headerHTML(mod.title)}
        <div class="container">
          <div class="toolbar">
            <button class="pill" id="backModule">⬅ Module</button>
            <button class="pill" id="backMain">⬅ Main</button>
          </div>
          <div class="card">
            <h3>Lesson ${lessonNo}</h3>
            <div class="note">No content yet. Add in lessonContent: "${mod.id}|${lessonNo}"</div>
          </div>
        </div>
      `;
      $("#backModule").onclick = ()=> openModule(mod);
      $("#backMain").onclick = renderModules;
      return;
    }

    const heroBg = `linear-gradient(135deg, ${shades[6]}, ${shades[4]})`;
    const exButtons = (lesson.exercises || []).map((ex, idx)=>{
      const bg = `linear-gradient(135deg, ${shades[7]}, ${shades[5]})`;
      const locked = isLocked(mod.id, lessonNo, ex.id);
      return `
        <button class="exBtn ${locked ? "muted":""}" style="background:${bg}" data-ex="${ex.id}">
          ${ex.title}
        </button>
      `;
    }).join("");

    const vocabList = (lesson.vocab || []).map(v=>`<div>• ${v.en} — ${v.ru}</div>`).join("");

    const readingTasks = (lesson.reading?.tasks || []).map((t,i)=>`<div>• ${i+1}) ${t.q}</div>`).join("");

    $("#app").innerHTML = `
      ${headerHTML(mod.title)}
      <div class="container">

        <div class="toolbar">
          <button class="pill" id="backModule">⬅ Module</button>
          <button class="pill" id="backMain">⬅ Main</button>
          <button class="pill" id="openPdf">📘 Book p.${lesson.bookPage || "-"}</button>
        </div>

        <div class="hero" style="background:${heroBg}">
          <div>
            <h2>Lesson ${lessonNo}</h2>
            <p>${lesson.title}</p>
          </div>
          <img class="heroImg" src="logo.png" alt="logo">
        </div>

        <div class="card">
          <span class="smallTag">Vocabulary</span>
          <h3>Words</h3>
          ${vocabList || "<div class='note'>No vocab</div>"}
        </div>

        <div class="card">
          <span class="smallTag">Grammar</span>
          <h3>${lesson.grammar?.title || "Grammar rule"}</h3>
          <div><b>Rule (EN)</b><br>${(lesson.grammar?.enRule || "").replace(/\n/g,"<br>")}</div>
          <br>
          <div><b>Объяснение (RU)</b><br>${(lesson.grammar?.ruRule || "").replace(/\n/g,"<br>")}</div>
          ${lesson.grammar?.formula ? `<br><div><b>Formula</b><br>${lesson.grammar.formula.replace(/\n/g,"<br>")}</div>` : ""}
        </div>

        <div class="card">
          <span class="smallTag">Reading</span>
          <h3>${lesson.reading?.title || "Reading"}</h3>
          <div>${(lesson.reading?.text || "").replace(/\n/g,"<br>")}</div>
          ${readingTasks ? `<br><div><b>Tasks</b></div>${readingTasks}` : ""}
        </div>

        <div class="card">
          <span class="smallTag">Dialogue</span>
          <h3>${lesson.dialogue?.title || "Dialogue"}</h3>
          <div style="white-space:pre-wrap;font-weight:800">${lesson.dialogue?.model || ""}</div>
          ${lesson.dialogue?.roleplay ? `<div class="note">${lesson.dialogue.roleplay}</div>` : ""}
        </div>

        <div class="card">
          <span class="smallTag">Exercises</span>
          <h3>Choose</h3>
          <div class="grid2">${exButtons || "<div class='note'>No exercises</div>"}</div>
          <div class="note">1 attempt per exercise.</div>
        </div>

      </div>
    `;

    $("#backModule").onclick = ()=> openModule(mod);
    $("#backMain").onclick = renderModules;
    $("#openPdf").onclick = () => { window.open(DATA.bookPdf, "_blank"); };

    document.querySelectorAll(".exBtn").forEach(b=>{
      b.addEventListener("click", ()=>{
        const exId = b.dataset.ex;
        if(isLocked(mod.id, lessonNo, exId)) return; // заблокировано
        openExercise(mod, lessonNo, exId);
      });
    });
  }

  function openExercise(mod, lessonNo, exId){
    state.screen = "exercise";
    state.currentExerciseId = exId;

    const shades = applyThemeByHex(mod.color);
    const lessonKey = `${mod.id}|${lessonNo}`;
    const lesson = DATA.lessonContent[lessonKey];
    const ex = (lesson.exercises || []).find(x=>x.id === exId);
    if(!ex){
      openLesson(mod, lessonNo);
      return;
    }

    const locked = isLocked(mod.id, lessonNo, exId);

    // build items by type
    let items = ex.items || [];
    if(ex.type === "match"){
      const pairs = pickVocabPairs(lesson.vocab || [], ex.pairsCount || 6);
      items = pairs.map((p,i)=>({ q: p.en, a: p.ru, id:`m${i}` }));
    }

    const heroBg = `linear-gradient(135deg, ${shades[6]}, ${shades[4]})`;
    const primaryBg = `linear-gradient(135deg, ${shades[7]}, ${shades[5]})`;

    const listHTML = items.map((it, idx)=>{
      if(ex.type === "choose"){
        const opts = (it.opts || []).map(o=>`<option value="${escapeHtml(o)}">${escapeHtml(o)}</option>`).join("");
        return `
          <div class="qCard">
            <div class="qText">${idx+1}. ${escapeHtml(it.q)}</div>
            <select class="select" data-i="${idx}">
              <option value="">Select…</option>
              ${opts}
            </select>
            <div class="note" id="res_${idx}"></div>
          </div>
        `;
      }
      // missing / build / match => input
      return `
        <div class="qCard">
          <div class="qText">${idx+1}. ${escapeHtml(it.q || it.words?.join(" ") || "")}</div>
          <input class="input" data-i="${idx}" placeholder="Answer…" />
          <div class="note" id="res_${idx}"></div>
        </div>
      `;
    }).join("");

    $("#app").innerHTML = `
      ${headerHTML(mod.title)}
      <div class="container">
        <div class="toolbar">
          <button class="pill" id="backLesson">⬅ Lesson</button>
          <button class="pill" id="backModule">⬅ Module</button>
          <button class="pill" id="backMain">⬅ Main</button>
        </div>

        <div class="hero" style="background:${heroBg}">
          <div>
            <h2>${ex.title}</h2>
            <p>${lesson.title}</p>
          </div>
          <img class="heroImg" src="logo.png" alt="logo">
        </div>

        <div class="card">
          <span class="smallTag">${items.length} items</span>
          <h3>${ex.type.toUpperCase()}</h3>
          ${locked ? `<div class="bad">Locked (1 attempt used)</div>` : `<div class="note">One attempt</div>`}
        </div>

        ${listHTML}

        <div class="row3">
          <button class="btn primary" id="checkBtn" style="background:${primaryBg}">Check</button>
          <button class="btn" id="printBtn">Print</button>
          <button class="btn" id="menuBtn">Back to lesson</button>
        </div>

        <div class="note">⭐ Total stars: ${state.stars}</div>
      </div>
    `;

    $("#backLesson").onclick = ()=> openLesson(mod, lessonNo);
    $("#backModule").onclick = ()=> openModule(mod);
    $("#backMain").onclick = renderModules;
    $("#menuBtn").onclick = ()=> openLesson(mod, lessonNo);

    $("#printBtn").onclick = () => {
      // watermark for print
      const wm = document.createElement("div");
      wm.className = "printWatermark";
      wm.textContent = "AI BAYAN · Excel 7";
      document.body.appendChild(wm);
      window.print();
      wm.remove();
    };

    const checkBtn = $("#checkBtn");
    if(locked){
      checkBtn.disabled = true;
      checkBtn.style.opacity = .5;
    }else{
      checkBtn.onclick = () => {
        const okCount = checkExercise(ex.type, items, ex, lesson, mod, lessonNo);
        // ⭐ награда: 1 звезда если >=60% правильных
        const score = items.length ? okCount / items.length : 0;
        if(score >= 0.6) addStars(1);

        lockAttempt(mod.id, lessonNo, exId);
        // перерисовать чтобы заблокировать
        openLesson(mod, lessonNo);
      };
    }
  }

  function normalize(s){
    return (s || "")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g," ");
  }

  function checkExercise(type, items, ex, lesson, mod, lessonNo){
    let ok = 0;

    items.forEach((it, idx)=>{
      const resEl = document.getElementById(`res_${idx}`);
      let user = "";

      if(type === "choose"){
        const sel = document.querySelector(`select[data-i="${idx}"]`);
        user = sel ? sel.value : "";
      }else{
        const inp = document.querySelector(`input[data-i="${idx}"]`);
        user = inp ? inp.value : "";
      }

      let correct = "";

      if(type === "build"){
        correct = it.a || "";
      }else if(type === "match"){
        correct = it.a || "";
      }else if(type === "missing"){
        correct = it.a || "";
      }else if(type === "choose"){
        correct = it.a || "";
      }else{
        correct = it.a || "";
      }

      const isOk = normalize(user) === normalize(correct);
      if(isOk){
        ok++;
        if(resEl) resEl.innerHTML = `<span class="ok">✅ Correct</span>`;
      }else{
        if(resEl) resEl.innerHTML = `<span class="bad">❌ ${escapeHtml(correct)}</span>`;
      }
    });

    return ok;
  }

  function escapeHtml(s){
    return (s ?? "").toString()
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;");
  }

  // старт
  document.addEventListener("DOMContentLoaded", renderModules);
})();
