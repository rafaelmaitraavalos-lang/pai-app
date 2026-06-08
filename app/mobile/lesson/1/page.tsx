import { STOPS, QUESTIONS } from '../../../lesson/1/page'
import MobileLessonTemplate from '../../../components/MobileLessonTemplate'

export default function MobileLesson1() {
  return (
    <MobileLessonTemplate
      id={1}
      title="History of AI"
      stops={STOPS}
      questions={QUESTIONS}
      completionPage="/mobile/games/analyst"
    />
  )
}
