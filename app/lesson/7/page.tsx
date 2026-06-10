import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

export const STOPS: Stop[] = [
  {
    tag: "Big idea",
    title: "The Question We Started With",
    body: "Aristotle asked whether reasoning could be mechanical. Turing asked whether machines could think. McCarthy named the field Artificial Intelligence before anyone agreed on what intelligence meant. You have now spent six lessons looking at what AI actually is, what it does, how it learns, where it lives, what it gets wrong. Now the question is yours. What is it?",
  },
  {
    tag: "Big idea",
    title: "What We Know It Is",
    body: "AI is pattern matching at scale. It is trained on human-produced data. It reflects the values and biases of whoever built it and whatever they fed it. It has no understanding, no awareness, no desires. It is extraordinarily powerful at specific tasks. It fails unpredictably at edges. It is deployed faster than our ability to understand its consequences. These are facts. They are not in dispute.",
  },
  {
    tag: "Big idea",
    title: "What We Don't Know",
    body: "Whether AI will ever be conscious. Whether understanding is necessary for intelligence. Whether current AI systems experience anything at all. Whether general AI is possible or what it would mean if it arrived. Whether the economic disruption will be manageable or catastrophic. Whether the benefits will be distributed or concentrated. None of these questions have agreed answers. Anyone who tells you otherwise is either lying or selling something.",
  },
  {
    tag: "Hot take",
    title: "The Tool Argument",
    body: "Some people say AI is just a tool. Like a hammer or a calculator \u2013 powerful, useful, shaped entirely by whoever wields it. On this view the question isn't what AI is but what humans choose to do with it. The technology is neutral. The choices aren't. This argument has a lot of truth in it. It also conveniently removes responsibility from the people building the tools.",
  },
  {
    tag: "Hot take",
    title: "The Mind Argument",
    body: "Some people say AI is something new, not a tool but a kind of mind. Not human, not the robots of science fiction, but a third thing we don't have good language for yet. On this view treating AI as just a tool is a category error that will lead us to make serious mistakes. This argument also has truth in it. It also risks anthropomorphizing systems that may warrant no such consideration.",
  },
  {
    tag: "Scenario",
    title: "The Turing Question Revisited",
    body: "Turing asked: if a machine can convince you it's thinking, does it matter whether it really is? You've now seen what's inside the machine. You know it's pattern matching. You know there's no understanding. Does that change your answer? Should it? Or is the output, the conversation, the art, the diagnosis, the recommendation, what actually matters, regardless of what produced it?",
  },
  {
    tag: "Big idea",
    title: "Why Your Answer Matters",
    body: "How you answer the question what is AI determines how you vote on regulations, what jobs you think are safe, how you treat AI-generated content, whether you trust AI systems in medicine and law and education, and what kind of future you think is possible. This isn't abstract philosophy. It's the most practical question of your generation. And unlike most of the questions in this course, nobody can answer it for you.",
  },
  {
    tag: "Big idea",
    title: "The End Of The Beginning",
    body: "You started this world not knowing what AI was. You end it knowing what it does, how it learns, where it lives, what it gets wrong, and why none of the easy answers about what it is hold up under pressure. That is not a small thing. Most people who use AI every day have never thought this carefully about it. You have. That makes you something the world actually needs right now, someone who can think clearly about the most consequential technology of your lifetime.",
  },
]

export const QUESTIONS: Question[] = [
  {
    difficulty: "Easy",
    tag: "Big idea",
    stopTitle: '',
    question: `After completing this world, the question of what AI fundamentally is remains open.`,
    answer: true,
    verdict: "Correct, and that's the point.",
    explanation: "You know what AI does, how it learns, where it lives, and what it gets wrong. You know the easy answers don't hold up. The question of what AI fundamentally is, tool, mind, or something new, remains unresolved. Knowing that the question is hard is more valuable than having a false answer.",
  },
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `AI has understanding, awareness, and desires. It just doesn't show them.`,
    answer: false,
    verdict: "Wrong.",
    explanation: "There is no evidence of understanding, awareness, or desires in any current AI system. It produces outputs that feel like these things because it was trained on human content where these things are present. The appearance of depth is not depth.",
  },
  {
    difficulty: "Easy",
    tag: "Fact",
    stopTitle: '',
    question: `The people who built ChatGPT cannot fully explain why it gives every answer it gives.`,
    answer: true,
    verdict: "Correct.",
    explanation: "This is the interpretability problem: one of the most active areas of AI research. The systems are so complex their builders cannot explain individual outputs. You are using systems that their creators don't fully understand. That is not a reason to panic. It is a reason to pay attention.",
  },
  {
    difficulty: "Medium",
    tag: "Hot take",
    stopTitle: '',
    question: `Calling AI 'just a tool' is a complete and accurate description of what it is.`,
    answer: false,
    verdict: "Incomplete.",
    explanation: "There is truth in the tool argument, AI is shaped by human choices and its impact depends on how it's used. But it also removes responsibility from builders, suggests the technology is neutral when it isn't, and implies consequences are always the user's fault. The tool framing is useful. It's not sufficient.",
  },
  {
    difficulty: "Medium",
    tag: "Fact",
    stopTitle: '',
    question: `How you answer the question 'what is AI?' affects real decisions you will make throughout your life.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Whether to trust an AI diagnosis. Whether AI-generated art deserves copyright. Whether AI should make legal decisions. Whether companies should be liable for AI harms. These are not abstract questions. They are policy, legal, and personal decisions that hinge on what you think AI actually is.",
  },
  {
    difficulty: "Medium",
    tag: "Myth bust",
    stopTitle: '',
    question: `Because AI is trained on human data it will always reflect human values.`,
    answer: false,
    verdict: "Wrong.",
    explanation: "It reflects the values present in its training data \u2013 which represents some humans more than others, some time periods more than others, some languages and cultures more than others. The appearance of human values in AI output is not evidence that human values have been captured.",
  },
  {
    difficulty: "Hard",
    tag: "Hot take",
    stopTitle: '',
    question: `As AI becomes more capable the question of what it is becomes less important.`,
    answer: false,
    verdict: "Wrong. It becomes more important.",
    explanation: "The more capable AI systems become the more consequential our answers are. If we treat a system with genuine moral status as a tool we commit one kind of error. If we treat a sophisticated pattern matcher as a mind we commit another. Getting this wrong at scale has consequences that grow as the technology grows.",
  },
  {
    difficulty: "Hard",
    tag: "Big idea",
    stopTitle: '',
    question: `Understanding how AI works technically is the most important thing about it.`,
    answer: false,
    verdict: "Wrong.",
    explanation: "The most important thing is what it's being used for, who it's affecting, who controls it, and what values are embedded in it. Technical literacy without critical thinking about power and accountability produces engineers who build harmful systems very efficiently. The question isn't just can you build it. It's should you, for whom, and what happens when it goes wrong.",
  },
]

export default function Lesson7() {
  return <LessonTemplate id={7} title="What Is AI?" stops={STOPS} questions={QUESTIONS} />
}
