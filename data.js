window.APP_DATA = {
  appTitle: "AI Bayan · Excel 7",
  bookPdf: "Excel-7.pdf",

  // Модули (можно менять названия/цвета)
  modules: [
    { id:"m1", title:"Module 1 — Hobbies & Leisure", color:"#0aa35f", lessonsCount: 8 },
    { id:"m2", title:"Module 2 — Communication & Technology", color:"#2dd4ff", lessonsCount: 8 },
    { id:"m3", title:"Module 3 — Holidays & Travel", color:"#ffb020", lessonsCount: 8 },
    { id:"m4", title:"Module 4 — Space & Earth", color:"#8b5cff", lessonsCount: 8 },
    { id:"m5", title:"Module 5 — Reading for Pleasure", color:"#22c55e", lessonsCount: 8 },
    { id:"m6", title:"Module 6 — Entertainment & Media", color:"#ff5ad6", lessonsCount: 8 },
    { id:"m7", title:"Module 7 — Natural Disasters", color:"#ff4d4d", lessonsCount: 8 },
    { id:"m8", title:"Module 8 — Healthy Habits", color:"#00e0a4", lessonsCount: 8 },
    { id:"m9", title:"Module 9 — Clothes & Fashion", color:"#ffd166", lessonsCount: 8 },
  ],

  // ===== CONTENT =====
  // ключи: "m1|1" ... "m1|8"
  lessonContent: {
    // ---------- M1 L1 ----------
    "m1|1": {
      bookPage: 5,
      title: "Module 1 · Lesson 1 — Vocabulary: Free-time activities",
      vocab: [
        { en:"🎮 play video games", ru:"играть в видеоигры" },
        { en:"🧘‍♀️ do yoga", ru:"заниматься йогой" },
        { en:"📷 take photos", ru:"фотографировать" },
        { en:"💃 go dancing", ru:"ходить на танцы" },
        { en:"🍳 cook", ru:"готовить" },
        { en:"🧵 do sewing", ru:"заниматься шитьём" },
        { en:"🏄‍♂️ go windsurfing", ru:"заниматься виндсёрфингом" },
        { en:"🧗‍♀️ go rock climbing", ru:"заниматься скалолазанием" },
        { en:"🏹 do archery", ru:"стрельба из лука" },
        { en:"🏎️ go kart racing", ru:"картинг" },
        { en:"🌿 do gardening", ru:"садоводство" },
        { en:"💍 make jewellery", ru:"делать украшения" }
      ],
      reading: {
        title: "Reading: Why hobbies matter",
        text:
"Many teenagers choose a hobby to relax after school. Some hobbies are active, like climbing or dancing. Others are creative, like photography or making jewellery. A good hobby helps you feel happier and more confident.",
        tasks: [
          { q:"Name one active hobby and one creative hobby." },
          { q:"True/False: A hobby can make you more confident." },
          { q:"Why do teenagers choose hobbies?" }
        ]
      },
      dialogue: {
        title: "Dialogue: Talking about hobbies",
        model:
"A: What do you do in your free time?\nB: I take photos and I play video games.\nA: Nice! Do you do any sports?\nB: Yes, I sometimes go rock climbing.",
        roleplay:
"Make your own dialogue. Ask about: free time, favourite hobby, how often."
      },
      grammar: {
        title: "Present Simple vs Present Continuous",
        enRule:
"Present Simple: habits, routines, facts.\nPresent Continuous: actions happening now / around now.",
        ruRule:
"Present Simple: привычки, расписание, факты.\nPresent Continuous: действие сейчас / в данный период.",
        formula:
"PS: I/You/We/They + V1 | He/She/It + V(s)\nPC: am/is/are + V-ing"
      },
      exercises: [
        { id:"ex1", title:"Vocabulary · Matching (EN → RU)", type:"match", pairsCount:6 },
        { id:"ex2", title:"Vocabulary · Missing letters", type:"missing",
          items:[
            { q:"ph__t__gr__phy", a:"photography" },
            { q:"d__nc__g", a:"dancing" },
            { q:"c__k__ng", a:"cooking" },
            { q:"y__a", a:"yoga" },
            { q:"s__w__g", a:"sewing" }
          ]
        },
        { id:"ex3", title:"Grammar · Choose PS or PC", type:"choose",
          items:[
            { q:"I ____ video games every weekend.", a:"play", opts:["play","am playing"] },
            { q:"Look! She ____ yoga now.", a:"is doing", opts:["does","is doing"] },
            { q:"He ____ photos on Sundays.", a:"takes", opts:["takes","is taking"] },
            { q:"We ____ dinner at the moment.", a:"are cooking", opts:["cook","are cooking"] },
            { q:"My friend ____ rock climbing.", a:"doesn't like", opts:["doesn't like","isn't liking"] }
          ]
        },
        { id:"ex4", title:"Build a sentence", type:"build",
          items:[
            { words:["I","am","taking","photos","now"], a:"I am taking photos now." },
            { words:["She","plays","video","games","every","day"], a:"She plays video games every day." },
            { words:["They","are","cooking","at","the","moment"], a:"They are cooking at the moment." },
            { words:["He","doesn't","like","yoga"], a:"He doesn't like yoga." }
          ]
        }
      ]
    },

    // ---------- M1 L2 ----------
    "m1|2": {
      bookPage: 6,
      title: "Module 1 · Lesson 2 — Reading: Take up a hobby",
      vocab: [
        { en:"🧠 concentration", ru:"концентрация" },
        { en:"🏆 tournament", ru:"турнир" },
        { en:"⭐ talented", ru:"талантливый" },
        { en:"🤝 take part (in)", ru:"участвовать (в)" },
        { en:"💥 injury", ru:"травма" },
        { en:"💰 expensive", ru:"дорогой" },
        { en:"⚠️ risk", ru:"риск" },
        { en:"🌐 online", ru:"онлайн" },
        { en:"🔥 popular", ru:"популярный" },
        { en:"🏅 winner", ru:"победитель" }
      ],
      reading: {
        title: "Reading: Choosing a hobby",
        text:
"Some teenagers choose online hobbies like gaming or blogging. Others prefer team activities because they like competition. When you pick a hobby, think about time, equipment and safety. A hobby should be fun, not stressful.",
        tasks: [
          { q:"What should you think about before you choose a hobby?" },
          { q:"True/False: A hobby should be stressful." },
          { q:"Give one example of an online hobby." }
        ]
      },
      dialogue: {
        title: "Dialogue: Asking for advice",
        model:
"A: I want a new hobby. Any ideas?\nB: You should try something easy first.\nA: Like what?\nB: How about photography or dancing?",
        roleplay:
"Ask your friend for advice about a hobby. Use: You should / You shouldn’t."
      },
      grammar: {
        title: "Singular / Plural nouns",
        enRule:
"Plural: most nouns add -s/-es.\nIrregular: child→children, person→people, man→men.",
        ruRule:
"Мн. число: обычно добавляем -s/-es.\nНеправильные: child→children, person→people, man→men.",
        formula:
"book→books / watch→watches\nchild→children / person→people / man→men"
      },
      exercises: [
        { id:"ex1", title:"Vocabulary · Matching (EN → RU)", type:"match", pairsCount:6 },
        { id:"ex2", title:"Missing letters", type:"missing",
          items:[
            { q:"c__nc__ntr__t__on", a:"concentration" },
            { q:"t__rn__m__nt", a:"tournament" },
            { q:"t__l__nt__d", a:"talented" },
            { q:"__nj__ry", a:"injury" },
            { q:"__xp__ns__v__", a:"expensive" }
          ]
        },
        { id:"ex3", title:"Grammar · Choose singular/plural", type:"choose",
          items:[
            { q:"Two ____ are in my class.", a:"children", opts:["child","children"] },
            { q:"Many ____ like online games.", a:"people", opts:["person","people"] },
            { q:"My ____ take part in a tournament.", a:"friends", opts:["friend","friends"] },
            { q:"This ____ is a winner.", a:"man", opts:["man","men"] }
          ]
        },
        { id:"ex4", title:"Build sentences", type:"build",
          items:[
            { words:["Many","people","like","online","games"], a:"Many people like online games." },
            { words:["Two","children","are","in","my","team"], a:"Two children are in my team." },
            { words:["This","tournament","is","popular"], a:"This tournament is popular." }
          ]
        }
      ]
    },

    // ---------- M1 L3 ----------
    "m1|3": {
      bookPage: 8,
      title: "Module 1 · Lesson 3 — Use of English: PS vs PC practice",
      vocab: [
        { en:"🗓️ routine", ru:"рутина" },
        { en:"🔁 habit", ru:"привычка" },
        { en:"⏳ temporary", ru:"временный" },
        { en:"⏱️ at the moment", ru:"в данный момент" },
        { en:"📌 usually", ru:"обычно" },
        { en:"👉 now", ru:"сейчас" }
      ],
      reading: {
        title: "Reading: My weekly schedule",
        text:
"On weekdays I usually study after school. I sometimes go dancing on Fridays. Today I am staying at home because I have a test tomorrow. At the moment I am revising vocabulary.",
        tasks: [
          { q:"Find two Present Simple sentences." },
          { q:"Find one Present Continuous sentence." },
          { q:"Why is the speaker staying at home today?" }
        ]
      },
      dialogue: {
        title: "Dialogue: What are you doing now?",
        model:
"A: Hi! What are you doing now?\nB: I’m revising vocabulary.\nA: Do you usually study in the evening?\nB: Yes, I do.",
        roleplay:
"Ask 3 questions using: usually / now / at the moment."
      },
      grammar: {
        title: "Present Simple / Present Continuous",
        enRule:"PS = habits & facts. PC = now / around now.",
        ruRule:"PS = привычки и факты. PC = сейчас / в данный период.",
        formula:"PS: V1 / V(s) | PC: am/is/are + V-ing"
      },
      exercises: [
        { id:"ex1", title:"Matching (EN → RU)", type:"match", pairsCount:6 },
        { id:"ex2", title:"Missing letters", type:"missing",
          items:[
            { q:"r__ut__n__", a:"routine" },
            { q:"t__mp__r__ry", a:"temporary" },
            { q:"__t th__ m__m__nt", a:"at the moment" },
            { q:"u__u__lly", a:"usually" }
          ]
        },
        { id:"ex3", title:"Choose the correct form", type:"choose",
          items:[
            { q:"He ____ golf on Sundays.", a:"plays", opts:["plays","is playing"] },
            { q:"I ____ my homework now.", a:"am doing", opts:["do","am doing"] },
            { q:"We ____ kart racing today.", a:"are going", opts:["go","are going"] },
            { q:"She ____ rock climbing.", a:"doesn't like", opts:["doesn't like","isn't liking"] }
          ]
        },
        { id:"ex4", title:"Build sentences", type:"build",
          items:[
            { words:["I","usually","study","after","school"], a:"I usually study after school." },
            { words:["He","is","playing","now"], a:"He is playing now." },
            { words:["They","don't","go","today"], a:"They don't go today." }
          ]
        }
      ]
    },

    // ---------- M1 L4 ----------
    "m1|4": {
      bookPage: 10,
      title: "Module 1 · Lesson 4 — Skills: Horse riding in Kazakhstan",
      vocab: [
        { en:"🐎 horse riding", ru:"верховая езда" },
        { en:"🌾 steppes", ru:"степи" },
        { en:"🧤 equipment", ru:"снаряжение" },
        { en:"⛑️ helmet", ru:"шлем" },
        { en:"🥾 boots", ru:"ботинки" },
        { en:"💎 valuable", ru:"ценный" },
        { en:"🏛️ traditional", ru:"традиционный" },
        { en:"💵 cost", ru:"стоимость" }
      ],
      reading: {
        title: "Reading: Safety rules",
        text:
"Horse riding is popular in many countries. Before you ride, you should wear a helmet and boots. You should listen to the instructor. Safety is important for every sport.",
        tasks: [
          { q:"What should you wear before you ride?" },
          { q:"True/False: You should ignore the instructor." },
          { q:"Why is safety important?" }
        ]
      },
      dialogue: {
        title: "Dialogue: At a sports club",
        model:
"A: Do I need special equipment?\nB: Yes. You should wear a helmet.\nA: Is it expensive?\nB: Not always. You can borrow some equipment.",
        roleplay:
"Role play: ask about equipment, price and safety."
      },
      grammar: {
        title: "Advice: should / shouldn’t",
        enRule:"Use should/shouldn't to give advice.",
        ruRule:"should/shouldn’t — чтобы давать совет.",
        formula:"You should + V1 / You shouldn’t + V1"
      },
      exercises: [
        { id:"ex1", title:"Matching (EN → RU)", type:"match", pairsCount:6 },
        { id:"ex2", title:"Missing letters", type:"missing",
          items:[
            { q:"tr__d__t__on__l", a:"traditional" },
            { q:"__q__ipm__nt", a:"equipment" },
            { q:"h__lm__t", a:"helmet" },
            { q:"st__pp__s", a:"steppes" }
          ]
        },
        { id:"ex3", title:"Choose", type:"choose",
          items:[
            { q:"You should wear a ____.", a:"helmet", opts:["helmet","sandals"] },
            { q:"Horse riding is ____ in Kazakhstan.", a:"traditional", opts:["traditional","dangerous"] },
            { q:"You ____ listen to the instructor.", a:"should", opts:["should","shouldn’t"] }
          ]
        },
        { id:"ex4", title:"Build advice", type:"build",
          items:[
            { words:["You","should","wear","a","helmet"], a:"You should wear a helmet." },
            { words:["You","shouldn’t","ride","without","boots"], a:"You shouldn’t ride without boots." },
            { words:["You","should","check","equipment"], a:"You should check equipment." }
          ]
        }
      ]
    },

    // ---------- M1 L5 ----------
    "m1|5": {
      bookPage: 12,
      title: "Module 1 · Lesson 5 — Everyday English: Making plans",
      vocab: [
        { en:"📅 make plans", ru:"строить планы" },
        { en:"✅ Sure, why not?", ru:"Конечно, почему бы и нет?" },
        { en:"❌ Sorry, I can’t.", ru:"Извини, не могу." },
        { en:"⏰ What time?", ru:"Во сколько?" },
        { en:"🤝 Let’s…", ru:"Давай…" },
        { en:"👍 Sounds good!", ru:"Звучит отлично!" }
      ],
      reading: {
        title: "Reading: Weekend plans",
        text:
"At the weekend friends often meet to do something fun. They can go to a sports centre, watch a film or practise a hobby. It is important to agree on time and place.",
        tasks: [
          { q:"Name two activities for the weekend." },
          { q:"What is important when you make plans?" }
        ]
      },
      dialogue: {
        title: "Dialogue: Invitation",
        model:
"A: Let’s go to the sports centre on Saturday.\nB: Sure, why not? What time?\nA: At 5.\nB: Sounds good!",
        roleplay:
"Invite your friend. Use: Let’s / Sure / Sorry, I can’t / What time?"
      },
      grammar: {
        title: "Invitations",
        enRule:"Let’s + V. Replies: Sure / Sorry, I can’t.",
        ruRule:"Приглашение: Let’s + V. Ответ: Sure / Sorry, I can’t.",
        formula:"Let’s + V1 | Do you want to + V1?"
      },
      exercises: [
        { id:"ex1", title:"Matching (EN → RU)", type:"match", pairsCount:6 },
        { id:"ex2", title:"Missing letters", type:"missing",
          items:[
            { q:"S__rry, I c__n't.", a:"Sorry, I can't." },
            { q:"S__re, wh__ n__t?", a:"Sure, why not?" },
            { q:"Wh__t t__me?", a:"What time?" },
            { q:"S__unds g__od!", a:"Sounds good!" }
          ]
        },
        { id:"ex3", title:"Choose reply", type:"choose",
          items:[
            { q:"Let’s go skating.", a:"Sure, why not?", opts:["Sure, why not?","I am going now."] },
            { q:"Do you want to go out?", a:"Sorry, I can’t.", opts:["Sorry, I can’t.","What time?"] },
            { q:"See you at 6.", a:"Sounds good!", opts:["Sounds good!","I’m free on Monday."] }
          ]
        },
        { id:"ex4", title:"Build a dialogue", type:"build",
          items:[
            { words:["A:","Let’s","go","to","the","park","on","Sunday."], a:"A: Let’s go to the park on Sunday." },
            { words:["B:","Sure,","why","not?","What","time?"], a:"B: Sure, why not? What time?" }
          ]
        }
      ]
    },

    // ---------- M1 L6 ----------
    "m1|6": {
      bookPage: 13,
      title: "Module 1 · Lesson 6 — Across Cultures: Free-time around the world",
      vocab: [
        { en:"🛹 skateboarding", ru:"скейтбординг" },
        { en:"🥋 martial arts", ru:"боевые искусства" },
        { en:"🎢 thrilling", ru:"захватывающий" },
        { en:"📈 improve", ru:"улучшать" },
        { en:"⚖️ balance", ru:"баланс" },
        { en:"🧠 concentration", ru:"концентрация" }
      ],
      reading: {
        title: "Reading: Different hobbies",
        text:
"In different countries teenagers enjoy different hobbies. Some choose skateboarding because it is thrilling. Others do martial arts because it improves balance and concentration. Hobbies can also bring people together.",
        tasks: [
          { q:"Why do some teenagers choose skateboarding?" },
          { q:"What can martial arts improve?" },
          { q:"True/False: Hobbies can bring people together." }
        ]
      },
      dialogue: {
        title: "Dialogue: Preferences",
        model:
"A: Do you like skateboarding?\nB: Not really. I prefer martial arts.\nA: Why?\nB: Because it improves my balance.",
        roleplay:
"Talk about preferences: like / don’t like / prefer + because."
      },
      grammar: {
        title: "Because / so",
        enRule:"Because = reason. So = result.",
        ruRule:"Because = причина. So = результат.",
        formula:"I like it because… / It is fun, so…"
      },
      exercises: [
        { id:"ex1", title:"Matching (EN → RU)", type:"match", pairsCount:6 },
        { id:"ex2", title:"Missing letters", type:"missing",
          items:[
            { q:"sk__t__b__ard__ng", a:"skateboarding" },
            { q:"m__rt__al arts", a:"martial arts" },
            { q:"th__ill__ng", a:"thrilling" },
            { q:"b__l__nce", a:"balance" }
          ]
        },
        { id:"ex3", title:"Choose because / so", type:"choose",
          items:[
            { q:"I do yoga ____ it helps my balance.", a:"because", opts:["because","so"] },
            { q:"I’m tired, ____ I can’t go out.", a:"so", opts:["because","so"] },
            { q:"He likes skating ____ it’s exciting.", a:"because", opts:["because","so"] }
          ]
        },
        { id:"ex4", title:"Build sentences", type:"build",
          items:[
            { words:["I","like","martial","arts","because","it","is","useful"], a:"I like martial arts because it is useful." },
            { words:["It","is","late,","so","I","go","home"], a:"It is late, so I go home." },
            { words:["I","train","a","lot,","so","I","improve"], a:"I train a lot, so I improve." }
          ]
        }
      ]
    },

    // ---------- M1 L7 ----------
    "m1|7": {
      bookPage: 14,
      title: "Module 1 · Lesson 7 — ICT: To blog or not to blog?",
      vocab: [
        { en:"📝 blog", ru:"блог" },
        { en:"👩‍💻 blogger", ru:"блогер" },
        { en:"📌 post", ru:"пост" },
        { en:"🌐 online platform", ru:"онлайн платформа" },
        { en:"✅ pros", ru:"плюсы" },
        { en:"❌ cons", ru:"минусы" },
        { en:"🔐 privacy", ru:"конфиденциальность" },
        { en:"🤳 share", ru:"делиться" }
      ],
      reading: {
        title: "Reading: Blogging safely",
        text:
"Blogging can be a good way to share ideas and hobbies. However, you should think about privacy. Don’t post personal information. Use polite language and plan your posts.",
        tasks: [
          { q:"Give one advantage of blogging." },
          { q:"What shouldn’t you post online?" },
          { q:"True/False: You should use polite language online." }
        ]
      },
      dialogue: {
        title: "Dialogue: Pros and cons",
        model:
"A: Is blogging a good idea?\nB: It has pros and cons.\nA: What are the pros?\nB: You can share your hobbies and meet people online.",
        roleplay:
"Discuss pros/cons. Use: I think / In my opinion / You should / You shouldn’t."
      },
      grammar: {
        title: "Advice: should / shouldn’t",
        enRule:"Use should/shouldn't to give advice.",
        ruRule:"should/shouldn’t — чтобы давать совет.",
        formula:"You should + V1 / You shouldn’t + V1"
      },
      exercises: [
        { id:"ex1", title:"Matching (EN → RU)", type:"match", pairsCount:6 },
        { id:"ex2", title:"Missing letters", type:"missing",
          items:[
            { q:"pl__tf__rm", a:"platform" },
            { q:"bl__gg__r", a:"blogger" },
            { q:"pr__v__cy", a:"privacy" },
            { q:"sh__r__", a:"share" },
            { q:"sh__uldn’t", a:"shouldn’t" }
          ]
        },
        { id:"ex3", title:"Choose should / shouldn’t", type:"choose",
          items:[
            { q:"You ____ plan your posts.", a:"should", opts:["should","shouldn’t"] },
            { q:"You ____ share passwords.", a:"shouldn’t", opts:["should","shouldn’t"] },
            { q:"A blogger ____ write clearly.", a:"should", opts:["should","shouldn’t"] },
            { q:"You ____ be rude online.", a:"shouldn’t", opts:["should","shouldn’t"] }
          ]
        },
        { id:"ex4", title:"Build advice", type:"build",
          items:[
            { words:["You","should","write","a","plan"], a:"You should write a plan." },
            { words:["You","shouldn’t","post","private","information"], a:"You shouldn’t post private information." },
            { words:["You","should","use","polite","language"], a:"You should use polite language." }
          ]
        }
      ]
    },

    // ---------- M1 L8 ----------
    "m1|8": {
      bookPage: 15,
      title: "Module 1 · Lesson 8 — Writing: An email about a hobby",
      vocab: [
        { en:"✉️ email", ru:"электронное письмо" },
        { en:"🕒 in my free time", ru:"в свободное время" },
        { en:"📆 at the weekend", ru:"на выходных" },
        { en:"✅ usually", ru:"обычно" },
        { en:"🔁 sometimes", ru:"иногда" },
        { en:"😊 I enjoy", ru:"мне нравится" }
      ],
      reading: {
        title: "Reading: Model email (short)",
        text:
"Hi! In my free time I enjoy photography. I usually take photos at the weekend. Sometimes I go to the park with my friends. I like it because it is relaxing. Write back soon!",
        tasks: [
          { q:"What hobby does the writer enjoy?" },
          { q:"When does the writer usually do it?" },
          { q:"Why does the writer like it?" }
        ]
      },
      dialogue: {
        title: "Dialogue: Writing plan",
        model:
"A: What should I write in my email?\nB: Start with a greeting, then describe your hobby.\nA: Should I use linkers?\nB: Yes — and, but, because.",
        roleplay:
"Plan your email: greeting + hobby + frequency + reason."
      },
      grammar: {
        title: "Linkers: and / but / because",
        enRule:"Use linkers to connect ideas: and, but, because.",
        ruRule:"Связки: and (и), but (но), because (потому что).",
        formula:"Sentence + and/but/because + sentence"
      },
      exercises: [
        { id:"ex1", title:"Matching (EN → RU)", type:"match", pairsCount:6 },
        { id:"ex2", title:"Missing letters", type:"missing",
          items:[
            { q:"__su__ll__", a:"usually" },
            { q:"s__m__t__m__s", a:"sometimes" },
            { q:"b__c__us__", a:"because" },
            { q:"__nj__y", a:"enjoy" }
          ]
        },
        { id:"ex3", title:"Choose the linker", type:"choose",
          items:[
            { q:"I like chess ____ it makes me think.", a:"because", opts:["and","but","because"] },
            { q:"I want to go out, ____ it is raining.", a:"but", opts:["and","but","because"] },
            { q:"I play football ____ I do yoga.", a:"and", opts:["and","but","because"] }
          ]
        },
        { id:"ex4", title:"Build a mini email (4 sentences)", type:"build",
          items:[
            { words:["Hi!","In","my","free","time","I","enjoy","photography."], a:"Hi! In my free time I enjoy photography." },
            { words:["I","usually","take","photos","at","the","weekend."], a:"I usually take photos at the weekend." },
            { words:["I","like","it","and","I","feel","happy."], a:"I like it and I feel happy." },
            { words:["I","love","it","because","it","is","relaxing."], a:"I love it because it is relaxing." }
          ]
        }
      ]
    }
  }
};
