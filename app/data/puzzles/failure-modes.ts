import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'failure-modes',
  title: 'Failure Modes',
  groups: [
    {
      name: 'BIASED TRAINING DATA',
      difficulty: 1,
      cards: ['Hiring tool trained on historical decisions', 'Face recognition less accurate on darker skin', 'Loan model reflects redlining patterns', 'Translation system better in English than Swahili'],
      reveal: 'Bias in the training data produces bias in the model. The system isn\'t prejudiced in a human sense — it copied patterns from data that was. Fixing the output means fixing the input.',
    },
    {
      name: 'DISTRIBUTION SHIFT',
      difficulty: 2,
      cards: ['Self-driving car trained on sunny roads fails in snow', 'Medical tool trained on one population misses diagnoses in another', 'Fraud detector misses new scam patterns', 'Content filter trained on English misreads other languages'],
      reveal: 'A model trained on one environment can fail completely in another. When real-world conditions differ from training conditions, performance drops. The model doesn\'t know it\'s out of its depth.',
    },
    {
      name: 'OVERFITTING',
      difficulty: 3,
      cards: ['Model aces training data but fails on new examples', 'Memorized test answers instead of learning concepts', 'System finds pattern specific to one dataset', 'Works perfectly in the lab, fails in the field'],
      reveal: 'Overfitting happens when a model learns the training data too well — including its noise and quirks. It performs brilliantly on what it\'s seen and struggles with anything new.',
    },
    {
      name: 'ERRORS AT SCALE',
      difficulty: 4,
      cards: ['One wrong loan decision', 'Same wrong decision made 10,000 times', 'Automated system denies benefits to thousands', 'Single bug repeated across every user'],
      reveal: 'Automation doesn\'t invent bad decisions. It mass-produces them. A flaw that affects one person when a human makes it affects everyone when a system does.',
    },
  ],
}

export default puzzle
