// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE PUZZLE — swap this object out for any 4-group, 16-card puzzle.
//
// Contract:
//   • Exactly 4 groups, each with exactly 4 cards (strings).
//   • difficulty 1–4 controls the row colour: 1=yellow 2=green 3=blue 4=purple.
//   • Cards should be short enough to read on a small tile (≤ 4–5 words).
// ─────────────────────────────────────────────────────────────────────────────

import type { Puzzle } from '../components/ConnectionsGame'

const samplePuzzle: Puzzle = {
  id: 'ai-reality-check',
  title: 'AI Reality Check',
  groups: [
    {
      name: 'What a language model actually does',
      difficulty: 1,
      cards: [
        'Predicts next tokens',
        'Samples from distributions',
        'Compresses training data',
        'Matches learned patterns',
      ],
    },
    {
      name: 'Things that reduce hallucination',
      difficulty: 2,
      cards: [
        'RAG pipeline',
        'Lower temperature',
        'Citing sources',
        'Constitutional AI',
      ],
    },
    {
      name: 'Parts of a transformer',
      difficulty: 3,
      cards: [
        'Attention heads',
        'Feed-forward layers',
        'Positional encodings',
        'Layer normalization',
      ],
    },
    {
      name: 'Things AI fundamentally lacks',
      difficulty: 4,
      cards: [
        'True understanding',
        'Genuine memory',
        'Physical senses',
        'Real intentions',
      ],
    },
  ],
}

export default samplePuzzle
