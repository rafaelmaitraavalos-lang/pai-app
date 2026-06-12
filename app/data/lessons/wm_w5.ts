import { LessonData } from '../index'

const wm_w5: Record<number, LessonData> = {
  251: {
    id: 251, worldId: 205,
    title: "AI And Jobs (Long Term)",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "AI is unlikely to affect every job in the same way. The more important question is not whether AI will affect work, but how, at what pace, and who will be positioned to adapt." },
      { tag: "Example", title: "Slide 2", body: "Some tasks are easier to automate than others \u2014 especially tasks that are repetitive, structured, or based on patterns in data. Other work is harder to automate when it requires physical skill, trust, judgment, or experience in unpredictable situations." },
      { tag: "Big idea", title: "Slide 3", body: "AI may not erase every job. It is more likely to reshape individual tasks first, changing what people actually do during the workday. That shift can still be significantly disruptive, particularly for workers in lower-wage, routine-heavy roles." },
      { tag: "Hot take", title: "Slide 4", body: "The bigger questions: Will new opportunities appear quickly enough? Will people have access to the retraining they need to adapt? Who captures the productivity gains \u2014 workers or the owners of the AI systems? These are policy and political questions, not just technical ones." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"How the transition unfolds, at what pace, and who will be positioned to adapt\"", answer: true, verdict: "Correct.", explanation: "What is the more important question about AI and jobs, beyond whether AI will affect employment? \u2014 How the transition unfolds, at what pace, and who will be positioned to adapt" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Workers in lower-wage, routine-heavy roles\"", answer: true, verdict: "Correct.", explanation: "What type of workers face the greatest near-term disruption from AI automation? \u2014 Workers in lower-wage, routine-heavy roles" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Whether new opportunities will emerge in time and who captures the productivity gains\"", answer: true, verdict: "Correct.", explanation: "Beyond whether jobs disappear, what broader questions does AI and employment raise? \u2014 Whether new opportunities will emerge in time and who captures the productivity gains" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Decisions about retraining, safety nets, and who captures productivity gains require policy choices\"", answer: true, verdict: "Correct.", explanation: "Why are questions about AI and employment ultimately political as well as technical? \u2014 Decisions about retraining, safety nets, and who captures productivity gains require policy choices" },
    ],
  },
  252: {
    id: 252, worldId: 205,
    title: "AI And Creativity (Long Term)",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "AI systems can now generate images, music, writing, and video. That raises difficult questions about creativity that become more pressing as these systems improve." },
      { tag: "Example", title: "Slide 2", body: "AI-generated work is built from patterns learned from human-created material. The system can create something new, but it does so differently from a person. A human artist may create from memory, emotion, frustration, curiosity, or lived experience. An AI system does not have those experiences." },
      { tag: "Big idea", title: "Slide 3", body: "The rise of generative AI also affects people who make creative work professionally. Writers, designers, musicians, illustrators, and voice actors are already debating questions about consent, payment, copyright, and replacement. These debates will intensify as the technology improves." },
      { tag: "Hot take", title: "Slide 4", body: "The question is not only whether AI can make something impressive. It is also who benefits, whose work made the system possible, and what happens to the people whose livelihoods depend on creativity." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Patterns learned from human-created content in training data\"", answer: true, verdict: "Correct.", explanation: "What is the foundation of all AI-generated creative work? \u2014 Patterns learned from human-created content in training data" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Human creativity emerges from lived experience, intent, and meaning; AI generates statistically likely continuations of patterns\"", answer: true, verdict: "Correct.", explanation: "What makes human creativity different from AI generation in a meaningful sense? \u2014 Human creativity emerges from lived experience, intent, and meaning; AI generates statistically likely continuations of patterns" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"As AI improves, systems trained on human work without consent will increasingly displace human creators in commercial markets\"", answer: true, verdict: "Correct.", explanation: "What longer-term concern does generative AI raise for creative professionals? \u2014 As AI improves, systems trained on human work without consent will increasingly displace human creators in commercial markets" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Who benefits, whose labor underpinned the system, and what happens to those whose livelihoods depend on creative work\"", answer: true, verdict: "Correct.", explanation: "What questions extend beyond whether AI can produce impressive creative output? \u2014 Who benefits, whose labor underpinned the system, and what happens to those whose livelihoods depend on creative work" },
    ],
  },
  253: {
    id: 253, worldId: 205,
    title: "AI Safety",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "Some of the most serious researchers working on AI are focused on a field called AI safety \u2014 ensuring that AI systems do what their designers intend and do not cause unintended harm, including as they become more capable." },
      { tag: "Example", title: "Slide 2", body: "The concern is not that AI will \"turn evil.\" It is that powerful systems pursuing seemingly reasonable goals may pursue them in unexpected ways. As systems gain more autonomy, errors may be harder to correct. Competitive pressure to deploy quickly may lead to insufficient testing." },
      { tag: "Big idea", title: "Slide 3", body: "Key concepts in AI safety:\n\u2022 Robustness: does the system work reliably across situations it was not trained for?\n\u2022 Corrigibility: can humans correct or override the system when needed?\n\u2022 Scalable oversight: how do humans maintain meaningful supervision as AI becomes more capable?" },
      { tag: "Hot take", title: "Slide 4", body: "There is a real tension: safety research requires slowing down to test and verify. Competitive pressure \u2014 between companies and between countries \u2014 pushes toward faster deployment. Managing that tension is one of the central challenges of the field." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Ensuring AI systems behave as intended and remain under human control, including as they become more capable\"", answer: true, verdict: "Correct.", explanation: "What is AI safety research focused on? \u2014 Ensuring AI systems behave as intended and remain under human control, including as they become more capable" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"That powerful systems pursuing measurable goals may pursue them in unexpected ways that miss the actual intent\"", answer: true, verdict: "Correct.", explanation: "What is the actual concern AI safety researchers have about powerful AI systems? \u2014 That powerful systems pursuing measurable goals may pursue them in unexpected ways that miss the actual intent" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"The property of allowing humans to correct, adjust, or shut down the system when needed\"", answer: true, verdict: "Correct.", explanation: "What does \"corrigibility\" mean in AI safety? \u2014 The property of allowing humans to correct, adjust, or shut down the system when needed" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Thorough safety testing conflicts with competitive pressure to deploy quickly\"", answer: true, verdict: "Correct.", explanation: "What is the central tension in AI safety work? \u2014 Thorough safety testing conflicts with competitive pressure to deploy quickly" },
    ],
  },
  254: {
    id: 254, worldId: 205,
    title: "AI And Inequality",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "AI has the potential to reduce inequality. It also has the potential to make it significantly worse. Which outcome results depends on decisions \u2014 about access, ownership, and policy \u2014 that have not yet been finalized." },
      { tag: "Example", title: "Slide 2", body: "Ways AI could increase inequality:\n\u2022 Workers in routine jobs face displacement while owners of AI systems capture the productivity gains\n\u2022 Advanced AI tools are available primarily to wealthy individuals and institutions\n\u2022 AI systems that perform less well for underrepresented groups reinforce existing disadvantages" },
      { tag: "Big idea", title: "Slide 3", body: "Ways AI could reduce inequality:\n\u2022 Access to expert-level assistance \u2014 legal, medical, educational \u2014 for people who could not previously afford it\n\u2022 Personalized learning tools that work regardless of school resources\n\u2022 AI that helps small businesses compete with larger ones\n\u2022 Scientific breakthroughs that address diseases disproportionately affecting lower-income countries" },
      { tag: "Hot take", title: "Slide 4", body: "Who owns AI infrastructure matters. If the most powerful AI systems are concentrated in a few companies, the economic gains flow primarily to shareholders rather than broadly to society. Different policy choices could change that distribution \u2014 but they are choices that have to be made." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Displacing routine workers while the owners of AI systems capture the productivity gains\"", answer: true, verdict: "Correct.", explanation: "Which of these is a way AI could increase inequality? \u2014 Displacing routine workers while the owners of AI systems capture the productivity gains" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Major technological revolutions create significant wealth that is initially distributed very unevenly\"", answer: true, verdict: "Correct.", explanation: "What historical pattern does AI risk repeating? \u2014 Major technological revolutions create significant wealth that is initially distributed very unevenly" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"If gains concentrate in a small number of companies, the economic benefits do not flow broadly to society\"", answer: true, verdict: "Correct.", explanation: "Why does AI infrastructure ownership matter for inequality? \u2014 If gains concentrate in a small number of companies, the economic benefits do not flow broadly to society" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Primarily a policy question \u2014 access, ownership structure, and distribution of gains require deliberate choices\"", answer: true, verdict: "Correct.", explanation: "Is the distribution of AI's benefits primarily a technical or a policy question? \u2014 Primarily a policy question \u2014 access, ownership structure, and distribution of gains require deliberate choices" },
    ],
  },
  255: {
    id: 255, worldId: 205,
    title: "AI And Global Power",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "AI is not only a technology story. It is a geopolitical story. Nations are competing for AI advantage \u2014 in military capability, economic productivity, and global influence \u2014 and that competition has real consequences." },
      { tag: "Example", title: "Slide 2", body: "The US and China are currently the leading AI powers by most measures: research output, AI patents, investment, and the number of frontier AI companies. This concentration has policy implications for the rest of the world." },
      { tag: "Big idea", title: "Slide 3", body: "Why does AI matter geopolitically? Military applications \u2014 autonomous systems, intelligence analysis, surveillance \u2014 give AI strategic significance. Economic productivity advantages compound over time. The AI tools the world uses shape global data flows, technical standards, and norms." },
      { tag: "Hot take", title: "Slide 4", body: "The risk of an AI arms race is real. Competitive pressure between nations may prioritize deployment speed over safety, testing, and alignment. Managing that race \u2014 potentially through international agreements \u2014 is one of the most consequential open questions in AI governance." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"US and China\"", answer: true, verdict: "Correct.", explanation: "Which two countries are currently the leading AI powers by most measures? \u2014 US and China" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Military applications, economic productivity advantages, and influence over global technical norms give AI strategic importance\"", answer: true, verdict: "Correct.", explanation: "Why does AI have geopolitical significance beyond its commercial applications? \u2014 Military applications, economic productivity advantages, and influence over global technical norms give AI strategic importance" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Nations may prioritize deployment speed over safety, testing, and alignment\"", answer: true, verdict: "Correct.", explanation: "What risk does competitive pressure between nations create for AI development? \u2014 Nations may prioritize deployment speed over safety, testing, and alignment" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"International agreements that establish shared norms and limits on the most dangerous applications\"", answer: true, verdict: "Correct.", explanation: "What type of governance approach might address the risk of an AI arms race? \u2014 International agreements that establish shared norms and limits on the most dangerous applications" },
    ],
  },
  256: {
    id: 256, worldId: 205,
    title: "AI And Climate",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "AI has a complicated relationship with climate change. It is both part of the problem and potentially part of the solution.\nTraining large AI models consumes significant amounts of energy. Running AI systems at scale requires large data centers that use enormous amounts of electricity and water for cooling. As AI use expands, so does its energy demand." },
      { tag: "Example", title: "Slide 2", body: "On the other side, AI tools are being applied to climate challenges: optimizing energy grids, improving climate modeling, accelerating materials science for better batteries, analyzing satellite data to track deforestation and emissions." },
      { tag: "Big idea", title: "Slide 3", body: "The honest assessment is that AI may help address climate change while simultaneously contributing to it. The net effect depends on how AI is developed, how it is powered, and where the benefits of its application fall." },
      { tag: "Hot take", title: "Slide 4", body: "This is an active and unresolved debate. Whether AI's energy costs are worth its potential contributions to climate solutions depends partly on empirical questions about impact and partly on value judgments about who benefits and who bears the costs." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"They consume significant amounts of energy\"", answer: true, verdict: "Correct.", explanation: "What is a significant environmental cost of training large AI models? \u2014 They consume significant amounts of energy" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Optimizing energy grids to reduce waste\"", answer: true, verdict: "Correct.", explanation: "Which of these is an example of AI being applied to address climate challenges? \u2014 Optimizing energy grids to reduce waste" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Data centers powered by fossil fuels have a much larger carbon footprint than those using renewable energy\"", answer: true, verdict: "Correct.", explanation: "Why does the source of electricity for AI data centers matter for climate? \u2014 Data centers powered by fossil fuels have a much larger carbon footprint than those using renewable energy" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"It involves both empirical uncertainty about net impact and value judgments about who benefits and bears costs\"", answer: true, verdict: "Correct.", explanation: "What makes the AI-climate relationship difficult to resolve? \u2014 It involves both empirical uncertainty about net impact and value judgments about who benefits and bears costs" },
    ],
  },
  257: {
    id: 257, worldId: 205,
    title: "Living With AI",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "AI is already part of your world. The relevant question is not whether to engage with it but how to do so critically and with your own interests and values intact." },
      { tag: "Example", title: "Slide 2", body: "Using AI well means knowing its limits. AI can be wrong. It can state falsehoods confidently. It reflects the biases in its training data. Treating AI output as a starting point to be verified \u2014 particularly for important decisions \u2014 is a better posture than treating it as authoritative." },
      { tag: "Big idea", title: "Slide 3", body: "Using AI well also means staying in control. The best use of AI augments your own thinking \u2014 it helps you go further and faster while building your own understanding. The worst use replaces your thinking, leaving you dependent on a tool without the underlying skills." },
      { tag: "Hot take", title: "Slide 4", body: "Critical questions worth asking about any AI system:\n\u2022 Who built this, and what are their incentives?\n\u2022 What data was it trained on, and what biases might that introduce?\n\u2022 What is it optimizing for?\n\u2022 Who benefits when it works \u2014 and who bears the cost when it fails?" },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Treat it as a starting point to be verified rather than as authoritative\"", answer: true, verdict: "Correct.", explanation: "What is a sound approach to AI-generated information, particularly for important decisions? \u2014 Treat it as a starting point to be verified rather than as authoritative" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Augmentation helps you think better while building your own skills; replacement produces output without developing understanding\"", answer: true, verdict: "Correct.", explanation: "What distinguishes AI augmenting your thinking from AI replacing it? \u2014 Augmentation helps you think better while building your own skills; replacement produces output without developing understanding" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"What the system is optimizing for and who benefits when it works versus who bears the cost when it fails\"", answer: true, verdict: "Correct.", explanation: "Which of these is a critical question worth asking about an AI system you use? \u2014 What the system is optimizing for and who benefits when it works versus who bears the cost when it fails" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"False \u2014 users can choose tools, evaluate outputs critically, opt out of data collection where possible, and advocate for better governance\"", answer: true, verdict: "Correct.", explanation: "True or false: Users have no meaningful agency in how they engage with AI systems. \u2014 False \u2014 users can choose tools, evaluate outputs critically, opt out of data collection where possible, and advocate for better governance" },
    ],
  },
  258: {
    id: 258, worldId: 205,
    title: "What Comes Next",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "What we know: AI is already deeply embedded in daily life and is improving rapidly. It raises genuine ethical, social, and political questions that do not have clean technical answers." },
      { tag: "Example", title: "Slide 2", body: "What we do not know: whether and when AGI will arrive; whether alignment problems can be solved before systems become significantly more powerful; how AI will reshape employment over the long run; how nations will manage AI competition; whether AI's benefits will be distributed broadly or concentrated." },
      { tag: "Big idea", title: "Slide 3", body: "Who gets to help answer those questions? Researchers, engineers, policymakers, ethicists, educators, journalists, activists, voters \u2014 and the people studying those questions now.\nThe most important AI problems are not purely technical. They are about fairness, power, trust, accountability, and what kind of future we are collectively willing to build." },
      { tag: "Hot take", title: "Slide 4", body: "The more you understand about how AI works, what it cannot do, and what interests shape it, the better positioned you are to engage with those questions \u2014 as a user, a citizen, and potentially as someone who builds or governs these systems." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Whether alignment problems can be resolved before AI systems become significantly more powerful\"", answer: true, verdict: "Correct.", explanation: "Which of these is something we genuinely do not know about AI's future? \u2014 Whether alignment problems can be resolved before AI systems become significantly more powerful" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Researchers, policymakers, citizens, and anyone willing to engage seriously with the questions\"", answer: true, verdict: "Correct.", explanation: "Who gets to help answer the most important questions about AI's future? \u2014 Researchers, policymakers, citizens, and anyone willing to engage seriously with the questions" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"They involve questions of fairness, power, accountability, and values that cannot be resolved by engineering alone\"", answer: true, verdict: "Correct.", explanation: "What makes the most important AI problems not purely technical? \u2014 They involve questions of fairness, power, accountability, and values that cannot be resolved by engineering alone" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: "\"Informed, critical engagement \u2014 understanding how AI works, what interests shape it, and what choices remain open\"", answer: true, verdict: "Correct.", explanation: "What is the most useful disposition to bring to questions about AI's future? \u2014 Informed, critical engagement \u2014 understanding how AI works, what interests shape it, and what choices remain open" },
    ],
  },
}

export default wm_w5