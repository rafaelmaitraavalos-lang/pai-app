import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

export const STOPS: Stop[] = [
  {
    tag: "Myth bust",
    title: "The Magic Trick",
    body: "AI can feel almost magical. It can identify objects in a photo, recommend a song you end up loving, or answer a question in seconds. People sometimes describe this by saying that an AI system \u201cunderstands\u201d something or \u201cdecided\u201d to do something. Usually, that language is misleading. Most AI systems work by finding patterns in large amounts of data and using those patterns to make predictions.",
  },
  {
    tag: "Scenario",
    title: "How You Learned",
    body: "Think about how you learned to recognize a dog. You probably did not memorize a formal definition. You saw different dogs over time: large ones, small ones, fluffy ones, dogs with long ears, dogs with short ears. Eventually, you became able to recognize a new dog without consciously listing its features. AI learns in a different way than a human brain does, but the comparison is useful. A system can be trained on many examples and learn patterns that help it classify something it has not seen before.",
  },
  {
    tag: "Example",
    title: "Show It Enough Cats",
    body: "Imagine training an AI system on millions of images labeled either \u201ccat\u201d or \u201cnot cat.\u201d During training, the system picks up on visual patterns that tend to appear in images of cats. It may learn to pay attention to shapes, textures, and combinations of features. When it sees a new image, it uses those patterns to estimate whether the image contains a cat. This is a basic example of image recognition. Facial-recognition and phone-unlocking systems use related ideas: they compare new visual information to patterns they have learned or stored.",
  },
  {
    tag: "Hot take",
    title: "Garbage In",
    body: "An AI system can only learn from the examples it receives. If the training data is incomplete or biased, the results may be biased too. Amazon once experimented with a hiring tool trained on resumes submitted over a ten-year period. Because the resumes mostly came from men, the system learned patterns that put some resumes associated with women at a disadvantage. The engineers did not have to explicitly program a rule against women for the system to produce a biased result. The bias was already present in the data.",
  },
  {
    tag: "Myth bust",
    title: "Pattern Matching Is Not Understanding",
    body: "When your phone unlocks after scanning your face, it has not recognized you in the way a friend would. It has compared the scan to a stored representation and calculated whether the match is close enough. It can identify the pattern without knowing who you are.",
  },
  {
    tag: "Hot take",
    title: "Why It Feels Like Magic",
    body: "Pattern recognition becomes much more impressive when it happens at a huge scale. An AI system can recommend a show, complete a sentence, or translate a paragraph because it has learned from an enormous number of examples. The result may feel intelligent, especially when it is useful or surprisingly accurate. But producing a convincing answer is not the same thing as understanding a question in the way a person does.",
  },
  {
    tag: "Myth bust",
    title: "Where It Breaks",
    body: "AI systems can struggle when they encounter situations that are very different from the examples they saw during training. The problem is that the answer may still sound confident. A system might misidentify an unusual image, translate an expression awkwardly, or generate a fact that is not true. It does not always recognize the limits of its own knowledge. That is why important claims produced by AI should be checked rather than accepted automatically.",
  },
  {
    tag: "Big idea",
    title: "The Mirror",
    body: "AI systems reflect the data used to build and train them. That data comes from people, institutions, websites, books, images, and past decisions. As a result, an AI system can reproduce some of the strengths and weaknesses already present in those sources. When evaluating an AI tool, it is not enough to ask whether it seems smart. It is also worth asking: Who built it? What data shaped it? What was it designed to do? And where might it fail?",
  },
]

export const QUESTIONS: Question[] = [
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `AI systems often identify patterns in data and use them to make predictions.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Many AI systems learn from examples rather than following a complete list of rules written by a programmer. A spam filter learns patterns associated with unwanted emails. An image classifier learns patterns associated with different objects. The details vary depending on the system, but pattern recognition is central to how many AI tools work.",
  },
  {
    difficulty: "Easy",
    tag: "Example",
    stopTitle: '',
    question: `Face ID on your phone uses pattern matching.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Your phone compares information from your face to a stored representation and decides whether the match is close enough. This is not exactly the same as every other image-recognition system, but it is a useful everyday example of technology using visual patterns.",
  },
  {
    difficulty: "Easy",
    tag: "Scenario",
    stopTitle: '',
    question: `An AI system trained on millions of cat photos will identify every cat perfectly.`,
    answer: false,
    verdict: "Correct.",
    explanation: "It may still make mistakes. A hairless cat, a cartoon cat, a blurry image, or an unusual camera angle could confuse the system. AI can perform extremely well without being perfect, especially when it encounters examples that differ from its training data.",
  },
  {
    difficulty: "Medium",
    tag: "Hot take",
    stopTitle: '',
    question: `If an AI system produces biased results, someone must have deliberately programmed the bias into it.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Bias can enter a system through its training data. If historical data reflects unequal treatment, an AI system trained on that data may learn and repeat the same patterns. This can happen even when nobody writes an explicitly discriminatory rule.",
  },
  {
    difficulty: "Medium",
    tag: "Myth bust",
    stopTitle: '',
    question: `When an AI system translates a sentence, it understands the sentence exactly as a person would.`,
    answer: false,
    verdict: "Correct.",
    explanation: "AI translation systems can be extremely useful, but their strengths come from patterns learned across large collections of text. They may still struggle with humor, idioms, cultural references, or phrases whose meaning depends heavily on context.",
  },
  {
    difficulty: "Medium",
    tag: "Hot take",
    stopTitle: '',
    question: `The scale of AI pattern recognition is one reason it can seem intelligent.`,
    answer: true,
    verdict: "Correct.",
    explanation: "A system trained on a huge amount of data can produce results that feel surprisingly thoughtful or personal. It can recommend music, generate text, and translate languages. The scale of the training makes the output impressive, even though the system does not experience or understand the world in the way a human does.",
  },
  {
    difficulty: "Hard",
    tag: "Myth bust",
    stopTitle: '',
    question: `If an AI system produces a convincing answer, the answer is probably reliable.`,
    answer: false,
    verdict: "Correct.",
    explanation: "A convincing answer can still be wrong. AI-generated errors are sometimes difficult to notice because the wording may sound polished and confident. For important questions, especially in areas such as medicine, law, and school research, the answer should be checked against reliable sources.",
  },
  {
    difficulty: "Hard",
    tag: "Big idea",
    stopTitle: '',
    question: `AI is completely neutral because it is based on math.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Math is part of how AI works, but people still make decisions about what data to use, what goals to prioritize, and where to deploy the system. Those choices affect what the system learns, what it does well, and where its blind spots may be.",
  },
]

export default function Lesson2() {
  return <LessonTemplate id={2} title="What AI Does" stops={STOPS} questions={QUESTIONS} />
}
