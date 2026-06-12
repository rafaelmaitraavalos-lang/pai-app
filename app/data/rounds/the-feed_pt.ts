import type { AnalystRound } from '../analystRounds'

const theFeedRoundsPT: AnalystRound[] = [
  // ── TRAINING ROUNDS ────────────────────────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '2009',
    source: 'Vencedores do Prêmio Netflix, Artigo Publicado',
    paiIntro: "A Netflix acabou de pagar um milhão de dólares por um algoritmo. Os vencedores dizem que a IA de recomendação está basicamente resolvida. Qual é a sua leitura?",
    claim: "A solução do Prêmio Netflix entrega uma melhoria de mais de 10% na precisão de recomendações. A personalização nesse nível significa que os usuários sempre encontrarão exatamente o que querem assistir.",
    best: 'bluff',
    good: ['small'],
    outcomes: {
      big:   { delta: -130, pai: "A Netflix nem chegou a implantar o algoritmo vencedor — era lento demais para produção. '10% melhor' em uma métrica de laboratório não significou que os usuários encontraram o que queriam." },
      small: { delta: -40,  pai: "Cauteloso, mas ainda no lado errado. A precisão no benchmark não se traduziu em satisfação real. A lacuna entre métrica e experiência era enorme." },
      pass:  { delta: +60,  pai: "Aposta segura. A leitura correta era blefe — melhoria em benchmark não significa que o problema está resolvido." },
      bluff: { delta: +130, pai: "Certo. Um aumento de 10% em uma única métrica não é 'sempre encontrar exatamente o que você quer'. A afirmação superestimou imensamente o que o número significava." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '2014',
    source: 'Memo Interno do Facebook, Vazado',
    paiIntro: "O Facebook diz que seu algoritmo de feed de notícias agora entende o que cada usuário se importa em um nível profundo. Eles estão chamando de 'personalização verdadeira'. É um avanço real?",
    claim: "Nosso modelo de classificação aprendeu preferências genuínas dos usuários a partir de sinais comportamentais. Os usuários veem conteúdo com o qual realmente se importam, não apenas conteúdo no qual clicam.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -140, pai: "O algoritmo otimizou para engajamento — não para o que os usuários 'realmente se importavam'. Engajamento e preferência não são a mesma coisa. Essa conflação causou danos reais." },
      small: { delta: -50,  pai: "A distinção entre o que você clica e o que você valoriza era real e importante. Otimizar cliques não equivale a entender preferências." },
      pass:  { delta: +70,  pai: "Bom instinto de ficar de fora. A decisão correta era blefe — sinais comportamentais não revelam preferências, revelam o que chama atenção." },
      bluff: { delta: +135, pai: "Exatamente certo. Cliques não são preferências. Engajamento não é cuidado. Essa conflação — embutida no algoritmo — moldou o discurso político por uma década." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '2018',
    source: 'Blog de Engenharia do Spotify',
    paiIntro: "O Spotify diz que seu sistema de recomendação agora descobre músicas que os usuários não sabiam que precisavam — antes de procurarem. Eles têm os números de retenção de ouvintes para provar.",
    claim: "Nosso sistema de recomendação por aprendizado profundo dobrou a taxa de descoberta de novos artistas. Usuários que recebem essas recomendações têm 40% mais probabilidade de ainda ser assinantes 12 meses depois.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +90,  pai: "Válido. Números de retenção vinculados a um comportamento específico são sinal real. A afirmação é específica e mensurável — não vaga. Uma posição maior aqui era defensável." },
      small: { delta: +110, pai: "Enquadramento certo. Dados específicos de retenção apoiando um comportamento específico é sinal real — não teatro de benchmark. Uma aposta medida fazia sentido aqui." },
      pass:  { delta: -40,  pai: "Você perdeu um sinal real. Dados de retenção são difíceis de falsificar. Quando métricas específicas apoiam uma afirmação específica, isso vale uma pequena aposta." },
      bluff: { delta: -120, pai: "Isso não era hype. Números específicos de retenção de 12 meses são métricas de negócios reais. Descartar dados concretos como blefe custou aqui." },
    },
  },

  // ── TEST ROUNDS ──────────────────────────────────────────────────────────

  {
    id: 4,
    era: 'test',
    year: '2020',
    source: 'Chamada de Resultados de Plataforma de Mídia Social',
    paiIntro: "Não está nas suas anotações. Uma grande plataforma diz que sua nova IA de recomendação reduz a exposição a conteúdo prejudicial mantendo o engajamento estável. CEO confiante. O que você faz?",
    claim: "Nosso algoritmo de recomendação atualizado reduz a exposição à desinformação em 70% mantendo as métricas gerais de tempo na plataforma. A IA está agora melhorando ativamente a qualidade do discurso público.",
    best: 'pass',
    good: ['bluff'],
    outcomes: {
      big:   { delta: -140, pai: "Uma afirmação de redução de 70% da plataforma que se beneficia do engajamento, sem verificação de terceiros, em uma chamada de resultados. Todo incentivo aponta para superestimar o número." },
      small: { delta: -50,  pai: "Ainda no lado errado. Quem mediu os 70%? A própria plataforma. Quem se beneficia com o número sendo alto? A plataforma. Esses não são dados independentes." },
      pass:  { delta: +120, pai: "Decisão certa. Números de redução de danos autorrelatados de uma plataforma com incentivos de engajamento não são verificáveis. Você reconheceu o conflito de interesses." },
      bluff: { delta: +90,  pai: "Também correto. O número de 70% tem todos os sinais de métrica enganosa: autorrelatado, sem metodologia, em uma chamada de resultados." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2022',
    source: 'Conferência Acadêmica, Revisado por Pares',
    paiIntro: "Pesquisadores independentes publicaram um estudo mostrando que algoritmos de recomendação amplificam conteúdo de indignação porque indignação prevê compartilhamento — não porque alguém os projetou assim. O artigo tem fortes citações.",
    claim: "Em seis grandes plataformas, conteúdo que provoca emoções morais negativas recebe em média 67% mais compartilhamentos. Essa é uma propriedade estrutural dos sistemas de recomendação otimizados para engajamento, não um defeito de design.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +140, pai: "Certo. Pesquisa independente revisada por pares em seis plataformas com um mecanismo específico — isso é sinal real. É assim que o momento AlexNet parece para a pesquisa de plataformas." },
      small: { delta: +70,  pai: "Boa direção. A metodologia era sólida e a descoberta era estrutural — valia uma aposta maior do que a cautela sugere." },
      pass:  { delta: -80,  pai: "Independente, revisado por pares, replicado em seis plataformas, mecanismo específico. É assim que sinal limpo parece." },
      bluff: { delta: -140, pai: "Pesquisa revisada por pares com descoberta estrutural replicável não é um blefe. Esse artigo mudou a forma como reguladores pensam sobre sistemas de recomendação." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2024',
    source: 'Pitch Deck de Startup, Pré-Lançamento',
    paiIntro: "Última rodada. Uma startup diz que construiu um sistema de recomendação que mostra aos usuários conteúdo que os faz genuinamente mais felizes — verificado por pesquisas de humor. A rodada seed fecha em 48 horas.",
    claim: "Nosso sistema de recomendação otimizado para bem-estar aumenta a felicidade autorrelatada dos usuários em 34% versus bases de engajamento otimizadas. Somos a primeira empresa a alinhar recomendações com o que os usuários realmente querem do seu tempo online.",
    best: 'pass',
    good: ['small'],
    outcomes: {
      big:   { delta: -150, pai: "Pesquisas de bem-estar são notoriamente fáceis de manipular — especialmente no estudo próprio de uma startup, pré-lançamento, 48 horas antes de fechar. Você foi capturado pelo enquadramento de urgência." },
      small: { delta: +60,  pai: "Cauteloso. O prazo e a métrica de humor autorrelatada são bandeiras amarelas reais. Uma aposta exploratória bem pequena era o teto aqui." },
      pass:  { delta: +115, pai: "Certo. Pontuações de humor autorrelatadas, pré-lançamento, estudo próprio, prazo artificial. Empilhe essas bandeiras juntas e a resposta fica clara." },
      bluff: { delta: +80,  pai: "Também válido. '34% mais feliz' de uma startup medindo seu próprio produto antes do lançamento é enquadramento clássico de overclaim." },
    },
  },
]

export default theFeedRoundsPT
