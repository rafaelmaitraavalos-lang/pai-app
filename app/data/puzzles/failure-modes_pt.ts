import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'failure-modes',
  title: 'Modos de Falha',
  groups: [
    {
      name: 'DADOS DE TREINAMENTO VIESADOS',
      difficulty: 1,
      cards: [
        'Ferramenta de contratação treinada em decisões históricas',
        'Reconhecimento facial menos preciso em peles mais escuras',
        'Modelo de empréstimo reflete padrões de discriminação',
        'Tradução funciona melhor em inglês do que em suaíli',
      ],
      reveal: 'O viés nos dados de treinamento gera viés no modelo. O sistema não é preconceituoso no sentido humano — ele copiou padrões de dados que eram. Corrigir a saída significa corrigir a entrada.',
    },
    {
      name: 'MUDANÇA DE DISTRIBUIÇÃO',
      difficulty: 2,
      cards: [
        'Carro autônomo treinado em sol falha na neve',
        'Ferramenta médica treinada em uma população erra em outra',
        'Detector de fraudes não identifica novos golpes',
        'Filtro treinado em inglês interpreta mal outras línguas',
      ],
      reveal: 'Um modelo treinado em um ambiente pode falhar completamente em outro. Quando as condições do mundo real diferem das condições de treinamento, o desempenho cai. O modelo não sabe que está fora de sua área de atuação.',
    },
    {
      name: 'SOBREAJUSTE',
      difficulty: 3,
      cards: [
        'Bom nos dados de treino, falha em novos exemplos',
        'Memorizou respostas em vez de aprender conceitos',
        'Sistema encontra padrão específico para um conjunto',
        'Funciona no laboratório, mas falha na prática',
      ],
      reveal: 'O sobreajuste acontece quando um modelo aprende os dados de treinamento muito bem — incluindo seus ruídos e peculiaridades. Ele se sai brilhantemente no que já viu e tem dificuldade com qualquer coisa nova.',
    },
    {
      name: 'ERROS EM ESCALA',
      difficulty: 4,
      cards: [
        'Uma decisão errada sobre um empréstimo',
        'A mesma decisão errada tomada 10.000 vezes',
        'Sistema automatizado nega benefícios a milhares',
        'Um único bug repetido em todos os usuários',
      ],
      reveal: 'A automação não inventa decisões ruins. Ela as produz em massa. Uma falha que afeta uma pessoa quando cometida por um humano afeta a todos quando cometida por um sistema.',
    },
  ],
} as any

export default puzzle
