'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GAMES, GAME_TITLES_PT } from '../data/games'
import { WORLDS, WORLD_IDS, WORLD_TITLES_PT } from '../data'
import { isElementaryGrade, isMiddleSchoolGrade, MIDDLE_SCHOOL_GRADES_PT,
         ELEMENTARY_WORLDS, ELEMENTARY_WORLD_IDS, ELEMENTARY_WORLD_IDS_PT } from '../data/elementary'
import TRANSLATIONS from '../data/lessonTranslations'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

interface Props { slug: string }

export default function GameComplete({ slug }: Props) {
  const router = useRouter()
  const [isPT,   setIsPT]   = useState(false)
  const [grade,  setGrade]  = useState<string | null>(null)
  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
    setGrade(localStorage.getItem('pai_grade'))
  }, [])

  const game = GAMES.find(g => g.slug === slug)
  if (!game) return null

  const isElem = isElementaryGrade(grade)
  const isMid  = isMiddleSchoolGrade(grade) || MIDDLE_SCHOOL_GRADES_PT.has(grade ?? '')
  const isPT_elem = ELEMENTARY_WORLD_IDS_PT.length > 0 && grade === 'fund1'

  // For HS: find game in WORLDS modules, get next lesson
  const hsWorld    = WORLDS[game.world]
  const hsGameIdx  = hsWorld?.modules.findIndex(m => m.type === 'game' && m.gameUrl?.includes(game.slug)) ?? -1
  const hsNextMod  = hsGameIdx >= 0 ? hsWorld?.modules.slice(hsGameIdx + 1).find(m => m.type !== 'game') : undefined

  // For elementary: find which elementary world has this game, get next lesson or next world
  const elemWorldIds = isPT_elem ? ELEMENTARY_WORLD_IDS_PT : ELEMENTARY_WORLD_IDS
  const elemWorld    = isElem ? Object.values(ELEMENTARY_WORLDS).find(w =>
    elemWorldIds.includes(w.id) && w.modules.some(m => m.type === 'game' && m.gameUrl?.includes(game.slug))
  ) : undefined
  const elemGameIdx  = elemWorld?.modules.findIndex(m => m.type === 'game' && m.gameUrl?.includes(game.slug)) ?? -1
  const elemNextMod  = elemGameIdx >= 0 ? elemWorld?.modules.slice(elemGameIdx + 1).find(m => m.type !== 'game') : undefined
  const nextElemWorldId = !elemNextMod && elemWorld
    ? elemWorldIds[elemWorldIds.indexOf(elemWorld.id) + 1]
    : undefined

  // Pick the right values based on grade
  const nextMod   = isElem ? elemNextMod : (isMid ? undefined : hsNextMod)
  const worldRoute = isElem
    ? (elemWorld ? `/elementary/world/${elemWorld.id}` : '/elementary/home')
    : isMid
      ? (MIDDLE_SCHOOL_GRADES_PT.has(grade ?? '') ? '/elementary/middle-pt' : '/middle/home')
      : (game.world === 1 ? '/lessons' : `/world/${game.world}`)

  const hsNextWorldIdx = WORLD_IDS.indexOf(game.world) + 1
  const nextWorldId    = !nextMod && !isElem && !isMid && hsNextWorldIdx < WORLD_IDS.length
    ? WORLD_IDS[hsNextWorldIdx] : null

  const gameTitle      = (isPT && GAME_TITLES_PT[game.slug]) || game.title
  const backLabel      = isElem ? (elemWorld?.title ?? (isPT ? 'Mundo' : 'World')) : isMid ? (isPT ? 'Início' : 'Home') : ((isPT && WORLD_TITLES_PT[game.world]) || hsWorld?.title || (isPT ? 'Mundo' : 'World'))
  const nextModTitle   = nextMod ? ((isPT && TRANSLATIONS['pt']?.[nextMod.id]?.title) || nextMod.title) : ''
  const nextWorldTitle = nextWorldId ? ((isPT && WORLD_TITLES_PT[nextWorldId]) || WORLDS[nextWorldId]?.title)
    : nextElemWorldId  ? (ELEMENTARY_WORLDS[nextElemWorldId]?.title ?? '')
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
              onClick={() => router.push(isElem ? `/elementary/lesson/${nextMod.id}` : `/lesson/${nextMod.id}`)}
              style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 28px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: '4px 4px 0 0 #555' }}
            >
              {isPT ? 'Próximo:' : 'Next:'} {nextModTitle} →
            </button>
          )}
          {!nextMod && (nextWorldId || nextElemWorldId) && (
            <button
              onClick={() => router.push(nextElemWorldId ? `/elementary/world/${nextElemWorldId}` : `/world/${nextWorldId}`)}
              style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 28px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: '4px 4px 0 0 #555' }}
            >
              {isPT ? 'Próximo Mundo:' : 'Next World:'} {nextWorldTitle} →
            </button>
          )}
          <button
            onClick={() => router.push(worldRoute)}
            style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', color: DIM, padding: '10px 28px', border: `1.5px solid ${FAINT}`, cursor: 'pointer' }}
          >
            {isPT ? 'Voltar para' : 'Back to'} {backLabel}
          </button>
        </div>
      </div>
    </main>
  )
}
