import { LessonData } from '../index'

const we5: Record<number, LessonData> = {
  44: {
    id: 44, worldId: 7, title: 'Where We Are Now',
    stops: [
      { tag: 'Fact', title: 'AI Is Everywhere', body: "AI is everywhere — in doctors' offices, cars, music apps, and science labs." },
      { tag: 'Big idea', title: 'Just the Beginning', body: "We are just at the beginning. The AI we have now is like the very first page of a long, amazing book." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'AI Is Everywhere', question: `"AI is only found in computers and phones — not in cars or science labs."`, answer: false, verdict: 'Not quite!', explanation: "AI is already everywhere! It is in doctors' offices helping spot diseases, in cars helping them drive, in music apps choosing songs, and in science labs solving big problems." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'AI Is Everywhere', question: `"AI can be found in doctors' offices, cars, music apps, and science labs."`, answer: true, verdict: 'Correct!', explanation: "AI is already part of everyday life all around you — from the music app that picks your favorite songs to the tools doctors use to help patients." },
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'Just the Beginning', question: `"The AI we have today is the most advanced AI there will ever be."`, answer: false, verdict: 'Not quite!', explanation: "We are just on the very first page of a long, amazing story! AI is growing and improving fast, and what comes next could be even more incredible than what we have now." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Just the Beginning', question: `"The AI we have right now is just the beginning of something much bigger."`, answer: true, verdict: 'Correct!', explanation: "Think of today's AI like the first page of a really long book. The story is just getting started — the best parts are still ahead!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'AI Is Everywhere', question: `"AI has nothing to do with the apps and technology you use every day."`, answer: false, verdict: 'Not quite!', explanation: "AI is already woven into the apps and technology all around you! Music recommendations, map directions, and even video suggestions are all powered by AI." },
    ],
  },

  45: {
    id: 45, worldId: 7, title: 'The Road to AGI',
    stops: [
      { tag: 'Fact', title: 'One Thing at a Time', body: "Today's AI is really good at ONE thing at a time. PAI can answer questions but can't also ride a bike." },
      { tag: 'Big idea', title: 'What Is AGI?', body: "AGI means an AI that can do LOTS of different things — just like you can. Nobody has made AGI yet, but scientists are working on it!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'One Thing at a Time', question: `"Today's AI can only do one thing at a time — it cannot do everything at once."`, answer: true, verdict: 'Correct!', explanation: "An AI that answers questions cannot also ride a bike. Today's AI is super good at its one job, but it cannot switch between lots of different skills like you can!" },
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'What Is AGI?', question: `"AGI already exists and is being used by scientists today."`, answer: false, verdict: 'Not quite!', explanation: "Nobody has made AGI yet! Scientists are working on it, but an AI that can do lots of different things — just like a person — does not exist yet." },
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'What Is AGI?', question: `"AGI stands for Artificial General Intelligence."`, answer: true, verdict: 'Correct!', explanation: "AGI stands for Artificial General Intelligence — an AI that could learn and do all kinds of different things, not just one specific skill. That is the big goal scientists are working toward!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'One Thing at a Time', question: `"An AI that can answer your questions can also ride a bike."`, answer: false, verdict: 'Not quite!', explanation: "Today's AI is specialized — it does its one job really well. An AI built to answer questions cannot also ride a bike. That is very different from how YOU work, since you can do so many things!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'What Is AGI?', question: `"AGI would be an AI that can do many different things, just like a person."`, answer: true, verdict: 'Correct!', explanation: "That is exactly what AGI means! Just like you can read, run, draw, and have a conversation, AGI would be an AI that can handle all kinds of different tasks. Nobody has built it yet — but scientists are trying!" },
    ],
  },

  46: {
    id: 46, worldId: 7, title: 'The Alignment Problem',
    stops: [
      { tag: 'Example', title: 'The Robot That Cleaned Wrong', body: "You told a robot: \"Clean my room!\" It threw everything in the trash. The room IS clean — but that's not what you meant!" },
      { tag: 'Fact', title: 'What Alignment Means', body: "Alignment means making sure AI understands what you really want, not just what you said. Getting this right really matters." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'The Robot That Cleaned Wrong', question: `"If you tell a robot to clean your room, it always knows exactly what you mean."`, answer: false, verdict: 'Not quite!', explanation: "AI follows instructions very literally! If you say 'clean my room' and do not explain what that means, the robot might throw everything away. It did what you said — but not what you meant!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What Alignment Means', question: `"Alignment means making sure AI does what you actually mean, not just what you literally said."`, answer: true, verdict: 'Correct!', explanation: "That is exactly what alignment means! When AI truly understands what you want — not just the exact words you used — that is called being aligned. Getting this right is one of the most important challenges in AI." },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'The Robot That Cleaned Wrong', question: `"A room can be technically 'clean' even if it is not what you actually wanted."`, answer: true, verdict: 'Correct!', explanation: "The robot threw everything away — so the room is technically empty and clean! But that is not what you wanted at all. This is exactly why alignment matters: AI needs to understand your real goal, not just follow words literally." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'What Alignment Means', question: `"The alignment problem is about teaching AI to move in a straight line."`, answer: false, verdict: 'Not quite!', explanation: "Alignment has nothing to do with moving straight! It is about making sure AI understands what people truly want — not just the exact words they use. Getting alignment right is super important for keeping AI helpful and safe." },
      { difficulty: 'Medium', tag: 'Example', stopTitle: 'The Robot That Cleaned Wrong', question: `"AI that follows instructions too literally can end up doing something unhelpful or wrong."`, answer: true, verdict: 'Correct!', explanation: "That robot really did clean the room — by throwing everything away! It followed the instruction perfectly but missed the point completely. That is why people work hard on alignment: to make sure AI truly understands what we mean." },
    ],
  },

  47: {
    id: 47, worldId: 7, title: 'AI and Big Risks',
    stops: [
      { tag: 'Example', title: 'Fire Is Useful — and Dangerous', body: "Fire is super useful — it keeps us warm and cooks our food. But if nobody pays attention, it can be dangerous." },
      { tag: 'Hot take', title: 'AI Is the Same Way', body: "AI is the same way. Smart, careful people need to keep a close eye on it — and make sure it helps everyone, not just a few." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'Fire Is Useful — and Dangerous', question: `"Fire is completely useless and only causes harm."`, answer: false, verdict: 'Not quite!', explanation: "Fire is incredibly useful! It keeps us warm, cooks our food, and powers so many things. But it can also be dangerous if nobody pays attention. That is exactly what makes it a great comparison to AI!" },
      { difficulty: 'Easy', tag: 'Hot take', stopTitle: 'AI Is the Same Way', question: `"Like fire, AI can be helpful but dangerous if nobody pays careful attention."`, answer: true, verdict: 'Correct!', explanation: "AI and fire are a lot alike! Both are super useful and powerful. But both need careful, smart people watching over them to make sure they are being used safely and helping everyone." },
      { difficulty: 'Easy', tag: 'Hot take', stopTitle: 'AI Is the Same Way', question: `"AI should only help a small group of people, not everyone."`, answer: false, verdict: 'Not quite!', explanation: "AI should help EVERYONE — not just a few people. That is one of the most important goals: making sure the benefits of AI are shared fairly across the world, not kept for just a small group." },
      { difficulty: 'Medium', tag: 'Hot take', stopTitle: 'AI Is the Same Way', question: `"Because AI is powerful, it does not need people watching over it carefully."`, answer: false, verdict: 'Not quite!', explanation: "Actually, because AI is so powerful, it needs MORE careful attention — not less! Just like you would not leave a bonfire burning with nobody watching, powerful AI needs smart, caring people keeping a close eye on it." },
      { difficulty: 'Medium', tag: 'Example', stopTitle: 'Fire Is Useful — and Dangerous', question: `"Being smart and careful with AI helps make sure it is used for good."`, answer: true, verdict: 'Correct!', explanation: "Exactly! When people are thoughtful and careful about how AI is built and used, it can do amazing things for everyone. The key is paying attention and making sure it is pointed in the right direction." },
    ],
  },

  48: {
    id: 48, worldId: 7, title: 'Rules for AI',
    stops: [
      { tag: 'Example', title: 'No Traffic Lights Yet', body: "When cars were invented, there were no traffic lights or seatbelts. People had to make rules over time so everyone stayed safe." },
      { tag: 'Fact', title: 'Rules Are Being Made Now', body: "Countries all over the world are figuring out rules for AI right now. Those decisions will shape the future for YOU." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'No Traffic Lights Yet', question: `"Traffic lights and seatbelts existed before cars were invented."`, answer: false, verdict: 'Not quite!', explanation: "When cars first appeared, there were no traffic lights, no seatbelts, and no speed limits! People had to figure out the rules over time as they learned what kept everyone safe. The same thing is happening with AI right now." },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'No Traffic Lights Yet', question: `"Rules for cars were created over time to help keep everyone safe."`, answer: true, verdict: 'Correct!', explanation: "Rules for cars — like traffic lights, seatbelts, and speed limits — were not there from the beginning. People created them over time as they figured out what was needed. AI rules are being built the same way right now!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Rules Are Being Made Now', question: `"Countries around the world are figuring out rules for AI right now."`, answer: true, verdict: 'Correct!', explanation: "Right this moment, governments all over the world are working on rules for AI. What they decide will shape how AI is built and used for your entire lifetime — which is why it matters so much!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'Rules Are Being Made Now', question: `"The decisions made about AI rules today will affect your generation's future."`, answer: true, verdict: 'Correct!', explanation: "The rules being written about AI right now will shape the world YOU grow up in. That is why it is so important for your generation to understand AI — so you can help make sure the rules are good and fair for everyone." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'Rules Are Being Made Now', question: `"There is no need to make rules about AI because it is always safe on its own."`, answer: false, verdict: 'Not quite!', explanation: "Just like cars needed rules to keep everyone safe, AI needs rules too! Without thoughtful guidelines, powerful technology can cause problems. Good rules help make sure AI is used in ways that help people and do not hurt them." },
    ],
  },

  49: {
    id: 49, worldId: 7, title: 'AI and What It Means to Be Human',
    stops: [
      { tag: 'Fact', title: 'What AI Can Do', body: "AI can write stories and answer questions — but it doesn't have a family, feel sunshine, or laugh until its stomach hurts." },
      { tag: 'Big idea', title: 'What Makes You Human', body: "YOU grow up, learn from mistakes, and choose to be kind. AI is a tool humans made. The heart and caring will always be YOU." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What AI Can Do', question: `"AI can feel sunshine on its face and laugh until its stomach hurts."`, answer: false, verdict: 'Not quite!', explanation: "AI can do a lot of impressive things — but it cannot feel sunshine or laugh until it hurts. Those experiences belong to YOU. Feelings, sensations, and genuine laughter are part of what makes you human." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What AI Can Do', question: `"AI can write stories and answer questions."`, answer: true, verdict: 'Correct!', explanation: "AI is really good at writing stories, answering questions, creating music, and lots of other amazing things. But there are things it will never be able to do — like feel sunshine, grow up, or truly love someone." },
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'What Makes You Human', question: `"AI has a family and feels emotions just like you do."`, answer: false, verdict: 'Not quite!', explanation: "AI does not have a family, feelings, or a heart. YOU have those things! You grow, you feel, you choose to be kind. AI is a powerful tool — but the caring, the love, and the humanity are always yours." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'What Makes You Human', question: `"The heart, caring, and choice to be kind belong to you — not to AI."`, answer: true, verdict: 'Correct!', explanation: "No matter how smart AI gets, it will never have a heart or choose to be kind because it genuinely cares. That is uniquely human. You choose kindness. You choose love. AI is a tool — and you are so much more than that!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'What AI Can Do', question: `"AI is a tool that humans made — humans are always the ones with real feelings and experiences."`, answer: true, verdict: 'Correct!', explanation: "AI is an amazing tool made by people. But real feelings, real laughter, real love — those come from you. Growing up, making mistakes, choosing kindness — that is the human story. AI is part of your tools, not the other way around." },
    ],
  },

  50: {
    id: 50, worldId: 7, title: 'What Your Generation Inherits',
    stops: [
      { tag: 'Fact', title: 'A New Kind of Growing Up', body: "Your grandparents didn't have smartphones. Your parents didn't grow up with AI. But YOU are growing up as AI changes everything." },
      { tag: 'Big idea', title: 'Your Role', body: "Your generation gets to help decide: How should AI be used? How do we make it fair for everyone? You're already getting ready — right now!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'A New Kind of Growing Up', question: `"Smartphones and AI have been around for hundreds of years."`, answer: false, verdict: 'Not quite!', explanation: "Smartphones are only a couple of decades old, and AI that really works is even newer! Your grandparents grew up without smartphones, and your parents grew up without AI. You are the first generation growing up with all of this." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'A New Kind of Growing Up', question: `"Your generation is growing up at the same time AI is changing the whole world."`, answer: true, verdict: 'Correct!', explanation: "That is a big deal! You are the first generation to grow up with AI already in so many parts of everyday life. That makes your understanding of it incredibly valuable." },
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'Your Role', question: `"Questions about how AI should be used are already decided — there's nothing left to figure out."`, answer: false, verdict: 'Not quite!', explanation: "So much is still being figured out! How should AI be used? How do we make it fair for everyone? These are open questions that your generation will help answer. The future of AI is not written yet!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Your Role', question: `"Your generation gets to help decide how AI should be used and made fair for everyone."`, answer: true, verdict: 'Correct!', explanation: "This is YOUR moment! The rules, values, and decisions around AI are still being shaped. Your generation will have a big say in whether AI helps everyone fairly or just a few. Learning about it now is how you get ready." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Your Role', question: `"Learning about AI now helps prepare you to make important decisions in the future."`, answer: true, verdict: 'Correct!', explanation: "Every time you learn something new about AI, you are getting ready to be part of the decisions that shape its future. You are already getting ready — right now, in this very lesson!" },
    ],
  },

  51: {
    id: 51, worldId: 7, title: 'What You Do Next',
    stops: [
      { tag: 'Big idea', title: 'Stay Curious', body: "Stay curious! Ask questions. Wonder about things. The kids who ask 'why' and 'what if' are the ones who change the world." },
      { tag: 'Big idea', title: 'Keep Your Brain in Charge', body: "Use AI to help you — but keep YOUR brain in charge. The future isn't something that just happens to you. You help make it." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'Stay Curious', question: `"Kids who ask 'why' and 'what if' are the ones who help change the world."`, answer: true, verdict: 'Correct!', explanation: "Curiosity is a superpower! Every great discovery, invention, and change in the world started with someone asking 'why?' and 'what if?' Keep asking those questions — they are how the future gets built." },
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'Keep Your Brain in Charge', question: `"The future just happens to you — there is nothing you can do to shape it."`, answer: false, verdict: 'Not quite!', explanation: "The future is not something that just happens! You help make it. Every question you ask, every choice you make, and every time you use your own brain to think — you are helping shape what comes next." },
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'Keep Your Brain in Charge', question: `"You should use AI to help you while keeping your own brain in charge."`, answer: true, verdict: 'Correct!', explanation: "AI is an amazing helper — but your brain is in charge! Use AI to learn faster, explore ideas, and get help with hard problems. But always think for yourself, question what you hear, and make your own decisions." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Stay Curious', question: `"Being curious and asking questions is not useful when it comes to understanding AI."`, answer: false, verdict: 'Not quite!', explanation: "Curiosity is one of the MOST useful things when it comes to AI! Asking why, wondering what if, and not accepting easy answers is exactly how you develop real understanding — and real power — over the technology shaping your world." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Keep Your Brain in Charge', question: `"Once you have AI to help you, you no longer need to think for yourself."`, answer: false, verdict: 'Not quite!', explanation: "Your brain is irreplaceable! AI can help you find information, explore ideas, and solve problems faster. But YOU are the one who decides what matters, what is right, and what to do next. Always keep your brain in charge!" },
    ],
  },
}

export default we5
