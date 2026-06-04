import type { TimelinePuzzle } from '../components/TimelineGame'

const timelinePuzzle: TimelinePuzzle = {
  id: 'w1m1-timeline',
  anchorId: 'chatgpt',
  intro: "I may have knocked over 2,500 years of history. Help me put it back before anyone notices.",

  r1: {
    cards: [
      {
        id: 'aristotle',
        moment: 'Aristotle formalizes logic',
        year: '400 BC',
        yearValue: -400,
        era: 'Ancient',
        description: 'Can reasoning be mechanical?',
        explanation: "400 BC — before computers, before electricity, before Rome even existed. That's how old this question is. Aristotle was asking whether reasoning could be mechanical 2,500 years before anyone built a machine to try.",
      },
      {
        id: 'ada',
        moment: 'Ada Lovelace writes the first algorithm',
        year: '1843',
        yearValue: 1843,
        era: 'Victorian',
        description: "Code for a machine that didn't exist yet",
        explanation: "1843 — she was writing instructions for a machine that hadn't been built. Everyone else thought Babbage's engine was a calculator. Ada saw something else: a general-purpose computer. She was right about everything, a century too early.",
      },
      {
        id: 'turing',
        moment: 'Turing asks "Can machines think?"',
        year: '1950',
        yearValue: 1950,
        era: 'Early AI',
        description: 'Invents the imitation game',
        explanation: "1950 — Turing didn't answer whether machines can think. He asked whether the question even makes sense. His imitation game — now called the Turing Test — is still the frame most people use, even though ChatGPT passes versions of it and we still haven't answered it.",
      },
      {
        id: 'dartmouth',
        moment: 'Dartmouth names the field',
        year: '1956',
        yearValue: 1956,
        era: 'Early AI',
        description: '"Artificial Intelligence" is born',
        explanation: "1956 — a summer workshop at Dartmouth. John McCarthy coined the name Artificial Intelligence. The researchers thought they'd basically crack it in one summer. They didn't. But the field got a name, and that name stuck.",
      },
      {
        id: 'winters',
        moment: 'The AI Winters',
        year: '1970s–80s',
        yearValue: 1970,
        era: 'Dark Ages',
        description: 'Funding collapses, the field nearly dies',
        explanation: "1970s and 80s — twice, the money ran out completely. Governments and labs that had poured funding into AI watched it underdeliver and pulled back entirely. The field nearly collapsed. Knowing this is what separates people who think clearly about AI from people who believe every headline.",
      },
      {
        id: 'deepblue',
        moment: 'Deep Blue beats Kasparov',
        year: '1997',
        yearValue: 1997,
        era: 'Modern AI',
        description: 'A very fast calculator, not a mind',
        explanation: "1997 — Deep Blue beat the world chess champion. The headlines called it proof machines can think. It wasn't. Deep Blue couldn't play checkers, hold a conversation, or understand what chess even was. It was a very fast calculator with one extremely specific purpose.",
      },
      {
        id: 'alexnet',
        moment: 'AlexNet changes everything',
        year: '2012',
        yearValue: 2012,
        era: 'Deep Learning',
        description: 'Deep learning takes over — most people missed it',
        explanation: "2012 — this is the one that actually mattered. AlexNet won an image recognition competition by such a large margin that the entire field switched approaches almost overnight. Every tool you use today traces back to this year. Most people have never heard of it because ChatGPT is what they noticed instead.",
      },
      {
        id: 'chatgpt',
        moment: 'ChatGPT launches',
        year: '2022',
        yearValue: 2022,
        era: 'Now',
        description: "You're living in it",
        explanation: "2022 — the moment most people think was the breakthrough. It wasn't the first. It was the one that made AI impossible to ignore. But the real shift had already happened in 2012. ChatGPT is a product of that moment, not the moment itself.",
      },
    ],
    feedback: {
      perfect: "Flawless. History restored. You basically just time-traveled.",
      close:   "Almost — one or two got swapped. But you know your history.",
      off:     "Good effort. A few things got shuffled. Check what's on the timeline.",
    },
  },

  r2: {
    intro: "Now the part most adults get wrong.",
    cards: [
      {
        id: 'h1', type: 'hype',
        text: '"We\'ll basically solve AI this summer" — Dartmouth, 1956',
        explanation: 'This is hype. The Dartmouth researchers genuinely believed they could crack AI in one summer. It\'s been 70+ years. They were wrong — not because they were naive, but because nobody knew how hard the problem actually was.',
      },
      {
        id: 'r1', type: 'reality',
        text: "It's been 70+ years and it still isn't solved",
        explanation: 'This is reality. General AI — a system that can do anything a human can do — does not exist. Every AI system you\'ve ever used is narrow. The field named itself in 1956 and the core problem is still open.',
      },
      {
        id: 'h2', type: 'hype',
        text: '"Deep Blue proves machines can think" — 1997',
        explanation: 'This is hype. Deep Blue beat the best chess player alive and the world called it thinking. It wasn\'t. Deep Blue couldn\'t play checkers, recognize a face, or understand what chess even was. It was an extremely fast, extremely specific calculator.',
      },
      {
        id: 'r2', type: 'reality',
        text: "Deep Blue couldn't play checkers or understand a single word",
        explanation: 'This is reality — literally true. Deep Blue was narrow AI at its most narrow. Superhuman at one specific task, completely useless at everything else. Beating a human at chess is not the same as thinking.',
      },
      {
        id: 'h3', type: 'hype',
        text: '"ChatGPT was the big breakthrough" — 2022',
        explanation: 'This is hype — and the most important one to get right. ChatGPT was the moment most people noticed AI. But the actual breakthrough was AlexNet in 2012, when deep learning took over the entire field. ChatGPT is a product of that moment, not the moment itself.',
      },
      {
        id: 'r3', type: 'reality',
        text: 'The real shift was AlexNet in 2012 — most people missed it',
        explanation: 'This is reality. AlexNet won an image recognition competition in 2012 by such a large margin that the entire field switched approaches almost overnight. Every tool you use today traces back to that year. ChatGPT, DALL-E, Gemini — all of it. Most people have never heard of AlexNet.',
      },
    ],
    completion: "You just sorted the hype from what actually happened. That's the whole skill. Most people never learn it.",
  },
}

export default timelinePuzzle
