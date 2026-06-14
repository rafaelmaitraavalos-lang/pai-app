'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GAMES, GAME_TITLES_PT } from '../data/games'
import { WORLDS, WORLD_IDS, WORLD_TITLES_PT } from '../data'
import { isElementaryGrade, isMiddleSchoolGrade, MIDDLE_SCHOOL_GRADES_PT } from '../data/elementary'
import TRANSLATIONS from '../data/lessonTranslations'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

interface Props { slug: string }

export default function GameComplete({ slug }: Props) {
  const router = useRouter()
  const [isPT,      setIsPT]      = useState(false)
  const [isElemMid, setIsElemMid] = useState(false)
  const [homeRoute, setHomeRoute] = useState('/home')
  useEffect(() => {
    const lang  = localStorage.getItem('pai_lang') ?? 'en'
    const grade = localStorage.getItem('pai_grade')
    setIsPT(lang === 'pt')
    const elem = isElementaryGrade(grade)
    const mid  = isMiddleSchoolGrade(grade) || MIDDLE_SCHOOL_GRADES_PT.has(grade ?? '')
    setIsElemMid(elem || mid)
    if (elem) setHomeRoute('/elementary/home')
    else if (MIDDLE_SCHOOL_GRADES_PT.has(grade ?? '')) setHomeRoute('/elementary/middle-pt')
    else if (mid) setHomeRoute('/middle/home')
  }, [])

  const game = GAMES.find(g => g.slug === slug)
  if (!game) return null

  const world        = WORLDS[game.world]
  // Find this game in the modules list, then take the first non-game module after it
  const gameIdx      = world?.modules.findIndex(m => m.type === 'game' && m.gameUrl?.includes(game.slug)) ?? -1
  // For elementary/middle students, don't show next HS lesson — just show home
  const nextMod      = !isElemMid && gameIdx >= 0 ? world?.modules.slice(gameIdx + 1).find(m => m.type !== 'game') : undefined
  const worldRoute   = isElemMid ? homeRoute : (game.world === 1 ? '/lessons' : `/world/${game.world}`)
  const nextWorldIdx = WORLD_IDS.indexOf(game.world) + 1
  const nextWorldId  = !nextMod && !isElemMid && nextWorldIdx < WORLD_IDS.length ? WORLD_IDS[nextWorldIdx] : null

  const gameTitle    = (isPT && GAME_TITLES_PT[game.slug]) || game.title
  const worldTitle   = isElemMid ? (isPT ? 'Início' : 'Home') : ((isPT && WORLD_TITLES_PT[game.world]) || world?.title || (isPT ? 'Mundo' : 'World'))
  const nextModTitle = nextMod ? ((isPT && TRANSLATIONS['pt']?.[nextMod.id]?.title) || nextMod.title) : ''
  const nextWorldTitle = nextWorldId
    ? ((isPT && WORLD_TITLES_PT[nextWorldId]) || WORLDS[nextWorldId]?.title)
    : ''

  return (
    <main style={{ height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div style={{ width: '100%', maxWidth: 480, padding: '0 7vw', textAlign: 'center' }}>
        <div style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, marginBottom: 16 }}>
          {isPT ? 'Jogo concluído' : 'Game complete'}
        </div>
        <div style={{ animation: 'xpPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}>
          <p style={{ fontFamily: DISP, fontSize: 80, lineHeight: 1, color: BLACK, margin: 0, letterSpacing: '-0.03em' }}>+100</p>
          <p style={{ fontFamily: DISP, fontSize: 20, color: DIM, margin: '4px 0 0', letterSpacing: '0.06em' }}>XP</p>
        </div>
        <h1 style={{ fontFamily: DISP, fontSize: 36, letterSpacing: '-0.02em', color: BLACK, margin: '28px 0 8px', fontWeight: 400 }}>{gameTitle}</h1>
        <div style={{ borderTop: `1px solid ${FAINT}`, marginBottom: 24 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {nextMod && (
            <button
              onClick={() => router.push(`/lesson/${nextMod.id}`)}
              style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 28px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: '4px 4px 0 0 #555' }}
            >
              {isPT ? 'Próximo:' : 'Next:'} {nextModTitle} →
            </button>
          )}
          {!nextMod && nextWorldId && (
            <button
              onClick={() => router.push(`/world/${nextWorldId}`)}
              style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 28px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: '4px 4px 0 0 #555' }}
            >
              {isPT ? 'Próximo Mundo:' : 'Next World:'} {nextWorldTitle} →
            </button>
          )}
          <button
            onClick={() => router.push(worldRoute)}
            style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', color: DIM, padding: '10px 28px', border: `1.5px solid ${FAINT}`, cursor: 'pointer' }}
          >
            {isPT ? 'Voltar para' : 'Back to'} {worldTitle}
          </button>
        </div>
      </div>
    </main>
  )
}
