'use client'

import { useParams } from 'next/navigation'
import { ELEMENTARY_LESSONS } from '../../../../data/elementary'
import MobileLessonTemplate from '../../../../components/MobileLessonTemplate'
import { notFound } from 'next/navigation'

export default function MobileElementaryLessonPage() {
  const params  = useParams()
  const id      = parseInt(params.id as string)
  const lesson  = ELEMENTARY_LESSONS[id]

  if (!lesson) notFound()

  return (
    <MobileLessonTemplate
      id={lesson.id}
      title={lesson.title}
      stops={lesson.stops}
      questions={lesson.questions}
      completionPage={`/mobile/elementary/world/${lesson.worldId}`}
      theme="elementary"
    />
  )
}
