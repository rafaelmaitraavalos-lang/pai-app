import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'data-trails',
  title: 'Rastros de Dados',
  groups: [
    {
      name: 'O QUE VOCÊ FEZ',
      difficulty: 1,
      cards: [
        'Histórico de pesquisa',
        'Registros de compra',
        'Histórico de visualizações',
        'Padrões de cliques',
      ],
      reveal: 'Dados comportamentais são o que você realmente fez. É o tipo mais valioso, porque o comportamento prevê o comportamento futuro. As empresas não precisam saber quem você é para prever o que você fará a seguir.',
    },
    {
      name: 'ONDE VOCÊ ESTAVA',
      difficulty: 2,
      cards: [
        'Coordenadas de GPS',
        'Sinais de torres de celular',
        'Registros de conexão Wi-Fi',
        'Histórico de check-ins',
      ],
      reveal: 'Dados de localização parecem inofensivos, um por um. Um longo registro de onde você esteve revela onde você mora, onde trabalha, com quem se encontra e quando está fora de casa.',
    },
    {
      name: 'QUEM VOCÊ É',
      difficulty: 3,
      cards: [
        'Nome e data de nascimento',
        'Número de identificação oficial',
        'Varredura biométrica',
        'Endereço residencial',
      ],
      reveal: 'Dados de identidade ligam tudo o mais a uma pessoa específica. Por si só, é apenas um registro. Combinados com dados comportamentais ou de localização, transformam padrões em um perfil.',
    },
    {
      name: 'O QUE VOCÊ PODE SER',
      difficulty: 4,
      cards: [
        'Visões políticas previstas',
        'Condição de saúde inferida',
        'Faixa de renda estimada',
        'Estado emocional modelado',
      ],
      reveal: 'Dados inferidos são o que um sistema adivinhou sobre você a partir de tudo o mais. Você nunca disse isso. O sistema calculou. Essas previsões podem estar erradas — e ainda assim podem te acompanhar em decisões de empréstimo, triagem de empregos e anúncios.',
    },
  ],
} as any

export default puzzle
