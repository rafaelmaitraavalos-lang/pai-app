import type { WorldData, LessonData } from './index'
import _we1 from './lessons/we1'
import _we5 from './lessons/we5'
import _we6 from './lessons/we6'

// ── Remap sister's lesson IDs to 100+ to avoid clashing with high-school lessons ──

function remap(src: Record<number, LessonData>, idOffset: number, worldId: number): Record<number, LessonData> {
  const out: Record<number, LessonData> = {}
  Object.values(src).forEach((lesson, i) => {
    const newId = idOffset + i
    out[newId] = { ...lesson, id: newId, worldId }
  })
  return out
}

// World 101 — Meet AI (grades K–5, introductory)
const W101_LESSONS = remap(_we1, 101, 101)   // 101–104

// World 102 — How PAI Thinks K–2 (simpler questions)
const W102_LESSONS = remap(_we5, 111, 102)   // 111–118

// World 103 — How PAI Thinks 3–5 (slightly harder questions)
const W103_LESSONS = remap(_we6, 121, 103)   // 121–128

// ── Elementary world definitions ──────────────────────────────────────────────

export const ELEMENTARY_WORLDS: Record<number, WorldData> = {
  101: {
    id: 101,
    title: 'Meet AI',
    level: 'Elementary',
    modules: Object.values(W101_LESSONS).map(l => ({ id: l.id, title: l.title })),
  },
  102: {
    id: 102,
    title: 'How PAI Thinks',
    level: 'Elementary',
    modules: Object.values(W102_LESSONS).map(l => ({ id: l.id, title: l.title })),
  },
  103: {
    id: 103,
    title: 'How PAI Thinks (Advanced)',
    level: 'Elementary',
    modules: Object.values(W103_LESSONS).map(l => ({ id: l.id, title: l.title })),
  },
}

export const ELEMENTARY_WORLD_IDS = [101, 102, 103]

// ── All elementary lessons ────────────────────────────────────────────────────

export const ELEMENTARY_LESSONS: Record<number, LessonData> = {
  ...W101_LESSONS,
  ...W102_LESSONS,
  ...W103_LESSONS,
}

// ── Grade routing helpers ─────────────────────────────────────────────────────

export const ELEMENTARY_GRADES = new Set(['K', '1st', '2nd', '3rd', '4th', '5th'])

export function isElementaryGrade(grade: string | null): boolean {
  return ELEMENTARY_GRADES.has(grade ?? '')
}
