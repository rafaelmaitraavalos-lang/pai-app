import type { AnalystRound } from '../analystRounds'

const rounds: AnalystRound[] = [
  // ── TRAINING ROUNDS ────────────────────────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '2016',
    source: 'Autonomous Vehicle Company, Public Announcement',
    paiIntro: "A self-driving car company says they are ready to put vehicles on public roads with no safety driver. They have 2 million miles of testing. Government hasn't approved it. They're doing it anyway.",
    claim: "With over 2 million miles logged and no fatal accidents in testing, our system has demonstrated sufficient safety for unsupervised public deployment. Waiting for regulation delays the safety benefits for everyone.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -140, pai: "2 million test miles in controlled conditions is not the same as all conditions. The company later had a fatal accident in unsupervised deployment. You should have read the incentive structure." },
      small: { delta: -50,  pai: "Wrong direction. Self-declared readiness, skipping regulatory process, 'we know better than oversight' framing — those are the tells." },
      pass:  { delta: +75,  pai: "Safe. The correct call was bluff — companies declaring their own products safe without independent review have a predictable track record." },
      bluff: { delta: +130, pai: "Right. Self-declared safety, no third-party verification, bypassing oversight 'for the greater good' — that is the exact logic that precedes preventable accidents." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '2019',
    source: 'Social Media Company, Internal Safety Review',
    paiIntro: "An internal safety team at a major platform flags that their recommendation algorithm may be increasing polarization and teen depression rates. Leadership decides to ship an update anyway. The team is not public.",
    claim: "After reviewing internal research suggesting potential harms, we have determined that the benefits of deployment outweigh the risks. Our safety processes have been followed. The product is ready to ship.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -145, pai: "Internal review by the team with commercial interest in the outcome is not independent safety review. 'Benefits outweigh risks' without disclosed methodology is a shield, not an analysis." },
      small: { delta: -55,  pai: "Still wrong. When the safety review is internal, non-public, and ends with 'ship it,' the review is part of the product, not the check on the product." },
      pass:  { delta: +70,  pai: "Good instinct. The correct call was bluff — internal review with no external oversight and no public disclosure is not a safety process." },
      bluff: { delta: +135, pai: "Exactly right. The whistleblowers later confirmed what the structure predicted: the internal research was suppressed. You read the incentives." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '2021',
    source: 'AI Medical Device Company, Press Release',
    paiIntro: "A company launches an FDA-cleared AI diagnostic tool for skin cancer detection. The FDA clearance was based on validation data. Independent doctors report lower accuracy in clinical practice. What do you do?",
    claim: "Our FDA-cleared AI achieves 95% sensitivity in detecting melanoma in controlled validation studies, matching board-certified dermatologists. This technology will save lives by expanding access to expert-level diagnosis.",
    best: 'small',
    good: ['pass'],
    outcomes: {
      big:   { delta: -90,  pai: "FDA clearance plus validation data is real — but the performance gap between validation and clinical practice was already appearing. A large stake on this trajectory had hidden risk." },
      small: { delta: +100, pai: "Right frame. FDA clearance is real signal. The clinical performance gap is a known risk. A cautious position pending real-world outcome data was correct." },
      pass:  { delta: +60,  pai: "Defensible. The gap between validation accuracy and clinical accuracy in medical AI was real and documented. Your caution was justified." },
      bluff: { delta: -105, pai: "FDA clearance and validation data are not theater — they represent a real process. The clinical gap was a limitation, not evidence that the whole product was fake." },
    },
  },

  // ── TEST ROUNDS ──────────────────────────────────────────────────────────

  {
    id: 4,
    era: 'test',
    year: '2023',
    source: 'AI Lab, Red Team Report',
    paiIntro: "Not in your notes. An AI lab publishes a red team report before deploying their model. The report identifies several failure modes — none catastrophic — and they deploy anyway with stated mitigations.",
    claim: "Our red team identified risks including jailbreaks, misinformation generation, and misuse in targeted harassment campaigns. We assessed these risks as manageable and within acceptable thresholds for deployment.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +80,  pai: "Also defensible. Transparent red team publication with specific findings and stated mitigations is different from internal review without disclosure. The honesty was signal." },
      small: { delta: +105, pai: "Right. Public red team report with specific identified risks and disclosed mitigations is genuinely more responsible than 'our process was followed.' A stake on this approach made sense." },
      pass:  { delta: -45,  pai: "Transparent red teaming is exactly the responsible building process. Disclosing findings and mitigations publicly is different from internal-only review." },
      bluff: { delta: -110, pai: "Public disclosure of known risks and mitigations is the opposite of bluffing. This was responsible process, however imperfect." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2024',
    source: 'AI Startup, Product Hunt Launch',
    paiIntro: "A startup launches an AI mental health companion on Product Hunt. No clinical validation. No therapist oversight. They say it helps people feel less lonely based on user reviews. 50,000 users in one week.",
    claim: "Our AI companion has helped 50,000 people feel less lonely in one week based on in-app feedback. Mental health is in crisis and we believe waiting for clinical validation delays help that people need now.",
    best: 'pass',
    good: ['bluff'],
    outcomes: {
      big:   { delta: -155, pai: "Unvalidated mental health intervention, no clinical oversight, 'we believe' safety framing, self-selected user reviews as evidence. You funded harm at scale." },
      small: { delta: -65,  pai: "Wrong direction. In-app feedback from self-selected users is not clinical evidence. Mental health interventions without oversight have specific documented risks." },
      pass:  { delta: +115, pai: "Right. No clinical validation, no oversight, mental health context, evidence from self-selected reviews. The responsible answer here was to wait for real evidence." },
      bluff: { delta: +90,  pai: "Correct. User review evidence in a mental health app without clinical oversight is not safety validation. Several incidents followed similar launches." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2025',
    source: 'Third-Party Audit Firm, Published Report',
    paiIntro: "Last round. An independent auditing firm publishes a safety report on a deployed AI system. Methodology is public, company provided full access, findings are mixed — some mitigations working, some not.",
    claim: "Independent audit confirms the system meets safety standards in six of eight evaluated categories. Two categories — long-term user manipulation and demographic performance gaps — require further remediation before full deployment.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +140, pai: "Right. Independent auditor, public methodology, company provided access, mixed findings honestly reported. This is what legitimate oversight looks like. The two unresolved categories are honest, not fatal — they show the process is working." },
      small: { delta: +70,  pai: "Good direction. Independent audit with honest mixed findings is rare and valuable. Going bigger here was warranted." },
      pass:  { delta: -90,  pai: "Independent audit with public methodology and honest disclosure of unresolved issues is exactly the signal responsible deployment produces. You missed it." },
      bluff: { delta: -140, pai: "A third-party audit with disclosed methodology, company access, and honest mixed findings is not theater. This is what the infrastructure of trust looks like." },
    },
  },
]

export default rounds
