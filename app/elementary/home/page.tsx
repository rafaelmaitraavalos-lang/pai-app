'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ELEMENTARY_WORLDS, ELEMENTARY_WORLD_IDS, ELEMENTARY_WORLD_IDS_PT, MIDDLE_SCHOOL_GRADES_PT } from '../../data/elementary'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

export default function ElementaryHome() {
  const router = useRouter()
  const [done, setDone]         = useState<Record<number, boolean>>({})
  const [isPT, setIsPT]         = useState(false)
  const [username, setUsername] = useState('')
  const [grade, setGrade]       = useState<string | null>(null)
  const [levelingUp, setLevelingUp] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
    setUsername(localStorage.getItem('pai_username') ?? '')
    setGrade(localStorage.getItem('pai_grade'))
    const map: Record<number, boolean> = {}
    Object.values(ELEMENTARY_WORLDS).forEach(w =>
      w.modules.forEach(m => { map[m.id] = localStorage.getItem(`pai_lesson_${m.id}_done`) === 'true' })
    )
    setDone(map)
  }, [])

  const signOut = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    Object.keys(localStorage).filter(k => k.startsWith('pai_')).forEach(k => localStorage.removeItem(k))
    router.replace('/')
  }

  const worldIds = isPT ? ELEMENTARY_WORLD_IDS_PT : ELEMENTARY_WORLD_IDS
  const label     = isPT ? 'Seus Mundos' : 'Your Worlds'
  const startHere = isPT ? 'Começar aqui' : 'Start here'

  // Compute which worlds are fully complete
  const worldDone: Record<number, boolean> = {}
  worldIds.forEach(wid => {
    const w = ELEMENTARY_WORLDS[wid]
    worldDone[wid] = !!w && w.modules.every(m => done[m.id])
  })
  const firstIncomplete = worldIds.find(wid => !worldDone[wid])
  const allWorldsDone   = worldIds.length > 0 && worldIds.every(wid => worldDone[wid])

  // Determine next level grade + route
  // PT: fund1 → fund2 (middle-pt) → medio (high/home)
  // EN: elem → middle → home
  const isPTGrade     = MIDDLE_SCHOOL_GRADES_PT.has(grade ?? '') || (isPT && grade === 'fund1')
  const nextGrade     = isPT ? (grade === 'fund1' ? 'fund2' : 'medio') : (grade === 'elem' ? 'middle' : null)
  const nextRoute     = isPT
    ? (grade === 'fund1' ? '/elementary/middle-pt' : '/home')
    : (nextGrade === 'middle' ? '/middle/home' : '/home')
  const nextLevelName = isPT
    ? (grade === 'fund1' ? 'Ensino Fundamental II' : 'Ensino Médio')
    : (nextGrade === 'middle' ? 'Middle School' : 'High School')

  const levelUp = async () => {
    if (!nextGrade) { router.push('/home'); return }
    setLevelingUp(true)
    const newGrade = nextGrade
    localStorage.setItem('pai_grade', newGrade)
    setGrade(newGrade)
    // Persist to DB
    const username = localStorage.getItem('pai_username')
    if (username) {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, grade: newGrade }),
      }).catch(() => {})
    }
    router.push(nextRoute)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: BODY, display: 'flex', flexDirection: 'column' }}>
      {/* Black PAI header */}
      <div style={{ background: BLACK, padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <button onClick={() => router.push('/elementary/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: DISP, fontSize: 22, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {username && (
            <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: GREEN, opacity: 0.7 }}>{username}</span>
          )}
          <Link href="/about" style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', opacity: 0.4, textDecoration: 'none' }}>
            {isPT ? 'Sobre' : 'About'}
          </Link>
          <button onClick={signOut} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', opacity: 0.4, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            {isPT ? 'Sair' : 'Sign out'}
          </button>
        </div>
      </div>

      <main style={{ maxWidth: 860, width: '100%', margin: '0 auto', padding: '24px 7vw 80px', paddingRight: 'calc(7vw + 12px)' }}>
        {/* All done — level up prompt */}
        {allWorldsDone && (
          <div style={{ background: BLACK, border: `1.5px solid ${GREEN}`, boxShadow: `8px 8px 0 0 ${GREEN}`, padding: '24px 28px', marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: GREEN, marginBottom: 8 }}>
                {isPT ? '🎉 Você terminou tudo!' : '🎉 You finished everything!'}
              </div>
              <div style={{ fontFamily: DISP, fontSize: 22, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: 8 }}>
                {isPT ? `Pronto para o próximo nível?` : `Ready to level up?`}
              </div>
              <div style={{ fontFamily: BODY, fontSize: 14, color: '#aaa', lineHeight: 1.55 }}>
                {isPT
                  ? `Você completou todos os mundos deste nível. Quer passar para o ${nextLevelName}?`
                  : `You've completed every world at this level. Want to move up to ${nextLevelName}?`}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={levelUp}
                disabled={levelingUp}
                style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '13px 28px', border: 'none', cursor: 'pointer', boxShadow: `4px 4px 0 0 ${GREEN}66`, opacity: levelingUp ? 0.6 : 1 }}>
                {levelingUp ? '...' : (isPT ? `Ir para ${nextLevelName} →` : `Move to ${nextLevelName} →`)}
              </button>
              <button
                onClick={() => router.push('/elementary/home')}
                style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', color: '#666', padding: '13px 20px', border: `1px solid #333`, cursor: 'pointer' }}>
                {isPT ? 'Ficar aqui' : 'Stay here'}
              </button>
            </div>
          </div>
        )}

        {/* PAI mascot greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, padding: '0 4px' }}>
          <img src="/pai-mascot.png" alt="PAI" style={{ width: 80, height: 80, objectFit: 'contain', flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: DISP, fontSize: 22, color: BLACK, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              {username ? (isPT ? `Olá, ${username}!` : `Hey, ${username}!`) : (isPT ? 'Olá!' : 'Hey there!')}
            </div>
            <div style={{ fontFamily: BODY, fontSize: 13, color: DIM, marginTop: 4 }}>
              {isPT ? 'Pronto para aprender sobre IA?' : 'Ready to learn about AI?'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>{label}</span>
          <div style={{ flex: 1, borderTop: `1px solid ${FAINT}` }} />
        </div>

        <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {worldIds.map((wid, idx) => {
            const world      = ELEMENTARY_WORLDS[wid]
            const isComplete = worldDone[wid]
            const isActive   = wid === firstIncomplete

            return (
              <div key={wid} onClick={() => router.push(`/elementary/world/${wid}`)}
                style={{ display: 'flex', alignItems: 'center', padding: '15px 16px',
                  background: isComplete ? BLACK : '#EBEBEB',
                  border: `1.5px solid ${BLACK}`, boxShadow: `6px 6px 0 0 ${BLACK}`,
                  cursor: 'pointer', userSelect: 'none' }}>
                <span style={{ fontFamily: BODY, fontSize: 12, color: isComplete ? GREEN : DIM, width: 36, flexShrink: 0 }}>W{String(idx + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: DISP, fontSize: 17, letterSpacing: '-0.01em', flex: 1, color: isComplete ? GREEN : BLACK }}>{world.title}</span>
                {isComplete && (
                  <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: GREEN, marginRight: 14 }}>
                    {isPT ? 'Concluído ✓' : 'Done ✓'}
                  </span>
                )}
                {isActive && !isComplete && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 14 }}>
                    <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 0 3px ${GREEN}44` }} />
                    {startHere}
                  </span>
                )}
                <span style={{ fontFamily: DISP, fontSize: 14, color: isComplete ? GREEN : DIM }}>→</span>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
