import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

const STOPS: Stop[] = [
  {
    tag: 'Myth bust',
    title: 'Confidence Is Not Accuracy',
    body: "AI systems are often most confident when they are most wrong. They have no internal sense of uncertainty. They produce answers the same way whether they are completely right or completely fabricating. This is one of the most dangerous things about deploying AI in high-stakes situations: the output looks the same regardless of whether it should be trusted.",
  },
  {
    tag: 'Example',
    title: 'Hallucinations',
    body: "Ask an AI to cite its sources and it will often invent citations that don't exist: real-sounding journal names, real-sounding authors, plausible-looking dates. It isn't lying. It doesn't know what lying is. It's pattern-matching what a citation looks like and producing one. The result is indistinguishable from a real citation unless you check. Lawyers have submitted fake AI-generated citations in court. Judges were not amused.",
  },
  {
    tag: 'Hot take',
    title: 'Bias Is Baked In',
    body: "In 2015 Google Photos automatically labeled Black people as gorillas. In 2018 Amazon scrapped a hiring AI because it penalized resumes that included the word \"women's.\" In 2019 a healthcare algorithm gave Black patients lower risk scores than equally sick white patients, reducing their access to care. None of these were glitches. They were the algorithms working correctly on biased data. Fixing the output without fixing the data fixes nothing.",
  },
  {
    tag: 'Example',
    title: 'The Edge Case Problem',
    body: "AI fails at edge cases: situations just outside its training. A self-driving car trained on American roads struggles in Vietnam. A medical AI trained on adult X-rays misreads pediatric ones. A translation AI handles formal English well and falls apart on slang. Every AI has a boundary where its training ends and its confidence continues. The dangerous moment is when it crosses that boundary without anyone noticing.",
  },
  {
    tag: 'Myth bust',
    title: "More Data Doesn't Fix Everything",
    body: "The common response to AI failures is: train it on more data. Sometimes that helps. Sometimes it just scales the problem. An AI trained on more biased data is more confidently biased. An AI trained on more internet text absorbs more misinformation at higher volume. More data makes AI more powerful. It doesn't make AI more right. Power and correctness are not the same thing.",
  },
  {
    tag: 'Hot take',
    title: 'The Automation Bias',
    body: "When a human makes a decision people question it. When an AI makes the same decision people often accept it without question, because it feels objective, scientific, unchallengeable. This is called automation bias and it is extremely well documented. Judges give harsher sentences when an algorithm recommends it. Doctors defer to diagnostic AI even when their own instinct says otherwise. The appearance of objectivity is its own kind of manipulation.",
  },
  {
    tag: 'Example',
    title: 'When It Really Goes Wrong',
    body: "In 2020 the Dutch government used an AI fraud detection system to flag welfare recipients for investigation. The algorithm disproportionately targeted people with dual nationalities and low incomes. 26,000 families were wrongly accused. Some lost their homes. The government eventually fell over the scandal. The AI didn't intend any of this. It just optimized the metric it was given. The metric was wrong. Nobody caught it for years.",
  },
  {
    tag: 'Big idea',
    title: 'The Accountability Gap',
    body: "When a human makes a mistake there is someone to hold responsible. When an AI makes a mistake the responsibility dissolves. The company says it's the data. The data collectors say it's the model. The model builders say it's how it was deployed. The deployers say it's how it was used. Nobody is accountable and the person harmed has no clear path to justice. Figuring out how to close this gap is one of the most important unsolved problems of our time.",
  },
]

const QUESTIONS: Question[] = [
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: 'Confidence Is Not Accuracy',
    question: `"When an AI gives a confident answer it's more likely to be correct."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "AI systems produce answers with the same apparent confidence regardless of whether they are right or completely fabricating. They have no internal sense of uncertainty. This is one of the most dangerous properties of deployed AI, the output looks identical whether it should be trusted or not.",
  },
  {
    difficulty: 'Easy',
    tag: 'Fact',
    stopTitle: 'Hallucinations',
    question: `"AI hallucinations happen because AI has no way to check whether what it produces is real."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "AI has no concept of truth or lying. When it invents citations or fabricates statistics it's doing exactly what it was trained to do, produce text that matches patterns. It doesn't know the difference between real and invented. That's not a moral failure. It's a structural one.",
  },
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: 'Bias Is Baked In',
    question: `"AI bias is always the result of someone deliberately programming discrimination into the system."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Bias almost never comes from deliberate programming. It comes from biased training data. Amazon's hiring AI penalized women because most historical hires were men. The engineers didn't program that. The history did.",
  },
  {
    difficulty: 'Medium',
    tag: 'Fact',
    stopTitle: 'The Automation Bias',
    question: `"Automation bias means people tend to trust AI decisions more than equivalent human decisions."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "This is well documented across medicine, law, and finance. AI decisions feel objective, scientific, unchallengeable. Judges give harsher sentences when an algorithm recommends it. Doctors defer to diagnostic AI against their own judgment. The appearance of objectivity is itself a form of influence.",
  },
  {
    difficulty: 'Medium',
    tag: 'Myth bust',
    stopTitle: "More Data Doesn't Fix Everything",
    question: `"Training AI on more diverse data completely eliminates bias."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "More diverse data reduces some biases. It doesn't eliminate bias. It just changes which biases remain. Deciding what counts as diverse, who gets to decide, and how to source it are unsolved problems. More diverse training is better. It is not a complete solution.",
  },
  {
    difficulty: 'Medium',
    tag: 'Hot take',
    stopTitle: 'When It Really Goes Wrong',
    question: `"AI systems fail most dangerously when they are obviously wrong."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "They fail most dangerously when they are subtly wrong in ways that are hard to detect at scale. An AI that is slightly wrong in a consistent direction, deployed to millions of people making consequential decisions. That is where serious harm accumulates. The Dutch welfare scandal, discriminatory lending, biased healthcare: none were obvious failures. They were systematic ones.",
  },
  {
    difficulty: 'Hard',
    tag: 'Fact',
    stopTitle: 'The Accountability Gap',
    question: `"When an AI system causes harm it is often unclear who is legally responsible."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "This is the accountability gap. The company blames the data. The data collectors blame the model. The model builders blame the deployment. Nobody is clearly responsible and the person harmed has no clear legal path. Laws have not kept up with the technology.",
  },
  {
    difficulty: 'Hard',
    tag: 'Hot take',
    stopTitle: 'The Accountability Gap',
    question: `"The solution to AI getting things wrong is to slow down deployment until the technology is more reliable."`,
    answer: false,
    verdict: 'Genuinely complicated.',
    explanation: "Slower deployment would reduce certain harms. It would also delay benefits: earlier cancer detection, more accessible education, better translation. The question of how to balance speed against reliability is one of the central unresolved debates in AI policy. There is no clean answer. Anyone who gives you one isn't taking the tradeoffs seriously.",
  },
]

export default function Lesson6() {
  return <LessonTemplate id={6} title="What AI Gets Wrong" stops={STOPS} questions={QUESTIONS} />
}
