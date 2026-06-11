import type { AnalystRound } from '../analystRounds'

const rounds: AnalystRound[] = [
  // ── TRAINING ROUNDS ────────────────────────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '2012',
    source: 'ICML Workshop, Technical Presentation',
    paiIntro: "A researcher shows dropout — randomly disabling neurons during training — reduces overfitting dramatically. Small paper, technical audience, no press. Is this real?",
    claim: "Randomly dropping units during training reduces overfitting by preventing co-adaptation of feature detectors. Networks trained with dropout show consistent generalization improvements across image, speech, and text tasks.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +140, pai: "Right. Technical paper, multiple task domains, specific mechanism with a plausible explanation. Dropout became one of the most-used regularization techniques in deep learning. You caught it early." },
      small: { delta: +65,  pai: "Good direction. The multi-domain replication and specific mechanism made this worth more than caution." },
      pass:  { delta: -85,  pai: "Multi-domain validation and a specific mechanistic explanation — this was clean signal. Dropout is now in almost every modern architecture." },
      bluff: { delta: -140, pai: "The mechanism was specific, the results replicated across tasks, the math was sound. This was not hype." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '2017',
    source: 'arXiv Preprint, Four Authors, No Press Release',
    paiIntro: "A quiet preprint proposes replacing recurrent networks entirely with attention. No press release. Eight citations in week one, all researchers. The claim is big but the evidence is methodical.",
    claim: "'Attention Is All You Need' — we propose the Transformer, a model architecture eschewing recurrence and convolutions, relying entirely on attention mechanisms. Results surpass all previous models on translation tasks.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +150, pai: "This was the transformer. Every major AI system today runs on this architecture. Quiet signal, no hype, insider attention, benchmark sweep — you know this pattern." },
      small: { delta: +70,  pai: "Right direction, too cautious. This was the AlexNet moment for language. The evidence was there." },
      pass:  { delta: -90,  pai: "The transformer paper changed everything. Quiet, no press release, researchers citing it immediately — you know this pattern. This was the signal." },
      bluff: { delta: -150, pai: "The results were real, the architecture was real, and everything that came after ran on this paper. This is not hype." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '2020',
    source: 'AI Company Blog Post',
    paiIntro: "A lab publishes a new training technique they say dramatically improves sample efficiency — models learn the same task in 10x fewer examples. Internal benchmarks only. What do you do?",
    claim: "Our new training method achieves human-level performance on 23 Atari games using 10x fewer environment interactions than prior methods. We believe this represents a step toward sample-efficient general learning.",
    best: 'small',
    good: ['pass'],
    outcomes: {
      big:   { delta: -90,  pai: "Internal benchmarks, company blog post, 'we believe' framing. The result may be real but needs independent replication before it warrants a large stake." },
      small: { delta: +100, pai: "Right call. Interesting result, specific metric, but company-internal only. A small stake pending independent replication was the right frame." },
      pass:  { delta: +60,  pai: "Defensible. The result may be real but company-internal benchmarks on one domain don't warrant more than caution." },
      bluff: { delta: -100, pai: "The improvement was specific and measurable — not theater. But 'we believe' plus internal benchmarks means you can't confirm it yet. Not a bluff, just unverified." },
    },
  },

  // ── TEST ROUNDS ──────────────────────────────────────────────────────────

  {
    id: 4,
    era: 'test',
    year: '2022',
    source: 'Tech Press, Multiple Outlets',
    paiIntro: "Not in your notes. Multiple outlets report a company has trained a model that can solve any math olympiad problem. Researchers outside the company cannot reproduce the results. The CEO is bullish.",
    claim: "Our model achieves gold-medal performance on IMO problems, demonstrating mathematical reasoning at the level of the best human competitors. This marks a breakthrough in AI's ability to perform genuine logical reasoning.",
    best: 'pass',
    good: ['bluff'],
    outcomes: {
      big:   { delta: -150, pai: "Unreproducible results from a single lab, reported through press not peer review, with a CEO actively promoting. Three flags at once." },
      small: { delta: -55,  pai: "Wrong direction. Reproducibility failure plus press-driven announcement plus CEO hype is a textbook overclaim signature." },
      pass:  { delta: +120, pai: "Right. Non-reproducible result, press release not peer review, CEO amplification. The structure screams overclaim." },
      bluff: { delta: +95,  pai: "Also right. Non-replicable results announced via press with executive promotion is exactly the structure that distinguishes hype from breakthrough." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2024',
    source: 'NeurIPS, Oral Presentation, 200 Citations in 30 Days',
    paiIntro: "A paper on a new training algorithm drops at NeurIPS. Oral presentation, 200 citations in 30 days, six independent replications published within two weeks. No press coverage yet.",
    claim: "Our training method reduces the compute required to reach a given capability level by 40%. The improvement is consistent across architectures, datasets, and task types in six independent evaluations.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +145, pai: "Right. NeurIPS oral, 200 citations in 30 days from researchers, six independent replications, no press hype. This is what the AlexNet pattern looks like. You caught it." },
      small: { delta: +70,  pai: "Good direction. Independent replication at this speed and scale was rare. Going bigger was warranted." },
      pass:  { delta: -90,  pai: "Six independent replications, 200 researcher citations, no press hype. This is what clean technical signal looks like." },
      bluff: { delta: -145, pai: "Independent replication from six teams is not theater. This is the opposite of a bluff — it is verified science." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2025',
    source: 'AI Lab Press Release, Investor Day',
    paiIntro: "Last round. A frontier lab announces a training breakthrough that will reduce the cost of training frontier models by 90%. Announced at investor day. No paper yet. CEO says it changes everything.",
    claim: "Our new training architecture achieves equivalent performance to current frontier models at one-tenth the compute cost. This breakthrough makes frontier AI economically viable at 10x the current scale.",
    best: 'pass',
    good: ['bluff'],
    outcomes: {
      big:   { delta: -150, pai: "Investor day, CEO announcement, no paper, no independent verification. You have seen this structure before. The 90% claim without methodology is pure hype until verified." },
      small: { delta: -60,  pai: "Wrong direction. Investor audience, CEO-led announcement, no technical paper, no replication — this is the opposite of the NeurIPS signal." },
      pass:  { delta: +120, pai: "Right. No paper, investor audience, CEO presenting. Wait for the science, not the pitch." },
      bluff: { delta: +95,  pai: "Also correct. Investor day announcements of compute breakthroughs without technical papers follow a consistent pattern." },
    },
  },
]

export default rounds
