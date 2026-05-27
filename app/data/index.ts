import { Stop, Question } from '../components/LessonTemplate'
import w3 from './lessons/w3'
import w4 from './lessons/w4'
import w5 from './lessons/w5'
import we1 from './lessons/we1'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface WorldModule {
  id: number
  title: string
}

export interface WorldData {
  id: number
  displayId?: number
  title: string
  level: 'Elementary' | 'Beginner' | 'Intermediate' | 'Advanced'
  modules: WorldModule[]
}

export interface LessonData {
  id: number
  worldId: number
  title: string
  stops: Stop[]
  questions: Question[]
}

// ─────────────────────────────────────────────────────────────────────────────
// World metadata
// To add a new world: add an entry here and add its lessons to LESSONS below.
// ─────────────────────────────────────────────────────────────────────────────

export const WORLDS: Record<number, WorldData> = {
  1: {
    id: 1,
    title: 'What is AI?',
    level: 'Beginner',
    modules: [
      { id: 1,  title: 'History of AI' },
      { id: 2,  title: 'What AI Does' },
      { id: 3,  title: 'AI In Your Life' },
      { id: 4,  title: 'Narrow vs General AI' },
      { id: 5,  title: 'How AI Learns' },
      { id: 6,  title: 'What AI Gets Wrong' },
      { id: 7,  title: 'What Is AI?' },
    ],
  },
  2: {
    id: 2,
    title: 'How AI Thinks',
    level: 'Intermediate',
    modules: [
      { id: 8,  title: 'What Is A Neural Network' },
      { id: 9,  title: 'How Networks Train' },
      { id: 10, title: 'Deep Learning' },
      { id: 11, title: 'How ChatGPT Works' },
      { id: 12, title: 'Recommendation Algorithms' },
      { id: 13, title: 'Computer Vision' },
      { id: 14, title: 'The Black Box Problem' },
      { id: 15, title: 'When Decisions Go Wrong' },
    ],
  },
  3: {
    id: 3,
    title: 'AI and Society',
    level: 'Intermediate',
    modules: [
      { id: 16, title: 'AI and Jobs' },
      { id: 17, title: 'AI and Creativity' },
      { id: 18, title: 'AI and Privacy' },
      { id: 19, title: 'AI and Healthcare' },
      { id: 20, title: 'AI and Education' },
      { id: 21, title: 'AI and Democracy' },
      { id: 22, title: 'AI and Science' },
      { id: 23, title: 'AI and Daily Life' },
    ],
  },
  4: {
    id: 4,
    title: 'AI Ethics',
    level: 'Advanced',
    modules: [
      { id: 24, title: 'What Is Ethics' },
      { id: 25, title: 'The Bias Problem' },
      { id: 26, title: 'The Consent Problem' },
      { id: 27, title: 'The Accountability Gap' },
      { id: 28, title: 'The Transparency Paradox' },
      { id: 29, title: 'Autonomy and Manipulation' },
      { id: 30, title: 'The Alignment Problem' },
      { id: 31, title: 'Who Decides' },
    ],
  },
  5: {
    id: 5,
    title: 'The Future of AI',
    level: 'Advanced',
    modules: [
      { id: 32, title: 'Where We Are Now' },
      { id: 33, title: 'The Road to AGI' },
      { id: 34, title: 'The Alignment Crisis' },
      { id: 35, title: 'AI and Existential Risk' },
      { id: 36, title: 'Regulation and Governance' },
      { id: 37, title: 'AI and Human Identity' },
      { id: 38, title: 'What Your Generation Inherits' },
      { id: 39, title: 'What You Do Next' },
    ],
  },
  6: {
    id: 6,
    displayId: 1,
    title: 'Meet AI',
    level: 'Elementary',
    modules: [
      { id: 40, title: 'Hi! I Am PAI' },
    ],
  },
}

// Ordered list for the home screen
export const WORLD_IDS = [1, 2, 3, 4, 5, 6]

// Helper: which world does a lesson belong to?
export function getLessonWorldId(lessonId: number): number {
  for (const world of Object.values(WORLDS)) {
    if (world.modules.some(m => m.id === lessonId)) return world.id
  }
  return 1
}

// ─────────────────────────────────────────────────────────────────────────────
// Lessons for NEW worlds (lessons 24+)
// Lessons 1–23 live in app/lesson/[N]/page.tsx and are handled by static routes.
// Any lesson ID not found here falls back to the static route.
//
// To add a new lesson:
//   1. Add the lesson data object below.
//   2. Add its ID to the matching world's modules list above.
//   Done. No new files needed.
// ─────────────────────────────────────────────────────────────────────────────

export const LESSONS: Record<number, LessonData> = {
  ...w3,
  ...w4,
  ...w5,
  ...we1,

  // ── Add new lessons here ────────────────────────────────────────────────
  // 24: {
  //   id: 24,
  //   worldId: 4,
  //   title: 'Your lesson title',
  //   stops: [
  //     {
  //       tag: 'Fact',          // Myth bust | Fact | Example | Hot take | Scenario | Big idea
  //       title: 'Slide title',
  //       body: 'Slide body text...',
  //       // image: '/images/w4m1/filename.png',  // optional
  //     },
  //     // 7 more slides...
  //   ],
  //   questions: [
  //     {
  //       difficulty: 'Easy',   // Easy | Medium | Hard  (3 Easy, 3 Medium, 2 Hard)
  //       tag: 'Myth bust',
  //       stopTitle: 'Slide title this question relates to',
  //       question: `"The statement in quotes."`,
  //       answer: true,         // true = True button is correct, false = False button is correct
  //       verdict: 'Correct.',  // 'Correct.' | 'Wrong.' | any custom text
  //       explanation: 'Explanation shown after answering...',
  //     },
  //     // 7 more questions...
  //   ],
  // },

}
