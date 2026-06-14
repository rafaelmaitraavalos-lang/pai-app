import LessonTemplate, { Stop, Question } from '../../components/LessonTemplate'

export const STOPS: Stop[] = [
  {
    tag: "Myth bust",
    title: "It Wasn't Programmed Step by Step",
    body: "When a neural network learns to recognize an image, a programmer does not write a separate rule for every feature it might encounter. Nobody has to list every possible shape of an ear, angle of a face, or shade of fur. Instead, the network learns from examples. During training, it repeatedly makes predictions, measures how far those predictions are from the desired result, and adjusts its weights. This is one of the main differences between traditional software and machine learning: the programmer designs the learning process, but the network develops many of its own internal patterns.",
  },
  {
    tag: "Example",
    title: "The Forward Pass",
    body: "Suppose you show a network a photo of a cat. The image enters the first layer as numbers representing its pixels. Each layer processes the information and passes a transformed version to the next layer. Eventually, the network produces an output: perhaps a set of probabilities for different labels. Early in training, its guess may be far off. It might assign a higher probability to \"truck\" than to \"cat.\" This movement of information from the input to the output is called a forward pass.",
  },
  {
    tag: "Example",
    title: "Measuring the Error",
    body: "After the forward pass, the network needs a way to measure how inaccurate its prediction was. A mathematical function called a loss function compares the network's output to the desired result. If the correct label was \"cat\" and the network strongly predicted \"truck,\" the loss will be relatively high. If the network predicted \"cat\" with high confidence, the loss will be lower. The goal of training is to reduce this loss over time.",
  },
  {
    tag: "Example",
    title: "Backpropagation",
    body: "Once the loss has been calculated, the network needs to determine which weights contributed to the error and how they should change. Backpropagation works backward through the network to calculate how much each weight affected the final result. An optimization algorithm then uses that information to adjust the weights slightly. Each individual adjustment is usually small. But after many rounds of training, those changes can add up to a major improvement in performance.",
  },
  {
    tag: "Fact",
    title: "Training Takes Repetition",
    body: "One forward pass and one update will not teach a network very much. The process has to repeat across many examples. Training is often organized into batches, which are smaller groups of examples processed together. A network may also go through the training dataset multiple times. Each complete pass through the dataset is called an epoch. For large models, this process can require substantial computing power, time, and electricity. The resources needed vary widely depending on the size of the network and the way it is trained.",
  },
  {
    tag: "Myth bust",
    title: "Good Training Is Not Memorization",
    body: "A network can perform very well on its training data and still struggle with unfamiliar examples. This is called overfitting. It happens when a model learns patterns that are too specific to the training set rather than patterns that generalize well to new situations. Developers evaluate a network on separate data that it did not train on. If performance is strong on the training examples but much weaker on new ones, the model may be overfitting. Preventing this can involve several strategies, including changing the data, adjusting the model, or modifying the training process.",
  },
  {
    tag: "Scenario",
    title: "What the Network Learns",
    body: "After many training cycles, the weights in a network may settle into a configuration that helps it distinguish cats from trucks with reasonable accuracy. The result is not usually a simple list of rules that a person can read. A single weight does not necessarily correspond to a recognizable idea such as \"pointy ear\" or \"wheel.\" The network's learned patterns are often distributed across many weights and layers. This is one reason neural networks can be effective while still being difficult to interpret.",
  },
  {
    tag: "Big idea",
    title: "Different Ways to Learn from Data",
    body: "Some networks are trained with labeled examples: \"cat,\" \"spam,\" or \"not spam.\" This is supervised learning, and producing high-quality labels can require significant human effort. But labeled data is not always necessary. Networks can also learn from unlabeled data or from tasks created using the data itself. For example, a language model can learn by predicting missing or upcoming tokens in text. Understanding how a system was trained helps explain both what it can do and where its limitations may appear.",
  },
]

export const QUESTIONS: Question[] = [
  {
    difficulty: "Easy",
    tag: "Myth bust",
    stopTitle: '',
    question: `Neural networks are programmed with a separate rule for every decision they make.`,
    answer: false,
    verdict: "Correct.",
    explanation: "A programmer designs the structure and training process, but the network learns many of its internal patterns from data. It does not receive a complete list of rules for every possible input.",
  },
  {
    difficulty: "Easy",
    tag: "Example",
    stopTitle: '',
    question: `A forward pass is the process of moving input through the network to produce an output.`,
    answer: true,
    verdict: "Correct.",
    explanation: "During a forward pass, information travels through the network's layers. The network then produces a prediction, such as a set of probabilities for different labels.",
  },
  {
    difficulty: "Easy",
    tag: "Fact",
    stopTitle: '',
    question: `A loss function measures how far a network's prediction is from the desired result.`,
    answer: true,
    verdict: "Correct.",
    explanation: "The loss function gives the network a way to measure error. A lower loss generally means the prediction is closer to the intended result.",
  },
  {
    difficulty: "Medium",
    tag: "Example",
    stopTitle: '',
    question: `Backpropagation helps calculate how changes to the weights could reduce the loss.`,
    answer: true,
    verdict: "Correct.",
    explanation: "Backpropagation works backward through the network to determine how much different weights contributed to the result. An optimization algorithm then uses that information to update the weights.",
  },
  {
    difficulty: "Medium",
    tag: "Fact",
    stopTitle: '',
    question: `A network usually needs to train across many examples and many rounds of updates.`,
    answer: true,
    verdict: "Correct.",
    explanation: "One update changes the network only slightly. Training becomes effective through repetition across many examples, often organized into batches and repeated over multiple epochs.",
  },
  {
    difficulty: "Medium",
    tag: "Myth bust",
    stopTitle: '',
    question: `If a network performs extremely well on its training data, it will automatically perform well on new data.`,
    answer: false,
    verdict: "Correct.",
    explanation: "A network can memorize patterns that are too specific to its training set. This is called overfitting. Developers test models on separate data to see whether they generalize effectively.",
  },
  {
    difficulty: "Hard",
    tag: "Scenario",
    stopTitle: '',
    question: `Experts can usually identify one individual weight responsible for a complex concept such as recognizing a cat.`,
    answer: false,
    verdict: "Correct.",
    explanation: "A network's learned patterns are often distributed across many weights and layers. This makes it difficult to trace a complex ability back to one specific value.",
  },
  {
    difficulty: "Hard",
    tag: "Big idea",
    stopTitle: '',
    question: `Every neural network must be trained using data that humans labeled one example at a time.`,
    answer: false,
    verdict: "Correct.",
    explanation: "Supervised learning uses labeled examples, and those labels can require human labor. However, networks can also learn from unlabeled data or from training tasks generated from the data itself.",
  },
]

export default function Lesson9() {
  return <LessonTemplate id={9} title="How Networks Train" stops={STOPS} questions={QUESTIONS} completionPage="/games/weight-room" />
}
