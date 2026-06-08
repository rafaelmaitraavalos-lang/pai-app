import { notFound } from 'next/navigation'
import { LESSONS } from '../../../data'
import MobileLessonTemplate from '../../../components/MobileLessonTemplate'

export default async function MobileLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const lessonId = parseInt(id)
  const lesson = LESSONS[lessonId]
  if (!lesson) notFound()

  const completionPage = lesson.completionPage
    ? lesson.completionPage.replace(/^\/(?!mobile)/, '/mobile/')
    : undefined

  return (
    <MobileLessonTemplate
      id={lesson.id}
      title={lesson.title}
      stops={lesson.stops}
      questions={lesson.questions}
      completionPage={completionPage}
    />
  )
}
