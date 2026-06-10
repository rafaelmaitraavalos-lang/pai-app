// Collect all lesson-completion keys from localStorage into a single object
export function collectProgress(): Record<string, boolean> {
  const progress: Record<string, boolean> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith('pai_lesson_') && key.endsWith('_done')) {
      progress[key] = true
    }
  }
  return progress
}

// Write a progress object from the DB back into localStorage
export function applyProgress(progress: Record<string, boolean>) {
  for (const [key, value] of Object.entries(progress)) {
    if (value) localStorage.setItem(key, 'true')
  }
}

// Save current localStorage progress to the server (fire-and-forget)
export function syncProgress() {
  const progress = collectProgress()
  fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ progress }),
  }).catch(() => {})
}

// Load progress from server and apply to localStorage
export async function loadProgress() {
  try {
    const res = await fetch('/api/progress')
    if (!res.ok) return
    const { progress } = await res.json()
    applyProgress(progress)
  } catch {}
}
