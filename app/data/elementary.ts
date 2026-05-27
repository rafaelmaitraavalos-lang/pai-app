// ============================================================
// ELEMENTARY SCHOOL CONTENT
// ============================================================
// This file is yours to edit freely.
// Add worlds, modules, slides, and quiz questions here.
// The format is the same as the high school content —
// see app/data/index.ts for the types and examples.
//
// To add a new world:
//   1. Add an entry to ELEMENTARY_WORLDS below
//   2. Add matching lesson entries to ELEMENTARY_LESSONS
//   3. Save the file — it goes live automatically
// ============================================================

import type { WorldData, LessonData } from './index'

// ── World definitions ─────────────────────────────────────────

export const ELEMENTARY_WORLDS: Record<number, WorldData> = {

  // Example — replace with your real content:
  // 101: {
  //   id: 101,
  //   title: 'What Is A Computer?',
  //   level: 'Beginner',
  //   modules: [
  //     { id: 1001, title: 'Computers Are Everywhere' },
  //     { id: 1002, title: 'How Computers Think' },
  //     ...
  //   ],
  // },

}

// ── Lesson content ────────────────────────────────────────────

export const ELEMENTARY_LESSONS: Record<number, LessonData> = {

  // Example lesson — replace with your real content:
  // 1001: {
  //   id: 1001,
  //   worldId: 101,
  //   title: 'Computers Are Everywhere',
  //   stops: [
  //     {
  //       tag: 'Fact',           // Fact | Example | Hot take | Scenario | Big idea | Myth bust
  //       title: 'Slide title',
  //       body: 'Slide text goes here. Keep it short and clear for younger readers.',
  //       // image: '/images/elementary/filename.png',  // optional
  //     },
  //     // ... 7 more slides
  //   ],
  //   questions: [
  //     {
  //       difficulty: 'Easy',    // Easy | Medium | Hard
  //       tag: 'Fact',
  //       stopTitle: 'Slide title this question is about',
  //       question: `"The statement students are judging true or false."`,
  //       answer: true,          // true = True button is correct
  //       verdict: 'Correct.',
  //       explanation: 'Why the answer is right, explained simply.',
  //     },
  //     // ... 7 more questions
  //   ],
  // },

}
