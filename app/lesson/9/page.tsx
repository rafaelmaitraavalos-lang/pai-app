import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

const STOPS: Stop[] = [
  {
    tag: 'Myth bust',
    title: "It Wasn't Programmed",
    body: "When a neural network learns to recognize your face, nobody wrote rules about faces. Nobody described cheekbones or eye spacing. The network was shown millions of labeled examples and adjusted itself until it got them right. This is the fundamental shift from traditional software to AI. Traditional software does what it's told. Neural networks figure it out. The difference sounds subtle. It changes everything about how they work and why they fail.",
  },
  {
    tag: 'Example',
    title: 'The Forward Pass',
    body: "Training starts with a forward pass. You feed the network an input: say, a photo of a cat. The data travels through every layer, each neuron applying its weights. At the end the network produces an output. In this case, its guess about what's in the photo. On the first attempt with random weights, that guess is basically random. Maybe it says \"truck.\" That's fine. That's where training begins.",
  },
  {
    tag: 'Example',
    title: 'The Error Signal',
    body: "After the forward pass the network compares its output to the correct answer. It said \"truck.\" The correct answer was \"cat.\" The difference between those two things is the error. The bigger the error, the more the network needs to adjust. This error signal is the entire engine of learning. Without knowing how wrong it is, the network has no direction to improve. The error is not a failure. It's information.",
  },
  {
    tag: 'Example',
    title: 'Backpropagation',
    body: "Once the error is calculated, the network works backwards, layer by layer, adjusting each weight slightly in the direction that would have produced a smaller error. This is called backpropagation. It's the algorithm that makes neural networks trainable. It was described mathematically in the 1970s but nobody thought it would work at scale. In 2012 it turned out to work spectacularly at scale. Most of modern AI runs on it.",
  },
  {
    tag: 'Hot take',
    title: 'Millions Of Times',
    body: "One forward pass and one backpropagation step adjusts the network a tiny amount. To actually learn something useful the network needs to run this cycle millions or billions of times across millions of examples. Training a large language model like GPT-4 takes months on thousands of specialized processors running continuously. The electricity cost alone is millions of dollars. The environmental cost is significant and rarely discussed. Learning at this scale is not cheap.",
  },
  {
    tag: 'Fact',
    title: 'Overfitting',
    body: "A network that trains too long on the same data memorizes it instead of learning from it. It gets perfect scores on training data and falls apart on anything new. This is called overfitting. It's one of the most common problems in AI development. The fix is testing the network on data it has never seen during training: if performance drops dramatically, it overfit. Avoiding overfitting requires careful judgment about when to stop training.",
  },
  {
    tag: 'Scenario',
    title: 'What The Network Actually Learns',
    body: "After millions of training cycles on labeled images, a network has adjusted billions of weights into a configuration that reliably distinguishes cats from trucks. Nobody knows exactly why those specific weights work. Nobody can look at a weight and say \"this one is responsible for detecting ears.\" The knowledge is distributed across billions of numbers in a way that works but cannot be read. The network learned something. We can verify it learned. We cannot see what.",
  },
  {
    tag: 'Big idea',
    title: 'Learning Without A Teacher',
    body: "Backpropagation requires labeled data: someone has to say this is a cat, this is spam, this loan defaulted. For every large AI system someone had to label enormous amounts of data first. That labor is invisible in the final product. But researchers have also developed ways for networks to learn from unlabeled data: finding patterns without being told what they mean. The boundary between supervised and unsupervised learning is where some of the most interesting AI research is happening right now.",
  },
]

const QUESTIONS: Question[] = [
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: "It Wasn't Programmed",
    question: `"Neural networks are programmed with rules for every decision they make."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Traditional software is programmed with rules. Neural networks learn from examples. Nobody programmed Face ID with rules about faces. It was shown millions of labeled faces and adjusted itself until it got them right. That distinction changes everything about how they work and why they fail.",
  },
  {
    difficulty: 'Easy',
    tag: 'Example',
    stopTitle: 'The Error Signal',
    question: `"The error signal in training tells the network how wrong its output was."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "After every forward pass the network compares its output to the correct answer. The difference is the error. The bigger the error the more the network needs to adjust. Without knowing how wrong it is the network has no direction to improve. The error is not a failure. It's information.",
  },
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: "It Wasn't Programmed",
    question: `"AlphaGo was programmed with chess strategies by expert players."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Two things wrong: AlphaGo plays Go not chess, and it wasn't programmed with strategies at all. It used reinforcement learning: playing itself millions of times, receiving feedback, discovering its own strategies. It invented moves that human players had never considered in centuries of playing the game.",
  },
  {
    difficulty: 'Medium',
    tag: 'Example',
    stopTitle: 'Backpropagation',
    question: `"Backpropagation works by adjusting each weight in the direction that would have produced a smaller error."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "After the error is calculated the network works backwards layer by layer, adjusting each weight slightly. This is backpropagation. It was described mathematically in the 1970s but nobody thought it would work at scale. In 2012 it turned out to work spectacularly. Most of modern AI runs on it.",
  },
  {
    difficulty: 'Medium',
    tag: 'Hot take',
    stopTitle: 'Millions Of Times',
    question: `"Training a large language model like GPT-4 is cheap and fast."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Training takes months on thousands of specialized processors running continuously. The electricity cost alone is millions of dollars. The environmental cost is significant and rarely discussed. What feels like a free product required extraordinary resources to create. Learning at this scale is not cheap.",
  },
  {
    difficulty: 'Medium',
    tag: 'Fact',
    stopTitle: 'Overfitting',
    question: `"Overfitting happens when a network memorizes training data instead of learning from it."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "A network that trains too long on the same data gets perfect scores on that data and falls apart on anything new. It memorized rather than generalized. The fix is testing on data the network never saw during training. If performance drops dramatically, it overfit. Knowing when to stop training is as important as the training itself.",
  },
  {
    difficulty: 'Hard',
    tag: 'Scenario',
    stopTitle: 'What The Network Actually Learns',
    question: `"After training, experts can read a network's weights and understand exactly what it learned."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "The knowledge is distributed across billions of numbers in a way that works but cannot be read. Nobody can look at a weight and say this is responsible for understanding sarcasm or detecting a cat's ear. The network learned something. We can verify it learned. We cannot see what.",
  },
  {
    difficulty: 'Hard',
    tag: 'Big idea',
    stopTitle: 'Learning Without A Teacher',
    question: `"Labeled training data requires human labor: someone has to label every example before the network can learn from it."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "In supervised learning every example needs a label. Millions of examples means millions of labels. Much of that work is done by low-paid contractors in developing countries whose labor makes the AI products you use possible. This invisible workforce is one of the least discussed parts of AI development.",
  },
]

export default function Lesson9() {
  return <LessonTemplate id={9} title="How Networks Train" stops={STOPS} questions={QUESTIONS} />
}
