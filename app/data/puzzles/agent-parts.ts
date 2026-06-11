import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'agent-parts',
  title: 'Agent Parts',
  groups: [
    {
      name: 'The agent perceives the world through these',
      difficulty: 1,
      cards: ['Text input', 'Web search results', 'Tool output', 'File contents'],
    },
    {
      name: 'The agent reasons using these',
      difficulty: 2,
      cards: ['Chain-of-thought', 'Scratchpad memory', 'Planning step', 'Goal decomposition'],
    },
    {
      name: 'The agent acts through these',
      difficulty: 3,
      cards: ['API call', 'Code execution', 'Browser click', 'File write'],
    },
    {
      name: 'What keeps an agent from going off-script',
      difficulty: 4,
      cards: ['Scope constraint', 'Human-in-the-loop', 'Sandboxed environment', 'Rejection threshold'],
    },
  ] as Puzzle['groups'],
}

export default puzzle
