'use client'

import { useRouter } from 'next/navigation'
import { WORLDS, WORLD_IDS } from '../data'
import {
  ELEMENTARY_WORLDS,
  ELEMENTARY_WORLD_IDS,
  ELEMENTARY_WORLD_IDS_PT,
  MIDDLE_SCHOOL_WORLD_IDS,
  MIDDLE_SCHOOL_WORLD_IDS_PT,
} from '../data/elementary'

const STYLES = {
  elementary: { badge: 'bg-emerald-700 text-emerald-100', bg: 'bg-emerald-50',   border: 'border-emerald-200', text: 'text-emerald-900', accent: 'text-emerald-700' },
  middle:     { badge: 'bg-blue-700 text-blue-100',       bg: 'bg-blue-50',      border: 'border-blue-200',    text: 'text-blue-900',    accent: 'text-blue-700'    },
  high:       { badge: 'bg-[#3D1A00] text-[#F5C050]',    bg: 'bg-[#F2EBE0]',   border: 'border-[#E5D4BA]',   text: 'text-[#3D1A00]',   accent: 'text-[#BA7517]'   },
}

function WorldBlock({ worldId, lessonBase, kind }: { worldId: number; lessonBase: string; kind: keyof typeof STYLES }) {
  const router = useRouter()
  const s = STYLES[kind]
  const worlds = kind === 'high' ? WORLDS : ELEMENTARY_WORLDS
  const world = worlds[worldId]
  if (!world) return null
  const lessons = world.modules.filter(m => m.id < 9000)
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-black ${s.accent}`}>W{worldId}</span>
        <span className={`font-black text-sm ${s.text}`}>{world.title}</span>
        <span className="text-xs text-gray-400">{world.level}</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5 pl-4">
        {lessons.map((mod, i) => (
          <button
            key={mod.id}
            onClick={() => router.push(`${lessonBase}/${mod.id}`)}
            className={`flex items-center gap-2 px-3 py-2 bg-white rounded-lg border ${s.border} text-left hover:shadow-sm active:scale-[0.98] cursor-pointer transition-all duration-100`}
          >
            <span className={`text-[10px] font-black ${s.accent} w-4 text-center shrink-0`}>{i + 1}</span>
            <span className={`text-xs font-bold ${s.text} leading-tight`}>{mod.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function Section({ label, kind, worldIds, lessonBase }: { label: string; kind: keyof typeof STYLES; worldIds: number[]; lessonBase: string }) {
  const s = STYLES[kind]
  return (
    <div className={`rounded-2xl border-2 ${s.border} ${s.bg} p-5 mb-5`}>
      <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-5 ${s.badge}`}>{label}</div>
      {worldIds.map(id => <WorldBlock key={id} worldId={id} lessonBase={lessonBase} kind={kind} />)}
    </div>
  )
}

export default function Dev() {
  const router = useRouter()

  const clearAll = () => {
    Object.values(WORLDS).forEach(w => w.modules.forEach(m => localStorage.removeItem(`pai_lesson_${m.id}_done`)))
    Object.values(ELEMENTARY_WORLDS).forEach(w => w.modules.forEach(m => localStorage.removeItem(`pai_lesson_${m.id}_done`)))
    localStorage.removeItem('pai_onboarding_screen')
  }

  const completeAll = () => {
    Object.values(WORLDS).forEach(w => w.modules.forEach(m => localStorage.setItem(`pai_lesson_${m.id}_done`, 'true')))
    Object.values(ELEMENTARY_WORLDS).forEach(w => w.modules.forEach(m => localStorage.setItem(`pai_lesson_${m.id}_done`, 'true')))
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans" style={{ animation: 'pageIn 0.2s ease-out' }}>

      {/* Header */}
      <div className="px-8 py-4 border-b border-gray-200 bg-white flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-lg bg-black text-yellow-400 text-[10px] font-black uppercase tracking-widest">Dev</span>
          <span className="font-black text-gray-800 text-sm">Jump to any lesson</span>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <button onClick={() => { clearAll(); router.push('/reset') }} className="px-3 py-1.5 rounded-lg border-2 border-gray-200 bg-white text-xs font-black text-gray-700 hover:border-red-300 hover:text-red-600 transition-colors cursor-pointer">Clear all</button>
          <button onClick={completeAll} className="px-3 py-1.5 rounded-lg border-2 border-gray-800 bg-gray-800 text-white text-xs font-black hover:bg-black transition-colors cursor-pointer">Complete all</button>
          <button onClick={() => router.push('/home')} className="px-3 py-1.5 rounded-lg border-2 border-gray-200 bg-white text-xs font-black text-gray-700 hover:border-gray-400 transition-colors cursor-pointer">← Home</button>
          {(['en','es','pt','fr','de','ja','zh','ko','hi','tl'] as const).map(lang => (
            <button key={lang} onClick={() => { localStorage.setItem('pai_lang', lang); router.push('/home') }} className="px-2.5 py-1.5 rounded-lg border-2 border-gray-200 bg-white text-[10px] font-black text-gray-700 hover:border-gray-400 transition-colors cursor-pointer uppercase">{lang}</button>
          ))}
        </div>
      </div>

      <div className="px-8 py-8 max-w-5xl">

        {/* Elementary */}
        <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Elementary</h2>
        <Section label="Elementary — English"    kind="elementary" worldIds={ELEMENTARY_WORLD_IDS}       lessonBase="/elementary/lesson" />
        <Section label="Elementary — Português"  kind="elementary" worldIds={ELEMENTARY_WORLD_IDS_PT}    lessonBase="/elementary/lesson" />

        {/* Middle School */}
        <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 mt-4">Middle School</h2>
        <Section label="Middle School — English"   kind="middle" worldIds={MIDDLE_SCHOOL_WORLD_IDS}    lessonBase="/elementary/lesson" />
        <Section label="Middle School — Português" kind="middle" worldIds={MIDDLE_SCHOOL_WORLD_IDS_PT} lessonBase="/elementary/lesson" />

        {/* High School */}
        <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 mt-4">High School</h2>
        <Section label="High School — English" kind="high" worldIds={WORLD_IDS} lessonBase="/lesson" />

        {/* Other screens */}
        <div className="rounded-2xl border-2 border-gray-200 bg-white p-5 mt-4">
          <span className="inline-flex px-3 py-1 rounded-full bg-gray-800 text-white text-[10px] font-black uppercase tracking-widest mb-4">Other screens</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Onboarding',         path: '/' },
              { label: 'Home (worlds)',       path: '/home' },
              { label: 'Elementary home',     path: '/mobile/elementary/home' },
              { label: 'World 1 modules',     path: '/lessons' },
              { label: 'Games hub',           path: '/games' },
              { label: 'Reset progress',      path: '/reset' },
              { label: 'Images debug',        path: '/dev/images' },
            ].map(item => (
              <button key={item.path} onClick={() => router.push(item.path)} className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 text-left hover:border-gray-400 hover:bg-white hover:shadow-sm active:scale-[0.98] cursor-pointer transition-all">
                <span className="text-sm font-bold text-gray-800">{item.label}</span>
                <span className="text-xs text-gray-400 ml-auto">{item.path}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
