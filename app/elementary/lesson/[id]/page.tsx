'use client'

import { useParams } from 'next/navigation'
import { ELEMENTARY_LESSONS, MIDDLE_SCHOOL_LESSONS } from '../../../data/elementary'
import LessonTemplate from '../../../components/LessonTemplate'
import { notFound } from 'next/navigation'

export default function ElementaryLessonPage() {
  const params = useParams()
  const id     = parseInt(params.id as string)
  const lesson = ELEMENTARY_LESSONS[id] ?? MIDDLE_SCHOOL_LESSONS[id]

  if (!lesson) notFound()

  return (
    <LessonTemplate
      id={lesson.id}
      title={lesson.title}
      stops={lesson.stops}
      questions={lesson.questions}
      completionPage={`/elementary/world/${lesson.worldId}`}
    />
  )
}
