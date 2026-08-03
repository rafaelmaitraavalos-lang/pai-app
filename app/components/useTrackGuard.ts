'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { studentTrack, homeRoute, type Track } from '../data/track'
import { applyProgress } from '@/lib/progress'

export type StudentProfile = { grade: string | null; lang: string | null }

// Resolve the signed-in student, healing localStorage from the server session
// if the browser's storage was cleared but the cookie survived (shared school
// computers). Returns null when nobody is signed in.
async function ensureProfile(): Promise<StudentProfile | null> {
  if (localStorage.getItem('pai_onboarding_done') === 'true') {
    return { grade: localStorage.getItem('pai_grade'), lang: localStorage.getItem('pai_lang') }
  }
  try {
    const res = await fetch('/api/auth')
    if (!res.ok) return null  // server hiccup — NEVER destroy the session on an indeterminate answer
    const { user } = await res.json()
    if (user && user.grade) {
      localStorage.setItem('pai_username', user.username)
      localStorage.setItem('pai_onboarding_done', 'true')
      if (user.lang)  localStorage.setItem('pai_lang', user.lang)
      if (user.grade) localStorage.setItem('pai_grade', user.grade)
      applyProgress(user.progress ?? {})
      return { grade: user.grade, lang: user.lang }
    }
    // Definitive "no such session" (or a grade-less interrupted signup):
    // clear the cookie so "/" can show onboarding instead of the middleware
    // bouncing it back to /home forever. Signing in again resumes at the
    // grade step, so nothing is lost.
    await fetch('/api/auth', { method: 'DELETE' })
  } catch {}
  return null
}

// Client-side guard for track-specific pages. Pass the track this page's
// content belongs to (or a predicate over the student). If the signed-in
// student doesn't belong here, they are redirected to THEIR home; if nobody
// is signed in, to onboarding. Returns true once the page may render.
export function useTrackGuard(
  page: Track | ((student: StudentProfile) => boolean),
): boolean {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    let cancelled = false
    ensureProfile().then(student => {
      if (cancelled) return
      if (!student) { router.replace('/'); return }
      const track = studentTrack(student.grade, student.lang)
      const ok = typeof page === 'function' ? page(student) : page === track
      if (!ok) { router.replace(homeRoute(track)); return }
      setAllowed(true)
    })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return allowed
}
