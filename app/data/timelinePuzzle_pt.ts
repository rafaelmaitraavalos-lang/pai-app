import type { TimelinePuzzle } from '../components/TimelineGame'

const timelinePuzzlePT: TimelinePuzzle = {
  id: 'w1m1-timeline-pt',
  anchorId: 'chatgpt',
  intro: 'Derrubei 2.500 anos de história. Me ajude a colocar tudo de volta antes que alguém perceba.',

  r1: {
    cards: [
      {
        id: 'aristotle',
        moment: 'Aristóteles formaliza a lógica',
        year: '400 a.C.',
        yearValue: -400,
        era: 'Antiguidade',
        description: 'O raciocínio pode ser mecânico?',
        explanation: '400 a.C. — antes dos computadores, antes da eletricidade, antes mesmo de Roma existir. Essa é a antiguidade desta pergunta. Aristóteles questionava se o raciocínio poderia ser mecânico 2.500 anos antes de alguém construir uma máquina para tentar responder.',
      },
      {
        id: 'ada',
        moment: 'Ada Lovelace escreve o primeiro algoritmo',
        year: '1843',
        yearValue: 1843,
        era: 'Época Vitoriana',
        description: 'Código para uma máquina que ainda não existia',
        explanation: '1843 — ela escrevia instruções para uma máquina que ainda não havia sido construída. Todos achavam que o motor de Babbage era uma calculadora. Ada enxergou algo diferente: um computador de uso geral. Ela estava certa sobre tudo, um século à frente do seu tempo.',
      },
      {
        id: 'turing',
        moment: 'Turing pergunta: "Máquinas podem pensar?"',
        year: '1950',
        yearValue: 1950,
        era: 'IA Inicial',
        description: 'Inventa o jogo da imitação',
        explanation: '1950 — Turing não respondeu se máquinas podem pensar. Ele questionou se a pergunta sequer fazia sentido. Seu jogo da imitação — hoje chamado de Teste de Turing — ainda é o referencial que a maioria usa, mesmo que o ChatGPT passe por versões dele sem que tenhamos respondido a questão.',
      },
      {
        id: 'dartmouth',
        moment: 'Dartmouth dá nome ao campo',
        year: '1956',
        yearValue: 1956,
        era: 'IA Inicial',
        description: '"Inteligência Artificial" nasce',
        explanation: '1956 — um workshop de verão em Dartmouth. John McCarthy cunhou o nome Inteligência Artificial. Os pesquisadores achavam que resolveriam tudo em um único verão. Não resolveram. Mas o campo ganhou um nome que ficou.',
      },
      {
        id: 'winters',
        moment: 'Os Invernos da IA',
        year: '1970–80',
        yearValue: 1970,
        era: 'Era das Trevas',
        description: 'Financiamento colapsa, o campo quase morre',
        explanation: 'Anos 1970 e 80 — duas vezes, o dinheiro acabou completamente. Governos e laboratórios que haviam investido pesado em IA viram os resultados ficarem aquém e retiraram tudo. O campo quase desapareceu. Saber disso é o que separa quem pensa com clareza sobre IA de quem acredita em qualquer manchete.',
      },
      {
        id: 'deepblue',
        moment: 'Deep Blue vence Kasparov',
        year: '1997',
        yearValue: 1997,
        era: 'IA Moderna',
        description: 'Uma calculadora muito rápida, não uma mente',
        explanation: '1997 — o Deep Blue venceu o campeão mundial de xadrez. As manchetes chamaram isso de prova de que máquinas podem pensar. Não era. O Deep Blue não jogava damas, não mantinha uma conversa e não entendia o que era xadrez. Era uma calculadora muito rápida com um único propósito específico.',
      },
      {
        id: 'alexnet',
        moment: 'AlexNet muda tudo',
        year: '2012',
        yearValue: 2012,
        era: 'Aprendizado Profundo',
        description: 'O aprendizado profundo assume o controle',
        explanation: '2012 — este foi o que realmente importou. A AlexNet venceu uma competição de reconhecimento de imagens com margem tão grande que o campo inteiro mudou de abordagem quase da noite para o dia. Tudo que você usa hoje remonta a este ano. A maioria das pessoas nunca ouviu falar porque o ChatGPT foi o que chamou atenção.',
      },
      {
        id: 'chatgpt',
        moment: 'ChatGPT é lançado',
        year: '2022',
        yearValue: 2022,
        era: 'Hoje',
        description: 'Você está vivendo isso',
        explanation: '2022 — o momento que a maioria das pessoas acha que foi o grande avanço. Não foi. Foi o que tornou a IA impossível de ignorar. Mas a verdadeira virada já havia acontecido em 2012. O ChatGPT é um produto daquele momento, não o momento em si.',
      },
    ],
    feedback: {
      perfect: 'Perfeito. História restaurada. Você basicamente viajou no tempo.',
      close:   'Quase — um ou dois trocados. Mas você conhece sua história.',
      off:     'Bom esforço. Algumas coisas se embaralharam. Veja o que está na linha do tempo.',
    },
  },

  r2: {
    intro: 'Agora a parte que a maioria dos adultos erra.',
    cards: [
      {
        id: 'h1', type: 'hype',
        text: '"Vamos resolver a IA neste verão" — Dartmouth, 1956',
        explanation: 'Isso é exagero. Os pesquisadores de Dartmouth acreditavam genuinamente que poderiam resolver a IA em um único verão. Já se passaram 70 anos. Estavam errados — não por ingenuidade, mas porque ninguém sabia o quão difícil o problema realmente era.',
      },
      {
        id: 'r1', type: 'reality',
        text: 'Já se passaram 70+ anos e ainda não foi resolvido',
        explanation: 'Isso é realidade. IA geral — um sistema que faz tudo que um humano faz — não existe. Todo sistema de IA que você já usou é restrito. O campo se nomeou em 1956 e o problema central ainda está em aberto.',
      },
      {
        id: 'h2', type: 'hype',
        text: '"Deep Blue prova que máquinas podem pensar" — 1997',
        explanation: 'Isso é exagero. O Deep Blue venceu o melhor jogador de xadrez do mundo e o mundo chamou isso de pensar. Não era. O Deep Blue não jogava damas, não reconhecia um rosto e não entendia o que era xadrez. Era uma calculadora extremamente rápida e específica.',
      },
      {
        id: 'r2', type: 'reality',
        text: 'Deep Blue não jogava damas nem entendia uma palavra',
        explanation: 'Isso é realidade — literalmente verdade. O Deep Blue era IA restrita no seu extremo. Super-humano em uma tarefa específica, completamente inútil em tudo mais. Vencer um humano no xadrez não é o mesmo que pensar.',
      },
      {
        id: 'h3', type: 'hype',
        text: '"ChatGPT foi o grande avanço" — 2022',
        explanation: 'Isso é exagero — e o mais importante de acertar. O ChatGPT foi o momento em que a maioria das pessoas percebeu a IA. Mas o verdadeiro avanço foi a AlexNet em 2012, quando o aprendizado profundo dominou o campo. O ChatGPT é produto daquele momento, não o momento em si.',
      },
      {
        id: 'r3', type: 'reality',
        text: 'A virada real foi a AlexNet em 2012 — a maioria perdeu',
        explanation: 'Isso é realidade. A AlexNet venceu uma competição de reconhecimento de imagens em 2012 com margem tão grande que o campo inteiro mudou de abordagem quase da noite para o dia. ChatGPT, DALL-E, Gemini — tudo veio daí. A maioria nunca ouviu falar da AlexNet.',
      },
    ],
    completion: 'Você acabou de separar o exagero do que realmente aconteceu. Essa é a habilidade toda. A maioria das pessoas nunca aprende isso.',
  },
}

export default timelinePuzzlePT
