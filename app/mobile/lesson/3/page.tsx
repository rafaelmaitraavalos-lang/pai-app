import { STOPS, QUESTIONS } from '../../../lesson/3/page'
import MobileLessonTemplate from '../../../components/MobileLessonTemplate'

export default function MobileLesson3() {
  return (
    <MobileLessonTemplate
      id={3}
      title="AI In Your Life"
      stops={STOPS}
      questions={QUESTIONS}
      
    />
  )
}
