import type { Puzzle } from '../components/ConnectionsGame'

const samplePuzzlePT: Puzzle = {
  id: 'ai-reality-check-pt',
  title: 'Verificação da Realidade da IA',
  groups: [
    {
      name: 'O que um modelo de linguagem realmente faz',
      difficulty: 1,
      cards: [
        'Prevê próximos tokens',
        'Amostra de distribuições',
        'Comprime dados de treino',
        'Reconhece padrões aprendidos',
      ],
    },
    {
      name: 'Coisas que reduzem alucinações',
      difficulty: 2,
      cards: [
        'Pipeline RAG',
        'Temperatura mais baixa',
        'Citar fontes',
        'IA Constitucional',
      ],
    },
    {
      name: 'Partes de um transformador',
      difficulty: 3,
      cards: [
        'Cabeças de atenção',
        'Camadas feed-forward',
        'Codificações posicionais',
        'Normalização de camada',
      ],
    },
    {
      name: 'Coisas que a IA fundamentalmente não tem',
      difficulty: 4,
      cards: [
        'Compreensão real',
        'Memória genuína',
        'Sentidos físicos',
        'Intenções verdadeiras',
      ],
    },
  ],
}

export default samplePuzzlePT
