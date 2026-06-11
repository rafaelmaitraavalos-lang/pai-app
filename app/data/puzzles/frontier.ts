import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'frontier',
  title: 'Frontier Concepts',
  groups: [
    {
      name: 'MIXTURE OF EXPERTS',
      difficulty: 1,
      cards: ['Only a fraction of parameters activate for any given input', 'Scales model capacity without proportionally scaling compute', 'Different inputs route to different specialized subnetworks', 'Allows a trillion-parameter model to run at the cost of a much smaller one'],
      reveal: 'Mixture of Experts lets you build enormous models without paying full compute cost on every inference. A 1-trillion-parameter MoE model might activate only 100 billion parameters per forward pass. Thi',
    },
    {
      name: 'REASONING MODELS',
      difficulty: 2,
      cards: ['Allocates extra compute to think before responding', 'Produces internal chain-of-thought before giving an answer', 'Trades latency for accuracy on hard problems', 'Significantly outperforms standard models on math and science'],
      reveal: 'Reasoning models don\'t just generate the best immediate response — they generate the best considered response. They spend compute on internal reasoning the user never sees, then produce an answer. Slo',
    },
    {
      name: 'INFERENCE OPTIMIZATION',
      difficulty: 3,
      cards: ['Quantization reduces the precision of model weights', 'Distillation trains a small model to mimic a large one', 'Speculative decoding generates multiple tokens in parallel', 'KV caching avoids recomputing the same context repeatedly'],
      reveal: 'Training a frontier model is expensive but happens once. Inference happens billions of times per day. Making inference faster and cheaper determines which AI applications are economically viable. A mo',
    },
    {
      name: 'CAPABILITY OVERHANG',
      difficulty: 4,
      cards: ['Capabilities in current models that haven\'t been fully discovered yet', 'Improvements from better prompting without retraining', 'Emergent abilities that appear at certain scales without being explicitly trained', 'Underexplored applications of already-deployed models'],
      reveal: 'Capability overhang means the models we have now are probably more capable than we currently use them for. As prompting techniques improve and researchers probe models more systematically, previously ',
    },
  ],
}

export default puzzle
