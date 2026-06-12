import { LessonData } from '../index'

const wm_w4: Record<number, LessonData> = {
  241: {
    id: 241, worldId: 204,
    title: "What Is Ethics?",
    stops: [
      { tag: "Fact", title: "How Should We Act?", body: "Ethics is the branch of philosophy that asks how people should act. What do we owe one another? What counts as harm? How should we make decisions when values conflict? Several major ethical frameworks often appear in discussions about AI." },
      { tag: "Example", title: "Judging by Outcomes", body: "Consequentialism judges actions by their outcomes. An action is considered good if it produces the best overall result. The difficulty is that outcomes can be hard to predict. People may also disagree about what counts as the \"best\" result and who should benefit most." },
      { tag: "Big idea", title: "Duties Before Consequences", body: "Deontology focuses on duties and rules. Some actions may be wrong even if they lead to a good outcome. The difficulty is that rules can conflict. Strict rule-following may also lead to strange results in unusual situations." },
      { tag: "Hot take", title: "Character and Its Limits", body: "Virtue ethics asks a different question: What kind of person should I be? It focuses on qualities such as honesty, fairness, courage, and compassion. The difficulty is that character alone does not always tell someone exactly what to do in a hard situation. AI ethics matters because AI systems can affect large numbers of people. Ethical questions are not separate from the technology. They shape how systems should be built, tested, and used." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"The branch of philosophy concerned with how people should act and treat one another"`, answer: true, verdict: "Correct.", explanation: "What is ethics? — The branch of philosophy concerned with how people should act and treat one another" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Their outcomes — whether they produce the best overall result"`, answer: true, verdict: "Correct.", explanation: "What does consequentialism evaluate actions by? — Their outcomes — whether they produce the best overall result" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Rules can conflict with each other, and strict rule-following can produce clearly wrong results in unusual cases"`, answer: true, verdict: "Correct.", explanation: "What is the core challenge with deontology? — Rules can conflict with each other, and strict rule-following can produce clearly wrong results in unusual cases" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"What kind of person should I be?"`, answer: true, verdict: "Correct.", explanation: "Virtue ethics asks which central question? — What kind of person should I be?" },
    ],
  },
  242: {
    id: 242, worldId: 204,
    title: "The Bias Problem",
    stops: [
      { tag: "Fact", title: "Data Inherits Inequality", body: "AI bias is often described as if it were a simple technical bug. It is usually more complicated. AI systems learn from data. If the data reflects past inequality, the system may reproduce it. A hiring algorithm trained on past hiring decisions may learn to favor the same groups that were favored in the past. The model is not prejudiced in a human sense. It is copying patterns from biased data." },
      { tag: "Example", title: "Fairness Has Many Definitions", body: "The harder question is what fairness should mean. There are several possible definitions: • Demographic parity: different groups should receive similar outcomes • Equal accuracy: the system should perform equally well for different groups • Individual fairness: similar individuals should be treated similarly" },
      { tag: "Big idea", title: "No Technical Fix for Values", body: "These goals can conflict. A system may improve one measure of fairness while making another worse. Better code can reduce bias. It cannot decide what fairness should mean. That still requires human judgment." },
      { tag: "Hot take", title: "Engineers Can't Decide Alone", body: "This means AI bias is not just a technical problem. It is a values problem — about which conception of fairness a society wants to prioritize. That question cannot be answered by engineers alone." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Through training data that reflects historical inequalities"`, answer: true, verdict: "Correct.", explanation: "How does bias most commonly enter AI systems? — Through training data that reflects historical inequalities" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A fairness definition where different demographic groups receive similar rates of positive outcomes"`, answer: true, verdict: "Correct.", explanation: "What is demographic parity? — A fairness definition where different demographic groups receive similar rates of positive outcomes" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Deciding what fairness means requires value judgments that go beyond what better code can determine"`, answer: true, verdict: "Correct.", explanation: "Why can't AI bias be fully resolved through technical fixes alone? — Deciding what fairness means requires value judgments that go beyond what better code can determine" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Both a technical and values problem — about what fairness should mean and whose interests matter"`, answer: true, verdict: "Correct.", explanation: "AI bias is best understood as: — Both a technical and values problem — about what fairness should mean and whose interests matter" },
    ],
  },
  243: {
    id: 243, worldId: 204,
    title: "The Consent Problem",
    stops: [
      { tag: "Fact", title: "Consent Requires Understanding", body: "Many AI systems rely on data collected from people who did not fully understand how it would be used. Meaningful consent requires more than clicking \"agree.\" A person should understand what they are accepting. They should also have a real choice to say no." },
      { tag: "Example", title: "Opting Out Is Not Easy", body: "In practice, that is difficult. Terms-of-service agreements may be dozens of pages long. Privacy policies may be written in legal language. Opting out may mean losing access to a service people depend on." },
      { tag: "Big idea", title: "Clicking Isn't Consenting", body: "There is a difference between technical consent and meaningful consent. Technical consent means someone clicked a button. Meaningful consent means the person understood the choice and made it freely. Those are not always the same thing." },
      { tag: "Hot take", title: "Creators Weren't Asked", body: "The consent problem extends to creators. AI image generators and language models were trained on enormous amounts of human-created content — much of it scraped from the internet without the knowledge, consent, or compensation of the people who created it. The legal and ethical status of this practice is actively contested." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Technical consent means clicking "agree"; meaningful consent means understanding the choice and having a genuine option to decline"`, answer: true, verdict: "Correct.", explanation: "What is the difference between technical consent and meaningful consent? — Technical consent means clicking \"agree\"; meaningful consent means understanding the choice and having a genuine option to decline" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Opting out may mean losing access to services that are central to people's social and professional lives"`, answer: true, verdict: "Correct.", explanation: "Why is \"just don't use the platform\" often not a realistic alternative for most users? — Opting out may mean losing access to services that are central to people's social and professional lives" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Their work was often scraped and used to train AI systems without permission or compensation"`, answer: true, verdict: "Correct.", explanation: "What consent problem do artists and creators face in relation to AI? — Their work was often scraped and used to train AI systems without permission or compensation" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"False — they are typically lengthy, written in legal language, and rarely read or understood by users"`, answer: true, verdict: "Correct.", explanation: "True or false: Privacy policies are typically designed to clearly inform users how their data will be used. — False — they are typically lengthy, written in legal language, and rarely read or understood by users" },
    ],
  },
  244: {
    id: 244, worldId: 204,
    title: "The Accountability Gap",
    stops: [
      { tag: "Fact", title: "Who Is Responsible?", body: "When an AI system causes harm, who is responsible? The answer is not always obvious. Several groups may be involved: researchers who designed the model, companies that trained it, engineers who deployed it, businesses that used it, people who relied on its output. Responsibility can become spread across the entire chain. Each group may point to someone else. That creates an accountability gap." },
      { tag: "Example", title: "Laws Are Starting to Emerge", body: "Closing the gap requires clearer rules about who is responsible when automated systems cause harm. Some governments are beginning to create laws for this. The European Union's AI Act is one major attempt to regulate AI systems based on risk." },
      { tag: "Big idea", title: "One Simple Question", body: "The details will continue to change, but the basic question is simple: Who is accountable when an automated system affects someone's life?" },
      { tag: "Hot take", title: "Harm Falls on Real People", body: "This question becomes more urgent as AI systems are deployed in higher-stakes contexts — credit decisions, medical recommendations, criminal risk assessments — where the consequences of errors fall on specific people who had no role in designing the system." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"When responsibility for AI-caused harm is distributed across so many parties that no one is clearly accountable"`, answer: true, verdict: "Correct.", explanation: "What is the accountability gap? — When responsibility for AI-caused harm is distributed across so many parties that no one is clearly accountable" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Each party in the chain pointing responsibility to another"`, answer: true, verdict: "Correct.", explanation: "Which of these contributes to the accountability gap? — Each party in the chain pointing responsibility to another" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Categorize AI systems by risk level and establish requirements for high-risk applications"`, answer: true, verdict: "Correct.", explanation: "What does the EU AI Act attempt to do? — Categorize AI systems by risk level and establish requirements for high-risk applications" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Errors in high-stakes settings — credit, healthcare, criminal justice — fall on specific people who had no role in designing the system"`, answer: true, verdict: "Correct.", explanation: "Why does the accountability gap become more urgent as AI is deployed in higher-stakes settings? — Errors in high-stakes settings — credit, healthcare, criminal justice — fall on specific people who had no role in designing the system" },
    ],
  },
  245: {
    id: 245, worldId: 204,
    title: "The Transparency Problem",
    stops: [
      { tag: "Fact", title: "Explanation Should Be a Right", body: "People often want AI systems to explain their decisions. That seems reasonable. If a system affects whether someone receives a loan, gets flagged as a risk, or receives a medical recommendation, the person may want to know why." },
      { tag: "Example", title: "Neural Nets Don't Have Rules", body: "The difficulty is that some powerful AI systems are hard to explain. A deep neural network does not always make decisions through a short list of readable rules. Its output may emerge from many calculations spread across a large network." },
      { tag: "Big idea", title: "Simplified Explanations Fall Short", body: "Researchers are trying to make AI systems more interpretable. But explanations can be imperfect. A simplified explanation may not capture everything happening inside the model." },
      { tag: "Hot take", title: "Accuracy Isn't Enough", body: "In high-stakes settings, accuracy is not the only goal. People also need transparency, oversight, and a way to challenge mistakes. These are not optional features — they are prerequisites for systems that affect people's lives to operate legitimately." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Decisions emerge from billions of weights across many layers rather than a readable set of rules"`, answer: true, verdict: "Correct.", explanation: "Why is transparency genuinely difficult for complex AI systems? — Decisions emerge from billions of weights across many layers rather than a readable set of rules" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"High-stakes settings like lending, healthcare, and criminal justice"`, answer: true, verdict: "Correct.", explanation: "In which settings does the lack of AI transparency matter most? — High-stakes settings like lending, healthcare, and criminal justice" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A simplified explanation may not accurately capture what the model actually did internally"`, answer: true, verdict: "Correct.", explanation: "What is a limitation of simplified AI explanations? — A simplified explanation may not accurately capture what the model actually did internally" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Systems affecting people's lives need to be accountable and contestable, not just accurate"`, answer: true, verdict: "Correct.", explanation: "Why are transparency and the ability to challenge decisions treated as prerequisites rather than optional features in high-stakes AI? — Systems affecting people's lives need to be accountable and contestable, not just accurate" },
    ],
  },
  246: {
    id: 246, worldId: 204,
    title: "Autonomy And Manipulation",
    stops: [
      { tag: "Fact", title: "Useful or Manipulative?", body: "AI systems are often designed to predict behavior. That can be useful. A recommendation app may help someone discover music they love. A navigation app may suggest a faster route. But systems that predict behavior can also influence behavior. Social-media feeds, targeted ads, and recommendation algorithms may be designed to keep users engaged for as long as possible." },
      { tag: "Example", title: "Persuasion vs. Manipulation", body: "The line between persuasion and manipulation matters. Persuasion gives someone information and reasons. Manipulation takes advantage of a person's vulnerabilities or emotions in ways they may not notice." },
      { tag: "Big idea", title: "Attention Has Commercial Value", body: "A platform does not need to lie to influence someone. It can shape what they see, when they see it, and how often they see it. That is why attention has value." },
      { tag: "Hot take", title: "Autonomy Under Pressure", body: "Autonomy — the capacity to form your own views and make your own decisions — is gradually compromised when the information environment you inhabit is shaped by systems optimizing for something other than your understanding or wellbeing." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Persuasion provides reasons; manipulation exploits vulnerabilities in ways the person may not notice"`, answer: true, verdict: "Correct.", explanation: "What distinguishes persuasion from manipulation? — Persuasion provides reasons; manipulation exploits vulnerabilities in ways the person may not notice" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"By shaping what users see, when they see it, and how often — without misrepresenting anything"`, answer: true, verdict: "Correct.", explanation: "How can a platform influence behavior without lying? — By shaping what users see, when they see it, and how often — without misrepresenting anything" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Attention is a limited cognitive resource and platforms compete for it commercially"`, answer: true, verdict: "Correct.", explanation: "Why is attention described as having value? — Attention is a limited cognitive resource and platforms compete for it commercially" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"By shaping the information environment toward content that maximizes engagement rather than understanding or wellbeing"`, answer: true, verdict: "Correct.", explanation: "How do recommendation systems gradually undermine autonomy? — By shaping the information environment toward content that maximizes engagement rather than understanding or wellbeing" },
    ],
  },
  247: {
    id: 247, worldId: 204,
    title: "The Alignment Problem",
    stops: [
      { tag: "Fact", title: "Saying What You Mean Is Hard", body: "The alignment problem asks a simple question: How do we make sure an AI system does what people actually want? The difficulty is that people do not always say exactly what they mean." },
      { tag: "Example", title: "Optimizing the Wrong Goal", body: "Imagine telling a system to maximize the number of clicks on a platform. It may discover that outrage and anxiety increase engagement. Technically, it is succeeding. But it is not producing the result people actually wanted." },
      { tag: "Big idea", title: "When Systems Miss the Point", body: "This problem appears in many forms: • A recommendation algorithm promotes inflammatory content • A moderation system blocks harmless posts • A grading tool rewards formulaic writing • A system finds a shortcut that improves a score without solving the real problem" },
      { tag: "Hot take", title: "Values Resist Precise Encoding", body: "Human values are complicated. They depend on context. People disagree about them. Even when people agree, they may struggle to explain their values precisely. Alignment is the challenge of translating human goals into instructions a system can follow reliably. That remains an open problem." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"The challenge of ensuring AI systems pursue the goals humans actually intend, not just the metrics they were given"`, answer: true, verdict: "Correct.", explanation: "What is the alignment problem? — The challenge of ensuring AI systems pursue the goals humans actually intend, not just the metrics they were given" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A system optimizes a measurable proxy metric while missing the actual goal — "winning" the wrong game"`, answer: true, verdict: "Correct.", explanation: "What pattern does an alignment failure follow? — A system optimizes a measurable proxy metric while missing the actual goal — \"winning\" the wrong game" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A recommendation algorithm promoting inflammatory content because it increases engagement"`, answer: true, verdict: "Correct.", explanation: "Which of these is an example of an alignment failure? — A recommendation algorithm promoting inflammatory content because it increases engagement" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Human values are context-dependent, sometimes contradictory, and difficult to specify precisely enough for a system to follow reliably across all situations"`, answer: true, verdict: "Correct.", explanation: "Why does alignment remain an open problem? — Human values are context-dependent, sometimes contradictory, and difficult to specify precisely enough for a system to follow reliably across all situations" },
    ],
  },
  248: {
    id: 248, worldId: 204,
    title: "Who Decides?",
    stops: [
      { tag: "Fact", title: "A Few Make Decisions for All", body: "AI development is concentrated in a relatively small number of companies, research labs, and governments. The decisions made by those organizations may affect people around the world. Who should set the rules?" },
      { tag: "Example", title: "Markets vs. Democracy", body: "Companies and researchers: Supporters argue that experts and developers understand the technology best and can move quickly. The risk is that a small group of private organizations may make decisions that affect everyone else. Governments: Supporters argue that elected institutions should regulate powerful technologies. The risk is that governments may move slowly or lack technical expertise." },
      { tag: "Big idea", title: "Global Problems Need Global Rules", body: "International organizations: Supporters argue that AI is global and needs international oversight. The risk is that countries may disagree about rules or refuse to cooperate. Affected communities: Supporters argue that people directly affected by AI systems should have a voice in how those systems are used. The difficulty is making that participation meaningful rather than symbolic." },
      { tag: "Hot take", title: "Governance Is a Power Choice", body: "There is no perfect answer. But leaving major decisions entirely to a small group of engineers and executives is not a neutral choice. It is a choice about who gets power. That is one of the most important questions in AI ethics." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Primarily in a small number of companies, research labs, and governments"`, answer: true, verdict: "Correct.", explanation: "Where is AI development currently concentrated? — Primarily in a small number of companies, research labs, and governments" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A small group of private organizations makes decisions affecting everyone, without broader accountability"`, answer: true, verdict: "Correct.", explanation: "What is the primary risk of market-based AI governance? — A small group of private organizations makes decisions affecting everyone, without broader accountability" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Countries may disagree about rules or refuse to cooperate, as they have on comparable global challenges"`, answer: true, verdict: "Correct.", explanation: "What is the main challenge facing international AI governance? — Countries may disagree about rules or refuse to cooperate, as they have on comparable global challenges" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Allowing a small group to make civilization-scale decisions without accountability is itself a decision about who holds power"`, answer: true, verdict: "Correct.", explanation: "Why is leaving AI governance to engineers and executives described as a choice rather than a neutral default? — Allowing a small group to make civilization-scale decisions without accountability is itself a decision about who holds power" },
    ],
  },
}

export default wm_w4
