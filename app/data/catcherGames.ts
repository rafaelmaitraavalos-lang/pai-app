export interface CatcherGame {
  slug:         string
  title:        string
  intro:        string
  ctaLabel:     string
  hudLabel:     string   // what the score counter tracks
  catchLabel:   string   // button label
  dodgeLabel:   string   // button label
  catchReacts:  string[]
  dodgeReacts:  string[]
  missReacts:   string[]
  items: {
    catch: string[]
    dodge: string[]
  }
  endScreens: {
    perfect: string  // 100%
    great:   string  // 80%+
    ok:      string  // 60%+
    bad:     string  // <60%
  }
  facts: string[]
}

export const CATCHER_GAMES: Record<string, CatcherGame> = {
  'signal-drop': {
    slug:     'signal-drop',
    title:    'Signal Drop',
    intro:    'Training data incoming. AI learns from labeled examples — data where someone already marked the right answer. Raw data alone teaches nothing. Catch every labeled example. Dodge everything else.',
    ctaLabel: 'Start training',
    hudLabel: 'Clean data',
    catchLabel: 'CATCH IT',
    dodgeLabel: 'DODGE IT',
    catchReacts: [
      'Clean signal. Label confirmed.',
      'Good data. Into the set.',
      'Training improving.',
    ],
    dodgeReacts: [
      "That's noise. No label, no learning.",
      "Unlabeled. Can't train on this.",
      'Raw data. Dodge it.',
    ],
    missReacts: [
      'Lost a clean example. That one had a label.',
      'Training data gone.',
      'Missed a good signal.',
    ],
    items: {
      catch: [
        'Photo — labeled "cat"',
        'Email — labeled "spam"',
        'Scan — labeled "tumor detected"',
        'Review — labeled "positive"',
        'Audio — labeled "dog barking"',
        'Message — labeled "fraud attempt"',
        'Image — labeled "stop sign"',
        'Record — labeled "loan approved"',
        'Clip — labeled "angry tone"',
        'Frame — labeled "pedestrian"',
        'Post — labeled "misinformation"',
        'File — labeled "malware"',
        'Photo — labeled "not a cat"',
        'Email — labeled "not spam"',
        'Review — labeled "negative"',
        'Message — labeled "legitimate"',
      ],
      dodge: [
        'Unlabeled photo',
        'Raw audio file',
        'Untagged image',
        'Data with no answer',
        'Blank record',
        'File — no label',
        'Unknown signal',
        'Unmarked scan',
        'Random noise',
        'Corrupted data',
        'Missing label',
        'Ambiguous input',
        'Null value',
        'No annotation',
        'Empty field',
        'Unverified source',
      ],
    },
    endScreens: {
      perfect: 'Spotless training set. PAI learned everything it could.',
      great:   'Strong dataset. A few gaps but the model will train well.',
      ok:      'Noisy data. The model will learn some bad patterns along with the good ones.',
      bad:     'Too much noise. The model learned the wrong things. This is how bias starts.',
    },
    facts: [
      'Supervised learning uses labeled examples. Someone had to mark every single one.',
      "AI doesn't label its own training data — humans do.",
      'The labels in a training set carry the biases of whoever made them.',
      'If a human labeled something wrong, the model learns that wrong label as truth.',
      "More data doesn't fix bad data. A model is only as good as its training set.",
      "Unsupervised learning works without labels — but the model finds patterns humans never named. Someone still has to interpret what those patterns mean.",
      "Amazon's hiring tool was trained on years of real hiring decisions. The labels were real. The bias in those labels was also real. The model learned both.",
    ],
  },
}
