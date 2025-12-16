window.APP_DATA = {
  appTitle: "AI Bayan · Excel 7",

  modules: [
    { id:"m1", title:"Module 1 — Hobbies & Leisure", color:"#ff3b6b", lessonsCount: 8 },
    { id:"m2", title:"Module 2 — Communication & Technology", color:"#2dd4ff", lessonsCount: 8 },
    { id:"m3", title:"Module 3 — Holidays & Travel", color:"#ffb020", lessonsCount: 8 },
    { id:"m4", title:"Module 4 — Space & Earth", color:"#8b5cff", lessonsCount: 8 },
    { id:"m5", title:"Module 5 — Reading for Pleasure", color:"#22c55e", lessonsCount: 8 },
    { id:"m6", title:"Module 6 — Entertainment & Media", color:"#ff5ad6", lessonsCount: 8 },
    { id:"m7", title:"Module 7 — Natural Disasters", color:"#ff4d4d", lessonsCount: 8 },
    { id:"m8", title:"Module 8 — Healthy Habits", color:"#00e0a4", lessonsCount: 8 },
    { id:"m9", title:"Module 9 — Clothes & Fashion", color:"#ffd166", lessonsCount: 8 }
  ],

  lessonContent: {

    /* ================= MODULE 1 ================= */

    "m1|1": {
      title: "Module 1 · Lesson 1 — Free-time activities",
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
      title: "Module 1 · Lesson 2 — Reading: Super Gaming",
      vocab: [
        { en:"concentration", ru:"концентрация" },
        { en:"talented", ru:"талантливый" },
        { en:"tournament", ru:"турнир" },
        { en:"chasing", ru:"преследование" },
        { en:"take part (in)", ru:"участвовать" },
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
        enRule:"Singular vs plural nouns.",
        ruRule:"Единственное и множественное число.",
        formula:"noun + s / es | irregular: child→children"
      },
      exercises: [
        { id:"ex1", title:"Vocabulary · Matching", type:"match", pairsCount:6 },
        { id:"ex2", title:"Vocabulary · Missing letters", type:"missing",
          items:[
            { q:"c__nc__ntr__t__on", a:"concentration" },
            { q:"t__rn__m__nt", a:"tournament" },
            { q:"t__l__nt__d", a:"talented" },
            { q:"__nj__ry", a:"injury" },
            { q:"__xp__ns__v__", a:"expensive" }
          ]
        }
      ]
    },

    "m1|3": {
      title: "Module 1 · Lesson 3 — Comparatives & Superlatives",
      vocab: [
        { en:"fast", ru:"быстрый" },
        { en:"slow", ru:"медленный" },
        { en:"good", ru:"хороший" },
        { en:"bad", ru:"плохой" }
      ],
      grammar: {
        title:"Comparatives & Superlatives",
        enRule:"Compare things.",
        ruRule:"Сравнение.",
        formula:"adj-er / more adj"
      },
      exercises: []
    },

    "m1|4": { title:"Module 1 · Lesson 4 — Skills", vocab:[], grammar:{}, exercises:[] },
    "m1|5": { title:"Module 1 · Lesson 5 — Everyday English", vocab:[], grammar:{}, exercises:[] },
    "m1|6": { title:"Module 1 · Lesson 6 — Across Cultures", vocab:[], grammar:{}, exercises:[] },
    "m1|7": { title:"Module 1 · Lesson 7 — ICT", vocab:[], grammar:{}, exercises:[] },
    "m1|8": { title:"Module 1 · Lesson 8 — Writing", vocab:[], grammar:{}, exercises:[] }

  }
};
