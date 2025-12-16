(() => {
  const root = document.getElementById("app");
  const STATE = { screen:"modules", moduleId:null, lessonKey:null };

  // Safety
  if (!window.APP_DATA) {
    root.innerHTML = "<div style='padding:16px;font:16px system-ui'>❌ APP_DATA не найден. Проверь data.js</div>";
    return;
  }

  const $ = (sel) => document.querySelector(sel);

  function mixWithWhite(hex, t){
    const c = hex.replace("#","");
    const r = parseInt(c.slice(0,2),16), g = parseInt(c.slice(2,4),16), b = parseInt(c.slice(4,6),16);
    const rr = Math.round(r*(1-t)+255*t);
    const gg = Math.round(g*(1-t)+255*t);
    const bb = Math.round(b*(1-t)+255*t);
    return `rgb(${rr},${gg},${bb})`;
  }
  function setTheme(color){
    const light = mixWithWhite(color, 0.90);
    document.documentElement.style.setProperty("--pageBg", light);
  }

  function shade(hex, idx, total){
    // оттенки для карточек уроков
    const t = 0.25 + (idx/(Math.max(1,total-1))) * 0.55; // 0.25..0.80
    return mixWithWhite(hex, t);
  }

  function topBar(title, subtitle, color){
    return `
      <div class="top" style="background:linear-gradient(90deg, ${color}, ${mixWithWhite(color,0.25)});">
        <div class="topRow">
          <img class="logoImg" src="./logo.png" onerror="this.style.display='none'" />
          <div>
            <div class="h1">${title}</div>
            <div class="sub">${subtitle || ""}</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderModules(){
    const m = APP_DATA.modules;
    setTheme(m[0]?.color || "#0aa35f");

    root.innerHTML = `
      <div class="wrap">
        ${topBar("AI Bayan · Excel 7", "Modules", m[0]?.color || "#0aa35f")}
        <div class="grid">
          ${m.map(mod => `
            <button class="lessonCard" style="border-color:${mod.color}" data-mid="${mod.id}">
              <div class="lessonTop">
                <div>
                  <div class="title">${mod.title}</div>
                  <div class="muted">${mod.lessonsCount} lessons</div>
                </div>
                <div class="badge">Open</div>
              </div>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    document.querySelectorAll("[data-mid]").forEach(b=>{
      b.onclick = () => {
        STATE.moduleId = b.getAttribute("data-mid");
        STATE.screen = "lessons";
        render();
      };
    });
  }

  function renderLessons(){
    const mod = APP_DATA.modules.find(x=>x.id===STATE.moduleId) || APP_DATA.modules[0];
    setTheme(mod.color);

    const total = mod.lessonsCount || 10;
    const keys = Array.from({length: total}, (_,i)=> `${mod.id}|${i+1}`);
    const lessons = keys.map(k => ({ key:k, data: APP_DATA.lessonContent[k] }));

    root.innerHTML = `
      <div class="wrap">
        ${topBar(mod.title, "Choose a lesson", mod.color)}
        <div class="btnRow" style="margin-top:12px">
          <button class="btn btnGhost" id="backMods">← Back</button>
        </div>

        <div class="grid">
          ${lessons.map((L,i)=> {
            const d = L.data || { title:`Lesson ${i+1}` };
            const border = shade(mod.color, i, total);
            return `
              <button class="lessonCard" style="border-color:${border}" data-lkey="${L.key}">
                <div class="lessonTop">
                  <div>
                    <div class="title">${d.title}</div>
                    <div class="muted">${d.bookPage ? ("Book p."+d.bookPage) : ""}</div>
                  </div>
                  <div class="badge">Open</div>
                </div>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    `;

    $("#backMods").onclick = () => { STATE.screen="modules"; render(); };
    document.querySelectorAll("[data-lkey]").forEach(b=>{
      b.onclick = ()=> {
        STATE.lessonKey = b.getAttribute("data-lkey");
        STATE.screen = "lesson";
        render();
      };
    });
  }

  function renderLesson(){
    const mod = APP_DATA.modules.find(x=>x.id===STATE.moduleId) || APP_DATA.modules[0];
    setTheme(mod.color);

    const L = APP_DATA.lessonContent[STATE.lessonKey];
    if (!L){
      root.innerHTML = `<div class="wrap">${topBar(mod.title,"Lesson not found", mod.color)}<div class="card">Нет данных урока.</div></div>`;
      return;
    }

    let vocabHtml = "";
    if (Array.isArray(L.vocabCards) && L.vocabCards.length){
      vocabHtml = `
        <div class="card">
          <div class="title">Vocabulary (cards)</div>
          <div class="vgrid">
            ${L.vocabCards.map(v=>`
              <div class="vcard">
                <div class="vemoji">${v.emoji || "📌"}</div>
                <div class="ven">${v.en}</div>
                <div class="vru">${v.ru}</div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    let ex1Html = "";
    if (L.exercise1){
      ex1Html = renderCategorise(L.exercise1);
    }

    let ex2Html = "";
    if (L.exercise2){
      ex2Html = renderItsPhrases(L.exercise2);
    }

    let noteHtml = L.note ? `<div class="card"><div class="title">Note</div><div class="muted">${L.note}</div></div>` : "";

    root.innerHTML = `
      <div class="wrap">
        ${topBar(L.title, L.bookPage ? `Book page: ${L.bookPage}` : "", mod.color)}
        <div class="btnRow" style="margin-top:12px">
          <button class="btn btnGhost" id="backLessons">← Back to lessons</button>
        </div>

        <div class="grid">
          ${noteHtml}
          ${vocabHtml}
          ${ex1Html}
          ${ex2Html}
          ${renderExtras(L.extras)}
        </div>
      </div>
    `;

    $("#backLessons").onclick = () => { STATE.screen="lessons"; render(); };
  }

  function renderCategorise(ex){
    // простая логика: выбираешь слово → выбираешь категорию
    const id = "cat_" + Math.random().toString(16).slice(2);

    return `
      <div class="card" id="${id}">
        <div class="title">${ex.title}</div>
        <div class="muted">Tap a word → choose category.</div>
        <div class="line"></div>

        <div class="pillRow" data-role="items">
          ${ex.items.map(w=>`<span class="pill" data-word="${w}">${w}</span>`).join("")}
        </div>

        <div class="line"></div>

        <div class="catGrid">
          ${ex.categories.map(c=>`
            <div class="catBox" data-cat="${c}">
              <div class="catTitle">${c}</div>
              <div class="pillRow" data-bucket="${c}"></div>
            </div>
          `).join("")}
        </div>

        <div class="line"></div>
        <div class="btnRow">
          <button class="btn btnPrimary" style="background:${mixWithWhite('#0aa35f',0.15)}" data-action="reset">Reset</button>
          <span class="small">Это задание без “прав/неправ” — в книге оно на классификацию.</span>
        </div>
      </div>
    `;
  }

  function renderItsPhrases(ex){
    const id = "its_" + Math.random().toString(16).slice(2);
    return `
      <div class="card" id="${id}">
        <div class="title">${ex.title}</div>
        <div class="muted">Choose activity + adjective.</div>
        <div class="line"></div>

        <div class="title">It’s… (positive)</div>
        <div class="pillRow">
          ${ex.itsGood.map(w=>`<span class="pill" data-good="${w}">${w}</span>`).join("")}
        </div>

        <div class="title" style="margin-top:10px">It’s… (negative)</div>
        <div class="pillRow">
          ${ex.itsBad.map(w=>`<span class="pill" data-bad="${w}">${w}</span>`).join("")}
        </div>

        <div class="line"></div>

        ${ex.prompts.map((p,i)=>`
          <div class="small" style="margin-top:8px">${p}</div>
          <input class="input" placeholder="Type here..." data-prompt="${i}">
        `).join("")}

        <div class="line"></div>
        <div class="small">Подсказка по книге: “I like … because it’s … / I don’t like … because it’s …”</div>
      </div>
    `;
  }

  function renderExtras(extras){
    if (!Array.isArray(extras) || !extras.length) return "";
    return `
      <div class="card">
        <div class="title">Extra</div>
        <div class="line"></div>
        ${extras.map(x=>`
          <div style="margin-bottom:10px">
            <div class="title">${x.title}</div>
            <div class="muted">${x.note || ""}</div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function wireInteractions(){
    // categorise
    document.querySelectorAll("[id^='cat_']").forEach(box=>{
      let selectedWord = null;

      box.querySelectorAll("[data-word]").forEach(p=>{
        p.onclick = () => {
          box.querySelectorAll("[data-word]").forEach(x=>x.classList.remove("selected"));
          p.classList.add("selected");
          selectedWord = p.getAttribute("data-word");
        };
      });

      box.querySelectorAll("[data-cat]").forEach(c=>{
        c.onclick = () => {
          if (!selectedWord) return;
          const bucket = box.querySelector(`[data-bucket="${c.getAttribute("data-cat")}"]`);
          const pill = [...box.querySelectorAll("[data-word]")].find(x=>x.getAttribute("data-word")===selectedWord);
          if (pill && bucket) bucket.appendChild(pill);
          selectedWord = null;
        };
      });

      const resetBtn = box.querySelector("[data-action='reset']");
      if (resetBtn){
        resetBtn.onclick = () => {
          const itemsRow = box.querySelector("[data-role='items']");
          box.querySelectorAll("[data-word]").forEach(p=>itemsRow.appendChild(p));
          box.querySelectorAll(".pill").forEach(x=>x.classList.remove("selected"));
          selectedWord = null;
        };
      }
    });

    // its phrases selection highlight
    document.querySelectorAll("[id^='its_']").forEach(box=>{
      box.querySelectorAll("[data-good]").forEach(p=>{
        p.onclick = () => {
          box.querySelectorAll("[data-good]").forEach(x=>x.classList.remove("selected"));
          p.classList.add("selected");
        };
      });
      box.querySelectorAll("[data-bad]").forEach(p=>{
        p.onclick = () => {
          box.querySelectorAll("[data-bad]").forEach(x=>x.classList.remove("selected"));
          p.classList.add("selected");
        };
      });
    });
  }

  function render(){
    if (STATE.screen==="modules") renderModules();
    else if (STATE.screen==="lessons") renderLessons();
    else renderLesson();
    // после любого рендера — подключаем клики внутри упражнений
    wireInteractions();
  }

  // старт
  STATE.moduleId = APP_DATA.modules[0]?.id || "m1";
  render();
})();
