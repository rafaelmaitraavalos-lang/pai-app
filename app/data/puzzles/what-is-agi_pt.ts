import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'what-is-agi',
  title: 'O Que É AGI',
  groups: [
    {
      name: 'AGI COMO DESEMPENHO EM TAREFAS',
      difficulty: 1,
      cards: [
        'Realiza qualquer tarefa cognitiva melhor que humanos',
        'É aprovado em todos os exames de licenciamento',
        'Alcança pontuações sobre-humanas em todos os benchmarks',
        'Supera os humanos em todas as habilidades mensuráveis',
      ],
      reveal: 'A AGI como desempenho em tarefas é a definição mais mensurável — mas também a mais limitada. Um sistema poderia atingir todos os parâmetros e ainda assim carecer de algo importante. Os críticos dizem que essa definição confunde medição com significado.',
    },
    {
      name: 'AGI COMO GENERALIZAÇÃO',
      difficulty: 2,
      cards: [
        'Aprende nova habilidade sem treinamento específico',
        'Transfere conhecimento entre domínios diferentes',
        'Adapta-se a situações novas sem novo treinamento',
        'Resolve problemas em contextos nunca encontrados',
      ],
      reveal: 'A generalização da AGI captura algo que os sistemas atuais claramente não têm. A IA de hoje é frágil fora de sua distribuição de treinamento. A verdadeira generalização é o que a maioria dos pesquisadores quer dizer quando afirma que a AGI ainda não chegou.',
    },
    {
      name: 'AGI COMO AUTONOMIA',
      difficulty: 3,
      cards: [
        'Define e busca seus próprios objetivos de longo prazo',
        'Opera indefinidamente sem orientação humana',
        'Decide quais problemas valem a pena resolver',
        'Mantém objetivos consistentes ao longo do tempo',
      ],
      reveal: 'A AGI de autonomia é a definição que mais preocupa os pesquisadores de segurança. Um sistema que define seus próprios objetivos e os busca ao longo do tempo é qualitativamente diferente de uma ferramenta que responde a comandos. Nenhum sistema atual tem isso.',
    },
    {
      name: 'AGI COMO CONSCIÊNCIA',
      difficulty: 4,
      cards: [
        'Tem experiência subjetiva',
        'Sabe como é ser ele mesmo',
        'Tem compreensão genuína, não só reconhecimento de padrões',
        'Pode sofrer ou prosperar em sentido moralmente relevante',
      ],
      reveal: 'A AGI como consciência é a definição mais contestada. Se os sistemas de IA pudessem realmente experimentar as coisas, isso mudaria completamente os desafios éticos. Não temos uma maneira consensual de testar isso, nem mesmo em humanos.',
    },
  ],
} as any

export default puzzle
