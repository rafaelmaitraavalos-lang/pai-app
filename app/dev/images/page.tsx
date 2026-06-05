'use client'

import { useState, useEffect, useCallback } from 'react'
import { WORLDS, WORLD_IDS } from '../../data'
import { getSlideTitles } from '../../data/slideIndex'

interface WikiImg { title: string; thumb: string; url: string }
interface Pick { url: string; thumb: string }

// ── Wikimedia Commons search with AI spam filter ──────────────────────────────

const AI_SPAM = /\b(ai.generat|stable.diff|midjourney|dall.e|diffusion|deepfake|neural.art|nft|anime|cartoon|manga|vector|clipart|icon|logo|flag|svg)\b/i

async function searchCommons(query: string): Promise<WikiImg[]> {
  const params = new URLSearchParams({
    action: 'query', generator: 'search',
    gsrsearch: `${query} -filetype:svg`,
    gsrnamespace: '6', gsrlimit: '50',
    prop: 'imageinfo', iiprop: 'url|size|mime',
    iiurlwidth: '500', format: 'json', origin: '*',
  })
  try {
    const res  = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`)
    const data = await res.json()
    const pages = Object.values(data?.query?.pages ?? {}) as any[]
    return pages
      .filter((p: any) => {
        const ii = p.imageinfo?.[0]
        if (!ii?.thumburl) return false
        const mime = ii.mime ?? ''
        const name = (p.title ?? '').toLowerCase()
        return (mime === 'image/jpeg' || mime === 'image/png' || mime === 'image/webp') &&
               !AI_SPAM.test(name)
      })
      .map((p: any) => ({
        title: p.title.replace('File:', ''),
        thumb: p.imageinfo[0].thumburl,
        url:   p.imageinfo[0].url,
      }))
  } catch { return [] }
}

// ── Curated queries per slide ─────────────────────────────────────────────────

function slideQuery(lessonTitle: string, slideTitle: string): string {
  const c = `${slideTitle} ${lessonTitle}`
  if (/Ada Lovelace/i.test(c))              return 'Ada Lovelace portrait engraving'
  if (/Alan Turing/i.test(c))               return 'Alan Turing photograph portrait'
  if (/Aristotle/i.test(c))                 return 'Aristotle ancient bust sculpture'
  if (/Dartmouth/i.test(c))                 return 'Dartmouth College mathematics conference'
  if (/AI winter/i.test(c))                 return 'winter snow frozen landscape'
  if (/Deep Blue/i.test(c))                 return 'Deep Blue IBM chess computer'
  if (/AlexNet|ImageNet/i.test(c))          return 'ImageNet visual recognition competition'
  if (/ChatGPT/i.test(c))                   return 'OpenAI ChatGPT language model'
  if (/Kasparov/i.test(c))                  return 'Garry Kasparov chess grandmaster'
  if (/John McCarthy/i.test(c))             return 'John McCarthy computer scientist'
  if (/neural network/i.test(c))            return 'artificial neural network diagram'
  if (/facial recogni/i.test(c))            return 'facial recognition biometric camera'
  if (/self.driv|autonomous vehicle/i.test(c)) return 'self-driving car autonomous'
  if (/surveillance/i.test(c))              return 'surveillance camera CCTV'
  if (/protein|AlphaFold/i.test(c))         return 'protein structure molecular biology'
  if (/robot/i.test(c))                     return 'robot humanoid mechanical arm'
  if (/DNA|genome/i.test(c))                return 'DNA double helix genetics'
  if (/climate/i.test(c))                   return 'climate change global warming'
  if (/hospital|medical|doctor/i.test(c))   return 'hospital doctor medical'
  if (/classroom|education/i.test(c))       return 'classroom students learning'
  if (/election|voting|democracy/i.test(c)) return 'election voting ballot'
  if (/bias|fairness/i.test(c))             return 'justice scales law equality'
  if (/privacy/i.test(c))                   return 'privacy data security'
  if (/brain|neuron/i.test(c))              return 'human brain neuron microscope'
  if (/mathematics|equation/i.test(c))      return 'mathematics blackboard equation'
  if (/GPS|navigation/i.test(c))            return 'GPS satellite navigation map'
  if (/smartphone|phone/i.test(c))          return 'smartphone mobile phone'
  if (/GPU|graphics processor/i.test(c))    return 'graphics processing unit chip'
  if (/data center|server/i.test(c))        return 'data center server room'
  if (/chess/i.test(c))                     return 'chess game board'
  if (/hallucin/i.test(c))                  return 'illusion optical psychology'
  if (/Before Computer/i.test(c))           return 'ancient manuscript philosophy scroll'
  const clean = slideTitle.replace(/^(The|What|How|Why|When|An?|It) /i, '').replace(/\b(Problem|Question|Gap|Case|Moment)\b/i, '').trim()
  return clean || lessonTitle
}

// ── Slide row ─────────────────────────────────────────────────────────────────

function SlideRow({ lessonId, slideIdx, slideTitle, lessonTitle, pick, onPick }: {
  lessonId: number; slideIdx: number; slideTitle: string; lessonTitle: string
  pick: Pick | null; onPick: (p: Pick) => void
}) {
  const [images,  setImages]  = useState<WikiImg[]>([])
  const [loading, setLoading] = useState(true)
  const [shown,   setShown]   = useState(8)
  const [query,   setQuery]   = useState(() => slideQuery(lessonTitle, slideTitle))

  const run = useCallback((q: string) => {
    setLoading(true); setShown(8)
    searchCommons(q).then(imgs => { setImages(imgs); setLoading(false) })
  }, [])

  useEffect(() => { run(query) }, []) // eslint-disable-line

  return (
    <div style={{ marginBottom: 18, borderBottom: '1px solid #ddd', paddingBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{ fontWeight: 700, fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', minWidth: 120 }}>
          S{slideIdx + 1} — {slideTitle}
          {pick && <span style={{ color: '#3DF542', marginLeft: 6 }}>✓</span>}
        </span>
        <input value={query} onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && run(query)}
          style={{ flex: 1, fontSize: 11, padding: '3px 8px', border: '1px solid #ccc' }}
          placeholder="Edit query and press Enter" />
        <button onClick={() => run(query)}
          style={{ fontSize: 10, padding: '3px 10px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}>
          ↺
        </button>
        {!loading && <span style={{ fontSize: 10, color: '#888' }}>{images.length} found</span>}
      </div>

      {/* Selected preview */}
      {pick && (
        <div style={{ display: 'inline-block', marginBottom: 6, position: 'relative' }}>
          <img src={pick.thumb} style={{ height: 60, border: '3px solid #3DF542', display: 'block' }} alt="" />
          <button onClick={() => onPick({ url: '', thumb: '' })}
            style={{ position: 'absolute', top: 0, right: 0, background: '#c00', color: '#fff', border: 'none', fontSize: 10, cursor: 'pointer', padding: '1px 4px' }}>✕</button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 5 }}>
        {loading
          ? Array.from({ length: 6 }, (_, i) => <div key={i} style={{ aspectRatio: '4/3', background: '#e0e0e0' }} />)
          : images.length === 0
          ? <div style={{ gridColumn: '1/-1', color: '#999', fontSize: 11 }}>No results — edit query ↑</div>
          : <>
              {images.slice(0, shown).map((img, i) => (
                <img key={i} src={img.thumb} alt={img.title} title={img.title}
                  style={{ aspectRatio: '4/3' as any, objectFit: 'cover' as any, width: '100%', cursor: 'pointer', display: 'block', border: pick?.url === img.url ? '3px solid #3DF542' : '2px solid transparent', background: '#ddd' }}
                  onClick={() => onPick({ url: img.url, thumb: img.thumb })} />
              ))}
              {shown < images.length && (
                <button onClick={() => setShown(s => s + 8)}
                  style={{ gridColumn: '1/-1', padding: '6px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700 }}>
                  Load more ({images.length - shown} left)
                </button>
              )}
            </>
        }
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function ImagePicker() {
  const [worldId,    setWorldId]    = useState(1)
  const [moduleIdx,  setModuleIdx]  = useState(0)
  // picks[lessonId][slideIdx] = { url, thumb }
  const [picks, setPicks] = useState<Record<string, Pick | null>>({})
  const [showResults, setShowResults] = useState(false)

  const world  = WORLDS[worldId]
  const mod    = world.modules[moduleIdx]
  const slides = getSlideTitles(mod.id)

  const pickKey = (li: number, si: number) => `${li}:${si}`
  const getPick = (li: number, si: number) => picks[pickKey(li, si)] ?? null

  const setPick = useCallback((li: number, si: number, p: Pick) => {
    setPicks(prev => ({ ...prev, [pickKey(li, si)]: p.url ? p : null }))
  }, [])

  // Build Python download script from actual URLs
  const buildScript = () => {
    const lines = [
      '#!/usr/bin/env python3',
      'import os, urllib.request',
      'OUT = "public/images/lessons"',
      '',
    ]
    world.modules.forEach(m => {
      const sl = getSlideTitles(m.id)
      sl.forEach((_, si) => {
        const p = getPick(m.id, si)
        if (!p) return
        lines.push(`# Lesson ${m.id} slide ${si}: ${sl[si]}`)
        lines.push(`os.makedirs(f"{OUT}/lesson-${m.id}", exist_ok=True)`)
        lines.push(`urllib.request.urlretrieve("${p.url}", f"{OUT}/lesson-${m.id}/slide-${si}.jpg")`)
        lines.push(`print("  L${m.id}·S${si} ✓")`)
        lines.push('')
      })
    })
    return lines.join('\n')
  }

  const copyScript = () => {
    navigator.clipboard.writeText(buildScript())
    alert('Python script copied! Run it in the pai-app directory.')
  }

  const pickedCount = slides.filter((_, si) => getPick(mod.id, si) !== null).length

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ background: '#0a0a0a', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 16, position: 'sticky', top: 0, zIndex: 100 } as React.CSSProperties}>
        <span style={{ color: '#3DF542', fontWeight: 900, fontSize: 14 }}>Image Picker</span>
        <span style={{ color: '#666', fontSize: 11 }}>Wikimedia Commons · AI filtered · click = select · edit query + Enter = new search</span>
        <div style={{ display: 'flex', gap: 5, marginLeft: 12 }}>
          {WORLD_IDS.map(wid => (
            <button key={wid} onClick={() => { setWorldId(wid); setModuleIdx(0); setShowResults(false) }}
              style={{ padding: '3px 10px', background: wid === worldId ? '#3DF542' : '#333', color: wid === worldId ? '#0a0a0a' : '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 11 }}>
              W{wid}
            </button>
          ))}
        </div>
        <button onClick={() => setShowResults(!showResults)}
          style={{ marginLeft: 'auto', padding: '5px 14px', background: '#3DF542', color: '#0a0a0a', border: 'none', cursor: 'pointer', fontWeight: 900, fontSize: 11 }}>
          {showResults ? '← Back' : 'Get script →'}
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 20px 100px' }}>
        {showResults ? (
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 20, marginBottom: 16 }}>Download script — run this in pai-app/</h2>
            <pre style={{ background: '#0a0a0a', color: '#3DF542', padding: 20, fontSize: 11, lineHeight: 1.7, overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
              {buildScript()}
            </pre>
            <button onClick={copyScript}
              style={{ marginTop: 12, padding: '10px 24px', background: '#3DF542', color: '#0a0a0a', border: 'none', cursor: 'pointer', fontWeight: 900, fontSize: 13 }}>
              Copy script
            </button>
          </div>
        ) : (
          <div>
            {/* Module tabs */}
            <div style={{ display: 'flex', gap: 5, marginBottom: 20, flexWrap: 'wrap' }}>
              {world.modules.map((m, i) => {
                const done = getSlideTitles(m.id).every((_, si) => getPick(m.id, si) !== null)
                return (
                  <button key={m.id} onClick={() => setModuleIdx(i)}
                    style={{ padding: '5px 12px', background: i === moduleIdx ? '#0a0a0a' : done ? '#1a3a1a' : '#ddd', color: i === moduleIdx ? '#fff' : done ? '#3DF542' : '#333', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 11 }}>
                    {i + 1}. {m.title}{done ? ' ✓' : ''}
                  </button>
                )
              })}
            </div>

            <h2 style={{ fontWeight: 900, fontSize: 17, marginBottom: 4 }}>Lesson {mod.id} — {mod.title}</h2>
            <p style={{ fontSize: 11, color: '#888', marginBottom: 16 }}>{pickedCount}/{slides.length} slides picked</p>

            {slides.map((title, si) => (
              <SlideRow key={`${mod.id}-${si}`}
                lessonId={mod.id} slideIdx={si} slideTitle={title} lessonTitle={mod.title}
                pick={getPick(mod.id, si)} onPick={p => setPick(mod.id, si, p)} />
            ))}

            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              {moduleIdx < world.modules.length - 1 && (
                <button onClick={() => setModuleIdx(i => i + 1)}
                  style={{ padding: '10px 22px', background: '#0a0a0a', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 900 }}>
                  Next module →
                </button>
              )}
              <button onClick={() => setShowResults(true)}
                style={{ padding: '10px 22px', background: '#3DF542', color: '#0a0a0a', border: 'none', cursor: 'pointer', fontWeight: 900 }}>
                Get download script →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#0a0a0a', padding: '8px 24px', display: 'flex', alignItems: 'center', gap: 12 } as React.CSSProperties}>
        <span style={{ color: '#888', fontSize: 11 }}>W{worldId} · Module {moduleIdx + 1}/{world.modules.length} · {pickedCount}/{slides.length} picked</span>
        <div style={{ display: 'flex', gap: 3 }}>
          {slides.map((_, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: getPick(mod.id, i) ? '#3DF542' : '#333' }} />)}
        </div>
      </div>
    </div>
  )
}
