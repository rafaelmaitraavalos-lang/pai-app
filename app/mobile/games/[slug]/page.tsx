'use client'

import { useState } from 'react'
import { useParams, useRouter, notFound } from 'next/navigation'
import { GAMES } from '../../../data/games'
import { CATCHER_GAMES } from '../../../data/catcherGames'
import TheAnalyst from '../../../components/TheAnalyst'
import CatcherGame from '../../../components/CatcherGame'
import ConnectionsGame from '../../../components/ConnectionsGame'
import PongGame from '../../../components/PongGame'
import MobileGameComplete from '../../../components/MobileGameComplete'

// ── Analyst round data ────────────────────────────────────────────────────────
import analystRounds    from '../../../data/analystRounds'
import theFeedRounds    from '../../../data/rounds/the-feed'
import theCallRounds    from '../../../data/rounds/the-call'
import theFramework     from '../../../data/rounds/the-framework'
import theResource      from '../../../data/rounds/the-resource'
import theGradient      from '../../../data/rounds/the-gradient'
import shipIt           from '../../../data/rounds/ship-it'
import dispatch         from '../../../data/rounds/dispatch'

// ── Connections puzzle data ───────────────────────────────────────────────────
import staticPuzzle     from '../../../data/puzzles/static'
import failureModes     from '../../../data/puzzles/failure-modes'
import dataTrails       from '../../../data/puzzles/data-trails'
import transparency     from '../../../data/puzzles/transparency'
import whatIsAgi        from '../../../data/puzzles/what-is-agi'
import transformer      from '../../../data/puzzles/transformer'
import agentParts       from '../../../data/puzzles/agent-parts'
import frontier         from '../../../data/puzzles/frontier'

const ANALYST_ROUNDS: Record<string, any> = {
  analyst:         analystRounds,
  'the-feed':      theFeedRounds,
  'the-call':      theCallRounds,
  'the-framework': theFramework,
  'the-resource':  theResource,
  'the-gradient':  theGradient,
  'ship-it':       shipIt,
  dispatch,
}

const PUZZLES: Record<string, any> = {
  static:          staticPuzzle,
  'failure-modes': failureModes,
  'data-trails':   dataTrails,
  transparency,
  'what-is-agi':   whatIsAgi,
  transformer,
  'agent-parts':   agentParts,
  frontier,
}

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'

export default function MobileGameSlug() {
  const { slug } = useParams() as { slug: string }
  const router   = useRouter()
  const [done,   setDone]  = useState(false)
  const [result, setResult] = useState<any>(null)
  const [key,    setKey]   = useState(0)

  const game = GAMES.find(g => g.slug === slug)
  if (!game) return null

  const header = (
    <div style={{ background: BLACK, padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
      <span style={{ fontFamily: DISP, fontSize: 20, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
      <button
        onClick={() => router.push('/mobile/home')}
        style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, padding: '8px 0 8px 16px' }}
      >
        ← Home
      </button>
    </div>
  )

  // ── Connections ─────────────────────────────────────────────────────────────
  if (game.type === 'connections') {
    if (result) return <MobileGameComplete slug={slug} />
    const puzzle = PUZZLES[slug]
    if (!puzzle) return null
    return (
      <div style={{ minHeight: '100%', background: '#f9f6f0', display: 'flex', flexDirection: 'column' }}>
        {header}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 80px' }}>
          <ConnectionsGame key={key} puzzle={puzzle} onComplete={r => setResult(r)} />
        </div>
      </div>
    )
  }

  // ── Interstitial (TheAnalyst) ────────────────────────────────────────────────
  if (game.type === 'interstitial') {
    if (done) return <MobileGameComplete slug={slug} />
    const rounds = ANALYST_ROUNDS[slug]
    if (!rounds) return null
    return (
      <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
        {header}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 80px' }}>
          <TheAnalyst rounds={rounds} onComplete={() => setDone(true)} />
        </div>
      </div>
    )
  }

  // ── Catcher ──────────────────────────────────────────────────────────────────
  if (game.type === 'catcher') {
    if (done) return <MobileGameComplete slug={slug} />

    // signal-drop uses PongGame
    if (slug === 'signal-drop') {
      return (
        <div style={{ height: '100%', minHeight: '100svh', background: BLACK, display: 'flex', flexDirection: 'column' }}>
          {header}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <PongGame onComplete={() => setDone(true)} />
          </div>
        </div>
      )
    }

    const catcherGame = CATCHER_GAMES[slug]
    if (!catcherGame) return null
    return (
      <div style={{ height: '100%', minHeight: '100svh', background: BLACK, display: 'flex', flexDirection: 'column' }}>
        {header}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <CatcherGame game={catcherGame} onComplete={() => setDone(true)} />
        </div>
      </div>
    )
  }

  return null
}
