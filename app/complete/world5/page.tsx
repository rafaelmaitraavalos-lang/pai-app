'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// ── Particles ─────────────────────────────────────────────────────────────────

const PARTICLES = [
  { left: '8%',  top: '70%', size: 6,  delay: 0,    duration: 4.2, drift: 15  },
  { left: '15%', top: '60%', size: 4,  delay: 0.8,  duration: 3.8, drift: -20 },
  { left: '25%', top: '80%', size: 5,  delay: 0.3,  duration: 4.8, drift: 10  },
  { left: '40%', top: '75%', size: 3,  delay: 1.2,  duration: 3.5, drift: -12 },
  { left: '55%', top: '78%', size: 6,  delay: 0.6,  duration: 4.5, drift: 18  },
  { left: '65%', top: '65%', size: 4,  delay: 1.5,  duration: 4.0, drift: -8  },
  { left: '75%', top: '72%', size: 5,  delay: 0.2,  duration: 4.3, drift: 14  },
  { left: '85%', top: '68%', size: 3,  delay: 1.0,  duration: 3.7, drift: -16 },
  { left: '20%', top: '55%', size: 4,  delay: 2.0,  duration: 4.6, drift: 12  },
  { left: '70%', top: '58%', size: 5,  delay: 1.8,  duration: 3.9, drift: -10 },
  { left: '45%', top: '85%', size: 3,  delay: 0.5,  duration: 4.1, drift: 8   },
  { left: '90%', top: '75%', size: 4,  delay: 1.3,  duration: 4.4, drift: -18 },
]

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `rgba(186, 117, 23, ${0.25 + (i % 3) * 0.1})`,
            ['--drift' as string]: `${p.drift}px`,
            animation: `floatParticle ${p.duration}s ease-in ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

// ── Mascot ────────────────────────────────────────────────────────────────────

function Mascot() {
  return (
    <div style={{ animation: 'paiFloat 3s ease-in-out infinite' }}>
      <div
        className="w-20 h-20 rounded-full relative"
        style={{
          background: 'radial-gradient(circle at 40% 33%, #FFE08A, #D4780A 80%)',
          boxShadow: '0 12px 32px rgba(186,117,23,0.32), 0 0 0 8px rgba(186,117,23,0.08)',
        }}
      >
        <div className="absolute inset-3 rounded-full" style={{ border: '1.5px solid rgba(255,255,255,0.22)', background: 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.18), transparent 65%)' }} />
        <div className="absolute rounded-full" style={{ top: '18%', left: '18%', width: '28%', height: '20%', background: 'rgba(255,255,255,0.38)', filter: 'blur(3px)' }} />
      </div>
    </div>
  )
}

// ── Track cards ───────────────────────────────────────────────────────────────

const TRACKS = [
  {
    world: 6,
    title: 'The Math Behind AI',
    desc: 'Weights, gradients, backpropagation, transformers. The actual mechanics underneath everything you just learned.',
    route: '/world/6',
    available: true,
  },
  {
    world: 7,
    title: 'Build With AI',
    desc: 'Prompts, APIs, agents, fine-tuning. Turn your understanding into something real.',
    route: '/world/7',
    available: false,
  },
  {
    world: 8,
    title: 'The Frontier',
    desc: "What's happening in research labs right now. The cutting edge of a field you now understand deeply.",
    route: '/world/8',
    available: false,
  },
]

// ── Main ──────────────────────────────────────────────────────────────────────

type Stage = 'xp' | 'talking' | 'cards'

export default function World5Complete() {
  const router = useRouter()

  const [stage, setStage] = useState<Stage>('xp')
  const [line, setLine] = useState(0)
  const [cardVisible, setCardVisible] = useState([false, false, false])

  // XP → talking
  useEffect(() => {
    const t = setTimeout(() => setStage('talking'), 2200)
    return () => clearTimeout(t)
  }, [])

  // Animate lines one at a time
  useEffect(() => {
    if (stage !== 'talking') return
    const timers = [
      setTimeout(() => setLine(1), 100),
      setTimeout(() => setLine(2), 1500),
      setTimeout(() => setStage('cards'), 3200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [stage])

  // Stagger cards in
  useEffect(() => {
    if (stage !== 'cards') return
    const timers = [0, 280, 560].map((delay, i) =>
      setTimeout(() => setCardVisible(prev => { const n = [...prev]; n[i] = true; return n }), delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [stage])

  return (
    <div
      className="min-h-screen bg-[#F2EBE0] font-sans flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
      style={{ animation: 'pageIn 0.4s ease-out' }}
    >
      <Particles />

      <div className="relative z-10 flex flex-col items-center w-full max-w-xl gap-8">

        {/* XP burst */}
        <div style={{ animation: 'xpPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both' }}>
          <p className="font-black text-[#BA7517] leading-none tabular-nums text-center" style={{ fontSize: '72px' }}>
            +100
          </p>
          <p className="text-xl font-black text-[#9A5A10] text-center">XP</p>
        </div>

        {/* PAI + speech */}
        <div className="flex flex-col items-center gap-5 text-center">
          <Mascot />

          <div className="space-y-3 min-h-[80px]">
            <p
              className="font-black text-[#3D1A00] leading-snug transition-all duration-500"
              style={{
                fontSize: '20px',
                opacity: line >= 1 ? 1 : 0,
                transform: line >= 1 ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              You just finished the core curriculum.
              <br />
              <span className="text-[#BA7517]">Most people never get this far.</span>
            </p>

            <p
              className="font-black text-[#3D1A00] transition-all duration-500"
              style={{
                fontSize: '22px',
                opacity: line >= 2 ? 1 : 0,
                transform: line >= 2 ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              So. What are you into?
            </p>
          </div>
        </div>

        {/* Track cards */}
        {(stage === 'cards' || cardVisible.some(Boolean)) && (
          <div className="w-full flex flex-col gap-3">
            {TRACKS.map((track, i) => (
              <div
                key={track.world}
                className="transition-all duration-400"
                style={{
                  opacity: cardVisible[i] ? 1 : 0,
                  transform: cardVisible[i] ? 'translateY(0)' : 'translateY(16px)',
                }}
              >
                <div className={`bg-white rounded-2xl border-2 px-6 py-5 flex items-center justify-between gap-4 ${
                  track.available
                    ? 'border-[#DDD0BC] shadow-sm'
                    : 'border-[#E5D4BA] opacity-60'
                }`}>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-[#3D1A00] text-base leading-tight mb-1">
                      {track.title}
                    </p>
                    <p className="text-sm font-medium text-[#9A5A10] leading-snug">
                      {track.desc}
                    </p>
                  </div>

                  {track.available ? (
                    <button
                      onClick={() => router.push(track.route)}
                      className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-[#BA7517] text-white font-black text-sm shadow-[0_4px_0_#7A4A0A] active:shadow-none active:translate-y-1 cursor-pointer hover:bg-[#C8851F] transition-all duration-100 select-none"
                    >
                      Let's go
                    </button>
                  ) : (
                    <span className="flex-shrink-0 px-4 py-2.5 rounded-xl border-2 border-[#DDD0BC] text-[#BBA98C] font-black text-xs select-none">
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Footer note */}
            <p
              className="text-center text-[#9A5A10] font-semibold text-sm mt-2 transition-all duration-500"
              style={{
                opacity: cardVisible[2] ? 1 : 0,
                transitionDelay: '200ms',
              }}
            >
              You can do all of them. Come back whenever.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
