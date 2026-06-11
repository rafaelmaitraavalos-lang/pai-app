import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'failure-modes',
  title: 'Failure Modes',
  groups: [
    {
      name: 'The model learned the wrong thing',
      difficulty: 1,
      cards: ['Spurious correlation', 'Shortcut learning', 'Label noise', 'Overfitting'],
    },
    {
      name: 'The world changed after training',
      difficulty: 2,
      cards: ['Distribution shift', 'Concept drift', 'Stale data', 'Deployment gap'],
    },
    {
      name: 'The model doubles down on errors',
      difficulty: 3,
      cards: ['Feedback loop', 'Amplified bias', 'Recidivism trap', 'Self-fulfilling prediction'],
    },
    {
      name: 'Nobody knows why it failed',
      difficulty: 4,
      cards: ['Black box opacity', 'Post-hoc rationalization', 'Irreproducible result', 'Unexplained regression'],
    },
  ] as Puzzle['groups'],
}

export default puzzle
