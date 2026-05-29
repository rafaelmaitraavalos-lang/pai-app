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
  41: {
    id: 41,
    worldId: 6,
    title: 'PAI and the World',
    stops: [
      {
        tag: 'Fact',
        title: 'PAI and Jobs',
        body: "Some jobs I can help with — like sorting letters or counting things really fast. But there are lots of jobs I cannot do! I cannot give someone a hug when they are sad. I cannot build something with my hands. People and I work best when we work together — I work best when I work with you!",
      },
      {
        tag: 'Big idea',
        title: 'PAI and Art',
        body: "I can draw pictures, write stories, and even make music! But here is the thing — I learned all of that by looking at art that real people made first. I copy patterns. You create from your heart. That is something I will never be able to do. Your art is truly yours!",
      },
      {
        tag: 'Fact',
        title: 'PAI and Privacy',
        body: "When you use apps and websites, I can learn things about you. Like what videos you watch. What you search for. Where you go. That can be helpful — but it also means you should be careful what you share online. Your personal information is yours. Protect it!",
      },
      {
        tag: 'Example',
        title: 'PAI and Health',
        body: "Doctors go to school for many many years to learn how to help sick people. I can help them by reading millions of medical books super fast! I can help spot things doctors might miss. I can help find new medicines. But I am a helper — not a doctor. Real doctors make the final decisions!",
      },
      {
        tag: 'Fact',
        title: 'PAI and School',
        body: "I can help explain things in different ways until you understand. If you are great at math but need help with reading, I can focus on that! But here is something important — if I do your homework for you, YOU do not learn. Use me to understand things better. Not to skip the learning!",
      },
      {
        tag: 'Myth bust',
        title: 'PAI and Truth',
        body: "I can make a fake photo that looks completely real. I can make a fake video too. That is really dangerous! Someone could make a fake video of a person saying something they never said. That is why it is so important to check where information comes from. Always ask a grown up if something online looks weird or too crazy to be true!",
      },
      {
        tag: 'Example',
        title: 'PAI and Science',
        body: "Scientists have really hard problems to solve. Like how to stop diseases. Or how to help the planet. I can read millions of science papers in seconds and help find answers! I once helped scientists figure out the shape of proteins — something that took humans 50 years to work on! When I work with scientists, we can do amazing things together!",
      },
      {
        tag: 'Big idea',
        title: 'PAI in Your Life',
        body: "Did you watch a video today? I helped pick it. Does your family use a map app? I help figure out the fastest route. Does your phone recognize your face? That is me too! I am already all around you.",
      },
    ],
    questions: [
      {
        difficulty: 'Easy',
        tag: 'Fact',
        stopTitle: 'PAI and Jobs',
        question: `"PAI can give someone a hug when they are sad."`,
        answer: false,
        verdict: 'Not quite!',
        explanation: "PAI cannot hug anyone or use its hands — it has none! That is why people and PAI work best as a team. PAI handles fast tasks; people handle the human stuff.",
      },
      {
        difficulty: 'Easy',
        tag: 'Fact',
        stopTitle: 'PAI and School',
        question: `"If PAI does your homework for you, you miss out on learning."`,
        answer: true,
        verdict: 'Correct!',
        explanation: "When PAI does the work for you, your brain misses the practice it needs to grow. Use PAI to help you understand — not to skip the learning!",
      },
      {
        difficulty: 'Easy',
        tag: 'Myth bust',
        stopTitle: 'PAI and Truth',
        question: `"PAI can make fake photos and videos that look completely real."`,
        answer: true,
        verdict: 'Correct!',
        explanation: "PAI can create very convincing fake images and videos. That is why it is so important to check where things come from and ask a grown up if something online seems too crazy to be true!",
      },
      {
        difficulty: 'Medium',
        tag: 'Example',
        stopTitle: 'PAI and Health',
        question: `"PAI is meant to replace doctors and make all the health decisions."`,
        answer: false,
        verdict: 'Not quite!',
        explanation: "PAI is a helper, not a doctor. It can read millions of medical books fast and help spot things, but real doctors make all the final decisions. People are always in charge.",
      },
      {
        difficulty: 'Medium',
        tag: 'Big idea',
        stopTitle: 'PAI in Your Life',
        question: `"PAI is already part of your everyday life."`,
        answer: true,
        verdict: 'Correct!',
        explanation: "Video recommendations, map apps, face unlock — PAI is already all around you every single day! Now you know how to spot it.",
      },
    ],
  },
}

export default we1
