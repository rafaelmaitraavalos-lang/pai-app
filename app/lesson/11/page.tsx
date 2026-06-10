import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

export const STOPS: Stop[] = [
  {
    tag: "Myth bust",
    title: "Prediction Is Part of the Process",
    body: "When ChatGPT answers a question, it generates its response one token at a time. At each step, the model uses the conversation so far to estimate which token should come next. That may sound simple, but the process is based on patterns learned during training and involves a large number of calculations. Modern systems can produce explanations, summaries, code, and other complex outputs. Predicting tokens is central to how the text is generated, even when the final response appears thoughtful or conversational.",
  },
  {
    tag: "Fact",
    title: "Learning from Large Amounts of Data",
    body: "The language models behind ChatGPT are trained on large collections of text and other data. During training, the model adjusts its internal weights as it learns patterns in language. The full details of the training data for current proprietary models are not publicly disclosed. It is more accurate to say that the model learns statistical relationships across a large amount of data than to imagine it storing a searchable copy of every book, website, or conversation it encountered.",
  },
  {
    tag: "Example",
    title: "The Transformer",
    body: "Many modern language models are based on a type of neural-network architecture called the transformer. Transformers became influential after researchers introduced them in a 2017 paper titled \"Attention Is All You Need.\" An important feature of the transformer is attention. Attention helps a model identify relationships between different parts of a sequence. For example, when processing a sentence, the model can use surrounding words to help determine which earlier words are most relevant to the next step.",
  },
  {
    tag: "Example",
    title: "Tokens, Not Just Words",
    body: "ChatGPT does not process text only as complete words. It processes units called tokens. A token might be a full word, part of a word, a punctuation mark, or even a single character. The model converts text into tokens, processes the sequence, and generates new tokens in response. Tokenization is one reason some tasks that seem easy to a person, such as counting letters or solving certain kinds of wordplay, can be unexpectedly difficult for a language model.",
  },
  {
    tag: "Myth bust",
    title: "Memory Is More Complicated Than It Seems",
    body: "Within a conversation, ChatGPT can refer back to earlier messages. Those messages provide context for the response. ChatGPT may also have memory features that allow it to use helpful information from previous conversations, such as a user's preferences or goals. These features depend on the user's settings and do not mean that the model remembers every detail of every conversation. A temporary chat or a chat with memory turned off works differently.",
  },
  {
    tag: "Fact",
    title: "The Context Window",
    body: "A language model can only process a limited amount of information at one time. This limit is called the context window. The size of the context window varies depending on the model and the version of ChatGPT being used. A larger context window allows the model to work with longer conversations or documents. However, a larger window does not guarantee perfect memory or perfect understanding of everything included in it.",
  },
  {
    tag: "Scenario",
    title: "Why Hallucinations Happen",
    body: "ChatGPT can sometimes generate information that sounds convincing but is incorrect. These errors are often called hallucinations. One reason this happens is that a language model is designed to generate a useful response based on learned patterns. When the model is uncertain, it may still produce an answer that sounds plausible. Training and evaluation methods can also reward a confident guess more than an honest admission of uncertainty. Tools such as web search can help the system check current information and cite sources, but important claims should still be verified.",
  },
  {
    tag: "Big idea",
    title: "Output and Understanding Are Not the Same Question",
    body: "ChatGPT can generate text that sounds natural, answer questions across many subjects, and adapt its writing style to different situations. Those abilities are significant. But a model can write a brilliant paragraph about something it understands nothing about. Researchers and philosophers still debate how words such as \"reasoning,\" \"knowledge,\" and \"understanding\" should apply to AI systems. It is useful to evaluate what a system can do without assuming that its internal experience resembles a human one.",
  },
]

export const QUESTIONS: Question[] = [
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `ChatGPT generates text one token at a time.`,
    answer: true,
    verdict: "Correct.",
    explanation: "The model uses the conversation so far to calculate possible next tokens and generate a response. Tokens may be complete words, parts of words, punctuation marks, or individual characters.",
  },
  {
    difficulty: "Easy",
    tag: "Fact",
    stopTitle: '',
    question: `The full details of the training data used for current proprietary models are publicly available.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Language models are trained on large amounts of data, but the complete composition of the training data for current proprietary models is not publicly disclosed.",
  },
  {
    difficulty: "Easy",
    tag: "Example",
    stopTitle: '',
    question: `ChatGPT processes text only as complete words.`,
    answer: false,
    verdict: "Correct.",
    explanation: "ChatGPT processes tokens. A token may be a word, part of a word, punctuation, or sometimes a single character.",
  },
  {
    difficulty: "Medium",
    tag: "Fact",
    stopTitle: '',
    question: `Attention helps a transformer model use relationships between different parts of a sequence.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Attention allows the model to determine which parts of the input are especially relevant while processing the sequence.",
  },
  {
    difficulty: "Medium",
    tag: "Myth bust",
    stopTitle: '',
    question: `ChatGPT always starts every conversation with no information from previous chats.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Within a conversation, ChatGPT can use earlier messages as context. Depending on the user's settings, memory features may also allow it to use helpful information from previous conversations. It does not automatically remember every detail.",
  },
  {
    difficulty: "Medium",
    tag: "Scenario",
    stopTitle: '',
    question: `A hallucination is an answer that sounds plausible but contains incorrect information.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Language models can sometimes produce confident but false claims. This is why important information should be checked against reliable sources.",
  },
  {
    difficulty: "Hard",
    tag: "Fact",
    stopTitle: '',
    question: `The context window limits how much information a model can process at one time.`,
    answer: true,
    verdict: "Correct.",
    explanation: "A larger context window allows a model to work with longer conversations or documents, but it does not guarantee that the model will interpret every detail perfectly.",
  },
  {
    difficulty: "Hard",
    tag: "Big idea",
    stopTitle: '',
    question: `Because ChatGPT can generate human-like writing, it must understand language in exactly the same way a person does.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Generating useful, natural-sounding language is not automatically the same as having human-like understanding. The relationship between AI performance and understanding remains an open question.",
  },
]

export default function Lesson11() {
  return <LessonTemplate id={11} title="How ChatGPT Works" stops={STOPS} questions={QUESTIONS} />
}
