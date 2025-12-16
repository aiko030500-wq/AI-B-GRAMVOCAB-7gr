window.APP_DATA = {
  appTitle: "AI Bayan · Excel 7",
  bookPdf: "Excel-7.pdf",

  modules: [
    { id:"m1", title:"Module 1 — Hobbies & Leisure", color:"#ff2f5f", lessonsCount: 8 },
    { id:"m2", title:"Module 2 — Communication & Technology", color:"#2dd4ff", lessonsCount: 8 },
    { id:"m3", title:"Module 3 — Holidays & Travel", color:"#ffb020", lessonsCount: 8 },
    { id:"m4", title:"Module 4 — Space & Earth", color:"#8b5cff", lessonsCount: 8 },
    { id:"m5", title:"Module 5 — Reading for Pleasure", color:"#22c55e", lessonsCount: 8 },
    { id:"m6", title:"Module 6 — Entertainment & Media", color:"#ff5ad6", lessonsCount: 8 },
    { id:"m7", title:"Module 7 — Natural Disasters", color:"#ff4d4d", lessonsCount: 8 },
    { id:"m8", title:"Module 8 — Healthy Habits", color:"#00e0a4", lessonsCount: 8 },
    { id:"m9", title:"Module 9 — Clothes & Fashion", color:"#ffd166", lessonsCount: 8 },
  ],

  // Module 1 — 8 lessons (practice + print + open pdf page)
  lessonContent: {
    "m1|1": {
      bookPage: 5,
      title: "Module 1 · Lesson 1 — Vocabulary: Free-time activities",
      vocab: [
        { en:"sewing", ru:"шитьё" },
        { en:"cooking", ru:"готовка" },
        { en:"dancing", ru:"танцы" },
        { en:"photography", ru:"фотография" },
        { en:"playing video games", ru:"играть в видеоигры" },
        { en:"wind surfing", ru:"виндсёрфинг" },
        { en:"yoga", ru:"йога" },
        { en:"rock climbing", ru:"скалолазание" },
        { en:"archery", ru:"стрельба из лука" },
        { en:"kart racing", ru:"картинг" },
        { en:"gardening", ru:"садоводство" },
        { en:"jewellery-making", ru:"изготовление украшений" }
      ],
      grammar: {
        title: "Present Simple vs Present Continuous",
        enRule:
`Present Simple: for habits/routines and facts.
Present Continuous: for actions happening now / around now.`,
        ruRule:
`Present Simple: для привычек/расписания и фактов.
Present Continuous: для действий сейчас / в данный период.`,
        formula:
`PS: I/You/We/They + V1 | He/She/It + V(s)
PC: am/is/are + V-ing`
      },
      exercises: [
        { id:"ex1", title:"Vocabulary · Matching (EN → RU)", type:"match", pairsCount:6 },
        { id:"ex2", title:"Vocabulary · Missing letters", type:"missing",
          items:[
            { q:"p__t__gr__phy", a:"photography" },
            { q:"d__nc__g", a:"dancing" },
            { q:"c__k__ng", a:"cooking" },
            { q:"y__a", a:"yoga" },
            { q:"s__w__g", a:"sewing" }
          ]
        },
        { id:"ex3", title:"Grammar · Choose PS or PC", type:"choose",
          items:[
            { q:"I ____ (play) video games every weekend.", a:"play", opts:["play","am playing"] },
            { q:"Look! He ____ (do) yoga now.", a:"is doing", opts:["does","is doing"] },
            { q:"She ____ (go) to dance classes on Fridays.", a:"goes", opts:["goes","is going"] },
            { q:"We ____ (cook) at the moment.", a:"are cooking", opts:["cook","are cooking"] },
            { q:"My brother ____ (not like) rock climbing.", a:"doesn't like", opts:["doesn't like","isn't liking"] }
          ]
        },
        { id:"ex4", title:"Grammar · Build a sentence", type:"build",
          items:[
            { words:["I","am","taking","photos","now"], a:"I am taking photos now." },
            { words:["She","plays","the","piano","every","day"], a:"She plays the piano every day." },
            { words:["They","are","watching","a","video","now"], a:"They are watching a video now." },
            { words:["He","doesn't","like","yoga"], a:"He doesn't like yoga." }
          ]
        }
      ]
    },

    "m1|2": {
      bookPage: 6,
      title: "Module 1 · Lesson 2 — Reading: Take up a hobby",
      vocab: [
        { en:"concentration", ru:"концентрация" },
        { en:"talented", ru:"талантливый" },
        { en:"tournament", ru:"турнир" },
        { en:"chasing", ru:"погоня / преследование" },
        { en:"take part (in)", ru:"участвовать (в)" },
        { en:"injury", ru:"травма" },
        { en:"expensive", ru:"дорогой" },
        { en:"risk", ru:"риск" },
        { en:"online", ru:"онлайн" },
        { en:"popular", ru:"популярный" },
        { en:"winner", ru:"победитель" },
        { en:"team", ru:"команда" }
      ],
      grammar: {
        title: "Singular / Plural nouns",
        enRule:
`Singular: a book, a child.
Plural: books, children.
Some nouns are irregular: man → men, person → people.`,
        ruRule:
`Ед. число: a book, a child.
Мн. число: books, children.
Есть неправильные формы: man → men, person → people.`,
        formula:
`Most plurals: noun + s / es
Irregular: child→children, man→men, person→people`
      },
      exercises: [
        { id:"ex1", title:"Vocabulary · Matching (EN → RU)", type:"match", pairsCount:6 },
        { id:"ex2", title:"Vocabulary · Missing letters", type:"missing",
          items:[
            { q:"c__c__ntr__t__on", a:"concentration" },
            { q:"t__rn__m__nt", a:"tournament" },
            { q:"t__l__nt__d", a:"talented" },
            { q:"__nj__ry", a:"injury" },
            { q:"__xp__ns__v__", a:"expensive" }
          ]
        },
        { id:"ex3", title:"Grammar · Choose singular or plural", type:"choose",
          items:[
            { q:"Two ____ (child) are in my class.", a:"children", opts:["child","children"] },
            { q:"Many ____ (person) like online games.", a:"people", opts:["person","people"] },
            { q:"My ____ (friend) play in a team.", a:"friends", opts:["friend","friends"] },
            { q:"This ____ (man) is a winner.", a:"man", opts:["man","men"] },
            { q:"We take part in ____ (tournament).", a:"tournaments", opts:["tournament","tournaments"] }
          ]
        },
        { id:"ex4", title:"Reading · True / False", type:"choose",
          items:[
            { q:"Alex plays online games with people from other countries.", a:"True",  opts:["True","False"] },
            { q:"Alex never watches videos about games.", a:"False", opts:["True","False"] },
            { q:"Paintball can cause an injury.", a:"True", opts:["True","False"] },
            { q:"Paintball is always cheap.", a:"False", opts:["True","False"] },
            { q:"Alex's family thinks his hobby is a bad idea.", a:"True", opts:["True","False"] }
          ]
        }
      ]
    },

    "m1|3": {
      bookPage: 8,
      title: "Module 1 · Lesson 3 — Use of English: PS vs PC",
      vocab: [
        { en:"habit", ru:"привычка" },
        { en:"routine", ru:"рутина" },
        { en:"temporary", ru:"временный" },
        { en:"at the moment", ru:"в данный момент" },
        { en:"usually", ru:"обычно" },
        { en:"now", ru:"сейчас" }
      ],
      grammar: {
        title: "Present Simple / Present Continuous",
        enRule:`PS = habits & facts. PC = now / around now.`,
        ruRule:`PS = привычки и факты. PC = сейчас / в данный период.`,
        formula:`PS: V1 / V(s) | PC: am/is/are + V-ing`
      },
      exercises: [
        { id:"ex1", title:"Matching", type:"match", pairsCount:6 },
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
            { q:"He ____ (play) golf on Sundays.", a:"plays", opts:["plays","is playing"] },
            { q:"I ____ (do) my homework now.", a:"am doing", opts:["do","am doing"] },
            { q:"We ____ (go) kart racing today.", a:"are going", opts:["go","are going"] },
            { q:"She ____ (not like) risk.", a:"doesn't like", opts:["doesn't like","isn't liking"] }
          ]
        },
        { id:"ex4", title:"Build sentences", type:"build",
          items:[
            { words:["I","usually","play","football","after","school"], a:"I usually play football after school." },
            { words:["He","is","studying","at","the","moment"], a:"He is studying at the moment." },
            { words:["They","don't","play","today"], a:"They don't play today." }
          ]
        }
      ]
    },

    "m1|4": {
      bookPage: 10,
      title: "Module 1 · Lesson 4 — Skills: The Home of Horse Riding",
      vocab: [
        { en:"steppes", ru:"степи" },
        { en:"freedom", ru:"свобода" },
        { en:"valuable", ru:"ценный" },
        { en:"traditional", ru:"традиционный" },
        { en:"equipment", ru:"снаряжение" },
        { en:"helmet", ru:"шлем" },
        { en:"boots", ru:"ботинки" },
        { en:"cost", ru:"стоимость" }
      ],
      grammar: {
        title: "Present Simple (habits)",
        enRule:`Use PS for routines: I ride on Sundays.`,
        ruRule:`PS для привычек: I ride on Sundays.`,
        formula:`I/You/We/They + V1 | He/She/It + V(s)`
      },
      exercises: [
        { id:"ex1", title:"Matching", type:"match", pairsCount:6 },
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
            { q:"Horse riding is ____ in Kazakhstan.", a:"traditional", opts:["traditional","impossible"] },
            { q:"My lessons ____ at 5 pm.", a:"start", opts:["start","am starting"] }
          ]
        },
        { id:"ex4", title:"Build 3 sentences", type:"build",
          items:[
            { words:["I","ride","a","bike","on","Sundays"], a:"I ride a bike on Sundays." },
            { words:["I","wear","a","helmet","when","I","ride"], a:"I wear a helmet when I ride." },
            { words:["My","hobby","is","valuable","for","me"], a:"My hobby is valuable for me." }
          ]
        }
      ]
    },

    "m1|5": {
      bookPage: 12,
      title: "Module 1 · Lesson 5 — Everyday English: Making plans",
      vocab: [
        { en:"Sorry, I can't.", ru:"Извини, не могу." },
        { en:"Sure, why not?", ru:"Конечно, почему бы и нет?" },
        { en:"What time?", ru:"Во сколько?" },
        { en:"Let's…", ru:"Давай…" },
        { en:"I'm free on…", ru:"Я свободен/свободна в…" },
        { en:"Sounds good!", ru:"Звучит отлично!" }
      ],
      grammar: {
        title: "Invitations",
        enRule:`Let's + V. Replies: Sure / Sorry, I can't.`,
        ruRule:`Приглашение: Let's + V. Ответ: Sure / Sorry, I can't.`,
        formula:`Let's + V1 | Do you want to + V1?`
      },
      exercises: [
        { id:"ex1", title:"Matching", type:"match", pairsCount:6 },
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
            { q:"Let's go to the park.", a:"Sure, why not?", opts:["Sure, why not?","I am going now."] },
            { q:"Do you want to go skating?", a:"Sorry, I can't.", opts:["Sorry, I can't.","What time?"] },
            { q:"See you at 6.", a:"Sounds good!", opts:["Sounds good!","I'm free on Monday."] }
          ]
        },
        { id:"ex4", title:"Build a dialogue", type:"build",
          items:[
            { words:["A:","Let's","go","skating","on","Saturday."], a:"A: Let's go skating on Saturday." },
            { words:["B:","Sure,","why","not?","What","time?"], a:"B: Sure, why not? What time?" }
          ]
        }
      ]
    },

    "m1|6": {
      bookPage: 13,
      title: "Module 1 · Lesson 6 — Across Cultures: Free-time",
      vocab: [
        { en:"skateboarding", ru:"скейтбординг" },
        { en:"martial arts", ru:"боевые искусства" },
        { en:"thrilling", ru:"захватывающий" },
        { en:"improve", ru:"улучшать" },
        { en:"balance", ru:"баланс" },
        { en:"concentration", ru:"концентрация" }
      ],
      grammar: {
        title: "Because / so",
        enRule:`Because = reason. So = result.`,
        ruRule:`Because = причина. So = результат.`,
        formula:`I like it because… / It is fun, so…`
      },
      exercises: [
        { id:"ex1", title:"Matching", type:"match", pairsCount:6 },
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
            { words:["I","like","football","because","it","is","fun"], a:"I like football because it is fun." },
            { words:["It","is","rainy,","so","we","stay","home"], a:"It is rainy, so we stay home." },
            { words:["I","train","a","lot,","so","I","improve"], a:"I train a lot, so I improve." }
          ]
        }
      ]
    },

    "m1|7": {
      bookPage: 14,
      title: "Module 1 · Lesson 7 — ICT: To blog or not to blog?",
      vocab: [
        { en:"blog", ru:"блог" },
        { en:"blogger", ru:"блогер" },
        { en:"post", ru:"пост" },
        { en:"online platform", ru:"онлайн платформа" },
        { en:"pros", ru:"плюсы" },
        { en:"cons", ru:"минусы" },
        { en:"share", ru:"делиться" },
        { en:"plan", ru:"планировать" }
      ],
      grammar: {
        title: "Advice: should / shouldn’t",
        enRule:`Use should/shouldn't to give advice.`,
        ruRule:`should/shouldn’t — чтобы давать совет.`,
        formula:`You should + V1 / You shouldn’t + V1`
      },
      exercises: [
        { id:"ex1", title:"Matching", type:"match", pairsCount:6 },
        { id:"ex2", title:"Missing letters", type:"missing",
          items:[
            { q:"pl__tf__rm", a:"platform" },
            { q:"bl__gg__r", a:"blogger" },
            { q:"sh__r__", a:"share" },
            { q:"sh__uld", a:"should" },
            { q:"sh__uldn’t", a:"shouldn’t" }
          ]
        },
        { id:"ex3", title:"Choose should / shouldn’t", type:"choose",
          items:[
            { q:"You ____ plan your posts.", a:"should", opts:["should","shouldn’t"] },
            { q:"You ____ share personal passwords.", a:"shouldn’t", opts:["should","shouldn’t"] },
            { q:"A blogger ____ write clearly.", a:"should", opts:["should","shouldn’t"] },
            { q:"You ____ be rude online.", a:"shouldn’t", opts:["should","shouldn’t"] }
          ]
        },
        { id:"ex4", title:"Build advice", type:"build",
          items:[
            { words:["You","should","write","a","plan"], a:"You should write a plan." },
            { words:["You","shouldn’t","post","private","information"], a:"You shouldn’t post private information." },
            { words:["You","should","share","useful","ideas"], a:"You should share useful ideas." }
          ]
        }
      ]
    },

    "m1|8": {
      bookPage: 15,
      title: "Module 1 · Lesson 8 — Writing: An email about a hobby",
      vocab: [
        { en:"in my free time", ru:"в свободное время" },
        { en:"equipment", ru:"снаряжение" },
        { en:"usually", ru:"обычно" },
        { en:"sometimes", ru:"иногда" },
        { en:"at the weekend", ru:"на выходных" },
        { en:"I enjoy", ru:"мне нравится" }
      ],
      grammar: {
        title: "Linkers: and / but / because",
        enRule:`Use linkers to connect ideas: and, but, because.`,
        ruRule:`Связки: and (и), but (но), because (потому что).`,
        formula:`Sentence + and/but/because + sentence`
      },
      exercises: [
        { id:"ex1", title:"Matching", type:"match", pairsCount:6 },
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
            { words:["I","need","a","camera,","and","I","like","nature."], a:"I need a camera, and I like nature." },
            { words:["I","love","it","because","it","is","relaxing."], a:"I love it because it is relaxing." }
          ]
        }
      ]
    }
  }
};
