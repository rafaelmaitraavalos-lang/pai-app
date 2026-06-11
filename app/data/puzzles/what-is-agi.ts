import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'what-is-agi',
  title: 'What Is Agi',
  groups: [
    {
      name: 'AGI AS TASK PERFORMANCE',
      difficulty: 1,
      cards: ['Performs any cognitive task better than any human', 'Passes every professional licensing exam', 'Achieves superhuman scores on all academic benchmarks', 'Outperforms humans at every measurable skill'],
      reveal: 'Task-performance AGI is the most measurable definition — but also the most limited. A system could clear every benchmark and still lack something important. Critics say this definition mistakes measur',
    },
    {
      name: 'AGI AS GENERALIZATION',
      difficulty: 2,
      cards: ['Learns a new skill without being specifically trained for it', 'Transfers knowledge across completely unrelated domains', 'Adapts to novel situations without retraining', 'Solves problems in contexts it has never encountered'],
      reveal: 'Generalization AGI captures something current systems clearly lack. Today\'s AI is brittle outside its training distribution. True generalization — figuring out genuinely new situations — is what most ',
    },
    {
      name: 'AGI AS AUTONOMY',
      difficulty: 3,
      cards: ['Sets and pursues its own long-term goals', 'Operates indefinitely without human direction', 'Decides what problems are worth solving', 'Maintains consistent objectives over time without resetting'],
      reveal: 'Autonomy AGI is the definition that concerns safety researchers most. A system that sets its own goals and pursues them over time is qualitatively different from a tool that responds to prompts. No cu',
    },
    {
      name: 'AGI AS CONSCIOUSNESS',
      difficulty: 4,
      cards: ['Has subjective experience', 'Knows what it feels like to be itself', 'Has genuine understanding rather than pattern matching', 'Could suffer or flourish in a morally relevant sense'],
      reveal: 'Consciousness AGI is the most contested definition. If AI systems could genuinely experience things, it would change the ethical stakes entirely. We have no agreed way to test for this, even in humans',
    },
  ],
}

export default puzzle
