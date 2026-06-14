'use client'

import { useEffect, useState } from 'react'
import { WORLDS } from '../data'
import WorldModuleView from '../components/WorldModuleView'

export default function World1Page() {
  const world = WORLDS[1]
  const [isPT, setIsPT] = useState(false)
  useEffect(() => { setIsPT(localStorage.getItem('pai_lang') === 'pt') }, [])
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      {/* Black PAI header */}
      <div style={{ background: '#0a0a0a', padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <a href="/home" style={{ textDecoration: 'none', fontFamily: 'var(--font-display,\'Arial Black\',sans-serif)', fontSize: 22, letterSpacing: '-0.02em', color: '#3DF542', lineHeight: 1 }}>PAI</a>
        <a href="/home" style={{ fontFamily: "var(--font-display,'Arial Black',sans-serif)", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', opacity: 0.6, textDecoration: 'none' }}>{isPT ? '← Início' : '← Home'}</a>
      </div>
      <WorldModuleView world={world} />
    </div>
  )
}
