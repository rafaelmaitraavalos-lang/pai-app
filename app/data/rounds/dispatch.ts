import type { AnalystRound } from '../analystRounds'

const rounds: AnalystRound[] = [
  // ── TRAINING ROUNDS ────────────────────────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '2017',
    source: 'Chinese State Council, Published Strategy Document',
    paiIntro: "China just released a formal national AI strategy targeting world leadership by 2030. Backed by state funding. Not a press release — a government policy document with budget allocations.",
    claim: "China's New Generation AI Development Plan commits to achieving world-leading AI capabilities by 2030, with intermediate targets in 2020 and 2025. The strategy is backed by significant central government investment.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +135, pai: "Right. State policy document with budget, not press release. Specific intermediate targets, not vague ambition. China's AI investment trajectory matched the document's intent. This was real signal." },
      small: { delta: +70,  pai: "Good direction. Government strategy with budget is different from a speech. This was real intent worth tracking." },
      pass:  { delta: -80,  pai: "State policy documents with budget allocations and intermediate targets are not press releases. China's AI build-out matched what this document described." },
      bluff: { delta: -130, pai: "This wasn't hype — it was policy. The investment that followed was consistent with the document. You missed a geopolitical signal." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '2019',
    source: 'US Department of Defense, AI Strategy',
    paiIntro: "The US Department of Defense releases an AI strategy calling AI a 'strategic necessity.' No specific budget. Principles-based. Military framing around competition with China. Is this real?",
    claim: "The United States must adopt AI to maintain military advantage. AI is a strategic necessity in an era of great power competition. The DoD will integrate AI across all warfighting domains.",
    best: 'small',
    good: ['pass'],
    outcomes: {
      big:   { delta: -80,  pai: "Strategy without specific budget allocation is intention, not commitment. US defense AI spending did grow, but the document itself was principles, not program." },
      small: { delta: +100, pai: "Right frame. Strategy document without budget is weaker signal than China's 2017 plan. The intent was real but the implementation lag was predictable." },
      pass:  { delta: +60,  pai: "Defensible. No budget means no immediate program. The intent was real but the document was principles, not resource allocation." },
      bluff: { delta: -95,  pai: "The strategic intent was genuine — US AI defense spending did accelerate after this. Calling it a bluff overstated the skepticism." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '2023',
    source: 'US Commerce Department, Export Controls Announcement',
    paiIntro: "The US announces export controls blocking advanced semiconductor chips to China. Specific chips named. Effective immediately. No consultation with allies first.",
    claim: "New export controls will prevent China from obtaining the advanced semiconductors required to train frontier AI models. This action protects US AI leadership and limits potential military applications.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +85,  pai: "Also defensible. Real legal instrument, specific chips named, immediate effect. Export controls create real friction even if they don't permanently stop capability development." },
      small: { delta: +105, pai: "Right. This was real policy with real teeth — specific chips, immediate effect, legal enforcement. The question was whether it would work long-term. A cautious stake was correct." },
      pass:  { delta: -50,  pai: "Export controls are legally binding with real enforcement. China's chip development responses showed these controls had real impact." },
      bluff: { delta: -115, pai: "Specific legal export controls on named chips are real policy instruments. This was not hype." },
    },
  },

  // ── TEST ROUNDS ──────────────────────────────────────────────────────────

  {
    id: 4,
    era: 'test',
    year: '2024',
    source: 'Tech Conference Keynote, AI CEO',
    paiIntro: "Not in your notes. A CEO says AI will end US dependence on Chinese manufacturing entirely within four years. Standing ovation. Investors in the room. No economic analysis presented.",
    claim: "AI-powered automation will make Chinese manufacturing cost advantages irrelevant within four years. American factories using AI will be more competitive than any offshore option. The era of outsourcing is over.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -150, pai: "Four-year deadline. Total certainty. Investor audience. No economic analysis. You have seen this structure before. Every time." },
      small: { delta: -55,  pai: "Wrong direction. Timeline claim plus complete certainty plus investor audience plus no supporting analysis. The structure predicts the outcome." },
      pass:  { delta: +80,  pai: "Good instinct. The correct read was bluff — the structure was textbook overclaim." },
      bluff: { delta: +130, pai: "Right. Specific timeline, total certainty, no methodology, investor audience, CEO presenting. This is the Dartmouth structure applied to geopolitics." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2024',
    source: 'EU AI Act, Enforcement Phase',
    paiIntro: "The EU begins enforcing the AI Act. First compliance deadlines hit. A major US AI company receives a warning for failing to submit required documentation for a high-risk system deployed in the EU.",
    claim: "The EU's enforcement of the AI Act on a US AI company demonstrates that extraterritorial digital regulation is viable. Other markets will follow the EU model, creating global AI governance standards.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +80,  pai: "Also defensible. The Brussels Effect — EU regulation shaping global standards — is well-documented in GDPR. AI regulation following the same pattern is a real trend." },
      small: { delta: +105, pai: "Right. First enforcement action on extraterritorial AI regulation is meaningful precedent. Not guaranteed to generalize, but real signal worth tracking." },
      pass:  { delta: -50,  pai: "First enforcement of extraterritorial regulation is real precedent. The GDPR pattern suggested this was worth a small stake." },
      bluff: { delta: -110, pai: "Actual enforcement action creating legal precedent is not theater. The Brussels Effect on digital regulation has a strong track record." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2025',
    source: 'International AI Safety Summit, Joint Statement',
    paiIntro: "Last round. Twenty-eight countries sign a joint statement on AI safety, agreeing to share safety evaluations before deploying frontier models. No enforcement. Voluntary. But the signatories include the US, UK, EU, and China.",
    claim: "The Bletchley Declaration establishes unprecedented international cooperation on AI safety. With all major AI powers participating, voluntary commitments to share safety evaluations represent a genuine governance breakthrough.",
    best: 'small',
    good: ['pass'],
    outcomes: {
      big:   { delta: -80,  pai: "Voluntary, no enforcement, but unprecedented participant list including China. This is different from industry self-governance — but it's not binding. The 'genuine breakthrough' framing overstates where it actually landed." },
      small: { delta: +100, pai: "Right frame. Unprecedented participant list including China is real signal. No enforcement means limited teeth. A cautious stake on the precedent was correct." },
      pass:  { delta: +65,  pai: "Defensible. Voluntary commitments without enforcement have a mixed track record. Your caution was reasonable." },
      bluff: { delta: -95,  pai: "Getting China and the US to sign the same AI safety statement is not theater — it was diplomatically significant even without enforcement." },
    },
  },
]

export default rounds
