'use client'

import { useEffect, useRef } from 'react'

// iOS Safari needs a video to be muted AT PARSE TIME to allow autoplay, but
// React sets the muted PROPERTY without ever rendering the muted ATTRIBUTE —
// so on real iPhones the autoplay race can fail and Safari paints a ▶ overlay
// on the mascot. This wrapper forces the muted state and retries playback on
// mount, and — because Low Power Mode blocks even muted autoplay until a user
// gesture — also starts playback on the first tap anywhere on the page.
export default function AutoplayVideo(props: React.VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.play().catch(() => {})
    const nudge = () => { v.play().catch(() => {}) }
    document.addEventListener('touchstart', nudge, { once: true, passive: true })
    document.addEventListener('pointerdown', nudge, { once: true })
    return () => {
      document.removeEventListener('touchstart', nudge)
      document.removeEventListener('pointerdown', nudge)
    }
  }, [])

  return <video ref={ref} autoPlay loop muted playsInline {...props} />
}
