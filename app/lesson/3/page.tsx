import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

export const STOPS: Stop[] = [
  {
    tag: "Myth bust",
    title: "You Already Use It",
    body: "AI is not a technology you have to go out of your way to find. You probably interact with it throughout the day without noticing. It helps rank search results, filter spam, recommend music, organize social-media feeds, and suggest the next word when you type. Many of these systems have been part of everyday life for years.",
  },
  {
    tag: "Example",
    title: "The Feed",
    body: "When you use TikTok, the platform pays attention to more than the videos you like. It can also track which videos you finish, which ones you skip, what you replay, and how long you pause before scrolling. Over time, the recommendation system uses those signals to estimate what you are likely to watch next. It does not need to understand who you are as a person. It only needs enough information about your behavior to make increasingly accurate predictions.",
  },
  {
    tag: "Example",
    title: "The Recommendation",
    body: "Netflix does not show every user the same homepage. The order of the shows, the categories you see, and even some of the images used to advertise a show can vary based on your viewing history. The goal is to make it easier for you to find something you are likely to watch. Two people opening Netflix at the same time may see noticeably different versions of the platform.",
  },
  {
    tag: "Myth bust",
    title: "AI Is Already in Your Phone",
    body: "AI shows up in many ordinary phone features. Autocomplete predicts what you might type next. Spam filters identify suspicious messages. Camera software adjusts focus and improves images. Face ID checks whether your face matches the stored representation on your phone. Navigation apps use data to suggest faster routes. Not every automated feature is AI, but many tools people use every day rely on machine-learning systems in some form.",
  },
  {
    tag: "Hot take",
    title: "What Is the System Optimizing For?",
    body: "Recommendation algorithms are not designed only to show you content you will enjoy. Platforms often care about engagement: how long you stay, what you click, what you share, and whether you return later. Most of the time, enjoyable content keeps people engaged. But other emotions can also hold your attention. A video that annoys you or makes you anxious may still be effective if it keeps you watching. The system measures your response, not whether the experience was good for you.",
  },
  {
    tag: "Hot take",
    title: "The Echo Chamber",
    body: "Recommendation systems often show you more of the content you already respond to. This can be useful when the platform is recommending music or movies. It becomes more complicated when the content involves politics, news, or social issues. Algorithms did not invent echo chambers. People have always gravitated toward ideas they already agree with. But a recommendation system can accelerate the process, quietly turning a few clicks into an increasingly narrow version of the world.",
  },
  {
    tag: "Example",
    title: "Your Listening Habits Are Data",
    body: "Spotify learns from the music you play, skip, save, and repeat. It can use those patterns to recommend songs or create personalized playlists. The system does not know why you played the same song five times or why you suddenly started listening to a different genre. It only sees the change in your behavior. Even small actions can become useful data when a platform collects them over time.",
  },
  {
    tag: "Big idea",
    title: "Attention Has Value",
    body: "Personalized apps are often free to use because the business model depends on attention. The longer users stay on a platform, the more opportunities the platform has to show ads, collect information about behavior, or encourage purchases. Personalized apps are not automatically bad. But the next time your feed seems impossible to put down, remember that it was designed to hold your attention. Ask whether it is showing you what you actually want to see.",
  },
]

export const QUESTIONS: Question[] = [
  {
    difficulty: "Easy",
    tag: "Example",
    stopTitle: '',
    question: `TikTok’s recommendation system can use signals such as watch time, replays, likes, and skips.`,
    answer: true,
    verdict: "Correct.",
    explanation: "A recommendation system learns from the way you interact with content. A like is one signal, but it is not the only one. Finishing a video, replaying it, or scrolling away quickly can also help the system predict what you may watch next.",
  },
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `Every Netflix user sees the same homepage.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Netflix personalizes its homepage based on viewing history and other signals. The order of shows, the categories displayed, and some promotional images can vary from one user to another.",
  },
  {
    difficulty: "Easy",
    tag: "Example",
    stopTitle: '',
    question: `Spam filters are an example of technology that can use machine learning.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Spam filters can learn patterns associated with unwanted messages and use those patterns to identify suspicious emails. They are one of the most familiar examples of AI working quietly in the background.",
  },
  {
    difficulty: "Medium",
    tag: "Hot take",
    stopTitle: '',
    question: `Recommendation algorithms are designed only to make users happy.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Platforms often optimize for engagement: clicks, watch time, shares, and return visits. Content you enjoy may keep you engaged, but content that frustrates or worries you can also hold your attention.",
  },
  {
    difficulty: "Medium",
    tag: "Myth bust",
    stopTitle: '',
    question: `Algorithms are the only reason echo chambers form online.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Recommendation systems can reinforce echo chambers by showing users more of the content they already engage with. However, human behavior also matters. People often choose to follow accounts, sources, and communities that reflect their existing views.",
  },
  {
    difficulty: "Medium",
    tag: "Hot take",
    stopTitle: '',
    question: `A personalized app can predict some of your behavior without fully understanding who you are.`,
    answer: true,
    verdict: "Correct.",
    explanation: "A platform may become good at predicting what you will click, watch, or play next. That is not the same as understanding your beliefs, motivations, or values. A behavioral model can be useful while still being incomplete.",
  },
  {
    difficulty: "Hard",
    tag: "Hot take",
    stopTitle: '',
    question: `A free app with personalized recommendations does not receive anything valuable from its users.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Attention and behavioral data can be valuable. A platform may use them to improve recommendations, sell advertising, or keep users active for longer periods. A service can be free to download while still benefiting financially from the way people use it.",
  },
  {
    difficulty: "Hard",
    tag: "Big idea",
    stopTitle: '',
    question: `Understanding how recommendation systems work can help you use them more deliberately.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Once you know that a platform is trying to hold your attention, you can pause and ask why a certain post or video appeared in your feed. You don\u2019t have to distrust every recommendation. Just make more conscious choices about what you watch, click, and share.",
  },
]

export default function Lesson3() {
  return <LessonTemplate id={3} title="AI In Your Life" stops={STOPS} questions={QUESTIONS} />
}
