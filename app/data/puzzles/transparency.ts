import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'transparency',
  title: 'Transparency Types',
  groups: [
    {
      name: 'WHAT THE SYSTEM WAS TRAINED ON',
      difficulty: 1,
      cards: ['What datasets were used', 'Whether copyrighted material was included', 'Which languages were represented', 'Whether the data was collected with consent'],
      reveal: 'Training data transparency is about where the system came from — what it learned from, whose work it absorbed, and whether those people knew. This is what writers, artists, and musicians are asking fo',
    },
    {
      name: 'HOW THE SYSTEM MAKES DECISIONS',
      difficulty: 2,
      cards: ['Which features influenced this output', 'Why this loan was denied', 'What the model is optimizing for', 'How confident the model was'],
      reveal: 'Decision transparency is what affected individuals want — a meaningful explanation of why the system did what it did to them. It\'s technically the hardest kind to provide for large neural networks.',
    },
    {
      name: 'WHO CONTROLS THE SYSTEM',
      difficulty: 3,
      cards: ['Which company owns the model', 'Who can modify its behavior', 'Which governments can compel access to outputs', 'Who can turn it off'],
      reveal: 'Control transparency is about power — who has it, who doesn\'t, and whether there are meaningful checks. This is what governance researchers and civil society organizations focus on.',
    },
    {
      name: 'WHERE THE SYSTEM HAS FAILED',
      difficulty: 4,
      cards: ['Known error rates by demographic', 'Documented cases of harmful output', 'Complaints received and outcomes', 'Past versions that were pulled back'],
      reveal: 'Failure transparency is about accountability — what went wrong, who was affected, and what happened next. Companies have the most incentive to hide it.',
    },
  ],
}

export default puzzle
