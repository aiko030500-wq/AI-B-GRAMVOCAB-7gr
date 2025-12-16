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
  lessons: [

/* =======================
LESSON 1 — VOCABULARY
======================= */
{
  id: "l1",
  title: "Lesson 1 — Vocabulary: Free-time activities",
  type: "vocabulary",
  tasks: [
    {
      type: "match",
      title: "Match the pictures with the activities",
      items: [
        { q: "dancing", a: "dancing" },
        { q: "cooking", a: "cooking" },
        { q: "vlogging", a: "vlogging" },
        { q: "boxing", a: "boxing" },
        { q: "rock climbing", a: "rock climbing" },
        { q: "windsurfing", a: "windsurfing" },
        { q: "playing video games", a: "playing video games" },
        { q: "yoga", a: "yoga" }
      ]
    },
    {
      type: "choice",
      title: "Use the phrases",
      items: [
        {
          q: "I like yoga because it’s …",
          options: ["dangerous", "relaxing", "boring"],
          a: "relaxing"
        },
        {
          q: "I don’t like boxing because it’s …",
          options: ["exciting", "dangerous", "amazing"],
          a: "dangerous"
        }
      ]
    }
  ]
},

/* =======================
LESSON 2 — READING 1a
======================= */
{
  id: "l2",
  title: "Lesson 2 — Reading 1a: Take up a hobby",
  type: "reading",
  textA: "Jack plays paintball every weekend...",
  textB: "Alex enjoys video games and takes part in tournaments...",
  tasks: [
    {
      type: "truefalse",
      title: "Read and choose True or False",
      items: [
        { q: "Jack plays paintball during the week.", a: false },
        { q: "Paintball can last two days.", a: true },
        { q: "Alex is a popular gamer online.", a: true },
        { q: "Alex hates sport.", a: false }
      ]
    }
  ]
},

/* =======================
LESSON 3 — USE OF ENGLISH 1b
======================= */
{
  id: "l3",
  title: "Lesson 3 — Use of English 1b",
  type: "grammar",
  rules: [
    "Present Simple — habits and routines",
    "Present Continuous — actions now",
    "Comparatives and Superlatives"
  ],
  tasks: [
    {
      type: "fill",
      title: "Complete the gaps",
      items: [
        { q: "John sometimes ___ golf on Sundays.", a: "plays" },
        { q: "Ann ___ a book at the moment.", a: "is reading" }
      ]
    },
    {
      type: "choice",
      title: "Choose the correct form",
      items: [
        {
          q: "This is the ___ shop in the area.",
          options: ["large", "larger", "largest"],
          a: "largest"
        }
      ]
    }
  ]
},

/* =======================
LESSON 4 — SKILLS 1c
======================= */
{
  id: "l4",
  title: "Lesson 4 — Skills 1c: The Home of Horse Riding",
  type: "skills",
  tasks: [
    {
      type: "choice",
      title: "Choose the correct answer",
      items: [
        {
          q: "What is the author’s purpose?",
          options: [
            "to introduce an animal",
            "to describe Kazakhstan",
            "to suggest a sport"
          ],
          a: "to introduce an animal"
        }
      ]
    }
  ]
},

/* =======================
LESSON 5 — EVERYDAY ENGLISH 1d
======================= */
{
  id: "l5",
  title: "Lesson 5 — Everyday English: Making plans",
  type: "speaking",
  tasks: [
    {
      type: "choice",
      title: "Choose the correct reply",
      items: [
        {
          q: "Why don’t you come along?",
          options: ["Sorry, I can’t.", "I play football."],
          a: "Sorry, I can’t."
        }
      ]
    }
  ]
},

/* =======================
LESSON 6 — ACROSS CULTURES 1e
======================= */
{
  id: "l6",
  title: "Lesson 6 — Across Cultures",
  type: "reading",
  tasks: [
    {
      type: "truefalse",
      title: "True / False",
      items: [
        { q: "Skateboarding is popular in Kazakhstan.", a: true },
        { q: "There are no skate parks in Almaty.", a: false }
      ]
    }
  ]
},

/* =======================
LESSON 7 — ACROSS THE CURRICULUM 1f
======================= */
{
  id: "l7",
  title: "Lesson 7 — ICT: Blogging",
  type: "reading",
  tasks: [
    {
      type: "fill",
      title: "Complete the sentences",
      items: [
        { q: "Blogging is a great way to ___ ideas.", a: "share" },
        { q: "Bloggers can make ___ online.", a: "money" }
      ]
    }
  ]
},

/* =======================
LESSON 8 — WRITING 1g
======================= */
{
  id: "l8",
  title: "Lesson 8 — Writing: An email about a hobby",
  type: "writing",
  task: "Write an email (60–80 words) about your hobby."
}

]
};
