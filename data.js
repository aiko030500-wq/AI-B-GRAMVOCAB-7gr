// data.js — AI Bayan · Excel 7 (Module 1: Lesson 1–1g)
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
    { id:"m1", title:"Module 1 — Hobbies & Leisure", color:"#0aa35f", lessonsCount: 8 },

    // остальные модули можно оставить как заглушки
    { id:"m2", title:"Module 2 — Communication & Technology", color:"#00c2ff", lessonsCount: 10 },
    { id:"m3", title:"Module 3 — Holidays & Travel", color:"#ff9f1c", lessonsCount: 10 },
    { id:"m4", title:"Module 4 — Space & Earth", color:"#7c4dff", lessonsCount: 10 },
    { id:"m5", title:"Module 5 — Reading for Pleasure", color:"#22c55e", lessonsCount: 10 },
    { id:"m6", title:"Module 6 — Entertainment & Media", color:"#ff3dbb", lessonsCount: 10 },
    { id:"m7", title:"Module 7 — Natural Disasters", color:"#ff2d2d", lessonsCount: 10 },
    { id:"m8", title:"Module 8 — Healthy Habits", color:"#00e6b8", lessonsCount: 10 },
    { id:"m9", title:"Module 9 — Clothes & Fashion", color:"#ffd000", lessonsCount: 10 }
  ],

  // КОНТЕНТ (Module 1 only)
  lessonContent: {
    // -------------------------
    // Lesson 1 (Vocabulary, p5)
    // -------------------------
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

      exercises: [
        {
          id:"ex1",
          type:"dragcat",
          title:"1) Say. Which are: outdoor / indoor / extreme sport / hobbies?",
          categories:["Outdoor activities","Indoor activities","Extreme sport","Hobbies"],
          items:[
            { text:"rock climbing", cat:"Extreme sport" },
            { text:"windsurfing", cat:"Outdoor activities" },
            { text:"yoga", cat:"Indoor activities" },
            { text:"playing video games", cat:"Indoor activities" },
            { text:"vlogging", cat:"Hobbies" },
            { text:"dancing", cat:"Hobbies" },
            { text:"cooking", cat:"Hobbies" },
            { text:"sewing national costumes", cat:"Hobbies" },
            { text:"boxing", cat:"Extreme sport" }
          ]
        },
        {
          id:"ex2",
          type:"pairs",
          title:"2) Use the phrases to complete the sentences",
          note:"(Это speaking/writing по книге — без единственного ответа)",
          groups: [
            { label:"It’s …", items:["fun","exciting","thrilling","relaxing","amazing"] },
            { label:"It’s …", items:["difficult","boring","dangerous","tiring","expensive"] }
          ],
          prompts:[
            "I like ________ because ________.",
            "I don’t like ________ because ________."
          ]
        }
      ]
    },

    // -------------------------
    // Lesson 2 = Reading 1a (p6–7)
    // -------------------------
  "m1|2": {
  title: "Lesson 2 — 1a Take up a hobby",
  bookPage: 6,

  /* =====================
     VOCABULARY
     ===================== */
  vocabCards: [
    { emoji:"🖥️", en:"screen", ru:"экран", tts:"screen" },
    { emoji:"🤝", en:"support", ru:"поддерживать", tts:"support" },
    { emoji:"🧠", en:"concentration", ru:"концентрация", tts:"concentration" },
    { emoji:"🏃", en:"chase", ru:"преследовать", tts:"chase" },
    { emoji:"🏆", en:"tournament", ru:"турнир", tts:"tournament" },
    { emoji:"⭐", en:"talented", ru:"талантливый", tts:"talented" }
  ],

  /* =====================
     EX 1 — Vocabulary (intro)
     ===================== */
  exercise1: {
    title: "Ex 1 — Look at the words",
    note: "Look at the words and remember their meanings."
  },

  /* =====================
     READING
     ===================== */
  readingA: {
    title: "Text A — Paint Wars",
    text:
`Arman loves paintball. At weekends he meets his team outdoors and they play games in the woods.
Players run, hide behind trees and try to tag the other team with paintballs.
Arman says paintball is exciting, but you must wear protection and follow the rules.`
  },

  readingB: {
    title: "Text B — Gaming world",
    text:
`Aruzhan is a keen gamer. She plays online with people from different countries and sometimes joins competitions.
She has her own channel where she shares short videos and tips.
Her family supports her, but they remind her to take breaks and not sit too long in front of a screen.`
  },

  /* =====================
     EX 2 — True / False
     ===================== */
  trueFalse: {
    title: "Ex 2 — True / False",
    items: [
      { q:"1 Arman plays paintball outdoors.", a:true },
      { q:"2 Players hide behind trees.", a:true },
      { q:"3 Paintball is always safe.", a:false },
      { q:"4 Aruzhan plays online with people from other countries.", a:true },
      { q:"5 Aruzhan never makes videos.", a:false },
      { q:"6 Aruzhan’s family supports her hobby.", a:true }
    ]
  },

  /* =====================
     EX 3 — Complete the sentences
     ===================== */
  complete: {
    title: "Ex 3 — Complete the sentences",
    items: [
      { q:"Don’t sit too close to the ________ .", a:"screen" },
      { q:"Serik is really ________ at football.", a:"talented" },
      { q:"Noise makes ________ difficult.", a:"concentration" },
      { q:"Adel is playing in a chess ________ .", a:"tournament" },
      { q:"Classmates ________ him in matches.", a:"support" },
      { q:"Look out! Someone is ________ you!", a:"chasing" }
    ]
  },

  /* =====================
     EX 4 — Answer the questions
     ===================== */
  exercise4: {
    title: "Ex 4 — Answer the questions",
    items: [
      { q:"What hobby does Arman like?", a:"paintball" },
      { q:"Where do they play paintball?", a:"in the woods" },
      { q:"Why must players wear protection?", a:"because it is dangerous" }
    ]
  },

  /* =====================
     EX 5 — Speaking
     ===================== */
  speaking: {
    title: "Ex 5 — Speaking",
    prompts: [
      "What hobbies do you like?",
      "Which hobby would you like to take up?",
      "Why do you like it?"
    ]
  },

  /* =====================
     EX 6 — Vocabulary (MCQ)
     ===================== */
  exercise6: {
    title: "Ex 6 — Choose the correct word",
    items: [
      { q:"1 Don’t sit too close to the ____.", opts:["screen","tournament","support"], a:"screen" },
      { q:"2 Noise makes ____ difficult.", opts:["talented","concentration","chase"], a:"concentration" },
      { q:"3 Adel is playing in a chess ____.", opts:["support","tournament","screen"], a:"tournament" },
      { q:"4 Classmates ____ him in matches.", opts:["support","chase","talented"], a:"support" },
      { q:"5 Look out! Someone is ____ you!", opts:["chasing","supporting","screening"], a:"chasing" }
    ]
  },

  /* =====================
     EX 7 — Reading (MCQ)
     ===================== */
  exercise7: {
    title: "Ex 7 — Choose the correct answer",
    items: [
      { q:"1 Arman’s hobby is …", opts:["paintball","yoga","cooking"], a:"paintball" },
      { q:"2 They play paintball in …", opts:["the woods","a classroom","a shop"], a:"the woods" },
      { q:"3 Players hide behind …", opts:["trees","cars","desks"], a:"trees" },
      { q:"4 Aruzhan shares …", opts:["videos and tips","paintballs","homework"], a:"videos and tips" }
    ]
  },

  /* =====================
     EX 8 — Short answers
     ===================== */
  exercise8: {
    title: "Ex 8 — Write short answers",
    items: [
      { q:"What hobby does Arman like?", a:"paintball" },
      { q:"Where do they play paintball?", a:"in the woods" },
      { q:"Why must players wear protection?", a:"because it is dangerous" }
    ]
  },

  /* =====================
     EX 9 — Writing
     ===================== */
  exercise9: {
    title: "Ex 9 — Writing",
    note: "Write an email / short text about a hobby (4–6 sentences).",
    writing: {
      placeholder: "Write here...",
      plan: [
        "What is your hobby?",
        "How often do you do it?",
        "Why do you like it?",
        "Is it safe / difficult / expensive?",
        "Ask a question to your friend."
      ],
      rewardStars: 1
    }
  },

  /* =====================
     THINK
     ===================== */
  extras: [
    {
      type:"think",
      title:"THINK!",
      note:"Which hobby would you like to take up? Why?"
    }
  ]
},

    // -------------------------
    // Lesson 3 = Use of English 1b (p8–9)
    // -------------------------
    "m1|3": {
  title: "Lesson 3 — 1b Use of English",
  bookPage: 8,

  /* ===== GRAMMAR (покажется как текст/заметка) ===== */
  note: `GRAMMAR
Present Simple: habits / facts
Present Continuous: now / temporary / arrangements (plans)

Form:
PS: I/you/we/they + V1 | he/she/it + V(s)
PC: am/is/are + V-ing

Plurals:
Most nouns: +s / +es
Irregular: child→children, person→people

Comparatives:
short adj + -er / long adj → more + adj
Irregular: good→better, bad→worse`,

  /* ===== Ex 1 — Present Simple / Continuous (MCQ) ===== */
  exercise1: {
    title: "Ex 1 — Choose the correct form",
    items: [
      { q:"1 John sometimes ____ golf on Sundays.", opts:["play","plays","is playing"], a:"plays" },
      { q:"2 Ann ____ a book in her room now.", opts:["reads","is reading","read"], a:"is reading" },
      { q:"3 ____ you like collecting stamps?", opts:["Do","Are","Does"], a:"Do" },
      { q:"4 Jen and Bill ____ kart racing tonight.", opts:["go","are going","goes"], a:"are going" },
      { q:"5 Suzy’s class ____ at 4 pm.", opts:["starts","is starting","start"], a:"starts" },
      { q:"6 Adrian ____ to buy new sports shoes.", opts:["want","wants","is wanting"], a:"wants" },
      { q:"7 ____ you flying to New York next month?", opts:["Do","Are","Does"], a:"Are" }
    ]
  },

  /* ===== Ex 2 — Plurals (autocheck input) ===== */
  complete: {
    title: "Ex 2 — Write the plural form",
    items: [
      { q:"child → ________", a:"children" },
      { q:"person → ________", a:"people" },
      { q:"hobby → ________", a:"hobbies" },
      { q:"watch → ________", a:"watches" },
      { q:"activity → ________", a:"activities" }
    ]
  },

  /* ===== Ex 3 — Comparatives (autocheck) ===== */
  exercise3: {
    title: "Ex 3 — Write the comparative form",
    items: [
      { q:"nice → ________", a:"nicer" },
      { q:"sporty → ________", a:"sportier" },
      { q:"hot → ________", a:"hotter" },
      { q:"cheap → ________", a:"cheaper" },
      { q:"bad → ________", a:"worse" },
      { q:"popular → ________", a:"more popular" }
    ]
  },

  /* ===== Ex 4 — Use comparatives in sentences (MCQ) ===== */
  exercise4: {
    title: "Ex 4 — Choose the correct sentence",
    items: [
      { q:"1", opts:["Boxing is more dangerous than yoga.","Boxing is danger than yoga."], a:"Boxing is more dangerous than yoga." },
      { q:"2", opts:["Dancing is easier than boxing.","Dancing is easy than boxing."], a:"Dancing is easier than boxing." },
      { q:"3", opts:["Online games are more exciting than board games.","Online games are excitinger than board games."], a:"Online games are more exciting than board games." }
    ]
  },

  /* ===== Ex 5 — Speaking (без автопроверки) ===== */
  speaking: {
    title: "Ex 5 — Speak",
    prompts: [
      "Tell your partner about your hobby.",
      "Use: I usually… / I’m …ing now / I’m …ing on Saturday.",
      "Compare two hobbies using: … is (more) … than …"
    ]
  },

  /* ===== Ex 6 — Mini Writing (⭐ 1 раз) ===== */
  exercise6: {
    title: "Ex 6 — Mini writing",
    note: "Write 4–5 sentences about your hobby using Present Simple + one Present Continuous sentence.",
    writing: {
      placeholder: "Write here...",
      plan: [
        "I usually … (Present Simple)",
        "I … every … (Present Simple)",
        "Right now I am … (Present Continuous)",
        "… is more … than … (Comparative)"
      ],
      rewardStars: 1
    }
  }
},

    // -------------------------
    // Lesson 4 = Skills 1c (p10–11)
    // -------------------------
   "m1|4": {
  title: "Lesson 4 — 1c Skills: The home of horse riding",
  bookPage: 10,

  readingA: {
    title: "Reading",
    text:
`Kazakhstan is famous for horse riding. For centuries, horses have been part of Kazakh culture.
People used horses for travelling, hunting and traditional games.
Today, horse riding is still popular among young people.`
  },

  trueFalse: {
    title: "Ex 1 — True / False",
    items: [
      { q:"Horse riding is part of Kazakh culture.", a:true },
      { q:"People used horses only for sport.", a:false },
      { q:"Horse riding is still popular today.", a:true }
    ]
  },

  complete: {
    title: "Ex 2 — Complete",
    items: [
      { q:"Kazakhstan is famous for ______ riding.", a:"horse" },
      { q:"Horses were used for ______ and hunting.", a:"travelling" }
    ]
  },

  exercise3: {
    title: "Ex 3 — Choose the correct answer",
    items: [
      { q:"Horses were important for …", opts:["culture","fashion","music"], a:"culture" },
      { q:"Young people take up horse riding …", opts:["today","never","in the past"], a:"today" }
    ]
  },

  exercise4: {
    title: "Ex 4 — Answer the questions",
    items: [
      { q:"What is Kazakhstan famous for?", a:"horse riding" },
      { q:"Why were horses important?", a:"for travelling and hunting" }
    ]
  },

  exercise5: {
    title: "Ex 5 — Vocabulary",
    items: [
      { q:"traditional means …", opts:["modern","part of culture"], a:"part of culture" }
    ]
  },

  speaking: {
    title: "Ex 6 — Speaking",
    prompts: [
      "Is horse riding popular in your country?",
      "Do you like traditional hobbies?"
    ]
  },

  exercise7: {
    title: "Ex 7 — Choose the correct sentence",
    items: [
      {
        q:"Horse riding is …",
        opts:["a traditional hobby","a new hobby"],
        a:"a traditional hobby"
      }
    ]
  },

  exercise8: {
    title: "Ex 8 — Writing",
    writing: {
      placeholder:"Write 3–4 sentences about a traditional hobby.",
      plan:[
        "Name the hobby",
        "Why people like it",
        "Is it popular today?"
      ],
      rewardStars:1
    }
  }
},

    // -------------------------
    // Lesson 5 = Everyday English 1d (p12)
    // -------------------------
   "m1|5": {
  title: "Lesson 5 — 1d Everyday English: Making plans",
  bookPage: 12,

  phrases: [
    "What are you doing this weekend?",
    "Do you fancy going…?",
    "That sounds great!",
    "Sorry, I can’t.",
    "Maybe another time."
  ],

  exercise1: {
    title: "Ex 1 — Choose the reply",
    items: [
      { q:"Do you fancy going out?", opts:["That sounds great!","I’m reading now."], a:"That sounds great!" }
    ]
  },

  exercise2: {
    title: "Ex 2 — Choose the reply",
    items: [
      { q:"Sorry, I can’t today.", opts:["Maybe another time.","Yes, I do."], a:"Maybe another time" }
    ]
  },

  exercise3: {
    title: "Ex 3 — Complete",
    items: [
      { q:"Do you fancy ______ to the cinema?", a:"going" }
    ]
  },

  exercise4: {
    title: "Ex 4 — True / False",
    items: [
      { q:"We use Everyday English to make plans.", a:true }
    ]
  },

  exercise5: {
    title: "Ex 5 — Choose",
    items: [
      { q:"Accepting an invitation:", opts:["That sounds great!","Sorry, I can’t."], a:"That sounds great!" }
    ]
  },

  speaking: {
    title: "Ex 6 — Speaking",
    prompts:[
      "Invite your friend somewhere.",
      "Accept or refuse politely."
    ]
  }
},

    // -------------------------
    // Lesson 6 = Across Cultures 1e (p13)
    // -------------------------
   "m1|6": {
  title: "Lesson 6 — 1e Across cultures: Free time fun",
  bookPage: 13,

  readingA: {
    title: "Reading",
    text:
`Teenagers around the world enjoy different free-time activities.
Some prefer sports, others like creative hobbies.`
  },

  exercise1: {
    title: "Ex 1 — Choose",
    items: [
      { q:"Teenagers enjoy …", opts:["different activities","only sports"], a:"different activities" }
    ]
  },

  trueFalse: {
    title: "Ex 2 — True / False",
    items: [
      { q:"Teenagers have the same hobbies everywhere.", a:false }
    ]
  },

  complete: {
    title: "Ex 3 — Complete",
    items: [
      { q:"Free-time activities help teenagers ______.", a:"relax" }
    ]
  },

  speaking: {
    title: "Ex 4 — Speaking",
    prompts:[
      "What free-time activities are popular in your country?"
    ]
  }
},

    // -------------------------
    // Lesson 7 = Across the Curriculum 1f (p14)
    // -------------------------
    "m1|7": {
  title: "Lesson 7 — 1f Across the curriculum: Bloggers",
  bookPage: 14,

  readingA: {
    title: "Reading",
    text:
`Bloggers produce videos and posts. They plan, record and edit their content.`
  },

  trueFalse: {
    title: "Ex 1 — True / False",
    items: [
      { q:"Bloggers plan their content.", a:true }
    ]
  },

  exercise2: {
    title: "Ex 2 — Choose",
    items: [
      { q:"Bloggers produce …", opts:["content","homework"], a:"content" }
    ]
  },

  complete: {
    title: "Ex 3 — Complete",
    items: [
      { q:"Bloggers record and ______ videos.", a:"edit" }
    ]
  },

  speaking: {
    title: "Ex 4 — Speaking",
    prompts:[
      "Do you watch bloggers?"
    ]
  }
},

    // -------------------------
    // Lesson 8 = Writing 1g (p15)
    // -------------------------
  "m1|8": {
  title: "Lesson 8 — 1g Writing: An email describing a hobby",
  bookPage: 15,

  readingA: {
    title: "Model email",
    text:
`Hi Alex,
I enjoy playing football. I play it after school.
It is fun and healthy.
What about you?
Best wishes,
Aslan`
  },

  exercise1: {
    title: "Ex 1 — True / False",
    items: [
      { q:"The email is about a hobby.", a:true }
    ]
  },

  exercise2: {
    title: "Ex 2 — Complete",
    items: [
      { q:"The writer enjoys ______ football.", a:"playing" }
    ]
  },

  exercise3: {
    title: "Ex 3 — Answer",
    items: [
      { q:"What hobby does the writer have?", a:"football" }
    ]
  },

  exercise4: {
    title: "Ex 4 — Writing",
    writing: {
      placeholder:"Write your email here...",
      plan:[
        "Greeting",
        "Your hobby",
        "How often",
        "Why you like it",
        "Closing"
      ],
      rewardStars:1
    }
  }
},
