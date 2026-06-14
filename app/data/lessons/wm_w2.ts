import { LessonData } from '../index'

const wm_w2: Record<number, LessonData> = {
  221: {
    id: 221, worldId: 202,
    title: "What Is A Neural Network?",
    stops: [
      { tag: "Fact", title: "Inspired by the Brain", body: "Many modern AI systems use a structure called a neural network. The name comes from an early comparison to the brain. The human brain contains billions of neurons connected to one another. Those connections change as people learn. Artificial neural networks borrow a very simplified version of that idea. They are not miniature brains. They are mathematical systems made of connected units, often called nodes." },
      { tag: "Example", title: "Three Layers", body: "A basic neural network has three parts: • Input layer: receives information, such as pixels, words, or numbers • Hidden layers: process and transform that information • Output layer: produces a result, such as a prediction or classification" },
      { tag: "Big idea", title: "Weights Drive Learning", body: "The connections between nodes have values called weights. A weight determines how strongly one piece of information influences another. Training a neural network means adjusting those weights until the system becomes better at its task." },
      { tag: "Hot take", title: "Improvement Through Repetition", body: "At the beginning of training, a neural network is not very useful. Its predictions may be wildly inaccurate. The improvement comes entirely from the repeated adjustment of weights across enormous numbers of examples." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A neural network is a mathematical system of connected nodes that processes information.`, answer: true, verdict: "Correct.", explanation: "What is a neural network? — A mathematical system of connected nodes that processes information" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Weights in a neural network are values that control how strongly one node influences another.`, answer: true, verdict: "Correct.", explanation: "What are weights in a neural network? — Values that control how strongly one node influences another" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Training a neural network involves adjusting weights repeatedly across many examples until predictions improve.`, answer: true, verdict: "Correct.", explanation: "What does training a neural network actually involve? — Adjusting weights repeatedly across many examples until predictions improve" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The output layer of a neural network receives the raw input data before any processing.`, answer: false, verdict: "Correct.", explanation: "Which part of a neural network produces the final output? — Output layer" },
    ],
  },
  222: {
    id: 222, worldId: 202,
    title: "How Networks Train",
    stops: [
      { tag: "Fact", title: "Starting from Scratch", body: "At the beginning of training, a neural network is not very useful. Its predictions may be wildly inaccurate. Training helps the network improve through a structured process." },
      { tag: "Example", title: "The Training Loop", body: "The training process: 1. The network makes a prediction. 2. The prediction is compared with the correct answer. 3. The system measures how far off it was. This difference is called the loss or error. 4. The network adjusts its weights slightly to reduce the error. 5. The process repeats across many examples." },
      { tag: "Big idea", title: "Backprop and Gradient Descent", body: "One method used to update the weights is called backpropagation. It works backward through the network to calculate which weights contributed most to the mistake. Another key concept is gradient descent — the system taking small steps in the direction that lowers its error." },
      { tag: "Hot take", title: "Billions of Small Steps", body: "No single adjustment changes very much. The improvement comes from repetition. This is why large models require enormous computing resources and time to train — not because any individual step is complex, but because useful performance requires billions of them." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Loss" in neural network training refers to how far off the network's prediction is from the correct answer.`, answer: true, verdict: "Correct.", explanation: "What is \"loss\" in the context of neural network training? — A measure of how far off the network's prediction is from the correct answer" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Backpropagation works backward through the network to identify which weights contributed most to the error.`, answer: true, verdict: "Correct.", explanation: "What is backpropagation? — A technique that works backward through the network to identify which weights contributed most to the error" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Gradient descent is the process of the system taking small steps in the direction that reduces its error.`, answer: true, verdict: "Correct.", explanation: "What is gradient descent? — The process of the system taking small steps in the direction that reduces its error" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Large AI models require enormous computing resources because each individual training step is extremely complex.`, answer: false, verdict: "Correct.", explanation: "Why does training large models require enormous computing resources? — Useful performance requires billions of small adjustments, not because any single step is complex" },
    ],
  },
  223: {
    id: 223, worldId: 202,
    title: "Deep Learning",
    stops: [
      { tag: "Fact", title: "What 'Deep' Means", body: "A neural network is made of layers. A shallow network has only a few hidden layers. A deep network has many more. That is what the word \"deep\" means in deep learning. It does not mean the system is thinking deeply. It means information passes through many layers of calculations." },
      { tag: "Example", title: "Layers Detect Features", body: "In an image-recognition system, different layers may respond to different kinds of visual information: • Early layers may detect edges or lines • Later layers may detect textures or shapes • Deeper layers may combine those patterns into more complex features For example, a system may gradually move from noticing simple lines to identifying parts of a face, a wheel, or an animal." },
      { tag: "Big idea", title: "Learned, Not Programmed", body: "No programmer writes out every one of those features by hand. The system develops useful internal patterns through training. Depth helps, but it is not magic. A deeper network is not automatically better at every task." },
      { tag: "Hot take", title: "Scale Made It Work", body: "Deep learning drove the major breakthroughs of the 2010s, including AlexNet's success at image recognition in 2012 and AlphaGo defeating the world Go champion in 2016. These results came not from a new fundamental idea but from applying existing ideas at much greater scale." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Deep" in deep learning means the neural network contains many layers of processing.`, answer: true, verdict: "Correct.", explanation: "What does \"deep\" mean in deep learning? — The neural network contains many layers of processing" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Early layers in a deep image-recognition network typically detect simple features like edges and lines.`, answer: true, verdict: "Correct.", explanation: "What might early layers in a deep image-recognition network detect? — Edges and lines" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A deep neural network's internal representations are written by hand by programmers.`, answer: false, verdict: "Correct.", explanation: "How does a deep neural network develop its internal representations? — The system develops them through training on data" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The major AI breakthroughs of the 2010s came from applying existing deep learning ideas at much larger scale.`, answer: true, verdict: "Correct.", explanation: "What drove the major AI breakthroughs of the 2010s? — Applying existing deep learning ideas at much larger scale" },
    ],
  },
  224: {
    id: 224, worldId: 202,
    title: "How Language Models Work",
    stops: [
      { tag: "Fact", title: "Transformers and Attention", body: "ChatGPT is based on a type of neural network called a transformer. Transformers became important after researchers introduced them in a 2017 paper titled \"Attention Is All You Need.\" One of the key ideas is attention. Attention helps the model determine which parts of a sentence or conversation matter most at a given moment." },
      { tag: "Example", title: "Context Across Words", body: "For example, consider the sentence: \"Maya dropped the glass on the floor because it was slippery.\" To understand what \"it\" refers to, the system has to use the surrounding words and context. Attention mechanisms allow the model to weigh different parts of the input against each other rather than processing words in strict sequence." },
      { tag: "Big idea", title: "Token by Token", body: "ChatGPT processes text as tokens. A token may be a full word, part of a word, punctuation, or even a single character. When ChatGPT responds, it generates one token at a time. At each step, it estimates what token should come next based on the conversation so far." },
      { tag: "Hot take", title: "Fluent but Fallible", body: "ChatGPT is not pulling a finished paragraph from a database. It is generating a response as it goes. That process involves a huge number of calculations and patterns learned during training — and it is why language models can be impressively fluent while still being confidently wrong." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `ChatGPT and similar language models are built on a neural network architecture called a transformer.`, answer: true, verdict: "Correct.", explanation: "What type of neural network architecture underlies ChatGPT and similar language models? — Transformer" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Attention" in transformers is a mechanism that allows the model to weigh the relevance of different parts of the input.`, answer: true, verdict: "Correct.", explanation: "What is \"attention\" in the context of transformers? — A mechanism that allows the model to weigh the relevance of different parts of the input" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A token is a chunk of text — a word, part of a word, or punctuation — that the model processes as a unit.`, answer: true, verdict: "Correct.", explanation: "What is a token? — A chunk of text — a word, part of a word, or punctuation — that the model processes as a unit" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Language models can be fluent yet confidently wrong because they generate statistically plausible text rather than verifying factual accuracy.`, answer: true, verdict: "Correct.", explanation: "Why can language models be fluent yet still confidently wrong? — They generate the most statistically plausible next token rather than verifying factual accuracy" },
    ],
  },
  225: {
    id: 225, worldId: 202,
    title: "Recommendation Algorithms",
    stops: [
      { tag: "Fact", title: "Predicting Your Attention", body: "When YouTube suggests a video, Spotify builds a playlist, or Instagram arranges your feed, a recommendation system is making predictions about what may keep your attention. These systems learn from your behavior: what you watch, what you skip, what you replay, what you search, what you like, how long you pause before scrolling." },
      { tag: "Example", title: "Collaborative Filtering", body: "They also compare your behavior with patterns from other users. One common method is called collaborative filtering. Suppose two people liked many of the same movies. If one of them watches another movie and enjoys it, the system may recommend that movie to the other person too." },
      { tag: "Big idea", title: "Engagement vs. Wellbeing", body: "Recommendation algorithms can be useful. They help people sort through more content than they could ever review on their own. But engagement is not the same as wellbeing. A video may hold your attention because it is funny, informative, upsetting, or infuriating. The system can measure your reaction without understanding whether the experience was good for you." },
      { tag: "Hot take", title: "Shaping, Not Just Reflecting", body: "Recommendation algorithms do not simply reflect your interests. They can also shape them. Over time, they can narrow what you see and influence what you come to believe is normal, important, or desirable." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Recommendation systems primarily track your engagement behavior — what you watch, skip, replay, search, and click.`, answer: true, verdict: "Correct.", explanation: "What do recommendation systems primarily track? — Your engagement behavior — what you watch, skip, replay, search, and click" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Collaborative filtering works by finding users with similar behavior and using their engagement to recommend content to you.`, answer: true, verdict: "Correct.", explanation: "What is collaborative filtering? — Finding users with similar behavior and using their engagement to recommend content to you" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Optimizing for "engagement" is a limited goal because content can be engaging because it is outrageous or upsetting rather than beneficial.`, answer: true, verdict: "Correct.", explanation: "Why is optimizing for \"engagement\" a limited goal for recommendation systems? — Content can be engaging because it is outrageous or upsetting rather than beneficial" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Recommendation algorithms only reflect your existing interests and cannot shape or change them over time.`, answer: false, verdict: "Correct.", explanation: "Beyond reflecting your interests, what else can recommendation algorithms do? — Actively shape your interests and narrow your view of the world over time" },
    ],
  },
  226: {
    id: 226, worldId: 202,
    title: "Computer Vision",
    stops: [
      { tag: "Fact", title: "Images as Numbers", body: "Computer vision is the field of AI focused on images and video. A digital image is made of pixels arranged in a grid. Each pixel is represented by numbers describing color and brightness. To a computer, an image begins as a large collection of numbers." },
      { tag: "Example", title: "How CNNs Work", body: "Many computer-vision systems use a type of neural network called a convolutional neural network, or CNN. A CNN scans small parts of an image and looks for visual patterns. Early layers may detect simple features such as edges or textures. Later layers may combine those signals into more complex shapes." },
      { tag: "Big idea", title: "Real-World Uses", body: "Computer vision can be used to: • Identify objects • Read text in images • Unlock a phone using a face scan • Analyze medical scans • Help robots navigate physical spaces In 2012, a deep-learning system called AlexNet performed extremely well in a major image-recognition competition called ImageNet. Its success helped drive much wider interest in deep learning." },
      { tag: "Hot take", title: "Recognition, Not Understanding", body: "Computer vision can be impressive. But identifying a cat in a photo is not the same as understanding what a cat is. These systems recognize patterns — they do not perceive, interpret, or comprehend in any meaningful sense." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `At the most basic level, a digital image is a grid of pixels, each represented by numbers for color and brightness.`, answer: true, verdict: "Correct.", explanation: "At the most basic level, what is a digital image to a computer? — A grid of pixels, each represented by numbers for color and brightness" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The most common neural network type used for computer vision is a Convolutional Neural Network (CNN).`, answer: true, verdict: "Correct.", explanation: "What type of neural network is most commonly used for computer vision? — Convolutional Neural Network (CNN)" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Analyzing medical scans for signs of disease is a real-world application of computer vision.`, answer: true, verdict: "Correct.", explanation: "What is one real-world application of computer vision? — Analyzing medical scans for signs of disease" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Computer vision systems truly "see" and understand images the way humans do.`, answer: false, verdict: "Correct.", explanation: "Why is it inaccurate to say computer vision systems truly \"see\"? — They recognize statistical patterns without any form of perception or comprehension" },
    ],
  },
  227: {
    id: 227, worldId: 202,
    title: "The Black Box Problem",
    stops: [
      { tag: "Fact", title: "Opaque Decisions", body: "Neural networks can be difficult to interpret. A traditional program often follows rules that a person can read — if this, then that. A neural network works differently. Its decisions are shaped by large numbers of weights spread across many layers. When a complex system produces an answer, there may not be one simple rule that explains why. This is sometimes called the black box problem." },
      { tag: "Example", title: "When It Really Matters", body: "The issue matters most when AI affects people's lives. If a system recommends a song, a mistake may be annoying but harmless. If a system influences a loan decision, flags someone as a security risk, or helps evaluate a medical scan, people may reasonably want to know how the decision was made." },
      { tag: "Big idea", title: "Explainable AI (XAI)", body: "Researchers are working on tools that make AI systems easier to interpret. This field is often called explainable AI, or XAI. Progress has been made, but the problem is not solved." },
      { tag: "Hot take", title: "Accuracy Is Not Enough", body: "In high-stakes settings, accuracy is not the only goal. People also need transparency, oversight, and a way to challenge mistakes. A system that is correct 95% of the time while being opaque about the other 5% is not sufficient when the consequences of error are serious." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The "black box problem" refers to when an AI system's decision-making process is opaque — inputs and outputs are visible but the reasoning is not.`, answer: true, verdict: "Correct.", explanation: "What is the \"black box problem\"? — When an AI system's decision-making process is opaque — inputs and outputs are visible but the reasoning is not" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The black box problem matters most when AI makes consequential decisions affecting people's lives, such as loans or medical assessments.`, answer: true, verdict: "Correct.", explanation: "In which type of situation does the black box problem matter most? — When AI makes consequential decisions affecting people's lives, such as loans or medical assessments" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Explainable AI (XAI) is research focused on making AI decision-making interpretable and understandable to humans.`, answer: true, verdict: "Correct.", explanation: "What is explainable AI (XAI)? — Research focused on making AI decision-making interpretable and understandable to humans" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `In high-stakes settings, an AI system that is highly accurate but opaque is sufficient as long as errors are rare.`, answer: false, verdict: "Correct.", explanation: "Why is a highly accurate but opaque AI system insufficient in high-stakes settings? — Even accurate systems need transparency and the ability to be challenged when errors occur" },
    ],
  },
  228: {
    id: 228, worldId: 202,
    title: "When Decisions Go Wrong",
    stops: [
      { tag: "Fact", title: "Biased Training Data", body: "AI systems make mistakes. The important question is what kind of mistakes they make and how many people may be affected. Biased training data: AI systems learn from examples. If the examples reflect past unfairness, the system may repeat those patterns. A hiring algorithm trained on past hiring decisions may learn to favor the same groups that were favored in the past. The model is not prejudiced in a human sense. It is copying patterns from biased data." },
      { tag: "Example", title: "Distribution Shift", body: "Distribution shift: A model may perform well in one setting and struggle in another. A system trained mostly on sunny roads may have trouble in heavy snow. A medical tool trained on one population may work less reliably for another." },
      { tag: "Big idea", title: "Overfitting", body: "Overfitting: A model can become too closely tuned to its training data. It may perform well on examples it has already seen but struggle with unfamiliar ones. Instead of learning a general pattern, it has learned something too specific." },
      { tag: "Hot take", title: "Errors at Scale", body: "Errors at scale: A person can make one bad decision. An automated system can repeat the same bad decision thousands or millions of times. Automation does not invent bad decisions. It can mass-produce them. That is why AI failures are not only technical problems. They can become social, legal, and ethical problems too." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Biased training data refers to training examples that reflect historical unfairness, causing the AI to reproduce those patterns.`, answer: true, verdict: "Correct.", explanation: "What is \"biased training data\"? — Training examples that reflect historical unfairness, causing the AI to reproduce those patterns" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Distribution shift occurs when real-world data differs from training data, causing the model to perform worse.`, answer: true, verdict: "Correct.", explanation: "What is distribution shift? — When real-world data differs from training data, causing the model to perform worse" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Overfitting happens when a model memorizes training data too precisely and fails to generalize to new examples.`, answer: true, verdict: "Correct.", explanation: "What is overfitting? — When a model memorizes training data too precisely and fails to generalize to new examples" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Errors at scale" is a concern with automated AI systems because an automated system can repeat the same flawed decision millions of times.`, answer: true, verdict: "Correct.", explanation: "Why is \"errors at scale\" a specific and serious concern with automated AI systems? — An automated system can repeat the same flawed decision millions of times" },
    ],
  },
}

export default wm_w2
