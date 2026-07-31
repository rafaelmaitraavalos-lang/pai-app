import { notFound } from 'next/navigation'
import { LESSONS } from '../../data'
import { ELEMENTARY_LESSONS, MIDDLE_SCHOOL_LESSONS } from '../../data/elementary'
import LessonTemplate from '../../components/LessonTemplate'

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const lessonId = parseInt(id)
  // Elementary and middle-school lessons live in their own maps, remapped into
  // their own id ranges. Looking only at LESSONS meant every one of them 404'd —
  // including the whole Portuguese elementary and middle-school curriculum.
  const lesson = LESSONS[lessonId]
    ?? ELEMENTARY_LESSONS[lessonId]
    ?? MIDDLE_SCHOOL_LESSONS[lessonId]

  // Lessons 1–23 are handled by static routes in app/lesson/[N]/page.tsx
  // This dynamic route handles new lessons added via app/data/index.ts
  if (!lesson) notFound()

  return (
    <LessonTemplate
      id={lesson.id}
      title={lesson.title}
      stops={lesson.stops}
      questions={lesson.questions}
      completionPage={lesson.completionPage}
    />
  )
}
