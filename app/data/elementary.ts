import type { WorldData, LessonData } from './index'
import _we1 from './lessons/we1'
import _we5 from './lessons/we5'
import _we6 from './lessons/we6'
import _we1_pt from './lessons/we1_pt'
import _we5_pt from './lessons/we5_pt'
import _we6_pt from './lessons/we6_pt'
import _wms1_pt from './lessons/wms1_pt'
import _wms2_pt from './lessons/wms2_pt'
import _wms3_pt from './lessons/wms3_pt'
import _wms4_pt from './lessons/wms4_pt'

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

// World 104 — Conheça a IA (Brazilian Portuguese, elementary)
const W104_LESSONS = remap(_we1_pt, 131, 104) // 131–134

// World 105 — Como a PAI Pensa — PT (K–2 equivalent)
const W105_LESSONS = remap(_we5_pt, 141, 105) // 141–148

// World 106 — Como a PAI Pensa (Avançado) — PT (3–5 equivalent)
const W106_LESSONS = remap(_we6_pt, 151, 106) // 151–158

// Worlds 107-110 — Ensino Fundamental II (middle school PT)
const W107_LESSONS = remap(_wms1_pt, 161, 107) // 161
const W108_LESSONS = remap(_wms2_pt, 162, 108) // 162
const W109_LESSONS = remap(_wms3_pt, 163, 109) // 163
const W110_LESSONS = remap(_wms4_pt, 164, 110) // 164

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
  104: {
    id: 104,
    title: 'Conheça a IA',
    level: 'Elementary',
    modules: Object.values(W104_LESSONS).map(l => ({ id: l.id, title: l.title })),
  },
  105: {
    id: 105,
    title: 'Como a PAI Pensa',
    level: 'Elementary',
    modules: Object.values(W105_LESSONS).map(l => ({ id: l.id, title: l.title })),
  },
  106: {
    id: 106,
    title: 'Como a PAI Pensa (Avançado)',
    level: 'Elementary',
    modules: Object.values(W106_LESSONS).map(l => ({ id: l.id, title: l.title })),
  },
  107: { id: 107, title: 'O que é a IA?',              level: 'Intermediate', modules: Object.values(W107_LESSONS).map(l => ({ id: l.id, title: l.title })) },
  108: { id: 108, title: 'Como a IA toma decisões',    level: 'Intermediate', modules: Object.values(W108_LESSONS).map(l => ({ id: l.id, title: l.title })) },
  109: { id: 109, title: 'IA e Sociedade',             level: 'Intermediate', modules: Object.values(W109_LESSONS).map(l => ({ id: l.id, title: l.title })) },
  110: { id: 110, title: 'Ética na IA',               level: 'Intermediate', modules: Object.values(W110_LESSONS).map(l => ({ id: l.id, title: l.title })) },
}

export const ELEMENTARY_WORLD_IDS       = [101, 102, 103]
export const ELEMENTARY_WORLD_IDS_PT    = [104, 105, 106]
export const MIDDLE_SCHOOL_WORLD_IDS_PT = [107, 108, 109, 110]

// ── All elementary lessons ────────────────────────────────────────────────────

export const ELEMENTARY_LESSONS: Record<number, LessonData> = {
  ...W101_LESSONS,
  ...W102_LESSONS,
  ...W103_LESSONS,
  ...W104_LESSONS,
  ...W105_LESSONS,
  ...W106_LESSONS,
}

// ── Grade routing helpers ─────────────────────────────────────────────────────

export const ELEMENTARY_GRADES      = new Set(['K', '1st', '2nd', '3rd', '4th', '5th', 'fund1', 'elem'])
export const MIDDLE_SCHOOL_GRADES_PT = new Set(['fund2'])

export function isElementaryGrade(grade: string | null): boolean {
  return ELEMENTARY_GRADES.has(grade ?? '')
}
