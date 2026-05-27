import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

const STOPS: Stop[] = [
  {
    tag: 'Myth bust',
    title: 'AI Is Not One Thing',
    body: "When people say AI they might mean the algorithm that recommends your next video, the system that detects cancer in an X-ray, the chatbot that writes your essay, or the robot that builds cars. These are completely different technologies. Calling them all AI is like calling a bicycle, a helicopter, and a submarine all vehicles. Technically true. Practically useless.",
  },
  {
    tag: 'Example',
    title: 'Narrow AI',
    body: "Every AI you have ever used is narrow. It does one thing. Face ID recognizes faces, it cannot drive a car. Spotify recommends music, it cannot diagnose a disease. AlphaGo plays Go better than any human. It cannot play chess. Each one is extraordinarily powerful within its specific task and completely useless outside of it.",
  },
  {
    tag: 'Hot take',
    title: 'ChatGPT Is Still Narrow',
    body: "ChatGPT feels different. It can write, code, translate, explain, and debate. But it is still narrow: its task is generating text that matches patterns in its training data. It cannot walk into a room, pick up a glass of water, or understand what thirst feels like. The breadth of what it does with text is impressive. It is still one thing.",
  },
  {
    tag: 'Myth bust',
    title: "General AI Doesn't Exist",
    body: "General AI, a system that can do anything a human can do, learn anything, reason about anything: does not exist. It has never existed outside of science fiction. Every AI system ever built has been narrow. Some researchers think general AI is decades away. Some think it's impossible. Nobody thinks it exists right now.",
  },
  {
    tag: 'Scenario',
    title: 'Why This Matters',
    body: "In 1997 Deep Blue beat Kasparov. Headlines declared machines smarter than humans. But Deep Blue couldn't buy groceries, understand a joke, or learn a new game without being completely rebuilt. Narrow AI beating humans at specific tasks is not the same as AI being smarter than humans. Confusing the two is one of the most common and consequential mistakes people make about this technology.",
  },
  {
    tag: 'Hot take',
    title: 'The Danger Of Narrow AI',
    body: "Narrow AI can still cause enormous damage. A hiring algorithm that discriminates. A loan algorithm that denies credit by zip code. A content algorithm that radicalizes teenagers. None of these require general intelligence. They just require a narrow system optimizing the wrong thing at scale. You don't need AI to be smart to be dangerous. You need it to be fast and widely deployed.",
  },
  {
    tag: 'Example',
    title: 'Getting Closer',
    body: "Recent AI systems are getting broader. GPT-4 can see images and write code and reason about math. DeepMind's Gemini was trained across text, images, audio, and video simultaneously. These are still narrow in the technical sense. They don't have goals, desires, or self-awareness. But the gap between narrow and general is getting harder to define clearly.",
  },
  {
    tag: 'Big idea',
    title: 'The Real Question',
    body: "The question isn't whether AI is smart. It's what it's optimizing for and who decided that. A narrow AI optimizing for engagement can reshape democracy. A narrow AI optimizing for efficiency can eliminate millions of jobs. The intelligence level doesn't matter as much as the objective. And in almost every case, a human chose that objective. That means a human can choose a different one.",
  },
]

const QUESTIONS: Question[] = [
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: 'AI Is Not One Thing',
    question: `"All AI systems work the same way."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Face ID, ChatGPT, AlphaGo, and Spotify's recommendation engine are all called AI and work completely differently. They were built differently, trained differently, deployed for completely different purposes. Treating them as one thing leads to confused thinking about all of them.",
  },
  {
    difficulty: 'Easy',
    tag: 'Fact',
    stopTitle: 'Narrow AI',
    question: `"Every AI currently in existence is narrow: designed for specific tasks."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Every AI currently in existence is narrow. Face ID recognizes faces. Spotify recommends music. ChatGPT generates text. None of them can do each other's jobs. General AI, a system that can do anything a human can do, does not exist.",
  },
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: "General AI Doesn't Exist",
    question: `"General AI exists but most people don't have access to it."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "General AI does not exist at all. Not in a lab, not classified, not in development. It has never existed outside of science fiction. Every AI system ever built has been narrow. This is not a secret. It's just not how AI gets reported in the news.",
  },
  {
    difficulty: 'Medium',
    tag: 'Hot take',
    stopTitle: 'ChatGPT Is Still Narrow',
    question: `"ChatGPT is general AI because it can do so many different things."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "ChatGPT is narrow. Its task is generating text that fits patterns in its training data. It does that task across many domains: writing, coding, explaining, debating. But it cannot walk, feel, learn a new skill from scratch, or understand what any of the words it produces actually mean.",
  },
  {
    difficulty: 'Medium',
    tag: 'Hot take',
    stopTitle: 'The Danger Of Narrow AI',
    question: `"Narrow AI can still cause enormous harm even without general intelligence."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Discriminatory hiring algorithms, biased lending systems, radicalizing content algorithms: all narrow, all damaging at scale. You don't need general intelligence to cause large-scale harm. You need a narrow system optimizing the wrong objective deployed to millions of people.",
  },
  {
    difficulty: 'Medium',
    tag: 'Scenario',
    stopTitle: 'Why This Matters',
    question: `"Deep Blue beating Kasparov at chess in 1997 meant AI was becoming smarter than humans overall."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Deep Blue couldn't play checkers. It couldn't recognize a face or understand a sentence. Superhuman performance at a specific task says nothing about general intelligence. A calculator beats every human at arithmetic. That doesn't make it smart.",
  },
  {
    difficulty: 'Hard',
    tag: 'Fact',
    stopTitle: 'Getting Closer',
    question: `"The boundary between narrow and general AI is becoming harder to define as systems become more capable."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Systems like GPT-4 handle text, images, code, and reasoning across domains. They're still technically narrow but the boundary is harder to draw. This is one reason AI researchers disagree so much about timelines. They can't fully agree on what general AI would even mean.",
  },
  {
    difficulty: 'Hard',
    tag: 'Big idea',
    stopTitle: 'The Real Question',
    question: `"The most important question about any AI system is how intelligent it is."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "The most important question is what it's optimizing for and who decided that. A narrow AI optimizing for engagement can reshape political beliefs. A narrow AI optimizing for efficiency can displace millions of workers. The objective matters more than the intelligence level. And in almost every case a human chose that objective.",
  },
]

export default function Lesson4() {
  return <LessonTemplate id={4} title="Narrow vs General AI" stops={STOPS} questions={QUESTIONS} />
}
