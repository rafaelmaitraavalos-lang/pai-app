import { notFound } from 'next/navigation'
import { LESSONS } from '../../data'
import LessonTemplate from '../../components/LessonTemplate'

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const lessonId = parseInt(id)
  const lesson = LESSONS[lessonId]

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
