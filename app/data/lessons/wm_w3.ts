import { LessonData } from '../index'

const wm_w3: Record<number, LessonData> = {
  231: {
    id: 231, worldId: 203,
    title: "Ai And Jobs",
    stops: [
      { tag: "Fact", title: "Not All Jobs Equal", body: "AI is unlikely to affect every job in the same way. Some tasks are easier to automate than others, especially tasks that are repetitive, structured, or based on patterns in data. Examples may include: data entry, basic customer-service responses, document sorting, some accounting tasks, some forms of research or screening." },
      { tag: "Example", title: "Hard to Automate", body: "Other work is harder to automate, especially when it requires physical skill, trust, judgment, or experience in unpredictable situations. A plumber working in an unfamiliar house has to adapt constantly. A teacher has to respond to the needs of different students. A nurse may notice subtle changes in a patient that are difficult to reduce to a checklist." },
      { tag: "Big idea", title: "Reshaping Tasks, Not Jobs", body: "AI may not erase every job. It is more likely to reshape individual tasks first, changing what people actually do during the workday." },
      { tag: "Hot take", title: "The Bigger Question", body: "The bigger question is whether new opportunities will appear quickly enough and whether people will have access to the training needed to adapt." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Repetitive, structured, pattern-based tasks are generally more susceptible to AI automation.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. The tasks most at risk are the predictable ones — repetitive, structured, pattern-based work. If a task follows the same recipe every time, AI can learn the recipe." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A nurse noticing subtle changes in a patient's condition is an example of a job that is easy to automate.`, answer: false, verdict: "Correct.", explanation: "The answer is FALSE. A nurse noticing something subtle is actually one of the hardest things to automate. It mixes observation, judgment, experience, and human connection — nothing like a repetitive, rule-based task." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Rather than eliminating jobs entirely, AI is more likely to reshape what people do during the workday by automating specific tasks within jobs.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Rather than eliminating whole jobs, AI tends to reshape what people do all day — automating specific tasks inside each job." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `One of the central longer-term questions about AI and employment is whether new opportunities will emerge quickly enough and workers will have access to retraining.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. The deep question is not just which jobs change — it is whether new opportunities arrive fast enough, and whether displaced workers can actually reach the retraining they need." },
    ],
  },
  232: {
    id: 232, worldId: 203,
    title: "Ai And Creativity",
    stops: [
      { tag: "Fact", title: "AI Generates Content", body: "AI systems can now generate images, music, writing, and video. That raises difficult questions about creativity. AI-generated work is built from patterns learned from human-created material. A language model has encountered enormous amounts of writing. An image generator has learned from large collections of images. The system can create something new, but it does so differently from a person." },
      { tag: "Example", title: "Experience vs. Pattern", body: "A human artist may create from memory, emotion, frustration, curiosity, or lived experience. An AI system does not have those experiences. It generates patterns based on training. This does not make every AI-generated image or paragraph worthless. But it changes the conversation." },
      { tag: "Big idea", title: "Impact on Creators", body: "The rise of generative AI also affects people who make creative work professionally. Writers, designers, musicians, illustrators, and voice actors are already debating questions about consent, payment, copyright, and replacement." },
      { tag: "Hot take", title: "Who Benefits?", body: "The question is not only whether AI can make something impressive. It is also who benefits, whose work made the system possible, and what happens to the people whose jobs depend on creativity." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI-generated creative work is primarily built from patterns learned from human-created content in training data.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. AI-generated creative work is built, first and foremost, from patterns learned from human-created content in the training data." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A key difference between human artists and AI systems is that humans create from lived experience and intent, while AI generates statistical patterns from training data.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Human artists create from lived experience — memories, feelings, something to say. AI generates statistical patterns learned from other people's work. The outputs can look similar; where they come from could not be more different." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Professional creators face a concern that their work was often used to train AI systems without consent or compensation, and those systems now compete with them.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Many artists discovered their life's work had been used to train AI systems — without permission, credit, or payment. Now those same systems compete with them. That is the heart of the dispute." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Whether AI can produce impressive output is the only question that matters when evaluating generative AI's impact on creative fields.`, answer: false, verdict: "Correct.", explanation: "The answer is FALSE. Impressive output is just the surface. The bigger questions: who profits, whose work made the system possible, and what happens to the people whose livelihoods it disrupts?" },
    ],
  },
  233: {
    id: 233, worldId: 203,
    title: "Ai And Privacy",
    stops: [
      { tag: "Fact", title: "AI Runs on Data", body: "AI systems often depend on data. That data may include: location history, search activity, browsing habits, purchases, photos, voice recordings, health information, social-media behavior. Companies can use this information to personalize services, recommend products, detect fraud, or train new systems. Some uses are helpful. Others raise serious concerns." },
      { tag: "Example", title: "Surveillance and Brokers", body: "Facial-recognition tools can identify people from camera footage. Data brokers can collect and sell information about individuals. Apps may gather far more data than users realize." },
      { tag: "Big idea", title: "The Data Trade-Off", body: "Most people make a trade without thinking about it very much: convenience in exchange for information. The problem is that the terms of that trade are often unclear. Privacy policies are long, complicated, and easy to ignore. A person may technically click \"agree\" without truly understanding what they have agreed to." },
      { tag: "Hot take", title: "Technical vs. Meaningful Consent", body: "There is a difference between technical consent and meaningful consent. Technical consent means someone clicked a button. Meaningful consent means the person understood the choice and made it freely. Those are not always the same thing." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI systems commonly depend on data such as location, search activity, purchases, photos, health data, and social behavior.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. AI systems feed on your data trail — location, searches, purchases, photos, health info, social activity. The more they know, the better they predict you." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A data broker is a company that collects and sells personal information.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Data brokers are companies whose whole business is collecting your personal information and selling it. Most people have never heard of them, yet the brokers know plenty about most people." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Technical consent means clicking "agree," while meaningful consent means actually understanding the choice and having a genuine option to decline.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Clicking 'agree' is technical consent — it counts legally. Meaningful consent means truly understanding the deal and having a real option to say no. There is often a canyon between the two." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Privacy policies are generally written to ensure users fully understand how their data will be used.`, answer: false, verdict: "Correct.", explanation: "The answer is FALSE. Privacy policies are mostly written by lawyers to protect companies, not to inform you. They are long, dense, and famously unread — very few are designed for understanding." },
    ],
  },
  234: {
    id: 234, worldId: 203,
    title: "Ai And Healthcare",
    stops: [
      { tag: "Fact", title: "High Promise, High Stakes", body: "Healthcare is one of the most promising uses of AI. It is also one of the highest-stakes. AI systems can help analyze medical images, identify patterns, organize records, and support doctors as they make decisions. Some systems have performed very well on specific tasks, such as detecting signs of disease in scans." },
      { tag: "Example", title: "AlphaFold's Breakthrough", body: "AI can also support scientific research. AlphaFold, a system developed by DeepMind, made major progress in predicting protein structures. This was an important advance because the shape of a protein affects how it functions. Predicting those shapes had been an unsolved problem for fifty years." },
      { tag: "Big idea", title: "Not 'Good Enough' Here", body: "But healthcare is not a setting where \"mostly accurate\" is always good enough. A medical system has to be tested carefully. It must work for different groups of patients, not only the people represented in the original training data." },
      { tag: "Hot take", title: "Access Matters Too", body: "Access matters too. If the most advanced tools are available only at wealthy hospitals, AI could widen existing health gaps instead of reducing them." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AlphaFold solved protein structure prediction, a scientific problem that had been unsolved for fifty years.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. For fifty years, predicting how proteins fold was one of biology's great unsolved problems. AlphaFold, an AI system, essentially solved it — a genuine scientific milestone." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Mostly accurate" is not a sufficient standard for medical AI because errors can have serious consequences and performance must be reliable across different patient groups.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. In medicine, 'mostly right' can mean missed diagnoses. Medical AI has to be reliably right — and reliably right for every kind of patient, not just the average one." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `If advanced AI tools are available only at wealthy hospitals, AI could widen rather than narrow existing health disparities.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. If cutting-edge medical AI only reaches wealthy hospitals, the patients who already get the best care get even better care — and the gap widens. Technology alone doesn't guarantee fairness." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A medical AI system trained on a non-representative population may perform less reliably for underrepresented groups.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. A medical AI trained mostly on one population may quietly perform worse for everyone else. Who is in the training data determines who the system serves well." },
    ],
  },
  235: {
    id: 235, worldId: 203,
    title: "Ai And Education",
    stops: [
      { tag: "Fact", title: "AI in the Classroom", body: "Students are already using AI tools to brainstorm, summarize, explain difficult ideas, write code, and draft essays. Schools are also using AI for tutoring, grading support, scheduling, and personalized learning." },
      { tag: "Example", title: "Personalized Support", body: "These tools can be helpful. A student who is confused about a concept can ask for another explanation. A personalized system can slow down when a student is struggling and move faster when they are ready." },
      { tag: "Big idea", title: "Academic Integrity", body: "But AI also makes academic integrity more complicated. If a chatbot can write an essay or solve a problem set, how can a teacher know what a student actually understands?" },
      { tag: "Hot take", title: "Help or Shortcut?", body: "Some schools are responding with more in-class writing, oral exams, project-based learning, and assignments that require students to explain their thinking. Students are going to use AI. The real question is whether it helps them think or gives them a polished way to avoid thinking." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A personalized tutoring system that adjusts its pace based on student performance is an example of AI in education.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. A tutoring system that speeds up when you're cruising and slows down when you're stuck is AI in action — personalizing education in a way one teacher with thirty students can't." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI creates an academic integrity challenge because students can submit AI-generated work that does not reflect their own understanding.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. When AI can write your essay, a grade may no longer reflect what you actually understand. That is the honesty puzzle schools are wrestling with right now." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Using AI to support learning improves your own understanding, while using it to replace learning produces output without building skills.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Use AI to explain and quiz you, and you walk away smarter. Use it to do the work for you, and you get output with nothing learned. Same tool — opposite outcomes." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Schools are responding to AI with more in-class writing and oral exams because these assess understanding in ways that are harder to outsource to AI.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. In-class writing and oral exams are hard to outsource to a chatbot. Schools are leaning on them because they reveal what is actually in your head." },
    ],
  },
  236: {
    id: 236, worldId: 203,
    title: "Ai And Democracy",
    stops: [
      { tag: "Fact", title: "Deepfakes and Shared Facts", body: "Democracy depends on people being able to argue about shared facts. AI makes that harder. Deepfakes are AI-generated images, audio, or video that make it appear as if a real person said or did something they never said or did. A convincing fake video can spread quickly online. Even after it has been corrected, some viewers may continue to believe it." },
      { tag: "Example", title: "Misinformation at Scale", body: "AI can also make misinformation easier to produce at scale. A single person may be able to generate many versions of the same false claim and tailor them to different audiences." },
      { tag: "Big idea", title: "Algorithms Accelerate Division", body: "Recommendation systems matter too. Social-media platforms often rank content partly based on engagement. Outrage, fear, and conflict can keep people watching and sharing. Algorithms did not invent political division. But they can accelerate it, quietly turning a few clicks into a narrower version of the world." },
      { tag: "Hot take", title: "Detection Lags Behind", body: "Detection tools exist. Researchers are developing systems to identify AI-generated content. But progress in generating convincing fakes has consistently outpaced the development of reliable detection methods." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A deepfake is AI-generated media that convincingly depicts real people saying or doing things they never did.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. A deepfake is AI-generated video or audio of a real person doing or saying something they never did. The scary part is how convincing they have become." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Generative AI has dramatically lowered the cost of producing convincing false content at scale.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Convincing fake content used to take skill, time, and money. Generative AI made it cheap, fast, and available to anyone — which changes the misinformation game completely." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Recommendation algorithms did not invent political division, but can accelerate it by rewarding engagement-maximizing content.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Political division existed long before algorithms. But engagement-hungry systems learned that outrage keeps people scrolling — so they can pour fuel on fires they didn't start." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Deepfake detection is difficult because progress in generating convincing fakes has consistently outpaced detection methods.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. It is an arms race, and the fakers keep winning: every time detection improves, generation improves faster. That is why you can't count on technology alone to catch deepfakes." },
    ],
  },
  237: {
    id: 237, worldId: 203,
    title: "Ai And Science",
    stops: [
      { tag: "Fact", title: "Processing Scientific Data", body: "Science often involves enormous amounts of information. AI can help researchers process data, identify patterns, and test ideas more quickly. It is being used in areas such as: climate modeling, protein research, genetics, astronomy, materials science, and particle physics." },
      { tag: "Example", title: "Finding Anomalies Fast", body: "AI systems can help analyze large datasets that would take humans far longer to review. In astronomy, for example, AI can scan telescope data for anomalies — unusual signals, potential new objects — that human researchers might take years to find manually." },
      { tag: "Big idea", title: "Same Tests Apply", body: "But AI-based science still has to survive the same test as any other science: Can other researchers understand, evaluate, and reproduce the result? AI can speed up discovery. It does not replace the need for evidence, transparency, and careful review." },
      { tag: "Hot take", title: "Not a Finding Yet", body: "AI can find patterns faster and suggest hypotheses. But \"an AI found a pattern\" is not a scientific finding until it has been tested, verified, and subjected to peer review." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AlphaFold made a major scientific contribution in the field of protein structure prediction.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. AlphaFold's breakthrough came in protein structure prediction — figuring out the 3D shapes proteins fold into, which is key to understanding disease and designing medicines." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI is particularly useful for processing scientific data because it can process data at a scale no human research team could match.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Modern science generates oceans of data — far more than human teams can examine. AI can sift through all of it, spotting patterns researchers would never have time to find." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI-generated scientific results still need to be testable, reproducible, and subject to peer review.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. An AI-generated result is a lead, not a conclusion. It still has to survive the same tests as any science: reproducibility, evidence, and peer review." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI replaces the need for evidence, transparency, and careful review in the scientific process.`, answer: false, verdict: "Correct.", explanation: "The answer is FALSE. AI speeds up parts of science, but it doesn't replace the rules of science. Evidence, transparency, and careful review still decide what counts as true." },
    ],
  },
  238: {
    id: 238, worldId: 203,
    title: "Ai And Daily Life",
    stops: [
      { tag: "Fact", title: "Everyday AI Encounters", body: "Most people do not encounter AI through research labs or policy debates. They encounter it in small, ordinary ways: navigation apps rerouting traffic, email filters blocking spam, phones unlocking with facial recognition, music apps recommending songs, banks detecting unusual purchases, search engines ranking results, customer-service chatbots answering questions." },
      { tag: "Example", title: "Unseen Systems", body: "Most of this is useful. But it is worth noticing how much decision-making has moved into systems people rarely see or understand." },
      { tag: "Big idea", title: "Decisions with a Point of View", body: "When an algorithm decides what news appears in your feed, what products you see, or what opportunities are recommended to you, those decisions are not neutral. They reflect the priorities of the people and companies who built the system." },
      { tag: "Hot take", title: "Knowledge Is Power", body: "Understanding that gives you more control — not over the systems themselves, but over how you engage with them and what assumptions you bring to information they serve you." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A bank's system detecting an unusual transaction is an example of AI operating in daily life.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. That text asking 'did you really make this purchase?' is AI at work — a system spotted something that broke your usual pattern. AI quietly runs checks like that all day." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI "decision-making" in daily life is significant because accumulated small decisions about what you see and what is recommended to you shape your information environment.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. One tiny algorithmic choice is trivial. Thousands of them every day, deciding what you see and hear — that quietly shapes your view of the world." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Algorithmic decisions are described as "not neutral" because they reflect the priorities and design choices of the people and companies that built them.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Every algorithm carries the priorities and design choices of the people and companies behind it. 'The algorithm decided' always means 'someone's choices decided.'" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Awareness of AI decision-making gives you more informed engagement with the information and recommendations those systems serve you.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Knowing that AI curates what reaches you changes how you read it. You start asking why you're seeing this — and that question is the beginning of thinking for yourself." },
    ],
  },
}

export default wm_w3
