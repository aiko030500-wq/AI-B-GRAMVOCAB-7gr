window.APP_DATA = {
  appTitle: "AI Bayan · Excel 7",
  bookPdf: "Excel-7.pdf",

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

    "m1|3": { title:"Lesson 1b (Part 1) — Grammar", bookPage: 7, note:"Present Simple/Continuous + Plurals." },
    "m1|4": { title:"Lesson 1b (Part 2) — Comparatives", bookPage: 8, note:"Comparatives/Superlatives + exercises." },

    "m1|5": { title:"Lesson 1c", bookPage: 10, note:"Заполним по книге." },
    "m1|6": { title:"Lesson 1d", bookPage: 11, note:"Заполним по книге." },
    "m1|7": { title:"Lesson 1e", bookPage: 12, note:"Заполним по книге." },
    "m1|8": { title:"Lesson 1f", bookPage: 13, note:"Заполним по книге." },
    "m1|9": { title:"Lesson 1g", bookPage: 14, note:"Заполним по книге." },
    "m1|10": { title:"Edutainment", bookPage: 15, note:"Заполним по книге." }
  }
};
