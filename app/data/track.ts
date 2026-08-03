// Single source of truth for which track a student — or a piece of content —
// belongs to. The Portuguese bugs of 2026-08-01 came from every page trusting
// whatever URL it was given: browser history from a previous student on the
// same computer could strand a Portuguese middle-schooler inside the English
// elementary track with no way back. Content IDs already encode language and
// level, so both sides of the comparison are derivable.

import { ELEMENTARY_GRADES, MIDDLE_SCHOOL_GRADES, MIDDLE_SCHOOL_GRADES_PT } from './elementary'

export type Track = 'elem-en' | 'elem-pt' | 'middle-en' | 'middle-pt' | 'high'

export function studentTrack(grade: string | null, lang: string | null): Track | null {
  if (!grade) return null
  if (MIDDLE_SCHOOL_GRADES_PT.has(grade)) return 'middle-pt'
  if (ELEMENTARY_GRADES.has(grade)) return grade === 'fund1' || lang === 'pt' ? 'elem-pt' : 'elem-en'
  if (MIDDLE_SCHOOL_GRADES.has(grade)) return 'middle-en'
  return 'high' // 'high', 'medio'
}

export function homeRoute(track: Track | null): string {
  switch (track) {
    case 'elem-en':
    case 'elem-pt':  return '/elementary/home'
    case 'middle-pt': return '/elementary/middle-pt'
    case 'middle-en': return '/middle/home'
    case 'high':      return '/home'
    default:          return '/'
  }
}

// Lesson-id ranges, from app/data/elementary.ts remap() calls:
//   101–128 elementary EN · 131–158 elementary PT · 161–164 abandoned PT draft
//   211–258 middle EN · 311–358 middle PT · 9001+ shared games · rest = high school
export function lessonTrack(id: number): Track | null {
  if (id >= 9001) return null // shared games
  if (id >= 311 && id <= 358) return 'middle-pt'
  if (id >= 211 && id <= 258) return 'middle-en'
  if (id >= 161 && id <= 164) return 'middle-pt'
  if (id >= 131 && id <= 158) return 'elem-pt'
  if (id >= 101 && id <= 128) return 'elem-en'
  return 'high'
}

export function worldTrack(id: number): Track {
  if (id >= 261 && id <= 265) return 'middle-pt'
  if (id >= 201 && id <= 205) return 'middle-en'
  if (id >= 107 && id <= 110) return 'middle-pt'
  if (id >= 104 && id <= 106) return 'elem-pt'
  if (id >= 101 && id <= 103) return 'elem-en'
  return 'high'
}

// Does this content render in Portuguese? (Track is derived from the id, so a
// page styled with this stays self-consistent no matter how it was reached.)
export function isPTTrack(track: Track | null): boolean {
  return track === 'elem-pt' || track === 'middle-pt'
}
