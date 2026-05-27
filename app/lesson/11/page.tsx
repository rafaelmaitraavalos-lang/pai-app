import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

const STOPS: Stop[] = [
  {
    tag: 'Myth bust',
    title: "It's Not Thinking",
    body: "When ChatGPT writes an essay, answers a question, or holds a conversation, it is not thinking. It is predicting. At every step it looks at everything written so far and predicts what word should come next, based on patterns learned from hundreds of billions of words of text. It does this one word at a time, each prediction feeding the next. The result can look like thought. It is very fast, very sophisticated pattern completion.",
  },
  {
    tag: 'Fact',
    title: 'The Training Data',
    body: "ChatGPT was trained on an enormous amount of text — books, websites, code, articles, conversations. The exact composition is not fully disclosed but it's estimated at hundreds of billions of words. The network read all of it — in the sense that it adjusted its weights based on all of it — and learned to predict what comes next in any kind of text. That training is what gives it the appearance of knowing things. It learned the patterns. The patterns contain the knowledge.",
  },
  {
    tag: 'Example',
    title: 'The Transformer',
    body: "ChatGPT is built on an architecture called the transformer, introduced by Google researchers in 2017. The key innovation is attention — the ability for every word in a sequence to directly influence every other word, regardless of distance. Before transformers, networks processed text sequentially and struggled with long-range dependencies. Transformers process everything at once. That's what allows ChatGPT to maintain coherence across a long conversation. Attention is the mechanism that makes it work.",
  },
  {
    tag: 'Example',
    title: 'Tokens Not Words',
    body: "ChatGPT doesn't process words — it processes tokens. A token is roughly a word or part of a word. \"Unbelievable\" might be two tokens. \"AI\" is one. The model converts text to tokens, processes the sequence of tokens through its layers, and produces probabilities over the next token. This tokenization is why ChatGPT sometimes struggles with letter counting or wordplay — it never sees individual letters, only chunks.",
  },
  {
    tag: 'Hot take',
    title: 'It Has No Memory',
    body: "Every time you start a new conversation with ChatGPT, it starts from zero. It has no memory of previous conversations. Within a single conversation it can refer back to what was said — that's in its context window. But close the window and it's gone. The model has no persistent memory of you, your preferences, or your history. What feels like a relationship is reconstructed fresh each time from the patterns in its weights. You remember the conversation. It doesn't.",
  },
  {
    tag: 'Fact',
    title: 'The Context Window',
    body: "ChatGPT can only consider a limited amount of text at once — its context window. Everything outside that window is invisible to it. Early versions had small context windows and would lose track of the beginning of long conversations. Recent versions have much larger windows — some can hold entire books. The context window is one of the fundamental constraints of transformer models. Everything the model knows about your conversation has to fit inside it.",
  },
  {
    tag: 'Scenario',
    title: 'Why It Hallucinates',
    body: "ChatGPT hallucinates — confidently producing false information — because it has no mechanism to check whether what it's predicting is true. It predicts the most plausible next token given everything before it. A plausible-sounding citation is a plausible next token. A confident but wrong fact is a plausible next token. Truth and plausibility are not the same thing. The model optimizes for plausibility. It has no access to truth. That gap is where hallucinations live.",
  },
  {
    tag: 'Big idea',
    title: 'The Imitation Game At Scale',
    body: "What ChatGPT does is, at some level, an extreme version of Turing's imitation game. It was trained to produce text that looks like human text. It does this so well that the output is often indistinguishable from what a human would write. Whether that means it understands anything — whether producing human-like output requires or produces anything like human-like cognition — is the question that makes AI researchers, philosophers, and neuroscientists argue. The imitation is real. What lies behind it is not agreed upon.",
  },
]

const QUESTIONS: Question[] = [
  {
    difficulty: 'Easy',
    tag: 'Myth bust',
    stopTitle: "It's Not Thinking",
    question: `"ChatGPT thinks through your question and reasons to an answer."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "ChatGPT predicts. At every step it looks at everything written so far and predicts what word should come next based on patterns learned from hundreds of billions of words. It does this one token at a time. The result can look like thought. It is very fast, very sophisticated pattern completion.",
  },
  {
    difficulty: 'Easy',
    tag: 'Fact',
    stopTitle: 'The Training Data',
    question: `"ChatGPT was trained on an enormous amount of human-produced text."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Books, websites, code, articles, conversations — hundreds of billions of words. The network adjusted its weights based on all of it and learned to predict what comes next in any kind of text. That training is what gives it the appearance of knowing things. It learned the patterns. The patterns contain the knowledge.",
  },
  {
    difficulty: 'Easy',
    tag: 'Example',
    stopTitle: 'Tokens Not Words',
    question: `"ChatGPT processes text one letter at a time."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "It processes tokens — roughly words or parts of words. \"Unbelievable\" might be two tokens. \"AI\" is one. This tokenization is why ChatGPT sometimes struggles with letter counting or wordplay — it never sees individual letters, only chunks. The model converts text to tokens, processes the sequence, and produces probabilities over the next token.",
  },
  {
    difficulty: 'Medium',
    tag: 'Example',
    stopTitle: 'The Transformer',
    question: `"The transformer architecture allows every word in a sequence to directly influence every other word regardless of distance."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "This is the key innovation of the transformer — attention. Before transformers, networks processed text sequentially and struggled with long-range dependencies. Transformers process everything at once. That's what allows ChatGPT to maintain coherence across a long conversation.",
  },
  {
    difficulty: 'Medium',
    tag: 'Hot take',
    stopTitle: 'It Has No Memory',
    question: `"ChatGPT remembers previous conversations and builds on them over time."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "Every new conversation starts from zero. The model has no memory of previous conversations. Within a single conversation it can refer back to what was said — that's in its context window. But close the window and it's gone. What feels like a relationship is reconstructed fresh each time from the patterns in its weights.",
  },
  {
    difficulty: 'Medium',
    tag: 'Scenario',
    stopTitle: 'Why It Hallucinates',
    question: `"ChatGPT hallucinates because it has no mechanism to check whether what it produces is true."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "It predicts the most plausible next token. A plausible-sounding citation is a plausible next token. A confident but wrong fact is a plausible next token. Truth and plausibility are not the same thing. The model optimizes for plausibility. It has no access to truth. That gap is where hallucinations live.",
  },
  {
    difficulty: 'Hard',
    tag: 'Fact',
    stopTitle: 'The Context Window',
    question: `"The context window limits how much text ChatGPT can consider at once."`,
    answer: true,
    verdict: 'Correct.',
    explanation: "Everything outside the context window is invisible to the model. Early versions had small windows and would lose track of the beginning of long conversations. Recent versions can hold entire books. The context window is one of the fundamental constraints of transformer models — everything the model knows about your conversation has to fit inside it.",
  },
  {
    difficulty: 'Hard',
    tag: 'Big idea',
    stopTitle: 'The Imitation Game At Scale',
    question: `"Because ChatGPT produces human-like text, it must have developed human-like understanding."`,
    answer: false,
    verdict: 'Wrong.',
    explanation: "This is Turing's question at scale. ChatGPT was trained to produce text that looks like human text. It does this so well the output is often indistinguishable from human writing. Whether producing human-like output requires or produces anything like human cognition is genuinely unresolved. The imitation is real. What lies behind it is not agreed upon.",
  },
]

export default function Lesson11() {
  return <LessonTemplate id={11} title="How ChatGPT Works" stops={STOPS} questions={QUESTIONS} />
}
