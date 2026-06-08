import { notFound } from 'next/navigation'
import { WORLDS } from '../../../data'
import WorldModuleView from '../../../components/WorldModuleView'

export default async function MobileWorldPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const worldId = parseInt(id)
  const world = WORLDS[worldId]
  if (!world) notFound()

  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ background: '#0a0a0a', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: "var(--font-display,'Arial Black',sans-serif)", fontSize: 20, letterSpacing: '-0.02em', color: '#3DF542', lineHeight: 1 }}>PAI</span>
        <a href="/mobile/home" style={{ fontFamily: "var(--font-display,'Arial Black',sans-serif)", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', opacity: 0.6, textDecoration: 'none' }}>← Home</a>
      </div>
      <WorldModuleView world={world} basePath="/mobile" />
    </div>
  )
}
