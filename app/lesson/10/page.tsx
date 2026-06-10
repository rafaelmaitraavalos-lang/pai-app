import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

export const STOPS: Stop[] = [
  {
    tag: "Fact",
    title: "What \"Deep\" Means",
    body: "A neural network is made up of layers. The input enters one end of the network, passes through a series of transformations, and produces an output at the other end. A shallow network has relatively few layers. A deep network has many more. The word \"deep\" refers to this depth of layers, not to the system thinking more deeply. Additional layers can help a network learn more complex patterns, although simply adding more layers does not automatically make a model better.",
  },
  {
    tag: "Example",
    title: "What the Layers Learn",
    body: "In an image-recognition network, different layers may respond to different kinds of visual information. Early layers often detect simple features such as edges, lines, or textures. Later layers can combine those signals into more complex patterns. For example, one layer might respond to curved lines, while a later layer responds to combinations of features that are useful for recognizing part of an object. The exact internal representations vary from one model to another, but the general idea is that later layers build on earlier ones.",
  },
  {
    tag: "Turning point",
    title: "AlexNet and ImageNet",
    body: "In 2012, a deep neural network called AlexNet performed extremely well in the ImageNet image-recognition competition. Earlier systems often relied heavily on features designed by researchers. AlexNet showed how effective it could be to let a neural network learn useful features from data during training. Its success helped convince researchers and companies to invest much more heavily in deep learning. AlexNet was not the beginning of neural networks, but it became an important turning point in the field.",
  },
  {
    tag: "Fact",
    title: "Why GPUs Helped",
    body: "Training a deep neural network requires many calculations, especially operations involving large groups of numbers arranged in matrices. GPUs were originally developed for graphics, where a computer has to perform many similar calculations at the same time. That made them well suited for deep learning. Improvements in computing hardware, along with larger datasets and better training methods, helped make deep learning much more practical.",
  },
  {
    tag: "Example",
    title: "Transfer Learning",
    body: "Training a deep neural network from the beginning can require a large amount of data and computing power. Transfer learning provides another option. A developer can start with a network that has already been trained on a broad dataset and adapt it for a more specific task. For example, a model that has learned general visual patterns may be fine-tuned to classify medical images or identify plant species. The model does not start from zero, so it may need less task-specific data.",
  },
  {
    tag: "Myth bust",
    title: "More Layers Are Not Always Better",
    body: "Adding more layers can create new challenges. In some networks, the signal used to update the early layers becomes weaker as it moves backward through the model. This is known as the vanishing-gradient problem. Researchers have developed several ways to address this. One important advance was the use of residual connections, which allow information to skip over certain layers. These connections made it easier to train very deep networks effectively. Still, depth is only one part of a model's design.",
  },
  {
    tag: "Scenario",
    title: "Why Depth Can Help",
    body: "Imagine a network analyzing a photograph. A simple model might detect basic patterns in the pixels. A deeper model can combine information across multiple layers and represent more complicated relationships. Depth helps, but it is not magic. A deeper network has more room to represent complicated patterns; it does not automatically become better at every task.",
  },
  {
    tag: "Big idea",
    title: "Learning Useful Representations",
    body: "One of the major ideas behind deep learning is that a network can learn useful internal representations from data. A programmer does not have to describe every feature the system should look for by hand. This approach has been useful across image recognition, language processing, audio, games, and scientific research. The same basic principle appears in many settings: a network learns patterns that help it perform a particular task, even when those patterns are not written out as a simple list of rules.",
  },
]

export const QUESTIONS: Question[] = [
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `Deep learning refers to AI systems that think more deeply than humans.`,
    answer: false,
    verdict: "Correct.",
    explanation: "The word \"deep\" refers to the number of layers in a neural network. It describes the structure of the model, not the depth of its thoughts.",
  },
  {
    difficulty: "Easy",
    tag: "Example",
    stopTitle: '',
    question: `In some image-recognition networks, later layers combine simpler visual features into more complex patterns.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Early layers may respond to edges, lines, or textures. Later layers can combine those signals into patterns that are useful for recognizing more complicated features.",
  },
  {
    difficulty: "Easy",
    tag: "Turning point",
    stopTitle: '',
    question: `AlexNet helped draw much more attention to deep learning after its success in the 2012 ImageNet competition.`,
    answer: true,
    verdict: "Correct.",
    explanation: "AlexNet showed that deep neural networks could perform extremely well on a major image-recognition task. Its success encouraged much wider interest in deep-learning methods.",
  },
  {
    difficulty: "Medium",
    tag: "Fact",
    stopTitle: '',
    question: `GPUs became useful for deep learning because they can perform many similar calculations at the same time.`,
    answer: true,
    verdict: "Correct.",
    explanation: "GPUs were originally designed for graphics, but their ability to perform many calculations in parallel also makes them useful for training neural networks.",
  },
  {
    difficulty: "Medium",
    tag: "Myth bust",
    stopTitle: '',
    question: `Transfer learning means training a model entirely from scratch on a new dataset.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Transfer learning starts with a model that has already learned useful patterns from earlier training. Developers then adapt that model for a more specific task.",
  },
  {
    difficulty: "Medium",
    tag: "Myth bust",
    stopTitle: '',
    question: `Adding more layers always improves a neural network.`,
    answer: false,
    verdict: "Correct.",
    explanation: "More layers can help with complex tasks, but they can also make a model harder to train. The quality of a neural network depends on many choices, not just its depth.",
  },
  {
    difficulty: "Hard",
    tag: "Fact",
    stopTitle: '',
    question: `Residual connections can make very deep neural networks easier to train.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Residual connections allow information to skip over certain layers. This can help reduce some of the difficulties that appear when training deeper networks.",
  },
  {
    difficulty: "Hard",
    tag: "Big idea",
    stopTitle: '',
    question: `One important feature of deep learning is that a network can learn useful representations from data rather than relying only on features designed by hand.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Instead of giving the network a complete list of features to search for, developers can train it on data and allow useful internal patterns to develop during the training process.",
  },
]

export default function Lesson10() {
  return <LessonTemplate id={10} title="Deep Learning" stops={STOPS} questions={QUESTIONS} />
}
