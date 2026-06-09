export interface HandbookEntry {
  id: string
  title: string
  body: string
  doLine: string
}

export const STARTER_ENTRIES: HandbookEntry[] = [
  {
    id: 'what-ai-is',
    title: 'What AI Actually Is',
    body: 'AI is software that learns patterns from huge amounts of examples instead of being given exact rules. When you hear "AI" today, it usually means a model: a system trained on a massive pile of text, images, or other data until it can produce useful answers. It is not alive, it does not "know" things the way you do, and it is not always right. It is a very good pattern-matcher.',
    doLine: 'When someone says "the AI," ask yourself: which one, trained on what, and how would I check if it\'s right?',
  },
  {
    id: 'prompting-basics',
    title: 'Talking to AI (Prompting Basics)',
    body: 'A vague question gets a vague answer. The single biggest thing that improves what you get back is context: say who it\'s for, how long you want it, and what format. "Explain photosynthesis" is weak. "Explain photosynthesis to a 9th grader in five sentences with one analogy" is strong. The first answer is always a draft. Push back: "shorter," "more concrete," "you missed X."',
    doLine: 'Before you hit enter, add the audience, the length, and one constraint.',
  },
  {
    id: 'verification-basics',
    title: 'How to Tell If It\'s Lying (Verification Basics)',
    body: 'AI can be confident and wrong at the same time, and that combination is the dangerous one. It can invent facts, fake quotes, and make up sources that look completely real. A confident tone is not evidence. Assume any specific fact, stat, quote, or citation could be made up until you check it somewhere that isn\'t the chatbot.',
    doLine: 'For anything that matters, confirm it with a second source that isn\'t the AI.',
  },
]

export const LOCKED_COUNT = 6
