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
import _wm_w1 from './lessons/wm_w1'
import _wm_w2 from './lessons/wm_w2'
import _wm_w3 from './lessons/wm_w3'
import _wm_w4 from './lessons/wm_w4'
import _wm_w5 from './lessons/wm_w5'
import _wm_w1_pt from './lessons/wm_w1_pt'
import _wm_w2_pt from './lessons/wm_w2_pt'
import _wm_w3_pt from './lessons/wm_w3_pt'
import _wm_w4_pt from './lessons/wm_w4_pt'
import _wm_w5_pt from './lessons/wm_w5_pt'

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

// Worlds 201-205 — Middle School English AI Curriculum (5 worlds × 8 modules)
const W201_LESSONS = _wm_w1  // module IDs 211-218
const W202_LESSONS = _wm_w2  // module IDs 221-228
const W203_LESSONS = _wm_w3  // module IDs 231-238
const W204_LESSONS = _wm_w4  // module IDs 241-248
const W205_LESSONS = _wm_w5  // module IDs 251-258

// Worlds 261-265 — Middle School PT AI Curriculum (5 worlds × 8 modules)
const W261_LESSONS = _wm_w1_pt  // module IDs 311-318
const W262_LESSONS = _wm_w2_pt  // module IDs 321-328
const W263_LESSONS = _wm_w3_pt  // module IDs 331-338
const W264_LESSONS = _wm_w4_pt  // module IDs 341-348
const W265_LESSONS = _wm_w5_pt  // module IDs 351-358

// ── Shared game modules appended after lessons ────────────────────────────────

const GAMES = [
  { id: 9001, title: 'Signal Drop',   type: 'game' as const, gameUrl: '/games/signal-drop' },
  { id: 9003, title: 'Fix the Robot', type: 'game' as const, gameUrl: '/games/fix-the-robot' },
  { id: 9004, title: 'Build-a-Robot', type: 'game' as const, gameUrl: '/games/build-a-robot' },
]

const GAMES_PT = [
  { id: 9001, title: 'Queda de Sinal',  type: 'game' as const, gameUrl: '/games/signal-drop' },
  { id: 9003, title: 'Conserte o Robô', type: 'game' as const, gameUrl: '/games/fix-the-robot' },
  { id: 9004, title: 'Monte um Robô',   type: 'game' as const, gameUrl: '/games/build-a-robot' },
]

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
  // Middle School English — 5 Worlds × 8 Modules
  201: { id: 201, title: 'What Is AI?',              level: 'Intermediate', modules: [...Object.values(W201_LESSONS).map(l => ({ id: l.id, title: l.title })), ...GAMES] },
  202: { id: 202, title: 'How AI Makes Decisions',   level: 'Intermediate', modules: [...Object.values(W202_LESSONS).map(l => ({ id: l.id, title: l.title })), ...GAMES] },
  203: { id: 203, title: 'AI and Society',           level: 'Intermediate', modules: [...Object.values(W203_LESSONS).map(l => ({ id: l.id, title: l.title })), ...GAMES] },
  204: { id: 204, title: 'AI Ethics',                level: 'Intermediate', modules: [...Object.values(W204_LESSONS).map(l => ({ id: l.id, title: l.title })), ...GAMES] },
  205: { id: 205, title: 'The Future of AI',         level: 'Intermediate', modules: [...Object.values(W205_LESSONS).map(l => ({ id: l.id, title: l.title })), ...GAMES] },
  // Middle School PT — 5 Worlds × 8 Modules
  261: { id: 261, title: 'O Que É a IA?',            level: 'Intermediate', modules: [...Object.values(W261_LESSONS).map(l => ({ id: l.id, title: l.title })), ...GAMES_PT] },
  262: { id: 262, title: 'Como a IA Toma Decisões',  level: 'Intermediate', modules: [...Object.values(W262_LESSONS).map(l => ({ id: l.id, title: l.title })), ...GAMES_PT] },
  263: { id: 263, title: 'IA e Sociedade',            level: 'Intermediate', modules: [...Object.values(W263_LESSONS).map(l => ({ id: l.id, title: l.title })), ...GAMES_PT] },
  264: { id: 264, title: 'Ética na IA',              level: 'Intermediate', modules: [...Object.values(W264_LESSONS).map(l => ({ id: l.id, title: l.title })), ...GAMES_PT] },
  265: { id: 265, title: 'O Futuro da IA',           level: 'Intermediate', modules: [...Object.values(W265_LESSONS).map(l => ({ id: l.id, title: l.title })), ...GAMES_PT] },
}

export const ELEMENTARY_WORLD_IDS       = [101, 102, 103]
export const ELEMENTARY_WORLD_IDS_PT    = [104, 105, 106]
export const MIDDLE_SCHOOL_WORLD_IDS_PT = [261, 262, 263, 264, 265]
export const MIDDLE_SCHOOL_WORLD_IDS    = [201, 202, 203, 204, 205]

// ── All elementary lessons ────────────────────────────────────────────────────

export const ELEMENTARY_LESSONS: Record<number, LessonData> = {
  ...W101_LESSONS,
  ...W102_LESSONS,
  ...W103_LESSONS,
  ...W104_LESSONS,
  ...W105_LESSONS,
  ...W106_LESSONS,
}

export const MIDDLE_SCHOOL_LESSONS: Record<number, LessonData> = {
  ...W201_LESSONS,
  ...W202_LESSONS,
  ...W203_LESSONS,
  ...W204_LESSONS,
  ...W205_LESSONS,
  ...W261_LESSONS,
  ...W262_LESSONS,
  ...W263_LESSONS,
  ...W264_LESSONS,
  ...W265_LESSONS,
}

// ── Grade routing helpers ─────────────────────────────────────────────────────

export const ELEMENTARY_GRADES       = new Set(['K', '1st', '2nd', '3rd', '4th', '5th', 'fund1', 'elem'])
export const MIDDLE_SCHOOL_GRADES_PT = new Set(['fund2'])
export const MIDDLE_SCHOOL_GRADES    = new Set(['middle'])

export function isElementaryGrade(grade: string | null): boolean {
  return ELEMENTARY_GRADES.has(grade ?? '')
}

export function isMiddleSchoolGrade(grade: string | null): boolean {
  return MIDDLE_SCHOOL_GRADES.has(grade ?? '')
}
