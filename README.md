# Darsa — درسا

A 3D, multilingual learning academy: one campus for every curriculum on Earth.
This repository contains two things:

| Path | What it is |
| --- | --- |
| `web/` | **Darsa** — the React + Three.js learning platform (the main deliverable of this branch) |
| `app/` | the original Android Kotlin/Compose scaffold of the `Ai` app |

---

## Darsa (`web/`)

### What's inside

- **Interactive 3D curriculum globe** — a shader-lit earth (coastline texture generated at
  runtime from Natural Earth data), longitude/latitude hit-testing, country markers, travel
  arcs, drag/inertia rotation, and an SVG fallback when WebGL is unavailable.
- **28 national curricula** — Iran (Konkur), Germany (Abitur), the US (SAT/AP), the UK
  (GCSE/A-Level), France (Bac), India (JEE/CBSE/NEET), China (Gaokao), Japan, Korea
  (Suneung), Türkiye (YKS), Egypt, Saudi Arabia, Brazil (ENEM), Mexico, Nigeria (WAEC),
  Kenya (KCSE), South Africa (Matric), Pakistan, Indonesia (SNBT), Russia (EGE),
  Australia, Canada, Italy, Spain, the Netherlands, Sweden, Morocco — each with its own
  exam names, stage names and a **signature subject only that country teaches**.
- **Curriculum Library** — 46 bilingual lessons and study tips across six stages
  (kindergarten → lifelong), filterable by country, stage, subject and full-text search,
  with worked examples, take-aways, and an interactive check inside every lesson.
- **Exam Studio** — builds a timed mock exam in seconds from a seeded engine:
  country-specific items + a curated concept bank + generated numeric items (arithmetic,
  percentages, quadratics, logs, derivatives, integrals, determinants, …). Includes
  question flags, keyboard shortcuts (1–4, arrows, `f`), a question map, auto-submit,
  per-question review with explanations, XP, and saving to the profile.
- **Study Groups** — create a group, get an invite code, join by code, live XP
  leaderboard, shared group exams, and an activity feed.
- **Accounts & progress** — sign-up / sign-in, country, stage and study language,
  streak, XP, studied lessons, exam history, all persisted in the browser.
- **14 interface languages** with full RTL support — Persian and English are complete;
  Arabic, Turkish, German, French, Spanish, Portuguese, Russian, Hindi, Chinese,
  Japanese, Korean and Indonesian translate the primary surfaces and fall back to
  English elsewhere.

### Run it

```bash
cd web
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in web/dist
npm run preview    # serve the production build
npm run test:logic # exam-engine + curriculum integrity sweep (2,106 exam combos)
npm run test:render# server-render every view to catch runtime errors
```

### Structure

```
web/src
├── App.jsx                 route shell, footer, scroll progress
├── main.jsx                fonts + providers
├── components
│   ├── Globe.jsx           three.js globe, shaders, arcs, SVG fallback
│   ├── Landing.jsx         hero, features, stages, how-it-works, countries, CTA
│   ├── Library.jsx         filters + lesson cards + lesson modal
│   ├── ExamStudio.jsx      builder, timed player, results and review
│   ├── Groups.jsx          create / join / leaderboard / group exams
│   ├── Dashboard.jsx       streak, XP, recommendations, activity
│   ├── AuthModal.jsx       sign-up / sign-in
│   ├── Nav.jsx             navigation, language and country menus
│   └── ui.jsx              icons, modal, rings, toasts, reveal, confetti
├── data
│   ├── countries.js        28 curricula, exam systems, signature subjects
│   ├── curriculum.js       46 lessons + study tips (fa/en)
│   ├── questions.js        curated bilingual question bank
│   └── i18n.js             interface dictionaries (14 locales)
├── lib
│   ├── exam.js             seeded RNG, generators, composer, grading
│   └── store.jsx           reducer store, persistence, auth, groups
└── styles                  design system + view styles
```

### Honest notes

- This is a **front-end concept build**: accounts, groups, progress and exam attempts live
  in `localStorage` (passwords hashed with a non-cryptographic hash). There is no server,
  no email verification, and no real payment or proctoring layer.
- Lesson content is a **curated, hand-written sample** of 46 lessons and 27 national
  specialities — enough to demonstrate the model per country, not a complete textbook
  for every syllabus.
- Exam questions are curated (bilingual) plus algorithmically generated numbers; the exam
  format labels describe the real national tests, while the item bank is demo data.
- Curriculum-specific claims (exam names, stage structure, signature subjects) follow the
  real systems as of 2026, but national syllabi change — always verify against the
  official exam board.

---

## Android scaffold (`app/`)

The original Kotlin/Jetpack Compose app is untouched.

- AI Chat / AI Coder UI scaffolds, file and ZIP export, GitHub App OAuth with PKCE and
  state validation, Android deep-link callback and a GitHub Pages callback bridge.
- Build via `.github/workflows/build-apk.yml` (requires the `GITHUB_CLIENT_SECRET`
  Actions secret) or locally with `local.properties`.
- An APK is a public client: a secret embedded in it cannot be confidential. PKCE and
  state validation are enabled, but production hardening belongs on a backend.

## Next milestones

1. Move accounts, groups and grading to a real backend with per-country content review.
2. Localise lesson bodies into all 14 interface languages.
3. Teacher dashboards, assignment codes and group analytics.
4. Add offline packs and audio narration for accessibility.
