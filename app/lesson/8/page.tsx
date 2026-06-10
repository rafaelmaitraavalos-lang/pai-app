import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

export const STOPS: Stop[] = [
  {
    tag: "Myth bust",
    title: "Not Magic, Just Math",
    body: "The phrase \"neural network\" sounds more mysterious than it needs to. A neural network is a mathematical system that learns patterns from data. It is made up of many small calculations organized into layers. The name comes from an early comparison to the brain, but artificial neural networks are not miniature brains. They are mathematical models. Many of the AI tools people use today rely on some form of neural network.",
  },
  {
    tag: "Fact",
    title: "The Inspiration Came from the Brain",
    body: "The human brain contains roughly 86 billion neurons. Neurons communicate through electrical and chemical signals, and the strength of the connections between them can change over time. These changes are part of how the brain learns. Artificial neural networks borrow a simplified version of this idea: a system can improve by adjusting the strength of the connections between its parts. The comparison is useful, but it only goes so far. A biological neuron is much more complex than an artificial one.",
  },
  {
    tag: "Example",
    title: "The Artificial Neuron",
    body: "An artificial neuron receives a set of numbers, gives different amounts of importance to those numbers, combines them, and produces an output. One artificial neuron cannot do very much on its own. But when many of them are connected in layers and trained on data, the network can learn useful patterns. For example, it might learn to classify images, recognize speech, or predict the next token in a sentence.",
  },
  {
    tag: "Example",
    title: "The Layers",
    body: "Neural networks are organized into layers. The first layer receives the input, such as pixels in an image or tokens in a sentence. Later layers transform that information into increasingly useful representations. In some image-recognition networks, early layers respond to simple features such as edges. Later layers may respond to more complex shapes or combinations of features. The network develops these internal representations during training rather than receiving a complete list of instructions from a programmer.",
  },
  {
    tag: "Hot take",
    title: "Inspired by the Brain, Not Identical to It",
    body: "Artificial neural networks are sometimes described as if they work exactly like the human brain. That is misleading. The brain learns from experience, operates with remarkable energy efficiency, and adapts across many different situations. Artificial neural networks are built differently and usually require large amounts of data and computing power. The brain inspired the basic idea, but the two systems should not be treated as interchangeable.",
  },
  {
    tag: "Fact",
    title: "Why Weights Matter",
    body: "The connections in a neural network have values called weights. A weight affects how strongly one piece of information influences another. When a network is first created, its weights usually begin with values that do not yet represent useful patterns. During training, the system adjusts those weights so that its predictions become more accurate. Much of what a trained network has learned is represented across these adjusted values.",
  },
  {
    tag: "Scenario",
    title: "What Happens When You Use ChatGPT",
    body: "When ChatGPT responds to a question, it processes your message through a neural network. The model analyzes the sequence of tokens in the conversation and calculates probabilities for what token could come next. It then generates a response one token at a time, using the earlier tokens as context for each new prediction. The process involves a very large number of mathematical operations happening quickly. The result can feel conversational, even though the underlying process is computation.",
  },
  {
    tag: "Big idea",
    title: "Complexity Can Emerge from Simple Parts",
    body: "An individual artificial neuron performs a simple calculation. A single weight is only a number. But when many neurons and weights interact across many layers, the network can produce surprisingly complex behavior. This is one reason neural networks are both useful and difficult to interpret. Researchers can measure how well a network performs, but it is often much harder to explain exactly why the network produced one particular answer.",
  },
]

export const QUESTIONS: Question[] = [
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `A neural network is a digital version of the human brain.`,
    answer: false,
    verdict: "Correct.",
    explanation: "A neural network is a mathematical model loosely inspired by certain ideas about how the brain learns. Artificial neurons are much simpler than biological neurons, and the overall systems work very differently.",
  },
  {
    difficulty: "Easy",
    tag: "Fact",
    stopTitle: '',
    question: `A neural network is made up of connected mathematical units organized into layers.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Artificial neurons receive numbers, combine them using weights, and produce outputs. By connecting many of these units in layers, a network can learn patterns from data.",
  },
  {
    difficulty: "Easy",
    tag: "Example",
    stopTitle: '',
    question: `A single artificial neuron can recognize a face on its own.`,
    answer: false,
    verdict: "Correct.",
    explanation: "One artificial neuron performs a limited calculation. More complex tasks require many connected units working together across multiple layers.",
  },
  {
    difficulty: "Medium",
    tag: "Example",
    stopTitle: '',
    question: `In some image-recognition networks, early layers respond to simpler visual features while later layers respond to more complex patterns.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Early layers may respond to features such as edges or textures. Later layers can combine those signals into more complex representations. These patterns develop during training.",
  },
  {
    difficulty: "Medium",
    tag: "Myth bust",
    stopTitle: '',
    question: `Artificial neural networks work exactly like the human brain.`,
    answer: false,
    verdict: "Correct.",
    explanation: "The brain inspired the concept, but the comparison has limits. Human brains and artificial neural networks differ in their structure, efficiency, complexity, and ability to learn from experience.",
  },
  {
    difficulty: "Medium",
    tag: "Fact",
    stopTitle: '',
    question: `Training a neural network involves adjusting its weights.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Weights determine how strongly different signals affect the network's output. During training, the system adjusts those values to improve its predictions.",
  },
  {
    difficulty: "Hard",
    tag: "Scenario",
    stopTitle: '',
    question: `When ChatGPT responds to a question, it generates the response one token at a time.`,
    answer: true,
    verdict: "Correct.",
    explanation: "The model calculates probabilities for possible next tokens based on the conversation so far. It selects a token, adds it to the sequence, and repeats the process.",
  },
  {
    difficulty: "Hard",
    tag: "Big idea",
    stopTitle: '',
    question: `Because neural networks are made of mathematical operations, experts can always explain exactly why a specific output appeared.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Researchers can inspect parts of a network and test its behavior, but a network's learned patterns are often distributed across many weights and layers. This can make individual outputs difficult to explain fully.",
  },
]

export default function Lesson8() {
  return <LessonTemplate id={8} title="What Is A Neural Network" stops={STOPS} questions={QUESTIONS} />
}
