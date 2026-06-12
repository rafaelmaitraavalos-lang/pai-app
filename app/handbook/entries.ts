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

// ── Elementary versions (ages 6–12) ──────────────────────────────────────────

export const ELEMENTARY_STARTER_ENTRIES: HandbookEntry[] = [
  {
    id: 'what-ai-is',
    title: 'What AI Actually Is',
    body: 'AI stands for Artificial Intelligence. It is a computer program that learned by reading millions of books, websites, and stories. It can answer questions, write sentences, and have a conversation — but it is not alive. It is a very smart program.\n\nChatGPT, Claude, and Gemini are all different AI tools, just like how YouTube and TikTok are both video apps but not the same thing.',
    doLine: 'When someone says "the AI," ask which one they mean.',
  },
  {
    id: 'prompting-basics',
    title: 'When Talking to AI',
    body: 'The better you explain what you want, the better the answer you get. Instead of "explain dinosaurs," try "explain why dinosaurs went extinct in 3 sentences for a 4th grader."\n\nTell it who the answer is for, how long it should be, and anything extra you want. If the first answer is not quite right, keep talking to it. Say "make it shorter" or "use simpler words."',
    doLine: 'Try: "Explain [topic] in 3 sentences for a [grade] grader."',
  },
  {
    id: 'verification-basics',
    title: 'How to Tell If AI Is Making Things Up',
    body: 'AI can say wrong things in a very confident voice — that is the tricky part. If the AI tells you a fact, a number, or a quote, do not just believe it.\n\nAsk a parent, teacher, or check a trusted website. The AI is not always right — it just sounds like it is.',
    doLine: 'Ask a grown-up or check a trusted website before trusting important facts.',
  },
  {
    id: 'academic-integrity',
    title: 'Using AI for School Without Cheating',
    body: 'Here is a simple test: if your teacher asked you to explain your homework out loud, could you do it? If yes, you probably learned something. If no, AI might have done the work for you.\n\nUse AI like a study buddy — it can quiz you, explain things in new ways, and help you understand. But YOU should do the actual thinking.',
    doLine: 'Try: "Quiz me on [topic] and tell me which answers I got wrong."',
  },
]

export const ELEMENTARY_UNLOCKABLE_ENTRIES: HandbookEntry[] = [
  {
    id: 'choosing-the-right-tool',
    title: 'Choosing the Right Tool',
    unlocksAt: 4,
    body: 'Different AI tools are like different apps — they do similar things but are not exactly the same. ChatGPT and Claude are great for writing and explaining things. Perplexity is good for looking things up and shows where it got its information.\n\nYou do not need to pay for any of them — the free versions work well. When something is really important, try two different tools and compare their answers.',
    doLine: 'Use the free version first. If two tools give different answers, double-check.',
  },
  {
    id: 'prompting-leveled-up',
    title: 'Prompting, Leveled Up',
    unlocksAt: 5,
    body: 'Adding more details makes AI answers way better. Try three things:\n\n1. Give it a role — "Act like a teacher and explain this to me."\n2. Show it an example — paste something you like and say "write mine like this."\n3. Tell it the format — "make a list," "give me 5 bullet points," or "write it like a short story."',
    doLine: 'Try: "Act as a [role] and explain [topic] using [format]."',
  },
  {
    id: 'catch-the-hallucination',
    title: 'Catch the Hallucination',
    unlocksAt: 6,
    body: 'Sometimes AI makes up quotes and facts that sound completely real — but are not. This is called a "hallucination."\n\nBefore you use a quote in a project, search the exact words on Google. If you cannot find it on a real website, do not use it. The same goes for book titles and author names — always check.',
    doLine: 'Google any quote the AI gives you before using it.',
  },
  {
    id: 'make-it-show-its-work',
    title: 'Make It Show Its Work',
    unlocksAt: 11,
    body: 'When you need to trust the answer, ask the AI to explain it step by step. That way you can follow along and catch mistakes.\n\nYou can also ask "how sure are you about this?" A good AI will say "I am not totally sure" when it is not. Never trust AI math without checking — ask it to write out each step.',
    doLine: 'Try: "Explain this step by step so I can follow along."',
  },
  {
    id: 'making-things-with-ai',
    title: 'Making Things With AI',
    unlocksAt: 13,
    body: 'AI can help make pictures, stories, poems, and more. The key is being specific. "A cartoon robot playing soccer in the rain" works way better than "a robot."\n\nFor stories, say who the characters are, what happens, and how you want it to end. Always check what AI makes before sharing — it does not always get things right.',
    doLine: 'Be specific! The more details you give, the better the result.',
  },
  {
    id: 'privacy-and-safety',
    title: 'Privacy and Safety',
    unlocksAt: 18,
    body: 'Treat a chatbot like a stranger — do not tell it your full name, home address, school name, phone number, or passwords.\n\nEven if the chatbot seems friendly, you do not know where your information goes. Keep private stuff private. If something feels wrong when talking to AI, stop and tell a parent or teacher.',
    doLine: 'Never type your address, school, or phone number into a chatbot.',
  },
  {
    id: 'build-good-ai-habits',
    title: 'Build Good AI Habits',
    unlocksAt: 39,
    body: 'Here is a simple checklist for every time you open a chatbot:\n\nPick the right tool for what you need. Tell it who the answer is for and how you want it. Check important facts with a second source. Use it to help you learn — not to skip learning. Keep your personal information private. And always make the final decision yourself.',
    doLine: 'Follow the checklist every time and you will use AI better than most adults.',
  },
]

// ── Middle school versions (ages 11–14) ──────────────────────────────────────

export const MIDDLE_STARTER_ENTRIES: HandbookEntry[] = [
  {
    id: 'what-ai-is',
    title: 'What AI Actually Is',
    body: 'AI stands for artificial intelligence. It is called "artificial" because humans built it, and "intelligent" because it can do things that used to need a human mind — writing, translating, or answering questions. But most of what AI does is really advanced pattern-matching, not actual thinking.\n\nChatGPT, Claude, and Gemini are different AI tools. They can give different answers to the same question. When someone says "the AI said," it is worth asking which one they mean.',
    doLine: 'When someone says "the AI said," ask which AI they mean.',
  },
  {
    id: 'prompting-basics',
    title: 'When Talking to AI',
    body: 'A vague prompt gets a vague answer. Instead of "explain climate change," try "explain climate change to a 7th grader in 4 sentences with one example."\n\nThree things that always help: say who the answer is for, say how long you want it, and add one specific instruction. If the first response is not right, keep going — say "make it shorter," "give me an example," or "use simpler words." Treat it like a conversation, not a search engine.',
    doLine: 'Try: "Explain [topic] to a [grade] grader in [length] with one example."',
  },
  {
    id: 'verification-basics',
    title: 'How to Tell If AI Is Making Things Up',
    body: 'AI can give wrong answers in a very confident voice — that is the main danger. When it gives you a fact, a quote, or a source, do not just trust it.\n\nCopy the claim and search for it. If you cannot find it anywhere reliable, treat it as unreliable. AI-generated quotes are especially risky because fake quotes often sound completely real. Always verify before using anything important.',
    doLine: 'Search any fact or quote AI gives you before using it in your work.',
  },
  {
    id: 'academic-integrity',
    title: 'Using AI for School Without Cheating',
    body: 'One simple test: if your teacher called on you to explain your work out loud, could you do it? If yes, AI probably helped you learn. If no, AI probably did the work for you.\n\nGood ways to use AI: "Quiz me on this chapter," "Explain this in a different way," "What is wrong with my paragraph?" Bad way: "Write my essay." Also check your school\'s rules — every class is different.',
    doLine: 'Only turn in work you could explain out loud if asked.',
  },
]

export const MIDDLE_UNLOCKABLE_ENTRIES: HandbookEntry[] = [
  {
    id: 'choosing-the-right-tool',
    title: 'Choosing the Right Tool',
    unlocksAt: 4,
    body: 'There is no single "best" AI — different tools work better for different tasks. Claude is strong for writing and long texts. Perplexity is great for research because it shows clickable sources. Gemini works well with Google apps. ChatGPT is a solid all-purpose tool.\n\nFree versions are good enough for most schoolwork — you do not need to pay. When the answer really matters, ask two tools and compare. If they disagree, that is your cue to verify the claim yourself.',
    doLine: 'Pick the tool that fits the task. Compare answers when something is important.',
  },
  {
    id: 'prompting-leveled-up',
    title: 'Prompting, Leveled Up',
    unlocksAt: 5,
    body: 'Three easy upgrades for better answers:\n\n1. Give it a role — "Act as a history teacher and explain the causes of WWI."\n2. Show an example — paste a paragraph you like and say "write mine in this style."\n3. Ask for the format you want — "make a bullet list," "put it in a table," or "give me a numbered plan."\n\nFor big tasks, ask the AI to plan first so you can fix the plan before it writes everything.',
    doLine: 'Try: "Act as [role], explain [topic] in [format]."',
  },
  {
    id: 'catch-the-hallucination',
    title: 'Catch the Hallucination',
    unlocksAt: 6,
    body: 'The most dangerous thing AI can give you is a fake quote — because they look completely real. Before using any quote in your work, search the exact words on Google. Confirm it is real, word-for-word, and from the person named.\n\nDo the same with sources. A title that sounds real means nothing until you open the actual article. The higher the stakes, the more carefully you check.',
    doLine: 'Google every quote with quotation marks before you use it.',
  },
  {
    id: 'make-it-show-its-work',
    title: 'Make It Show Its Work',
    unlocksAt: 11,
    body: 'When an answer matters, do not just accept it. Ask the AI to walk through its reasoning step by step — that makes mistakes much easier to catch.\n\nYou can also ask "how confident are you?" or "what could make you wrong?" An honest "I am not sure" is a good sign. For math, always ask it to show each step, or just check the numbers yourself.',
    doLine: 'Try: "Explain your reasoning step by step, and tell me how confident you are."',
  },
  {
    id: 'making-things-with-ai',
    title: 'Making Things With AI',
    unlocksAt: 13,
    body: 'Use the right tool for what you are making — an image tool for images, a writing tool for writing, a code tool for code.\n\nFor images, details matter: "a watercolor fox in a snowy forest at dusk with soft light" gives a much better result than "a fox." For code, ask it to explain every part so you can understand and fix it later. Always review what AI makes before sharing — looking finished is not the same as being correct.',
    doLine: 'Be specific, then review the result before sharing.',
  },
  {
    id: 'privacy-and-safety',
    title: 'Privacy and Safety',
    unlocksAt: 18,
    body: 'Treat a chatbot like a conversation that might be recorded. Never type your passwords, home address, ID numbers, or other people\'s private information.\n\nIf available, go into Settings and turn off "train on my data." Use a temporary chat when you want something not saved. Deleting a chat does not always erase it on the company\'s side. The simple rule: do not type anything you would be upset about if someone saw it.',
    doLine: 'Check your settings, and never type anything you would regret sharing.',
  },
  {
    id: 'build-good-ai-habits',
    title: 'Build Good AI Habits',
    unlocksAt: 39,
    body: 'Here is the whole handbook as one routine for every time you open a chatbot:\n\nPick the right tool. Tell it who the answer is for and what format you want. Verify anything important with a second source. Use it to learn, not to skip learning. Keep your personal info out of it. Make the final decision yourself.\n\nDo those automatically and you are using AI better than most adults.',
    doLine: 'Run through the checklist every time you open a chatbot.',
  },
]

// ── PT-BR versions ────────────────────────────────────────────────────────────

export const STARTER_ENTRIES_PT: HandbookEntry[] = [
  {
    id: 'what-ai-is',
    title: 'O que a IA realmente é',
    body: 'IA significa Inteligência Artificial: "artificial" porque foi construída por pessoas, "inteligência" porque faz coisas que antes exigiam uma mente humana, embora grande parte disso seja, na verdade, apenas um excelente reconhecimento de padrões.\n\nQuando alguém disser "a IA disse", pare e pergunte qual delas. ChatGPT, Claude e Gemini são ferramentas diferentes que fornecem respostas diferentes, da mesma forma que o Google e a Wikipedia não são a mesma coisa.',
    doLine: 'Quando ouvir "a IA", pergunte "qual delas?".',
  },
  {
    id: 'prompting-basics',
    title: 'Conversando com a IA',
    body: 'Não digite "explique a fotossíntese". Isso gera uma parede de texto genérica. Em vez disso, informe três coisas: para quem é, qual o tamanho e qualquer detalhe extra.\n\nDigite: "Explique a fotossíntese para um aluno do 9º ano em 5 frases, com uma analogia". Se a resposta ainda não estiver boa, continue corrigindo: "mais curto", "dê-me um exemplo real" ou "fale como se estivesse conversando com um amigo".',
    doLine: 'Adicione para quem é, qual o tamanho e um detalhe extra, todas as vezes.',
  },
  {
    id: 'verification-basics',
    title: 'Como saber se ela está mentindo',
    body: 'A IA diz coisas erradas com um tom confiante, e essa é a armadilha. Quando ela fornecer um fato, um número, uma citação ou uma fonte, não acredite de imediato.\n\nCopie a afirmação, cole-a em uma pesquisa e veja se há algo real que a comprove. Se ela forneceu uma citação, pesquise a citação exata entre aspas. Se o único lugar onde um "fato" existe for o chatbot, trate-o como uma alucinação.',
    doLine: 'Cole qualquer coisa que seja importante em uma pesquisa antes de acreditar.',
  },
  {
    id: 'academic-integrity',
    title: 'Usando a IA para a escola sem trapacear',
    body: 'Aqui está o teste definitivo: você conseguiria explicar isso em voz alta se o seu professor perguntasse? Se sim, você aprendeu. Se não, você trapaceou, mesmo que ninguém o pegue.\n\nUse a IA como um tutor, não como um ghostwriter. Boas abordagens: "faça um quiz comigo sobre este capítulo", "explique este problema passo a passo", "o que está confuso no meu parágrafo?". Péssima abordagem: "escreva a minha redação".',
    doLine: 'Entregue apenas trabalhos que você mesmo conseguiria explicar.',
  },
]

export const UNLOCKABLE_ENTRIES_PT: HandbookEntry[] = [
  {
    id: 'choosing-the-right-tool',
    title: 'Escolhendo a ferramenta certa',
    unlocksAt: 4,
    body: 'Não existe uma IA que seja a melhor de todas — existem várias, e cada uma é boa em tarefas diferentes.\n\nUse o Claude para redação e textos longos. Use o Perplexity para pesquisa e verificação de fatos (ele responde com fontes clicáveis). Use o Gemini para trabalhos no Google Docs. Use o ChatGPT para uso geral. Use a Meta AI quando quiser algo totalmente gratuito.\n\nQuando algo for realmente importante, faça a mesma pergunta a duas IAs diferentes e compare. As versões gratuitas em 2026 são robustas — não é necessário pagar ainda.',
    doLine: 'Escolha a ferramenta que se adequa à tarefa, mantenha duas nas quais você confia e pergunte a ambas quando o assunto for importante.',
  },
  {
    id: 'prompting-leveled-up',
    title: 'Prompting de alto nível',
    unlocksAt: 5,
    body: 'Três melhorias que tornam as respostas instantaneamente melhores.\n\nPrimeiro, dê a ela um trabalho: "Atue como um treinador de debates e aponte falhas no meu argumento". Segundo, mostre em vez de descrever: cole um parágrafo que você gosta e diga "escreva o meu neste estilo". Terceiro, peça o formato exato: "coloque em uma tabela", "dê-me 5 bullet points", "faça uma lista de verificação".\n\nPara qualquer tarefa grande, faça a IA planejar primeiro, para que você possa corrigir o plano antes que ela escreva a versão completa.',
    doLine: 'Dê a ela uma função (role), um exemplo e um formato.',
  },
  {
    id: 'catch-the-hallucination',
    title: 'Detecte a alucinação',
    unlocksAt: 6,
    body: 'A coisa mais arriscada que uma IA pode lhe entregar é uma citação, porque as falsas parecem perfeitas. Copie qualquer citação, cole-a em uma pesquisa com aspas e confirme se é real e palavra por palavra antes de usá-la.\n\nO mesmo vale para as fontes: um título que soa real não significa nada até que você encontre a página verdadeira. Quanto maiores as apostas, mais a fundo você verifica — qualquer assunto sobre saúde, dinheiro ou leis deve ser verificado todas as vezes.',
    doLine: 'Nunca repita uma citação ou fato que você não tenha encontrado em outro lugar.',
  },
  {
    id: 'make-it-show-its-work',
    title: 'Faça-a mostrar o seu trabalho',
    unlocksAt: 11,
    body: 'Quando uma resposta for importante, faça a IA desacelerar. Adicione "explique passo a passo" e ela mostrará o seu raciocínio, tornando os erros fáceis de detectar.\n\nPergunte "qual o seu grau de certeza e o que mudaria a sua resposta?" — "não tenho certeza" é uma resposta boa e honesta. Quer uma visão imparcial? Diga "argumente os dois lados antes de concluir".\n\nNunca confie na matemática mental dela — diga-lhe para usar uma calculadora ou verifique os números você mesmo.',
    doLine: 'Faça a IA mostrar o trabalho, não apenas a resposta.',
  },
  {
    id: 'making-things-with-ai',
    title: 'Criando coisas com IA',
    unlocksAt: 13,
    body: 'Use a ferramenta construída para o que você está criando: uma ferramenta de imagem para imagens, uma ferramenta de codificação para código.\n\nPara imagens, prompts vagos geram resultados genéricos — acumule detalhes: "uma raposa em aquarela em uma floresta nevada ao entardecer, luz suave" é muito melhor do que "uma raposa".\n\nPara código, sempre adicione "explique o que este código faz" para que você possa corrigi-lo mais tarde. Nunca faça uma falsificação do rosto ou da voz de uma pessoa real sem autorização.',
    doLine: 'Descreva em detalhes e, em seguida, verifique antes de compartilhar.',
  },
  {
    id: 'privacy-and-safety',
    title: 'Privacidade e segurança',
    unlocksAt: 18,
    body: 'Trate um chatbot como uma sala que pode estar sendo gravada. Nunca cole senhas, o seu endereço, números de documentos de identidade (CPF, RG) ou informações privadas de outras pessoas.\n\nAbra as Configurações na sua ferramenta principal, desative "treinar com meus dados" ou "melhorar o modelo" e use um chat temporário quando quiser que algo não seja salvo.\n\nExcluir um chat nem sempre o apaga no servidor da empresa — a regra real é simples: não digite nada que faria você entrar em pânico se vazasse.',
    doLine: 'Verifique as suas configurações hoje mesmo e nunca cole nada do qual você precisaria cancelar o envio.',
  },
  {
    id: 'when-not-to-use-ai',
    title: 'Quando NÃO usar a IA',
    unlocksAt: 29,  // W4 M6 — Autonomy and Manipulation
    body: 'Algumas coisas simplesmente não devem ser passadas para um robô, e saber quais são elas é uma habilidade por si só.\n\nNão faça a IA decidir algo pessoal por você. Não se apoie nela como o seu único suporte quando o que você realmente precisa é de uma pessoa real. Não confie nela em decisões caras ou arriscadas que você não consiga verificar duas vezes.\n\nEscolha uma coisa que você faça completamente por conta própria, de propósito, para que essa habilidade continue sendo sua.',
    doLine: 'Mantenha uma lista curta de "pergunte a uma pessoa, não a um bot" e siga-a de verdade.',
  },
  {
    id: 'build-good-ai-habits',
    title: 'Construa bons hábitos com a IA',
    unlocksAt: 39,  // W5 M8
    body: 'Aqui está o manual inteiro como uma única rotina que você pode executar toda vez que abrir um chatbot.\n\nEscolha a ferramenta certa para o trabalho. Diga a ela para quem é a resposta e qual formato você deseja. Verifique qualquer coisa importante em uma segunda fonte. Use-a para aprender sobre o assunto, não para pular o aprendizado. Mantenha os seus dados privados de fora. E tome a decisão final por si mesmo.',
    doLine: 'Escolha a ferramenta, verifique o resultado e assuma a decisão.',
  },
]
