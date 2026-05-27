import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

const STOPS: Stop[] = [
  {
    tag: 'Fact',
    title: 'You Have A Profile',
    body: "Every major platform, YouTube, TikTok, Spotify, Netflix, Instagram, builds a model of you. Not a file with your name in it. A mathematical representation of your behavior: what you watch, how long, what you skip, what you share, what time of day, what device. This representation is updated continuously. Every interaction you have with the platform adjusts your model. The algorithm uses that model to predict what you'll engage with next.",
  },
  {
    tag: 'Example',
    title: 'Collaborative Filtering',
    body: "The simplest recommendation approach: find people who behaved like you in the past and show you what they liked next. You watched three specific films: other users who watched those same three films also watched this fourth one. So you get recommended the fourth. This is collaborative filtering. It doesn't need to understand what any film is about. It just finds behavioral patterns across millions of users. Most early recommendation systems were built this way.",
  },
  {
    tag: 'Example',
    title: 'Content-Based Filtering',
    body: "A second approach: analyze the content itself rather than user behavior. A song has tempo, key, instrumentation, vocal style. A user who likes songs with these characteristics probably likes other songs with these characteristics. Spotify's early recommendation system was partly built this way. It analyzed the audio of songs to find musical similarity. The advantage is it can recommend things nobody else has listened to yet. The disadvantage is it can't surprise you.",
  },
  {
    tag: 'Hot take',
    title: 'The Engagement Trap',
    body: "Modern recommendation algorithms don't optimize for your satisfaction or happiness. They optimize for engagement: the metric that predicts revenue. Engagement means time spent, clicks, shares, comments. Research has repeatedly shown that outrage, anxiety, and conflict drive more engagement than calm, informative content. The algorithm doesn't know this. It just learned that certain content gets more clicks. The result is systems that systematically amplify the most emotionally activating content regardless of its accuracy or effect on wellbeing.",
  },
  {
    tag: 'Fact',
    title: 'The Cold Start Problem',
    body: "When you're a new user a recommendation algorithm knows nothing about you. This is the cold start problem. It has to guess. Most platforms solve this by asking you to pick some initial preferences, then rapidly updating based on your first few interactions. TikTok is particularly aggressive at this. It can build a detailed behavioral model within 30 minutes of a new account's first use. The algorithm moves from knowing nothing to knowing a lot very fast.",
  },
  {
    tag: 'Scenario',
    title: 'The Filter Bubble',
    body: "As the algorithm learns your preferences it shows you more of what you already like. This feels good: the feed gets more relevant. But it also means you see less of what you don't already know you like. New ideas, opposing viewpoints, and unfamiliar content get filtered out. Not by conspiracy. Just by optimization. The algorithm is doing exactly what it was designed to do, maximize engagement by showing you what keeps you engaged. The filter bubble is a side effect of success.",
  },
  {
    tag: 'Myth bust',
    title: "You Can't Fully Opt Out",
    body: "Even if you actively try to confuse the algorithm, watching things you don't like, clicking randomly, it adapts. It builds a model of you confusing it. It finds the patterns in your confusion. The only real opt-out is not using the platform. The algorithm is designed to model any behavioral pattern, including attempts to hide your preferences. Your data is always being collected. Your model is always being updated. There is no neutral use.",
  },
  {
    tag: 'Big idea',
    title: 'The Attention Economy',
    body: "Recommendation algorithms exist because human attention is scarce and valuable. Advertisers pay for access to attention. Platforms sell that access. The algorithm's job is to maximize the amount of attention each user gives to the platform. Everything else, the entertainment, the connection, the information, is in service of that goal. Understanding this doesn't make the content less enjoyable. But it changes what you think the product actually is. The content is the bait. Your attention is what's being sold.",
  },
]

const QUESTIONS: Question[] = [
  {
    difficulty: 'Easy',
    tag: 'Fact',
    stopTitle: 'You Have A Profile',
    question: `"Recommendation algorithms build a model of you based on your behavior not your personal information."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Not your name, not your age, your behavior. What you watch, how long, what you skip, what you share, what time of day. This behavioral model is often more accurate than anything you'd tell the platform voluntarily. Every interaction updates it continuously.",
  },
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: 'You Have A Profile',
    question: `"Netflix shows every user the same homepage."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Netflix builds a different homepage for every user. The thumbnails it picks, the order shows appear, which titles get promoted: all personalized to what its model predicts you'll click. You have never seen Netflix the way anyone else sees it.",
  },
  {
    difficulty: 'Easy',
    tag: 'Example',
    stopTitle: 'Collaborative Filtering',
    question: `"Collaborative filtering recommends things based on what similar users liked."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Find people who behaved like you and show you what they liked next. You watched three specific films: other users who watched those same three also watched a fourth. So you get the fourth. No understanding of content required. Just behavioral patterns across millions of users.",
  },
  {
    difficulty: 'Medium',
    tag: 'Hot take',
    stopTitle: 'The Engagement Trap',
    question: `"Recommendation algorithms are designed to maximize your happiness and satisfaction."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "They're designed to maximize engagement: time spent, clicks, shares. Happiness and engagement overlap but not always. Content that makes you angry or anxious keeps you scrolling just as well as content that makes you happy. The algorithm doesn't know the difference. It just learned what gets clicks.",
  },
  {
    difficulty: 'Medium',
    tag: 'Scenario',
    stopTitle: 'The Filter Bubble',
    question: `"The filter bubble effect happens partly because algorithms show you more of what you already engage with."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Not just that people seek out opinions they agree with: algorithms amplify it automatically. Engage with one viewpoint and that's what fills your feed. Not by conspiracy. By optimization. The algorithm is doing exactly what it was designed to do. The filter bubble is a side effect of success.",
  },
  {
    difficulty: 'Medium',
    tag: 'Myth bust',
    stopTitle: "You Can't Fully Opt Out",
    question: `"You can fully opt out of algorithmic personalization by clicking randomly and watching things you don't like."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "The algorithm adapts. It builds a model of you confusing it. It finds patterns in your confusion. The only real opt-out is not using the platform. Your data is always being collected. Your model is always being updated. There is no neutral use.",
  },
  {
    difficulty: 'Hard',
    tag: 'Fact',
    stopTitle: 'The Cold Start Problem',
    question: `"The cold start problem refers to the difficulty of recommending content to new users the algorithm knows nothing about."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "When you're a new user the algorithm has no behavioral data. It has to guess. Most platforms solve this by asking initial preferences then rapidly updating based on first interactions. TikTok is particularly aggressive. It can build a detailed behavioral model within 30 minutes of a new account's first use.",
  },
  {
    difficulty: 'Hard',
    tag: 'Big idea',
    stopTitle: 'The Attention Economy',
    question: `"Because recommendation platforms are free to use, the cost to users is purely financial."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "The cost is your attention and your data. The more accurately the algorithm models your behavior the more valuable that model is to advertisers. You are not the customer of these platforms. You are the product. Free means someone else is paying, and that someone is paying for access to you.",
  },
]

export default function Lesson12() {
  return <LessonTemplate id={12} title="How Recommendation Algorithms Decide" stops={STOPS} questions={QUESTIONS} />
}
