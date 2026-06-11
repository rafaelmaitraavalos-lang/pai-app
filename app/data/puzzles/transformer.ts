import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'transformer',
  title: 'Transformer Parts',
  groups: [
    {
      name: 'WHAT ATTENTION DOES',
      difficulty: 1,
      cards: ['Decides which tokens are most relevant to the current one', 'Allows every position to look at every other position', 'Computes relationships across the full sequence at once', 'Weights the importance of different parts of the input'],
      reveal: 'Attention lets every token in a sequence directly consider every other token simultaneously. This is why transformers handle long-range dependencies better than earlier architectures. Instead of proce',
    },
    {
      name: 'WHAT POSITIONAL ENCODING DOES',
      difficulty: 2,
      cards: ['Tells the model where in the sequence each token is', 'Injects order information since attention has none', 'Allows the model to distinguish first token from last', 'Encodes sequence position as part of the input representation'],
      reveal: 'Attention by itself has no sense of order — it treats a sequence as a set. Positional encoding adds that information back in. Without it, "the cat sat on the mat" and "the mat sat on the cat" would lo',
    },
    {
      name: 'WHAT THE FEED-FORWARD LAYERS DO',
      difficulty: 3,
      cards: ['Applies the same transformation to each token independently', 'Stores factual knowledge learned during training', 'Transforms each position after attention has run', 'Adds depth and nonlinearity after the attention computation'],
      reveal: 'After attention mixes information across positions, feed-forward layers process each position independently. Researchers believe much of the factual knowledge stored in large language models lives in ',
    },
    {
      name: 'WHAT LAYER NORMALIZATION DOES',
      difficulty: 4,
      cards: ['Stabilizes activations before they reach the next layer', 'Prevents values from growing too large or collapsing to zero', 'Normalizes each layer\'s output to a consistent scale', 'Helps gradients flow during training without exploding or vanishing'],
      reveal: 'Layer normalization keeps the numbers in each layer within a range that allows stable training. Most modern transformers apply it before attention and before the feed-forward layers. Invisible when it',
    },
  ],
}

export default puzzle
