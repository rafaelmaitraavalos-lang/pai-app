'use client'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'
const DIM   = '#888'

interface Props {
  title:       string
  type:        'decide' | 'catch' | 'group'
  description: string
  howToPlay:   string[]   // 2-4 bullet points
  onStart:     () => void
  onBack?:     () => void
  isPT?:       boolean
}

const TYPE_LABEL: Record<Props['type'], { en: string; pt: string; color: string }> = {
  decide: { en: 'DECIDE GAME',  pt: 'JOGO DE DECISÃO', color: '#3DF542' },
  catch:  { en: 'CATCH GAME',   pt: 'JOGO DE CAPTURA', color: '#FFE14D' },
  group:  { en: 'GROUP GAME',   pt: 'JOGO DE GRUPOS',  color: '#A8D8FF' },
}

export default function GameIntro({ title, type, description, howToPlay, onStart, onBack, isPT }: Props) {
  const badge = TYPE_LABEL[type]

  return (
    <div style={{
      minHeight: '100vh', background: BLACK,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '40px 7vw', textAlign: 'center',
      animation: 'pageIn 0.4s ease-out',
    }}>

      {/* Type badge */}
      <div style={{
        fontFamily: DISP, fontSize: 9, letterSpacing: '0.22em', color: badge.color,
        border: `1px solid ${badge.color}`, padding: '4px 12px', marginBottom: 28, opacity: 0.8,
      }}>
        {isPT ? badge.pt : badge.en}
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: DISP, fontSize: 'clamp(2.8rem, 7vw, 5rem)',
        color: GREEN, margin: '0 0 24px', lineHeight: 1,
        letterSpacing: '-0.03em', textShadow: `4px 4px 0 rgba(61,245,66,0.15)`,
        animation: 'xpPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both',
      }}>
        {title}
      </h1>

      {/* Divider */}
      <div style={{ width: 60, height: 2, background: GREEN, marginBottom: 28, opacity: 0.4 }} />

      {/* Description */}
      <p style={{
        fontFamily: BODY, fontSize: 16, color: '#ccc',
        maxWidth: 440, lineHeight: 1.7, margin: '0 0 32px',
      }}>
        {description}
      </p>

      {/* How to play */}
      <div style={{
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
        padding: '18px 24px', maxWidth: 400, width: '100%', marginBottom: 40, textAlign: 'left',
      }}>
        <div style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.18em', color: DIM, marginBottom: 12 }}>
          {isPT ? 'COMO JOGAR' : 'HOW TO PLAY'}
        </div>
        {howToPlay.map((line, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < howToPlay.length - 1 ? 8 : 0 }}>
            <span style={{ color: GREEN, fontFamily: DISP, fontSize: 11, flexShrink: 0, marginTop: 1 }}>→</span>
            <span style={{ fontFamily: BODY, fontSize: 13, color: '#bbb', lineHeight: 1.5 }}>{line}</span>
          </div>
        ))}
      </div>

      {/* Start button */}
      <button
        onClick={onStart}
        style={{
          fontFamily: DISP, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase',
          background: GREEN, color: BLACK, padding: '18px 48px',
          border: 'none', cursor: 'pointer',
          boxShadow: `6px 6px 0 0 rgba(61,245,66,0.3)`,
          transition: 'all 0.12s',
          animation: 'popIn 0.4s ease-out 0.3s both',
        }}
      >
        {isPT ? 'Jogar →' : "Let's Go →"}
      </button>

      <button
        onClick={onStart}
        style={{
          marginTop: 12, fontFamily: BODY, fontSize: 12, color: DIM,
          background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0',
          textDecoration: 'underline', textUnderlineOffset: 3,
        }}
      >
        {isPT ? 'Pular introdução' : 'Skip intro'}
      </button>

      {onBack && (
        <button
          onClick={onBack}
          style={{
            marginTop: 8, fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: DIM, background: 'none', border: 'none',
            cursor: 'pointer', padding: '8px 0',
          }}
        >
          {isPT ? '← Voltar' : '← Back'}
        </button>
      )}
    </div>
  )
}
