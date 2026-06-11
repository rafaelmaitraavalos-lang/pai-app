import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'what-is-agi',
  title: 'What Is AGI',
  groups: [
    {
      name: 'Things narrow AI can already do',
      difficulty: 1,
      cards: ['Win at chess', 'Detect tumors', 'Translate text', 'Generate images'],
    },
    {
      name: 'What AGI would require',
      difficulty: 2,
      cards: ['Transfer learning broadly', 'Reason about new domains', 'Set its own goals', 'Adapt without retraining'],
    },
    {
      name: 'Common misconceptions about AGI',
      difficulty: 3,
      cards: ['It needs a body', 'It must feel emotions', 'It will arrive all at once', 'It equals superintelligence'],
    },
    {
      name: 'Why researchers disagree on AGI',
      difficulty: 4,
      cards: ['No agreed definition', 'Benchmark keeps moving', 'Intelligence is contested', 'Goals differ by lab'],
    },
  ] as Puzzle['groups'],
}

export default puzzle
