(() => {
  const root = document.getElementById("app");

  // Показываем ошибки прямо на экране (иначе будет "просто фон")
  function showError(title, err) {
    const msg = (err && (err.stack || err.message)) ? (err.stack || err.message) : String(err || "");
    root.innerHTML = `
      <div class="wrap">
        <div class="card">
          <div class="h1">❌ ${title}</div>
          <pre class="pre">${escapeHtml(msg)}</pre>
          <div class="muted">Проверь: index.html → порядок скриптов (data.js перед app.js), имена файлов, кэш GitHub Pages.</div>
        </div>
      </div>
    `;
  }

  window.addEventListener("error", (e) => showError("JS error", e.error || e.message));
  window.addEventListener("unhandledrejection", (e) => showError("Promise error", e.reason));

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));
  }

  // Проверка data.js
  if (!window.APP_DATA) {
    showError("APP_DATA не найден", "Файл data.js не загрузился. Проверь имя (data.js), путь и порядок подключения.");
    return;
  }
  if (!APP_DATA.modules || !APP_DATA.modules.length) {
    showError("modules пустой", "В data.js нет modules или он пустой.");
    return;
  }

  // Рендер меню
  const bg = "#eefaf4";
  document.documentElement.style.setProperty("--pageBg", bg);

  root.innerHTML = `
    <div class="wrap">
      <div class="top">
        <div class="logo">AI Bayan · Excel 7</div>
        <div class="sub">${APP_DATA.appTitle || ""}</div>
      </div>

      <div class="grid" id="grid"></div>
      <div class="foot">Если видишь это меню — значит app.js + data.js работают ✅</div>
    </div>
  `;

  const grid = document.getElementById("grid");
  APP_DATA.modules.forEach(m => {
    const btn = document.createElement("button");
    btn.className = "mod";
    btn.style.borderColor = m.color;
    btn.innerHTML = `
      <div class="modTitle">${m.title}</div>
      <div class="modMeta">${m.lessonsCount || 8} lessons</div>
    `;
    btn.onclick = () => alert(`OK: ${m.id}\nДальше подключим уроки/экраны.`);
    grid.appendChild(btn);
  });
})();
