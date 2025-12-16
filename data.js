// data.js — AI Bayan · Excel 7 (Unit 1 only: 1 → 1g)

window.APP_DATA = {
  appTitle: "AI Bayan · Excel 7",
  bookPdf: "Excel-7.pdf",

  auth: {
    studentPin: "2844",
    teacherPin: "3244",
    allowedLogins: [
      ...Array.from({ length: 15 }, (_, i) => `7BLr${i + 1}`),
      ...Array.from({ length: 20 }, (_, i) => `7VSt${i + 16}`)
    ]
  },

  modules: [
    // Unit 1 = Module 1 lessons 1..1g (8 lessons total, without Edutainment)
    { id:"m1", title:"Module 1 — Hobbies & Leisure", color:"#00b86b", lessonsCount: 8 },
  ],

  // ===========================
  // LESSON CONTENT (Unit 1)
  // ===========================
  lessonContent: {

    // ---------------------------
    // 1 (Module page) = Lesson 1
    // ---------------------------
    "m1|1": {
      title: "Lesson 1 — Hobbies & Leisure (Vocabulary)",
      bookPage: 5,

      vocabCards: [
        { emoji:"🧵", en:"sewing national costumes", ru:"шитьё национальных костюмов", tts:"sewing national costumes" },
        { emoji:"🍳", en:"cooking", ru:"готовка", tts:"cooking" },
        { emoji:"💃", en:"dancing", ru:"танцы", tts:"dancing" },
        { emoji:"📹", en:"vlogging", ru:"влогинг", tts:"vlogging" },
        { emoji:"🥊", en:"boxing", ru:"бокс", tts:"boxing" },
        { emoji:"🧗‍♂️", en:"rock climbing", ru:"скалолазание", tts:"rock climbing" },
        { emoji:"🏄‍♂️", en:"windsurfing", ru:"виндсёрфинг", tts:"windsurfing" },
        { emoji:"🎮", en:"playing video games", ru:"играть в видеоигры", tts:"playing video games" },
        { emoji:"🧘‍♂️", en:"yoga", ru:"йога", tts:"yoga" }
      ],

      // Ex1 (practice categorise)
      exercise1: {
        title: "Ex 1 — Categorise the activities",
        categories: ["Outdoor activities", "Indoor activities", "Extreme sports", "Hobbies"],
        items: [
          "sewing national costumes",
          "cooking",
          "dancing",
          "vlogging",
          "boxing",
          "rock climbing",
          "windsurfing",
          "playing video games",
          "yoga"
        ]
        // (Если хочешь проверку — скажи, я добавлю keyAnswers по категориям)
      },

      // Ex2 (practice sentences)
      exercise2: {
        title: "Ex 2 — Complete the sentences",
        itsGood: ["fun","exciting","thrilling","relaxing","amazing"],
        itsBad: ["difficult","boring","dangerous","tiring","expensive"],
        prompts: [
          "I like __________ because it’s __________.",
          "I don’t like __________ because it’s __________."
        ]
      },

      extras: [
        { type:"think", title:"THINK!", note:"Who else likes/doesn’t like the same activities as you? Why?" },
        { type:"video", title:"VIDEO", note:"(Add video link/button later)" }
      ]
    },

    // ---------------------------
    // 1a = Lesson 2 (Reading)
    // ---------------------------
    "m1|2": {
      title: "Lesson 1a — Reading & Vocabulary: Take up a hobby",
      bookPage: 6,

      // Warm-up (no checking)
      extras: [
        { type:"warmup", title:"Warm-up", note:"Write as many hobbies as you can in 1 minute. Compare with your partner." }
      ],

      // Vocabulary from 1a box (keep)
      vocabCards: [
        { emoji:"🎯", en:"paintball", ru:"пейнтбол", tts:"paintball" },
        { emoji:"💥", en:"injury", ru:"травма", tts:"injury" },
        { emoji:"🏆", en:"tournament", ru:"турнир", tts:"tournament" },
        { emoji:"🛡️", en:"protective", ru:"защитный", tts:"protective" },
        { emoji:"💸", en:"expensive", ru:"дорогой", tts:"expensive" },
        { emoji:"🧠", en:"concentration", ru:"концентрация", tts:"concentration" },
        { emoji:"🕹️", en:"gamer", ru:"геймер", tts:"gamer" },
        { emoji:"🤝", en:"take part (in)", ru:"принимать участие", tts:"take part in" }
      ],

      // Reading texts — вставь дословно сама (из книги)
      readingA: {
        title: "Text A — (PASTE FROM BOOK)",
        text: "PASTE_BOOK_TEXT_HERE"
      },
      readingB: {
        title: "Text B — (PASTE FROM BOOK)",
        text: "PASTE_BOOK_TEXT_HERE"
      },

      // Tasks (структура; ты можешь вставить exact statements)
      trueFalse: {
        title: "Ex — True / False (from the texts)",
        items: [
          // ВСТАВЬ 1:1 утверждения из книги (короткие)
          { q:"PASTE_STATEMENT_1", a:true },
          { q:"PASTE_STATEMENT_2", a:false },
          { q:"PASTE_STATEMENT_3", a:true },
          { q:"PASTE_STATEMENT_4", a:false }
        ]
      },

      complete: {
        title: "Ex — Words in bold / vocabulary (teacher check)",
        items: [
          "Explain the words in bold from the texts.",
          "Write part of speech for each word."
        ]
        // без answers → без автопроверки
      },

      extras2: [
        { type:"think", title:"THINK!", note:"Which hobby would you like to try? Why?" }
      ]
    },

    // ---------------------------
    // 1b = Lesson 3 (Use of English)
    // ---------------------------
    "m1|3": {
      title: "Lesson 1b — Use of English",
      bookPage: 8,

      grammar1: {
        title: "Present Simple vs Present Continuous",
        enRule: "Present Simple: habits/facts. Present Continuous: happening now/temporary/plans.",
        ruRule: "Present Simple: привычки/факты. Present Continuous: сейчас/временно/планы.",
        formula:
          "PS: I play / He plays\n" +
          "PC: I am playing / He is playing"
      },

      // Ex2 gap-fill (you paste sentences + answers)
      complete: {
        title: "Ex 2 — Complete the gaps (verbs)",
        items: [
          "PASTE_SENTENCE_1_WITH__________",
          "PASTE_SENTENCE_2_WITH__________",
          "PASTE_SENTENCE_3_WITH__________",
          "PASTE_SENTENCE_4_WITH__________",
          "PASTE_SENTENCE_5_WITH__________",
          "PASTE_SENTENCE_6_WITH__________",
          "PASTE_SENTENCE_7_WITH__________"
        ],
        answers: [
          "PASTE_ANSWER_1",
          "PASTE_ANSWER_2",
          "PASTE_ANSWER_3",
          "PASTE_ANSWER_4",
          "PASTE_ANSWER_5",
          "PASTE_ANSWER_6",
          "PASTE_ANSWER_7"
        ]
      },

      // Ex3 email (paste email text + answers)
      reading: {
        title: "Ex 3 — Email (PASTE FROM BOOK)",
        text: "PASTE_BOOK_EMAIL_HERE_WITH_BLANKS__________"
      },

      complete2: {
        title: "Ex 3 — Email gaps answers",
        items: [
          "Gap 1", "Gap 2", "Gap 3", "Gap 4", "Gap 5", "Gap 6", "Gap 7", "Gap 8", "Gap 9"
        ],
        answers: [
          "PASTE_EMAIL_ANSWER_1",
          "PASTE_EMAIL_ANSWER_2",
          "PASTE_EMAIL_ANSWER_3",
          "PASTE_EMAIL_ANSWER_4",
          "PASTE_EMAIL_ANSWER_5",
          "PASTE_EMAIL_ANSWER_6",
          "PASTE_EMAIL_ANSWER_7",
          "PASTE_EMAIL_ANSWER_8",
          "PASTE_EMAIL_ANSWER_9"
        ]
      },

      grammar2: {
        title: "Singular / Plural nouns",
        enRule: "Some nouns take singular verb; some are plural-only; some are collective.",
        ruRule: "Некоторые существительные требуют ед. число; некоторые только мн. число; коллективные — по контексту."
      },

      exercise1: {
        title: "Ex 4 — Choose is / are (10)",
        items: [
          // ВСТАВЬ 1:1 предложения из книги (короткие) + правильный вариант
          { q:"PASTE_SENTENCE_1", opts:["is","are"], a:"is" },
          { q:"PASTE_SENTENCE_2", opts:["is","are"], a:"are" },
          { q:"PASTE_SENTENCE_3", opts:["is","are"], a:"is" },
          { q:"PASTE_SENTENCE_4", opts:["is","are"], a:"are" },
          { q:"PASTE_SENTENCE_5", opts:["is","are"], a:"is" },
          { q:"PASTE_SENTENCE_6", opts:["is","are"], a:"are" },
          { q:"PASTE_SENTENCE_7", opts:["is","are"], a:"is" },
          { q:"PASTE_SENTENCE_8", opts:["is","are"], a:"are" },
          { q:"PASTE_SENTENCE_9", opts:["is","are"], a:"is" },
          { q:"PASTE_SENTENCE_10", opts:["is","are"], a:"are" }
        ]
      },

      grammar3: {
        title: "Comparative / Superlative",
        enRule: "Comparative: compare 2. Superlative: compare 3+.",
        ruRule: "Comparative: сравнение двух. Superlative: сравнение трёх и более.",
        formula: "fast → faster → the fastest\ninteresting → more interesting → the most interesting"
      },

      extras: [
        { type:"note", title:"Ex 5–8", note:"(Table of adjectives + comparative + superlative + facts) — paste tasks and answers here next." }
      ]
    },

    // ---------------------------
    // 1c = Lesson 4 (Skills)
    // ---------------------------
    "m1|4": {
      title: "Lesson 1c — Skills: The Home of Horse Riding",
      bookPage: 10,

      extras: [
        { type:"speak", title:"Lead-in", note:"What traditional sports are popular in Kazakhstan? Make a list. Compare with your partner." }
      ],

      reading: {
        title: "Reading — (PASTE FROM BOOK)",
        text: "PASTE_BOOK_TEXT_HERE"
      },

      // MCQ 4 questions (paste exact questions/options)
      exercise1: {
        title: "Reading comprehension (MCQ)",
        items: [
          { q:"PASTE_Q1", opts:["A","B","C"], a:"A" },
          { q:"PASTE_Q2", opts:["A","B","C"], a:"B" },
          { q:"PASTE_Q3", opts:["A","B","C"], a:"C" },
          { q:"PASTE_Q4", opts:["A","B","C"], a:"A" }
        ]
      },

      complete: {
        title: "Ex — Complete the sentences (words given)",
        items: [
          "PASTE_SENTENCE_1__________",
          "PASTE_SENTENCE_2__________",
          "PASTE_SENTENCE_3__________",
          "PASTE_SENTENCE_4__________",
          "PASTE_SENTENCE_5__________",
          "PASTE_SENTENCE_6__________"
        ],
        answers: [
          "PASTE_ANSWER_1",
          "PASTE_ANSWER_2",
          "PASTE_ANSWER_3",
          "PASTE_ANSWER_4",
          "PASTE_ANSWER_5",
          "PASTE_ANSWER_6"
        ]
      },

      extras2: [
        { type:"think", title:"THINK!", note:"Would you enjoy taking up this hobby? Why / Why not?" },
        { type:"listen", title:"Listening", note:"Listen and complete the table about Petra’s hobby. (Add audio later)" }
      ]
    },

    // ---------------------------
    // 1d = Lesson 5 (Everyday English)
    // ---------------------------
    "m1|5": {
      title: "Lesson 1d — Everyday English: Making plans",
      bookPage: 12,

      // phrases block (practice)
      phrases: [
        "Why don’t you come along, too?",
        "Sorry, I can’t.",
        "Do you want to go ... with us?",
        "Sure, why not?"
      ],

      // dialogue (paste from book)
      reading: {
        title: "Dialogue (PASTE FROM BOOK)",
        text: "PASTE_DIALOGUE_HERE"
      },

      // matching / comprehension placeholders
      exercise1: {
        title: "Ex — Comprehension (MCQ)",
        items: [
          { q:"PASTE_Q1", opts:["A","B","C"], a:"A" },
          { q:"PASTE_Q2", opts:["A","B","C"], a:"B" }
        ]
      },

      extras: [
        { type:"speak", title:"Speaking", note:"Work in pairs. Make a similar dialogue. Use the phrases." }
      ]
    },

    // ---------------------------
    // 1e = Lesson 6 (Across Cultures)
    // ---------------------------
    "m1|6": {
      title: "Lesson 1e — Across Cultures: Free-time fun",
      bookPage: 13,

      readingA: { title:"Text A (PASTE FROM BOOK)", text:"PASTE_TEXT_A_HERE" },
      readingB: { title:"Text B (PASTE FROM BOOK)", text:"PASTE_TEXT_B_HERE" },

      vocabCards: [
        { emoji:"🔗", en:"have in common", ru:"иметь общее", tts:"have in common" },
        { emoji:"⚖️", en:"balance", ru:"баланс", tts:"balance" },
        { emoji:"💪", en:"physical fitness", ru:"физическая форма", tts:"physical fitness" },
        { emoji:"🥋", en:"martial arts", ru:"боевые искусства", tts:"martial arts" }
      ],

      exercise1: {
        title: "Ex — Match statements to the texts",
        items: [
          { q:"PASTE_STATEMENT_1 (A or B?)", opts:["A","B"], a:"A" },
          { q:"PASTE_STATEMENT_2 (A or B?)", opts:["A","B"], a:"B" },
          { q:"PASTE_STATEMENT_3 (A or B?)", opts:["A","B"], a:"A" },
          { q:"PASTE_STATEMENT_4 (A or B?)", opts:["A","B"], a:"B" }
        ]
      },

      extras: [
        { type:"think", title:"THINK!", note:"How are the hobbies similar? How are they different?" }
      ]
    },

    // ---------------------------
    // 1f = Lesson 7 (Across the Curriculum)
    // ---------------------------
    "m1|7": {
      title: "Lesson 1f — Across the Curriculum (ICT): To blog or not to blog?",
      bookPage: 14,

      extras: [
        { type:"think", title:"Lead-in", note:"What are advantages and disadvantages of blogging?" }
      ],

      reading: {
        title: "Reading (PASTE FROM BOOK)",
        text: "PASTE_BOOK_TEXT_HERE"
      },

      exercise1: {
        title: "Ex — Match headings to paragraphs",
        items: [
          { q:"Paragraph 1", opts:["Heading A","Heading B","Heading C","Heading D"], a:"Heading A" },
          { q:"Paragraph 2", opts:["Heading A","Heading B","Heading C","Heading D"], a:"Heading B" },
          { q:"Paragraph 3", opts:["Heading A","Heading B","Heading C","Heading D"], a:"Heading C" },
          { q:"Paragraph 4", opts:["Heading A","Heading B","Heading C","Heading D"], a:"Heading D" }
        ]
      },

      extras2: [
        { type:"think", title:"THINK!", note:"Would you like to be a blogger? Why / Why not?" }
      ]
    },

    // ---------------------------
    // 1g = Lesson 8 (Writing)
    // ---------------------------
    "m1|8": {
      title: "Lesson 1g — Writing: An email describing a hobby",
      bookPage: 15,

      reading: {
        title: "Model email (PASTE FROM BOOK)",
        text: "PASTE_MODEL_EMAIL_HERE"
      },

      grammar1: {
        title: "Linkers",
        enRule: "Use and / but / because to join ideas.",
        ruRule: "Используй and / but / because чтобы соединять мысли.",
        formula: "I like … because … / I like … and … / I like … but I don’t like …"
      },

      task: {
        title: "Writing task",
        plan: [
          "Greeting (Hi …, / Hello …,)",
          "Write what your hobby is",
          "Say how often you do it",
          "Say why you like it (because …)",
          "Ending (Write back soon. / Bye.)",
          "Name"
        ]
      },

      extras: [
        { type:"note", title:"Teacher check", note:"Writing is checked by teacher (no auto ✅/❌ unless you want rubric)." }
      ]
    }
  }
};
