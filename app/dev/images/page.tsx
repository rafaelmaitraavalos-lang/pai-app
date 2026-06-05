'use client'

import { useState, useEffect, useCallback } from 'react'
import { WORLDS, WORLD_IDS, LESSONS } from '../../data'
import { getSlideTitles } from '../../data/slideIndex'

// ── Types ─────────────────────────────────────────────────────────────────────

interface WikiImg {
  title: string
  url:   string
  thumb: string
}

// ── Wikimedia Commons search ──────────────────────────────────────────────────

async function searchWikimedia(query: string, limit = 5): Promise<WikiImg[]> {
  const params = new URLSearchParams({
    action:       'query',
    generator:    'search',
    gsrsearch:    query,
    gsrnamespace: '6',
    gsrlimit:     String(limit),
    prop:         'imageinfo',
    iiprop:       'url',
    iiurlwidth:   '500',
    format:       'json',
    origin:       '*',
  })
  try {
    const res  = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`)
    const data = await res.json()
    const pages = Object.values(data?.query?.pages ?? {}) as any[]
    return pages
      .filter((p: any) => p.imageinfo?.[0]?.thumburl)
      .filter((p: any) => !p.title.match(/\.(svg|gif|ogg|webm|ogv|wav|mp3|pdf)/i))
      .map((p: any) => ({
        title: p.title.replace('File:', ''),
        url:   p.imageinfo[0].url,
        thumb: p.imageinfo[0].thumburl,
      }))
  } catch {
    return []
  }
}

// Derive a good Wikimedia search query from lesson + slide title
function makeQuery(lessonTitle: string, slideTitle: string): string {
  const combined = `${lessonTitle} ${slideTitle}`
  // Strip generic words that give bad results
  const clean = combined
    .replace(/\bAI\b/g, 'artificial intelligence')
    .replace(/\b(The|What|How|Why|When|Where|Who|It|An|A)\b/gi, '')
    .replace(/\s+/g, ' ').trim()
  return clean.slice(0, 80)
}

// ── Styles ────────────────────────────────────────────────────────────────────

const S = {
  page:    { minHeight: '100vh', background: '#f5f5f5', fontFamily: 'system-ui, sans-serif' } as React.CSSProperties,
  header:  { background: '#0a0a0a', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 20, position: 'sticky' as const, top: 0, zIndex: 100 },
  body:    { maxWidth: 1100, margin: '0 auto', padding: '24px 24px 120px' },
  section: { marginBottom: 40 },
  heading: { fontWeight: 900, fontSize: 18, marginBottom: 12, color: '#0a0a0a' },
  subhead: { fontWeight: 700, fontSize: 13, color: '#555', marginBottom: 8, textTransform: 'uppercase' as const, letterSpacing: '0.08em' },
  grid:    { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 },
  thumb:   (selected: boolean, loading: boolean): React.CSSProperties => ({
    aspectRatio: '4/3',
    objectFit: 'cover',
    width: '100%',
    cursor: 'pointer',
    border: selected ? '3px solid #3DF542' : '3px solid transparent',
    boxShadow: selected ? '0 0 0 2px #0a0a0a' : '0 2px 8px rgba(0,0,0,0.15)',
    opacity: loading ? 0.4 : 1,
    transition: 'all 0.12s',
    background: '#ddd',
    display: 'block',
  }),
  footer:  { position: 'fixed' as const, bottom: 0, left: 0, right: 0, background: '#0a0a0a', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 16, zIndex: 200 },
}

// ── Image row for one slide ───────────────────────────────────────────────────

function SlideRow({
  lessonId, slideIdx, slideTitle, lessonTitle,
  selected, onSelect,
}: {
  lessonId: number; slideIdx: number; slideTitle: string; lessonTitle: string
  selected: number | null; onSelect: (idx: number) => void
}) {
  const [images,  setImages]  = useState<WikiImg[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const q = makeQuery(lessonTitle, slideTitle)
    searchWikimedia(q, 5).then(imgs => { setImages(imgs); setLoading(false) })
  }, [lessonId, slideIdx, lessonTitle, slideTitle])

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={S.subhead}>
        Slide {slideIdx + 1} — {slideTitle}
        {selected !== null && <span style={{ color: '#3DF542', marginLeft: 8 }}>✓ {selected}</span>}
      </div>
      <div style={S.grid}>
        {loading
          ? Array.from({ length: 5 }, (_, i) => (
              <div key={i} style={{ ...S.thumb(false, true), height: 90, background: '#ddd' }} />
            ))
          : images.length === 0
          ? <div style={{ gridColumn: '1/-1', color: '#999', fontSize: 13 }}>No images found</div>
          : images.map((img, i) => (
              <img
                key={i}
                src={img.thumb}
                alt={img.title}
                title={img.title}
                style={S.thumb(selected === i, false)}
                onClick={() => onSelect(i)}
              />
            ))
        }
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ImagePicker() {
  const [worldId,   setWorldId]   = useState<number>(1)
  const [moduleIdx, setModuleIdx] = useState<number>(0)
  // selections[lessonId][slideIdx] = image index
  const [selections, setSelections] = useState<Record<number, (number|null)[]>>({})
  const [showResults, setShowResults] = useState(false)

  const world   = WORLDS[worldId]
  const module  = world.modules[moduleIdx]
  const slides  = getSlideTitles(module.id)

  const select = useCallback((lessonId: number, slideIdx: number, imgIdx: number) => {
    setSelections(prev => {
      const arr = [...(prev[lessonId] ?? Array(8).fill(null))]
      arr[slideIdx] = imgIdx
      return { ...prev, [lessonId]: arr }
    })
  }, [])

  const moduleSelections = selections[module.id] ?? Array(slides.length).fill(null)
  const moduleDone = moduleSelections.every(v => v !== null)

  // Build compact results for this world
  const worldResults = world.modules.map(m => ({
    id: m.id,
    title: m.title,
    picks: selections[m.id] ?? [],
  }))

  const copyResults = () => {
    const text = worldResults
      .map(m => `// Lesson ${m.id}: ${m.title}\n[${m.picks.map(v => v ?? '?').join(', ')}]`)
      .join('\n\n')
    navigator.clipboard.writeText(text)
    alert('Copied!')
  }

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <span style={{ color: '#3DF542', fontWeight: 900, fontSize: 16 }}>Image Picker</span>
        <span style={{ color: '#888', fontSize: 12 }}>dev tool — Wikimedia Commons</span>

        {/* World selector */}
        <div style={{ display: 'flex', gap: 8, marginLeft: 20 }}>
          {WORLD_IDS.map(wid => (
            <button key={wid} onClick={() => { setWorldId(wid); setModuleIdx(0); setShowResults(false) }}
              style={{ padding: '4px 12px', background: wid === worldId ? '#3DF542' : '#333', color: wid === worldId ? '#0a0a0a' : '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>
              W{wid}
            </button>
          ))}
        </div>

        <button onClick={() => setShowResults(!showResults)}
          style={{ marginLeft: 'auto', padding: '6px 14px', background: '#3DF542', color: '#0a0a0a', border: 'none', cursor: 'pointer', fontWeight: 900, fontSize: 12 }}>
          {showResults ? 'Back' : 'Results →'}
        </button>
      </div>

      <div style={S.body}>
        {showResults ? (
          /* Results screen */
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 24, marginBottom: 24 }}>World {worldId} Results</h2>
            <div style={{ background: '#0a0a0a', color: '#3DF542', padding: 20, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.8, borderRadius: 4 }}>
              {worldResults.map(m => (
                <div key={m.id}>
                  <span style={{ color: '#888' }}>// Lesson {m.id}: {m.title}</span>
                  <br />
                  [{m.picks.map(v => v ?? '?').join(', ')}]
                  <br /><br />
                </div>
              ))}
            </div>
            <button onClick={copyResults} style={{ marginTop: 16, padding: '10px 24px', background: '#3DF542', color: '#0a0a0a', border: 'none', cursor: 'pointer', fontWeight: 900, fontSize: 14 }}>
              Copy to clipboard
            </button>
          </div>
        ) : (
          /* Picker */
          <div>
            {/* Module tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
              {world.modules.map((m, i) => {
                const picks = selections[m.id] ?? []
                const done  = picks.length > 0 && picks.every(v => v !== null)
                return (
                  <button key={m.id} onClick={() => setModuleIdx(i)}
                    style={{ padding: '6px 14px', background: i === moduleIdx ? '#0a0a0a' : done ? '#1a3a1a' : '#ddd', color: i === moduleIdx ? '#fff' : done ? '#3DF542' : '#333', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>
                    {i + 1}. {m.title} {done ? '✓' : ''}
                  </button>
                )
              })}
            </div>

            {/* Current module slides */}
            <div style={S.section}>
              <h2 style={S.heading}>Lesson {module.id} — {module.title}</h2>
              {slides.map((title, si) => (
                <SlideRow
                  key={`${module.id}-${si}`}
                  lessonId={module.id}
                  slideIdx={si}
                  slideTitle={title}
                  lessonTitle={module.title}
                  selected={moduleSelections[si] ?? null}
                  onSelect={idx => select(module.id, si, idx)}
                />
              ))}
            </div>

            {/* Next module */}
            {moduleIdx < world.modules.length - 1 && (
              <button onClick={() => setModuleIdx(i => i + 1)}
                style={{ padding: '12px 28px', background: '#0a0a0a', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 900, fontSize: 14 }}>
                Next module →
              </button>
            )}
            {moduleIdx === world.modules.length - 1 && (
              <button onClick={() => setShowResults(true)}
                style={{ padding: '12px 28px', background: '#3DF542', color: '#0a0a0a', border: 'none', cursor: 'pointer', fontWeight: 900, fontSize: 14 }}>
                See results →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Sticky footer: progress */}
      <div style={S.footer}>
        <span style={{ color: '#888', fontSize: 12 }}>
          W{worldId} · Module {moduleIdx + 1}/{world.modules.length} · {moduleSelections.filter(v => v !== null).length}/{slides.length} slides picked
        </span>
        <div style={{ display: 'flex', gap: 4, marginLeft: 16 }}>
          {moduleSelections.map((v, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: v !== null ? '#3DF542' : '#333' }} />
          ))}
        </div>
      </div>
    </div>
  )
}
