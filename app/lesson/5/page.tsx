import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

export const STOPS: Stop[] = [
  {
    tag: 'Myth bust',
    title: "It Wasn't Programmed",
    body: "Traditional software is programmed. A human writes rules: if this then that. AI is different. Nobody programmed it to recognize your face or recommend your next song. It learned those things by being shown millions of examples. The difference sounds subtle. It isn't. It means nobody fully knows why an AI makes the decisions it makes, including the people who built it.",
  },
  {
    tag: 'Example',
    title: 'Supervised Learning',
    body: "Show an AI 10 million photos. Half are labeled 'cat.' Half are labeled 'not cat.' It adjusts itself millions of times until it gets the labels right. Then show it a photo it's never seen. It applies what it learned. This is {{supervisedLearning}}: learning from labeled examples. It's how most AI you've encountered works. Someone had to label all those photos first.",
  },
  {
    tag: 'Example',
    title: 'Unsupervised Learning',
    body: "Sometimes AI learns without labels. Show it a million photos with no labels at all. It finds its own patterns: clusters things that look similar, separates things that look different. It doesn't know what a cat is. It just notices that some images share features. This is how Spotify groups musical styles together without anyone telling it what genres exist.",
  },
  {
    tag: 'Hot take',
    title: 'The Training Data Problem',
    body: "The quality of what an AI learns is entirely determined by what it was trained on. An AI trained on 1950s medical textbooks will give 1950s medical advice. An AI trained mostly on text written by men will reflect male perspectives as default. An AI trained on internet data will absorb every {{bias}}, conspiracy, and falsehood on the internet. Training data is the single most important and least discussed part of AI development.",
  },
  {
    tag: 'Example',
    title: 'Reinforcement Learning',
    body: "A third way AI learns: trial and error with feedback. Give it a goal and let it try things. Reward it when it gets closer. Punish it when it doesn't. Over millions of attempts it figures out strategies no human programmed. This is {{reinforcementLearning}}. AlphaGo learned to play Go this way. It played itself millions of times and discovered moves that human players had never considered in centuries of playing the game.",
  },
  {
    tag: 'Myth bust',
    title: 'It Never Stops Being Wrong',
    body: "AI doesn't learn until it's perfect then stop. It learns until it's good enough then gets deployed. Every AI system in use right now is making mistakes constantly. Face ID misidentifies. Autocomplete suggests the wrong word. Medical AI misses diagnoses. The goal is never perfection. It's being right often enough to be useful. That gap between often enough and always is where real harm happens.",
  },
  {
    tag: 'Hot take',
    title: 'Who Does The Real Work',
    body: "Somewhere in the world, right now, thousands of people are labeling data so AI can learn. Clicking which photos contain traffic lights. Transcribing audio. Rating whether AI responses were helpful. Much of this work is done by low-paid contractors in developing countries. The glamorous AI products you use exist because of enormous amounts of invisible human labor that almost nobody talks about.",
  },
  {
    tag: 'Big idea',
    title: 'Learning Without Understanding',
    body: "Here is the most unsettling thing about how AI learns. It can become extraordinarily good at a task without developing any understanding of what that task means. An AI can learn to write convincing essays about grief without having any concept of loss. It can learn to diagnose cancer without understanding what it feels like to be sick. It gets better and better at the surface of things while the depth remains completely empty. Whether that matters, whether understanding is even necessary, is one of the open questions of our time.",
  },
]

export const QUESTIONS: Question[] = [
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: "It Wasn't Programmed",
    question: `"AI is programmed with specific rules for every decision it makes."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Traditional software is programmed with rules. AI learns from examples. Nobody programmed Face ID with rules about what faces look like. It was shown millions of faces and learned on its own. That means nobody fully knows why an AI makes any specific decision, including the people who built it.",
  },
  {
    difficulty: 'Easy',
    tag: 'Fact',
    stopTitle: 'Supervised Learning',
    question: `"Supervised learning requires someone to label the training data first."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Every example needs a label. This is a cat, this is spam, this loan defaulted. Someone has to do that labeling. Millions of examples means millions of labels. Much of that work is done by low-paid contractors around the world whose labor makes the AI products you use possible.",
  },
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: 'Reinforcement Learning',
    question: `"AlphaGo was programmed with Go strategies by expert players."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "AlphaGo used reinforcement learning. It played itself millions of times and figured out its own strategies through trial and error. It discovered moves that human players had never considered in centuries of playing the game. Nobody programmed those moves. AlphaGo invented them.",
  },
  {
    difficulty: 'Medium',
    tag: 'Hot take',
    stopTitle: 'The Training Data Problem',
    question: `"Training AI on more data always makes it more accurate."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "More data makes AI more powerful. It doesn't make it more right. Training on more biased data produces more confidently biased AI. More of the wrong thing is still the wrong thing. The quality and composition of data matters far more than the quantity.",
  },
  {
    difficulty: 'Medium',
    tag: 'Fact',
    stopTitle: 'The Training Data Problem',
    question: `"The training data is the single most important factor in determining what an AI learns."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "An AI trained on 1950s medical textbooks gives 1950s medical advice. An AI trained mostly on text written by men reflects male perspectives as default. An AI trained on internet data absorbs every bias and falsehood on the internet. Training data is the most important and least discussed part of AI development.",
  },
  {
    difficulty: 'Medium',
    tag: 'Myth bust',
    stopTitle: 'It Never Stops Being Wrong',
    question: `"The goal of AI training is to make the system perfectly accurate."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "The goal is accurate enough to be useful. No AI system is deployed at perfect accuracy. The acceptable error rate is a human decision and it varies enormously by context. An error rate acceptable for music recommendation is catastrophic for cancer diagnosis. Who decides what counts as good enough matters as much as the training itself.",
  },
  {
    difficulty: 'Hard',
    tag: 'Fact',
    stopTitle: 'Learning Without Understanding',
    question: `"AI can become extraordinarily good at a task without developing any understanding of what that task means."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "This is the most unsettling thing about how AI learns. It can write convincingly about grief without any concept of loss. It can diagnose cancer without understanding what illness feels like. It gets better and better at the surface of things while the depth remains completely empty. Whether understanding is even necessary is one of the open questions of our time.",
  },
  {
    difficulty: 'Hard',
    tag: 'Myth bust',
    stopTitle: 'The Training Data Problem',
    question: `"Because AI learns from human-produced data it will naturally reflect human values accurately."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "It reflects the values present in the data: which means the values of whoever produced that data, which is not all humans equally. Data from the internet overrepresents wealthy English-speaking Western perspectives. Historical data overrepresents whoever had power in the past. The AI doesn't know this. It just learned from what it was given.",
  },
]

export default function Lesson5() {
  return <LessonTemplate id={5} title="How AI Learns" stops={STOPS} questions={QUESTIONS} />
}
