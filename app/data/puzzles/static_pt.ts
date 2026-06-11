import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'static',
  title: 'Estático',
  groups: [
    {
      name: 'O QUE UMA CNN DETECTA PRIMEIRO',
      difficulty: 1,
      cards: [
        'Bordas',
        'Linhas',
        'Texturas',
        'Brilho',
      ],
      reveal: 'As camadas iniciais de uma CNN respondem aos sinais visuais mais simples — bordas, linhas, texturas, diferenças de brilho. Esses são os blocos de construção a partir dos quais tudo o mais é construído.',
    },
    {
      name: 'O QUE UMA CNN DETECTA DEPOIS',
      difficulty: 2,
      cards: [
        'Formas',
        'Padrões',
        'Partes de objetos',
        'Combinações',
      ],
      reveal: 'As camadas posteriores combinam esses sinais simples em características mais complexas. As formas surgem das bordas. Os padrões surgem das texturas. As partes de objetos surgem das formas.',
    },
    {
      name: 'FORMAS COMO A VISÃO COMPUTACIONAL PODE FALHAR',
      difficulty: 3,
      cards: [
        'Iluminação ruim',
        'Ângulo incomum',
        'Ruído adversário',
        'Entrada fora da distribuição',
      ],
      reveal: 'Os sistemas de visão computacional falham quando a entrada parece diferente daquela com a qual foram treinados. Iluminação ruim, ângulos incomuns, exemplos adversários e entradas que o modelo nunca viu podem derrubar um sistema que funcionava no laboratório.',
    },
    {
      name: 'O QUE A VISÃO COMPUTACIONAL FAZ ALÉM DA ROTULAGEM',
      difficulty: 4,
      cards: [
        'Detecção de objetos',
        'Segmentação semântica',
        'Estimativa de pose',
        'Estimativa de profundidade',
      ],
      reveal: 'Rotular uma imagem é apenas uma das coisas que a visão computacional pode fazer. Ela também pode localizar objetos, rotular cada pixel, rastrear posições corporais e estimar a profundidade física. Essas funções são usadas na medicina, robótica e realidade aumentada.',
    },
  ],
} as any

export default puzzle
