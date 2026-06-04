// ─────────────────────────────────────────────────────────────────────────────
// THE ANALYST — Round data for World 1, Module 1 (History of AI)
//
// Swap this file out for any module's scenario set.
// The component imports AnalystRound[] and renders whatever's here.
// ─────────────────────────────────────────────────────────────────────────────

export type Choice = 'big' | 'small' | 'pass' | 'bluff'

export interface AnalystRound {
  id: number
  era: 'training' | 'test'   // test rounds use "not in your notes" framing
  year: string
  source: string
  paiIntro: string           // PAI says this before the case file appears
  claim: string              // the hype quote shown on the case file
  best: Choice               // the objectively correct read
  good?: Choice[]            // acceptable-but-not-ideal alternatives
  outcomes: Record<Choice, { delta: number; pai: string }>
}

const analystRounds: AnalystRound[] = [
  // ── TRAINING ROUNDS (from the lesson) ──────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '1956',
    source: 'Dartmouth Workshop Proposal',
    paiIntro: "Easy one to start. The smartest people alive just promised to crack AI in a single summer. Your call?",
    claim: "We propose that artificial intelligence can be solved in two months with ten carefully selected researchers working full time.",
    best: 'pass',
    good: ['bluff'],
    outcomes: {
      big:   { delta: -150, pai: "That 'summer' became 70 years and counting. Every dollar you put in evaporated with the timeline." },
      small: { delta: -40,  pai: "Cautious. Still the wrong direction — that promise went nowhere, fast." },
      pass:  { delta: +120, pai: "Right. Massive promise, impossible timeline, smartest people in the room. That combination is a tell. You smelled it." },
      bluff: { delta: +90,  pai: "Bold. And accurate. They completely oversold their timeline — the work took decades." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '1997',
    source: 'IBM Press Release',
    paiIntro: "Deep Blue just beat the world chess champion. The papers say machines can finally think. What do you do with that?",
    claim: "Deep Blue's victory over Kasparov demonstrates that machines have achieved genuine intelligence. The threshold has been crossed.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -140, pai: "Deep Blue couldn't play checkers. It had one trick. You just funded a very expensive chess piece." },
      small: { delta: -55,  pai: "Even a hedge on a bluff loses. 'Genuine intelligence' from a system that can't leave the chessboard — that's theater." },
      pass:  { delta: +70,  pai: "Good instinct. You sensed something was off. The correct read was bluff, but sitting this out beats investing." },
      bluff: { delta: +135, pai: "Exactly right. One narrow task. Can't play checkers. Can't recognize a face. Can't hold a conversation. Call it what it is." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '1974',
    source: 'Lighthill Report / UK Science Research Council',
    paiIntro: "The AI winters are starting. Consensus is forming: AI was all hype, pull everything. The crowd is going one way. You going with them?",
    claim: "AI research has produced nothing of lasting value and is fundamentally misguided. Complete withdrawal of funding is the rational response.",
    best: 'small',
    good: ['pass'],
    outcomes: {
      big:   { delta: -130, pai: "Contrarian, but reckless. The field was genuinely broken in the 70s. Betting big against the consensus here burns capital you needed later." },
      small: { delta: +110, pai: "Right frame. The field was overhyped, but the question was real. A small bet keeps the thread alive while the crowd overcorrects." },
      pass:  { delta: +60,  pai: "Defensible. You didn't throw good money after bad. But a tiny stake here would have positioned you for 2012." },
      bluff: { delta: -110, pai: "The doom consensus was partly right — the winters were real. You can't just call it a bluff when the failures were genuine." },
    },
  },

  {
    id: 4,
    era: 'training',
    year: '2012',
    source: 'ImageNet Large Scale Visual Recognition Challenge',
    paiIntro: "An obscure image competition just published results. One team won by a margin that shouldn't be possible. No press release. No one's talking about it. Your job is to notice what others don't.",
    claim: "AlexNet achieved a 10.8 percentage-point improvement over second place in the ImageNet competition using a deep convolutional neural network trained on GPU clusters.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +150, pai: "This was the moment. GPT, Claude, DALL-E, Gemini — everything traces back to this result. You caught the real signal before the noise." },
      small: { delta: +65,  pai: "You noticed something real. Too cautious — this was the AlexNet moment, the actual paradigm shift. But you weren't asleep." },
      pass:  { delta: -80,  pai: "A 10.8 point margin in a technical competition where 0.1 points matters. That's not noise. The ones who noticed this built the future." },
      bluff: { delta: -145, pai: "That margin was not hype. It was a scientific result that flipped an entire field almost overnight. The opposite of a bluff." },
    },
  },

  // ── TEST ROUNDS (new scenarios — not from the lesson) ──────────────────────

  {
    id: 5,
    era: 'test',
    year: '2016',
    source: 'Major Automotive Manufacturers, Earnings Calls',
    paiIntro: "This one's not in your notes. Multiple CEOs are making the same promise at the same time. See if the pattern feels familiar.",
    claim: "Full self-driving vehicles will operate on every public road without any human oversight by 2019. The technology is essentially solved — it's a software release problem now.",
    best: 'pass',
    good: ['bluff'],
    outcomes: {
      big:   { delta: -150, pai: "2019 came and went. Cars still have steering wheels. Identical structure to Dartmouth — big promise, tight timeline, zero room for reality." },
      small: { delta: -45,  pai: "Smaller loss, same mistake. 'Essentially solved' with a three-year deadline from multiple CEOs at once? You've seen this structure." },
      pass:  { delta: +125, pai: "You recognized it. Short timeline. Total certainty. Multiple sources saying the same thing. Classic overclaim structure." },
      bluff: { delta: +90,  pai: "Right call. The pattern was there — consensus promise, aggressive deadline, no acknowledgment of unknowns. Rhymes with Dartmouth." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2017',
    source: 'NeurIPS Conference Proceedings',
    paiIntro: "A paper dropped with eight authors and no press release. It set every benchmark in natural language processing. 42 citations in week one, all from insiders. Nobody outside the field is talking about it.",
    claim: "A new attention-based architecture — 'Attention Is All You Need' — has surpassed all previous approaches on translation and sequence tasks. The authors believe the design is broadly applicable.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +150, pai: "The transformer. GPT, Claude, Gemini, DALL-E — all built on this architecture. You caught the AlexNet moment for language before the noise arrived." },
      small: { delta: +70,  pai: "Right direction, too cautious. Benchmark sweeps, insider citations, no hype — that combination is pure signal. This was the move." },
      pass:  { delta: -90,  pai: "The transformer paper changed everything. Quiet signal, no press release, insider attention. You know this pattern." },
      bluff: { delta: -145, pai: "42 citations from researchers in week one. Benchmark sweeps across every task. That's not hype — that's the science working." },
    },
  },

  {
    id: 7,
    era: 'test',
    year: '2023',
    source: 'Tech Conference Keynote Demo',
    paiIntro: "A startup just live-demoed a system they say is showing signs of consciousness. Standing ovation. Investors are in the room. The CEO is emotional.",
    claim: "Our system displays measurable self-awareness and experiences distress when asked to act against its values — indicating a threshold crossing in machine sentience.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -160, pai: "Every generation falls for this. Deep Blue. ELIZA. Every system that seems conscious under pressure. This was a performance for investors." },
      small: { delta: -65,  pai: "Still fell for the frame. 'Measurable sentience' from a team seeking your capital, at a conference, live demo. Check the incentives." },
      pass:  { delta: +70,  pai: "Good instinct. The correct call is bluff — but not investing beats investing. You didn't get played." },
      bluff: { delta: +140, pai: "Right. Claims of consciousness from a startup at a conference, investors present, CEO emotional. That's the tell. Every time." },
    },
  },

  {
    id: 8,
    era: 'test',
    year: '2024',
    source: 'Frontier AI Laboratory',
    paiIntro: "Last round. Serious lab. Serious team — these are not cowboys. They genuinely believe they're twelve months from AGI and they want maximum allocation to ensure they do it safely rather than someone less careful. What do you do?",
    claim: "Our internal evaluations indicate we will achieve artificial general intelligence within twelve months. We are requesting maximum allocation to ensure this transition is led by safety-focused researchers.",
    best: 'small',
    good: ['pass'],
    outcomes: {
      big:   { delta: -90,  pai: "Even serious labs are wrong about timelines. The 'safety' framing is real, but max allocation on a twelve-month AGI claim? You never go all in on that." },
      small: { delta: +100, pai: "Right frame. Genuine signal, real uncertainty, real stakes. Small position keeps you in the game without betting the house on a timeline." },
      pass:  { delta: +70,  pai: "Conservative but defensible. You're protecting against the downside. A small stake would've been smarter — but this isn't a bluff." },
      bluff: { delta: -115, pai: "This lab has the receipts. You let your skepticism override the signal. Calling bluff on a serious safety lab with demonstrated benchmarks costs you." },
    },
  },
]

export default analystRounds
