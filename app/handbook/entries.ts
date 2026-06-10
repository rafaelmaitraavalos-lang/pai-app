export interface HandbookEntry {
  id: string
  title: string
  body: string
  doLine: string
  unlocksAt?: number  // lesson ID that must be completed to unlock
}

export const STARTER_ENTRIES: HandbookEntry[] = [
  {
    id: 'what-ai-is',
    title: 'What AI Actually Is',
    body: 'AI stands for artificial intelligence. It is "artificial" because humans create it, and it is called "intelligence" because it can do things that once required a human mind. But much of what AI does is not really "thinking" in the way humans think. It is extremely advanced pattern-matching.\n\nWhen someone says, "the AI said," ask which AI they mean. ChatGPT, Claude, and Gemini are different tools. They can give different answers to the same question, just as Google and Wikipedia are not interchangeable.',
    doLine: 'When someone says "the AI said," ask which AI they mean.',
  },
  {
    id: 'prompting-basics',
    title: 'When Talking to AI',
    body: 'Do not just type, "Explain photosynthesis." That will usually give you a generic wall of text. Instead, include three things: who the answer is for, how long it should be, and one extra instruction.\n\nFor example, type: "Explain photosynthesis to a 9th grader in five sentences, using one analogy."\n\nYou do not need to write the perfect prompt on your first try. Treat it like a conversation. If the answer is not quite right, keep giving directions: "Make it shorter," "Give me a real-life example," or "Say it like you are talking to a friend."',
    doLine: 'Try typing: "Rewrite that in three sentences a 7th grader would understand."',
  },
  {
    id: 'verification-basics',
    title: 'How to Tell If AI Is Making Things Up',
    body: 'AI can give wrong answers in a confident voice, and that is the trap. When it gives you a fact, number, quote, or source, do not assume it is accurate. Check it.\n\nCopy the claim, paste it into a search engine, and see whether a reliable source backs it up. If the AI gives you a quote, search the exact words with quotation marks around them. If you cannot find the quote or fact anywhere outside the chatbot, treat it as unreliable.',
    doLine: 'Try typing: "Give me links to your sources so I can check them." Then actually open the links.',
  },
  {
    id: 'academic-integrity',
    title: 'Using AI for School Without Cheating',
    body: 'A good test is simple: could you explain the work out loud if your teacher asked? If the answer is yes, AI probably helped you learn. If the answer is no, AI probably did the work for you.\n\nUse AI like a tutor, not a ghostwriter. Good prompts include: "Quiz me on this chapter," "Explain this problem step by step," and "What is unclear about my paragraph?" A bad prompt is: "Write my essay."\n\nUnderstanding the answer is important, but it is not the only rule. Every class has different policies, so ask your teacher what is allowed before you assume.',
    doLine: 'Try typing: "Ask me five questions about [X], then tell me which ones I got wrong and explain why."',
  },
]

export const UNLOCKABLE_ENTRIES: HandbookEntry[] = [
  {
    id: 'choosing-the-right-tool',
    title: 'Choosing the Right Tool',
    unlocksAt: 4,  // World 1, Module 4
    body: 'There is no single "best" AI. Different tools are useful for different jobs.\n\nUse Claude when you are working with a long reading or revising a piece of writing. Use Perplexity when you are starting research or checking a claim, because it shows clickable sources alongside its answers. Use Gemini when your schoolwork is already in Google Docs or other Google apps. Use ChatGPT when you want a strong all-purpose tool for explaining, brainstorming, or studying. Use Meta AI when you want a free, easy-to-access option for simple questions.\n\nThis list will change. AI tools improve quickly, so check again at the start of each school year.\n\nWhen an answer really matters, ask more than one tool and compare what they say. If they disagree, you have found something that needs to be checked. Even if they agree, verify important facts using a reliable source.\n\nYou probably do not need to pay for an AI subscription yet. Free versions are already useful for most student tasks.',
    doLine: 'Choose the tool that fits the task. Keep two that you trust, compare their answers when something matters, and verify important claims yourself.',
  },
  {
    id: 'prompting-leveled-up',
    title: 'Prompting, Leveled Up',
    unlocksAt: 5,  // World 1, Module 5
    body: 'A vague prompt gets a vague answer. Here are three ways to get something better.\n\nFirst, give it a role: "Act as a debate coach and poke holes in my argument."\n\nSecond, give it an example: paste a paragraph you like and ask it to match the tone or structure.\n\nThird, tell it exactly what you want back: "Give me a checklist," "put this in a table," or "make a plan before you start writing."',
    doLine: 'Try typing: "Act as a debate coach. Make a step-by-step plan for improving my argument, then point out its three biggest weaknesses."',
  },
  {
    id: 'catch-the-hallucination',
    title: 'Catch the Hallucination',
    unlocksAt: 6,  // World 1, Module 6
    body: 'The riskiest thing an AI can give you is a quote, because fake quotes often look completely believable. Before you use one, copy it into a search engine with quotation marks around it. Make sure the quote is real, word-for-word accurate, and actually said by the person the AI named.\n\nDo the same thing with sources. A convincing title means nothing until you find the real article, page, or document and open it yourself.\n\nThe higher the stakes, the more carefully you check. Anything about health, money, or the law should be verified every single time. When you need reliable sources, use the research tool from Choosing the Right Tool.',
    doLine: 'Try typing: "Where exactly did this come from? Give me a link I can open."',
  },
  {
    id: 'make-it-show-its-work',
    title: 'Make It Show Its Work',
    unlocksAt: 11,  // World 2, Module 4
    body: 'When an answer matters, do not accept the first response immediately. Ask the AI to break the answer into steps, explain its assumptions, and show where its information came from. That makes mistakes easier to catch.\n\nAsk: "How confident are you, and what could change your answer?" An honest "I am not sure" is a good answer. For a more balanced take, try: "Explain the strongest argument on each side before you conclude."\n\nBe especially careful with numbers. Ask the AI to use a calculator, show the calculation, or check the math yourself.',
    doLine: 'Try typing: "Solve this step by step. Show each calculation, explain any assumptions, and tell me how confident you are."',
  },
  {
    id: 'making-things-with-ai',
    title: 'Making Things With AI',
    unlocksAt: 13,  // World 2, Module 6
    body: 'Use the right tool for the job: an image tool for images, a coding tool for code, and a writing tool for writing.\n\nFor images, vague prompts usually give generic results. Add details about the subject, style, setting, mood, and lighting. "A watercolor fox in a snowy forest at dusk, with soft light" works much better than "a fox."\n\nFor code, ask the AI to explain what each part does and how to test it. That way, you can understand the result, catch problems, and fix it later.\n\nDo not use AI to make a realistic fake of someone\'s face or voice without their permission.\n\nAnd remember: looking finished is not the same as being finished. Check the image, test the code, and review the result before you share it.',
    doLine: 'Try typing: "Make an image of [subject], in [style], with [setting], [mood], and [lighting]."',
  },
  {
    id: 'privacy-and-safety',
    title: 'Privacy and Safety',
    unlocksAt: 18,  // World 3, Module 3
    body: 'Treat a chatbot like a room that might be recorded. Never paste in passwords, your address, ID numbers, or other people\'s private info.\n\nYou may also decide to do this if available: open Settings in your main tool, turn off "train on my data" or "improve the model," and use a temporary chat when you want something not saved.\n\nDeleting a chat doesn\'t always wipe it on their end.',
    doLine: 'The real rule is simple: don\'t type anything you\'d panic about if it leaked.',
  },
  {
    id: 'build-good-ai-habits',
    title: 'Build Good AI Habits',
    unlocksAt: 39,  // World 5, Module 8
    body: 'Here\'s the whole handbook in one routine you can use every time you open a chatbot.\n\nPick the right tool for the job. Tell it who the answer\'s for and what format you want. Check anything important against a second source. Use it to learn the thing, not to skip learning it. Keep your private stuff out. And make the final call yourself.',
    doLine: 'Do those automatically, and you\'re using AI better than most adults.',
  },
]

// Total locked slots shown in the handbook index before entries are unlocked
export const LOCKED_COUNT = UNLOCKABLE_ENTRIES.length
