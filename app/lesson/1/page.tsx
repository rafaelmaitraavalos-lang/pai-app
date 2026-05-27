import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

const STOPS: Stop[] = [
  {
    tag: 'Myth bust',
    year: '400 BC',
    title: 'Before Computers',
    image: '/images/w1m1/aristotle.png',
    body: "Aristotle spent his life trying to formalize logic: a set of rules where if you follow them correctly you always reach the right answer. He wasn't building a machine. He was asking whether reasoning itself could be mechanical. That question is 2,500 years old. AI didn't start with computers. It started with that question.",
  },
  {
    tag: 'Myth bust',
    year: '1843',
    title: 'Ada Lovelace',
    image: '/images/w1m1/ada-lovelace.png',
    body: "Ada Lovelace was writing notes on a machine that hadn't been built yet. Charles Babbage designed the Analytical Engine: a mechanical calculator. Everyone else saw a calculator. Ada saw something else entirely. She wrote that the machine could potentially compose music, produce graphics, and solve problems of any complexity: if you gave it the right instructions. She wrote those instructions. The first algorithm ever published was hers. In 1843.",
  },
  {
    tag: 'Hot take',
    year: '1950',
    title: 'The Turing Test',
    image: '/images/w1m1/alan-turing.png',
    body: "Alan Turing publishes a paper asking: can machines think? He doesn't answer it, he sidesteps it entirely. He invents a test instead. If a machine can hold a conversation well enough that a human can't tell it's a machine, does it even matter whether it's really thinking? That question was radical in 1950. ChatGPT passes versions of the Turing Test today. Which means the question still isn't answered.",
  },
  {
    tag: 'Scenario',
    year: '1956',
    title: 'The Birth of AI',
    image: '/images/w1m1/dartmouth-1956.png',
    body: "It's 1956. A group of researchers gather at Dartmouth College for a summer workshop. John McCarthy proposes a name for the field they're building: Artificial Intelligence. They actually believe they'll make serious progress in one summer. Some think they'll basically solve it. They don't. But the name sticks, the field is born, and the most ambitious research project in human history officially begins.",
  },
  {
    tag: 'Myth bust',
    year: '1970s–80s',
    title: 'The AI Winters',
    body: "Twice, the money runs out. Governments pour funding into AI, get excited, watch it underdeliver, and pull back completely. Labs shut down. Researchers leave the field. The first winter hits in the 1970s. The second in the late 1980s. The field nearly dies both times. This matters because it's still happening: every few years AI gets declared the next revolution. Knowing it has nearly collapsed twice makes you a much sharper reader of that hype.",
  },
  {
    tag: 'Hot take',
    year: '1997',
    title: 'Deep Blue',
    image: '/images/w1m1/deep-blue-1997.png',
    body: "1997. Deep Blue defeats Garry Kasparov: the reigning world chess champion. The headlines declare that machines are now smarter than humans. But Deep Blue couldn't play checkers. It couldn't recognize a cat, hold a conversation, or understand what chess even was. It calculated millions of possible moves per second and picked the best one. That's not intelligence. That's a very fast calculator with a very specific purpose. The world missed that distinction completely.",
  },
  {
    tag: 'Turning point',
    year: '2012',
    title: 'Everything Changes',
    image: '/images/w1m1/alexnet-cifar10.png',
    body: "2012. A neural network called AlexNet enters an image recognition competition and wins by a margin that shocks the entire field. The technique it uses, deep learning, takes over everything. Before 2012 AI is mostly clever rule-based tricks. After 2012 AI starts actually learning from data at scale. Every tool you use today: image generators, voice assistants, ChatGPT, recommendation systems: traces directly back to what happened that year. Most people missed it entirely.",
  },
  {
    tag: 'Big idea',
    year: '2022–now',
    title: "You're In It",
    body: "2022. ChatGPT launches and reaches 100 million users in two months: faster than any product in history. AI-generated images, music, code, and video go from experimental to everywhere almost overnight. For the first time AI is something anyone can use, not just researchers. Nobody fully agrees on what it means yet. That's not a cop-out. It's actually where we are. You're not learning about something that happened. You're learning about something that's still happening.",
  },
]

const QUESTIONS: Question[] = [
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: 'Before Computers',
    question: `"The idea behind AI predates computers by thousands of years."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Aristotle was formalizing mechanical reasoning 2,500 years ago. Ada Lovelace wrote the first algorithm in 1843. The computers are new. The obsession with making machines think is not.",
  },
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: 'Ada Lovelace',
    question: `"Ada Lovelace was the first person to write an algorithm."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "She wrote it in 1843 for a machine that hadn't been built yet. She also predicted machines could compose music, produce graphics, and solve complex problems. She was right about all of it. A century early.",
  },
  {
    difficulty: 'Easy',
    tag: 'Hot take',
    stopTitle: 'The Turing Test',
    question: `"The Turing Test proves a machine is intelligent if it passes."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Turing never said that. He asked whether the question even matters. Passing means a machine can imitate human conversation, not that it understands anything. ChatGPT passes versions of it today and has no idea what a word means.",
  },
  {
    difficulty: 'Medium',
    tag: 'Scenario',
    stopTitle: 'The Birth of AI',
    question: `"The researchers at Dartmouth in 1956 were naive to think they could solve AI quickly."`,
    answer: false,
    verdict: 'Not really.',
    explanation: "They weren't naive. They had no way of knowing how hard the problem was. Nobody did. The most brilliant researchers in the world were completely wrong about something they invented. That's not naivety. That's the nature of working at the edge of what anyone has ever tried.",
  },
  {
    difficulty: 'Medium',
    tag: 'Myth bust',
    stopTitle: 'The AI Winters',
    question: `"AI research has been steadily progressing since the 1950s."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "It nearly died twice. The AI Winters of the 1970s and 1980s saw funding collapse, labs shut down, and researchers abandon the field entirely. Understanding this separates people who think clearly about AI from people who believe every headline.",
  },
  {
    difficulty: 'Medium',
    tag: 'Hot take',
    stopTitle: 'Deep Blue',
    question: `"Deep Blue was a narrow AI. It could only play chess and nothing else."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Deep Blue was extraordinarily powerful at one specific task and completely useless at everything else. It couldn't play checkers, recognize a face, or understand a sentence. Beating Kasparov was not evidence of general intelligence. It was evidence of very fast, very specific calculation.",
  },
  {
    difficulty: 'Hard',
    tag: 'Turning point',
    stopTitle: 'Everything Changes',
    question: `"The most important moment in modern AI history was the launch of ChatGPT in 2022."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "It was 2012. When AlexNet won the image recognition competition by a shocking margin, deep learning took over the entire field overnight. ChatGPT is a product of that moment. Without 2012 there is no 2022. Most people get this backwards because ChatGPT is what they noticed.",
  },
  {
    difficulty: 'Hard',
    tag: 'Big idea',
    stopTitle: "You're In It",
    question: `"The question of what AI fundamentally is remains unresolved."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Nobody fully agrees on what AI is, whether it can think, what rights it might deserve, or what it will do to the economy and human identity. You just finished a lesson on 2,500 years of people trying to answer these questions. They're still open. That's not a failure: that's what makes this the most interesting field in the world right now.",
  },
]

export default function Lesson1() {
  return <LessonTemplate id={1} title="History of AI" stops={STOPS} questions={QUESTIONS} />
}
