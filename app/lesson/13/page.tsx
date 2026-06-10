import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

export const STOPS: Stop[] = [
  {
    tag: "Myth bust",
    title: "Recognizing Is Not the Same as Understanding",
    body: "When an AI system identifies a cat in a photo, it is not seeing the cat in the same way a person does. It is analyzing patterns in the image and comparing them to patterns learned during training. This distinction matters. A system may classify an image correctly without understanding what a cat is, how it behaves, or what it would be like to interact with one. Computer vision can be extremely useful, but recognition and understanding are not the same thing.",
  },
  {
    tag: "Example",
    title: "How Images Become Data",
    body: "A digital image is made up of pixels arranged in a grid. In a standard color image, each pixel is represented by values for red, green, and blue. A 1,000-by-1,000-pixel image contains millions of numerical values. A computer-vision system processes those values and looks for patterns that help it answer a question: What objects are present? Where are they located? What is happening in the image? The image begins as numbers. The useful patterns are learned from data.",
  },
  {
    tag: "Example",
    title: "Convolutional Neural Networks",
    body: "One influential approach to computer vision is the convolutional neural network, often shortened to CNN. A CNN uses small filters that move across an image and respond to certain visual patterns. Early layers may detect edges, lines, or textures. Later layers can combine those signals into more complex features. The same filter can be used in different parts of the image. This is called weight sharing. It allows the network to recognize a useful pattern whether it appears near the top, bottom, or side of an image.",
  },
  {
    tag: "Hot take",
    title: "Where It Can Struggle",
    body: "Computer-vision systems can make mistakes when an image differs from the examples they encountered during training. A change in lighting, an unusual camera angle, a blurry image, or an unfamiliar background may affect the result. Researchers have also created adversarial examples: images altered in carefully designed ways that can cause some systems to make incorrect predictions. These examples show that a model may rely on patterns that are different from the ones a human notices.",
  },
  {
    tag: "Fact",
    title: "Where It Works Well",
    body: "Computer vision performs well in many specific settings. It can help identify defects in manufactured products, analyze medical images, read text from documents, unlock phones, and describe images for people with visual impairments. Its reliability depends on the task, the quality of the training data, and the conditions in which it is used. A system tested on clear images in a controlled setting may not perform equally well in every real-world situation.",
  },
  {
    tag: "Scenario",
    title: "Facial Recognition",
    body: "Facial recognition is one application of computer vision. It can be used for phone unlocking, identity verification, airport screening, and law-enforcement searches. These uses do not all carry the same risks. A mistake when unlocking a phone is different from a mistake in a police investigation. Researchers and government agencies have documented differences in accuracy across demographic groups in some facial-recognition systems. Performance can vary depending on the system, the dataset, the image quality, and the way the technology is used. These differences matter when a tool affects someone's privacy, freedom, or access to services.",
  },
  {
    tag: "Example",
    title: "Beyond Image Classification",
    body: "Computer vision does more than assign a label to an image. Object detection identifies objects and shows where they appear. Semantic segmentation assigns categories to different parts of an image. Pose estimation tracks the position of a person's body. Depth estimation helps infer the distance between objects. Video analysis follows movement across multiple frames. These tools are used in fields such as medicine, robotics, manufacturing, accessibility, and augmented reality.",
  },
  {
    tag: "Big idea",
    title: "Cameras Can Become Sensors",
    body: "Computer vision allows cameras to do more than record images. A camera can become a sensor that feeds information into a system capable of identifying patterns at a large scale. This can create real benefits. It can help researchers study satellite images, assist doctors reviewing scans, or improve accessibility tools. It also raises serious questions about privacy and surveillance. A system that can process large numbers of images quickly can be used to monitor people as well as help them. The impact depends on who deploys the technology, what rules govern its use, and whether people can challenge the decisions it makes.",
  },
]

export const QUESTIONS: Question[] = [
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `When an AI system labels an image as a cat, it necessarily understands what a cat is in the same way a person does.`,
    answer: false,
    verdict: "Correct.",
    explanation: "A computer-vision system can identify patterns associated with cats without having human-like knowledge or experience. Recognition is not automatically the same as understanding.",
  },
  {
    difficulty: "Easy",
    tag: "Example",
    stopTitle: '',
    question: `A digital image can be represented as a grid of numerical pixel values.`,
    answer: true,
    verdict: "Correct.",
    explanation: "In a standard color image, pixels contain values for red, green, and blue. A computer-vision system processes those values to identify useful patterns.",
  },
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `Computer-vision systems perform equally well in every situation.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Performance can change when lighting, image quality, camera angles, or backgrounds differ from the conditions represented in the training data.",
  },
  {
    difficulty: "Medium",
    tag: "Scenario",
    stopTitle: '',
    question: `Some facial-recognition systems have shown differences in accuracy across demographic groups.`,
    answer: true,
    verdict: "Correct.",
    explanation: "The size of the differences varies by system and setting. This is especially important when facial recognition is used in high-stakes situations such as law enforcement or identity verification.",
  },
  {
    difficulty: "Medium",
    tag: "Example",
    stopTitle: '',
    question: `Convolutional neural networks can apply the same filter across different parts of an image.`,
    answer: true,
    verdict: "Correct.",
    explanation: "This is called weight sharing. It allows a CNN to respond to a useful visual pattern in different locations rather than learning a completely separate detector for every part of an image.",
  },
  {
    difficulty: "Medium",
    tag: "Hot take",
    stopTitle: '',
    question: `Carefully designed changes to an image can sometimes cause a computer-vision system to make an incorrect prediction.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Researchers have created adversarial examples that confuse some models. These examples help researchers study the differences between the patterns a model uses and the features a person notices.",
  },
  {
    difficulty: "Hard",
    tag: "Myth bust",
    stopTitle: '',
    question: `Computer vision is limited to assigning one label to an entire image.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Computer vision can also locate objects, label different regions of an image, estimate depth, track movement, and analyze video.",
  },
  {
    difficulty: "Hard",
    tag: "Big idea",
    stopTitle: '',
    question: `The spread of computer-vision technology creates both useful applications and privacy risks.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Computer vision can support medicine, accessibility, science, and safety. It can also make large-scale surveillance easier. The effects depend on how the technology is designed, regulated, and used.",
  },
]

export default function Lesson13() {
  return <LessonTemplate id={13} title="Computer Vision" stops={STOPS} questions={QUESTIONS} />
}
