# PAI — AI Literacy App

A full-stack AI literacy course app built with Next.js 16, React 19, and Tailwind CSS 4. Designed for high school students learning about AI through structured worlds, lessons, and quizzes.

## What's inside

- **5 worlds** of AI literacy content (35+ modules, 280+ slides, 280+ quiz questions)
- **Onboarding flow** that profiles the learner
- **World map** with a Mario-style module path
- **Lesson template** with slide-by-slide reading and True/False quiz
- **XP + level system** tracking progress across all worlds
- **Dev panel** at `/dev` for jumping to any lesson without prerequisites

## Worlds

| World | Topic | Level |
|---|---|---|
| 1 | What is AI? | Beginner |
| 2 | How AI Thinks | Intermediate |
| 3 | AI and Society | Intermediate |
| 4 | AI Ethics | Advanced |
| 5 | The Future of AI | Advanced |

## Getting started

```bash
git clone https://github.com/rafaelmaitraavalos-lang/pai-app.git
cd pai-app
npm install
npm run dev
```

Open http://localhost:3000

## Adding content

All lesson content lives in `app/data/`. To add a new world:

1. Add world metadata to `WORLDS` in `app/data/index.ts`
2. Create `app/data/lessons/wN.ts` with lesson data
3. Import and spread it into `LESSONS` in `app/data/index.ts`

No new page files needed — dynamic routes handle everything automatically.

## Tech stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS 4
- TypeScript

## Dev tools

- `/dev` — jump to any lesson, mark all complete, reset progress
- `/reset` — wipe localStorage and restart from onboarding
