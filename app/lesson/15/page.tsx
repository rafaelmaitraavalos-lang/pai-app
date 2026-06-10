import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

export const STOPS: Stop[] = [
  {
    tag: "Fact",
    title: "Scale Changes the Consequences",
    body: "A human decision-maker can make an unfair or inaccurate judgment. An automated system can make a similar mistake much more quickly and apply it across a much larger number of cases. Automation does not invent bad decisions. It mass-produces them. If a system evaluates thousands of job applications, loan requests, or benefit claims, even a small flaw can reach many people before anyone notices the pattern.",
  },
  {
    tag: "Example",
    title: "The Dutch Childcare-Benefits Scandal",
    body: "For years, Dutch authorities wrongly accused thousands of families of fraud involving childcare benefits. Families were required to repay large amounts of money, and many experienced serious financial hardship. Automated fraud-detection and risk-selection practices contributed to the problem. Factors such as dual nationality were used in ways that disproportionately affected families with immigrant backgrounds. The scandal was not caused by one faulty line of code. It involved policy choices, administrative practices, limited oversight, and a system that made it difficult for families to challenge decisions.",
  },
  {
    tag: "Example",
    title: "COMPAS",
    body: "COMPAS is a risk-assessment tool that has been used in parts of the United States criminal-justice system. It produces scores intended to estimate the likelihood that a person will reoffend. A ProPublica investigation found racial differences in certain types of errors. Black defendants who did not reoffend were more likely than white defendants to be incorrectly labeled as higher risk. The company disputed the analysis, and researchers have debated which measures of fairness should be used. The example shows why evaluating an algorithm requires more than asking whether it is accurate overall. It also matters how errors are distributed and how the scores are used.",
  },
  {
    tag: "Hot take",
    title: "Speed Can Make Review Harder",
    body: "Automation can make decisions faster. In many situations, that is useful. A system might process applications, flag possible fraud, or filter large amounts of content more efficiently than a person could. But speed can also reduce opportunities for review. If decisions happen automatically and at a large scale, an error may be repeated many times before someone identifies the problem. Automation makes mistakes faster. Any system powerful enough to make thousands of decisions also needs a way for people to challenge those decisions before the damage compounds.",
  },
  {
    tag: "Fact",
    title: "Feedback Loops",
    body: "Some automated systems can create feedback loops. Imagine a predictive-policing tool that recommends sending more officers to certain neighborhoods based on earlier arrest data. Increased police presence may lead to more recorded arrests in those neighborhoods. That new data may then reinforce the original recommendation. This does not mean every predictive system will create the same result. But it shows why data should not be treated as a neutral record of reality. Data can reflect earlier decisions and inequalities.",
  },
  {
    tag: "Myth bust",
    title: "Fixing the Model Is Not the Whole Solution",
    body: "When an automated system produces unfair results, improving the model may help. Developers can examine the data, change the design, test for disparities, and create stronger safeguards. But a technical fix cannot automatically undo earlier harm. It also may not address the policies or institutions that shaped the data in the first place. Responsible use of AI requires more than adjusting an algorithm. It may also require reviewing past decisions, creating an appeals process, and changing the way an institution operates.",
  },
  {
    tag: "Scenario",
    title: "Who Is Responsible?",
    body: "Imagine that an automated system contributes to a decision denying someone housing assistance. The person wants to know why the decision happened and how to challenge it. The answer may involve several groups: the agency using the system, the company that developed it, the people who selected the data, and the officials who decided how the result would be used. Responsibility should not disappear simply because a computer was involved. Organizations need clear rules about who reviews decisions, who responds to errors, and what options are available to the people affected.",
  },
  {
    tag: "Big idea",
    title: "Oversight Has to Be Designed",
    body: "AI systems do not remove human responsibility. People decide what a system is designed to do, what data it uses, where it is deployed, and how much authority its output receives. Meaningful oversight does not happen automatically. It has to be built into the process. That can include testing before deployment, monitoring after deployment, opportunities for human review, and a clear way to appeal important decisions. Mistakes will happen. What matters is whether they get caught, challenged, and corrected before they spread.",
  },
]

export const QUESTIONS: Question[] = [
  {
    difficulty: "Easy",
    tag: "Fact",
    stopTitle: '',
    question: `Using an automated system at a large scale can increase the number of people affected by a repeated error.`,
    answer: true,
    verdict: "Correct.",
    explanation: "A mistake applied to one case is different from a mistake repeated across thousands of cases. Scale can make it harder to notice and correct a pattern before many people are affected.",
  },
  {
    difficulty: "Easy",
    tag: "Example",
    stopTitle: '',
    question: `The Dutch childcare-benefits scandal involved families who were wrongly accused of fraud.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Thousands of families faced serious consequences after being wrongly treated as fraud risks. The problem involved automated practices, policy decisions, and inadequate ways for people to challenge the results.",
  },
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `An automated decision is automatically more objective than a human decision.`,
    answer: false,
    verdict: "Correct.",
    explanation: "An automated system can still reflect problems in its data, design, or use. A mathematical process may appear neutral while reproducing patterns shaped by earlier human decisions.",
  },
  {
    difficulty: "Medium",
    tag: "Example",
    stopTitle: '',
    question: `The COMPAS debate shows that evaluating fairness involves more than measuring overall accuracy.`,
    answer: true,
    verdict: "Correct.",
    explanation: "A system may perform similarly across groups on one measure while producing different types of errors across those groups. It matters which errors occur, who experiences them, and how the results are used.",
  },
  {
    difficulty: "Medium",
    tag: "Fact",
    stopTitle: '',
    question: `A feedback loop can happen when the output of a system influences the data used for later decisions.`,
    answer: true,
    verdict: "Correct.",
    explanation: "For example, sending more police to an area may generate more arrest data from that area. If the system later treats those arrests as evidence that the area requires even more attention, the pattern can reinforce itself.",
  },
  {
    difficulty: "Medium",
    tag: "Myth bust",
    stopTitle: '',
    question: `Once developers improve a biased model, all of the harm caused by its earlier decisions has been repaired.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Improving the model may prevent future problems, but it does not automatically correct earlier decisions or address the institutional conditions that contributed to the harm.",
  },
  {
    difficulty: "Hard",
    tag: "Scenario",
    stopTitle: '',
    question: `When an automated system contributes to a harmful decision, organizations should have a clear process for review and appeal.`,
    answer: true,
    verdict: "Correct.",
    explanation: "People affected by important decisions need a way to ask what happened, correct inaccurate information, and challenge unfair outcomes. Accountability should remain clear even when several organizations are involved.",
  },
  {
    difficulty: "Hard",
    tag: "Big idea",
    stopTitle: '',
    question: `Meaningful oversight requires more than placing a human somewhere in the process.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Oversight should include careful testing, ongoing monitoring, clear responsibilities, and a realistic way to review and correct errors. A human reviewer is only useful if that person has enough information and authority to act.",
  },
]

export default function Lesson15() {
  return <LessonTemplate id={15} title="When Decisions Go Wrong" stops={STOPS} questions={QUESTIONS} />
}
