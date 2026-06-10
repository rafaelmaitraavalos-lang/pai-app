import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

export const STOPS: Stop[] = [
  {
    tag: "Myth bust",
    title: "AI Is Not One Thing",
    body: "The term \u201cAI\u201d covers a wide range of technologies. It can refer to the system recommending your next video, a tool that analyzes medical images, a chatbot that answers questions, or a robot used in a factory. These systems may all involve artificial intelligence, but they were built for different purposes and do not necessarily work in the same way. Saying that something \u201cuses AI\u201d is a starting point, not a complete explanation.",
  },
  {
    tag: "Example",
    title: "Narrow AI",
    body: "Most AI systems are designed to perform a particular task or group of related tasks. Face ID checks whether a face matches the one stored on a phone. Spotify recommends music. AlphaGo plays the board game Go. These systems can perform extremely well in the situations they were built for. But their abilities do not automatically transfer to unrelated tasks. A program that recommends songs cannot diagnose an illness simply because both systems use AI.",
  },
  {
    tag: "Hot take",
    title: "ChatGPT Complicates the Picture",
    body: "Chatbots make the distinction between narrow and general AI less obvious. A chatbot can write, summarize, translate, explain, generate code, and respond to images. That feels broader than a system designed only to play a single game. However, being useful across many tasks is not the same as having the full range of human abilities. A chatbot does not experience the physical world as a person does. It does not feel hunger, pick up a glass of water, or learn through a lifetime of relationships and experiences. Its range is impressive, but it is not unlimited.",
  },
  {
    tag: "Myth bust",
    title: "General AI Has Not Been Demonstrated",
    body: "Artificial general intelligence, often shortened to AGI, usually refers to a system with broad, flexible abilities comparable to those of a human. There is no single definition that everyone accepts, which makes the debate complicated. No publicly demonstrated AI system is generally accepted as AGI. Current systems can be remarkably capable, but they still have important limits. Researchers disagree about whether AGI is possible, what it would require, and how close current systems are to reaching it.",
  },
  {
    tag: "Scenario",
    title: "Why This Matters",
    body: "In 1997, IBM\u2019s Deep Blue defeated world chess champion Garry Kasparov. The achievement was significant, but it did not mean that computers had become more intelligent than humans in every area. Deep Blue was built to play chess. It could calculate and compare possible moves at extraordinary speed, but its success did not give it the ability to understand a joke, cook a meal, or learn any new task it encountered. Excelling at one difficult task is not the same as possessing general intelligence.",
  },
  {
    tag: "Hot take",
    title: "Narrow AI Can Still Cause Harm",
    body: "An AI system does not need human-like intelligence to affect people\u2019s lives. A hiring tool can disadvantage certain applicants. A lending model can contribute to unfair decisions. A recommendation system can repeatedly promote harmful or misleading content. A system doesn\u2019t have to be intelligent to do damage. What matters is where it\u2019s used, what it was built to chase, and what happens when it fails at scale.",
  },
  {
    tag: "Example",
    title: "Systems Are Becoming Broader",
    body: "Recent AI systems can work with more than one type of information. Some can interpret text and images, respond to audio, generate code, or analyze video. These are often described as multimodal systems. Their abilities make the line between narrow and general AI harder to draw. A system may perform many tasks without having the flexible understanding associated with human intelligence. The boundary is messy. A system can do dozens of impressive things and still fail in ways a person would not. Forget whether it earns the label \u201cintelligent.\u201d The real question is what happens when millions of people lean on it.",
  },
  {
    tag: "Big idea",
    title: "Ask Better Questions",
    body: "Asking whether an AI system is \u201csmart\u201d can lead to vague answers. More useful questions are: What was the system designed to do? What information does it use? How well does it perform outside familiar situations? Who is affected when it makes a mistake? And who is responsible for deciding where it should be used?",
  },
]

export const QUESTIONS: Question[] = [
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `All AI systems work in exactly the same way.`,
    answer: false,
    verdict: "Correct.",
    explanation: "AI is a broad category. A recommendation algorithm, a chatbot, and a system that analyzes medical images may use different methods and serve very different purposes. Knowing that a tool involves AI does not tell you everything about how it works.",
  },
  {
    difficulty: "Easy",
    tag: "Fact",
    stopTitle: '',
    question: `Many AI systems are designed for specific tasks or groups of related tasks.`,
    answer: true,
    verdict: "Correct.",
    explanation: "A facial-recognition system identifies faces. A recommendation system predicts what content a user may want to see. A chess program evaluates chess moves. These systems can be highly capable without being equally useful in every situation.",
  },
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `A publicly demonstrated AI system has already been universally accepted as artificial general intelligence.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Researchers do not agree on a single definition of AGI, and no publicly demonstrated system is generally accepted as meeting that standard. Current AI tools can do impressive things, but they also have clear limitations.",
  },
  {
    difficulty: "Medium",
    tag: "Hot take",
    stopTitle: '',
    question: `Because ChatGPT can perform many different tasks, the distinction between narrow and general AI is simple to apply.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Chatbots complicate the distinction. They can work across many subjects and formats, which makes them broader than older single-purpose systems. But broad usefulness is not automatically the same thing as human-level general intelligence.",
  },
  {
    difficulty: "Medium",
    tag: "Hot take",
    stopTitle: '',
    question: `An AI system can cause serious harm even if it does not have general intelligence.`,
    answer: true,
    verdict: "Correct.",
    explanation: "A system can influence hiring, lending, healthcare, or the content people see online. A limited tool can still affect large numbers of people when it is widely used or trusted without enough oversight.",
  },
  {
    difficulty: "Medium",
    tag: "Scenario",
    stopTitle: '',
    question: `Deep Blue’s victory over Garry Kasparov proved that computers had become more intelligent than humans overall.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Deep Blue was built to play chess, and it performed that task extremely well. Its victory demonstrated impressive specialized performance, not a general ability to reason about every kind of problem.",
  },
  {
    difficulty: "Hard",
    tag: "Fact",
    stopTitle: '',
    question: `As AI systems become capable of working with text, images, audio, and video, the boundary between narrow and general AI becomes harder to define.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Multimodal systems can perform a wider range of tasks than many earlier AI tools. However, researchers still debate how those abilities relate to broader concepts such as understanding, flexibility, and general intelligence.",
  },
  {
    difficulty: "Hard",
    tag: "Big idea",
    stopTitle: '',
    question: `The most useful question about an AI system is simply whether it is intelligent.`,
    answer: false,
    verdict: "Correct.",
    explanation: "It is often more useful to ask what the system was designed to do, what goal it is pursuing, how reliable it is, and who may be affected by its mistakes. A system does not need to resemble a human mind in order to have real consequences.",
  },
]

export default function Lesson4() {
  return <LessonTemplate id={4} title="Narrow vs. General AI" stops={STOPS} questions={QUESTIONS} />
}
