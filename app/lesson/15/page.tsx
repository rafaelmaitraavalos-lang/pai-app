import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

const STOPS: Stop[] = [
  {
    tag: 'Fact',
    title: 'Scale Changes Everything',
    body: "A human making a bad decision affects the people immediately around them. An AI system making a bad decision, deployed to millions of people, affects millions of people: simultaneously, automatically, without anyone reviewing each case. Scale is what makes AI failures categorically different from human failures. A biased human hiring manager might affect dozens of candidates. A biased hiring algorithm deployed across an industry affects hundreds of thousands. The same error rate produces completely different consequences at different scales.",
  },
  {
    tag: 'Example',
    title: 'The Dutch Welfare Scandal',
    body: "Between 2013 and 2019 the Dutch government used an AI system to detect fraud in welfare payments. The algorithm flagged 26,000 families for investigation based on factors including nationality, postal code, and income level. The system disproportionately targeted families with dual nationalities. Many were wrongly accused. Some lost their benefits. Some lost their homes. The government eventually fell over the scandal. The algorithm wasn't broken. It optimized the metric it was given. The metric was wrong. Nobody caught it for years.",
  },
  {
    tag: 'Example',
    title: 'COMPAS',
    body: "COMPAS is a risk assessment tool used in US courts to predict the likelihood of reoffending. Judges use its scores to inform sentencing. An investigation by ProPublica found the tool was twice as likely to incorrectly flag Black defendants as high risk compared to white defendants. The company disputed the methodology. Researchers disagreed about the right statistical framework. Meanwhile the tool continued to be used in sentencing decisions. The technical dispute doesn't change the human consequence.",
  },
  {
    tag: 'Hot take',
    title: 'Automation At The Speed Of Mistakes',
    body: "Human decision-making is slow. That's partly a bug, slow decisions miss opportunities. It's also partly a feature: slow decisions create opportunities for review, correction, and accountability. AI decision-making is fast. Loan applications processed in milliseconds. Content moderation at a billion posts per day. Benefits eligibility determined automatically. The speed removes the natural checkpoints where errors get caught. By the time a systematic mistake is discovered it may have affected millions of people.",
  },
  {
    tag: 'Fact',
    title: 'Feedback Loops',
    body: "AI systems can create feedback loops that amplify their own errors. A predictive policing algorithm sends more police to certain neighborhoods. More police means more arrests in those neighborhoods. More arrests means more data confirming those neighborhoods as high-crime. The algorithm recommends more policing. The loop tightens. The original bias gets baked in more deeply with each cycle. Breaking a feedback loop requires recognizing it exists, which requires someone to be looking for it.",
  },
  {
    tag: 'Myth bust',
    title: 'Fixing The Algorithm Fixes The Problem',
    body: "When a biased AI system is discovered, the instinct is to fix the algorithm. Retrain it on better data. Adjust the objective function. Add fairness constraints. This helps. It doesn't fix everything. The decisions already made under the biased system stand. The people harmed by those decisions are rarely compensated. The structural conditions that produced the biased training data, historical discrimination, unequal data collection, still exist. Fixing the algorithm is necessary. It's not sufficient.",
  },
  {
    tag: 'Scenario',
    title: 'Who Is Responsible',
    body: "A benefits algorithm wrongly denies someone housing assistance. They appeal. The agency says the algorithm made the decision. The algorithm's developer says it performed as specified. The specification was written by a contractor. The contractor says they built what they were asked to build. Nobody is clearly responsible. Nobody is held accountable. The person denied housing has no clear path to remedy. This is not hypothetical. It's the pattern in virtually every documented AI harm case. The accountability gap is the central unsolved problem of AI governance.",
  },
  {
    tag: 'Big idea',
    title: 'The Question Of Control',
    body: "Every AI failure we've discussed, bias, hallucination, feedback loops, accountability gaps, has a common thread: humans built systems and then lost meaningful control over their consequences. Not because AI became sentient. Because the systems scaled faster than our ability to understand, monitor, and correct them. The question for your generation is not whether AI will be powerful. It will be. The question is whether the people and institutions with power over AI systems will choose to maintain meaningful human oversight over decisions that affect human lives. That choice is political, legal, and ethical. It is not technical. It is yours to make.",
  },
]

const QUESTIONS: Question[] = [
  {
    difficulty: 'Easy',
    tag: 'Fact',
    stopTitle: 'Scale Changes Everything',
    question: `"When an AI system makes a mistake it only affects the person immediately in front of it."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Scale changes everything. A biased human hiring manager might affect dozens of candidates. A biased hiring algorithm deployed across an industry affects hundreds of thousands: simultaneously, automatically, without anyone reviewing each case. The same error rate produces completely different consequences at different scales.",
  },
  {
    difficulty: 'Easy',
    tag: 'Example',
    stopTitle: 'The Dutch Welfare Scandal',
    question: `"The Dutch welfare scandal involved an AI system that wrongly accused thousands of families of fraud."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Between 2013 and 2019 the Dutch government's fraud detection algorithm flagged 26,000 families for investigation, disproportionately targeting families with dual nationalities. Many were wrongly accused. Some lost their homes. The government eventually fell over the scandal. The algorithm worked correctly. The objective was wrong.",
  },
  {
    difficulty: 'Easy',
    tag: 'Hot take',
    stopTitle: 'Automation At The Speed Of Mistakes',
    question: `"AI systems fail most dangerously when they are obviously wrong."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "They fail most dangerously when they are subtly wrong in a consistent direction, deployed at scale. An obviously wrong AI gets corrected. A slightly wrong AI deployed to millions of people making consequential decisions: that's where serious harm accumulates silently over time.",
  },
  {
    difficulty: 'Medium',
    tag: 'Example',
    stopTitle: 'COMPAS',
    question: `"The COMPAS risk assessment tool used in US courts was found to have racial disparities in its predictions."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "An investigation found the tool was twice as likely to incorrectly flag Black defendants as high risk compared to white defendants. The company disputed the methodology. Researchers disagreed. Meanwhile the tool continued to be used in sentencing. The technical dispute doesn't change the human consequence.",
  },
  {
    difficulty: 'Medium',
    tag: 'Fact',
    stopTitle: 'Feedback Loops',
    question: `"AI feedback loops can amplify the biases that created them with each cycle."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "A predictive policing algorithm sends more police to certain neighborhoods. More police means more arrests. More arrests means more data confirming those neighborhoods as high-crime. The algorithm recommends more policing. The loop tightens. The original bias gets baked in more deeply with each cycle.",
  },
  {
    difficulty: 'Medium',
    tag: 'Myth bust',
    stopTitle: 'Fixing The Algorithm Fixes The Problem',
    question: `"Fixing a biased AI algorithm fully remedies the harm caused by its previous decisions."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Fixing the algorithm is necessary. It's not sufficient. The decisions already made under the biased system stand. The people harmed are rarely compensated. The structural conditions that produced the biased training data still exist. You can update the model. You can't undo what it already did.",
  },
  {
    difficulty: 'Hard',
    tag: 'Scenario',
    stopTitle: 'Who Is Responsible',
    question: `"When an AI system causes harm there is usually a clear legal path to hold someone accountable."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "This is the accountability gap. The company blames the data. The data collectors blame the model. The model builders blame the deployment. The deployers blame the users. Nobody is clearly responsible. The person harmed has no clear path to remedy. This pattern repeats in virtually every documented AI harm case. Closing this gap is one of the most important unsolved problems in AI governance.",
  },
  {
    difficulty: 'Hard',
    tag: 'Big idea',
    stopTitle: 'The Question Of Control',
    question: `"The central challenge of AI governance is ensuring that humans maintain meaningful oversight over decisions that affect human lives."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Every AI failure we've covered, bias, hallucination, feedback loops, accountability gaps, has a common thread: humans built systems and then lost meaningful control. Not because AI became sentient. Because systems scaled faster than our ability to understand and correct them. Maintaining oversight is political, legal, and ethical. It is not technical. It is a choice.",
  },
]

export default function Lesson15() {
  return <LessonTemplate id={15} title="When Decisions Go Wrong" stops={STOPS} questions={QUESTIONS} />
}
