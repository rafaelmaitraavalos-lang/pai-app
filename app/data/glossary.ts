export type GlossaryEntry = {
  label: string  // shown as the underlined inline word / phrase
  def:   string  // full definition shown in the popover
}

export const glossary: Record<string, GlossaryEntry> = {
  aristotle: {
    label: 'Aristotle',
    def:   'Aristotle — an ancient Greek philosopher (384–322 BC). He was the first to try to write down the rules of logical reasoning itself.',
  },
  logic: {
    label: 'logic',
    def:   'Logic — the study of correct reasoning. The idea that you can follow a set of rules step by step and reliably reach a true conclusion.',
  },
  adaLovelace: {
    label: 'Ada Lovelace',
    def:   'Ada Lovelace — a 19th-century English mathematician. She wrote what\'s now considered the first computer algorithm, for a machine that was never even built.',
  },
  algorithm: {
    label: 'algorithm',
    def:   'Algorithm — a step-by-step set of instructions for solving a problem or completing a task. A recipe is an algorithm.',
  },
  analyticalEngine: {
    label: 'Analytical Engine',
    def:   'Analytical Engine — a mechanical general-purpose computer designed by Charles Babbage in the 1830s. It was never finished, but its design was a real computer, a century early.',
  },
  turing: {
    label: 'Alan Turing',
    def:   'Alan Turing — a British mathematician (1912–1954), often called the father of computer science. He helped crack Nazi codes in WWII and laid the foundations for modern computing.',
  },
  turingTest: {
    label: 'Turing Test',
    def:   'The Turing Test — a test for machine intelligence. A person types questions to two hidden players, one human and one machine. If they can\'t tell which is which, the machine passes.',
  },
  mccarthy: {
    label: 'John McCarthy',
    def:   'John McCarthy — an American computer scientist. In 1956 he coined the term "artificial intelligence" and helped found the field.',
  },
  dartmouth: {
    label: 'The Dartmouth Workshop',
    def:   'The Dartmouth Workshop — a summer gathering of scientists at Dartmouth College in 1956, widely considered the birthplace of AI as a field.',
  },
  aiWinter: {
    label: 'AI winter',
    def:   'AI winter — a period when funding and interest in AI collapsed because the technology failed to live up to its hype. It happened more than once.',
  },
  kasparov: {
    label: 'Garry Kasparov',
    def:   'Garry Kasparov — a Soviet-born chess grandmaster, widely considered one of the greatest players ever. In 1997 he was the reigning world champion.',
  },
  deepBlue: {
    label: 'Deep Blue',
    def:   'Deep Blue — a room-sized IBM supercomputer built only to play chess. It could check 200 million positions a second, and do nothing else.',
  },
  imagenet: {
    label: 'ImageNet',
    def:   'ImageNet — a yearly competition to see whose software could best identify what\'s in a photograph.',
  },
  alexnet: {
    label: 'AlexNet',
    def:   'AlexNet — the system that won ImageNet in 2012 by a huge margin and kicked off the modern deep learning era.',
  },
  deepLearning: {
    label: 'deep learning',
    def:   'Deep learning — an approach where, instead of programming rules by hand, you let a system learn patterns from huge numbers of examples.',
  },
  chatgpt: {
    label: 'ChatGPT',
    def:   'ChatGPT — an AI chatbot launched by OpenAI in late 2022. It reached 100 million users in two months and brought AI into everyday use.',
  },
  bias: {
    label: 'bias',
    def:   'Bias — when an AI system produces results that systematically favor or penalize certain groups or outcomes, usually because the training data reflected existing human prejudices.',
  },
  neuralNetwork: {
    label: 'neural network',
    def:   'Neural network — a mathematical system loosely inspired by the brain. Organized in layers of connected nodes, each doing simple math. Billions of these simple operations working together produce behavior that emerges from the structure of the connections.',
  },
  transformer: {
    label: 'transformer',
    def:   'Transformer — an AI architecture introduced in 2017. Its key innovation is attention: every word in a sequence can directly influence every other word. GPT, Claude, and Gemini are all built on this architecture.',
  },
  supervisedLearning: {
    label: 'supervised learning',
    def:   'Supervised learning — training an AI by showing it labeled examples with correct answers. The model adjusts itself until it gets the labels right, then applies what it learned to new inputs.',
  },
  reinforcementLearning: {
    label: 'reinforcement learning',
    def:   'Reinforcement learning — training an AI through trial and error. The model gets rewards for good actions and penalties for bad ones, gradually learning strategies no human programmed.',
  },
}
