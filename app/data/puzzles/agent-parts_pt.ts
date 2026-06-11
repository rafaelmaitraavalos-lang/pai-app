import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'agent-parts',
  title: 'Partes do Agente',
  groups: [
    {
      name: 'MEMÓRIA',
      difficulty: 1,
      cards: [
        'Janela de contexto com a conversa atual',
        'Banco de dados externo que o agente pode consultar',
        'Resumo das sessões anteriores passado no início',
        'Anotações que o agente faz para si mesmo na tarefa',
      ],
      reveal: 'A memória determina o que o agente sabe e por quanto tempo. A memória da janela de contexto é rápida, mas limitada, e desaparece quando a sessão termina. A memória externa persiste, mas requer recuperação.',
    },
    {
      name: 'FERRAMENTAS',
      difficulty: 2,
      cards: [
        'Função de pesquisa na web que o agente pode chamar',
        'Interpretador de código para executar cálculos',
        'Conexão API com um serviço externo',
        'Acesso ao sistema de arquivos para ler e gravar',
      ],
      reveal: 'As ferramentas são o que permitem que um agente aja no mundo, em vez de apenas falar sobre ele. Sem ferramentas, um agente é apenas um chatbot. Com as ferramentas certas, ele pode pesquisar, calcular, conectar-se a serviços e modificar arquivos.',
    },
    {
      name: 'PLANEJAMENTO',
      difficulty: 3,
      cards: [
        'Dividir uma meta em subtarefas',
        'Decidir qual ferramenta usar em cada etapa',
        'Verificar se a etapa anterior foi bem-sucedida',
        'Revisar o plano quando uma etapa falha',
      ],
      reveal: 'O planejamento transforma uma meta de alto nível em uma sequência de ações. Sem planejamento, um agente só consegue responder ao que está bem na sua frente. Com planejamento, ele pode trabalhar em direção a algo ao longo do tempo.',
    },
    {
      name: 'BARREIRAS DE SEGURANÇA PARA EXECUÇÃO',
      difficulty: 4,
      cards: [
        'Aprovação humana antes de ações irreversíveis',
        'Registrar todas as ações realizadas para revisão',
        'Limites sobre quais ferramentas podem ser usadas',
        'Revertimento automático se uma etapa falhar',
      ],
      reveal: 'As barreiras de segurança são o que tornam os agentes seguros para implantação. Um agente sem barreiras de segurança pode realizar ações irreversíveis com base em um mal-entendido de uma solicitação. Quanto mais poderosas as ferramentas, mais importantes são as proteções.',
    },
  ],
} as any

export default puzzle
