import { Stop, Question } from '../components/LessonTemplate'
import w3 from './lessons/w3'
import w4 from './lessons/w4'
import w5 from './lessons/w5'
import w6 from './lessons/w6'
import w7 from './lessons/w7'
import w8 from './lessons/w8'
export { ELEMENTARY_WORLDS, ELEMENTARY_LESSONS } from './elementary'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface WorldModule {
  id: number
  title: string
  type?: 'lesson' | 'game'
  gameUrl?: string
}

export interface WorldData {
  id: number
  title: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elementary'
  modules: WorldModule[]
}

export interface LessonData {
  id: number
  worldId: number
  title: string
  stops: Stop[]
  questions: Question[]
  completionPage?: string  // custom route shown instead of the default completion screen
}

// ─────────────────────────────────────────────────────────────────────────────
// World metadata
// To add a new world: add an entry here and add its lessons to LESSONS below.
// ─────────────────────────────────────────────────────────────────────────────

const G = (title: string, gameUrl: string) => ({ id: 0, title, type: 'game' as const, gameUrl })

export const WORLDS: Record<number, WorldData> = {
  1: {
    id: 1,
    title: 'What is AI?',
    level: 'Beginner',
    modules: [
      { id: 1,  title: 'History of AI' },
      G('The Analyst',   '/games/analyst'),
      { id: 2,  title: 'What AI Does' },
      { id: 3,  title: 'AI In Your Life' },
      G('Signal Drop',   '/games/signal-drop'),
      { id: 4,  title: 'Narrow vs General AI' },
      { id: 5,  title: 'How AI Learns' },
      { id: 6,  title: 'What AI Gets Wrong' },
      G('Static',        '/games/static'),
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
      G('Weight Room',   '/games/weight-room'),
      { id: 10, title: 'Deep Learning' },
      { id: 11, title: 'How ChatGPT Works' },
      { id: 12, title: 'Recommendation Algorithms' },
      G('The Feed',      '/games/the-feed'),
      { id: 13, title: 'Computer Vision' },
      { id: 14, title: 'The Black Box Problem' },
      { id: 15, title: 'When Decisions Go Wrong' },
      G('Failure Modes', '/games/failure-modes'),
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
      G('Data Trails',   '/games/data-trails'),
      { id: 19, title: 'AI and Healthcare' },
      { id: 20, title: 'AI and Education' },
      G('The Call',      '/games/the-call'),
      { id: 21, title: 'AI and Democracy' },
      { id: 22, title: 'AI and Science' },
      { id: 23, title: 'AI and Daily Life' },
      G('Daily Scan',    '/games/daily-scan'),
    ],
  },
  4: {
    id: 4,
    title: 'AI Ethics',
    level: 'Advanced',
    modules: [
      { id: 24, title: 'What Is Ethics' },
      G('The Framework', '/games/the-framework'),
      { id: 25, title: 'The Bias Problem' },
      G('Bias Sources',  '/games/bias-sources'),
      { id: 26, title: 'The Consent Problem' },
      { id: 27, title: 'The Accountability Gap' },
      { id: 28, title: 'The Transparency Paradox' },
      G('Transparency Types', '/games/transparency'),
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
      G("Can or Can't",  '/games/can-or-cant'),
      { id: 33, title: 'The Road to AGI' },
      G('What Is AGI',   '/games/what-is-agi'),
      { id: 34, title: 'The Alignment Crisis' },
      { id: 35, title: 'AI and Existential Risk' },
      G('The Resource',  '/games/the-resource'),
      { id: 36, title: 'Regulation and Governance' },
      { id: 37, title: 'AI and Human Identity' },
      { id: 38, title: 'What Your Generation Inherits' },
      { id: 39, title: 'What You Do Next' },
    ],
  },
  6: {
    id: 6,
    title: 'How Neural Networks Work',
    level: 'Advanced',
    modules: [
      { id: 40, title: 'The Math Behind A Neuron' },
      { id: 41, title: 'Forward Propagation' },
      G('Signal Flow',   '/games/signal-flow'),
      { id: 42, title: 'Loss Functions' },
      { id: 43, title: 'Backpropagation In Detail' },
      G('The Gradient',  '/games/the-gradient'),
      { id: 44, title: 'Activation Functions' },
      { id: 45, title: 'Attention Mechanisms' },
      { id: 46, title: 'The Transformer Architecture' },
      G('Transformer Parts', '/games/transformer'),
      { id: 47, title: 'Training At Scale' },
    ],
  },
  7: {
    id: 7,
    title: 'Build With AI',
    level: 'Advanced',
    modules: [
      { id: 48, title: 'How To Think About Prompts' },
      { id: 49, title: 'Prompt Engineering' },
      G('Prompt Drop',   '/games/prompt-drop'),
      { id: 50, title: 'Working With APIs' },
      { id: 51, title: 'Retrieval Augmented Generation' },
      { id: 52, title: 'Fine-Tuning' },
      { id: 53, title: 'AI Agents' },
      G('Agent Parts',   '/games/agent-parts'),
      { id: 54, title: 'Evaluating AI Systems' },
      { id: 55, title: 'Responsible Building' },
      G('Ship It',       '/games/ship-it'),
    ],
  },
  8: {
    id: 8,
    title: 'The Frontier',
    level: 'Advanced',
    modules: [
      { id: 56, title: 'Multimodal AI' },
      G('Multimodal',    '/games/multimodal'),
      { id: 57, title: 'AI Agents At Scale' },
      { id: 58, title: 'Frontier Models' },
      G('Frontier Concepts', '/games/frontier'),
      { id: 59, title: 'AI and Science' },
      { id: 60, title: 'Robotics and Embodied AI' },
      { id: 61, title: 'AI Safety Research' },
      { id: 62, title: 'The Geopolitics Of AI' },
      G('Dispatch',      '/games/dispatch'),
      { id: 63, title: 'What Comes Next' },
    ],
  },
}

// Ordered list for the home screen
export const WORLD_IDS = [1, 2, 3, 4, 5, 6, 7, 8]

// PT-BR world title translations
export const WORLD_TITLES_PT: Record<number, string> = {
  1: 'O que é IA?',
  2: 'Como a IA Pensa',
  3: 'IA e Sociedade',
  4: 'Ética na IA',
  5: 'O Futuro da IA',
  6: 'Como as Redes Neurais Funcionam',
  7: 'Construindo com IA',
  8: 'A Fronteira',
}

export function getWorldTitle(id: number, lang: string): string {
  if (lang === 'pt' && WORLD_TITLES_PT[id]) return WORLD_TITLES_PT[id]
  return WORLDS[id]?.title ?? ''
}

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
  ...w6,
  ...w7,
  ...w8,

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
