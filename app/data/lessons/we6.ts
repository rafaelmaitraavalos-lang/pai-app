import { LessonData } from '../index'

const we6: Record<number, LessonData> = {
  52: {
    id: 52, worldId: 8, title: "What Is PAI's Brain?",
    stops: [
      { tag: 'Fact', title: "What Is PAI's Brain?", body: "PAI has a special brain made of tiny helpers all working together — kind of like a telephone game! Imagine you whisper something to your friend, they whisper it to the next friend, and so on. By the end, the message has passed through lots of people and something amazing comes out! PAI's brain works the same way. It has rows and rows of helpers. One row gets the question. The next row thinks about it. The next row thinks even more. And the last row gives you the answer!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Example', stopTitle: "What Is PAI's Brain?", question: `"Imagine whispering a secret through a long line of friends. That is similar to how PAI's brain works."`, answer: true, verdict: 'Correct!', explanation: "In the telephone game, each person passes the message to the next. PAI's brain works the same way — each row of helpers passes information to the next row until the final answer comes out!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: "What Is PAI's Brain?", question: `"PAI's brain has only a few helpers."`, answer: false, verdict: 'Not quite!', explanation: "PAI's brain has rows and rows of helpers — not just a few! All of them work together to take your question and turn it into an answer." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: "What Is PAI's Brain?", question: `"The very first row of helpers in PAI's brain is the one that receives your question."`, answer: true, verdict: 'Correct!', explanation: "The first row gets the question, the middle rows think about it harder and harder, and the very last row gives you the answer. Each row has an important job!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: "What Is PAI's Brain?", question: `"PAI's brain always needs a book or website to find answers."`, answer: false, verdict: 'Not quite!', explanation: "PAI does not look answers up! Its rows of helpers work together to figure out the answer all on their own — passing information from row to row until the last row gives you the final answer." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: "What Is PAI's Brain?", question: `"PAI's rows of helpers working together is what allows PAI to answer questions."`, answer: true, verdict: 'Correct!', explanation: "The teamwork of PAI's rows of helpers is what makes PAI smart! Each row does its part, passing information along, until the last row puts together your answer." },
    ],
  },

  53: {
    id: 53, worldId: 8, title: 'How PAI Learns',
    stops: [
      { tag: 'Example', title: 'How PAI Learns', body: "PAI learns by trying, making mistakes, and trying again — just like you do! Imagine learning to throw a basketball. The first time, you might miss. But every time you miss, you learn a little more about how to aim better. You keep practicing and practicing until you get it right! PAI does the same thing — millions and millions of times — until it gets really, really good. 🏀" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How PAI Learns', question: `"PAI can only learn if it never makes mistakes."`, answer: false, verdict: 'Not quite!', explanation: "Mistakes are actually how PAI learns! Every time PAI gets something wrong, it figures out how to do better next time. Making mistakes is an important part of getting really good." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How PAI Learns', question: `"PAI gets better and better the more it practices."`, answer: true, verdict: 'Correct!', explanation: "Just like you get better at throwing a basketball with practice, PAI gets better and better the more it tries. Millions of practice rounds make PAI really, really good!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'How PAI Learns', question: `"When you miss a basketball shot, you learn nothing and should just stop trying."`, answer: false, verdict: 'Not quite!', explanation: "Every miss teaches you something about how to aim better! PAI is the same way — every mistake helps it learn. Never stop trying!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'How PAI Learns', question: `"PAI practices millions of times, which is many more times than a person could ever practice."`, answer: true, verdict: 'Correct!', explanation: "A big difference between PAI and people is speed. PAI can practice millions of times super fast — way more than any person could in a lifetime. That is part of why it gets so good!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'How PAI Learns', question: `"Trying and failing is a waste of time for both people and PAI."`, answer: false, verdict: 'Not quite!', explanation: "Trying and failing is never a waste! For both people and PAI, every mistake is a chance to learn. That is exactly how you get from your first miss to your best shot!" },
    ],
  },

  54: {
    id: 54, worldId: 8, title: 'PAI Gets Smarter With More Practice',
    stops: [
      { tag: 'Big idea', title: 'PAI Gets Smarter With More Practice', body: "The more PAI practices, the better it gets at seeing the BIG picture. Think of it like drawing. When you first start, you can draw a dot. Then a line. Then a shape. Then a face! Each step builds on the last one. PAI starts by noticing small things — like lines and colors. Then it puts them together to see bigger things — like shapes. Then even bigger things — like a dog or a cat! Each step makes PAI smarter." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'PAI Gets Smarter With More Practice', question: `"PAI gets better at seeing the big picture the more it practices."`, answer: true, verdict: 'Correct!', explanation: "Practice makes PAI smarter! The more PAI practices, the better it gets at putting small things together to understand the full, big picture." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'PAI Gets Smarter With More Practice', question: `"PAI starts by recognizing an entire face or a whole dog before it notices smaller details."`, answer: false, verdict: 'Not quite!', explanation: "PAI starts small! It first notices tiny things like lines and colors. Then it builds up to shapes. Then bigger things like a dog or a cat. Small steps lead to the big picture!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'PAI Gets Smarter With More Practice', question: `"Drawing starts with a simple dot and builds up to a full face — this is similar to how PAI builds its understanding."`, answer: true, verdict: 'Correct!', explanation: "Drawing starts with a dot, then a line, then a shape, then a face. PAI's learning is the same — starting with tiny details and building up to recognize big, complex things!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'PAI Gets Smarter With More Practice', question: `"It is possible to skip steps when building up understanding, for both drawing and PAI."`, answer: false, verdict: 'Not quite!', explanation: "You cannot draw a face without first learning lines and shapes, and PAI cannot recognize a dog without first learning lines and colors. Every step is needed before the next one!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'PAI Gets Smarter With More Practice', question: `"PAI builds from small details, like lines and colors, all the way up to recognizing things like dogs and cats."`, answer: true, verdict: 'Correct!', explanation: "PAI's smartness is built layer by layer! It starts with the smallest things and works up to bigger and bigger ideas. That is what makes each step of practice so valuable." },
    ],
  },

  55: {
    id: 55, worldId: 8, title: 'How Does PAI Talk With You?',
    stops: [
      { tag: 'Fact', title: 'How Does PAI Talk With You?', body: "When you type a question to PAI, it doesn't go find the answer in a book. It figures out the answer one word at a time — like a really smart guessing game! PAI reads everything you said, then thinks: \"What word probably comes next?\" Then the next word. Then the next. Until a whole answer appears! It's like finishing someone's sentence — but PAI is SO good at it, the whole answer makes sense! ✨" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How Does PAI Talk With You?', question: `"PAI answers questions by guessing one word at a time."`, answer: true, verdict: 'Correct!', explanation: "PAI thinks about what word probably comes next, then the next, then the next — until a whole answer appears. It is one big, really smart guessing game!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How Does PAI Talk With You?', question: `"PAI reads what you wrote before deciding what word probably comes next."`, answer: true, verdict: 'Correct!', explanation: "PAI reads everything you said, then uses that to figure out what word should probably come next in its answer. The more it knows about your question, the better its answer!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'How Does PAI Talk With You?', question: `"PAI finds its answers the same way you look up information in a library."`, answer: false, verdict: 'Not quite!', explanation: "PAI does not look things up! Instead, it figures out the answer word by word — thinking about what word probably comes next each time. That is very different from searching a library!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'How Does PAI Talk With You?', question: `"PAI's answer-making works like a guessing game where each guess builds on the last."`, answer: true, verdict: 'Correct!', explanation: "Each word PAI picks helps it figure out the next word. It builds the answer one word at a time — like a guessing game that keeps going until the full answer is done!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'How Does PAI Talk With You?', question: `"Because PAI is so good at predicting the next word, its full answers almost always make sense."`, answer: true, verdict: 'Correct!', explanation: "PAI has practiced guessing the next word so many times that it has gotten really, really good at it. That is why its answers usually make sense from the very first word to the very last!" },
    ],
  },

  56: {
    id: 56, worldId: 8, title: 'How PAI Decides What to Show You',
    stops: [
      { tag: 'Example', title: 'How PAI Decides What to Show You', body: "Have you ever noticed that YouTube keeps showing you videos you actually like? PAI watches and learns what you enjoy. Then it finds other people who like the same things — and shows you what THEY liked too! It's like your friend saying: \"You love dinosaurs AND space? Then you HAVE to watch this — I love those things too!\" But remember — PAI is really good at showing exciting things that make you want to keep watching. It's always good to take breaks and do other things too! 🌟" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'How PAI Decides What to Show You', question: `"If you love dinosaurs AND space, PAI might show you videos that other dinosaur-and-space fans enjoyed."`, answer: true, verdict: 'Correct!', explanation: "PAI finds people with tastes similar to yours and shows you what they liked. It is like a friend saying 'You have to watch this — I love those things too!'" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How PAI Decides What to Show You', question: `"PAI cannot learn anything about what you enjoy."`, answer: false, verdict: 'Not quite!', explanation: "PAI watches and learns what you enjoy! It pays attention to what you like, watch, and click on, and then uses all of that to suggest more things you might love." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How PAI Decides What to Show You', question: `"Taking breaks from watching videos is a healthy choice even when PAI keeps showing exciting ones."`, answer: true, verdict: 'Correct!', explanation: "PAI is really good at making you want to keep watching. But taking breaks to play, read, or go outside is so important! Make sure YOU are in charge of when you watch — not PAI." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'How PAI Decides What to Show You', question: `"PAI decides what to show you based only on what you told it you like."`, answer: false, verdict: 'Not quite!', explanation: "PAI watches what you actually watch and enjoy — not just what you say you like. It also finds other people with similar tastes and shows you what they enjoyed. It learns from your actions!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'How PAI Decides What to Show You', question: `"PAI is designed to show you things that make you want to keep watching."`, answer: true, verdict: 'Correct!', explanation: "That is PAI's job — to keep you engaged! It is really good at it. That is why it is important to make your own choices about when to stop watching and go do something else." },
    ],
  },

  57: {
    id: 57, worldId: 8, title: 'How PAI Sees Pictures',
    stops: [
      { tag: 'Fact', title: 'How PAI Sees Pictures', body: "PAI can look at a picture and figure out what's in it — but it sees pictures in a very different way than you do! When you look at a dog, you just know it's a dog. But PAI sees millions of tiny colored squares called pixels. It looks at all those squares very carefully and finds patterns — pointy ears, four legs, a tail — and then guesses \"dog!\" It's like a puzzle. You don't look at every piece separately — you put them together to see the whole picture. PAI does the same thing! 🧩" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How PAI Sees Pictures', question: `"The tiny colored squares that make up a picture are called pixels."`, answer: true, verdict: 'Correct!', explanation: "Every picture on a screen is made of millions of tiny colored squares called pixels. That is what PAI sees when it looks at a photo — and it carefully examines all of them!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'How PAI Sees Pictures', question: `"PAI can recognize a dog by finding patterns in a picture, like four legs and pointy ears."`, answer: true, verdict: 'Correct!', explanation: "PAI looks for patterns in all those tiny pixels. When it finds things like four legs, pointy ears, and a tail, it adds them up and guesses 'dog!' That is how it learns to see!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How PAI Sees Pictures', question: `"PAI and humans see pictures in exactly the same way."`, answer: false, verdict: 'Not quite!', explanation: "You see a dog and just know it is a dog. PAI sees millions of tiny squares and has to search for patterns to figure it out. Same picture, very different way of seeing it!" },
      { difficulty: 'Medium', tag: 'Example', stopTitle: 'How PAI Sees Pictures', question: `"Recognizing a picture for PAI is like solving a puzzle — it has to put many small pieces together."`, answer: true, verdict: 'Correct!', explanation: "Just like a puzzle needs all its pieces to show the full image, PAI puts together all the tiny pixel patterns to figure out what is in a photo. It is a lot of work — but PAI does it super fast!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'How PAI Sees Pictures', question: `"The patterns PAI finds in pixels, like ears and legs, are what help it guess what is in a picture."`, answer: true, verdict: 'Correct!', explanation: "Patterns are the key! PAI spots patterns in millions of tiny squares — pointy ears here, four legs there, a tail in the corner — and uses those patterns to make its best guess about what it is seeing." },
    ],
  },

  58: {
    id: 58, worldId: 8, title: 'The Mystery Inside PAI',
    stops: [
      { tag: 'Hot take', title: 'The Mystery Inside PAI', body: "Here's something really interesting — even the people who MADE PAI don't always understand exactly why it gives a certain answer! It's like asking someone how they knew a joke was funny. They just… knew. They can't always explain every single reason. PAI works through SO many steps so fast that even its makers can't always follow along. That's why scientists are always working hard to understand PAI better — so we can make sure it's always being helpful and kind. 🔬" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Hot take', stopTitle: 'The Mystery Inside PAI', question: `"PAI's brain is a little mysterious — even to the scientists who built it."`, answer: true, verdict: 'Correct!', explanation: "PAI works through so many steps so fast that even its creators cannot always follow along. That mystery is one of the reasons scientists work so hard to understand PAI better!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'The Mystery Inside PAI', question: `"Understanding how PAI makes decisions helps make sure it is always helpful and kind."`, answer: true, verdict: 'Correct!', explanation: "If scientists can figure out how PAI thinks and makes decisions, they can catch mistakes and make sure PAI always behaves in ways that are helpful, fair, and kind to everyone." },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'The Mystery Inside PAI', question: `"When someone cannot explain why a joke is funny, that is completely different from how PAI sometimes cannot explain its answers."`, answer: false, verdict: 'Not quite!', explanation: "They are actually very similar! Just like you might know a joke is funny without knowing exactly why, PAI gives answers that can be hard to trace back through all its steps." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'The Mystery Inside PAI', question: `"The reason PAI is mysterious is that it works through an enormous number of steps very quickly."`, answer: true, verdict: 'Correct!', explanation: "PAI's brain processes huge amounts of information at incredible speed. There are so many steps happening so fast that even its makers cannot always track them all. Speed creates mystery!" },
      { difficulty: 'Medium', tag: 'Hot take', stopTitle: 'The Mystery Inside PAI', question: `"As long as PAI's answers seem helpful, it does not matter how it reached them."`, answer: false, verdict: 'Not quite!', explanation: "It matters a lot! If we do not understand how PAI reaches its answers, we cannot fix it when it makes mistakes or check that it is being fair. Understanding PAI helps keep everyone safe." },
    ],
  },

  59: {
    id: 59, worldId: 8, title: 'When PAI Gets Things Wrong',
    stops: [
      { tag: 'Fact', title: 'When PAI Gets Things Wrong', body: "PAI is really smart, but it's NOT perfect. Sometimes it makes mistakes! Imagine if you learned a math rule wrong on day one — then every problem after that might also be a little wrong. Small mistakes can turn into bigger ones. That's why it's SO important to always double-check what PAI tells you, especially for really important things. PAI is a great helper, but YOU are the one who has to think and decide. Your brain is amazing and PAI needs people like you to keep it on track! 🌈" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'When PAI Gets Things Wrong', question: `"PAI is a great helper, but it is not perfect."`, answer: true, verdict: 'Correct!', explanation: "PAI is really smart and can do amazing things — but it is not perfect. It can make mistakes, and those mistakes can sometimes grow into bigger ones. Always double-check important things!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'When PAI Gets Things Wrong', question: `"Learning a math rule wrong on day one is like how a small mistake can cause bigger problems for PAI later."`, answer: true, verdict: 'Correct!', explanation: "A mistake learned early can ripple through everything after it — for you in math class and for PAI in its answers. That is why catching mistakes early and double-checking things is so important!" },
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'When PAI Gets Things Wrong', question: `"PAI does not need people to keep it on track — it always fixes its own mistakes."`, answer: false, verdict: 'Not quite!', explanation: "PAI needs people like you! Humans are the ones who catch PAI's mistakes and help keep it on track. Your brain and your judgment are incredibly valuable — PAI could not do well without them." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'When PAI Gets Things Wrong', question: `"Checking important information that PAI gives you is always a smart idea."`, answer: true, verdict: 'Correct!', explanation: "Even though PAI is very smart, it can be wrong. For anything really important, use your own brain, ask a grown-up, and check other sources too. You are the final decision maker!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'When PAI Gets Things Wrong', question: `"Small mistakes that PAI learns can stay small and never cause bigger problems."`, answer: false, verdict: 'Not quite!', explanation: "Small mistakes can grow! A wrong rule learned early can lead to more wrong answers later — just like a math mistake on day one can keep showing up in every problem after. That is why fixing mistakes early matters!" },
    ],
  },
}

export default we6
