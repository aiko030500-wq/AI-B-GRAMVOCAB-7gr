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
  title: "Module 1 · Lesson 2 — Reading 1a: Take up a hobby",

  // 1) VOCAB (Check these words) + emoji
  vocab: [
    { en:"paint", ru:"краска", emoji:"🎨" },
    { en:"wood", ru:"лес", emoji:"🌲" },
    { en:"hurt", ru:"пораниться / болеть", emoji:"🤕" },
    { en:"field", ru:"поле", emoji:"🏞️" },
    { en:"take role (in)", ru:"играть роль (в)", emoji:"🎭" },
    { en:"spy", ru:"шпион", emoji:"🕵️" },
    { en:"adventure", ru:"приключение", emoji:"🗺️" },
    { en:"last", ru:"длиться", emoji:"⏳" },
    { en:"painful", ru:"болезненный", emoji:"😣" },
    { en:"I don’t mind", ru:"я не против", emoji:"🙂" },
    { en:"stare", ru:"пялиться / пристально смотреть", emoji:"👀" },
    { en:"screen", ru:"экран", emoji:"🖥️" },
    { en:"concentration", ru:"концентрация", emoji:"🎯" },
    { en:"talented", ru:"талантливый", emoji:"🌟" },
    { en:"tournament", ru:"турнир", emoji:"🏆" },
    { en:"online", ru:"онлайн", emoji:"🌐" },
    { en:"followers", ru:"подписчики", emoji:"👥" },
    { en:"support", ru:"поддержка", emoji:"🤝" },
    { en:"square-eyed", ru:"«залипший в экране»", emoji:"📺" }
  ],

  // 3) TEXT A & B (коротко + поля для полного текста)
  reading: {
    title: "Take up a hobby — Text A & Text B",
    // короткие отрывки (чтобы было красиво в приложении)
    text:
"Text A (Paint Wars): Read in your book (p.6).\nText B (Super Gaming): Read in your book (p.6).",
    // если захочешь вставить полностью сама — вставь сюда
    textA_full: "",
    textB_full: ""
  },

  exercises: [
    // 2) EX1 — Write hobbies/leisure activities (из книги)
    {
      id:"ex1",
      type:"short",
      title:"Ex 1 — Write hobbies & leisure activities",
      items: [
        { q:"In a minute write down as many different hobbies and leisure activities as you can. Compare with your partner." }
      ]
    },

    // 7) LISTEN AND REPEAT (как в шапке задания 2)
    {
      id:"ex2",
      type:"short",
      title:"Listen and repeat",
      items: [
        { q:"Listen and repeat the key words from the lesson (activities + Check these words)." }
      ]
    },

    // 2) (из книги) — где можно играть? больно ли? турниры? (под картинками)
    {
      id:"ex3",
      type:"short",
      title:"Ex 2 — Look at the title and pictures",
      items: [
        { q:"Where can someone play paintball?" },
        { q:"Does it hurt if someone hits you?" },
        { q:"Do video gamers take part in tournaments?" },
        { q:"Listen and read to find out." }
      ]
    },

    // 4) EX3 — T / F / DS (точно как в книге)
    {
      id:"ex4",
      type:"truefalse",
      title:"Ex 3 — Read again and mark: T / F / DS",
      items: [
        { q:"Text A: Jack plays games of paintball during the week." },
        { q:"Text A: Jack’s team often wins the games." },
        { q:"Text A: A game of paintball can take a long time." },
        { q:"Text A: Paintball is an expensive hobby." },

        { q:"Text B: Alex plays against gamers from other countries." },
        { q:"Text B: Alex is a popular gamer on a website." },
        { q:"Text B: Alex’s family think his hobby is a bad idea." },
        { q:"Text B: Alex does not like playing real sports." }
      ]
    },

    // 5) EX4 — Complete (я оставляю «точную структуру», ты если надо добавишь ответы)
    // потому что на фото Ex4 не видно полностью; как только пришлёшь страницу ниже — сделаю 1в1.
    {
      id:"ex5",
      type:"build",
      title:"Ex 4 — Complete the sentences (from the text)",
      items: [
        { words:["Paintballing","is","only","...","(one word from the text)"], answer:"" },
        { words:["Games","can","last","from","...","to","..."], answer:"" },
        { words:["Alex","has","hundreds","of","...","on","YouTube"], answer:"" },
        { words:["Some","people","call","him","..."], answer:"" }
      ]
    },

    // 6) SYNC (как отдельный мини-блок)
    {
      id:"ex6",
      type:"short",
      title:"Sync",
      items: [
        { q:"Work in pairs. Check your answers and explain your choices (T/F/DS)." }
      ]
    },

    // 8) SPEAKING
    {
      id:"ex7",
      type:"short",
      title:"Speaking",
      items: [
        { q:"Which hobby from the texts is more interesting for you? Why?" },
        { q:"Do you think paintball is dangerous? Explain." },
        { q:"Do you think gaming can be a serious hobby? Explain." }
      ]
    },

    // 9) WRITING
    {
      id:"ex8",
      type:"short",
      title:"Writing",
      items: [
        { q:"Write 5–6 sentences about your hobby. Use: fun/exciting/boring/dangerous + because." }
      ]
    }
  ]
}

    /* ======================================================
       LESSON 3 — Use of English 1b
       ====================================================== */
    "m1|3": {
  bookPage: 7,
  title: "Module 1 · Lesson 3 — Use of English 1b",

  /* ===============================
     1) PRESENT SIMPLE — RULES
     =============================== */
  grammarPS: {
    title: "Present Simple",
    enRule:
"We use the Present Simple to talk about:\n" +
"• permanent states and general truths\n" +
"• habits and routines\n" +
"• timetables and schedules\n" +
"• time expressions: every day, often, on Mondays",
    ruRule:
"Present Simple используется для:\n" +
"• постоянных состояний и фактов\n" +
"• привычек и регулярных действий\n" +
"• расписаний и графиков\n" +
"• слов: every day, often, on Mondays",
    formula:
"I / You / We / They + V1\n" +
"He / She / It + V(s)"
  },

  /* ===============================
     2) EX 2 — Complete the gaps (PS / PC)
     =============================== */
  exercises: [

    {
      id:"ex2",
      type:"choose",
      title:"Ex 2 — Present Simple or Present Continuous",
      items:[
        { q:"John sometimes ___ golf on Sundays.", opts:["plays","is playing"], a:"plays" },
        { q:"Ann ___ a book in her room now.", opts:["reads","is reading"], a:"is reading" },
        { q:"___ you ___ collecting stamps?", opts:["Do / like","Are / liking"], a:"Do / like" },
        { q:"Jen and Bill ___ go kart racing tonight.", opts:["go","are going"], a:"are going" },
        { q:"Suzy’s class ___ start at 4 pm.", opts:["starts","is starting"], a:"starts" },
        { q:"Adrian ___ to buy a new pair of sports shoes.", opts:["wants","is wanting"], a:"wants" },
        { q:"___ you ___ to New York next month?", opts:["Do / fly","Are / flying"], a:"Are / flying" }
      ]
    },

    /* ===============================
       3) EX 3 — Put the verbs (email)
       =============================== */
    {
      id:"ex3",
      type:"build",
      title:"Ex 3 — Present Simple / Present Continuous (email)",
      items:[
        { words:["I","am","very","busy","today"], answer:"I am very busy today." },
        { words:["My","little","brother","has","a","fancy","dress"], answer:"My little brother has a fancy dress." },
        { words:["Mum","is","tidying","the","house"], answer:"Mum is tidying the house." },
        { words:["Dad","wants","to","be","a","pirate"], answer:"Dad wants to be a pirate." },
        { words:["I","am","making","my","brother’s","costume"], answer:"I am making my brother’s costume." },
        { words:["Mum","doesn’t","like","baking"], answer:"Mum doesn’t like baking." },
        { words:["She","is","making","the","cake"], answer:"She is making the cake." }
      ]
    },

    /* ===============================
       4) PLURAL NOUNS — RULES
       =============================== */
    {
      id:"plurals",
      type:"rule",
      title:"Singular / Plural nouns",
      enRule:
"Some nouns take a plural verb:\n" +
"clothes, police, people, scissors.\n\n" +
"Some nouns take a singular verb:\n" +
"advice, news, homework, furniture.\n\n" +
"Group nouns can be singular or plural:\n" +
"family, team, class.",
      ruRule:
"Некоторые существительные используются только во множественном числе:\n" +
"clothes, police, people.\n\n" +
"Некоторые — только в единственном:\n" +
"advice, news, homework.\n\n" +
"Собирательные существительные могут быть в ед. или мн. числе:\n" +
"family, team, class."
    },

    /* ===============================
       5) EX 4 — Choose the correct item (plurals)
       =============================== */
    {
      id:"ex4",
      type:"choose",
      title:"Ex 4 — Choose the correct item",
      items:[
        { q:"The police ___ on their way.", opts:["is","are"], a:"are" },
        { q:"Physics ___ my favourite subject.", opts:["is","are"], a:"is" },
        { q:"Your news ___ very interesting.", opts:["is","are"], a:"is" },
        { q:"Your trousers ___ dirty.", opts:["is","are"], a:"are" },
        { q:"Family ___ very precious to me.", opts:["is","are"], a:"is" }
      ]
    },

    /* ===============================
       6) COMPARATIVE & SUPERLATIVE — RULE
       =============================== */
    {
      id:"comparativeRule",
      type:"rule",
      title:"Comparative & Superlative adjectives",
      enRule:
"Short adjectives: add -er / -est\n" +
"long → longer → the longest\n\n" +
"Long adjectives: more / most\n" +
"beautiful → more beautiful → the most beautiful\n\n" +
"Irregular:\n" +
"good → better → the best\n" +
"bad → worse → the worst",
      ruRule:
"Сравнительная и превосходная степени:\n" +
"• короткие прилагательные: -er / -est\n" +
"• длинные: more / most\n" +
"• неправильные формы: good → better → best"
    },

    /* ===============================
       7) EX 6 — Fill in the comparative forms
       =============================== */
    {
      id:"ex6",
      type:"build",
      title:"Ex 6 — Comparative forms",
      items:[
        { words:["These","boots","are","nicer","than","those"], answer:"These boots are nicer than those." },
        { words:["Ann","is","much","sportier","than","Mary"], answer:"Ann is much sportier than Mary." },
        { words:["Today","is","hotter","than","yesterday"], answer:"Today is hotter than yesterday." },
        { words:["Kelly","is","more","popular","than","Jill"], answer:"Kelly is more popular than Jill." }
      ]
    },

    /* ===============================
       8) EX 7 — Superlative forms
       =============================== */
    {
      id:"ex7",
      type:"build",
      title:"Ex 7 — Superlative forms",
      items:[
        { words:["Usain","Bolt","is","the","fastest","runner"], answer:"Usain Bolt is the fastest runner." },
        { words:["Thailand","has","the","longest","river"], answer:"Thailand has the longest river." },
        { words:["The","Timores","are","the","shortest","people"], answer:"The Timores are the shortest people." }
      ]
    },

    /* ===============================
       9) EX 8 — Compare people (table)
       =============================== */
    {
      id:"ex8",
      type:"short",
      title:"Ex 8 — Compare the people",
      items:[
        { q:"Tracy is heavier than Sofia." },
        { q:"Paul is much heavier than Tracy." },
        { q:"Tracy is as heavy as Paul." },
        { q:"Paul is the heaviest of all." }
      ]
    },

    /* ===============================
       10) EX 9 — Choose the correct item
       =============================== */
    {
      id:"ex9",
      type:"choose",
      title:"Ex 9 — Choose the correct item",
      items:[
        { q:"This is the ___ shop in the area.", opts:["large","larger","largest"], a:"largest" },
        { q:"These boots are ___ expensive than those.", opts:["more","much","most"], a:"more" },
        { q:"Sam is ___ of all to win the competition.", opts:["cleverest","clever","cleverer"], a:"cleverest" },
        { q:"Jenny is taller ___ her sister.", opts:["in","of","than"], a:"than" }
      ]
    },

    /* ===============================
       11) EX 10 — Speaking (revision)
       =============================== */
    {
      id:"ex10",
      type:"short",
      title:"Ex 10 — Speaking",
      items:[
        { q:"In three minutes, revise the use of English in Unit 1b. Make sentences using them." }
      ]
    }
  ]
}

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
