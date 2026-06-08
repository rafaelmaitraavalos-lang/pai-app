import { STOPS, QUESTIONS } from '../../../lesson/5/page'
import MobileLessonTemplate from '../../../components/MobileLessonTemplate'

export default function MobileLesson5() {
  return (
    <MobileLessonTemplate
      id={5}
      title="How AI Learns"
      stops={STOPS}
      questions={QUESTIONS}
      
    />
  )
}
