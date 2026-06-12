import type { AnalystRound } from '../analystRounds'

const theCallRoundsPT: AnalystRound[] = [
  // ── TRAINING ROUNDS ────────────────────────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '2013',
    source: 'Conferência MOOCs, Cofundador da Coursera',
    paiIntro: "Os Cursos Online Abertos e Massivos acabaram de ser lançados. O fundador diz que a educação com IA vai democratizar o acesso ao aprendizado de elite para todos na Terra. Isso é uma virada real?",
    claim: "Em cinco anos, a Coursera entregará uma educação de nível universitário de elite para qualquer pessoa com conexão à internet. A tutoria por IA substituirá a instrução privada cara em todo o mundo.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -130, pai: "As taxas de conclusão dos MOOCs ficaram abaixo de 10%. Acesso sem suporte, responsabilidade ou credenciais não substituiu nada. A afirmação superestimou o mecanismo." },
      small: { delta: -45,  pai: "Ainda na direção errada. Os dados de conclusão eram ruins desde o início. 'Acesso' sem suporte e verificação não é o mesmo que educação." },
      pass:  { delta: +70,  pai: "Aposta segura. A leitura correta era blefe — acesso a conteúdo não é o mesmo que educação. Essa lacuna era previsível." },
      bluff: { delta: +130, pai: "Certo. Taxas de conclusão, credenciais, suporte social e responsabilidade — tudo isso importa. Fornecer acesso a vídeo não é o mesmo que educação. Previsível desde o primeiro dia." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '2017',
    source: 'Startup de EdTech, Anúncio de Série A',
    paiIntro: "Uma startup de aprendizado adaptativo acabou de captar 40 milhões de dólares. Sua IA ajusta a dificuldade das lições em tempo real para cada aluno. Resultados piloto mostram melhoria nas notas. É sinal real?",
    claim: "Nosso sistema de IA adaptativo melhorou as notas em testes padronizados em uma média de 23% em 12 escolas piloto. Alunos usando a plataforma aprendem o mesmo conteúdo 40% mais rápido do que com instrução tradicional.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +80,  pai: "Também defensável. Dados de piloto controlado com medidas específicas de resultado de escolas reais é significativo. Apesar de 12 escolas não ser generalizável, o sinal era real." },
      small: { delta: +115, pai: "Decisão certa. Pilotos em escolas reais, dados específicos de resultado, comparação controlada — isso é diferente de texto de marketing. Uma aposta cuidadosa era justificada." },
      pass:  { delta: -40,  pai: "Você perdeu um sinal real. Pilotos em doze escolas com dados específicos de pontuação em testes são diferentes de pesquisas de humor autorrelatadas. Isso justificava uma pequena aposta." },
      bluff: { delta: -110, pai: "Dados de piloto randomizado de doze escolas não é um blefe. Chamar de ceticismo aqui custou um sinal real da fase inicial." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '2021',
    source: 'Relatório Nacional de Tecnologia Educacional',
    paiIntro: "Um relatório governamental constata que sistemas de tutoria por IA em escolas de baixo financiamento estão ampliando as lacunas de desempenho em vez de reduzi-las. Os dados cobrem três anos e 300 escolas.",
    claim: "Implantações de tutoria por IA em distritos escolares de baixa renda mostram resultados piores do que distritos comparáveis sem ferramentas de IA. Alunos em distritos de renda mais alta usando as mesmas ferramentas mostram ganhos positivos.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +140, pai: "Certo. Três anos, 300 escolas, conjunto de dados governamental — sinal longitudinal limpo. E a descoberta é contraintuitiva: IA que ajuda em um contexto prejudica em outro. Isso é importante." },
      small: { delta: +70,  pai: "Boa direção. A escala e a metodologia eram fortes aqui. A descoberta contraintuitiva — IA ampliando lacunas — era sinal real que justificava uma aposta maior." },
      pass:  { delta: -90,  pai: "Estudo governamental de três anos cobrindo 300 escolas é tão limpo quanto os dados educacionais conseguem ser. Era sinal real, não ruído." },
      bluff: { delta: -140, pai: "Dados longitudinais governamentais em 300 escolas não é um blefe. Essa foi uma das descobertas mais importantes na pesquisa de EdTech." },
    },
  },

  // ── TEST ROUNDS ──────────────────────────────────────────────────────────

  {
    id: 4,
    era: 'test',
    year: '2023',
    source: 'Post de Blog de Grande Empresa de IA',
    paiIntro: "Não está nas suas anotações. Um laboratório de IA diz que seu chatbot de tutoria tem o mesmo impacto nas notas de matemática que um tutor humano — a custo marginal zero. Eles têm dados de estudo controlado.",
    claim: "Em um ensaio clínico randomizado, alunos usando nosso tutor de IA melhoraram as notas em matemática em 0,3 desvios padrão — equivalente ao tamanho de efeito de um tutor humano — a essencialmente custo zero por aluno.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +85,  pai: "Também defensável. Ensaio clínico randomizado, tamanho de efeito específico, comparação com referência estabelecida. Isso é metodologia real. Ir maior era razoável." },
      small: { delta: +110, pai: "Certo. ECR, tamanho de efeito específico, comparação de custo — isso é evidência real. Não implantando em escala, não fazendo promessas, apenas dados. Uma aposta medida fazia sentido." },
      pass:  { delta: -50,  pai: "Um ensaio clínico randomizado com um tamanho de efeito específico e mensurável não é o mesmo que um press release. Isso justificava uma aposta." },
      bluff: { delta: -120, pai: "Metodologia de ECR com tamanho de efeito de 0,3 DP não é teatro. Você exagerou no ceticismo aqui." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2024',
    source: 'Conferência de EdTech, Discurso de CEO',
    paiIntro: "Um CEO diz que sua IA substituirá professores em sete anos. Ovação em pé. Investidores estão na sala. Nenhum dado apresentado — apenas uma demonstração e uma visão.",
    claim: "Até 2031, a IA tornará os professores humanos obsoletos nas disciplinas acadêmicas principais. Nosso sistema já supera professores médios em métricas padronizadas. Escolas que não adotarem IA ficarão permanentemente para trás.",
    best: 'pass',
    good: ['bluff'],
    outcomes: {
      big:   { delta: -160, pai: "Afirmação de prazo mais certeza completa mais público de investidores mais sem dados mais apenas demonstração. Todas as bandeiras estavam hasteadas. Você perdeu todas elas." },
      small: { delta: -60,  pai: "Mesmo uma pequena aposta nessa estrutura perde. 'Substituir professores até 2031' sem metodologia, em uma conferência, com investidores presentes." },
      pass:  { delta: +120, pai: "Certo. Prazo futuro específico, sem dados de suporte, público de investidores, demonstração não produto. Estrutura clássica de overclaim. Você reconheceu." },
      bluff: { delta: +90,  pai: "Correto. Isso atinge todos os marcadores de blefe: certeza sem evidência, prazo sem responsabilidade, público com incentivo financeiro." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2025',
    source: 'Instituto de Pesquisa Independente',
    paiIntro: "Última rodada. Pesquisadores publicam evidência de que ferramentas de tutoria por IA ampliam lacunas de equidade porque os alunos que mais se beneficiam já têm acesso à tecnologia, suporte parental e habilidades básicas sólidas.",
    claim: "Em 14 países e 40.000 alunos, ferramentas de tutoria por IA mostram efeitos positivos consistentes para alunos acima da mediana em desempenho anterior e efeitos nulos ou negativos consistentes para alunos abaixo dela.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +145, pai: "Certo. Pesquisa independente, 14 países, 40.000 alunos, descoberta consistente entre contextos. E a descoberta — IA vantajosa para os já vantajados — é estruturalmente importante. Esse era o momento de se comprometer." },
      small: { delta: +70,  pai: "Boa decisão, mas excessivamente cautelosa. A escala e a independência aqui eram excepcionais. Esse é o tipo de descoberta que reformula políticas." },
      pass:  { delta: -85,  pai: "Multicultural, independente, grande amostra, descoberta replicável. Esse era sinal real em escala." },
      bluff: { delta: -140, pai: "Quatorze países, 40.000 alunos, instituto independente. A metodologia era à prova de bala. Você deixou o ceticismo superar a evidência." },
    },
  },
]

export default theCallRoundsPT
