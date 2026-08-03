// ─────────────────────────────────────────────────────────────────────────────
// CONNECTIONS PUZZLE — middle-school level, approved by Sonali 2026-08-01.
// (Replaced the original graduate-level puzzle: "RAG pipeline", "Attention
// heads" etc. — see PAI-suggested-connections-puzzle.md for the review trail.)
//
// Contract:
//   • Exactly 4 groups, each with exactly 4 cards (strings).
//   • difficulty 1–4 controls the row colour: 1=yellow 2=green 3=blue 4=purple.
//   • Cards should be short enough to read on a small tile (≤ 4–5 words).
//
// Every concept below already appears in the middle-school curriculum
// (Worlds 201/261 and the glossary) — nothing here is new material.
// ─────────────────────────────────────────────────────────────────────────────

import type { Puzzle } from '../components/ConnectionsGame'

const samplePuzzle: Puzzle = {
  id: 'spot-the-ai',
  title: 'Spot the AI',
  groups: [
    {
      name: 'Things AI is great at',
      difficulty: 1,
      cards: [
        'Spotting patterns',
        'Translating languages',
        'Recommending videos',
        'Finding spam',
      ],
    },
    {
      name: 'Things AI struggles with',
      difficulty: 2,
      cards: [
        "Knowing what's true",
        'Common sense',
        'Feelings',
        'Very new events',
      ],
    },
    {
      name: 'Where AI hides in your day',
      difficulty: 3,
      cards: [
        'Autocomplete',
        'Face unlock',
        'Music shuffle',
        'Map directions',
      ],
    },
    {
      name: 'People from AI history',
      difficulty: 4,
      cards: [
        'Alan Turing',
        'Ada Lovelace',
        'John McCarthy',
        'Garry Kasparov',
      ],
    },
  ],
}

export default samplePuzzle
