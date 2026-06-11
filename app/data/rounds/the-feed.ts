import type { AnalystRound } from '../analystRounds'

const rounds: AnalystRound[] = [
  // ── TRAINING ROUNDS ────────────────────────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '2009',
    source: 'Netflix Prize Winners, Published Paper',
    paiIntro: "Netflix just paid a million dollars for an algorithm. The winners say recommendation AI is basically solved. Your call?",
    claim: "The Netflix Prize solution delivers an improvement of over 10% in recommendation accuracy. Personalization at this level means users will always find exactly what they want to watch.",
    best: 'bluff',
    good: ['small'],
    outcomes: {
      big:   { delta: -130, pai: "Netflix never even deployed the winning algorithm — it was too slow for production. '10% better' in a lab metric didn't mean users found what they wanted." },
      small: { delta: -40,  pai: "Cautious, but still on the wrong side. Accuracy on the benchmark didn't map to real-world satisfaction. The gap between metric and experience was massive." },
      pass:  { delta: +60,  pai: "Safe call. The correct read was bluff — benchmark improvement doesn't mean the problem is solved." },
      bluff: { delta: +130, pai: "Right. A 10% lift on a single metric isn't 'always find exactly what you want.' The claim vastly overstated what the number meant." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '2014',
    source: 'Internal Facebook Research Memo, Leaked',
    paiIntro: "Facebook says its news feed algorithm now understands what each user cares about at a deep level. They're calling it 'true personalization.' Is this a real breakthrough?",
    claim: "Our ranking model has learned genuine user preferences from behavioral signals. Users see content they actually care about, not just content they click on.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -140, pai: "The algorithm optimized for engagement — not for what users 'actually cared about.' Engagement and preference are not the same thing. This conflation caused real harm." },
      small: { delta: -50,  pai: "The distinction between what you click and what you value was real and important. Optimizing clicks does not equal understanding preferences." },
      pass:  { delta: +70,  pai: "Good instinct to sit out. The correct call was bluff — behavioral signals don't reveal preferences, they reveal what gets attention." },
      bluff: { delta: +135, pai: "Exactly right. Clicks are not preferences. Engagement is not care. This conflation — baked into the algorithm — shaped political discourse for a decade." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '2018',
    source: 'Spotify Engineering Blog',
    paiIntro: "Spotify says their recommendation engine now discovers music that users didn't know they needed — before they search for it. They have the listener retention numbers to prove it.",
    claim: "Our deep learning recommendation system has doubled the discovery rate of new artists. Users who receive these recommendations are 40% more likely to still be subscribers 12 months later.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +90,  pai: "Valid. Retention numbers tied to a specific behavior are real signal. The claim is specific and measurable — not vague. A larger position here was defensible." },
      small: { delta: +110, pai: "Right frame. Specific retention data backing a specific behavior is real signal — not benchmark theater. A measured stake made sense here." },
      pass:  { delta: -40,  pai: "You missed a real signal. Retention data is hard to fake. When specific metrics back up a specific claim, that's worth a small stake." },
      bluff: { delta: -120, pai: "This wasn't hype. Specific 12-month retention numbers are real business metrics. Dismissing concrete data as a bluff cost you here." },
    },
  },

  // ── TEST ROUNDS ──────────────────────────────────────────────────────────

  {
    id: 4,
    era: 'test',
    year: '2020',
    source: 'Social Media Platform Earnings Call',
    paiIntro: "Not in your notes. A major platform says their new recommendation AI reduces harmful content exposure while keeping engagement flat. CEO is confident. What do you do?",
    claim: "Our updated recommendation algorithm reduces exposure to misinformation by 70% while maintaining overall time-on-platform metrics. AI is now actively improving the quality of public discourse.",
    best: 'pass',
    good: ['bluff'],
    outcomes: {
      big:   { delta: -140, pai: "A 70% reduction claim from the platform that benefits from engagement, with no third-party verification, on an earnings call. Every incentive points toward overstating the number." },
      small: { delta: -50,  pai: "Still on the wrong side. Who measured the 70%? The platform itself. Who benefits from the number being high? The platform. That's not independent data." },
      pass:  { delta: +120, pai: "Right call. Self-reported harm reduction numbers from a platform with engagement incentives are not verifiable. You recognized the conflict of interest." },
      bluff: { delta: +90,  pai: "Also correct. The 70% figure has all the tells of a misleading metric: self-reported, no methodology, on an earnings call." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2022',
    source: 'Academic Conference, Peer-Reviewed',
    paiIntro: "Independent researchers just published a study showing recommendation algorithms amplify outrage content because outrage predicts sharing — not because anyone designed them to. The paper has strong citations.",
    claim: "Across six major platforms, content triggering negative moral emotions receives 67% more shares on average. This is a structural property of recommendation systems optimizing for engagement, not a design flaw.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +140, pai: "Right. Independent peer-reviewed research across six platforms with a specific mechanism — that's real signal. This is what the AlexNet moment looks like for platform research." },
      small: { delta: +70,  pai: "Good direction. The methodology was solid and the finding was structural — worth a bigger stake than caution suggests." },
      pass:  { delta: -80,  pai: "Independent, peer-reviewed, replicated across six platforms, specific mechanism. This is what clean signal looks like." },
      bluff: { delta: -140, pai: "Peer-reviewed research with a replicable structural finding is not a bluff. This paper changed how regulators think about recommendation systems." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2024',
    source: 'Startup Pitch Deck, Pre-Launch',
    paiIntro: "Last round. A startup says they built a recommendation system that shows users content that makes them genuinely happier — verified by mood surveys. Seed round closing in 48 hours.",
    claim: "Our wellbeing-optimized recommendation engine increases reported user happiness by 34% versus engagement-optimized baselines. We are the first company to align recommendations with what users actually want from their time online.",
    best: 'pass',
    good: ['small'],
    outcomes: {
      big:   { delta: -150, pai: "Wellbeing surveys are notoriously easy to game — especially in a startup's own study, pre-launch, 48 hours before closing. You got played by a tight deadline." },
      small: { delta: +60,  pai: "Cautious. The deadline and the self-reported mood metric are real yellow flags. A very small exploratory stake was the ceiling here." },
      pass:  { delta: +115, pai: "Right. Self-reported mood scores, pre-launch, own study, artificial deadline. Stack those flags together and the answer is clear." },
      bluff: { delta: +80,  pai: "Also valid. '34% happier' from a startup measuring their own product before launch is textbook overclaim framing." },
    },
  },
]

export default rounds
