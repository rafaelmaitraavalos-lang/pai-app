import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

export const STOPS: Stop[] = [
  {
    tag: "Fact",
    title: "Some Decisions Are Difficult to Explain",
    body: "Researchers can describe the structure of a neural network, the data used to train it, and the process used to adjust its weights. They can also test how well it performs. What is often much harder is explaining exactly why a large network produced one particular output. The patterns it learns may be distributed across many weights and layers rather than stored as a simple list of readable rules. This challenge is often called the black-box problem.",
  },
  {
    tag: "Example",
    title: "What Interpretability Means",
    body: "Interpretability research tries to make neural networks easier to understand. Researchers may study which features activate inside a model, examine how different parts of the network interact, or trace pathways that contribute to an output. These methods can reveal useful information about how a model works. But the explanations are usually incomplete. Understanding one feature or one pathway does not automatically explain everything happening inside a large network.",
  },
  {
    tag: "Myth bust",
    title: "The System Is Not Completely Mysterious",
    body: "Calling a neural network a \"black box\" does not mean that researchers know nothing about it. They know how the network was designed. They can measure its accuracy, test it on new examples, compare versions of the model, and study how it responds when the input changes. The limitation is more specific: a network's behavior may be difficult to translate into a complete explanation that a person can easily understand. This matters when people need to know why a system made a consequential decision.",
  },
  {
    tag: "Scenario",
    title: "When an Explanation Matters",
    body: "Imagine that an automated system contributes to a decision about a loan application, a job candidate, or a medical recommendation. The person affected may reasonably ask: What information influenced the result? Was the information accurate? Did the system rely on an unfair pattern? Can the decision be reviewed? A score alone may not answer those questions. In high-stakes settings, people need a meaningful way to understand and challenge important decisions.",
  },
  {
    tag: "Fact",
    title: "Laws Are Addressing Automated Decisions",
    body: "Data-protection laws in Europe include protections related to certain automated decisions. The rules are more specific than a general right to receive a full technical explanation of every algorithm. In relevant cases, organizations may need to provide meaningful information about the logic involved, the importance of the processing, and its possible consequences. The law also places limits on some decisions made solely through automated processing when those decisions have legal or similarly significant effects.",
  },
  {
    tag: "Example",
    title: "Saliency Maps",
    body: "One tool used in computer vision is a saliency map. A saliency map highlights parts of an image that influenced a model's prediction. Suppose an image-classification system labels a photograph as \"dog.\" A saliency map may show whether the system focused on the dog, the background, a watermark, or another feature. This can provide a useful clue. But it is not a complete explanation of the model's reasoning, and different explanation methods may produce different results.",
  },
  {
    tag: "Myth bust",
    title: "Explainable AI Has Not Solved Everything",
    body: "Explainable AI, often shortened to XAI, is a field focused on making AI systems easier to interpret. XAI tools can help researchers find patterns, investigate errors, and identify possible sources of bias. They can also help people understand some factors that influenced a prediction. However, an explanation may be simplified, incomplete, or difficult to verify. A clear-sounding explanation is not automatically a faithful description of everything that happened inside the model.",
  },
  {
    tag: "Big idea",
    title: "Use Powerful Tools with Care",
    body: "The black-box problem is not a reason to reject neural networks. These systems can be useful in medicine, science, accessibility, and many other areas. But the difficulty of explaining some outputs is a reason to be cautious about where and how the systems are used. The higher the stakes, the more important it becomes to test the model carefully, monitor its effects, allow decisions to be reviewed, and give people a meaningful way to challenge errors.",
  },
]

export const QUESTIONS: Question[] = [
  {
    difficulty: "Easy",
    tag: "Fact",
    stopTitle: '',
    question: `Researchers can describe how a neural network is structured and trained, even when they cannot fully explain every individual output.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Researchers understand the architecture, training process, and performance of a network. The difficult part is often explaining exactly how many internal patterns contributed to one specific decision.",
  },
  {
    difficulty: "Easy",
    tag: "Example",
    stopTitle: '',
    question: `Interpretability research tries to make the internal behavior of neural networks easier to understand.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Researchers study features, pathways, and interactions inside models. These tools can provide useful insights, although they do not usually explain every part of a large network.",
  },
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `Calling a neural network a black box means that researchers know absolutely nothing about how it works.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Researchers know how neural networks are designed and trained. The black-box problem refers to the difficulty of producing a complete, understandable explanation for particular outputs.",
  },
  {
    difficulty: "Medium",
    tag: "Scenario",
    stopTitle: '',
    question: `An explanation may be especially important when an automated system contributes to a high-stakes decision.`,
    answer: true,
    verdict: "Correct.",
    explanation: "When a system affects a loan application, a job opportunity, or a medical recommendation, people may need to understand the factors that influenced the result and whether the decision can be challenged.",
  },
  {
    difficulty: "Medium",
    tag: "Fact",
    stopTitle: '',
    question: `The GDPR gives every person a universal right to receive a full technical explanation of every automated decision.`,
    answer: false,
    verdict: "Correct.",
    explanation: "The rules are more limited and more specific. In certain situations involving automated decisions, organizations may need to provide meaningful information about the logic involved and the possible consequences of the processing.",
  },
  {
    difficulty: "Medium",
    tag: "Example",
    stopTitle: '',
    question: `A saliency map can highlight parts of an image that influenced a model's prediction.`,
    answer: true,
    verdict: "Correct.",
    explanation: "A saliency map may show whether an image-classification system focused on the object itself or on another part of the image. It provides a clue, not a complete explanation.",
  },
  {
    difficulty: "Hard",
    tag: "Myth bust",
    stopTitle: '',
    question: `Explainable AI tools always produce complete and fully reliable explanations.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Interpretability tools can be useful, but their explanations may be partial, simplified, or difficult to verify. A readable explanation is not automatically a complete account of the model's internal process.",
  },
  {
    difficulty: "Hard",
    tag: "Big idea",
    stopTitle: '',
    question: `The black-box problem is one reason to require careful testing, review processes, and human oversight in high-stakes uses of AI.`,
    answer: true,
    verdict: "Correct.",
    explanation: "When an AI system affects people's lives, accuracy alone is not enough. People should have meaningful ways to review important decisions and challenge mistakes.",
  },
]

export default function Lesson14() {
  return <LessonTemplate id={14} title="The Black Box Problem" stops={STOPS} questions={QUESTIONS} />
}
