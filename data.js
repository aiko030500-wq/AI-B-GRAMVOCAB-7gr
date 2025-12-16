window.APP_DATA = {
  appTitle: "AI Bayan · Excel 7",
  bookPdf: "Excel-7.pdf",

  modules: [
    { id:"m1", title:"Module 1 — Hobbies & Leisure", color:"#0aa35f", lessonsCount: 8 },
  ],

  lessonContent: {

    /* ======================================================
       LESSON 1 — Vocabulary 1a (Free-time activities)
       ====================================================== */
    "m1|1": {
      bookPage: 5,
      title: "Module 1 · Lesson 1 — Vocabulary: Free-time activities",
      vocab: [
        { en:"sewing", ru:"шитьё", img:"img/m1_sewing.png" },
        { en:"cooking", ru:"готовка", img:"img/m1_cooking.png" },
        { en:"dancing", ru:"танцы", img:"img/m1_dancing.png" },
        { en:"blogging", ru:"ведение блога", img:"img/m1_blogging.png" },
        { en:"rock climbing", ru:"скалолазание", img:"img/m1_rock_climbing.png" },
        { en:"windsurfing", ru:"виндсёрфинг", img:"img/m1_windsurfing.png" },
        { en:"yoga", ru:"йога", img:"img/m1_yoga.png" },
        { en:"archery", ru:"стрельба из лука", img:"img/m1_archery.png" },
        { en:"kart racing", ru:"картинг", img:"img/m1_kart_racing.png" },
        { en:"gardening", ru:"садоводство", img:"img/m1_gardening.png" },
        { en:"painting", ru:"рисование", img:"img/m1_painting.png" },
        { en:"jewellery-making", ru:"изготовление украшений", img:"img/m1_jewellery.png" },
        { en:"playing music", ru:"играть музыку", img:"img/m1_music.png" },
        { en:"photography", ru:"фотография", img:"img/m1_photography.png" },
        { en:"ice skating", ru:"катание на коньках", img:"img/m1_ice_skating.png" },
        { en:"golf", ru:"гольф", img:"img/m1_golf.png" }
      ],
      grammar: {
        title: "Describing hobbies (book)",
        rule:
"fun • exciting • thrilling • relaxing\nboring • difficult • dangerous • tiring\nexpensive\nbecause",
        examples: [
          "I like it because it’s exciting.",
          "I don’t like it because it’s boring."
        ]
      },
      exercises: [
        {
          id:"ex1",
          type:"build",
          title:"Make sentences with because",
          items:[
            { words:["I","like","it","because","it’s","fun"], answer:"I like it because it’s fun." },
            { words:["I","don’t","like","it","because","it’s","dangerous"], answer:"I don’t like it because it’s dangerous." }
          ]
        },
        {
          id:"ex2",
          type:"short",
          title:"Speaking (book task)",
          items:[
            { q:"Which hobbies do you like? Which hobbies don’t you like? Say why." }
          ]
        }
      ]
    },

    /* ======================================================
       LESSON 2 — Reading 1a (Take up a hobby)
       ====================================================== */
    "m1|2": {
      bookPage: 6,
      title: "Module 1 · Lesson 2 — Reading: Take up a hobby",
      reading: {
        title: "Take up a hobby",
        text:
"Read the two texts in your book:\n• Super Gaming\n• Paint Wars",
        tasks: [
          { q:"Read again and mark the sentences as T (true), F (false) or DS (doesn’t say)." }
        ]
      },
      exercises: [
        {
          id:"ex1",
          type:"truefalse",
          title:"True / False / Doesn’t say",
          items:[
            { q:"Jack plays paintball during the week." },
            { q:"Jack’s team often wins games." },
            { q:"Paintball is an expensive hobby." },
            { q:"Alex plays games on a website." },
            { q:"Alex’s family think his hobby is a bad idea." },
            { q:"Alex prefers real sports." }
          ]
        }
      ]
    },

    /* ======================================================
       LESSON 3 — Use of English 1b
       ====================================================== */
    "m1|3": {
      bookPage: 8,
      title: "Module 1 · Lesson 3 — Use of English: Present Simple vs Present Continuous",
      grammar: {
        title: "Present Simple / Present Continuous (book)",
        rule:
"Use the present simple for permanent states, general truths and habits.\nUse the present continuous for actions happening now or temporary situations.",
        examples: [
          "I live in a big city.",
          "She plays sports at weekends.",
          "I’m writing an email now.",
          "He is working at a café this month."
        ]
      },
      exercises: [
        {
          id:"ex1",
          type:"choose",
          title:"Choose the correct form",
          items:[
            { q:"John sometimes ____ golf on Sundays.", opts:["plays","is playing"] },
            { q:"Ann ____ in her room now.", opts:["cooks","is cooking"] },
            { q:"I ____ ice skating tonight.", opts:["go","am going"] },
            { q:"I ____ at 4 pm.", opts:["start","am starting"] }
          ]
        }
      ]
    },

    /* ======================================================
       LESSON 4 — Skills 1c
       ====================================================== */
    "m1|4": {
      bookPage: 10,
      title: "Module 1 · Lesson 4 — Skills: The Home of Horse Riding",
      vocab: [
        { en:"steep", ru:"крутой", img:"img/m1_steep.png" },
        { en:"freedom", ru:"свобода", img:"img/m1_freedom.png" },
        { en:"symbol", ru:"символ", img:"img/m1_symbol.png" },
        { en:"saddle", ru:"седло", img:"img/m1_saddle.png" },
        { en:"horseback", ru:"верхом", img:"img/m1_horseback.png" }
      ],
      reading: {
        title:"The Home of Horse Riding",
        text:"Read the article in your book.",
        tasks:[
          { q:"Answer the questions in the book." }
        ]
      }
    },

    /* ======================================================
       LESSON 5 — Everyday English 1d
       ====================================================== */
    "m1|5": {
      bookPage: 12,
      title: "Module 1 · Lesson 5 — Everyday English: Making plans",
      dialogue: {
        title: "Making plans (book dialogue)",
        model:
"Why don’t you come along too?\nSorry, I can’t.\nHow about Saturday afternoon?\nSure, why not? What time?",
        roleplay:
"Make a similar dialogue. Invite your friend and agree on time."
      },
      exercises: [
        {
          id:"ex1",
          type:"build",
          title:"Make sentences from the dialogue",
          items:[
            { words:["Why","don’t","you","come","along","too?"], answer:"Why don’t you come along too?" },
            { words:["Sure,","why","not?","What","time?"], answer:"Sure, why not? What time?" }
          ]
        }
      ]
    },

    /* ======================================================
       LESSON 6 — Across Cultures 1e
       ====================================================== */
    "m1|6": {
      bookPage: 13,
      title: "Module 1 · Lesson 6 — Across Cultures: Free-time around the world",
      vocab: [
        { en:"skateboarding", ru:"скейтбординг", img:"img/m1_skateboarding.png" },
        { en:"martial arts", ru:"боевые искусства", img:"img/m1_martial_arts.png" }
      ],
      reading: {
        title:"Across Cultures",
        text:"Read the text in your book.",
        tasks:[
          { q:"Mark the sentences as T / F / DS." }
        ]
      }
    },

    /* ======================================================
       LESSON 7 — Across the Curriculum 1f (ICT)
       ====================================================== */
    "m1|7": {
      bookPage: 14,
      title: "Module 1 · Lesson 7 — ICT: To blog or not to blog?",
      vocab: [
        { en:"blog", ru:"блог", img:"img/m1_blog.png" },
        { en:"post", ru:"пост", img:"img/m1_post.png" },
        { en:"platform", ru:"платформа", img:"img/m1_platform.png" },
        { en:"pros", ru:"плюсы", img:"img/m1_pros.png" },
        { en:"cons", ru:"минусы", img:"img/m1_cons.png" }
      ],
      reading: {
        title:"To blog or not to blog?",
        text:"Read the text in your book.",
        tasks:[
          { q:"Complete the sentences (1–6) from the text." }
        ]
      }
    },

    /* ======================================================
       LESSON 8 — Writing 1g + Edutainment
       ====================================================== */
    "m1|8": {
      bookPage: 15,
      title: "Module 1 · Lesson 8 — Writing: An email about a hobby",
      grammar: {
        title:"Linkers (book)",
        rule:"Use and, but, because, however to connect ideas.",
        examples:[
          "I like it because it’s exciting.",
          "It’s fun, but it can be dangerous."
        ]
      },
      exercises: [
        {
          id:"ex1",
          type:"build",
          title:"Write about your hobby (model)",
          items:[
            { words:["In","my","free","time","I","like","to","…"], answer:"In my free time I like to …" },
            { words:["I","like","it","because","…"], answer:"I like it because …" }
          ]
        },
        {
          id:"ex2",
          type:"short",
          title:"Edutainment",
          items:[
            { q:"What are the benefits of hobbies? Write 2–3 sentences." }
          ]
        }
      ]
    }
  }
};
