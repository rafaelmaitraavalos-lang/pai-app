import { LessonData } from '../index'

const wm_w1: Record<number, LessonData> = {
  211: {
    id: 211, worldId: 201,
    title: "Defining Ai",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "Artificial intelligence is software designed to perform tasks that usually require human abilities, such as understanding language, recognizing images, making predictions, or finding patterns in large amounts of information." },
      { tag: "Example", title: "Slide 2", body: "AI is not one single technology. A chatbot, a facial-recognition system, and a recommendation algorithm may all use AI, but they were built for different purposes and do not necessarily work in the same way." },
      { tag: "Big idea", title: "Slide 3", body: "The main difference between traditional software and machine learning is how the system gets its rules. A traditional program follows instructions written by a programmer. A machine-learning system learns patterns from examples. Instead of writing a separate rule for every possible situation, developers train the system on data and allow it to improve through experience." },
      { tag: "Hot take", title: "Slide 4", body: "That does not mean the system thinks like a person. It means it can become very good at recognizing patterns." },
      { tag: "Scenario", title: "Slide 5", body: "AI is not automatically smarter than a human. It has simply processed far more examples than a person could review in a lifetime. That makes it powerful in some areas and surprisingly fragile in others." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Machine learning learns patterns from data instead of following fixed programmed rules"`, answer: true, verdict: "Correct.", explanation: "What is the key difference between traditional software and machine learning? — Machine learning learns patterns from data instead of following fixed programmed rules" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"False"`, answer: true, verdict: "Correct.", explanation: "True or false: All AI systems work in the same way. — False" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"It has processed far more examples than any human could in a lifetime"`, answer: true, verdict: "Correct.", explanation: "Why can AI outperform humans on certain specific tasks? — It has processed far more examples than any human could in a lifetime" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A spam email filter"`, answer: true, verdict: "Correct.", explanation: "Which of these is an example of AI? — A spam email filter" },
    ],
  },
  212: {
    id: 212, worldId: 201,
    title: "How Ai Learns",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "Most modern AI systems learn through a process called machine learning. Imagine teaching a computer to recognize cats. You could show it thousands of images labeled \"cat\" and \"not cat.\" At first, the system would make a lot of mistakes. Over time, it would adjust its internal settings and become better at predicting the correct answer." },
      { tag: "Example", title: "Slide 2", body: "The same basic idea applies to many tasks: • Identifying spam emails • Translating languages • Recommending music • Recognizing objects in photos • Spotting patterns in medical images" },
      { tag: "Big idea", title: "Slide 3", body: "The system improves by seeing examples, making predictions, measuring its mistakes, and adjusting. This process can be repeated millions or billions of times." },
      { tag: "Hot take", title: "Slide 4", body: "No single adjustment changes very much. The improvement comes from repetition across an enormous number of examples." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A system that learns patterns from examples rather than fixed rules"`, answer: true, verdict: "Correct.", explanation: "What is machine learning? — A system that learns patterns from examples rather than fixed rules" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"It adjusts slightly to reduce the error"`, answer: true, verdict: "Correct.", explanation: "In the machine learning loop, what happens after the system makes a wrong prediction? — It adjusts slightly to reduce the error" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Small adjustments compound into real, significant improvement"`, answer: true, verdict: "Correct.", explanation: "Why does repeating the training loop billions of times matter? — Small adjustments compound into real, significant improvement" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A wide range of tasks including spam detection, music recommendation, and medical imaging"`, answer: true, verdict: "Correct.", explanation: "Which of these tasks can machine learning be applied to? — A wide range of tasks including spam detection, music recommendation, and medical imaging" },
    ],
  },
  213: {
    id: 213, worldId: 201,
    title: "Alan Turing And The Turing Test",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "In 1950, British mathematician Alan Turing published a paper titled \"Computing Machinery and Intelligence.\" It opened with a question that still matters today: Can machines think?" },
      { tag: "Example", title: "Slide 2", body: "Turing did not try to settle the question directly. Instead, he proposed a test. Imagine a human judge having two text conversations simultaneously — one with a person, one with a machine. If the judge cannot reliably tell which is which, the machine has passed what later became known as the Turing Test." },
      { tag: "Big idea", title: "Slide 3", body: "Turing shifted the debate. Instead of asking whether a machine truly thinks, he asked whether its behavior could look intelligent from the outside. That reframing — focused on observable behavior rather than internal experience — helped shape the entire field of AI." },
      { tag: "Hot take", title: "Slide 4", body: "The test is still debated. A machine can sound convincing without understanding what it is saying. But Turing's question helped shape the field of AI and remains relevant today." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Can machines think?"`, answer: true, verdict: "Correct.", explanation: "What question opened Alan Turing's 1950 paper? — Can machines think?" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A test where a judge tries to determine whether they are talking to a human or a machine"`, answer: true, verdict: "Correct.", explanation: "What is the Turing Test? — A test where a judge tries to determine whether they are talking to a human or a machine" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"He shifted focus from whether machines truly think to whether their behavior is indistinguishable from thinking"`, answer: true, verdict: "Correct.", explanation: "How did Turing reframe the question of machine intelligence? — He shifted focus from whether machines truly think to whether their behavior is indistinguishable from thinking" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Behaving intelligently is not the same as actually being intelligent"`, answer: true, verdict: "Correct.", explanation: "What is the main criticism of the Turing Test? — Behaving intelligently is not the same as actually being intelligent" },
    ],
  },
  214: {
    id: 214, worldId: 201,
    title: "What Ai Can And Cannot Do",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "AI is not automatically smarter than a human. It has simply processed far more examples than a person could review in a lifetime. That makes it powerful in some areas and surprisingly fragile in others." },
      { tag: "Example", title: "Slide 2", body: "AI systems can struggle with tasks that require genuine reasoning about novel situations, common-sense knowledge, or understanding context in the way humans do — even when they perform impressively on structured, well-defined tasks." },
      { tag: "Big idea", title: "Slide 3", body: "A language model can write a convincing essay without understanding a word of it. It generates statistically likely continuations of text based on patterns in training data — not meaning, intent, or comprehension." },
      { tag: "Hot take", title: "Slide 4", body: "AI systems also do not have goals of their own. They do not want anything. The objectives they appear to pursue are objectives their designers gave them. That distinction matters when evaluating AI behavior." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"AI has processed vast amounts of data, making it strong at pattern-matching but brittle outside those patterns"`, answer: true, verdict: "Correct.", explanation: "Why can AI outperform humans on specific tasks while failing at others? — AI has processed vast amounts of data, making it strong at pattern-matching but brittle outside those patterns" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Generating statistically likely text patterns without true understanding"`, answer: true, verdict: "Correct.", explanation: "A language model writing a convincing essay is best described as: — Generating statistically likely text patterns without true understanding" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"False — any apparent goals come from how the system was designed"`, answer: true, verdict: "Correct.", explanation: "True or false: AI systems have their own goals and motivations. — False — any apparent goals come from how the system was designed" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"It can fail at tasks that require genuine reasoning or common sense outside its training"`, answer: true, verdict: "Correct.", explanation: "What makes AI \"surprisingly fragile\" in some areas? — It can fail at tasks that require genuine reasoning or common sense outside its training" },
    ],
  },
  215: {
    id: 215, worldId: 201,
    title: "Ai In Daily Life",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "Most people do not encounter AI through research labs or policy debates. They encounter it in small, ordinary ways: • Navigation apps rerouting traffic • Email filters blocking spam • Phones unlocking with facial recognition • Music apps recommending songs • Banks detecting unusual purchases • Search engines ranking results • Customer-service chatbots answering questions" },
      { tag: "Example", title: "Slide 2", body: "Most of this is useful. But it is worth noticing how much decision-making has moved into systems people rarely see or understand." },
      { tag: "Big idea", title: "Slide 3", body: "When an algorithm decides what news appears in your feed, what products you see, or what opportunities are recommended to you, those decisions are not neutral. They reflect the priorities of the people and companies who built the system." },
      { tag: "Hot take", title: "Slide 4", body: "Understanding that gives you more control." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A search engine ranking results"`, answer: true, verdict: "Correct.", explanation: "Which of these is an example of AI operating invisibly in daily life? — A search engine ranking results" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"They reflect the priorities and choices of the people who designed them"`, answer: true, verdict: "Correct.", explanation: "Why are algorithmic decisions described as \"not neutral\"? — They reflect the priorities and choices of the people who designed them" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A recommendation algorithm deciding which job postings you see"`, answer: true, verdict: "Correct.", explanation: "Which of these is a potentially consequential AI decision people often don't notice? — A recommendation algorithm deciding which job postings you see" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"More control over how you interact with and respond to those systems"`, answer: true, verdict: "Correct.", explanation: "What does awareness of AI decision-making give you? — More control over how you interact with and respond to those systems" },
    ],
  },
  216: {
    id: 216, worldId: 201,
    title: "A Brief History Of Ai",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "Modern AI traces back to a 1950 paper by Alan Turing. In 1956, the term \"Artificial Intelligence\" was coined at the Dartmouth Conference — widely considered the birth of AI as a formal field of research." },
      { tag: "Example", title: "Slide 2", body: "Early decades brought enthusiasm followed by collapse. Researchers in the 1960s predicted human-level AI within 20 years. When that progress stalled, funding dried up. These periods of collapse are known as AI Winters." },
      { tag: "Big idea", title: "Slide 3", body: "AI came back in the 1980s with expert systems — programs that encoded human expertise as explicit rules. These too proved expensive and brittle, and interest collapsed again." },
      { tag: "Hot take", title: "Slide 4", body: "The modern era began with two key moments: IBM's Deep Blue defeating chess champion Garry Kasparov in 1997, and the 2012 AlexNet breakthrough, when deep learning dramatically outperformed previous approaches to image recognition. The current wave — large language models, generative AI — grew from that turning point." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A period when AI progress stalled and funding collapsed after overhyped promises"`, answer: true, verdict: "Correct.", explanation: "What is an \"AI Winter\"? — A period when AI progress stalled and funding collapsed after overhyped promises" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Programs encoding human expertise as explicit rules"`, answer: true, verdict: "Correct.", explanation: "What were expert systems? — Programs encoding human expertise as explicit rules" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Deep learning dramatically outperformed previous image-recognition approaches at the ImageNet competition"`, answer: true, verdict: "Correct.", explanation: "What made 2012 a turning point in AI history? — Deep learning dramatically outperformed previous image-recognition approaches at the ImageNet competition" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"It was where the term "Artificial Intelligence" was coined and the field formally founded"`, answer: true, verdict: "Correct.", explanation: "What is the Dartmouth Conference significant for? — It was where the term \"Artificial Intelligence\" was coined and the field formally founded" },
    ],
  },
  217: {
    id: 217, worldId: 201,
    title: "Who Builds Ai And Why",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "AI doesn't build itself. A small number of large technology companies, government research labs, and universities make most of the foundational decisions about how powerful AI systems work. Those decisions affect everyone." },
      { tag: "Example", title: "Slide 2", body: "Companies build AI for a range of reasons: commercial products, competitive advantage, genuine belief in its societal benefit, and the ability to replace expensive human labor. These incentives are not always aligned with the interests of users or the broader public." },
      { tag: "Big idea", title: "Slide 3", body: "The concentration of AI development matters. Researchers and engineers who build AI have their own values, blind spots, and access to data. A system built mostly by people from wealthy, English-speaking contexts may perform less reliably for people outside those contexts." },
      { tag: "Hot take", title: "Slide 4", body: "This doesn't mean AI is always biased or harmful. It means asking who builds AI, why, and with what data is a reasonable and important question — not a conspiratorial one." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A small number of large tech companies, government labs, and universities"`, answer: true, verdict: "Correct.", explanation: "Who currently makes most of the foundational decisions about how powerful AI systems work? — A small number of large tech companies, government labs, and universities" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A small group is making decisions that affect everyone, without broad accountability"`, answer: true, verdict: "Correct.", explanation: "Why does the concentration of AI development matter? — A small group is making decisions that affect everyone, without broad accountability" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Their values, blind spots, and data access shape how systems perform across different groups"`, answer: true, verdict: "Correct.", explanation: "How can the background of AI builders affect AI systems? — Their values, blind spots, and data access shape how systems perform across different groups" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A reasonable and important question about accountability and design choices"`, answer: true, verdict: "Correct.", explanation: "Asking who builds AI and why is best described as: — A reasonable and important question about accountability and design choices" },
    ],
  },
  218: {
    id: 218, worldId: 201,
    title: "Types Of Ai",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "Narrow AI — also called Weak AI — is designed for one specific task. This is all the AI that currently exists. Examples: facial recognition, spam filters, chess engines, voice assistants. A chess AI cannot drive a car; a language model cannot perform surgery." },
      { tag: "Example", title: "Slide 2", body: "Artificial General Intelligence (AGI) refers to a hypothetical AI capable of performing any intellectual task a human can. It does not exist yet. Whether and when it might is a subject of genuine disagreement among serious researchers." },
      { tag: "Big idea", title: "Slide 3", body: "Superintelligent AI — AI that surpasses human intelligence across all domains — exists only in theory. Some researchers consider it a plausible long-term outcome; others think it will never be achieved." },
      { tag: "Hot take", title: "Slide 4", body: "Most public concern about AI — job displacement, dangerous autonomous decisions, existential risk — relates to general or superintelligent AI. Understanding what we actually have (narrow AI) versus what is speculative helps frame those debates more accurately." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Narrow AI"`, answer: true, verdict: "Correct.", explanation: "What type of AI currently exists? — Narrow AI" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A hypothetical AI capable of performing any cognitive task a human can"`, answer: true, verdict: "Correct.", explanation: "What is AGI? — A hypothetical AI capable of performing any cognitive task a human can" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Most public fears relate to AGI, not the narrow AI systems that actually exist today"`, answer: true, verdict: "Correct.", explanation: "Why does the distinction between narrow AI and AGI matter for public debate? — Most public fears relate to AGI, not the narrow AI systems that actually exist today" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"False      WORLD 2: HOW AI MAKES DECISIONS"`, answer: true, verdict: "Correct.", explanation: "True or false: Superintelligent AI currently exists. — False      WORLD 2: HOW AI MAKES DECISIONS" },
    ],
  },
}

export default wm_w1
