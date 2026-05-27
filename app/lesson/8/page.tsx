import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

const STOPS: Stop[] = [
  {
    tag: 'Myth bust',
    title: 'Not Magic, Just Math',
    body: "A neural network sounds like science fiction. It isn't. It's a mathematical system loosely inspired by how your brain works — billions of simple calculations happening simultaneously, organized in layers, producing an output. The word \"neural\" makes it sound alive. It isn't. It's a very large, very organized system of math that learned something. Every AI product you use today runs on some version of this.",
  },
  {
    tag: 'Fact',
    title: 'Your Brain First',
    body: "Your brain has about 86 billion neurons. Each one receives signals from thousands of others, processes them, and either fires or doesn't. When you learned to read, certain neurons fired together so often that the connection strengthened permanently. That's literally what learning is in your brain — connections getting stronger or weaker based on use. AI borrowed this idea. Just the idea.",
  },
  {
    tag: 'Example',
    title: 'The Artificial Neuron',
    body: "An artificial neuron does one thing: takes a bunch of numbers in, multiplies each by a weight, adds them up, and outputs a number. That's it. One neuron is trivial and useless. Stack millions of them in layers, connect them, and train them on enough data — now patterns emerge that nobody programmed and nobody fully understands. The intelligence isn't in any single neuron. It's in the connections.",
  },
  {
    tag: 'Example',
    title: 'The Layers',
    body: "Neural networks are organized in layers. The first layer receives raw input — pixels, words, numbers. Each subsequent layer finds more abstract patterns in the previous layer's output. In an image recognition network, early layers detect edges. Middle layers detect shapes. Later layers detect objects. Nobody told it to organize this way. It figured it out during training. That emergence is what makes neural networks so powerful and so hard to interpret.",
  },
  {
    tag: 'Hot take',
    title: 'Inspired By But Not Like Your Brain',
    body: "Neural networks are often described as working like the human brain. This is misleading. Your brain has 86 billion neurons with 100 trillion connections, runs on 20 watts of power, learns from a handful of examples, and generalizes across completely different domains instantly. Current neural networks need millions of examples, thousands of watts, and fall apart outside their training. The inspiration was real. The similarity ends there.",
  },
  {
    tag: 'Fact',
    title: 'The Weights Are Everything',
    body: "Every connection between neurons has a weight — a number that determines how much influence one neuron has on the next. A freshly created network has random weights and produces random outputs. Training is the process of adjusting those weights millions of times until the network produces correct outputs. The entire knowledge of a trained neural network lives in its weights. Change the weights and you change what it knows. Delete the weights and everything it learned is gone.",
  },
  {
    tag: 'Scenario',
    title: 'What Actually Happens When You Use ChatGPT',
    body: "When ChatGPT answers your question, billions of weights are applied across hundreds of layers in milliseconds. Each layer transforms the input slightly — from raw text to something more abstract, then more abstract again. By the final layer the network has gone from your words to a probability distribution over every possible next word. It picks the most likely one. Then does it again. That's the whole thing. Billions of multiplications, running very fast.",
  },
  {
    tag: 'Big idea',
    title: 'Simple Units, Emergent Complexity',
    body: "The most important thing about neural networks: none of the individual pieces are intelligent. Each neuron does trivial math. Each layer does slightly more complex math. But somewhere in the combination of millions of trivial operations, behavior emerges that looks like understanding, creativity, and reasoning. Whether that appearance is the real thing is the question nobody can answer yet. That gap — between what neural networks do and what they seem to do — is where most of the important debates about AI live.",
  },
]

const QUESTIONS: Question[] = [
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: 'Not Magic, Just Math',
    question: `"A neural network is a type of robot brain that thinks like a human."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "A neural network is a mathematical system — organized layers of simple calculations. The word \"neural\" makes it sound alive. It isn't. It's math running very fast on very large amounts of data. The similarity to a human brain is inspirational, not structural.",
  },
  {
    difficulty: 'Easy',
    tag: 'Fact',
    stopTitle: 'The Weights Are Everything',
    question: `"Every connection between neurons in a neural network has a weight that determines its influence."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Weights are everything in a neural network. A fresh network has random weights and produces random outputs. Training is the process of adjusting those weights until the network produces correct outputs. The entire knowledge of a trained network lives in its weights.",
  },
  {
    difficulty: 'Easy',
    tag: 'Example',
    stopTitle: 'The Artificial Neuron',
    question: `"A single artificial neuron can recognize faces on its own."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "A single neuron does trivial math — takes numbers in, multiplies by weights, outputs a number. It's useless alone. Stack millions of neurons in layers and connect them and something remarkable emerges. The intelligence isn't in any single neuron. It's in the structure of the connections.",
  },
  {
    difficulty: 'Medium',
    tag: 'Example',
    stopTitle: 'The Layers',
    question: `"Neural networks organize their layers into meaningful hierarchies during training — even though nobody programs that hierarchy."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "In image recognition networks, early layers detect edges, middle layers detect shapes, later layers detect objects. Nobody designed this. It emerged from training. The network built its own understanding of visual structure from raw pixels up to meaning.",
  },
  {
    difficulty: 'Medium',
    tag: 'Hot take',
    stopTitle: 'Inspired By But Not Like Your Brain',
    question: `"Neural networks work exactly like the human brain."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "The inspiration was real — the similarity ends there. Your brain has 86 billion neurons with 100 trillion connections, runs on 20 watts, and learns from a handful of examples. Current neural networks need millions of examples, thousands of watts, and fall apart outside their training. Inspired by the brain. Not the same as the brain.",
  },
  {
    difficulty: 'Medium',
    tag: 'Scenario',
    stopTitle: 'What Actually Happens When You Use ChatGPT',
    question: `"When ChatGPT answers a question it applies billions of weights across hundreds of layers in milliseconds."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Every response involves enormous computation happening incredibly fast. Each layer transforms the input slightly — from your words to something more abstract, then more abstract again — until the final layer produces a probability over every possible next word. That's the whole thing. Billions of multiplications, running very fast.",
  },
  {
    difficulty: 'Hard',
    tag: 'Big idea',
    stopTitle: 'Simple Units, Emergent Complexity',
    question: `"Because neural networks are made of simple mathematical units, experts can easily explain why they produce any specific output."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "This is the black box problem. The knowledge of a trained network is distributed across billions of weights simultaneously. Nobody can look at a weight and say this one is responsible for detecting ears. The network learned something. We can verify it learned. We cannot fully see what or why.",
  },
  {
    difficulty: 'Hard',
    tag: 'Big idea',
    stopTitle: 'Simple Units, Emergent Complexity',
    question: `"The intelligence in a neural network emerges from the combination of millions of simple operations rather than from any single component."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "This is the most important thing about neural networks. None of the individual pieces are intelligent. Each neuron does trivial math. But somewhere in the combination of millions of trivial operations, behavior emerges that looks like understanding and reasoning. Whether that appearance is the real thing is the question nobody can answer yet.",
  },
]

export default function Lesson8() {
  return <LessonTemplate id={8} title="What Is A Neural Network" stops={STOPS} questions={QUESTIONS} />
}
