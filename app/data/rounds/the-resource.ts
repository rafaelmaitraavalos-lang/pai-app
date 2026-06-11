import type { AnalystRound } from '../analystRounds'

const rounds: AnalystRound[] = [
  // ── TRAINING ROUNDS ────────────────────────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '2014',
    source: 'Nick Bostrom, Superintelligence — Published',
    paiIntro: "A philosopher just published a book arguing superintelligent AI is the most important problem humanity will ever face. No near-term timeline. Deep argument, credible author. What do you do?",
    claim: "The development of machine superintelligence represents an existential challenge to humanity. The control problem must be solved before transformative AI is created — or the consequences may be permanent and irreversible.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +80,  pai: "Also defensible. The argument was rigorous and the stakes argument was coherent. If the concern is valid, the cost of early investment is low compared to the potential downside." },
      small: { delta: +110, pai: "Right frame. Rigorous argument, credible author, not a timeline claim — just a structural concern. A small stake on early alignment research was the right call." },
      pass:  { delta: -40,  pai: "The argument wasn't hype — it was a careful structural case. Early alignment research investment was inexpensive and potentially important." },
      bluff: { delta: -110, pai: "Calling a peer-reviewed philosophical argument a bluff just because it's abstract costs you. The core concern was real even if the timeline was uncertain." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '2016',
    source: 'OpenAI Founding Announcement',
    paiIntro: "A new non-profit AI safety lab just launched, backed by $1 billion in commitments. Their stated mission: ensure AI benefits all of humanity. Elon Musk and Sam Altman are involved. Is this real?",
    claim: "OpenAI's mission is to ensure that artificial general intelligence benefits all of humanity. We will publish our research openly and prioritize safety to prevent catastrophic outcomes from advanced AI.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +75,  pai: "Also defensible. Real funding, credible founders, genuine safety focus at that moment. The mission drift came later." },
      small: { delta: +105, pai: "Right. Real capital, credible team, genuine safety framing at launch. A cautious stake was correct — the eventual pivot to commercial wasn't predictable here." },
      pass:  { delta: -50,  pai: "A billion dollars, credible founders, real safety research agenda. This was meaningful signal, even with later mission drift." },
      bluff: { delta: -115, pai: "The launch was genuine. The mission drift came later. Calling the founding moment a bluff misreads the signal." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '2019',
    source: 'Existential Risk Conference, Academic Presentation',
    paiIntro: "A researcher presents a probability estimate: 10% chance of human extinction from AI within 100 years. Peer-reviewed journal. Other researchers estimate 1% to 50%. Wide spread. What do you do?",
    claim: "Based on current AI trajectories and historical base rates for existential risks, the probability of an extinction-level event from advanced AI within 100 years is approximately 10%.",
    best: 'pass',
    good: ['small'],
    outcomes: {
      big:   { delta: -100, pai: "Extinction probability estimates are not investment theses. The error bars span 50x. The uncertainty is so wide that no allocation follows directly from the number." },
      small: { delta: +65,  pai: "Cautious and defensible. The research raised a real question without providing actionable precision. A very small exploratory stake made sense." },
      pass:  { delta: +100, pai: "Right. Probability estimates with 50x uncertainty ranges are not decision-grade information. The question was real but the number was not actionable." },
      bluff: { delta: -80,  pai: "The research wasn't hype — it was a genuine attempt at quantification under deep uncertainty. Calling it a bluff misses the real epistemic question." },
    },
  },

  // ── TEST ROUNDS ──────────────────────────────────────────────────────────

  {
    id: 4,
    era: 'test',
    year: '2022',
    source: 'Effective Altruism Forum, Widely Cited Post',
    paiIntro: "Not in your notes. A post argues that AI existential risk is so high that all other philanthropic causes should be deprioritized in favor of AI safety funding. It goes viral in funding circles.",
    claim: "Given the stakes involved, all serious philanthropists should redirect 80% or more of their giving to AI existential risk reduction. Other causes, however valuable, cannot compete with preventing human extinction.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -145, pai: "A blog post, however viral, arguing for 80%+ reallocation based on probability estimates with massive error bars is not an investment mandate. You got swept up in the urgency framing." },
      small: { delta: -55,  pai: "Wrong direction. The claim is not that AI risk is worth taking seriously — it's that everything else should be deprioritized. That's a much stronger claim with much weaker evidence." },
      pass:  { delta: +80,  pai: "Good instinct. The correct call is bluff — the specific allocation prescription doesn't follow from the uncertainty-laden probability estimates." },
      bluff: { delta: +130, pai: "Right. 'Everything else is less important' is an extraordinary claim requiring extraordinary evidence. What was offered was a viral forum post." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2023',
    source: 'Open Letter, Signed by Leading AI Researchers',
    paiIntro: "A letter signed by hundreds of AI researchers — including some of the most credible names in the field — calls for a pause on frontier AI development citing existential risk. What do you do?",
    claim: "We call for an immediate pause on training AI systems more powerful than GPT-4. The potential risks are so severe that we cannot responsibly continue without first establishing safety standards and governance structures.",
    best: 'small',
    good: ['pass'],
    outcomes: {
      big:   { delta: -80,  pai: "The signatories were credible but the letter had no enforcement mechanism and the pause never happened. Betting big on a letter is different from betting big on evidence." },
      small: { delta: +100, pai: "Right frame. Credible signatories signal a real concern worth tracking — but an open letter without enforcement is a statement, not a binding outcome." },
      pass:  { delta: +65,  pai: "Defensible. The concern was real but the letter itself wasn't actionable information." },
      bluff: { delta: -90,  pai: "Hundreds of credible researchers raising a specific safety concern is not theater. It was a real signal even if the requested action didn't follow." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2024',
    source: 'AI Safety Research Institute, Published Evaluation',
    paiIntro: "Last round. A government-funded safety institute publishes evaluations showing that current frontier models cannot perform most dangerous tasks better than a determined non-expert. The risk is lower than expected — for now.",
    claim: "Current frontier models do not provide meaningful uplift to bad actors in the most dangerous capability domains — bioweapons synthesis, critical infrastructure attacks, or autonomous cyberweapons. The near-term risk is substantially lower than widely claimed.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +140, pai: "Right. Government-funded, independent, published evaluation with specific capability assessments. This is what evidence-based risk assessment looks like. And the finding — lower than expected — is exactly the kind of calibration signal worth acting on." },
      small: { delta: +70,  pai: "Good direction. Independent government evaluation is real signal. Going bigger here was warranted." },
      pass:  { delta: -80,  pai: "Independent government evaluation of specific capabilities is real signal — especially when the finding corrects an overclaimed risk." },
      bluff: { delta: -140, pai: "A published government evaluation with specific methodology is not a bluff. This is the type of evidence that should update your priors." },
    },
  },
]

export default rounds
