import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'frontier',
  title: 'Conceitos de Fronteira',
  groups: [
    {
      name: 'MISTURA DE ESPECIALISTAS',
      difficulty: 1,
      cards: [
        'Apenas fração dos parâmetros ativa para cada entrada',
        'Escala capacidade sem escalar proporcionalmente o custo',
        'Entradas diferentes vão para sub-redes especializadas',
        'Modelo de trilhão de parâmetros roda ao custo de menor',
      ],
      reveal: 'A Mistura de Especialistas permite que você construa modelos enormes sem pagar o custo total de computação em cada inferência. Um modelo MoE de 1 trilhão de parâmetros pode ativar apenas 100 bilhões por passagem. Acredita-se ser a arquitetura por trás do GPT-4.',
    },
    {
      name: 'MODELOS DE RACIOCÍNIO',
      difficulty: 2,
      cards: [
        'Aloca computação extra para pensar antes de responder',
        'Produz cadeia de raciocínio interna antes da resposta',
        'Troca latência por precisão em problemas difíceis',
        'Supera modelos padrão em matemática e ciências',
      ],
      reveal: 'Os modelos de raciocínio não geram apenas a melhor resposta imediata — eles geram a resposta mais bem ponderada. Gastam computação em raciocínios internos que o usuário nunca vê. Mais lentos. Drasticamente melhores em problemas que exigem várias etapas.',
    },
    {
      name: 'OTIMIZAÇÃO DE INFERÊNCIA',
      difficulty: 3,
      cards: [
        'Quantização reduz a precisão dos pesos do modelo',
        'Destilação treina modelo pequeno para imitar grande',
        'Decodificação especulativa gera tokens em paralelo',
        'Cache KV evita recalcular o mesmo contexto',
      ],
      reveal: 'Treinar um modelo de ponta é caro, mas acontece uma vez. A inferência acontece bilhões de vezes por dia. Tornar a inferência mais rápida e barata determina quais aplicações de IA são economicamente viáveis.',
    },
    {
      name: 'EXCESSO DE CAPACIDADE',
      difficulty: 4,
      cards: [
        'Capacidades nos modelos que ainda não foram descobertas',
        'Melhorias com prompts melhores sem retreinamento',
        'Habilidades emergentes em certas escalas não treinadas',
        'Aplicações pouco exploradas de modelos implantados',
      ],
      reveal: 'Excesso de capacidade significa que os modelos que temos agora são provavelmente mais capazes do que os usamos atualmente. À medida que as técnicas de prompt melhoram e os pesquisadores investigam os modelos, surgem capacidades antes desconhecidas.',
    },
  ],
} as any

export default puzzle
