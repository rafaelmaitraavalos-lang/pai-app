import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

export const STOPS: Stop[] = [
  {
    tag: "Fact",
    title: "Platforms Learn from Your Behavior",
    body: "Many platforms personalize what you see. A recommendation system may use signals such as what you watch, what you skip, what you replay, what you save, and what you search for. These signals help the system predict which content you may find relevant. The platform does not need a complete understanding of who you are as a person. It needs enough information about your behavior to make useful predictions.",
  },
  {
    tag: "Example",
    title: "Collaborative Filtering",
    body: "One common recommendation method is collaborative filtering. The basic idea is to look for patterns across many users. Suppose you watched three films. Other users who watched those same films also tended to watch a fourth one. The system may recommend that fourth film to you. Collaborative filtering does not need to understand the plot of each movie. It uses patterns in user behavior to estimate what you might enjoy next.",
  },
  {
    tag: "Example",
    title: "Content-Based Recommendations",
    body: "Another approach is to analyze the content itself. A system might identify characteristics of a song, film, article, or video and recommend other items with similar features. For music, those features could include elements such as tempo, genre, instrumentation, or listening patterns. For a film, they might include actors, themes, or categories. This approach can help recommend content even when it has not yet received much attention from other users.",
  },
  {
    tag: "Fact",
    title: "Modern Systems Combine Methods",
    body: "Real recommendation systems are often more complicated than a single formula. They may begin by gathering a set of possible recommendations, score those options, and then decide which ones to place highest in the feed. A platform may consider several goals at once. It might try to predict what you will click, what you will finish, what you will save, or what will keep the experience useful over time. Different platforms make different design choices.",
  },
  {
    tag: "Hot take",
    title: "Engagement Is Not the Same as Wellbeing",
    body: "A platform may care about engagement: watch time, clicks, shares, comments, or return visits. These signals can help measure whether people are interested in the content they see. But engagement is not the same thing as satisfaction or wellbeing. A post may hold your attention because it is funny, informative, frustrating, or upsetting. A system that measures behavior may not fully distinguish between those reasons.",
  },
  {
    tag: "Fact",
    title: "The Cold-Start Problem",
    body: "Recommendation systems work best when they have information to learn from. A new user has little or no history on the platform, so the system has fewer clues about what to recommend. This is called the cold-start problem. Platforms may respond by asking new users to select interests, showing popular content, or learning from early interactions. Recommendations often become more personalized as the system gathers more information.",
  },
  {
    tag: "Scenario",
    title: "Feedback Loops",
    body: "Personalized recommendations can create feedback loops. If you watch several videos about one topic, the platform may recommend more videos about that topic. If you continue watching them, the system receives an even stronger signal that you are interested. This can be useful when you are discovering music, films, or hobbies. It can become more complicated when the content involves news, politics, or emotionally charged topics. The system may gradually narrow what you encounter. Algorithms are not the only factor. People also make choices about what to click, follow, and share. The feed develops through an interaction between the user and the recommendation system.",
  },
  {
    tag: "Big idea",
    title: "Use Recommendations Deliberately",
    body: "Recommendation algorithms do not simply reflect your interests. They shape them. Every feed is the result of choices about what gets promoted, what gets buried, and what keeps you scrolling. Once you notice that, you can use the feed more deliberately instead of letting it steer you automatically.",
  },
]

export const QUESTIONS: Question[] = [
  {
    difficulty: "Easy",
    tag: "Fact",
    stopTitle: '',
    question: `Recommendation systems can use signals such as watch time, skips, saves, and searches.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Platforms can learn from the way users interact with content. Different systems use different signals, but behavior often plays an important role in personalization.",
  },
  {
    difficulty: "Easy",
    tag: "Example",
    stopTitle: '',
    question: `Collaborative filtering recommends content partly by finding patterns among users with similar behavior.`,
    answer: true,
    verdict: "Correct.",
    explanation: "If people who watched the same three films often watched a fourth film, the system may recommend that fourth film to another user with a similar history.",
  },
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `Collaborative filtering requires the system to understand what a film is about.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Collaborative filtering can make recommendations based on patterns in user behavior. It does not necessarily need to analyze the content of each film.",
  },
  {
    difficulty: "Medium",
    tag: "Example",
    stopTitle: '',
    question: `A content-based recommendation system can use characteristics of an item to recommend similar items.`,
    answer: true,
    verdict: "Correct.",
    explanation: "A system might compare features of songs, films, articles, or videos and suggest content with similar characteristics.",
  },
  {
    difficulty: "Medium",
    tag: "Myth bust",
    stopTitle: '',
    question: `A recommendation algorithm always has only one goal: maximizing the number of clicks.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Real systems can consider several signals and objectives, such as watch time, relevance, saves, satisfaction, or long-term usefulness. The exact design varies by platform.",
  },
  {
    difficulty: "Medium",
    tag: "Fact",
    stopTitle: '',
    question: `The cold-start problem happens when a recommendation system has little information about a new user or a new item.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Without much data, the system has fewer clues about what to recommend. It may begin with popular content, ask about interests, or learn from early interactions.",
  },
  {
    difficulty: "Hard",
    tag: "Scenario",
    stopTitle: '',
    question: `Personalized recommendations can create a feedback loop by showing users more content similar to what they already engage with.`,
    answer: true,
    verdict: "Correct.",
    explanation: "When a user repeatedly interacts with one type of content, the platform may recommend more of it. Continued engagement can strengthen the pattern over time.",
  },
  {
    difficulty: "Hard",
    tag: "Big idea",
    stopTitle: '',
    question: `A personalized feed is shaped only by the user's independent choices.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Users make choices about what to click and watch, but the platform also influences which options appear in front of them. A personalized feed develops through an interaction between user behavior and the system's design.",
  },
]

export default function Lesson12() {
  return <LessonTemplate id={12} title="Recommendation Algorithms" stops={STOPS} questions={QUESTIONS} />
}
