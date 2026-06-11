import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'transformer',
  title: 'Transformer Parts',
  groups: [
    {
      name: 'The attention mechanism',
      difficulty: 1,
      cards: ['Query vector', 'Key vector', 'Value vector', 'Attention score'],
    },
    {
      name: 'Encodes position in the sequence',
      difficulty: 2,
      cards: ['Positional encoding', 'Sinusoidal embedding', 'Rotary embedding', 'Token position index'],
    },
    {
      name: 'Processes tokens after attention',
      difficulty: 3,
      cards: ['Feed-forward layer', 'Layer normalization', 'Residual connection', 'Projection matrix'],
    },
    {
      name: 'Controls what the model can see',
      difficulty: 4,
      cards: ['Causal mask', 'Context window', 'Padding mask', 'KV cache'],
    },
  ] as Puzzle['groups'],
}

export default puzzle
