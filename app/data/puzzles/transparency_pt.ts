import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'transparency',
  title: 'Tipos de Transparência',
  groups: [
    {
      name: 'EM QUE O SISTEMA FOI TREINADO',
      difficulty: 1,
      cards: [
        'Quais conjuntos de dados foram usados',
        'Se havia material protegido por direitos autorais',
        'Quais idiomas estavam representados',
        'Se os dados foram coletados com consentimento',
      ],
      reveal: 'A transparência dos dados de treinamento diz respeito à origem do sistema — o que ele aprendeu, de quem absorveu o trabalho e se essas pessoas sabiam disso. É isso que escritores, artistas e músicos estão pedindo.',
    },
    {
      name: 'COMO O SISTEMA TOMA DECISÕES',
      difficulty: 2,
      cards: [
        'Quais características influenciaram esse resultado',
        'Por que esse empréstimo foi negado',
        'O que o modelo está otimizando',
        'Quão confiante o modelo estava',
      ],
      reveal: 'A transparência nas decisões é o que as pessoas afetadas querem — uma explicação significativa do porquê o sistema agiu daquela forma. É tecnicamente o tipo mais difícil de fornecer para grandes redes neurais.',
    },
    {
      name: 'QUEM CONTROLA O SISTEMA',
      difficulty: 3,
      cards: [
        'Qual empresa é dona do modelo',
        'Quem pode modificar seu comportamento',
        'Quais governos podem exigir acesso aos resultados',
        'Quem pode desligá-lo',
      ],
      reveal: 'A transparência do controle diz respeito ao poder — quem o tem, quem não tem e se há controles significativos. É nisso que pesquisadores de governança e organizações da sociedade civil se concentram.',
    },
    {
      name: 'ONDE O SISTEMA FALHOU',
      difficulty: 4,
      cards: [
        'Taxas de erro conhecidas por grupo demográfico',
        'Casos documentados de resultados prejudiciais',
        'Reclamações recebidas e resultados',
        'Versões anteriores que foram retiradas',
      ],
      reveal: 'A transparência das falhas diz respeito à responsabilização — o que deu errado, quem foi afetado e o que aconteceu depois. As empresas têm o maior incentivo para esconder isso.',
    },
  ],
} as any

export default puzzle
