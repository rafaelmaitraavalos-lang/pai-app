import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

export const STOPS: Stop[] = [
  {
    tag: "Myth bust",
    title: "It Wasn\u2019t Programmed Step by Step",
    body: "Traditional software usually follows rules written by programmers. A developer might tell a program exactly what to do in a certain situation: if this happens, then do that. Machine-learning systems work differently. Instead of receiving a complete list of rules, they learn patterns from examples. A programmer does not have to write a separate instruction for every face your phone might recognize or every song a music app might recommend. This makes AI systems flexible, but it can also make their decisions harder to explain.",
  },
  {
    tag: "Example",
    title: "Supervised Learning",
    body: "Imagine showing an AI system thousands of photos. Some are labeled \u201ccat,\u201d and others are labeled \u201cnot cat.\u201d During training, the system adjusts its internal settings until it becomes better at predicting the correct label. Then you give it an image it has never seen before. If the training worked, it can estimate whether the new image contains a cat. This is called supervised learning because the system learns from examples that already have labels.",
  },
  {
    tag: "Example",
    title: "Unsupervised Learning",
    body: "Not every dataset comes with labels. Sometimes a system is given a large collection of information and asked to find patterns on its own. For example, it might group similar images together or identify clusters of customers with similar shopping habits. The system does not automatically know what those groups mean. A person still has to interpret the patterns it finds. This is called unsupervised learning.",
  },
  {
    tag: "Hot take",
    title: "Training Data Matters",
    body: "The data used to train an AI system has a major influence on what the system learns. If the data is outdated, incomplete, or unrepresentative, the results may be too. A medical tool trained only on older information may miss newer research. A language model trained mostly on text from certain countries or communities may reflect those perspectives more strongly than others. The amount of data matters, but so do its quality, variety, and context.",
  },
  {
    tag: "Example",
    title: "Reinforcement Learning",
    body: "Another approach is reinforcement learning. In this type of training, a system tries different actions and receives feedback based on the results. Actions that help it reach its goal are rewarded. Actions that do not work as well receive a lower score. This approach has been used in game-playing systems. AlphaGo learned partly from human games and partly by playing against versions of itself. Later systems, such as AlphaGo Zero, relied on self-play and discovered effective strategies without starting from examples of human play.",
  },
  {
    tag: "Myth bust",
    title: "AI Is Not Trained Until It Is Perfect",
    body: "AI systems are not expected to become flawless before they are used. A developer usually evaluates whether a system is accurate and reliable enough for its intended purpose. The standard depends on the situation. A slightly inaccurate music recommendation may be harmless. A mistake in a medical tool or a loan decision can have much more serious consequences. This is why testing matters, especially when the system affects people\u2019s lives.",
  },
  {
    tag: "Hot take",
    title: "The Human Work Behind AI",
    body: "AI systems do not learn in isolation. People often collect, organize, label, review, and moderate the data used in training. They may identify objects in images, transcribe recordings, or rate whether an AI-generated response was useful. Some of this work is done by contractors whose labor is easy to overlook when people talk about AI as if it learns entirely on its own. When understanding AI, it means paying attention to the people involved at every stage, not only the final product.",
  },
  {
    tag: "Big idea",
    title: "Performance Is Not the Same as Understanding",
    body: "An AI system can become very good at a task without experiencing or understanding that task in the way a human would. It might generate a convincing paragraph about grief without having felt loss. It might identify signs of disease in an image without knowing what illness feels like. Whether human-like understanding is necessary for intelligence remains an open question. But the distinction matters: a system can nail the task and still have no idea what the task means.",
  },
]

export const QUESTIONS: Question[] = [
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `AI systems are programmed with a separate rule for every decision they make.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Traditional software often follows explicit rules. Machine-learning systems usually learn patterns from examples instead. A programmer does not need to write a separate instruction for every image, sentence, or recommendation the system may encounter.",
  },
  {
    difficulty: "Easy",
    tag: "Fact",
    stopTitle: '',
    question: `Supervised learning uses labeled examples.`,
    answer: true,
    verdict: "Correct.",
    explanation: "In supervised learning, the system trains on examples that already have correct answers. An image may be labeled \u201ccat\u201d or \u201cnot cat.\u201d An email may be labeled \u201cspam\u201d or \u201cnot spam.\u201d These labels help the system measure and improve its predictions.",
  },
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `Unsupervised learning means a system does not use any data.`,
    answer: false,
    verdict: "Correct.",
    explanation: "An unsupervised-learning system still uses data. The difference is that the data does not come with labels explaining what each example means. The system looks for patterns or groups, and people then interpret what those patterns may represent.",
  },
  {
    difficulty: "Medium",
    tag: "Hot take",
    stopTitle: '',
    question: `Adding more training data always makes an AI system more accurate.`,
    answer: false,
    verdict: "Correct.",
    explanation: "More data can help, but quantity is not the only factor. Outdated, biased, or low-quality data can create problems. A smaller, carefully chosen dataset may sometimes be more useful than a larger dataset filled with misleading examples.",
  },
  {
    difficulty: "Medium",
    tag: "Fact",
    stopTitle: '',
    question: `The training data influences what an AI system learns.`,
    answer: true,
    verdict: "Correct.",
    explanation: "AI systems learn from the examples they receive. If those examples leave out certain groups, contain old information, or reflect existing inequalities, the system may reproduce those limitations.",
  },
  {
    difficulty: "Medium",
    tag: "Myth bust",
    stopTitle: '',
    question: `The goal of AI training is always to create a perfectly accurate system.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Perfect accuracy is usually unrealistic. Developers decide whether a system is reliable enough for a specific purpose. The acceptable error rate should be much lower in high-stakes situations, such as healthcare, than in lower-stakes situations, such as music recommendations.",
  },
  {
    difficulty: "Hard",
    tag: "Fact",
    stopTitle: '',
    question: `Reinforcement learning uses feedback to help a system improve its actions.`,
    answer: true,
    verdict: "Correct.",
    explanation: "A reinforcement-learning system receives feedback based on the results of its actions. Over time, it becomes more likely to choose actions that help it reach its goal. This approach has been used in systems that play games and control robots.",
  },
  {
    difficulty: "Hard",
    tag: "Big idea",
    stopTitle: '',
    question: `An AI system can perform a task successfully without understanding it in the same way a human does.`,
    answer: true,
    verdict: "Correct.",
    explanation: "An AI system may classify an image, generate an essay, or make a recommendation without experiencing the world or understanding the meaning of the task as a person would. This is one reason discussions about AI require careful definitions of words such as \u201clearning,\u201d \u201creasoning,\u201d and \u201cunderstanding.\u201d",
  },
]

export default function Lesson5() {
  return <LessonTemplate id={5} title="How AI Learns" stops={STOPS} questions={QUESTIONS} />
}
