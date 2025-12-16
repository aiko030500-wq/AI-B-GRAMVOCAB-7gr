const app = document.getElementById("app");

if (!window.APP_DATA) {
  app.innerHTML = "<h2 style='color:red'>❌ APP_DATA не найден. Проверь data.js</h2>";
  throw new Error("APP_DATA not found");
}

let stars = 0;

/* =====================
RENDER APP
===================== */
function renderApp() {
  app.innerHTML = `
    <h1>${APP_DATA.moduleTitle}</h1>
    <div class="lesson-list">
      ${APP_DATA.lessons.map(l => `
        <button class="lesson-btn" onclick="openLesson('${l.id}')">
          ${l.title}
        </button>
      `).join("")}
    </div>
    <div id="lesson"></div>
    <div class="stars">⭐ Stars: <span id="stars">${stars}</span></div>
  `;
}

renderApp();

/* =====================
OPEN LESSON
===================== */
function openLesson(id) {
  const lesson = APP_DATA.lessons.find(l => l.id === id);
  const box = document.getElementById("lesson");

  box.innerHTML = `
    <h2>${lesson.title}</h2>
    ${lesson.textA ? `<p>${lesson.textA}</p>` : ""}
    ${lesson.textB ? `<p>${lesson.textB}</p>` : ""}
    ${lesson.rules ? lesson.rules.map(r => `<div class="rule">${r}</div>`).join("") : ""}
    ${lesson.tasks ? lesson.tasks.map((t,i)=>renderTask(t,id,i)).join("") : ""}
    ${lesson.task ? `<div class="writing">${lesson.task}</div>` : ""}
  `;
}

/* =====================
TASK RENDERER
===================== */
function renderTask(task, lessonId, taskIndex) {
  const uid = lessonId + "_" + taskIndex;

  if (task.type === "choice") {
    return `
      <div class="task">
        <h3>${task.title}</h3>
        ${task.items.map((q,i)=>`
          <div class="question">
            <p>${q.q}</p>
            ${q.options.map(opt=>`
              <button onclick="checkAnswer('${uid}_${i}','${opt}','${q.a}',this)">
                ${opt}
              </button>
            `).join("")}
            <span id="${uid}_${i}" class="result"></span>
          </div>
        `).join("")}
      </div>
    `;
  }

  if (task.type === "truefalse") {
    return `
      <div class="task">
        <h3>${task.title}</h3>
        ${task.items.map((q,i)=>`
          <div class="question">
            <p>${q.q}</p>
            <button onclick="checkAnswer('${uid}_${i}',true,${q.a},this)">True</button>
            <button onclick="checkAnswer('${uid}_${i}',false,${q.a},this)">False</button>
            <span id="${uid}_${i}" class="result"></span>
          </div>
        `).join("")}
      </div>
    `;
  }

  if (task.type === "fill") {
    return `
      <div class="task">
        <h3>${task.title}</h3>
        ${task.items.map((q,i)=>`
          <div class="question">
            <p>${q.q}</p>
            <input id="${uid}_inp_${i}" />
            <button onclick="checkInput('${uid}_${i}','${q.a}','${uid}_inp_${i}')">Check</button>
            <span id="${uid}_${i}" class="result"></span>
          </div>
        `).join("")}
      </div>
    `;
  }

  return "";
}

/* =====================
CHECK ANSWERS
===================== */
function checkAnswer(id, user, correct, btn) {
  const res = document.getElementById(id);
  if (res.textContent) return;

  if (user === correct) {
    res.textContent = " ✔";
    res.className = "result correct";
    stars++;
  } else {
    res.textContent = " ✖";
    res.className = "result wrong";
  }

  document.getElementById("stars").textContent = stars;
  btn.parentElement.querySelectorAll("button").forEach(b => b.disabled = true);
}

function checkInput(id, correct, inputId) {
  const res = document.getElementById(id);
  if (res.textContent) return;

  const val = document.getElementById(inputId).value.trim().toLowerCase();
  if (val === correct.toLowerCase()) {
    res.textContent = " ✔";
    res.className = "result correct";
    stars++;
  } else {
    res.textContent = " ✖";
    res.className = "result wrong";
  }
  document.getElementById("stars").textContent = stars;
}
