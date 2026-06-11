export type GameType = 'interstitial' | 'catcher' | 'connections'

export interface GameDef {
  slug: string
  title: string
  world: number
  module: number
  type: GameType
  built: boolean
}

export const GAMES: GameDef[] = [
  // World 1
  { slug: 'analyst',       title: 'The Analyst',        world: 1, module: 1, type: 'interstitial', built: true  },
  { slug: 'signal-drop',   title: 'Signal Drop',        world: 1, module: 3, type: 'catcher',      built: true  },
  { slug: 'static',        title: 'Static',             world: 1, module: 6, type: 'connections',  built: true  },

  // World 2
  { slug: 'weight-room',   title: 'Weight Room',        world: 2, module: 2, type: 'catcher',      built: true  },
  { slug: 'the-feed',      title: 'The Feed',           world: 2, module: 5, type: 'interstitial', built: true  },
  { slug: 'failure-modes', title: 'Failure Modes',      world: 2, module: 8, type: 'connections',  built: true  },

  // World 3
  { slug: 'daily-scan',    title: 'Daily Scan',         world: 3, module: 8, type: 'catcher',      built: true  },
  { slug: 'data-trails',   title: 'Data Trails',        world: 3, module: 3, type: 'connections',  built: true  },
  { slug: 'the-call',      title: 'The Call',           world: 3, module: 5, type: 'interstitial', built: true  },

  // World 4
  { slug: 'the-framework', title: 'The Framework',      world: 4, module: 1, type: 'interstitial', built: true  },
  { slug: 'bias-sources',  title: 'Bias Sources',       world: 4, module: 2, type: 'catcher',      built: true  },
  { slug: 'transparency',  title: 'Transparency Types', world: 4, module: 5, type: 'connections',  built: true  },

  // World 5
  { slug: 'can-or-cant',   title: "Can or Can't",       world: 5, module: 1, type: 'catcher',      built: true  },
  { slug: 'what-is-agi',   title: 'What Is AGI',        world: 5, module: 2, type: 'connections',  built: true  },
  { slug: 'the-resource',  title: 'The Resource',       world: 5, module: 4, type: 'interstitial', built: true  },

  // World 6
  { slug: 'signal-flow',   title: 'Signal Flow',        world: 6, module: 2, type: 'catcher',      built: true  },
  { slug: 'the-gradient',  title: 'The Gradient',       world: 6, module: 4, type: 'interstitial', built: true  },
  { slug: 'transformer',   title: 'Transformer Parts',  world: 6, module: 7, type: 'connections',  built: true  },

  // World 7
  { slug: 'prompt-drop',   title: 'Prompt Drop',        world: 7, module: 2, type: 'catcher',      built: true  },
  { slug: 'agent-parts',   title: 'Agent Parts',        world: 7, module: 6, type: 'connections',  built: true  },
  { slug: 'ship-it',       title: 'Ship It',            world: 7, module: 8, type: 'interstitial', built: true  },

  // World 8
  { slug: 'multimodal',    title: 'Multimodal',         world: 8, module: 1, type: 'catcher',      built: true  },
  { slug: 'frontier',      title: 'Frontier Concepts',  world: 8, module: 3, type: 'connections',  built: true  },
  { slug: 'dispatch',      title: 'Dispatch',           world: 8, module: 7, type: 'interstitial', built: true  },
]

export const TYPE_LABEL: Record<GameType, string> = {
  interstitial: 'Decide',
  catcher:      'Catch',
  connections:  'Group',
}

export const TYPE_LABEL_PT: Record<GameType, string> = {
  interstitial: 'Decidir',
  catcher:      'Pegar',
  connections:  'Agrupar',
}

export const GAME_TITLES_PT: Record<string, string> = {
  'analyst':       'O Analista',
  'signal-drop':   'Queda de Sinal',
  'static':        'Estático',
  'weight-room':   'Sala de Musculação',
  'the-feed':      'O Feed',
  'failure-modes': 'Modos de Falha',
  'daily-scan':    'Varredura Diária',
  'data-trails':   'Rastros de Dados',
  'the-call':      'A Chamada',
  'the-framework': 'A Estrutura',
  'bias-sources':  'Fontes de Viés',
  'transparency':  'Tipos de Transparência',
  'can-or-cant':   'Pode ou Não Pode',
  'what-is-agi':   'O que é AGI',
  'the-resource':  'O Recurso',
  'signal-flow':   'Fluxo de Sinal',
  'the-gradient':  'O Gradiente',
  'transformer':   'Partes do Transformer',
  'prompt-drop':   'Queda de Prompts',
  'agent-parts':   'Partes do Agente',
  'ship-it':       'Envie',
  'multimodal':    'Multimodal',
  'frontier':      'Conceitos de Fronteira',
  'dispatch':      'Despacho',
}

export const WORLD_NAMES: Record<number, string> = {
  1: 'Meet AI',
  2: 'How AI Thinks',
  3: 'AI and Society',
  4: 'AI Ethics',
  5: 'The Future of AI',
  6: 'How Neural Networks Work',
  7: 'Build With AI',
  8: 'The Frontier',
}
