import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

const STOPS: Stop[] = [
  {
    tag: 'Myth bust',
    title: 'Seeing Is Not Understanding',
    body: "When an AI identifies a cat in a photo it is not seeing the cat the way you see it. It is detecting patterns in pixel values that correlate with what humans have labeled \"cat\" in training data. It has no concept of what a cat is — what it feels like, how it moves, what it means to be one. It detects the visual signature. That's not nothing. But it's fundamentally different from visual understanding, and confusing the two leads to serious mistakes in how we deploy these systems.",
  },
  {
    tag: 'Example',
    title: 'How Images Become Data',
    body: "A digital image is a grid of pixels. Each pixel is three numbers — red, green, and blue values from 0 to 255. A 1000x1000 pixel image is 3 million numbers. Computer vision is the problem of taking those 3 million numbers and producing meaningful output — what's in this image, where are the objects, what are people doing. The raw input is just numbers. The meaning has to be learned.",
  },
  {
    tag: 'Example',
    title: 'Convolutional Networks',
    body: "The neural network architecture that made modern computer vision possible is the convolutional neural network. It processes images by applying small filters that slide across the image, detecting features at each location. Early filters detect edges. Later filters detect increasingly complex patterns. The same filter is applied everywhere in the image — if a filter detects eyes it detects them wherever they appear. This weight sharing is what makes the network efficient enough to work on real images.",
  },
  {
    tag: 'Hot take',
    title: 'What It Gets Wrong',
    body: "Computer vision fails in predictable ways. Change the lighting dramatically and recognition drops. Rotate an object to an unusual angle and the network may not recognize it. Add carefully designed noise invisible to humans — adversarial examples — and a network will confidently identify a cat as a toaster. These failures reveal that the network learned to recognize visual signatures, not objects. A human who sees a cat upside down still knows it's a cat. The network may not.",
  },
  {
    tag: 'Fact',
    title: 'Where It Works Remarkably Well',
    body: "Despite its limitations, computer vision now matches or exceeds human performance on many specific tasks. Detecting tumors in medical scans. Identifying defects in manufacturing. Reading license plates. Recognizing faces. Describing the contents of images for visually impaired users. In conditions similar to its training — consistent lighting, typical angles, high image quality — modern computer vision is extraordinarily reliable. The key word is conditions.",
  },
  {
    tag: 'Scenario',
    title: 'Facial Recognition',
    body: "Facial recognition is computer vision applied to faces. It powers phone unlocking, airport security, and law enforcement tools. It also has well-documented accuracy disparities — multiple studies have shown it performs worse on darker-skinned faces, women, and older people. These disparities come from training data that overrepresents lighter-skinned men. The network learned the patterns it was shown. The deployment consequences — wrongful arrests, surveillance — are serious and ongoing.",
  },
  {
    tag: 'Example',
    title: 'Beyond Classification',
    body: "Modern computer vision does more than classify images. Object detection identifies multiple objects and their locations. Semantic segmentation labels every pixel in an image with a category. Pose estimation tracks body position. Video understanding tracks objects across frames. Depth estimation infers 3D structure from 2D images. These capabilities power self-driving cars, medical imaging, robotics, and augmented reality. The same basic deep learning approach, applied to increasingly complex visual tasks.",
  },
  {
    tag: 'Big idea',
    title: 'The World As Data',
    body: "Computer vision is turning the physical world into data. Every camera is potentially a sensor feeding AI systems. Traffic cameras, security cameras, satellite imagery, medical scans — all of it processable by systems that can detect patterns humans would miss or couldn't process at scale. This creates enormous potential benefits in medicine, science, and safety. It also creates surveillance infrastructure that can be used to monitor populations at scale. The technology doesn't determine which outcome happens. The people deploying it do.",
  },
]

const QUESTIONS: Question[] = [
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: 'Seeing Is Not Understanding',
    question: `"When an AI identifies a cat in a photo it understands what a cat is."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "It detects patterns in pixel values that correlate with what humans labeled \"cat\" in training data. It has no concept of what a cat is — what it feels like, how it moves, what it means to be one. It detects the visual signature. That's not nothing. But it's not understanding.",
  },
  {
    difficulty: 'Easy',
    tag: 'Example',
    stopTitle: 'How Images Become Data',
    question: `"A digital image is just a grid of numbers representing pixel color values."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Each pixel is three numbers — red, green, blue — from 0 to 255. A 1000×1000 image is 3 million numbers. Computer vision is the problem of taking those numbers and producing meaningful output. The raw input is just math. The meaning has to be learned.",
  },
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: 'Where It Works Remarkably Well',
    question: `"Modern computer vision systems match or exceed human performance on every visual task."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "On specific tasks in controlled conditions — detecting tumors, reading license plates, recognizing faces — they can exceed human performance. But they fail on unusual angles, dramatic lighting changes, and adversarial examples. Human vision generalizes. Computer vision is brittle outside its training conditions.",
  },
  {
    difficulty: 'Medium',
    tag: 'Scenario',
    stopTitle: 'Facial Recognition',
    question: `"Facial recognition systems have shown documented accuracy disparities across different demographic groups."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Multiple studies have shown lower accuracy on darker-skinned faces, women, and older people. These disparities come from training data that overrepresents lighter-skinned men. The network learned the patterns it was shown. The consequences — wrongful arrests, surveillance failures — are serious and ongoing.",
  },
  {
    difficulty: 'Medium',
    tag: 'Example',
    stopTitle: 'Convolutional Networks',
    question: `"Convolutional neural networks apply the same filters across the entire image rather than learning different filters for each location."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "This weight sharing is what makes convolutional networks efficient enough to work on real images. If a filter detects eyes it detects them wherever they appear in the image. The same filter is applied everywhere. Without weight sharing the number of parameters would be unmanageable.",
  },
  {
    difficulty: 'Medium',
    tag: 'Hot take',
    stopTitle: 'What It Gets Wrong',
    question: `"Adversarial examples — carefully designed noise invisible to humans — cannot fool computer vision systems."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "They absolutely can. Add carefully designed noise to an image of a cat and a computer vision system will confidently call it a toaster — while the image looks identical to the human eye. These failures reveal that networks learned to recognize visual signatures not objects. A human who sees a cat upside down still knows it's a cat.",
  },
  {
    difficulty: 'Hard',
    tag: 'Myth bust',
    stopTitle: 'Beyond Classification',
    question: `"Computer vision is limited to classifying images into categories."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Modern computer vision does far more. Object detection identifies multiple objects and their locations. Semantic segmentation labels every pixel. Pose estimation tracks body position. Depth estimation infers 3D structure from 2D images. These capabilities power self-driving cars, medical imaging, robotics, and augmented reality.",
  },
  {
    difficulty: 'Hard',
    tag: 'Big idea',
    stopTitle: 'The World As Data',
    question: `"The spread of computer vision technology creates both significant potential benefits and significant surveillance risks."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Every camera is potentially a sensor feeding AI systems. This creates real benefits — earlier cancer detection, safer roads, more accessible technology for visually impaired people. It also creates surveillance infrastructure that can monitor populations at scale. The technology doesn't determine which outcome happens. The people deploying it do.",
  },
]

export default function Lesson13() {
  return <LessonTemplate id={13} title="Computer Vision" stops={STOPS} questions={QUESTIONS} />
}
