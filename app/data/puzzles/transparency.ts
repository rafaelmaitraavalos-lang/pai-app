import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'transparency',
  title: 'Transparency Types',
  groups: [
    {
      name: 'You can see what the model learned',
      difficulty: 1,
      cards: ['Feature importance', 'Attention weights', 'Saliency map', 'Decision tree rules'],
    },
    {
      name: 'Explained after the fact',
      difficulty: 2,
      cards: ['LIME explanation', 'SHAP values', 'Counterfactual reason', 'Post-hoc justification'],
    },
    {
      name: 'Transparency that is actually theater',
      difficulty: 3,
      cards: ['Unread model card', 'Jargon-filled audit', 'Accuracy metric only', 'Summary without access'],
    },
    {
      name: 'Things no explanation can give you',
      difficulty: 4,
      cards: ['Why this specific output', 'What training data shaped it', 'Whether it will generalize', 'Proof it is fair'],
    },
  ] as Puzzle['groups'],
}

export default puzzle
