import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

const STOPS: Stop[] = [
  {
    tag: 'Fact',
    title: 'Depth Changes Everything',
    body: "A shallow {{neuralNetwork}} has one or two layers between input and output. A deep {{neuralNetwork}} has many: sometimes hundreds. The difference isn't just size. Each layer learns to represent the world at a different level of abstraction. Shallow networks can learn simple patterns. Deep networks can learn concepts. The word \"deep\" in {{deepLearning}} refers to this depth of layers. It's the thing that changed AI from a promising research area into something that actually works.",
  },
  {
    tag: 'Example',
    title: 'What Each Layer Sees',
    body: "In a deep image recognition network, layer 1 detects raw edges and gradients. Layer 2 combines edges into corners and curves. Layer 3 combines curves into shapes. Layer 4 combines shapes into object parts. Layer 5 combines parts into objects. Nobody designed this hierarchy. It emerged from training. The network built its own understanding of visual structure, layer by layer, from raw pixels up to meaning.",
  },
  {
    tag: 'Hot take',
    title: 'The 2012 Moment',
    body: "Before 2012 the best image recognition systems used hand-crafted features: researchers manually designed what the system should look for. {{alexnet}}, the {{deepLearning}} system that won the 2012 {{imagenet}} competition, used none of that. It learned its own features from scratch. And it won by such a large margin that the entire field switched approaches almost overnight. A decade of hand-crafted feature engineering was abandoned in a year.",
  },
  {
    tag: 'Fact',
    title: 'Why It Needed GPUs',
    body: "Deep learning requires enormous amounts of matrix multiplication: the same operation, over and over, on large grids of numbers. CPUs are designed for complex varied tasks. GPUs were designed for graphics: repeating the same simple calculation millions of times simultaneously. It turned out that GPUs were perfect for deep learning. The availability of cheap, powerful GPUs in the 2010s is one of the main reasons deep learning exploded when it did. Gaming hardware accidentally unlocked modern AI.",
  },
  {
    tag: 'Example',
    title: 'Transfer Learning',
    body: "Training a deep network from scratch takes enormous data and compute. Transfer learning is a shortcut: take a network already trained on a large general dataset, then fine-tune it on your specific smaller dataset. The network already knows edges, shapes, and objects. You just teach it your particular task on top of that foundation. Most practical AI applications today use transfer learning. Training from scratch is something mostly large research labs bother with.",
  },
  {
    tag: 'Myth bust',
    title: "More Layers Isn't Always Better",
    body: "Adding more layers doesn't always improve performance. Too many layers and the error signal from backpropagation fades before it reaches the early layers. They stop learning. This is the vanishing gradient problem and it stumped researchers for years. The solution, residual connections that let the error signal skip layers, was discovered in 2015 and enabled networks hundreds of layers deep. Modern networks can have over a thousand layers. Without residual connections they would be untrainable.",
  },
  {
    tag: 'Scenario',
    title: "What Deep Learning Can Do That Shallow Learning Can't",
    body: "A shallow network can learn to detect spam email. A deep network can learn to understand context. That the same sentence means something different depending on what came before it. A shallow network can classify images into categories. A deep network can describe what's happening in an image in natural language. The qualitative leap from shallow to deep isn't just better performance on the same tasks. It's the ability to do tasks that were previously impossible.",
  },
  {
    tag: 'Big idea',
    title: 'Representations All The Way Down',
    body: "The key insight of deep learning is that useful representations of the world can be learned from data rather than designed by hand. The network doesn't need to be told what a face looks like or what makes a sentence grammatical. Given enough data and enough layers it will discover representations that capture these things. This is why deep learning generalized across so many domains: vision, language, audio, games, science. The same basic approach works everywhere because representations are everywhere.",
  },
]

const QUESTIONS: Question[] = [
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: 'Depth Changes Everything',
    question: `"Deep learning refers to AI systems that think more deeply than humans."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Deep refers to depth of layers: the number of layers between input and output in a neural network. A deep network has many layers. Each layer finds more abstract patterns in the previous layer's output. The depth is architectural, not cognitive.",
  },
  {
    difficulty: 'Easy',
    tag: 'Example',
    stopTitle: 'What Each Layer Sees',
    question: `"In a deep image recognition network each layer learns to detect increasingly abstract features."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Layer 1 detects edges. Layer 2 combines edges into shapes. Layer 3 combines shapes into object parts. Layer 4 combines parts into objects. Nobody designed this hierarchy. It emerged from training. The network built its own understanding of visual structure from the bottom up.",
  },
  {
    difficulty: 'Easy',
    tag: 'Hot take',
    stopTitle: 'The 2012 Moment',
    question: `"AlexNet won the 2012 ImageNet competition by using hand-crafted features designed by researchers."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "That's exactly what AlexNet didn't do, and why it won. Previous systems used hand-crafted features. AlexNet learned its own features from scratch using deep learning and won by such a large margin that the entire field switched approaches almost overnight.",
  },
  {
    difficulty: 'Medium',
    tag: 'Fact',
    stopTitle: 'Why It Needed GPUs',
    question: `"GPUs became important for deep learning because they were designed to repeat simple calculations millions of times simultaneously."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "CPUs are designed for complex varied tasks. GPUs were designed for graphics: repeating the same simple calculation on large grids of numbers simultaneously. Deep learning requires exactly this: enormous amounts of matrix multiplication. Gaming hardware accidentally unlocked modern AI.",
  },
  {
    difficulty: 'Medium',
    tag: 'Myth bust',
    stopTitle: 'Transfer Learning',
    question: `"Transfer learning means training a network completely from scratch on a new dataset."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Transfer learning is the opposite: take a network already trained on a large general dataset and fine-tune it on your specific smaller dataset. The network already knows edges, shapes, and objects. You just teach it your particular task on top of that foundation. It's why most practical AI applications don't require Google-scale resources.",
  },
  {
    difficulty: 'Medium',
    tag: 'Myth bust',
    stopTitle: "More Layers Isn't Always Better",
    question: `"Adding more layers to a neural network always improves its performance."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Too many layers and the error signal fades before it reaches early layers. They stop learning. This is the vanishing gradient problem. The solution, residual connections that let error signals skip layers, was discovered in 2015 and enabled networks hundreds of layers deep. Without it modern deep networks would be untrainable.",
  },
  {
    difficulty: 'Hard',
    tag: 'Big idea',
    stopTitle: 'Representations All The Way Down',
    question: `"The key insight of deep learning is that useful representations of the world can be learned from data rather than designed by hand."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "This is why deep learning generalized across so many domains: vision, language, audio, games, science. The same basic approach works everywhere because representations are everywhere. You don't need to tell the network what to look for. Given enough data and enough layers it will figure it out.",
  },
  {
    difficulty: 'Hard',
    tag: 'Scenario',
    stopTitle: "What Deep Learning Can Do That Shallow Learning Can't",
    question: `"Deep networks can only do things that shallow networks can do, just more accurately."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "The leap from shallow to deep isn't just better performance on the same tasks. It's the ability to do tasks that were previously impossible. A shallow network can classify images. A deep network can describe what's happening in an image in natural language. The qualitative difference is not incremental. It's categorical.",
  },
]

export default function Lesson10() {
  return <LessonTemplate id={10} title="Deep Learning" stops={STOPS} questions={QUESTIONS} />
}
