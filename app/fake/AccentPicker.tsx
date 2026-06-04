'use client'

import { useState, useEffect } from 'react'

const ACCENTS = [
  { name: 'Cobalt',  hex: '#1B45D7' },
  { name: 'Forest',  hex: '#1F8A3B' },
  { name: 'Mustard', hex: '#E0A526' },
  { name: 'Violet',  hex: '#5B3DF5' },
  { name: 'Rust',    hex: '#C2553D' },
  { name: 'Gray',    hex: '#6B6B6B' },
]

const KEY     = 'fake-accent'
const DEFAULT = '#6B6B6B'

export default function AccentPicker() {
  const [current, setCurrent] = useState(DEFAULT)

  useEffect(() => {
    const saved = localStorage.getItem(KEY) ?? DEFAULT
    setCurrent(saved)
    document.documentElement.style.setProperty('--fake-accent', saved)
  }, [])

  const pick = (hex: string) => {
    setCurrent(hex)
    localStorage.setItem(KEY, hex)
    document.documentElement.style.setProperty('--fake-accent', hex)
  }

  const label = ACCENTS.find(a => a.hex === current)?.name ?? ''

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '6px 32px',
      background: '#F0F0EE',
      borderBottom: '1px solid #DEDEDE',
      fontFamily: 'var(--ff-sans), system-ui',
    }}>
      <span style={{ fontSize: 9, letterSpacing: '0.16em', color: '#999', textTransform: 'uppercase' }}>
        Accent
      </span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {ACCENTS.map(a => (
          <button
            key={a.hex}
            onClick={() => pick(a.hex)}
            title={a.name}
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: a.hex,
              border: current === a.hex ? '2px solid #0A0A0A' : '2px solid transparent',
              outline: current === a.hex ? '1px solid #0A0A0A' : 'none',
              outlineOffset: 1,
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: 10, letterSpacing: '0.12em', color: '#0A0A0A', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  )
}
