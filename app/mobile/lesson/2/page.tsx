import { STOPS, QUESTIONS } from '../../../lesson/2/page'
import MobileLessonTemplate from '../../../components/MobileLessonTemplate'

export default function MobileLesson2() {
  return (
    <MobileLessonTemplate
      id={2}
      title="What AI Does"
      stops={STOPS}
      questions={QUESTIONS}
      
    />
  )
}
