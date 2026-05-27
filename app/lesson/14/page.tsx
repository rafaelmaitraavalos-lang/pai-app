import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

const STOPS: Stop[] = [
  {
    tag: 'Fact',
    title: 'Nobody Fully Understands Them',
    body: "The people who build the most powerful neural networks in the world cannot fully explain how they work. They can describe the architecture. They can describe the training process. They cannot tell you why the network produces any specific output. This is not false modesty. It's a structural property of systems with billions of parameters whose knowledge is distributed across all of them simultaneously. The black box problem is real and it has serious consequences.",
  },
  {
    tag: 'Example',
    title: 'What Interpretability Means',
    body: "Interpretability research tries to open the black box, to understand what's happening inside a neural network. Some progress has been made. Researchers can identify neurons that activate for specific concepts. They can find circuits: groups of neurons that together perform identifiable operations. But these are partial explanations of small pieces of large systems. Nobody has a complete, faithful explanation of what a large model is doing when it produces any given output. The field is active. The problem is genuinely hard.",
  },
  {
    tag: 'Hot take',
    title: 'This Is Unusual In Engineering',
    body: "In most engineering, you understand what you build. A bridge engineer can calculate exactly why the bridge holds. A software engineer can read the code and trace exactly why the program behaves as it does. Neural networks are different. The behavior emerges from training in ways that can't be read back. We have systems making consequential decisions, in medicine, law, finance, that their builders cannot fully explain. This is a new situation in the history of technology. We haven't fully reckoned with it.",
  },
  {
    tag: 'Scenario',
    title: 'When It Matters',
    body: "A medical AI recommends against a treatment. A loan algorithm denies a mortgage. A hiring system rejects a candidate. In each case the person affected asks: why? The answer is almost always: the model assigned a lower score based on patterns in training data. Which patterns? We don't know exactly. What should change to get a different result? We can't say with certainty. The black box problem isn't abstract when you're the person who got denied and nobody can explain why.",
  },
  {
    tag: 'Fact',
    title: 'The EU Has Tried To Address This',
    body: "The European Union's GDPR includes a right to explanation: people affected by automated decisions are entitled to an explanation of how the decision was made. Implementing this right turns out to be technically very difficult. Current AI systems often can't produce explanations that are both faithful to their actual reasoning and comprehensible to a human. Researchers are working on this. The gap between the legal requirement and the technical capability is wide.",
  },
  {
    tag: 'Example',
    title: 'Saliency Maps',
    body: "One partial solution: saliency maps. Take an image classification network and highlight which pixels most influenced the output. If the network says \"dog\" the saliency map shows which parts of the image drove that decision. Sometimes it's reassuring, the highlighted area is the dog. Sometimes it's alarming, the highlighted area is the background, or a watermark, or something unrelated. Saliency maps give a window into the network's attention but not a full explanation of its reasoning.",
  },
  {
    tag: 'Myth bust',
    title: 'Explainable AI Solves The Problem',
    body: "There's a field called Explainable AI (XAI) devoted to making neural networks more interpretable. It has produced useful tools. It has not solved the problem. Most XAI methods produce approximations: simplified explanations that roughly capture what the network does without being fully faithful to the actual computation. Using an approximate explanation to make a high-stakes decision is better than nothing. It's not the same as actually understanding the system. That gap is real.",
  },
  {
    tag: 'Big idea',
    title: 'Power Without Understanding',
    body: "We have built systems more powerful than anything in history whose internal workings we don't fully understand, and we are deploying them to make decisions that affect people's lives. This is not an argument against neural networks. It's an argument for humility, for ongoing research into interpretability, for regulatory frameworks that require meaningful explanations, and for keeping humans in the loop on high-stakes decisions. The black box is not inevitable. It's a current limitation that we should be actively working to reduce.",
  },
]

const QUESTIONS: Question[] = [
  {
    difficulty: 'Easy',
    tag: 'Fact',
    stopTitle: 'Nobody Fully Understands Them',
    question: `"The people who build the most powerful neural networks can fully explain how they work."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "They can describe the architecture and training process. They cannot tell you why the network produces any specific output. This is not false modesty. It's a structural property of systems with billions of parameters whose knowledge is distributed across all of them simultaneously. The black box problem is real.",
  },
  {
    difficulty: 'Easy',
    tag: 'Example',
    stopTitle: 'What Interpretability Means',
    question: `"Interpretability research tries to understand what is happening inside neural networks."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Some progress has been made: researchers can identify neurons that activate for specific concepts and find circuits that perform identifiable operations. But these are partial explanations of small pieces of large systems. Nobody has a complete faithful explanation of what a large model is doing when it produces any given output.",
  },
  {
    difficulty: 'Easy',
    tag: 'Hot take',
    stopTitle: 'This Is Unusual In Engineering',
    question: `"In most engineering disciplines, builders fully understand why their systems behave as they do."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "A bridge engineer can calculate exactly why the bridge holds. A software engineer can trace exactly why the program behaves as it does. Neural networks are different: their behavior emerges from training in ways that can't be read back. We have a new kind of engineering where the builder doesn't fully understand what was built.",
  },
  {
    difficulty: 'Medium',
    tag: 'Fact',
    stopTitle: 'The EU Has Tried To Address This',
    question: `"The EU's GDPR gives people the right to a full technical explanation of any automated decision that affects them."`,
    answer: false,
    verdict: "Wrong. It's more complicated.",
    explanation: "GDPR includes a right to explanation but implementing it is technically very difficult. Current AI systems often can't produce explanations that are both faithful to their actual reasoning and comprehensible to a human. The gap between the legal requirement and the technical capability is wide and unresolved.",
  },
  {
    difficulty: 'Medium',
    tag: 'Example',
    stopTitle: 'Saliency Maps',
    question: `"Saliency maps show which parts of an input most influenced a neural network's output."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Take an image classification network and highlight which pixels most influenced the output. Sometimes the highlighted area is reassuringly the dog. Sometimes it's alarmingly the background or a watermark. Saliency maps give a partial window into the network's attention, not a full explanation of its reasoning.",
  },
  {
    difficulty: 'Medium',
    tag: 'Myth bust',
    stopTitle: 'Explainable AI Solves The Problem',
    question: `"Explainable AI tools produce explanations that are completely faithful to the actual computation inside the network."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Most XAI methods produce approximations: simplified explanations that roughly capture what the network does without being fully faithful to the actual computation. Using an approximate explanation to make a high-stakes decision is better than nothing. It's not the same as actually understanding the system.",
  },
  {
    difficulty: 'Hard',
    tag: 'Scenario',
    stopTitle: 'When It Matters',
    question: `"The black box problem is only a concern for AI researchers. It doesn't affect ordinary people."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "A medical AI recommends against a treatment. A loan algorithm denies a mortgage. A hiring system rejects a candidate. The person affected asks why. The answer is almost always: the model assigned a lower score based on patterns in training data: which patterns, we can't say exactly. The black box problem is most consequential for ordinary people making high-stakes decisions.",
  },
  {
    difficulty: 'Hard',
    tag: 'Big idea',
    stopTitle: 'Power Without Understanding',
    question: `"The fact that we can't fully explain neural networks is an argument for keeping humans in the loop on high-stakes decisions."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "We have built systems more powerful than anything in history whose internal workings we don't fully understand, deployed to make decisions affecting people's lives. That's not an argument against neural networks. It's an argument for humility, ongoing interpretability research, regulatory frameworks requiring meaningful explanations, and human oversight on decisions that matter.",
  },
]

export default function Lesson14() {
  return <LessonTemplate id={14} title="The Black Box Problem" stops={STOPS} questions={QUESTIONS} />
}
