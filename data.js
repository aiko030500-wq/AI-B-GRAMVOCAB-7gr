window.APP_DATA = {
  appTitle: "AI Bayan · Excel 7",
  bookPdf: "Excel-7.pdf",

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
function addStar(n=1){
  const v = getStars() + n;
  localStorage.setItem(LSKEY("stars"), String(v));
  const el = document.getElementById("starsCounter");
  if (el) el.textContent = `⭐ ${v}`;
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
  outEl.innerHTML = ok
    ? `<span class="ok">✅</span>`
    : `<span class="no">❌</span>`;
}

  // ВХОД
  auth: {
    studentPin: "2844",
    teacherPin: "3244",
    allowedLogins: [
      // 7BLr1 – 7BLr15
      ...Array.from({ length: 15 }, (_, i) => `7BLr${i + 1}`),

      // 7VSt16 – 7VSt35
      ...Array.from({ length: 20 }, (_, i) => `7VSt${i + 16}`)
    ]
  },

  // 9 МОДУЛЕЙ
  modules: [
    { id:"m1", title:"Module 1 — Hobbies & Leisure", color:"#00b86b", lessonsCount: 10 },
    { id:"m2", title:"Module 2 — Communication & Technology", color:"#00c2ff", lessonsCount: 10 },
    { id:"m3", title:"Module 3 — Holidays & Travel", color:"#ff9f1c", lessonsCount: 10 },
    { id:"m4", title:"Module 4 — Space & Earth", color:"#7c4dff", lessonsCount: 10 },
    { id:"m5", title:"Module 5 — Reading for Pleasure", color:"#22c55e", lessonsCount: 10 },
    { id:"m6", title:"Module 6 — Entertainment & Media", color:"#ff3dbb", lessonsCount: 10 },
    { id:"m7", title:"Module 7 — Natural Disasters", color:"#ff2d2d", lessonsCount: 10 },
    { id:"m8", title:"Module 8 — Healthy Habits", color:"#00e6b8", lessonsCount: 10 },
    { id:"m9", title:"Module 9 — Clothes & Fashion", color:"#ffd000", lessonsCount: 10 }
  ],

  // КОНТЕНТ
  lessonContent: {
    "m1|1": {
      title: "Lesson 1 — Vocabulary: Free-time activities",
      bookPage: 5,
      vocabCards: [
        { emoji:"💃", en:"dancing", ru:"танцы", tts:"dancing" },
        { emoji:"🍳", en:"cooking", ru:"готовка", tts:"cooking" },
        { emoji:"🧵", en:"sewing national costumes", ru:"шитьё национальной одежды", tts:"sewing national costumes" },
        { emoji:"🎥", en:"vlogging", ru:"влогинг", tts:"vlogging" },
        { emoji:"🥊", en:"boxing", ru:"бокс", tts:"boxing" },
        { emoji:"🧗‍♂️", en:"rock climbing", ru:"скалолазание", tts:"rock climbing" },
        { emoji:"🏄‍♂️", en:"windsurfing", ru:"виндсёрфинг", tts:"windsurfing" },
        { emoji:"🎮", en:"playing video games", ru:"играть в видеоигры", tts:"playing video games" },
        { emoji:"🧘‍♂️", en:"yoga", ru:"йога", tts:"yoga" }
      ],

      exercise1: {
        title: "Ex 1 — Write the types of leisure activities",
        categories: ["Outdoor activities", "Indoor activities", "Extreme sports", "Hobbies"],
        items: [
          "dancing","cooking","sewing national costumes","vlogging","boxing",
          "rock climbing","windsurfing","playing video games","yoga"
        ]
      },

      exercise2: {
        title: "Ex 2 — Use the phrases",
        itsGood: ["fun","exciting","thrilling","relaxing","amazing"],
        itsBad: ["difficult","boring","dangerous","tiring","expensive"],
        prompts: [
          "I like __________ because it’s __________.",
          "I don’t like __________ because it’s __________."
        ]
      },

      extras: [
        { type:"video", title:"Mini video", note:"(Добавим ссылку/кнопку позже)" },
        { type:"think", title:"THINK!", note:"Who else likes/doesn’t like the same free-time activities as you? Why?" }
      ]
    },

    "m1|2": {
  title: "Lesson 1a — Reading: Take up a hobby",
  bookPage: 6,

  vocabCards: [
    { emoji:"🧠", en:"concentration", ru:"концентрация", tts:"concentration" },
    { emoji:"🏆", en:"tournament", ru:"турнир", tts:"tournament" },
    { emoji:"⭐", en:"talented", ru:"талантливый", tts:"talented" },
    { emoji:"🤝", en:"take part (in)", ru:"принимать участие", tts:"take part in" },
    { emoji:"💥", en:"injury", ru:"травма", tts:"injury" },
    { emoji:"💰", en:"expensive", ru:"дорогой", tts:"expensive" },
    { emoji:"⚠️", en:"risk", ru:"риск", tts:"risk" },
    { emoji:"🌐", en:"online", ru:"онлайн", tts:"online" }
  ],

  exercise1: {
    title: "Ex 1 — Write the types of hobbies",
    categories: ["Sport hobbies", "Online hobbies", "Creative hobbies"],
    items: [
      "boxing",
      "rock climbing",
      "vlogging",
      "playing video games",
      "dancing",
      "sewing national costumes"
    ]
  },

  readingA: {
    title: "Text A",
    text:
      "Many teenagers choose a hobby to relax after school. Some prefer sports like boxing or rock climbing. Others enjoy creative hobbies such as dancing or sewing national costumes. A hobby helps people develop skills and concentration."
  },

  readingB: {
    title: "Text B",
    text:
      "Online hobbies are also popular. Teenagers can take part in online tournaments or create videos. However, some hobbies can be expensive or risky, so it is important to choose carefully."
  },

  trueFalse: {
    title: "Ex 3 — True or False",
    items: [
      { q:"Teenagers choose hobbies only to win tournaments.", a:false },
      { q:"Creative hobbies help develop skills.", a:true },
      { q:"Online hobbies are popular with teenagers.", a:true },
      { q:"All hobbies are cheap and safe.", a:false }
    ]
  },

  complete: {
    title: "Ex 4 — Complete the sentences",
    items: [
      "A hobby helps people develop __________ and concentration.",
      "Some teenagers prefer __________ hobbies.",
      "Online hobbies can be __________.",
      "It is important to choose a hobby __________."
    ]
  },

  extras: [
    {
      type:"sync",
      title:"THINK!",
      note:"Which hobbies are popular with teenagers in your class? Why?"
    },
    {
      type:"listen",
      title:"Listen and repeat",
      note:"Listen to the new words and repeat after AI Bayan."
    },
    {
      type:"speak",
      title:"Speaking",
      note:"Talk about your hobby. Use: I like / I don’t like / because."
    },
    {
      type:"write",
      title:"Writing",
      note:"Write 3–4 sentences about your hobby."
    }
  ]
},

    "m1|3": {
  title: "Lesson 1b (Part 1) — Grammar: Present Simple & Plurals",
  bookPage: 7,

  grammar1: {
    title: "Present Simple",
    enRule:
      "We use the Present Simple for habits, routines and facts.",
    ruRule:
      "Present Simple используется для привычек, регулярных действий и фактов.",
    formula:
      "I / You / We / They + V1\nHe / She / It + V(s)"
  },

  exercise1: {
    title: "Ex 1 — Choose the correct form",
    items: [
      { q:"She ____ dancing after school.", opts:["likes","is liking"], a:"likes" },
      { q:"They ____ video games every day.", opts:["play","are playing"], a:"play" },
      { q:"He ____ boxing.", opts:["does","is doing"], a:"does" }
    ]
  },

  grammar2: {
    title: "Plural nouns",
    enRule:
      "Most nouns add -s or -es. Some nouns are irregular.",
    ruRule:
      "Во множественном числе обычно добавляется -s/-es. Есть неправильные формы.",
    formula:
      "book → books\nwatch → watches\nchild → children\nperson → people"
  },

  exercise2: {
    title: "Ex 2 — Write the plural form",
    items: ["child","person","hobby","watch","activity"]
  }
},

    "m1|4": {
  title: "Lesson 1b (Part 2) — Comparatives",
  bookPage: 8,

  grammar: {
    title: "Comparatives",
    enRule:
      "We use comparatives to compare two things.",
    ruRule:
      "Сравнительная степень используется для сравнения двух предметов.",
    formula:
      "short adjective + -er\nlong adjective → more + adjective"
  },

  exercise1: {
    title: "Ex 1 — Choose the correct form",
    items: [
      { q:"Boxing is ____ than yoga.", opts:["more dangerous","dangerous"], a:"more dangerous" },
      { q:"Dancing is ____ than boxing.", opts:["easier","easy"], a:"easier" },
      { q:"Online games are ____ than board games.", opts:["more exciting","exciting"], a:"more exciting" }
    ]
  }
},

   "m1|5": {
  title: "Lesson 1c — Listening & Speaking",
  bookPage: 10,

  listening: {
    title: "Listen and choose",
    note: "Students listen to teenagers talking about hobbies."
  },

  speaking: {
    title: "Speaking",
    prompts: [
      "What is your favourite hobby?",
      "How often do you do it?",
      "Why do you like it?"
    ]
  }
},
 
   "m1|6": {
  title: "Lesson 1d — Skills: Traditional hobbies",
  bookPage: 11,

  reading: {
    title: "Reading",
    text:
      "Some hobbies are part of national culture. In Kazakhstan people enjoy traditional activities such as horse riding and making national costumes."
  },

  exercise: {
    title: "True / False",
    items: [
      { q:"Traditional hobbies are part of culture.", a:true },
      { q:"Only teenagers have hobbies.", a:false }
    ]
  }
},

  "m1|7": {
  title: "Lesson 1e — Everyday English",
  bookPage: 12,

  phrases: [
    "What do you do in your free time?",
    "I’m keen on…",
    "I’m not interested in…",
    "It’s really fun!"
  ],

  exercise: {
    title: "Make a dialogue",
    note: "Use the phrases to talk about hobbies."
  }
},
 
    "m1|8": {
  title: "Lesson 1f — Writing",
  bookPage: 13,

  task: {
    title: "Write about your hobby",
    plan: [
      "What is your hobby?",
      "How often do you do it?",
      "Why do you like it?"
    ]
  }
},

    "m1|9": {
  title: "Lesson 1g — Review",
  bookPage: 14,

  review: {
    title: "Check yourself",
    items: [
      "Name three hobbies",
      "Use one comparative",
      "Make one sentence in Present Simple"
    ]
  }
},

     "m1|10": {
     title: "Edutainment",
     bookPage: 15,
     fun: [
       "Quiz: Guess the hobby",
       "Mini game: Categorise activities",
       "Video: Teen hobbies around the world"
     ]
   }
  }   // ← закрываем lessonContent
};    // ← закрываем APP_DATA
