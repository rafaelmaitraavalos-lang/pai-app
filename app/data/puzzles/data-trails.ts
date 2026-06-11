import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'data-trails',
  title: 'Data Trails',
  groups: [
    {
      name: 'WHAT YOU DID',
      difficulty: 1,
      cards: ['Search history', 'Purchase records', 'Watch history', 'Click patterns'],
      reveal: 'Behavioral data is what you actually did. It\'s the most valuable kind because behavior predicts future behavior. Companies don\'t need to know who you are to predict what you\'ll do next.',
    },
    {
      name: 'WHERE YOU WERE',
      difficulty: 2,
      cards: ['GPS coordinates', 'Cell tower pings', 'WiFi connection logs', 'Check-in history'],
      reveal: 'Location data seems harmless one point at a time. A long record of where you\'ve been reveals where you live, where you work, who you meet, and when you\'re away from home.',
    },
    {
      name: 'WHO YOU ARE',
      difficulty: 3,
      cards: ['Name and date of birth', 'Government ID number', 'Biometric scan', 'Home address'],
      reveal: 'Identity data links everything else to a specific person. On its own it\'s just a record. Combined with behavioral or location data, it turns patterns into a profile.',
    },
    {
      name: 'WHAT YOU MIGHT BE',
      difficulty: 4,
      cards: ['Predicted political views', 'Inferred health condition', 'Estimated income bracket', 'Modeled emotional state'],
      reveal: 'Inferred data is what a system guessed about you from everything else. You never said it. The system calculated it. These predictions can be wrong — and they can still follow you into loan decisions, ',
    },
  ],
}

export default puzzle
