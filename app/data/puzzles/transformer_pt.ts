import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'transformer',
  title: 'Partes do Transformer',
  groups: [
    {
      name: 'O QUE É A ATENÇÃO',
      difficulty: 1,
      cards: [
        'Decide quais tokens são mais relevantes para o atual',
        'Permite que cada posição analise todas as outras',
        'Calcula as relações em toda a sequência de uma vez',
        'Pondera a importância de diferentes partes da entrada',
      ],
      reveal: 'A atenção permite que cada token em uma sequência considere diretamente todos os outros tokens simultaneamente. É por isso que os transformers lidam melhor com dependências de longo alcance. Toda a sequência fica visível de uma só vez.',
    },
    {
      name: 'O QUE A CODIFICAÇÃO POSICIONAL FAZ',
      difficulty: 2,
      cards: [
        'Diz ao modelo onde cada token está na sequência',
        'Injeta informações de ordem, pois a atenção não tem',
        'Permite distinguir o primeiro token do último',
        'Codifica a posição como parte da representação',
      ],
      reveal: 'A atenção por si só não tem noção de ordem — ela trata uma sequência como um conjunto. A codificação posicional adiciona essa informação de volta. Sem ela, "o gato sentou no tapete" e "o tapete sentou no gato" pareceriam idênticos.',
    },
    {
      name: 'O QUE AS CAMADAS DE ALIMENTAÇÃO DIRETA FAZEM',
      difficulty: 3,
      cards: [
        'Aplica a mesma transformação a cada token',
        'Armazena o conhecimento factual do treinamento',
        'Transforma cada posição após a atenção rodar',
        'Adiciona profundidade após o cálculo da atenção',
      ],
      reveal: 'Depois que a atenção mistura informações entre as posições, as camadas de alimentação direta processam cada posição de forma independente. Grande parte do conhecimento factual dos grandes modelos de linguagem reside nessas camadas.',
    },
    {
      name: 'O QUE A NORMALIZAÇÃO DE CAMADAS FAZ',
      difficulty: 4,
      cards: [
        'Estabiliza as ativações antes da próxima camada',
        'Impede que valores fiquem muito grandes ou zero',
        'Normaliza a saída de cada camada para escala consistente',
        'Ajuda os gradientes a fluírem sem explodir',
      ],
      reveal: 'A normalização de camadas mantém os números em cada camada dentro de um intervalo que permite um treinamento estável. A maioria dos transformers modernos aplica isso antes da atenção e antes das camadas feed-forward. Invisível quando funciona. Catastrófico quando falta.',
    },
  ],
} as any

export default puzzle
