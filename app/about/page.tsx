'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const DISP  = "'Archivo Black', 'Arial Black', sans-serif"
const BODY  = "'Inter', system-ui, sans-serif"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

const people = {
  en: [
    {
      name:     'Rafa Avalos',
      age:      'Age 14',
      portrait: '/images/rafa-portrait.png',
      bio: [
        'Rafa Avalos is a fourteen-year-old student from Marin County in Northern California. He is Guatemalan and Indian and has lived in several different countries and communities, including two years in Madrid. His interests span software development, music, and the design of tools that make complex ideas accessible.',
        'He is a student at Stanford Online High School and has been building software, apps, and tools since he was young.',
        'Outside of his academic and project work, Rafa enjoys running, sailing, and making music.',
      ],
    },
    {
      name: 'Ryan Avalos',
      age:  'Age 16',
      bio: [
        'Ryan Avalos is a sixteen-year-old student from the Bay Area in Northern California. She is Guatemalan and Indian and has lived in several different countries and communities, experiences that have shaped her curiosity about people, identity, and belonging. Her interests span the sciences and the arts, particularly medicine, surgery, literature, and creative writing.',
        'Ryan is a member of Marin Search and Rescue. She is involved in many community outreach initiatives focused on expanding access to educational and creative opportunities for young people. She is the founder and editor of Lost & Found, a seasonal literary journal that creates space for honest self-expression through language.',
        'As a writer, she is a Scholastic Art & Writing Awards National Medalist and a First Class recipient of the NCTE Promising Young Writers Award, and her work has appeared in Curieux Journal and Stone Soup.',
        'Outside of her academic and extracurricular work, Ryan enjoys running, spending time outdoors, and exploring the connections between science, storytelling, and community.',
      ],
    },
  ],
  pt: [
    {
      name:     'Rafa Avalos',
      age:      '14 anos',
      portrait: '/images/rafa-portrait.png',
      bio: [
        'Rafa Avalos tem quatorze anos e é estudante de Marin County, no norte da Califórnia. É guatemalteco e indiano e já viveu em diferentes países e comunidades, incluindo dois anos em Madri. Seus interesses abrangem desenvolvimento de software, música e o design de ferramentas que tornam ideias complexas acessíveis.',
        'É aluno da Stanford Online High School e vem criando softwares, aplicativos e ferramentas desde pequeno.',
        'Além de seu trabalho acadêmico e de projetos, Rafa gosta de correr, velejar e fazer música.',
      ],
    },
    {
      name: 'Ryan Avalos',
      age:  '16 anos',
      bio: [
        'Ryan Avalos tem dezesseis anos e é estudante da área da Baía, no norte da Califórnia. É guatemalteca e indiana e já viveu em diferentes países e comunidades — experiências que moldaram sua curiosidade sobre pessoas, identidade e pertencimento. Seus interesses abrangem as ciências e as artes, em especial medicina, cirurgia, literatura e escrita criativa.',
        'Ryan é integrante do Marin Search and Rescue. Está envolvida em diversas iniciativas comunitárias voltadas à ampliação do acesso a oportunidades educacionais e criativas para jovens. É fundadora e editora da Lost & Found, uma revista literária sazonal que abre espaço para a autoexpressão honesta por meio da linguagem.',
        'Como escritora, é Medalhista Nacional do Scholastic Art & Writing Awards e recebeu o prêmio First Class do NCTE Promising Young Writers Award. Seus textos foram publicados na Curieux Journal e na Stone Soup.',
        'Além de seu trabalho acadêmico e extracurricular, Ryan gosta de correr, passar tempo ao ar livre e explorar as conexões entre ciência, narrativa e comunidade.',
      ],
    },
  ],
}

export default function AboutPage() {
  const [isPT, setIsPT] = useState(false)
  useEffect(() => { setIsPT(localStorage.getItem('pai_lang') === 'pt') }, [])

  const list = isPT ? people.pt : people.en

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: BODY }}>

      {/* Header */}
      <div style={{ background: BLACK, padding: '10px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: DISP, fontSize: 22, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
        <Link href="/" style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', opacity: 0.5, textDecoration: 'none' }}>
          {isPT ? '← Início' : '← Home'}
        </Link>
      </div>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '64px 7vw 120px' }}>

        {/* Title */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: DIM, margin: '0 0 14px' }}>
            {isPT ? 'Sobre' : 'About'}
          </p>
          <h1 style={{ fontFamily: DISP, fontSize: 'clamp(2.4rem, 7vw, 4rem)', letterSpacing: '-0.03em', color: BLACK, margin: 0, fontWeight: 400, lineHeight: 1.1 }}>
            {isPT ? <>Feito por estudantes,<br />para estudantes.</> : <>Built by students,<br />for students.</>}
          </h1>
        </div>

        <div style={{ borderTop: `1px solid ${FAINT}`, marginBottom: 64 }} />

        {/* People */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
          {list.map((person, i) => (
            <div key={person.name}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
                <h2 style={{ fontFamily: DISP, fontSize: 'clamp(1.4rem, 4vw, 2rem)', letterSpacing: '-0.02em', color: BLACK, margin: 0, fontWeight: 400 }}>
                  {person.name}
                </h2>
                <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: GREEN }}>{person.age}</span>
              </div>
              {'portrait' in person && person.portrait && (
                <img
                  src={(person as any).portrait}
                  alt={person.name}
                  style={{ width: 160, height: 160, objectFit: 'cover', objectPosition: 'top', marginBottom: 24, border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${BLACK}` }}
                />
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, borderLeft: `2px solid ${BLACK}`, paddingLeft: 24 }}>
                {person.bio.map((p, j) => (
                  <p key={j} style={{ fontFamily: BODY, fontSize: 16, lineHeight: 1.75, color: BLACK, margin: 0 }}>{p}</p>
                ))}
              </div>
              {i < list.length - 1 && (
                <div style={{ borderTop: `1px solid ${FAINT}`, marginTop: 64 }} />
              )}
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}
