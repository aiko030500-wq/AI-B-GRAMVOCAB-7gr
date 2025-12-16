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
      title: "Lesson 2 — Reading 1a: Take up a hobby",
      bookPage: 6,

      bookPages: [6,7],
      openBookHint: "Open the PDF and read the texts on pages 6–7.",

      // только задания + ответы (текст читается в PDF)
      exercises: [
        {
          id:"ex3",
          type:"tfds",
          title:"3) Read again and mark: T / F / DS (doesn’t say)",
          items: [
            { q:"1 Jack plays games of paintball during the week.", a:"F" },
            { q:"2 Jack’s team often wins the games.", a:"DS" },
            { q:"3 A game of paintball can take a long time.", a:"T" },
            { q:"4 Paintball is an expensive hobby.", a:"DS" },

            { q:"5 Alex plays against gamers from other countries.", a:"T" },
            { q:"6 Alex is a popular gamer on a website.", a:"T" },
            { q:"7 Alex’s family think his hobby is a bad idea.", a:"F" },
            { q:"8 Alex does not like playing real sports.", a:"F" }
          ]
        },
        {
          id:"ex4",
          type:"fill",
          title:"4) Complete the sentences (Vocabulary 1a, p.7)",
          bank:["screen","support","concentration","chasing","tournament","talented"],
          items: [
            { q:"1 Don’t sit too close to the ________ — it’s not good for your eyes.", a:"screen" },
            { q:"2 Serik is a really ________ football player. He wants to play for the national team.", a:"talented" },
            { q:"3 All the noise in the street makes ________ really difficult.", a:"concentration" },
            { q:"4 Adel is playing in a chess ________ on 5th May.", a:"tournament" },
            { q:"5 Ali Sam’s classmates ________ him when he plays for the school team.", a:"support" },
            { q:"6 Look out! Someone is ________ you!", a:"chasing" }
          ]
        },
        {
          id:"ex7",
          type:"dragcat",
          title:"7) Which hobbies in Ex.6 are: creative / related to sport / adventure? (p.7)",
          categories:["Creative","Related to sport","Adventure"],
          items:[
            { text:"painting", cat:"Creative" },
            { text:"jewellery-making", cat:"Creative" },
            { text:"playing music", cat:"Creative" },
            { text:"photography", cat:"Creative" },

            { text:"archery", cat:"Related to sport" },
            { text:"golf", cat:"Related to sport" },
            { text:"ice skating", cat:"Related to sport" },

            { text:"kart racing", cat:"Adventure" },
            { text:"gardening", cat:"Creative" } // можно спорно, но чаще creative
          ]
        }
      ]
    },

    // -------------------------
    // Lesson 3 = Use of English 1b (p8–9)
    // -------------------------
    "m1|3": {
      title: "Lesson 3 — Use of English 1b",
      bookPages:[8,9],
      openBookHint:"Open the PDF and look at pages 8–9 for the theory.",

      exercises: [
        {
          id:"ex2",
          type:"fill_verbs",
          title:"2) Complete the gaps with Present Simple / Present Continuous",
          items: [
            { q:"1 John sometimes (play) golf on Sundays.", a:"plays" },
            { q:"2 Ann (read) a book in her room now.", a:"is reading" },
            { q:"3 (you/like) collecting stamps?", a:"Do you like" },
            { q:"4 Jen and Bill (go) kart racing tonight.", a:"are going" },
            { q:"5 Suzy’s class (start) at 4 pm.", a:"starts" },
            { q:"6 Adrian (want) to buy a new pair of sports shoes.", a:"wants" },
            { q:"7 (you/fly) to New York next month?", a:"Are you flying" }
          ]
        },
        {
          id:"ex3",
          type:"fill",
          title:"3) Put the verbs into Present Simple / Present Continuous (email)",
          items: [
            { q:"1 Thanks for your email! I ________ (be) very busy today!", a:"am" },
            { q:"2 My little brother ________ (have) a fancy dress party for his birthday tomorrow.", a:"has" },
            { q:"3 So Mum ________ (tidy) the house", a:"is tidying" },
            { q:"4 and I ________ (make) my brother’s costume.", a:"am making" },
            { q:"5 He ________ (want) to be a pirate!", a:"wants" },
            { q:"6 Dad ________ (need) some help in the kitchen.", a:"needs" },
            { q:"7 My mum ________ (not/like) baking", a:"doesn’t like" },
            { q:"8 so my dad ________ (make) the cake for the party.", a:"is making" },
            { q:"9 PS ________ (you/want) to come to the party?", a:"Do you want" }
          ]
        },
        {
          id:"ex4",
          type:"mcq",
          title:"4) Choose is / are",
          items: [
            { q:"1 The police ___ on their way.", opts:["is","are"], a:"are" },
            { q:"2 Physics ___ my favourite school subject.", opts:["is","are"], a:"is" },
            { q:"3 Your news ___ very interesting.", opts:["is","are"], a:"is" },
            { q:"4 Your trousers ___ dirty.", opts:["is","are"], a:"are" },
            { q:"5 Darts ___ my favourite game.", opts:["is","are"], a:"is" },
            { q:"6 Your glasses ___ on the desk.", opts:["is","are"], a:"are" },
            { q:"7 Where ___ the money?", opts:["is","are"], a:"is" },
            { q:"8 The shorts ___ in the washing machine.", opts:["is","are"], a:"are" },
            { q:"9 Family ___ very precious to me.", opts:["is","are"], a:"is" },
            { q:"10 There ___ people outside the stadium.", opts:["is","are"], a:"are" }
          ]
        },

        {
          id:"ex5",
          type:"table_fill",
          title:"5) Comparative / Superlative table (fill the missing)",
          note:"Only blanks are checked.",
          items: [
            { q:"long → (comparative)", a:"longer" },
            { q:"fat → (comparative)", a:"fatter" },
            { q:"happy → (comparative)", a:"happier" }
          ]
        },

        {
          id:"ex6",
          type:"fill",
          title:"6) Fill in the comparative forms",
          items: [
            { q:"1 nice → Those football boots are ________ than these ones.", a:"nicer" },
            { q:"2 sporty → Ann’s much ________ than Mary.", a:"sportier" },
            { q:"3 hot → Today is ________ than yesterday.", a:"hotter" },
            { q:"4 cheap → These boxing gloves are ________ than those.", a:"cheaper" },
            { q:"5 bad → Tom’s dancing is ________ than Mike’s.", a:"worse" },
            { q:"6 popular → Kelly is ________ than Jill in the team.", a:"more popular" }
          ]
        },

        {
          id:"ex7",
          type:"fill",
          title:"7) Fill in the superlative forms",
          items: [
            { q:"1 fast → Usain Bolt is ________ runner in the world.", a:"the fastest" },
            { q:"2 long → The women of the Padaung tribe have ________ necks in the world.", a:"the longest" },
            { q:"3 short → The Timorese are ________ people in the world.", a:"the shortest" },
            { q:"4 healthy → The Spanish are ________ people in the world.", a:"the healthiest" }
          ]
        },

        {
          id:"ex9",
          type:"mcq",
          title:"9) Choose the correct item",
          items: [
            { q:"1 This is the ___ shop in the area.", opts:["large","larger","largest"], a:"largest" },
            { q:"2 These boots are ___ expensive than those ones.", opts:["more","much","most"], a:"more" },
            { q:"3 Sam is ___ of all to win the competition.", opts:["the cleverest","clever","cleverer"], a:"the cleverest" },
            { q:"4 Jenny is taller ___ her sister.", opts:["in","of","than"], a:"than" },
            { q:"5 Jason is ___ than Steve.", opts:["the oldest","older","oldest"], a:"older" },
            { q:"6 My new flat is ___ smaller than my old one.", opts:["more","most","much"], a:"much" }
          ]
        }
      ]
    },

    // -------------------------
    // Lesson 4 = Skills 1c (p10–11)
    // -------------------------
    "m1|4": {
      title: "Lesson 4 — Skills 1c: The Home of Horse Riding",
      bookPages:[10,11],
      openBookHint:"Read the article in the PDF (pages 10–11).",

      exercises: [
        {
          id:"ex2b",
          type:"mcq",
          title:"2b) Read again and choose A/B/C (questions 1–4)",
          items: [
            { q:"1 What is the writer doing in the first paragraph?",
              opts:["suggesting a sport to readers","introducing an important animal","describing the Kazakh steppe"],
              a:"introducing an important animal"
            },
            { q:"2 The writer suggests that horses’ saddles were …",
              opts:["always expensive","hardly ever used","very special"],
              a:"very special"
            },
            { q:"3 Archery on horseback is …",
              opts:["a traditional Kazakh skill","the best way to hunt and fight","the most famous horse sport"],
              a:"a traditional Kazakh skill"
            },
            { q:"4 The writer says that horse riding holidays …",
              opts:["more tourists are choosing them","started in Kazakhstan","help tourists explore Kazakhstan"],
              a:"more tourists are choosing them"
            }
          ]
        },
        {
          id:"ex4",
          type:"fill",
          title:"4) Complete the sentences",
          bank:["breathtaking","beauty","freedom","symbol","valuable","traditional"],
          items: [
            { q:"1 Medina wore ________ clothes to take part in the horse riding competition.", a:"traditional" },
            { q:"2 I am always amazed by the ________ of the steppe.", a:"beauty" },
            { q:"3 There is a ________ view from the top of the mountain.", a:"breathtaking" },
            { q:"4 This saddle belonged to my great-grandfather’s horse; it’s very ________.", a:"valuable" },
            { q:"5 The horse is a ________ of strength and speed.", a:"symbol" },
            { q:"6 When I see a wild horse galloping, it makes me think of ________.", a:"freedom" }
          ]
        }
      ]
    },

    // -------------------------
    // Lesson 5 = Everyday English 1d (p12)
    // -------------------------
    "m1|5": {
      title: "Lesson 5 — Everyday English 1d: Making plans",
      bookPage: 12,
      openBookHint:"Dialog and phrases are on page 12 in the PDF.",

      exercises: [
        {
          id:"pron",
          type:"odd_one_out",
          title:"6) Pronunciation: circle the odd word",
          items: [
            { q:"1 enough – tough – rough – though", a:"though" },
            { q:"2 though – although – thorough – dough", a:"thorough" },
            { q:"3 caught – daughter – laugh – haughty", a:"laugh" }
          ]
        }
      ]
    },

    // -------------------------
    // Lesson 6 = Across Cultures 1e (p13)
    // -------------------------
    "m1|6": {
      title: "Lesson 6 — Across Cultures 1e: Free-time fun",
      bookPage: 13,
      openBookHint:"Read page 13 in the PDF.",

      exercises: [
        {
          id:"ex2",
          type:"tfds",
          title:"2) Mark T / F / DS",
          items: [
            { q:"1 Skateboarding is a great form of exercise.", a:"T" },
            { q:"2 Skateboarding is getting more and more popular with teenagers.", a:"T" },
            { q:"3 There are no special places for skateboarders in Almaty.", a:"F" },
            { q:"4 Martial arts can make young people more confident.", a:"T" },
            { q:"5 There are competitions for young martial arts fans.", a:"DS" }
          ]
        }
      ]
    },

    // -------------------------
    // Lesson 7 = Across the Curriculum 1f (p14)
    // -------------------------
    "m1|7": {
      title: "Lesson 7 — Across the Curriculum 1f: Bloggers produce around…",
      bookPage: 14,
      openBookHint:"Read page 14 in the PDF.",

      exercises: [
        {
          id:"ex2",
          type:"fill",
          title:"2) Read again and complete the sentences",
          items: [
            { q:"1 Blogging is a great way for people to ________.", a:"share their ideas with the world" },
            { q:"2 Bloggers can receive some money when a reader ________.", a:"clicks on the link and buys something" },
            { q:"3 All bloggers need to write and share posts ________.", a:"often" },
            { q:"4 Blogs that publish posts often are usually ________.", a:"the most popular" },
            { q:"5 Bloggers have to learn ________.", a:"SEO and other web terms" },
            { q:"6 Bloggers have to sign up to a plan to ________.", a:"get the best software" }
          ]
        }
      ]
    },

    // -------------------------
    // Lesson 8 = Writing 1g (p15)
    // -------------------------
    "m1|8": {
      title: "Lesson 8 — Writing 1g: An email describing a hobby",
      bookPage: 15,
      openBookHint:"See page 15 in the PDF.",

      exercises: [
        {
          id:"ex1",
          type:"mcq",
          title:"1) Complete the email with topic sentences (A–C). One is extra.",
          items: [
            { q:"Gap 1", opts:["A I love photography for lots of reasons.","B My favourite hobby is photography.","C I don’t have a lot of free time."], a:"B My favourite hobby is photography." },
            { q:"Gap 2", opts:["A I love photography for lots of reasons.","B My favourite hobby is photography.","C I don’t have a lot of free time."], a:"A I love photography for lots of reasons." }
          ],
          note:"Extra sentence: C"
        },
        {
          id:"ex2",
          type:"fill",
          title:"2) Rewrite using the linkers",
          items: [
            { q:"1 Free running is exciting. It can be dangerous. (but)", a:"Free running is exciting, but it can be dangerous." },
            { q:"2 Collecting seashells is cheap. It’s easy to do. (as well)", a:"Collecting seashells is cheap and easy to do as well." },
            { q:"3 Playing video games is fun. Playing too much isn’t good for us. (However)", a:"Playing video games is fun. However, playing too much isn’t good for us." },
            { q:"4 Paintballing is great exercise. It can hurt. (though)", a:"Paintballing is great exercise, though it can hurt." },
            { q:"5 Rock climbing is difficult. It is tiring. (too)", a:"Rock climbing is difficult and tiring too." }
          ]
        }
      ]
    }
  }
};
