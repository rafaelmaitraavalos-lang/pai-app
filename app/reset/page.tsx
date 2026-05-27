'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const KEYS = [
  'pai_grade', 'pai_goal', 'pai_level',
  'pai_frequency', 'pai_usage',
  'pai_lesson_1_done', 'pai_onboarding_screen',
]

export default function Reset() {
  const router = useRouter()

  useEffect(() => {
    KEYS.forEach(k => localStorage.removeItem(k))
    router.replace('/')
  }, [router])

  return null
}
