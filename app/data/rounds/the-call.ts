import type { AnalystRound } from '../analystRounds'

const rounds: AnalystRound[] = [
  // ── TRAINING ROUNDS ────────────────────────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '2013',
    source: 'MOOCs Conference Keynote, Coursera Co-founder',
    paiIntro: "Massive Open Online Courses just launched. The founder says AI-powered education will democratize access to elite learning for everyone on Earth. Is this a real shift?",
    claim: "Within five years, Coursera will deliver an Ivy League education to anyone with an internet connection. AI tutoring will replace expensive private instruction worldwide.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -130, pai: "MOOC completion rates averaged under 10%. Access without support, accountability, or credentials didn't replace anything. The claim overstated the mechanism." },
      small: { delta: -45,  pai: "Still wrong direction. Completion data was bad from the start. 'Access' without support and verification isn't the same as education." },
      pass:  { delta: +70,  pai: "Safe call. The correct read was bluff — access to content is not the same as education. That gap was foreseeable." },
      bluff: { delta: +130, pai: "Right. Completion rates, credentials, social support, and accountability all matter. Providing video access isn't the same as education. Foreseeable from day one." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '2017',
    source: 'EdTech Startup, Series A Announcement',
    paiIntro: "An adaptive learning startup just raised $40M. Their AI adjusts lesson difficulty in real time for each student. Pilot results show grade improvements. Is this a real signal?",
    claim: "Our adaptive AI system improved standardized test scores by an average of 23% across 12 pilot schools. Students using the platform learn the same material 40% faster than traditional instruction.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +80,  pai: "Also defensible. Controlled pilot data with specific outcome measures from real schools is meaningful. Though 12 schools isn't generalizable, the signal was real." },
      small: { delta: +115, pai: "Right call. Real school pilots, specific outcome data, controlled comparison — this is different from marketing copy. A careful stake was warranted." },
      pass:  { delta: -40,  pai: "You missed a real signal. Twelve-school pilots with specific test score data are different from self-reported mood surveys. This warranted a small stake." },
      bluff: { delta: -110, pai: "Randomized pilot data from twelve schools is not a bluff. Calling skepticism here cost you a real early-stage signal." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '2021',
    source: 'National Education Technology Report',
    paiIntro: "A government report finds that AI tutoring systems in underfunded schools are widening achievement gaps rather than closing them. The data covers three years and 300 schools.",
    claim: "AI tutoring deployments in low-income school districts show worse outcomes than comparable districts without AI tools. Students in higher-income districts using the same tools show positive gains.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +140, pai: "Right. Three years, 300 schools, government dataset — clean longitudinal signal. And the finding is counterintuitive: AI that helps in one context hurts in another. That's important." },
      small: { delta: +70,  pai: "Good direction. Scale and methodology were strong here. The counterintuitive finding — AI widening gaps — was real signal worth a bigger stake." },
      pass:  { delta: -90,  pai: "Three-year government study covering 300 schools is about as clean as education data gets. This was real signal, not noise." },
      bluff: { delta: -140, pai: "Longitudinal government data across 300 schools is not a bluff. This was one of the most important findings in EdTech research." },
    },
  },

  // ── TEST ROUNDS ──────────────────────────────────────────────────────────

  {
    id: 4,
    era: 'test',
    year: '2023',
    source: 'Major AI Company Blog Post',
    paiIntro: "Not in your notes. An AI lab says their tutoring chatbot has the same impact on math scores as a human tutor — at zero marginal cost. They have controlled study data.",
    claim: "In a randomized controlled trial, students using our AI tutor improved math scores by 0.3 standard deviations — equivalent to the effect size of a human tutor — at essentially zero cost per student.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +85,  pai: "Also defensible. Randomized controlled trial, specific effect size, comparison to established benchmark. This is real methodology. Going bigger was reasonable." },
      small: { delta: +110, pai: "Right. RCT, specific effect size, cost comparison — that's real evidence. Not deploying at scale, not making promises, just data. A measured stake made sense." },
      pass:  { delta: -50,  pai: "A randomized controlled trial with a specific, measurable effect size is not the same as a press release. This warranted a stake." },
      bluff: { delta: -120, pai: "RCT methodology with a 0.3 SD effect size is not theater. You overcorrected your skepticism here." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2024',
    source: 'EdTech Conference Keynote',
    paiIntro: "A CEO says their AI will replace teachers within seven years. Standing ovation. Investors are in the room. No data presented — just a demo and a vision.",
    claim: "By 2031, AI will make human teachers obsolete in core academic subjects. Our system already outperforms average teachers on standardized metrics. Schools that don't adopt AI will fall behind permanently.",
    best: 'pass',
    good: ['bluff'],
    outcomes: {
      big:   { delta: -160, pai: "Timeline claim plus complete certainty plus investor audience plus no data plus demo only. Every flag was flying. You missed all of them." },
      small: { delta: -60,  pai: "Even a small stake on this structure loses. 'Replace teachers by 2031' with no methodology, at a conference, with investors present." },
      pass:  { delta: +120, pai: "Right. Specific future timeline, no supporting data, investor audience, demo not product. Classic overclaim structure. You recognized it." },
      bluff: { delta: +90,  pai: "Correct. This hits every bluff marker: certainty without evidence, deadline without accountability, audience with financial incentive." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2025',
    source: 'Independent Research Institute',
    paiIntro: "Last round. Researchers publish evidence that AI tutoring tools widen equity gaps because the students who benefit most already have tech access, parental support, and strong baseline skills.",
    claim: "Across 14 countries and 40,000 students, AI tutoring tools show consistent positive effects for students above the median in prior achievement and consistent null or negative effects for students below it.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +145, pai: "Right. Independent research, 14 countries, 40,000 students, consistent finding across contexts. And the finding — AI advantages the advantaged — is structurally important. This was the moment to commit." },
      small: { delta: +70,  pai: "Good call, but too cautious. Scale and independence here were exceptional. This is the kind of finding that reshapes policy." },
      pass:  { delta: -85,  pai: "Cross-country, independent, large sample, replicable finding. This was real signal at scale." },
      bluff: { delta: -140, pai: "Fourteen countries, 40,000 students, independent institute. The methodology was bulletproof. You let skepticism override the evidence." },
    },
  },
]

export default rounds
