window.APP_DATA = {
  appTitle: "AI Bayan · Excel 7",
  bookPdf: "Excel-7.pdf",

  modules: [
    { id:"m1", title:"Module 1 — Hobbies & Leisure", color:"#0aa35f", lessonsCount: 10 }
  ],

  // ключи уроков: "m1|1" ... "m1|10"
  lessonContent: {
    // ======================
    // LESSON 1 (Vocabulary page)
    // ======================
    "m1|1": {
      title: "Lesson 1 — Vocabulary: Free-time activities",
      bookPage: 5,

      vocabCards: [
        { emoji:"💃", en:"dancing", ru:"танцы" },
        { emoji:"🍳", en:"cooking", ru:"готовка" },
        { emoji:"🧵", en:"sewing national costumes", ru:"шитьё национальной одежды" },
        { emoji:"🎥", en:"vlogging", ru:"влогинг" },
        { emoji:"🥊", en:"boxing", ru:"бокс" },
        { emoji:"🧗‍♂️", en:"rock climbing", ru:"скалолазание" },
        { emoji:"🏄‍♂️", en:"windsurfing", ru:"виндсёрфинг" },
        { emoji:"🎮", en:"playing video games", ru:"играть в видеоигры" },
        { emoji:"🧘‍♂️", en:"yoga", ru:"йога" }
      ],

      // Ex 1: categorize activities
      exercise1: {
        title: "Ex 1 — Categorise the activities",
        categories: ["Outdoor activities", "Indoor activities", "Extreme sports", "Hobbies"],
        items: [
          "dancing","cooking","sewing national costumes","vlogging","boxing",
          "rock climbing","windsurfing","playing video games","yoga"
        ]
      },

      // Ex 2: Use the phrases (It's...) + Like/Don't like
      exercise2: {
        title: "Ex 2 — Use the phrases to complete the sentences",
        itsGood: ["fun","exciting","thrilling","relaxing","amazing"],
        itsBad: ["difficult","boring","dangerous","tiring","expensive"],
        prompts: [
          "I like __________ because it’s __________.",
          "I don’t like __________ because it’s __________."
        ]
      },

      extras: [
        { type:"video", title:"Mini video", note:"(подключим ссылку/кнопку позже)" },
        { type:"think", title:"THINK!", note:"Who else likes/doesn’t like the same free-time activities as you? Why?" }
      ]
    },

    // ======================
    // LESSON 1a (Reading 1a)
    // ======================
    "m1|2": {
      title: "Lesson 1a — Reading: Take up a hobby",
      bookPage: 6,
      note: "Каркас готов. Дальше вставим точные тексты A/B и упражнения из книги."
    },

    // ======================
    // LESSON 1b Part 1 (PS vs PC + Plurals) — как ты написала
    // ======================
    "m1|3": {
      title: "Lesson 1b (Part 1) — Present Simple vs Present Continuous",
      bookPage: 8,
      note: "Правила EN/RU + формулы + Ex2 + Ex3 (вставим точно по книге)."
    },

    // LESSON 1b Part 2 (Comparative/Superlative)
    "m1|4": {
      title: "Lesson 1b (Part 2) — Comparative & Superlative",
      bookPage: 9,
      note: "Таблица + Ex6/7/8/9/10 по книге."
    },

    // 1c..1g + Edutainment (пока каркас)
    "m1|5": { title:"Lesson 1c", bookPage: 10, note:"Заполним по книге." },
    "m1|6": { title:"Lesson 1d", bookPage: 11, note:"Заполним по книге." },
    "m1|7": { title:"Lesson 1e", bookPage: 12, note:"Заполним по книге." },
    "m1|8": { title:"Lesson 1f", bookPage: 13, note:"Заполним по книге." },
    "m1|9": { title:"Lesson 1g", bookPage: 14, note:"Заполним по книге." },
    "m1|10": { title:"Edutainment", bookPage: 15, note:"Заполним по книге." }
  }
};
