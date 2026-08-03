import { LessonData } from '../index'

const wm_w1: Record<number, LessonData> = {
  211: {
    id: 211, worldId: 201,
    title: "Defining Ai",
    stops: [
      { tag: "Fact", title: "What Is AI?", body: "Artificial intelligence is software designed to perform tasks that usually require human abilities, such as understanding language, recognizing images, making predictions, or finding patterns in large amounts of information." },
      { tag: "Example", title: "Not One Technology", body: "AI is not one single technology. A chatbot, a facial-recognition system, and a recommendation algorithm may all use AI, but they were built for different purposes and do not necessarily work in the same way." },
      { tag: "Big idea", title: "Rules vs. Learning", body: "The main difference between traditional software and machine learning is how the system gets its rules. A traditional program follows instructions written by a programmer. A machine-learning system learns patterns from examples. Instead of writing a separate rule for every possible situation, developers train the system on data and allow it to improve through experience." },
      { tag: "Hot take", title: "Pattern Recognition, Not Thinking", body: "That does not mean the system thinks like a person. It means it can become very good at recognizing patterns." },
      { tag: "Scenario", title: "Powerful but Fragile", body: "AI is not automatically smarter than a human. It has simply processed far more examples than a person could review in a lifetime. That makes it powerful in some areas and surprisingly fragile in others." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Machine learning systems learn patterns from data rather than following fixed programmed rules.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Traditional software follows rules a programmer wrote out in advance. Machine learning is different — it figures out the patterns on its own by studying tons of examples." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `All AI systems work in exactly the same way.`, answer: false, verdict: "Correct.", explanation: "The answer is FALSE. An AI system can be very different from another. For example, a chatbot like me is super different from, say, a TikTok algorithm." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI can outperform humans on some tasks because it has processed far more examples than any person could review in a lifetime.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. AI has processed far more examples than any human could in a lifetime. That is why it can feel eerily accurate." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A spam email filter is an example of AI.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. A spam email filter is an example of AI because it uses patterns and examples to decide what is or isn’t spam." },
    ],
  },
  212: {
    id: 212, worldId: 201,
    title: "How AI Learns",
    stops: [
      { tag: "Fact", title: "Teaching by Example", body: "Most modern AI systems learn through a process called machine learning. Imagine teaching a computer to recognize cats. You could show it thousands of images labeled \"cat\" and \"not cat.\" At first, the system would make a lot of mistakes. Over time, it would adjust its internal settings and become better at predicting the correct answer." },
      { tag: "Example", title: "Many Applications", body: "The same basic idea applies to many tasks: • Identifying spam emails • Translating languages • Recommending music • Recognizing objects in photos • Spotting patterns in medical images" },
      { tag: "Big idea", title: "The Learning Loop", body: "The system improves by seeing examples, making predictions, measuring its mistakes, and adjusting. This process can be repeated millions or billions of times." },
      { tag: "Hot take", title: "Power of Repetition", body: "No single adjustment changes very much. The improvement comes from repetition across an enormous number of examples." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Machine learning is a system that learns patterns from examples rather than following fixed rules.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. AI doesn’t follow straightforward if/then rules. It learns by looking at a crazy number of examples, getting feedback on what it is doing wrong, and learning from it." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `When a machine learning system makes a wrong prediction, it adjusts slightly to reduce the error.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Machine learning learns in exactly this way. It gets feedback on its errors and makes small adjustments in response." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Repeating the training loop billions of times matters because small adjustments compound into real, significant improvement.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. This is a slow, incremental process. Those small adjustments compound into real, significant improvement." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Machine learning can only be applied to a single type of task, such as image recognition.`, answer: false, verdict: "Correct.", explanation: "The answer is FALSE. Machine learning can be applied to a wide range of tasks including spam detection, music recommendation, and medical imaging." },
    ],
  },
  213: {
    id: 213, worldId: 201,
    title: "Alan Turing And The Turing Test",
    stops: [
      { tag: "Fact", title: "Can Machines Think?", body: "In 1950, British mathematician Alan Turing published a paper titled \"Computing Machinery and Intelligence.\" It opened with a question that still matters today: Can machines think?" },
      { tag: "Example", title: "The Imitation Game", body: "Turing did not try to settle the question directly. Instead, he proposed a test. Imagine a human judge having two text conversations simultaneously — one with a person, one with a machine. If the judge cannot reliably tell which is which, the machine has passed what later became known as the Turing Test." },
      { tag: "Big idea", title: "Behavior Over Inner Life", body: "Turing shifted the debate. Instead of asking whether a machine truly thinks, he asked whether its behavior could look intelligent from the outside. That reframing — focused on observable behavior rather than internal experience — helped shape the entire field of AI." },
      { tag: "Hot take", title: "Limits of the Test", body: "The test is still debated. A machine can sound convincing without understanding what it is saying. But Turing's question helped shape the field of AI and remains relevant today." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Alan Turing's 1950 paper opened with the question "Can machines think?"`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Turing opened his famous 1950 paper with exactly that question. It was such a hard question that he ended up proposing a game to get at the answer." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `In the Turing Test, a judge tries to determine whether they are talking to a human or a machine.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. That is the whole setup of the Turing Test: a judge chats with someone hidden and has to figure out — human or machine? If the judge can't tell, the machine passes." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Turing shifted focus away from whether machines truly think and toward whether their behavior is indistinguishable from thinking.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Turing realized that 'Can machines truly think?' might be impossible to answer. So he swapped in a question we can actually test: can a machine behave so convincingly that you can't tell the difference?" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A machine that passes the Turing Test is definitely intelligent in the same way a human is.`, answer: false, verdict: "Correct.", explanation: "The answer is FALSE. Passing the Turing Test only proves a machine can act convincingly human in conversation. Acting intelligent and actually being intelligent are not the same thing — that is the test's biggest criticism." },
    ],
  },
  214: {
    id: 214, worldId: 201,
    title: "What Ai Can And Cannot Do",
    stops: [
      { tag: "Fact", title: "Powerful but Limited", body: "AI can look astonishing one moment and hopeless the next. That is because it works from patterns it has seen before rather than from understanding, so it is strongest on the kinds of problems its training covered well and weakest just outside them. This lesson is about where that edge falls." },
      { tag: "Example", title: "Where AI Struggles", body: "AI systems can struggle with tasks that require genuine reasoning about novel situations, common-sense knowledge, or understanding context in the way humans do — even when they perform impressively on structured, well-defined tasks." },
      { tag: "Big idea", title: "Fluency Without Understanding", body: "A language model can write a convincing essay without understanding a word of it. It generates statistically likely continuations of text based on patterns in training data — not meaning, intent, or comprehension." },
      { tag: "Hot take", title: "No Goals of Its Own", body: "AI systems also do not have goals of their own. They do not want anything. The objectives they appear to pursue are objectives their designers gave them. That distinction matters when evaluating AI behavior." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI can outperform humans on specific tasks while still failing at others because it is strong at pattern-matching but fragile outside those patterns.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. AI is a pattern-matching machine that has studied more examples than any human ever could. Inside those patterns it is superhuman; outside them, it can fall apart surprisingly fast." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `When a language model writes a convincing essay, it is generating statistically likely text patterns rather than truly understanding the content.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. A language model writing a convincing essay is generating statistically likely text patterns — without truly understanding what it is saying." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI systems have their own goals and motivations.`, answer: false, verdict: "Correct.", explanation: "The answer is FALSE. AI systems don't want anything — no goals, no motivations, no secret plans. They just carry out the objectives people give them." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI can fail at tasks that require genuine reasoning or common sense outside its training data.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Take AI outside the patterns it trained on and it can fail at things a small child finds obvious. Genuine reasoning and common sense are still human superpowers." },
    ],
  },
  215: {
    id: 215, worldId: 201,
    title: "Ai In Daily Life",
    stops: [
      { tag: "Fact", title: "AI All Around Us", body: "Most people do not encounter AI through research labs or policy debates. They encounter it in small, ordinary ways: • Navigation apps rerouting traffic • Email filters blocking spam • Phones unlocking with facial recognition • Music apps recommending songs • Banks detecting unusual purchases • Search engines ranking results • Customer-service chatbots answering questions" },
      { tag: "Example", title: "Invisible Decision-Making", body: "Most of this is useful. But it is worth noticing how much decision-making has moved into systems people rarely see or understand." },
      { tag: "Big idea", title: "Not Neutral Decisions", body: "When an algorithm decides what news appears in your feed, what products you see, or what opportunities are recommended to you, those decisions are not neutral. They reflect the priorities of the people and companies who built the system." },
      { tag: "Hot take", title: "Awareness Gives Control", body: "Understanding that gives you more control." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A search engine ranking results is an example of AI operating invisibly in daily life.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Every time you search, AI is quietly deciding which results deserve the top spots. You never see it working — you just see the list it chose for you." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Algorithmic decisions are described as "not neutral" because they reflect the priorities and choices of the people who designed them.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Algorithms are built by people, and people make choices: what to prioritize, what to ignore, what counts as 'best.' Those choices are baked into every decision the algorithm makes." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A recommendation algorithm deciding which job postings you see is a potentially consequential AI decision that people often don't notice.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Which job ads you see can change the direction of your whole career — and an algorithm is deciding that without you ever noticing. That is a big deal hiding in plain sight." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Understanding how AI makes decisions gives you more control over how you interact with those systems.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Once you know AI is picking what you see, you can push back — search differently, question recommendations, look beyond your feed. Awareness is what puts you back in the driver's seat." },
    ],
  },
  216: {
    id: 216, worldId: 201,
    title: "A Brief History Of Ai",
    stops: [
      { tag: "Fact", title: "Dartmouth to Today", body: "Modern AI traces back to a 1950 paper by Alan Turing. In 1956, the term \"Artificial Intelligence\" was coined at the Dartmouth Conference — widely considered the birth of AI as a formal field of research." },
      { tag: "Example", title: "Boom and Bust Cycles", body: "Early decades brought enthusiasm followed by collapse. Researchers in the 1960s predicted human-level AI within 20 years. When that progress stalled, funding dried up. These periods of collapse are known as AI Winters." },
      { tag: "Big idea", title: "Expert Systems Era", body: "AI came back in the 1980s with expert systems — programs that encoded human expertise as explicit rules. These too proved expensive and brittle, and interest collapsed again." },
      { tag: "Hot take", title: "The Deep Learning Breakthrough", body: "The modern era began with two key moments: IBM's Deep Blue defeating chess champion Garry Kasparov in 1997, and the 2012 AlexNet breakthrough, when deep learning dramatically outperformed previous approaches to image recognition. The current wave — large language models, generative AI — grew from that turning point." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `An "AI Winter" is a period when AI progress stalled and funding collapsed after overhyped promises.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Twice in AI's history, big promises fell flat and the funding dried up. Those long freezes are called AI Winters — a warning about what happens when hype runs ahead of results." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Expert systems were programs that encoded human expertise as explicit rules.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Expert systems tried to bottle human expertise into thousands of hand-written rules. They worked for narrow problems but could not handle anything their rules didn't cover." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `2012 was a turning point in AI history because deep learning dramatically outperformed previous image-recognition approaches.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. In 2012, a deep learning system crushed the competition at ImageNet, a famous image-recognition contest. That win convinced the world deep learning was the real deal — and the modern AI boom took off." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The Dartmouth Conference is significant because it was where the term "Artificial Intelligence" was coined and the field formally founded.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. In the summer of 1956, a small group of scientists gathered at Dartmouth College, coined the name 'Artificial Intelligence,' and launched it as a real field of study. Every AI you use today traces back to that meeting." },
    ],
  },
  217: {
    id: 217, worldId: 201,
    title: "Who Builds Ai And Why",
    stops: [
      { tag: "Fact", title: "Concentrated Development", body: "AI doesn't build itself. A small number of large technology companies, government research labs, and universities make most of the foundational decisions about how powerful AI systems work. Those decisions affect everyone." },
      { tag: "Example", title: "Competing Incentives", body: "Companies build AI for a range of reasons: commercial products, competitive advantage, genuine belief in its societal benefit, and the ability to replace expensive human labor. These incentives are not always aligned with the interests of users or the broader public." },
      { tag: "Big idea", title: "Builders Shape Systems", body: "The concentration of AI development matters. Researchers and engineers who build AI have their own values, blind spots, and access to data. A system built mostly by people from wealthy, English-speaking contexts may perform less reliably for people outside those contexts." },
      { tag: "Hot take", title: "A Fair Question", body: "This doesn't mean AI is always biased or harmful. It means asking who builds AI, why, and with what data is a reasonable and important question — not a conspiratorial one." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Most foundational AI decisions are currently made by a small number of large tech companies, government labs, and universities.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. The AI systems everyone uses are shaped by a surprisingly small group: big tech companies, government labs, and top universities. They decide what gets built and how." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The concentration of AI development matters because a small group is making decisions that affect everyone, without broad accountability.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Decisions made by a handful of companies end up affecting billions of people who never got a vote. That gap between who decides and who is affected is exactly why concentration matters." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The values, blind spots, and data access of AI builders can shape how well AI systems perform across different groups.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. AI reflects the people who build it — their values, their blind spots, and the data they have access to. That is why a system can work great for some groups and stumble for others." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Asking who builds AI and why is a conspiratorial question with no legitimate basis.`, answer: false, verdict: "Correct.", explanation: "The answer is FALSE. Asking who builds AI, and why, is not a conspiracy theory — it is a reasonable and important question about accountability and about design choices that affect everyone." },
    ],
  },
  218: {
    id: 218, worldId: 201,
    title: "Types Of Ai",
    stops: [
      { tag: "Fact", title: "Narrow AI Today", body: "Narrow AI — also called Weak AI — is designed for one specific task. This is all the AI that currently exists. Examples: facial recognition, spam filters, chess engines, voice assistants. A chess AI cannot drive a car; a language model cannot perform surgery." },
      { tag: "Example", title: "AGI: Still Hypothetical", body: "Artificial General Intelligence (AGI) refers to a hypothetical AI capable of performing any intellectual task a human can. It does not exist yet. Whether and when it might is a subject of genuine disagreement among serious researchers." },
      { tag: "Big idea", title: "Superintelligence: Theory Only", body: "Superintelligent AI — AI that surpasses human intelligence across all domains — exists only in theory. Some researchers consider it a plausible long-term outcome; others think it will never be achieved." },
      { tag: "Hot take", title: "Fears vs. Reality", body: "Most public concern about AI — job displacement, dangerous autonomous decisions, existential risk — relates to general or superintelligent AI. Understanding what we actually have (narrow AI) versus what is speculative helps frame those debates more accurately." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The only type of AI that currently exists is Narrow AI.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Every AI in existence today is narrow — brilliant at its specific task and useless outside it. A chess AI can't drive a car; a chatbot can't fold laundry." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AGI is a hypothetical AI capable of performing any cognitive task a human can.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. AGI would be an AI that can handle any thinking task a human can — not just one specialty. It is still hypothetical: nobody has built one, and nobody knows when, or if, someone will." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Fears about AI 'taking over the world' mostly concern AGI, not the narrow AI systems that actually exist today.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. When people worry about AI taking over, they are usually imagining AGI — which doesn't exist yet. Mixing that up with today's narrow AI makes it hard to have a clear debate about either one." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Superintelligent AI currently exists and is being used by governments.`, answer: false, verdict: "Correct.", explanation: "The answer is FALSE. No superintelligent AI exists — not in any government, not in any secret lab. Today's AI is narrow: impressive at specific tasks, nothing like an all-powerful mind." },
    ],
  },
}

export default wm_w1
