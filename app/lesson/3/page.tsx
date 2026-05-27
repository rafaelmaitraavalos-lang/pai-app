import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

const STOPS: Stop[] = [
  {
    tag: 'Myth bust',
    title: 'You Already Use It',
    body: "You don't need to go looking for AI. It found you years ago. Every app you opened today, every song that played next, every search result you clicked — AI was involved. You're not a future user of this technology. You're a current one. You have been for years.",
  },
  {
    tag: 'Example',
    title: 'The Feed',
    body: "TikTok's algorithm watches everything. How long you pause. Whether you replay. What you skip. It builds a model of you — not your name, not your face, just your patterns. Then it finds content that matches those patterns. Within 30 minutes of a new account it knows more about what you'll watch than your closest friends do.",
  },
  {
    tag: 'Example',
    title: 'The Recommendation',
    body: "Netflix doesn't show everyone the same homepage. It shows you a homepage built for your pattern. The thumbnails it picks, the order shows appear, even which shows get promoted — all of it is personalized to what its model predicts you'll click. You've never seen Netflix the way anyone else sees it.",
  },
  {
    tag: 'Hot take',
    title: 'Your Phone Knows You',
    body: "Autocomplete on your keyboard is AI. Spam filter in your email is AI. The camera deciding what's in focus is AI. Face ID is AI. Google Maps rerouting around traffic is AI. Most people interact with AI dozens of times before noon without ever thinking of it as AI.",
  },
  {
    tag: 'Myth bust',
    title: "It's Not Trying To Help You",
    body: "Recommendation algorithms are not designed to make you happy. They're designed to maximize engagement — time spent, clicks, shares. Sometimes that means showing you things that make you angry or anxious because those emotions keep you scrolling. The algorithm doesn't know the difference. It just knows what gets clicks.",
  },
  {
    tag: 'Hot take',
    title: 'The Echo Chamber',
    body: "When AI only shows you things that match your existing patterns it gets harder to encounter ideas you disagree with. Your feed becomes a mirror of what you already believe. This isn't a conspiracy — it's just pattern matching doing its job. The algorithm gives you more of what you engage with. If you only engage with one viewpoint, that's all it shows you.",
  },
  {
    tag: 'Example',
    title: 'Spotify Knows First',
    body: "Spotify has predicted breakups before the people involved announced them. Listening patterns shift — more sad songs, less shared playlists, different genres at night. The algorithm notices the pattern change before most friends would. It's not magic. It's just that your music choices are data, and data tells a story.",
  },
  {
    tag: 'Big idea',
    title: 'You Are The Product',
    body: "Every free app that uses AI to personalize your experience is doing so because your attention is valuable. The more accurately the algorithm models you, the better it can sell that model to advertisers. You are not the customer. You are the data that makes the product work. Understanding that doesn't mean you have to stop using these apps. It means you should use them knowing what they actually are.",
  },
]

const QUESTIONS: Question[] = [
  {
    difficulty: 'Easy',
    tag: 'Example',
    stopTitle: 'The Feed',
    question: `"TikTok's algorithm watches your behavior — not just what you like but how long you pause and what you replay."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "It doesn't need your name. It watches behavior — pause time, replays, skips. It builds a behavioral pattern that is often more accurate than anything you'd tell it voluntarily. Within 30 minutes of a new account it knows more about what you'll watch than your closest friends do.",
  },
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: 'The Recommendation',
    question: `"Every Netflix user sees the same homepage."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Netflix builds a different homepage for every user based on watch history and patterns. The thumbnails, the order, which shows get promoted — all personalized. You have never seen Netflix the way anyone else sees it.",
  },
  {
    difficulty: 'Easy',
    tag: 'Example',
    stopTitle: 'Your Phone Knows You',
    question: `"Spam filters in your email are a form of AI."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Spam filters learned what spam looks like by training on millions of examples. They pattern-match every incoming email against what they learned. That's AI. It's been in your inbox for decades without most people ever thinking of it that way.",
  },
  {
    difficulty: 'Medium',
    tag: 'Hot take',
    stopTitle: "It's Not Trying To Help You",
    question: `"Recommendation algorithms are designed to make you happy."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "They're designed to maximize engagement — time spent, clicks, shares. Happiness and engagement often overlap but not always. Content that makes you angry or anxious keeps you scrolling just as well as content that makes you happy. The algorithm doesn't know the difference and doesn't care.",
  },
  {
    difficulty: 'Medium',
    tag: 'Myth bust',
    stopTitle: 'The Echo Chamber',
    question: `"Echo chambers on social media happen because algorithms show you more of what you engage with."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "It's not just that people seek out opinions they agree with. Recommendation algorithms amplify it automatically. If you engage with one viewpoint that's what fills your feed — not because you chose it but because the algorithm optimized for your clicks. The design of the system does most of the work.",
  },
  {
    difficulty: 'Medium',
    tag: 'Hot take',
    stopTitle: 'The Feed',
    question: `"Using personalized apps means AI has an accurate model of who you are as a person."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "AI has an accurate model of your behavioral patterns. That's different from knowing who you are. It knows what you click not why. It knows what you watch not what you value. The model is powerful and shallow at the same time.",
  },
  {
    difficulty: 'Hard',
    tag: 'Hot take',
    stopTitle: 'You Are The Product',
    question: `"The fact that apps like TikTok and Spotify are free means AI personalization costs users nothing."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "The price is your attention and your data. The more accurately the algorithm models your behavior the more valuable that model is to advertisers. You are not the customer of these platforms. You are the product being sold. Free means someone else is paying — and that someone is paying for access to you.",
  },
  {
    difficulty: 'Hard',
    tag: 'Big idea',
    stopTitle: 'You Are The Product',
    question: `"Understanding how recommendation algorithms work can change your relationship to them."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Knowing the algorithm optimizes for engagement rather than your wellbeing doesn't make it powerless but it changes how you interact with it. You can ask why you're being shown something instead of just reacting to it. That gap — between stimulus and response — is where critical thinking lives. It's also exactly what the algorithm is designed to eliminate.",
  },
]

export default function Lesson3() {
  return <LessonTemplate id={3} title="AI In Your Life" stops={STOPS} questions={QUESTIONS} />
}
