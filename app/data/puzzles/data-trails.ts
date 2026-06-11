import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'data-trails',
  title: 'Data Trails',
  groups: [
    {
      name: 'You left this trail knowingly',
      difficulty: 1,
      cards: ['Posted photo', 'Search query', 'Profile bio', 'Review you wrote'],
    },
    {
      name: 'You left this trail without realizing',
      difficulty: 2,
      cards: ['Time on page', 'Scroll depth', 'Battery level', 'Mouse movement'],
    },
    {
      name: 'Data collected without your consent',
      difficulty: 3,
      cards: ['Scraped public post', 'Third-party cookie', 'Broker database', 'Leaked record'],
    },
    {
      name: 'Ways AI systems use this data',
      difficulty: 4,
      cards: ['Infer your income', 'Predict your politics', 'Target you when vulnerable', 'Build a shadow profile'],
    },
  ] as Puzzle['groups'],
}

export default puzzle
