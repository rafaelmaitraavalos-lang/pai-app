// Versão em português do quebra-cabeça Connections — nível fundamental II,
// aprovado por Sonali em 2026-08-01. Mesmos grupos da versão em inglês.

import type { Puzzle } from '../components/ConnectionsGame'

const samplePuzzlePT: Puzzle = {
  id: 'encontre-a-ia',
  title: 'Encontre a IA',
  groups: [
    {
      name: 'Coisas que a IA faz bem',
      difficulty: 1,
      cards: [
        'Encontrar padrões',
        'Traduzir idiomas',
        'Recomendar vídeos',
        'Filtrar spam',
      ],
    },
    {
      name: 'Coisas difíceis para a IA',
      difficulty: 2,
      cards: [
        'Saber o que é verdade',
        'Bom senso',
        'Sentimentos',
        'Fatos muito recentes',
      ],
    },
    {
      name: 'Onde a IA se esconde no seu dia',
      difficulty: 3,
      cards: [
        'Autocompletar',
        'Desbloqueio facial',
        'Música aleatória',
        'Rotas no mapa',
      ],
    },
    {
      name: 'Pessoas da história da IA',
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

export default samplePuzzlePT
