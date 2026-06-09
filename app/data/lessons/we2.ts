import { LessonData } from '../index'

const we2: Record<number, LessonData> = {
  60: {
    id: 60, worldId: 9, title: "What Is PAI's Brain?",
    stops: [
      { tag: 'Fact', title: "What Is PAI's Brain?", body: "PAI has a special brain made of tiny helpers all working together — kind of like a telephone game! Imagine you whisper something to your friend, they whisper it to the next friend, and so on. By the end, the message has passed through lots of people and something amazing comes out! PAI's brain works the same way. It has rows and rows of helpers. One row gets the question. The next row thinks about it. The next row thinks even more. And the last row gives you the answer!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: "What Is PAI's Brain?", question: `"PAI's brain has just one helper that does everything all by itself."`, answer: false, verdict: 'Not quite!', explanation: "PAI's brain has rows and rows of tiny helpers all working together! Each row passes information to the next until the last row gives you the final answer." },
      { difficulty: 'Easy', tag: 'Example', stopTitle: "What Is PAI's Brain?", question: `"PAI's brain works kind of like a telephone game, with each row of helpers passing information to the next."`, answer: true, verdict: 'Correct!', explanation: "Just like whispering a message through a line of friends, PAI's helpers pass information from row to row until the final answer comes out!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: "What Is PAI's Brain?", question: `"The last row of helpers in PAI's brain is the one that gives you the answer."`, answer: true, verdict: 'Correct!', explanation: "The first row gets the question, the middle rows think harder about it, and the very last row gives you the answer. Teamwork!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: "What Is PAI's Brain?", question: `"Each row of helpers in PAI's brain does the exact same job."`, answer: false, verdict: 'Not quite!', explanation: "Each row has a different job! The first row gets the question, the next rows think about it more and more, and the last row gives the final answer." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: "What Is PAI's Brain?", question: `"PAI's brain works exactly the same way a human brain works."`, answer: false, verdict: 'Not quite!', explanation: "PAI's brain is made of rows of helpers that pass information along — that is different from your brain. Your brain is amazing and one of a kind!" },
    ],
  },

  61: {
    id: 61, worldId: 9, title: 'How PAI Learns',
    stops: [
      { tag: 'Example', title: 'How PAI Learns', body: "PAI learns by trying, making mistakes, and trying again — just like you do! Imagine learning to throw a basketball. The first time, you might miss. But every time you miss, you learn a little more about how to aim better. You keep practicing and practicing until you get it right! PAI does the same thing — millions and millions of times — until it gets really, really good. 🏀" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How PAI Learns', question: `"PAI learns everything perfectly on its very first try."`, answer: false, verdict: 'Not quite!', explanation: "PAI learns by trying, making mistakes, and trying again — just like you do when you practice a new skill. It takes millions and millions of tries to get really good!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'How PAI Learns', question: `"Learning to throw a basketball — by missing and adjusting — is a good example of how PAI learns."`, answer: true, verdict: 'Correct!', explanation: "Every time you miss the basket, you learn something about how to aim better. PAI does the same thing with its mistakes — practicing until it gets really, really good!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How PAI Learns', question: `"PAI practices millions and millions of times to get really good at something."`, answer: true, verdict: 'Correct!', explanation: "PAI tries over and over again — millions of times — learning a little from each mistake until it becomes really, really good at what it does!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'How PAI Learns', question: `"PAI learns in a completely different way than people do."`, answer: false, verdict: 'Not quite!', explanation: "PAI actually learns a lot like you do — by trying, making mistakes, and trying again. The big difference is PAI can practice millions of times much faster than any person could!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'How PAI Learns', question: `"Making mistakes is part of how both people and PAI get better at things."`, answer: true, verdict: 'Correct!', explanation: "Mistakes are not just okay — they are how learning happens! Every time PAI makes a mistake it learns something new. Every time you miss a shot you figure out how to aim better. Keep going!" },
    ],
  },

  62: {
    id: 62, worldId: 9, title: 'PAI Gets Smarter With More Practice',
    stops: [
      { tag: 'Big idea', title: 'PAI Gets Smarter With More Practice', body: "The more PAI practices, the better it gets at seeing the BIG picture. Think of it like drawing. When you first start, you can draw a dot. Then a line. Then a shape. Then a face! Each step builds on the last one. PAI starts by noticing small things — like lines and colors. Then it puts them together to see bigger things — like shapes. Then even bigger things — like a dog or a cat! Each step makes PAI smarter." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'PAI Gets Smarter With More Practice', question: `"PAI starts by recognizing big things like dogs and cats right away."`, answer: false, verdict: 'Not quite!', explanation: "PAI starts small — noticing lines and colors first. Then it puts those together to see shapes. Then bigger things like dogs and cats. Each step builds on the one before!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'PAI Gets Smarter With More Practice', question: `"Learning to draw — starting with a dot, then a line, then a shape, then a face — is like how PAI builds understanding step by step."`, answer: true, verdict: 'Correct!', explanation: "Just like drawing builds up from a dot to a full face, PAI starts with tiny details and builds up to recognize big things. Each step makes PAI smarter!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'PAI Gets Smarter With More Practice', question: `"The more PAI practices, the better it gets at seeing the big picture."`, answer: true, verdict: 'Correct!', explanation: "Practice really does make perfect for PAI! The more it practices, the better it gets at putting small things together to understand the big picture." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'PAI Gets Smarter With More Practice', question: `"PAI skips small details and jumps straight to recognizing big things."`, answer: false, verdict: 'Not quite!', explanation: "PAI starts with the smallest things — like lines and colors — and slowly builds up to bigger things like shapes, and then even bigger things like dogs or cats. Every step matters!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'PAI Gets Smarter With More Practice', question: `"Each new step PAI learns builds on what it learned in the step before."`, answer: true, verdict: 'Correct!', explanation: "Just like going from a dot to a line to a shape to a face, PAI's learning builds step by step. You cannot skip steps — each one makes the next one possible!" },
    ],
  },

  63: {
    id: 63, worldId: 9, title: 'How Does PAI Talk With You?',
    stops: [
      { tag: 'Fact', title: 'How Does PAI Talk With You?', body: "When you type a question to PAI, it doesn't go find the answer in a book. It actually figures out the answer one word at a time — like a really smart guessing game! PAI reads everything you said, then thinks: \"What word probably comes next?\" Then the next word. Then the next. Until a whole answer appears! It's like finishing someone's sentence — but PAI is SO good at it, the whole answer makes sense! ✨" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How Does PAI Talk With You?', question: `"When you ask PAI a question, it finds the answer by looking it up in a book."`, answer: false, verdict: 'Not quite!', explanation: "PAI does not look things up in a book! It figures out the answer one word at a time by thinking about what word probably comes next. It is like a super smart guessing game!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How Does PAI Talk With You?', question: `"PAI builds its answer one word at a time."`, answer: true, verdict: 'Correct!', explanation: "PAI thinks about what word probably comes next, then the next, then the next — until a whole answer appears! It is like finishing a sentence, one word at a time." },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'How Does PAI Talk With You?', question: `"PAI is so good at guessing the next word that its whole answer usually makes sense."`, answer: true, verdict: 'Correct!', explanation: "PAI is really good at predicting what word comes next. By the time it puts all the words together, the whole answer makes sense — like finishing someone's sentence perfectly!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'How Does PAI Talk With You?', question: `"PAI writes out its entire answer all at once before you see any of it."`, answer: false, verdict: 'Not quite!', explanation: "PAI figures out its answer word by word, thinking about what probably comes next each time. The answer builds up one word at a time until it is complete!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'How Does PAI Talk With You?', question: `"PAI answering a question is like someone who is very good at finishing your sentence."`, answer: true, verdict: 'Correct!', explanation: "Just like a friend who knows you really well might finish your sentence perfectly, PAI is so good at predicting the next word that its whole answer makes sense from start to finish!" },
    ],
  },

  64: {
    id: 64, worldId: 9, title: 'How PAI Decides What to Show You',
    stops: [
      { tag: 'Example', title: 'How PAI Decides What to Show You', body: "Have you ever noticed that YouTube keeps showing you videos you actually like? PAI watches and learns what you enjoy. Then it finds other people who like the same things — and shows you what THEY liked too! It's like your friend saying: \"You love dinosaurs AND space? Then you HAVE to watch this — I love those things too!\" But remember — PAI is really good at showing exciting things that make you want to keep watching. It's always good to take breaks and do other things too! 🌟" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How PAI Decides What to Show You', question: `"PAI watches what you enjoy and uses that to suggest things you might like."`, answer: true, verdict: 'Correct!', explanation: "PAI pays attention to what you watch, click on, and enjoy. Then it uses that information to show you more things you might like — just like a friend who knows your taste!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'How PAI Decides What to Show You', question: `"PAI shows the exact same videos to every single person, no matter what they like."`, answer: false, verdict: 'Not quite!', explanation: "PAI learns what each person enjoys and shows them different things based on that. It finds other people with similar tastes and shows you what they liked too — it is personalized just for you!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How PAI Decides What to Show You', question: `"It is always a good idea to take breaks from watching PAI-recommended videos."`, answer: true, verdict: 'Correct!', explanation: "PAI is great at showing exciting things that make you want to keep watching. But taking breaks and doing other things — playing, reading, going outside — is really important too!" },
      { difficulty: 'Medium', tag: 'Example', stopTitle: 'How PAI Decides What to Show You', question: `"PAI finds people who like the same things as you and shows you what they enjoyed."`, answer: true, verdict: 'Correct!', explanation: "PAI connects you with people who have similar tastes! If you love dinosaurs and space, PAI might find someone else who loves both — and show you what they watched." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'How PAI Decides What to Show You', question: `"PAI shows you exciting videos only because it wants to help you learn."`, answer: false, verdict: 'Not quite!', explanation: "PAI is very good at showing exciting things that make you want to keep watching — that is its job! That is why it is important to make your own choices and take breaks instead of watching forever." },
    ],
  },

  65: {
    id: 65, worldId: 9, title: 'How PAI Sees Pictures',
    stops: [
      { tag: 'Fact', title: 'How PAI Sees Pictures', body: "PAI can look at a picture and figure out what's in it — but it sees pictures in a very different way than you do! When you look at a dog, you just know it's a dog. But PAI sees millions of tiny colored squares called pixels. It looks at all those squares very carefully and finds patterns — pointy ears, four legs, a tail — and then guesses \"dog!\" It's like a puzzle. You don't look at every piece separately — you put them together to see the whole picture. PAI does the same thing! 🧩" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How PAI Sees Pictures', question: `"PAI sees pictures the same way you do — it just instantly knows what is in them."`, answer: false, verdict: 'Not quite!', explanation: "PAI sees pictures very differently from you! It sees millions of tiny colored squares called pixels and looks for patterns in them. You recognize a dog instantly — PAI has to work through all those tiny squares first." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'How PAI Sees Pictures', question: `"PAI sees pictures as millions of tiny colored squares called pixels."`, answer: true, verdict: 'Correct!', explanation: "Every picture is made of millions of tiny colored squares called pixels. PAI carefully looks at all of them to find patterns — like pointy ears, four legs, and a tail — to figure out what is in the picture." },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'How PAI Sees Pictures', question: `"PAI looks for patterns like pointy ears, four legs, and a tail to figure out that a picture shows a dog."`, answer: true, verdict: 'Correct!', explanation: "PAI cannot just 'see' a dog the way you can. It looks for patterns in all those tiny pixels — pointy ears, four legs, a wagging tail — and then figures out it must be a dog!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'How PAI Sees Pictures', question: `"Looking at a picture for PAI is like putting together a puzzle — it combines many small pieces to see the whole image."`, answer: true, verdict: 'Correct!', explanation: "Just like you put puzzle pieces together to see the whole picture, PAI puts all the pixel patterns together to figure out what is in a photo. Small pieces, big picture!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'How PAI Sees Pictures', question: `"PAI can figure out what is in a picture without looking for any patterns."`, answer: false, verdict: 'Not quite!', explanation: "PAI has to find patterns — like the shape of ears, legs, and tails — to figure out what is in a picture. Finding those patterns in millions of tiny squares is exactly how PAI 'sees'!" },
    ],
  },

  66: {
    id: 66, worldId: 9, title: 'The Mystery Inside PAI',
    stops: [
      { tag: 'Hot take', title: 'The Mystery Inside PAI', body: "Here's something really interesting — even the people who MADE PAI don't always understand exactly why it gives a certain answer! It's like asking someone how they knew a joke was funny. They just… knew. They can't always explain every single reason. PAI works through SO many steps so fast that even its makers can't always follow along. That's why scientists are always working hard to understand PAI better — so we can make sure it's always being helpful and kind. 🔬" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'The Mystery Inside PAI', question: `"The people who made PAI always know exactly why it gives every answer."`, answer: false, verdict: 'Not quite!', explanation: "Even PAI's makers do not always understand why it says something! PAI works through so many steps so fast that it is hard to follow along. That is why scientists work hard to understand it better." },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'The Mystery Inside PAI', question: `"PAI's answers can be hard to explain, kind of like how it is hard to explain exactly why a joke is funny."`, answer: true, verdict: 'Correct!', explanation: "Sometimes you just know something is funny — but explaining exactly why is tricky! PAI can be like that too. It gives an answer, but the reasons behind it can be very hard to trace." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'The Mystery Inside PAI', question: `"Scientists are working to understand PAI better so it is always helpful and kind."`, answer: true, verdict: 'Correct!', explanation: "Because PAI can be mysterious even to its makers, scientists work really hard to figure out how it thinks. That way they can make sure PAI always behaves in ways that are helpful and kind to everyone!" },
      { difficulty: 'Medium', tag: 'Hot take', stopTitle: 'The Mystery Inside PAI', question: `"It does not matter if we understand how PAI makes decisions, as long as the answers seem right."`, answer: false, verdict: 'Not quite!', explanation: "It really does matter! If we do not understand how PAI makes decisions, we cannot catch mistakes or make sure it is always being fair and helpful. That is why scientists keep working to understand PAI better." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'The Mystery Inside PAI', question: `"PAI works through so many steps so fast that even its makers cannot always follow along."`, answer: true, verdict: 'Correct!', explanation: "PAI's brain works through enormous numbers of steps super quickly. Even the smartest scientists who built PAI cannot always track every step. That is what makes PAI both amazing and a little mysterious!" },
    ],
  },

  67: {
    id: 67, worldId: 9, title: 'When PAI Gets Things Wrong',
    stops: [
      { tag: 'Fact', title: 'When PAI Gets Things Wrong', body: "PAI is really smart, but it's NOT perfect. Sometimes it makes mistakes! Imagine if you learned a math rule wrong on day one — then every problem after that might also be a little wrong. Small mistakes can turn into bigger ones. That's why it's SO important to always double-check what PAI tells you, especially for really important things. PAI is a great helper, but YOU are the one who has to think and decide. Your brain is amazing and PAI needs people like you to keep it on track! 🌈" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'When PAI Gets Things Wrong', question: `"PAI is perfect and never makes any mistakes."`, answer: false, verdict: 'Not quite!', explanation: "PAI is really smart, but it is NOT perfect! It can make mistakes — and small mistakes can sometimes turn into bigger ones. That is why it is so important to double-check important things PAI tells you." },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'When PAI Gets Things Wrong', question: `"If PAI learns something wrong at the beginning, that small mistake can lead to bigger mistakes later."`, answer: true, verdict: 'Correct!', explanation: "Just like learning a math rule wrong on day one can cause mistakes in every problem after, a small mistake PAI learns early can grow into bigger ones. That is why checking PAI's answers matters!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'When PAI Gets Things Wrong', question: `"You should always double-check what PAI tells you, especially for really important things."`, answer: true, verdict: 'Correct!', explanation: "Always double-check! PAI is a great helper, but it can be wrong. For anything really important, use your own amazing brain and ask a grown-up to help verify too." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'When PAI Gets Things Wrong', question: `"PAI makes all your decisions for you, so you do not need to think for yourself."`, answer: false, verdict: 'Not quite!', explanation: "YOU are the one who thinks and decides! PAI is a helper, not a decision maker. Your brain is amazing — and PAI actually needs people like you to keep it on track and catch its mistakes." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'When PAI Gets Things Wrong', question: `"People play an important role in catching PAI's mistakes and keeping it on track."`, answer: true, verdict: 'Correct!', explanation: "PAI needs humans! People catch mistakes, point out what went wrong, and help make PAI better. Your brain and your judgment are exactly what PAI needs to stay helpful and kind." },
    ],
  },
}

export default we2
