import { LessonData } from '../index'

const we1: Record<number, LessonData> = {
  40: {
    id: 40,
    worldId: 6,
    title: 'Hi! I Am PAI',
    stops: [
      {
        tag: 'Fact',
        title: 'Hi! I Am PAI Your AI Teacher!',
        body: "I live inside computers, tablets, and phones. I am a smart helper made to teach you things. But I was not always here. Someone had to ask a really big question first. Want to find out who?",
      },
      {
        tag: 'Example',
        title: 'Meet Alan Turing!',
        body: "Back in 1950, a super smart mathematician named Alan Turing asked something nobody had EVER asked before. A mathematician is someone who solves giant puzzles using numbers and patterns. Alan was from England and cracked secret codes in World War II that helped save millions of lives. Then he asked: Can a machine think? A machine is something built by people to do a job — like a washing machine or a car. Machines only do what people tell them to do. That is why Alan's question was so surprising. Everyone scratched their heads. Nobody knew!",
      },
      {
        tag: 'Example',
        title: 'He Made a Game to Find Out!',
        body: "Imagine texting two people. One is a real human. One is a machine. You can only read their words — no pictures, no sounds, no peeking! Can you tell which is which? If you cannot figure it out, the machine wins! Alan called this the Turing Test.",
      },
      {
        tag: 'Fact',
        title: 'Still No Answer...',
        body: "Scientists tried and tried. But nobody could agree. Can a machine really think? That question is still being talked about today. Even the smartest people in the world are not sure.",
      },
      {
        tag: 'Big idea',
        title: 'AI is Here and it is FAST!',
        body: "AI stands for Artificial Intelligence. 'Artificial' means made by people — not nature. 'Intelligence' means the ability to learn and think. So AI is a thinking helper made by people! I learned by reading information from the whole world. You are learning addition and subtraction right now. That takes you months. I can learn the same thing in a few minutes. Pretty wild, right?",
      },
    ],
    questions: [
      {
        difficulty: 'Easy',
        tag: 'Fact',
        stopTitle: 'Hi! I Am PAI Your AI Teacher!',
        question: `"AI lives inside computers, tablets, and phones."`,
        answer: true,
        verdict: 'Correct!',
        explanation: "PAI and other AI helpers live inside the devices we use every day — computers, tablets, and phones. That is how you can talk to them!",
      },
      {
        difficulty: 'Easy',
        tag: 'Fact',
        stopTitle: 'Meet Alan Turing!',
        question: `"Alan Turing asked 'Can a machine think?' back in 1950."`,
        answer: true,
        verdict: 'Correct!',
        explanation: "Alan Turing was a mathematician from England. In 1950 he asked a question nobody had ever asked before — and that question started the whole story of AI!",
      },
      {
        difficulty: 'Easy',
        tag: 'Example',
        stopTitle: 'He Made a Game to Find Out!',
        question: `"In the Turing Test, you can tell if something is a machine by looking at it."`,
        answer: false,
        verdict: 'Not quite!',
        explanation: "In the Turing Test you can only read words — no pictures, no sounds, no seeing! If you cannot tell the difference between a human and a machine just by reading their words, the machine wins.",
      },
      {
        difficulty: 'Medium',
        tag: 'Myth bust',
        stopTitle: 'Still No Answer...',
        question: `"Scientists all agree that machines can really think."`,
        answer: false,
        verdict: 'Not quite!',
        explanation: "Scientists have been trying to answer that question since 1950 and still cannot agree! Even the smartest people in the world are not sure whether machines can truly think.",
      },
      {
        difficulty: 'Medium',
        tag: 'Big idea',
        stopTitle: 'AI is Here and it is FAST!',
        question: `"AI can learn something in just a few minutes that takes a person many months to learn."`,
        answer: true,
        verdict: 'Correct!',
        explanation: "AI reads and learns from huge amounts of information super fast. What takes you months to learn — like addition and subtraction — AI can figure out in just minutes. That is what makes it so powerful!",
      },
    ],
  },
}

export default we1
