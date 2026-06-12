import { LessonData } from '../index'

const wm_w3: Record<number, LessonData> = {
  231: {
    id: 231, worldId: 203,
    title: "Ai And Jobs",
    stops: [
      { tag: "Fact", title: "Not All Jobs Are Equal Targets", body: "AI is unlikely to affect every job in the same way. Some tasks are easier to automate than others, especially tasks that are repetitive, structured, or based on patterns in data. Examples may include: data entry, basic customer-service responses, document sorting, some accounting tasks, some forms of research or screening." },
      { tag: "Example", title: "Judgment Is Hard to Automate", body: "Other work is harder to automate, especially when it requires physical skill, trust, judgment, or experience in unpredictable situations. A plumber working in an unfamiliar house has to adapt constantly. A teacher has to respond to the needs of different students. A nurse may notice subtle changes in a patient that are difficult to reduce to a checklist." },
      { tag: "Big idea", title: "Tasks Reshape Before Jobs Disappear", body: "AI may not erase every job. It is more likely to reshape individual tasks first, changing what people actually do during the workday." },
      { tag: "Hot take", title: "Access to Retraining Matters", body: "The bigger question is whether new opportunities will appear quickly enough and whether people will have access to the training needed to adapt." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Repetitive, structured, pattern-based tasks"`, answer: true, verdict: "Correct.", explanation: "Which type of tasks are generally more susceptible to AI automation? — Repetitive, structured, pattern-based tasks" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A nurse noticing subtle changes in a patient's condition"`, answer: true, verdict: "Correct.", explanation: "Which of these jobs is hardest to automate? — A nurse noticing subtle changes in a patient's condition" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Reshape what people do during the workday by automating specific tasks within jobs"`, answer: true, verdict: "Correct.", explanation: "Rather than eliminating jobs entirely, AI is more likely to: — Reshape what people do during the workday by automating specific tasks within jobs" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Whether new opportunities will emerge quickly enough and workers will have access to retraining"`, answer: true, verdict: "Correct.", explanation: "What is one of the central longer-term questions about AI and employment? — Whether new opportunities will emerge quickly enough and workers will have access to retraining" },
    ],
  },
  232: {
    id: 232, worldId: 203,
    title: "Ai And Creativity",
    stops: [
      { tag: "Fact", title: "AI Generates, Humans Create", body: "AI systems can now generate images, music, writing, and video. That raises difficult questions about creativity. AI-generated work is built from patterns learned from human-created material. A language model has encountered enormous amounts of writing. An image generator has learned from large collections of images. The system can create something new, but it does so differently from a person." },
      { tag: "Example", title: "Experience Can't Be Learned", body: "A human artist may create from memory, emotion, frustration, curiosity, or lived experience. An AI system does not have those experiences. It generates patterns based on training. This does not make every AI-generated image or paragraph worthless. But it changes the conversation." },
      { tag: "Big idea", title: "Creators Face Real Consequences", body: "The rise of generative AI also affects people who make creative work professionally. Writers, designers, musicians, illustrators, and voice actors are already debating questions about consent, payment, copyright, and replacement." },
      { tag: "Hot take", title: "Who Benefits from Whose Work", body: "The question is not only whether AI can make something impressive. It is also who benefits, whose work made the system possible, and what happens to the people whose jobs depend on creativity." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Patterns learned from human-created content in the training data"`, answer: true, verdict: "Correct.", explanation: "AI-generated creative work is primarily built from: — Patterns learned from human-created content in the training data" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Humans create from lived experience and intent; AI generates statistical patterns from training data"`, answer: true, verdict: "Correct.", explanation: "What is a key difference between how a human artist and an AI system create? — Humans create from lived experience and intent; AI generates statistical patterns from training data" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Their work was often used to train AI systems without consent or compensation, and those systems now compete with them"`, answer: true, verdict: "Correct.", explanation: "What practical concern has the rise of generative AI created for professional creators? — Their work was often used to train AI systems without consent or compensation, and those systems now compete with them" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Who benefits, whose work made the system possible, and what happens to those whose livelihoods depend on creativity"`, answer: true, verdict: "Correct.", explanation: "Beyond whether AI can produce impressive output, what other questions matter? — Who benefits, whose work made the system possible, and what happens to those whose livelihoods depend on creativity" },
    ],
  },
  233: {
    id: 233, worldId: 203,
    title: "Ai And Privacy",
    stops: [
      { tag: "Fact", title: "Your Data Is the Product", body: "AI systems often depend on data. That data may include: location history, search activity, browsing habits, purchases, photos, voice recordings, health information, social-media behavior. Companies can use this information to personalize services, recommend products, detect fraud, or train new systems. Some uses are helpful. Others raise serious concerns." },
      { tag: "Example", title: "Surveillance Is Everywhere", body: "Facial-recognition tools can identify people from camera footage. Data brokers can collect and sell information about individuals. Apps may gather far more data than users realize." },
      { tag: "Big idea", title: "Convenience vs. Privacy", body: "Most people make a trade without thinking about it very much: convenience in exchange for information. The problem is that the terms of that trade are often unclear. Privacy policies are long, complicated, and easy to ignore. A person may technically click \"agree\" without truly understanding what they have agreed to." },
      { tag: "Hot take", title: "Clicking Isn't Consenting", body: "There is a difference between technical consent and meaningful consent. Technical consent means someone clicked a button. Meaningful consent means the person understood the choice and made it freely. Those are not always the same thing." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Location, search activity, purchases, photos, health data, and social behavior"`, answer: true, verdict: "Correct.", explanation: "What types of data do AI systems commonly depend on? — Location, search activity, purchases, photos, health data, and social behavior" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A company that collects and sells personal information"`, answer: true, verdict: "Correct.", explanation: "What is a data broker? — A company that collects and sells personal information" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Technical consent means clicking "agree"; meaningful consent means actually understanding the choice and having a real option to decline"`, answer: true, verdict: "Correct.", explanation: "What is the difference between technical consent and meaningful consent? — Technical consent means clicking \"agree\"; meaningful consent means actually understanding the choice and having a real option to decline" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"False — they are typically written in dense legal language that most users do not read or understand"`, answer: true, verdict: "Correct.", explanation: "True or false: Privacy policies are generally written to ensure users fully understand how their data will be used. — False — they are typically written in dense legal language that most users do not read or understand" },
    ],
  },
  234: {
    id: 234, worldId: 203,
    title: "Ai And Healthcare",
    stops: [
      { tag: "Fact", title: "High Promise, High Stakes", body: "Healthcare is one of the most promising uses of AI. It is also one of the highest-stakes. AI systems can help analyze medical images, identify patterns, organize records, and support doctors as they make decisions. Some systems have performed very well on specific tasks, such as detecting signs of disease in scans." },
      { tag: "Example", title: "AlphaFold's 50-Year Breakthrough", body: "AI can also support scientific research. AlphaFold, a system developed by DeepMind, made major progress in predicting protein structures. This was an important advance because the shape of a protein affects how it functions. Predicting those shapes had been an unsolved problem for fifty years." },
      { tag: "Big idea", title: "Mostly Accurate Isn't Good Enough", body: "But healthcare is not a setting where \"mostly accurate\" is always good enough. A medical system has to be tested carefully. It must work for different groups of patients, not only the people represented in the original training data." },
      { tag: "Hot take", title: "Access Shapes the Benefit", body: "Access matters too. If the most advanced tools are available only at wealthy hospitals, AI could widen existing health gaps instead of reducing them." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"It solved protein structure prediction, a scientific problem that had been unsolved for fifty years"`, answer: true, verdict: "Correct.", explanation: "What did AlphaFold achieve? — It solved protein structure prediction, a scientific problem that had been unsolved for fifty years" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Errors in healthcare can have serious consequences, and performance must be reliable across different patient groups"`, answer: true, verdict: "Correct.", explanation: "Why is \"mostly accurate\" insufficient as a standard for medical AI? — Errors in healthcare can have serious consequences, and performance must be reliable across different patient groups" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Advanced tools available only at well-funded hospitals could widen rather than narrow existing health disparities"`, answer: true, verdict: "Correct.", explanation: "What access concern does AI in healthcare raise? — Advanced tools available only at well-funded hospitals could widen rather than narrow existing health disparities" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A system trained on a non-representative population may perform less reliably for underrepresented groups"`, answer: true, verdict: "Correct.", explanation: "Why does the composition of training data matter for medical AI? — A system trained on a non-representative population may perform less reliably for underrepresented groups" },
    ],
  },
  235: {
    id: 235, worldId: 203,
    title: "Ai And Education",
    stops: [
      { tag: "Fact", title: "AI Is Already in Classrooms", body: "Students are already using AI tools to brainstorm, summarize, explain difficult ideas, write code, and draft essays. Schools are also using AI for tutoring, grading support, scheduling, and personalized learning." },
      { tag: "Example", title: "Personalized Learning Works", body: "These tools can be helpful. A student who is confused about a concept can ask for another explanation. A personalized system can slow down when a student is struggling and move faster when they are ready." },
      { tag: "Big idea", title: "Academic Integrity at Risk", body: "But AI also makes academic integrity more complicated. If a chatbot can write an essay or solve a problem set, how can a teacher know what a student actually understands?" },
      { tag: "Hot take", title: "Thinking vs. Outsourcing Thinking", body: "Some schools are responding with more in-class writing, oral exams, project-based learning, and assignments that require students to explain their thinking. Students are going to use AI. The real question is whether it helps them think or gives them a polished way to avoid thinking." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A personalized tutoring system that adjusts pace based on student performance"`, answer: true, verdict: "Correct.", explanation: "Which of these is an example of AI being used in education? — A personalized tutoring system that adjusts pace based on student performance" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Students can submit AI-generated work that does not reflect their own understanding"`, answer: true, verdict: "Correct.", explanation: "What academic integrity challenge does AI create for schools? — Students can submit AI-generated work that does not reflect their own understanding" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Using AI to support learning improves your own understanding; using it to replace learning produces output without building skills"`, answer: true, verdict: "Correct.", explanation: "What distinguishes using AI to support learning from using AI to replace learning? — Using AI to support learning improves your own understanding; using it to replace learning produces output without building skills" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"They assess understanding in ways that are harder to outsource to AI"`, answer: true, verdict: "Correct.", explanation: "Why are schools responding to AI with more in-class writing and oral exams? — They assess understanding in ways that are harder to outsource to AI" },
    ],
  },
  236: {
    id: 236, worldId: 203,
    title: "Ai And Democracy",
    stops: [
      { tag: "Fact", title: "Deepfakes Corrode Truth", body: "Democracy depends on people being able to argue about shared facts. AI makes that harder. Deepfakes are AI-generated images, audio, or video that make it appear as if a real person said or did something they never said or did. A convincing fake video can spread quickly online. Even after it has been corrected, some viewers may continue to believe it." },
      { tag: "Example", title: "Misinformation at Scale", body: "AI can also make misinformation easier to produce at scale. A single person may be able to generate many versions of the same false claim and tailor them to different audiences." },
      { tag: "Big idea", title: "Algorithms Accelerate Division", body: "Recommendation systems matter too. Social-media platforms often rank content partly based on engagement. Outrage, fear, and conflict can keep people watching and sharing. Algorithms did not invent political division. But they can accelerate it, quietly turning a few clicks into a narrower version of the world." },
      { tag: "Hot take", title: "Fake Outpaces Detection", body: "Detection tools exist. Researchers are developing systems to identify AI-generated content. But progress in generating convincing fakes has consistently outpaced the development of reliable detection methods." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"AI-generated media that convincingly depicts real people saying or doing things they never did"`, answer: true, verdict: "Correct.", explanation: "What is a deepfake? — AI-generated media that convincingly depicts real people saying or doing things they never did" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"It has dramatically lowered the cost of producing convincing false content at scale"`, answer: true, verdict: "Correct.", explanation: "How has generative AI changed the economics of misinformation? — It has dramatically lowered the cost of producing convincing false content at scale" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Algorithms did not invent division, but can accelerate it by rewarding engagement-maximizing content"`, answer: true, verdict: "Correct.", explanation: "What is the relationship between recommendation algorithms and political division? — Algorithms did not invent division, but can accelerate it by rewarding engagement-maximizing content" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Progress in generating convincing fakes has consistently outpaced detection methods"`, answer: true, verdict: "Correct.", explanation: "Why does deepfake detection remain difficult? — Progress in generating convincing fakes has consistently outpaced detection methods" },
    ],
  },
  237: {
    id: 237, worldId: 203,
    title: "Ai And Science",
    stops: [
      { tag: "Fact", title: "Science Runs on Data", body: "Science often involves enormous amounts of information. AI can help researchers process data, identify patterns, and test ideas more quickly. It is being used in areas such as: climate modeling, protein research, genetics, astronomy, materials science, and particle physics." },
      { tag: "Example", title: "AI Scans What Humans Can't", body: "AI systems can help analyze large datasets that would take humans far longer to review. In astronomy, for example, AI can scan telescope data for anomalies — unusual signals, potential new objects — that human researchers might take years to find manually." },
      { tag: "Big idea", title: "AI Finds Patterns, Not Proof", body: "But AI-based science still has to survive the same test as any other science: Can other researchers understand, evaluate, and reproduce the result? AI can speed up discovery. It does not replace the need for evidence, transparency, and careful review." },
      { tag: "Hot take", title: "Still Needs Peer Review", body: "AI can find patterns faster and suggest hypotheses. But \"an AI found a pattern\" is not a scientific finding until it has been tested, verified, and subjected to peer review." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Protein structure prediction"`, answer: true, verdict: "Correct.", explanation: "In which field did AlphaFold make a major scientific contribution? — Protein structure prediction" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"AI can process data at a scale no human research team could match"`, answer: true, verdict: "Correct.", explanation: "What makes AI particularly useful for processing scientific data? — AI can process data at a scale no human research team could match" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Results must be testable, reproducible, and subject to peer review"`, answer: true, verdict: "Correct.", explanation: "What requirement does AI-generated scientific work still need to meet? — Results must be testable, reproducible, and subject to peer review" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"The need for evidence, transparency, reproducibility, and careful critical review"`, answer: true, verdict: "Correct.", explanation: "What does AI not replace in the scientific process? — The need for evidence, transparency, reproducibility, and careful critical review" },
    ],
  },
  238: {
    id: 238, worldId: 203,
    title: "Ai And Daily Life",
    stops: [
      { tag: "Fact", title: "AI Is Already Everywhere", body: "Most people do not encounter AI through research labs or policy debates. They encounter it in small, ordinary ways: navigation apps rerouting traffic, email filters blocking spam, phones unlocking with facial recognition, music apps recommending songs, banks detecting unusual purchases, search engines ranking results, customer-service chatbots answering questions." },
      { tag: "Example", title: "Invisible Decision-Makers", body: "Most of this is useful. But it is worth noticing how much decision-making has moved into systems people rarely see or understand." },
      { tag: "Big idea", title: "Algorithms Have Priorities", body: "When an algorithm decides what news appears in your feed, what products you see, or what opportunities are recommended to you, those decisions are not neutral. They reflect the priorities of the people and companies who built the system." },
      { tag: "Hot take", title: "Understanding Gives Control", body: "Understanding that gives you more control — not over the systems themselves, but over how you engage with them and what assumptions you bring to information they serve you." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A bank's system detecting an unusual transaction"`, answer: true, verdict: "Correct.", explanation: "Which of these is an example of AI operating in daily life? — A bank's system detecting an unusual transaction" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Accumulated small decisions about what you see and what is recommended to you shape your information environment"`, answer: true, verdict: "Correct.", explanation: "Why is AI \"decision-making\" in daily life significant even when it feels trivial? — Accumulated small decisions about what you see and what is recommended to you shape your information environment" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"They reflect the priorities and design choices of the people and companies that built them"`, answer: true, verdict: "Correct.", explanation: "Why are algorithmic decisions described as \"not neutral\"? — They reflect the priorities and design choices of the people and companies that built them" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"More informed engagement with the information and recommendations those systems serve you"`, answer: true, verdict: "Correct.", explanation: "What does awareness of AI decision-making give you? — More informed engagement with the information and recommendations those systems serve you" },
    ],
  },
}

export default wm_w3
