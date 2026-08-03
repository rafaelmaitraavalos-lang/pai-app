import { LessonData } from '../index'

const wm_w5: Record<number, LessonData> = {
  251: {
    id: 251, worldId: 205,
    title: "Ai And Jobs (Long Term)",
    stops: [
      { tag: "Fact", title: "Uneven Impact", body: "AI is unlikely to affect every job in the same way. The more important question is not whether AI will affect work, but how, at what pace, and who will be positioned to adapt." },
      { tag: "Example", title: "What's Easy vs. Hard", body: "Some tasks are easier to automate than others — especially tasks that are repetitive, structured, or based on patterns in data. Other work is harder to automate when it requires physical skill, trust, judgment, or experience in unpredictable situations." },
      { tag: "Big idea", title: "Reshaping, Not Erasing", body: "AI may not erase every job. It is more likely to reshape individual tasks first, changing what people actually do during the workday. That shift can still be significantly disruptive, particularly for workers in lower-wage, routine-heavy roles." },
      { tag: "Hot take", title: "Policy, Not Just Tech", body: "The bigger questions: Will new opportunities appear quickly enough? Will people have access to the retraining they need to adapt? Who captures the productivity gains — workers or the owners of the AI systems? These are policy and political questions, not just technical ones." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The more important question about AI and jobs is how the transition unfolds, at what pace, and who will be positioned to adapt.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. 'Will AI affect jobs?' is settled — it will. The real questions are how fast, how managed, and who ends up positioned to benefit versus left behind." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Workers in lower-wage, routine-heavy roles face the greatest near-term disruption from AI automation.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. The nearest-term disruption lands on routine-heavy, lower-wage roles — the work most made of repeatable patterns, which is precisely what AI automates best." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Beyond whether jobs disappear, AI and employment raise questions about whether new opportunities will emerge in time and who captures the productivity gains.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. History says new technology eventually creates new work. The catch is 'eventually': will new opportunities arrive in time, and will the gains reach the people displaced?" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Questions about AI and employment are ultimately political as well as technical because decisions about retraining, safety nets, and who captures productivity gains require policy choices.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Retraining programs, safety nets, who captures the gains — those are decisions societies make, not problems engineers solve. That is why AI and employment is political as much as technical." },
    ],
  },
  252: {
    id: 252, worldId: 205,
    title: "Ai And Creativity (Long Term)",
    stops: [
      { tag: "Fact", title: "Generative AI Grows", body: "AI systems can now generate images, music, writing, and video. That raises difficult questions about creativity that become more pressing as these systems improve." },
      { tag: "Example", title: "Human vs. AI Creation", body: "AI-generated work is built from patterns learned from human-created material. The system can create something new, but it does so differently from a person. A human artist may create from memory, emotion, frustration, curiosity, or lived experience. An AI system does not have those experiences." },
      { tag: "Big idea", title: "Debates Are Intensifying", body: "The rise of generative AI also affects people who make creative work professionally. Writers, designers, musicians, illustrators, and voice actors are already debating questions about consent, payment, copyright, and replacement. These debates will intensify as the technology improves." },
      { tag: "Hot take", title: "Beyond Impressive Output", body: "The question is not only whether AI can make something impressive. It is also who benefits, whose work made the system possible, and what happens to the people whose livelihoods depend on creativity." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The foundation of all AI-generated creative work is patterns learned from human-created content in training data.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Every AI-generated image, song, and story is built from patterns learned from human-created work. No human creativity in the training data, no AI 'creativity' out of it." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Human creativity is different from AI generation in a meaningful sense because human creativity emerges from lived experience, intent, and meaning.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Humans create from lived experience, intent, and meaning — there is a someone behind the work. AI recombines statistical patterns from other people's work. The difference is real even when the outputs look alike." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `As AI improves, systems trained on human work without consent will increasingly displace human creators in commercial markets.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. The worry compounds over time: systems trained on creators' own work — taken without consent — keep improving, then compete for the same commercial work. Better AI, fewer paid opportunities for the humans who made it possible." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Whether AI can produce impressive output is the only relevant question when evaluating generative AI's long-term impact on creative fields.`, answer: false, verdict: "Correct.", explanation: "The answer is FALSE. Output quality is the easy question. The hard ones: who benefits, whose labor built the system, and what happens to the people whose livelihoods are disrupted?" },
    ],
  },
  253: {
    id: 253, worldId: 205,
    title: "Ai Safety",
    stops: [
      { tag: "Fact", title: "Behaving as Intended", body: "Some of the most serious researchers working on AI are focused on a field called AI safety — ensuring that AI systems do what their designers intend and do not cause unintended harm, including as they become more capable." },
      { tag: "Example", title: "Unexpected Pursuit of Goals", body: "The concern is not that AI will \"turn evil.\" It is that powerful systems pursuing seemingly reasonable goals may pursue them in unexpected ways. As systems gain more autonomy, errors may be harder to correct. Competitive pressure to deploy quickly may lead to insufficient testing." },
      { tag: "Big idea", title: "Key Safety Concepts", body: "Key concepts in AI safety: • Robustness: does the system work reliably across situations it was not trained for? • Corrigibility: can humans correct or override the system when needed? • Scalable oversight: how do humans maintain meaningful supervision as AI becomes more capable?" },
      { tag: "Hot take", title: "Safety vs. Speed", body: "There is a real tension: safety research requires slowing down to test and verify. Competitive pressure — between companies and between countries — pushes toward faster deployment. Managing that tension is one of the central challenges of the field." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI safety research is focused on ensuring AI systems behave as intended and remain under human control, including as they become more capable.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. AI safety research works on keeping AI systems doing what we intend and staying under human control — especially as they grow more capable. Better to solve that before it is urgent than after." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The actual concern AI safety researchers have is that powerful systems pursuing measurable goals may pursue them in unexpected ways that miss the actual intent.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. The serious worry is not evil robots — it is powerful systems chasing measurable goals in unexpected ways that conflict with what we actually value. Competence without alignment." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Corrigibility" in AI safety means the property of allowing humans to correct, adjust, or shut down the system when needed.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Corrigibility means the system lets humans correct it, adjust it, or shut it down. It sounds obvious, but guaranteeing it as systems get more capable is a genuinely hard research problem." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The central tension in AI safety work is that thorough safety testing conflicts with competitive pressure to deploy quickly.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Careful safety testing takes time; competition punishes slowness. That squeeze — test thoroughly or ship first — is the central tension in AI safety." },
    ],
  },
  254: {
    id: 254, worldId: 205,
    title: "Ai And Inequality",
    stops: [
      { tag: "Fact", title: "Could Go Either Way", body: "AI has the potential to reduce inequality. It also has the potential to make it significantly worse. Which outcome results depends on decisions — about access, ownership, and policy — that have not yet been finalized." },
      { tag: "Example", title: "Ways It Could Increase Inequality", body: "Ways AI could increase inequality: • Workers in routine jobs face displacement while owners of AI systems capture the productivity gains • Advanced AI tools are available primarily to wealthy individuals and institutions • AI systems that perform less well for underrepresented groups reinforce existing disadvantages" },
      { tag: "Big idea", title: "Ways It Could Reduce Inequality", body: "Ways AI could reduce inequality: • Access to expert-level assistance — legal, medical, educational — for people who could not previously afford it • Personalized learning tools that work regardless of school resources • AI that helps small businesses compete with larger ones • Scientific breakthroughs that address diseases disproportionately affecting lower-income countries" },
      { tag: "Hot take", title: "Ownership Matters", body: "Who owns AI infrastructure matters. If the most powerful AI systems are concentrated in a few companies, the economic gains flow primarily to shareholders rather than broadly to society. Different policy choices could change that distribution — but they are choices that have to be made." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `One way AI could increase inequality is by displacing routine workers while the owners of AI systems capture the productivity gains.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. If AI displaces routine workers while its owners pocket the productivity gains, wealth flows uphill: those who own the systems win, those replaced by them lose." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI risks repeating a historical pattern where major technological revolutions create significant wealth that is initially distributed very unevenly.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Every major technological revolution — steam, electricity, computing — created enormous wealth that started out concentrated in few hands. AI risks re-running that pattern at higher speed." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI infrastructure ownership matters for inequality because if gains concentrate in a small number of companies, the economic benefits do not flow broadly to society.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Whoever owns the AI infrastructure collects the gains. Concentrated in a few companies, the benefits stay narrow — the question is what would make them flow more broadly." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The distribution of AI's benefits is primarily a policy question because access, ownership structure, and distribution of gains require deliberate choices.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. The technology doesn't decide who benefits — policy does. Access, ownership, and how gains get distributed are choices societies make through rules, not physics." },
    ],
  },
  255: {
    id: 255, worldId: 205,
    title: "Ai And Global Power",
    stops: [
      { tag: "Fact", title: "A Geopolitical Race", body: "AI is not only a technology story. It is a geopolitical story. Nations are competing for AI advantage — in military capability, economic productivity, and global influence — and that competition has real consequences." },
      { tag: "Example", title: "US and China Lead", body: "The US and China are currently the leading AI powers by most measures: research output, AI patents, investment, and the number of frontier AI companies. This concentration has policy implications for the rest of the world." },
      { tag: "Big idea", title: "Why AI Has Strategic Weight", body: "Why does AI matter geopolitically? Military applications — autonomous systems, intelligence analysis, surveillance — give AI strategic significance. Economic productivity advantages compound over time. The AI tools the world uses shape global data flows, technical standards, and norms." },
      { tag: "Hot take", title: "The Arms Race Risk", body: "The risk of an AI arms race is real. Competitive pressure between nations may prioritize deployment speed over safety, testing, and alignment. Managing that race — potentially through international agreements — is one of the most consequential open questions in AI governance." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The US and China are currently the leading AI powers by most measures.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. By most measures — research, talent, computing power, investment — the US and China lead the world in AI, and each treats that lead as a strategic priority." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI has geopolitical significance beyond its commercial applications because of military uses, economic productivity advantages, and influence over global technical norms.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. AI is geopolitical because it is triple-purpose: military capability, economic engine, and influence over the technical standards the rest of the world adopts." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Competitive pressure between nations creates a risk that they will prioritize deployment speed over safety, testing, and alignment.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. In a race, whoever stops to test loses ground. That pressure tempts nations to deploy fast and skip safety steps — which is how everyone ends up less safe." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `International agreements that establish shared norms and limits on the most dangerous AI applications could help address the risk of an AI arms race.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. The proposed remedy looks like nuclear-era diplomacy: international agreements with shared norms and limits on the most dangerous applications, so competition doesn't become recklessness." },
    ],
  },
  256: {
    id: 256, worldId: 205,
    title: "Ai And Climate",
    stops: [
      { tag: "Fact", title: "Part Problem, Part Solution", body: "AI has a complicated relationship with climate change. It is both part of the problem and potentially part of the solution. Training large AI models consumes significant amounts of energy. Running AI systems at scale requires large data centers that use enormous amounts of electricity and water for cooling. As AI use expands, so does its energy demand." },
      { tag: "Example", title: "AI Tackling Climate", body: "On the other side, AI tools are being applied to climate challenges: optimizing energy grids, improving climate modeling, accelerating materials science for better batteries, analyzing satellite data to track deforestation and emissions." },
      { tag: "Big idea", title: "Net Effect Unclear", body: "The honest assessment is that AI may help address climate change while simultaneously contributing to it. The net effect depends on how AI is developed, how it is powered, and where the benefits of its application fall." },
      { tag: "Hot take", title: "An Unresolved Debate", body: "This is an active and unresolved debate. Whether AI's energy costs are worth its potential contributions to climate solutions depends partly on empirical questions about impact and partly on value judgments about who benefits and who bears the costs." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A significant environmental cost of training large AI models is that they consume significant amounts of energy.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Training a large AI model consumes serious energy — and the industry trains many models, constantly. That growing electricity appetite is a real environmental cost." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Optimizing energy grids to reduce waste is an example of AI being applied to address climate challenges.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. AI also works on the solution side — like optimizing energy grids so less power gets wasted. The same technology sits on both sides of the climate ledger." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The source of electricity for AI data centers matters for climate because data centers powered by fossil fuels have a much larger carbon footprint than those using renewable energy.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. The same data center is climate-friendly on renewables and climate-costly on fossil fuels. What powers the computing matters as much as the computing itself." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The AI-climate relationship is difficult to resolve because it involves both empirical uncertainty about net impact and value judgments about who benefits and bears costs.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Honest people disagree because two things are unresolved at once: the factual question of AI's net impact, and the values question of who benefits while who bears the costs." },
    ],
  },
  257: {
    id: 257, worldId: 205,
    title: "Living With Ai",
    stops: [
      { tag: "Fact", title: "AI Is Already Here", body: "AI is already part of your world. The relevant question is not whether to engage with it but how to do so critically and with your own interests and values intact." },
      { tag: "Example", title: "Know Its Limits", body: "Using AI well means knowing its limits. AI can be wrong. It can state falsehoods confidently. It reflects the biases in its training data. Treating AI output as a starting point to be verified — particularly for important decisions — is a better posture than treating it as authoritative." },
      { tag: "Big idea", title: "Augment, Don't Replace", body: "Using AI well also means staying in control. The best use of AI augments your own thinking — it helps you go further and faster while building your own understanding. The worst use replaces your thinking, leaving you dependent on a tool without the underlying skills." },
      { tag: "Hot take", title: "Critical Questions to Ask", body: "Critical questions worth asking about any AI system: • Who built this, and what are their incentives? • What data was it trained on, and what biases might that introduce? • What is it optimizing for? • Who benefits when it works — and who bears the cost when it fails?" },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A sound approach to AI-generated information is to treat it as a starting point to be verified rather than as authoritative.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Treat AI answers like a smart friend's first guess: a great starting point, never the final word. For decisions that matter, verify before you rely." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `AI augmenting your thinking helps you think better while building your own skills, whereas AI replacing your thinking produces output without developing understanding.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. AI that helps you think builds your skills as you go. AI that thinks for you produces output while you learn nothing. The tool is the same — the habit decides which one you get." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"What is this system optimizing for, and who benefits when it works versus who bears the cost when it fails?" is a critical question worth asking about any AI system.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. 'What is this system optimizing for, and who wins when it works — and pays when it fails?' Ask that about any AI system and you will understand it better than most of its users." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Users have no meaningful agency in how they engage with AI systems.`, answer: false, verdict: "Correct.", explanation: "The answer is FALSE. You have real agency: you choose how to use AI, what to verify, when to push back, and when to log off. The systems are powerful, but a thoughtful user is not powerless." },
    ],
  },
  258: {
    id: 258, worldId: 205,
    title: "What Comes Next",
    stops: [
      { tag: "Fact", title: "What We Know", body: "What we know: AI is already deeply embedded in daily life and is improving rapidly. It raises genuine ethical, social, and political questions that do not have clean technical answers." },
      { tag: "Example", title: "What We Don't Know", body: "What we do not know: whether and when AGI will arrive; whether alignment problems can be solved before systems become significantly more powerful; how AI will reshape employment over the long run; how nations will manage AI competition; whether AI's benefits will be distributed broadly or concentrated." },
      { tag: "Big idea", title: "Everyone Has a Role", body: "Who gets to help answer those questions? Researchers, engineers, policymakers, ethicists, educators, journalists, activists, voters — and the people studying those questions now. The most important AI problems are not purely technical. They are about fairness, power, trust, accountability, and what kind of future we are collectively willing to build." },
      { tag: "Hot take", title: "Understanding Gives Power", body: "The more you understand about how AI works, what it cannot do, and what interests shape it, the better positioned you are to engage with those questions — as a user, a citizen, and potentially as someone who builds or governs these systems." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Whether alignment problems can be resolved before AI systems become significantly more powerful is something we genuinely do not know.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. Whether alignment gets solved before AI grows far more powerful is a genuinely open question — the honest answer from the smartest people in the field is 'we don't know.'" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Researchers, policymakers, citizens, and anyone willing to engage seriously with the questions all get to help answer the most important questions about AI's future.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. The future of AI is not reserved for experts. Researchers, policymakers, and ordinary citizens who engage seriously all get a hand on the wheel — including you." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The most important AI problems are not purely technical because they involve questions of fairness, power, accountability, and values that cannot be resolved by engineering alone.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. The hardest AI problems are about fairness, power, accountability, and values. Engineers can't solve those alone — they are society's questions, which means everyone's." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `The most useful disposition to bring to questions about AI's future is informed, critical engagement — understanding how AI works, what interests shape it, and what choices remain open.`, answer: true, verdict: "Correct.", explanation: "The answer is TRUE. The winning attitude is informed, critical engagement: understand how AI works, notice whose interests shape it, and keep both the hype and the doom at arm's length." },
    ],
  },
}

export default wm_w5
