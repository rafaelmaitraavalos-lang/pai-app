import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

const STOPS: Stop[] = [
  {
    tag: 'Myth bust',
    title: 'The Magic Trick',
    body: "Everyone thinks AI is magic. Scientists, journalists, even people who build it use words like 'the AI decided' or 'the AI understands.' None of that is accurate. AI finds patterns in data. That's the whole secret. The magic is just math running very fast on very large amounts of information.",
  },
  {
    tag: 'Scenario',
    title: 'How You Learned',
    body: "When you were a baby you learned what a dog is by seeing dogs. Nobody gave you a definition. You just saw enough of them, big ones, small ones, fluffy ones, and your brain built a pattern. AI does the exact same thing. The difference is it can process millions of examples in hours instead of years, and it never gets tired or distracted.",
  },
  {
    tag: 'Example',
    title: 'Show It Enough Cats',
    body: "Show an AI 10 million photos labeled 'cat.' It finds what they all have in common: pointy ears, whiskers, a certain eye shape. Now show it a photo it has never seen. It checks the pixels against the pattern and decides: cat or not cat. That is image recognition. It is also exactly how Face ID works when your phone unlocks with your face.",
  },
  {
    tag: 'Hot take',
    title: 'Garbage In',
    body: "The pattern is only as good as the examples. Bad examples produce a bad pattern. Biased examples produce a biased pattern. In the 1990s a hiring algorithm trained on historical resumes started rejecting women, not because someone programmed it to, but because most past hires were men. It learned exactly what it was shown. The data was the problem. The AI worked perfectly.",
  },
  {
    tag: 'Myth bust',
    title: "No One's Home",
    body: "The AI matching your face has no idea what a face is. It has no idea what anything is. It just knows this specific arrangement of pixels matches the pattern it learned. There is no understanding happening. No recognition. No awareness. Just a number that says: match. This is the most important thing to understand about AI and almost nobody gets it right.",
  },
  {
    tag: 'Hot take',
    title: 'Why It Feels Like Magic',
    body: "Pattern matching at scale looks exactly like intelligence. It recommends the show you wanted to watch. It finishes your sentence better than you could. It translates a language you don't speak in real time. None of that is thinking. All of it is patterns found across billions of examples. The scale is so large that the result is indistinguishable from something that actually understands you.",
  },
  {
    tag: 'Myth bust',
    title: 'Where It Breaks',
    body: "Ask it something slightly outside its training and it falls apart: confidently. It has no way to know it doesn't know something. It can't reason its way to a new answer. It can only match against what it has seen before. When there is no good match it either fails silently or invents an answer that sounds completely correct and is completely wrong.",
  },
  {
    tag: 'Big idea',
    title: 'The Mirror',
    body: "AI is a mirror. It reflects back the patterns in whatever data it was trained on. It is only as smart, fair, creative, or accurate as the examples it learned from. That means every AI system carries the values, biases, and blind spots of whoever collected its training data. That is not a bug. That is the whole design. And it means the most important question about any AI is not how smart it is. It is who built it and what they fed it.",
  },
]

const QUESTIONS: Question[] = [
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: 'The Magic Trick',
    question: `"AI finds patterns in data rather than thinking through problems logically."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "AI doesn't think, reason, or understand anything. It finds patterns. Show it enough dogs and it learns dog. Show it enough spam and it learns spam. That's the whole mechanism. Everything else is details.",
  },
  {
    difficulty: 'Easy',
    tag: 'Example',
    stopTitle: 'Show It Enough Cats',
    question: `"Face ID on your phone is an example of AI pattern matching."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Your phone trained on your face, built a model of the pattern, and checks every unlock attempt against it. It has no idea who you are. It just knows the pixels match. That's also how every image recognition system in the world works.",
  },
  {
    difficulty: 'Easy',
    tag: 'Scenario',
    stopTitle: 'Show It Enough Cats',
    question: `"An AI trained on millions of cat photos will recognize every cat it's ever shown perfectly."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "It will still fail on unusual cases: a hairless cat, a cartoon, a cat in costume. The pattern is powerful but it has edges. Every AI has a boundary where its training ends and its confidence continues. The dangerous moment is when it crosses that boundary without anyone noticing.",
  },
  {
    difficulty: 'Medium',
    tag: 'Hot take',
    stopTitle: 'Garbage In',
    question: `"If an AI produces biased results, someone must have programmed the bias in deliberately."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Nobody has to program bias in. It comes from the data. In the 1990s a hiring algorithm started rejecting women's resumes, not because anyone told it to, but because most historical hires were men. It learned exactly what it was shown. The bias was in the data. The AI worked perfectly.",
  },
  {
    difficulty: 'Medium',
    tag: 'Myth bust',
    stopTitle: 'Why It Feels Like Magic',
    question: `"When AI translates a language it understands what the words mean."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "It has no idea what any word means. It learned that certain patterns in one language correspond to certain patterns in another. Meaning never enters the picture. That's why AI translation falls apart on idioms, jokes, and cultural references: there's no understanding to fall back on.",
  },
  {
    difficulty: 'Medium',
    tag: 'Hot take',
    stopTitle: 'Why It Feels Like Magic',
    question: `"The scale of AI pattern matching is what makes it seem like intelligence."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Pattern matching at scale looks exactly like intelligence. It recommends the show you wanted. It finishes your sentence perfectly. It translates in real time. None of that is thinking. All of it is patterns found across billions of examples. The scale is so large that the result is indistinguishable from something that actually understands you.",
  },
  {
    difficulty: 'Hard',
    tag: 'Myth bust',
    stopTitle: "No One's Home",
    question: `"Because AI is so good at pattern matching at scale, it's basically the same as thinking."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "It looks like thinking. It produces results that feel like thinking. But there is no reasoning happening. No understanding. No awareness. A calculator doing a million additions per second isn't thinking either. It's just fast. Scale changes the output. It doesn't change what's actually happening underneath.",
  },
  {
    difficulty: 'Hard',
    tag: 'Big idea',
    stopTitle: 'The Mirror',
    question: `"AI is a neutral tool. It doesn't carry anyone's values or perspective."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "AI is a mirror. It reflects back the patterns in whatever data it was trained on. Whoever decides what goes into that data shapes everything the AI learns, gets right, gets wrong, and leaves out entirely. There is no neutral. There is only whose data got included and whose didn't.",
  },
]

export default function Lesson2() {
  return <LessonTemplate id={2} title="What AI Does" stops={STOPS} questions={QUESTIONS} />
}
