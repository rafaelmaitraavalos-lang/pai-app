import type { AnalystRound } from '../analystRounds'

const rounds: AnalystRound[] = [
  // ── TRAINING ROUNDS ────────────────────────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '2016',
    source: 'Partnership on AI, Launch Press Release',
    paiIntro: "The biggest AI labs just formed a coalition for ethical AI. They published shared principles. No enforcement. No penalties. Industry self-governance. What do you do?",
    claim: "The Partnership on AI unites leading companies around shared principles for responsible development. With industry leaders aligned on ethics, AI harms can be prevented through voluntary commitments.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -135, pai: "Voluntary principles from parties with competing commercial interests and no enforcement mechanism have a consistent track record: they produce documents, not change." },
      small: { delta: -50,  pai: "Wrong direction. Principles without accountability are not frameworks — they are public relations. The pattern was clear from the start." },
      pass:  { delta: +70,  pai: "Safe. The correct read was bluff — voluntary self-governance without enforcement has a reliable track record of not working." },
      bluff: { delta: +130, pai: "Right. No enforcement, no penalties, competing interests. Principles signed by competitors who benefit from moving fast are decorative." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '2018',
    source: 'EU High-Level Expert Group on AI, Draft Report',
    paiIntro: "The EU just released detailed AI ethics guidelines — seven principles including fairness, transparency, and human oversight. It has real process behind it. Government sponsored. Is this different?",
    claim: "The EU's seven principles for trustworthy AI provide a comprehensive framework for ensuring AI systems are developed responsibly. Companies that adopt these principles will prevent foreseeable AI harms.",
    best: 'small',
    good: ['pass'],
    outcomes: {
      big:   { delta: -90,  pai: "Principles without technical operationalization are hard to implement. 'Fairness' means different things to different teams. Without measurement criteria, adoption doesn't prevent harm." },
      small: { delta: +100, pai: "Right frame. Government-backed with real process is different from industry self-governance — but principles still need operationalization. A cautious stake was correct." },
      pass:  { delta: +55,  pai: "Defensible. The EU process was more credible than industry self-governance, but principles alone don't prevent harms. Caution made sense." },
      bluff: { delta: -100, pai: "This had real government backing and a genuine process. Calling it a bluff missed the signal — this was the seed of what became the EU AI Act." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '2021',
    source: 'US National AI Initiative, White House',
    paiIntro: "The US government released an AI Bill of Rights with specific protections. No enforcement mechanism yet — but official government language, and growing political momentum.",
    claim: "The AI Bill of Rights establishes clear protections for citizens against algorithmic harm. Government recognition of these rights marks a turning point in AI accountability.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +85,  pai: "Also defensible. Government language without enforcement is still a framework shift — it sets expectations and creates future legal footholds. Going bigger than cautious was reasonable here." },
      small: { delta: +110, pai: "Good read. Official government framing, growing momentum, real political context — this is different from voluntary principles. A small stake on this trajectory was right." },
      pass:  { delta: -40,  pai: "Official government language on AI rights creates real precedent even without immediate enforcement. You missed a meaningful signal." },
      bluff: { delta: -115, pai: "Government-issued rights frameworks — even without immediate enforcement — shift the legal landscape. This became the foundation for future regulation." },
    },
  },

  // ── TEST ROUNDS ──────────────────────────────────────────────────────────

  {
    id: 4,
    era: 'test',
    year: '2022',
    source: 'Major Tech Company, Internal Ethics Review Report',
    paiIntro: "Not in your notes. A company publishes an internal audit of their AI system finding it has disparate impact on a protected group. They say their ethics framework caught the problem. Is this a real win?",
    claim: "Our internal ethics review process detected and flagged a bias issue before deployment. This demonstrates that ethics frameworks, when properly implemented, can prevent AI harm at scale.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -145, pai: "An ethics framework that finds a problem is a tool. The real question is what happens next: was it fixed? Was deployment delayed? Or was the audit theater?" },
      small: { delta: -55,  pai: "Finding a problem is step one. What matters is what was done with the finding — and companies rarely report the answer to that." },
      pass:  { delta: +70,  pai: "Good instinct. The correct call is bluff — an audit that finds a problem only matters if action follows. The report only tells you half the story." },
      bluff: { delta: +130, pai: "Right. Internal audit, self-reported result, no independent verification, no outcome reported. Ethics theater is when the audit is the product." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2023',
    source: 'EU AI Act, Final Text Published',
    paiIntro: "The EU AI Act passes — binding law with real enforcement, fines up to 6% of global revenue, and mandatory audits for high-risk systems. First major AI regulation with actual teeth.",
    claim: "The EU AI Act creates the world's first comprehensive binding AI regulation. High-risk AI systems must now pass mandatory conformity assessments before deployment in the EU market.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +145, pai: "Right. Binding law with enforcement, fines tied to global revenue, mandatory audits — this is categorically different from principles and voluntary frameworks. You recognized the shift." },
      small: { delta: +70,  pai: "Good direction. Binding enforcement was the missing piece across every previous framework. This mattered." },
      pass:  { delta: -90,  pai: "Binding law with real financial penalties is categorically different from principles documents. This was a genuine turning point." },
      bluff: { delta: -145, pai: "Passed legislation with enforcement teeth is not hype. The EU AI Act created real legal obligations for the first time." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2025',
    source: 'AI Lab, Public Announcement',
    paiIntro: "Last round. A frontier lab announces a new internal ethics framework promising to prevent their models from causing harm. No external oversight. Voluntary. Published as a white paper.",
    claim: "Our comprehensive ethics framework covers fairness, transparency, accountability, and safety. We are committed to responsible AI and will not deploy systems that fail our internal review standards.",
    best: 'pass',
    good: ['bluff'],
    outcomes: {
      big:   { delta: -150, pai: "Voluntary, internal, no external oversight, no enforcement, from a party that benefits commercially from deployment. You have seen this structure before." },
      small: { delta: -60,  pai: "Wrong direction. This is the same structure as 2016 — voluntary principles, no teeth, written by the party with competing interests." },
      pass:  { delta: +120, pai: "Right. Internal voluntary standards from a commercial lab look identical to every previous framework that failed to prevent harm." },
      bluff: { delta: +95,  pai: "Also right. The pattern is recognizable: voluntary, self-governed, commercially convenient. You've seen this movie." },
    },
  },
]

export default rounds
