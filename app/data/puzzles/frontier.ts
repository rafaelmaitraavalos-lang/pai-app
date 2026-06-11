import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'frontier',
  title: 'Frontier Concepts',
  groups: [
    {
      name: 'How frontier models are trained',
      difficulty: 1,
      cards: ['RLHF', 'Constitutional AI', 'Pretraining at scale', 'Instruction tuning'],
    },
    {
      name: 'What makes a model "frontier"',
      difficulty: 2,
      cards: ['State-of-the-art benchmarks', 'Massive parameter count', 'Broad capability range', 'Proprietary training data'],
    },
    {
      name: 'Risks specific to frontier models',
      difficulty: 3,
      cards: ['Emergent deception', 'Weapons uplift', 'Capability overhang', 'Alignment regression'],
    },
    {
      name: 'Why frontier labs operate at the frontier',
      difficulty: 4,
      cards: ['Safety by leading', 'Race dynamics', 'Benchmark pressure', 'Capital requirements'],
    },
  ] as Puzzle['groups'],
}

export default puzzle
