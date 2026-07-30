// In-memory search index over the ENTIRE curriculum (all tiers, both languages) so
// PaiChatPanel can pull in relevant slides from other lessons instead of only the
// current one — tailored to the question, not the whole app pasted into the prompt.
import MiniSearch from 'minisearch'

import { WORLDS, WORLD_IDS, LESSONS } from '../app/data/index'
import {
  ELEMENTARY_WORLDS, ELEMENTARY_LESSONS, MIDDLE_SCHOOL_LESSONS,
  ELEMENTARY_WORLD_IDS, ELEMENTARY_WORLD_IDS_PT,
  MIDDLE_SCHOOL_WORLD_IDS, MIDDLE_SCHOOL_WORLD_IDS_PT,
} from '../app/data/elementary'
import TRANSLATIONS from '../app/data/lessonTranslations'

import { STOPS as S1 } from '../app/lesson/1/page'
import { STOPS as S2 } from '../app/lesson/2/page'
import { STOPS as S3 } from '../app/lesson/3/page'
import { STOPS as S4 } from '../app/lesson/4/page'
import { STOPS as S5 } from '../app/lesson/5/page'
import { STOPS as S6 } from '../app/lesson/6/page'
import { STOPS as S7 } from '../app/lesson/7/page'
import { STOPS as S8 } from '../app/lesson/8/page'
import { STOPS as S9 } from '../app/lesson/9/page'
import { STOPS as S10 } from '../app/lesson/10/page'
import { STOPS as S11 } from '../app/lesson/11/page'
import { STOPS as S12 } from '../app/lesson/12/page'
import { STOPS as S13 } from '../app/lesson/13/page'
import { STOPS as S14 } from '../app/lesson/14/page'
import { STOPS as S15 } from '../app/lesson/15/page'

const STATIC_HS: Record<number, { stops: { title: string; body: string }[] }> = {
  1: { stops: S1 }, 2: { stops: S2 }, 3: { stops: S3 }, 4: { stops: S4 }, 5: { stops: S5 },
  6: { stops: S6 }, 7: { stops: S7 }, 8: { stops: S8 }, 9: { stops: S9 }, 10: { stops: S10 },
  11: { stops: S11 }, 12: { stops: S12 }, 13: { stops: S13 }, 14: { stops: S14 }, 15: { stops: S15 },
}

export interface CorpusDoc {
  id:          string   // `${lessonId}.${slideIndex}`
  lessonId:    number
  lessonTitle: string
  slideTitle:  string
  text:        string   // slide body — what actually gets shown to the model
}

function buildDocs(lang: 'en' | 'pt'): CorpusDoc[] {
  const docs: CorpusDoc[] = []

  const pushLesson = (lessonId: number, title: string, stops: { title: string; body: string }[]) => {
    stops.forEach((s, i) => {
      docs.push({
        id: `${lessonId}.${i}`,
        lessonId,
        lessonTitle: title,
        slideTitle:  s.title,
        text:        s.body,
      })
    })
  }

  // High school — lessons 1-15 are static, 16-63 live in LESSONS. PT is an overlay
  // (TRANSLATIONS['pt'][id]) on top of the English base, not a separate lesson set.
  for (const wid of WORLD_IDS) {
    for (const m of WORLDS[wid].modules) {
      if (m.type === 'game') continue
      const base = STATIC_HS[m.id] ?? LESSONS[m.id]
      if (!base) continue
      const overlay = lang === 'pt' ? TRANSLATIONS['pt']?.[m.id] : undefined
      const title = overlay?.title ?? ('title' in base ? (base as { title: string }).title : m.title)
      const stops = overlay?.stops ?? base.stops
      pushLesson(m.id, title, stops)
    }
  }

  // Elementary + middle school — PT already lives as its own fully-translated lesson
  // set (world ids 104-106, 261-265), not an overlay.
  const elemWorldIds = lang === 'pt' ? ELEMENTARY_WORLD_IDS_PT : ELEMENTARY_WORLD_IDS
  const midWorldIds  = lang === 'pt' ? MIDDLE_SCHOOL_WORLD_IDS_PT : MIDDLE_SCHOOL_WORLD_IDS

  for (const wid of [...elemWorldIds, ...midWorldIds]) {
    const world = ELEMENTARY_WORLDS[wid]
    if (!world) continue
    for (const m of world.modules) {
      if (m.type === 'game') continue
      const lesson = ELEMENTARY_LESSONS[m.id] ?? MIDDLE_SCHOOL_LESSONS[m.id]
      if (!lesson) continue
      pushLesson(m.id, lesson.title, lesson.stops)
    }
  }

  return docs
}

const _indexCache: Partial<Record<'en' | 'pt', { docs: CorpusDoc[]; index: MiniSearch<CorpusDoc> }>> = {}

function getIndex(lang: 'en' | 'pt') {
  const cached = _indexCache[lang]
  if (cached) return cached
  const docs = buildDocs(lang)
  const index = new MiniSearch<CorpusDoc>({
    idField: 'id',
    fields: ['slideTitle', 'text'],
    storeFields: ['lessonId', 'lessonTitle', 'slideTitle', 'text'],
    searchOptions: { boost: { slideTitle: 2 }, fuzzy: 0.2, prefix: true },
  })
  index.addAll(docs)
  const entry = { docs, index }
  _indexCache[lang] = entry
  return entry
}

// Top-K slides from the WHOLE curriculum relevant to `query`, excluding the lesson
// the student is currently reading (that context is already sent separately).
export function searchCorpus(query: string, lang: 'en' | 'pt', excludeLessonId: number, k = 4): CorpusDoc[] {
  const { docs, index } = getIndex(lang)
  const hits = index.search(query)
  const byId = new Map(docs.map(d => [d.id, d]))
  const results: CorpusDoc[] = []
  for (const hit of hits) {
    const doc = byId.get(String(hit.id))
    if (!doc || doc.lessonId === excludeLessonId) continue
    results.push(doc)
    if (results.length >= k) break
  }
  return results
}
