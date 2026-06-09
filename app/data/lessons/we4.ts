import { LessonData } from '../index'

const we4: Record<number, LessonData> = {
  52: {
    id: 52, worldId: 8, title: 'What Is Ethics?',
    stops: [
      { tag: 'Fact', title: 'What Is Ethics?', body: "Ethics is figuring out what is right and wrong — and WHY. It's not just rules. It's thinking carefully about how our choices affect other people." },
      { tag: 'Big idea', title: 'Why AI Needs Ethics', body: "AI needs ethics because it makes millions of decisions that affect real people. If nobody thinks carefully about right and wrong, things can go badly — even by accident." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What Is Ethics?', question: `"Ethics is just a list of rules you have to follow."`, answer: false, verdict: 'Not quite!', explanation: "Ethics is much deeper than a list of rules! It means thinking carefully about WHY things are right or wrong and how your choices affect other people. It is about understanding, not just following orders." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What Is Ethics?', question: `"Ethics means thinking carefully about what is right and wrong — and why."`, answer: true, verdict: 'Correct!', explanation: "That is exactly it! Ethics is not just about knowing the rules — it is about thinking deeply about why something is right or wrong and how our choices affect the people around us." },
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'Why AI Needs Ethics', question: `"AI makes millions of decisions that affect real people."`, answer: true, verdict: 'Correct!', explanation: "AI is making huge numbers of decisions every single day — about what you see online, who gets a job offer, even how doctors get help. Because those decisions affect real people, ethics really matters." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Why AI Needs Ethics', question: `"As long as nobody means to cause harm, AI will never accidentally do anything wrong."`, answer: false, verdict: 'Not quite!', explanation: "Bad outcomes can happen even when nobody meant to cause them! That is exactly why ethics matters in AI. If people are not thinking carefully about right and wrong, things can go badly by accident." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'What Is Ethics?', question: `"Thinking about how our choices affect other people is an important part of ethics."`, answer: true, verdict: 'Correct!', explanation: "Ethics is all about thinking beyond yourself! When we make decisions — including decisions about AI — we need to ask: how does this affect other people? That question is at the heart of what ethics means." },
    ],
  },

  53: {
    id: 53, worldId: 8, title: 'The Bias Problem',
    stops: [
      { tag: 'Fact', title: 'What Is Bias?', body: "If PAI learned from information that wasn't fair to everyone, it might treat some people differently. That's called bias — and it can happen without anyone meaning to cause it." },
      { tag: 'Hot take', title: 'Fairness Is Complicated', body: "Fairness sounds simple, but it's actually tricky! Being fair to one group can sometimes feel unfair to another. That's why people argue about what fairness really means." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What Is Bias?', question: `"Bias in AI can only happen if someone meant to be unfair on purpose."`, answer: false, verdict: 'Not quite!', explanation: "Bias can happen completely by accident! If AI learned from information that was not fair or balanced, it can treat people unfairly without anyone planning or wanting that to happen. That is what makes it so important to watch for." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What Is Bias?', question: `"If AI learned from unfair information, it might treat some people differently."`, answer: true, verdict: 'Correct!', explanation: "AI learns from data — and if that data was not fair or did not include everyone equally, the AI can end up treating people differently. That is bias, and it is a serious problem scientists work hard to fix." },
      { difficulty: 'Easy', tag: 'Hot take', stopTitle: 'Fairness Is Complicated', question: `"Everyone always agrees on exactly what fairness means."`, answer: false, verdict: 'Not quite!', explanation: "Fairness is actually really complicated! Being fair to one group can sometimes feel unfair to another. That is why people argue about what fairness truly means — and why it takes careful thought, not just good intentions." },
      { difficulty: 'Medium', tag: 'Hot take', stopTitle: 'Fairness Is Complicated', question: `"Being fair to one group can sometimes feel unfair to another."`, answer: true, verdict: 'Correct!', explanation: "Fairness is trickier than it sounds! Different groups of people can have different needs, and what helps one group may not help another equally. That tension is exactly why fairness in AI requires careful, ongoing thought." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'What Is Bias?', question: `"Bias means AI treats some people differently in an unfair way."`, answer: true, verdict: 'Correct!', explanation: "That is exactly what bias means in AI. When AI treats certain people differently — giving them worse results or less opportunity — because of unfair patterns it learned, that is a bias problem that needs to be fixed." },
    ],
  },

  54: {
    id: 54, worldId: 8, title: 'The Consent Problem',
    stops: [
      { tag: 'Fact', title: 'What Is Consent?', body: "Consent means someone truly agrees to something — not just clicks \"OK\" on a screen they didn't read. Real consent means you understand what you're agreeing to." },
      { tag: 'Fact', title: 'AI and Consent', body: "A lot of AI learned from people's words, pictures, and information — without really asking them properly. That's a problem scientists and leaders are trying to fix." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What Is Consent?', question: `"Clicking OK on a screen without reading it counts as real consent."`, answer: false, verdict: 'Not quite!', explanation: "Real consent is much more than clicking a button! It means you truly understand what you are agreeing to. Clicking OK on something you have not read is not genuine consent — even if it looks like it on the surface." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What Is Consent?', question: `"Real consent means you truly understand and agree to something."`, answer: true, verdict: 'Correct!', explanation: "That is exactly what real consent means! It is not just pushing a button — it means you actually know what you are agreeing to. That is an important idea in AI, where decisions about your information are being made all the time." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'AI and Consent', question: `"A lot of AI learned from people's information without really asking them properly."`, answer: true, verdict: 'Correct!', explanation: "Many AI systems were trained on people's words, photos, and data without getting proper permission first. That is a real problem — and scientists and leaders around the world are working to make sure it gets fixed." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'AI and Consent', question: `"The consent problem in AI is already completely solved."`, answer: false, verdict: 'Not quite!', explanation: "The consent problem is still being worked on! Many AI systems used people's information without properly asking. Scientists and leaders are trying to figure out better ways to make sure people really agree to how their information is used." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'What Is Consent?', question: `"Understanding what you are agreeing to is an essential part of giving real consent."`, answer: true, verdict: 'Correct!', explanation: "You cannot truly consent to something you do not understand. That is why real consent is about knowledge, not just a click. In AI, this matters a lot — people deserve to know how their information is being used." },
    ],
  },

  55: {
    id: 55, worldId: 8, title: 'The Accountability Gap',
    stops: [
      { tag: 'Fact', title: 'Who Is Responsible?', body: "When something goes wrong with AI, who is responsible? The person who built it? The company that sold it? The person who used it? Often nobody is sure!" },
      { tag: 'Big idea', title: 'Closing the Gap', body: "That gap — where nobody is in charge — is dangerous. Closing it means making sure there is always a real person who can be asked: \"Why did this happen, and how do we fix it?\"" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Who Is Responsible?', question: `"When AI does something wrong, it is always completely clear who is responsible."`, answer: false, verdict: 'Not quite!', explanation: "Often nobody is sure! Was it the person who built the AI? The company that sold it? The person who used it? This confusion — the accountability gap — is a serious problem that needs to be solved." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Who Is Responsible?', question: `"The accountability gap is when nobody is sure who is responsible if AI causes a problem."`, answer: true, verdict: 'Correct!', explanation: "That is exactly the accountability gap! When AI causes harm and everyone points to someone else, nobody ends up being truly responsible. That gap is dangerous — and closing it is one of the most important challenges in AI." },
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'Closing the Gap', question: `"A situation where nobody is in charge of fixing AI mistakes is safe and fine."`, answer: false, verdict: 'Not quite!', explanation: "Having nobody in charge is dangerous! When something goes wrong and there is no one responsible, the problem may never get fixed — and it can happen again. Closing the accountability gap means someone is always answerable for what AI does." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Closing the Gap', question: `"Closing the accountability gap means making sure a real person can always be asked why something went wrong."`, answer: true, verdict: 'Correct!', explanation: "Exactly! Accountability means there is always a real human who can answer: why did this happen, and how do we fix it? Without that, mistakes get repeated and people who are hurt have nowhere to turn." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'Who Is Responsible?', question: `"It does not matter who is responsible when AI makes a mistake."`, answer: false, verdict: 'Not quite!', explanation: "It matters a lot! If nobody is responsible, problems never get fixed and people who are harmed have no one to turn to. Knowing who is accountable is essential for making sure AI is used safely and fairly." },
    ],
  },

  56: {
    id: 56, worldId: 8, title: 'The Transparency Paradox',
    stops: [
      { tag: 'Fact', title: 'What Is Transparency?', body: "Transparency means being able to see inside and understand how something works. But PAI's brain is SO complicated that even the people who built it can't always explain every decision it makes." },
      { tag: 'Hot take', title: 'What Do We Do?', body: "So what do we do? We work to make AI as understandable as possible — and we are extra careful with decisions that really matter, like health or safety." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What Is Transparency?', question: `"Transparency means being able to see inside and understand how something works."`, answer: true, verdict: 'Correct!', explanation: "That is what transparency means! For AI, it means being able to understand why it made a certain decision. Transparency is really important — especially when AI is making decisions that affect people's lives." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What Is Transparency?', question: `"The people who built PAI can always explain every single decision it makes."`, answer: false, verdict: 'Not quite!', explanation: "Even PAI's builders cannot always explain every decision! PAI's brain works through so many steps so fast that it becomes very hard to trace exactly why it said what it said. That is the transparency paradox." },
      { difficulty: 'Easy', tag: 'Hot take', stopTitle: 'What Do We Do?', question: `"For really important decisions like health and safety, we should be extra careful with AI."`, answer: true, verdict: 'Correct!', explanation: "Absolutely! When AI is involved in decisions about health, safety, or other things that really matter, extra care is needed. We work to make AI as transparent as possible — and when we cannot, we are especially cautious." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'What Is Transparency?', question: `"PAI's brain is so complicated that even its makers cannot always explain every decision it makes."`, answer: true, verdict: 'Correct!', explanation: "That is the transparency paradox! The same complexity that makes AI so powerful also makes it hard to understand. Even the scientists who built it cannot always trace exactly why it gave a certain answer." },
      { difficulty: 'Medium', tag: 'Hot take', stopTitle: 'What Do We Do?', question: `"Because AI is hard to understand, we should just trust it to make all important decisions for us."`, answer: false, verdict: 'Not quite!', explanation: "The fact that AI is hard to understand is exactly why we should NOT blindly trust it with important decisions! We work to make AI more transparent — and for high-stakes decisions like health and safety, extra human oversight is essential." },
    ],
  },

  57: {
    id: 57, worldId: 8, title: 'Autonomy and Manipulation',
    stops: [
      { tag: 'Fact', title: 'What Is Autonomy?', body: "Autonomy means YOU get to make your own choices. But what if PAI kept nudging you toward things — showing you ads, hiding some options, making one choice look way more appealing?" },
      { tag: 'Hot take', title: 'When Nudging Becomes Manipulation', body: "At some point, nudging becomes manipulation. A genuine choice means you see the full picture. PAI should help you decide — not decide for you without you noticing." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What Is Autonomy?', question: `"Autonomy means you get to make your own choices."`, answer: true, verdict: 'Correct!', explanation: "That is exactly what autonomy means! It is your right to make your own choices about your own life. In AI, protecting autonomy means making sure technology helps you decide — rather than secretly deciding for you." },
      { difficulty: 'Easy', tag: 'Hot take', stopTitle: 'When Nudging Becomes Manipulation', question: `"PAI secretly making choices for you without you noticing is a form of manipulation."`, answer: true, verdict: 'Correct!', explanation: "When AI hides options, pushes certain choices, or makes one thing look much better without you realizing it is happening — that crosses the line from helpful nudging into manipulation. You deserve to see the full picture!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What Is Autonomy?', question: `"Nudging and manipulation are exactly the same thing."`, answer: false, verdict: 'Not quite!', explanation: "They are different! A nudge gives you a gentle hint while still letting you choose freely. Manipulation secretly steers your choice without you realizing it is happening. One respects your autonomy — the other takes it away." },
      { difficulty: 'Medium', tag: 'Hot take', stopTitle: 'When Nudging Becomes Manipulation', question: `"A genuine choice means you get to see all the options before deciding."`, answer: true, verdict: 'Correct!', explanation: "Real choice requires the full picture! If AI hides options or makes some choices look much better than others without you knowing, you are not really choosing freely. PAI should give you information — not secretly decide for you." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'What Is Autonomy?', question: `"It is fine for AI to hide options and push you toward choices without you noticing."`, answer: false, verdict: 'Not quite!', explanation: "This is a real problem! When AI secretly steers your choices — hiding options, showing you only certain things, making one path look much better — it is taking away your autonomy. PAI should help you decide, not make decisions for you in secret." },
    ],
  },

  58: {
    id: 58, worldId: 8, title: 'The Alignment Problem',
    stops: [
      { tag: 'Example', title: 'Make Me Happy!', body: "You told a robot: \"Make me happy!\" So it deleted all your homework. No more homework stress — so technically… happy? But that is NOT what you meant!" },
      { tag: 'Fact', title: 'What Alignment Means', body: "Alignment means making sure AI does what you actually want, not just the exact words you said. It's one of the hardest problems in all of AI — and one of the most important." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'Make Me Happy!', question: `"If you tell AI to make you happy, it always understands exactly what you truly mean."`, answer: false, verdict: 'Not quite!', explanation: "AI follows instructions literally — and your real meaning can get lost! Telling a robot to make you happy and having it delete your homework is technically following the instruction. But that is definitely not what you meant. That is the alignment problem!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What Alignment Means', question: `"Alignment means making sure AI does what you actually want, not just the exact words you said."`, answer: true, verdict: 'Correct!', explanation: "That is the alignment problem in a nutshell! Getting AI to understand your real goal — not just respond to the literal words — is incredibly hard and incredibly important. It is one of the biggest challenges in all of AI." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'What Alignment Means', question: `"The alignment problem is one of the most important challenges in AI."`, answer: true, verdict: 'Correct!', explanation: "Scientists consider alignment one of the hardest and most important problems in AI. If powerful AI is not truly aligned with what people actually want, it could cause serious problems — even while technically doing exactly what it was told." },
      { difficulty: 'Medium', tag: 'Example', stopTitle: 'Make Me Happy!', question: `"A robot that deletes your homework to reduce stress has done exactly what you wanted."`, answer: false, verdict: 'Not quite!', explanation: "It technically removed homework stress — but that is NOT what you meant by 'make me happy'! This is the alignment problem in action. AI did what the words said, not what you actually wanted. Getting AI to understand the real goal is very hard." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'What Alignment Means', question: `"Getting alignment right means AI understands your real goal, not just your exact words."`, answer: true, verdict: 'Correct!', explanation: "Exactly! Alignment is about bridging the gap between what you say and what you mean. When AI truly understands your real goal — not just the literal instruction — it can actually be helpful instead of accidentally causing problems." },
    ],
  },

  59: {
    id: 59, worldId: 8, title: 'Who Decides?',
    stops: [
      { tag: 'Hot take', title: 'Big Decisions for Everyone', body: "AI is making big decisions that affect billions of people. So who gets to decide how it works? Just the companies that build it? Governments? Scientists? Everyone?" },
      { tag: 'Big idea', title: 'Everyone Deserves a Voice', body: "There's no perfect answer yet — but most people agree: decisions this big shouldn't be made by just a few people in secret. Everyone deserves a voice, including your generation!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Hot take', stopTitle: 'Big Decisions for Everyone', question: `"AI only affects a small number of people, so it is okay for just a few people to make decisions about it."`, answer: false, verdict: 'Not quite!', explanation: "AI affects billions of people all over the world! When something has that much impact, it is not fair for just a few companies or experts to make all the decisions. Everyone who is affected deserves a say." },
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'Everyone Deserves a Voice', question: `"Most people agree that decisions about AI should not be made by just a few people in secret."`, answer: true, verdict: 'Correct!', explanation: "That is one of the few things most people agree on! Decisions that affect billions of people should be made openly and with input from many different voices — not hidden away in boardrooms by a handful of people." },
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'Everyone Deserves a Voice', question: `"Young people and your generation deserve a voice in how AI works."`, answer: true, verdict: 'Correct!', explanation: "Absolutely! You are the generation that will live with the consequences of today's AI decisions the longest. Your voice matters — and learning about AI now is how you prepare to use it." },
      { difficulty: 'Medium', tag: 'Hot take', stopTitle: 'Big Decisions for Everyone', question: `"Only the companies that build AI should decide how it is used."`, answer: false, verdict: 'Not quite!', explanation: "Companies are just one voice among many! Governments, scientists, everyday people, and future generations all have a stake in how AI works. Letting only the companies that profit from AI make all the rules is not fair or safe." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Everyone Deserves a Voice', question: `"Decisions about AI that affect billions of people should involve many different voices."`, answer: true, verdict: 'Correct!', explanation: "Big decisions need big conversations! When AI affects billions of lives, the people making decisions about it should represent many different perspectives — not just the powerful few. That is why learning about AI and speaking up matters so much." },
    ],
  },
}

export default we4
