import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'static',
  title: 'Static',
  groups: [
    {
      name: 'AI makes things up',
      difficulty: 1,
      cards: ['Hallucination', 'Confident nonsense', 'Fake citations', 'Invented facts'],
    },
    {
      name: 'AI misses the point',
      difficulty: 2,
      cards: ['Wrong tone', 'Off-topic output', 'Misread instructions', 'Ignored context'],
    },
    {
      name: 'AI locks onto patterns badly',
      difficulty: 3,
      cards: ['Spurious correlation', 'Overfitting', 'Distribution shift', 'Shortcut learning'],
    },
    {
      name: 'AI fails on edge cases',
      difficulty: 4,
      cards: ['Out-of-distribution input', 'Adversarial example', 'Rare class failure', 'Long-tail blindspot'],
    },
  ] as Puzzle['groups'],
}

export default puzzle
