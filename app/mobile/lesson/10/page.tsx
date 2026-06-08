import { STOPS, QUESTIONS } from '../../../lesson/10/page'
import MobileLessonTemplate from '../../../components/MobileLessonTemplate'

export default function MobileLesson10() {
  return (
    <MobileLessonTemplate
      id={10}
      title="Deep Learning"
      stops={STOPS}
      questions={QUESTIONS}
      
    />
  )
}
