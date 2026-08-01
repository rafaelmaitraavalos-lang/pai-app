'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Full reset: wipe every pai_* key AND the server session cookie. The old
// version removed a fixed list of keys, so pai_onboarding_done and the session
// survived and the app bounced straight back to a signed-in home instead of
// the welcome screen.
export default function Reset() {
  const router = useRouter()

  useEffect(() => {
    Object.keys(localStorage)
      .filter(k => k.startsWith('pai_'))
      .forEach(k => localStorage.removeItem(k))
    fetch('/api/auth', { method: 'DELETE' })
      .catch(() => {})
      .finally(() => router.replace('/'))
  }, [router])

  return null
}
