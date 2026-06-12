import type { AnalystRound } from '../analystRounds'

const theGradientRoundsPT: AnalystRound[] = [
  // ── TRAINING ROUNDS ────────────────────────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '2012',
    source: 'Workshop ICML, Apresentação Técnica',
    paiIntro: "Um pesquisador mostra dropout — desativar neurônios aleatoriamente durante o treinamento — reduz overfitting dramaticamente. Artigo pequeno, público técnico, sem imprensa. É real?",
    claim: "Descartar unidades aleatoriamente durante o treinamento reduz o overfitting impedindo a co-adaptação de detectores de características. Redes treinadas com dropout mostram melhorias consistentes de generalização em tarefas de imagem, fala e texto.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +140, pai: "Certo. Artigo técnico, múltiplos domínios de tarefa, mecanismo específico com explicação plausível. O dropout se tornou uma das técnicas de regularização mais usadas em aprendizado profundo. Você o detectou cedo." },
      small: { delta: +65,  pai: "Boa direção. A replicação em múltiplos domínios e o mecanismo específico valiam mais do que a cautela." },
      pass:  { delta: -85,  pai: "Validação em múltiplos domínios e uma explicação mecanística específica — esse era sinal limpo. O dropout está agora em quase toda arquitetura moderna." },
      bluff: { delta: -140, pai: "O mecanismo era específico, os resultados se replicaram em tarefas, a matemática era sólida. Isso não era hype." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '2017',
    source: 'Preprint arXiv, Quatro Autores, Sem Press Release',
    paiIntro: "Um preprint discreto propõe substituir redes recorrentes inteiramente por atenção. Sem press release. Oito citações na primeira semana, todas de pesquisadores. A afirmação é grande mas a evidência é metódica.",
    claim: "'Atenção é Tudo Que Você Precisa' — propomos o Transformer, uma arquitetura de modelo que dispensa recorrência e convoluções, baseando-se inteiramente em mecanismos de atenção. Os resultados superam todos os modelos anteriores em tarefas de tradução.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +150, pai: "Esse era o transformer. Todo grande sistema de IA hoje roda nessa arquitetura. Sinal discreto, sem hype, atenção de insiders, varredura de benchmarks — você conhece esse padrão." },
      small: { delta: +70,  pai: "Direção certa, excessivamente cauteloso. Esse foi o momento AlexNet para linguagem. A evidência estava lá." },
      pass:  { delta: -90,  pai: "O artigo do transformer mudou tudo. Discreto, sem press release, pesquisadores citando imediatamente — você conhece esse padrão. Esse era o sinal." },
      bluff: { delta: -150, pai: "Os resultados eram reais, a arquitetura era real, e tudo que veio depois rodou nesse artigo. Isso não é hype." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '2020',
    source: 'Post de Blog de Empresa de IA',
    paiIntro: "Um laboratório publica uma nova técnica de treinamento que dizem melhorar dramaticamente a eficiência de amostras — modelos aprendem a mesma tarefa em 10x menos exemplos. Apenas benchmarks internos. O que você faz?",
    claim: "Nosso novo método de treinamento alcança desempenho de nível humano em 23 jogos de Atari usando 10x menos interações de ambiente do que métodos anteriores. Acreditamos que isso representa um passo em direção ao aprendizado geral eficiente em amostras.",
    best: 'small',
    good: ['pass'],
    outcomes: {
      big:   { delta: -90,  pai: "Benchmarks internos, post de blog da empresa, enquadramento de 'acreditamos'. O resultado pode ser real mas precisa de replicação independente antes de justificar uma grande aposta." },
      small: { delta: +100, pai: "Decisão certa. Resultado interessante, métrica específica, mas apenas interno da empresa. Uma pequena aposta aguardando replicação independente era o enquadramento correto." },
      pass:  { delta: +60,  pai: "Defensável. O resultado pode ser real mas benchmarks internos da empresa em um domínio não justificam mais que cautela." },
      bluff: { delta: -100, pai: "A melhoria era específica e mensurável — não era teatro. Mas 'acreditamos' mais benchmarks internos significa que você não pode confirmar ainda. Não é blefe, apenas não verificado." },
    },
  },

  // ── TEST ROUNDS ──────────────────────────────────────────────────────────

  {
    id: 4,
    era: 'test',
    year: '2022',
    source: 'Imprensa Tecnológica, Múltiplos Veículos',
    paiIntro: "Não está nas suas anotações. Múltiplos veículos relatam que uma empresa treinou um modelo que pode resolver qualquer problema de olimpíada de matemática. Pesquisadores fora da empresa não conseguem reproduzir os resultados. O CEO está otimista.",
    claim: "Nosso modelo alcança desempenho de medalha de ouro em problemas da IMO, demonstrando raciocínio matemático no nível dos melhores competidores humanos. Isso marca um avanço na capacidade da IA de realizar raciocínio lógico genuíno.",
    best: 'pass',
    good: ['bluff'],
    outcomes: {
      big:   { delta: -150, pai: "Resultados não reproduzíveis de um único laboratório, reportados pela imprensa em vez de revisão por pares, com um CEO ativamente promovendo. Três bandeiras de uma vez." },
      small: { delta: -55,  pai: "Direção errada. Falha de reprodutibilidade mais anúncio via imprensa mais hype do CEO é uma assinatura clássica de overclaim." },
      pass:  { delta: +120, pai: "Certo. Resultado não reproduzível, press release não revisão por pares, amplificação do CEO. A estrutura grita overclaim." },
      bluff: { delta: +95,  pai: "Também certo. Resultados não replicáveis anunciados via imprensa com promoção executiva é exatamente a estrutura que distingue hype de avanço." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2024',
    source: 'NeurIPS, Apresentação Oral, 200 Citações em 30 Dias',
    paiIntro: "Um artigo sobre um novo algoritmo de treinamento é apresentado no NeurIPS. Apresentação oral, 200 citações em 30 dias, seis replicações independentes publicadas em duas semanas. Sem cobertura da imprensa ainda.",
    claim: "Nosso método de treinamento reduz o custo computacional para alcançar um dado nível de capacidade em 40%. A melhoria é consistente entre arquiteturas, conjuntos de dados e tipos de tarefa em seis avaliações independentes.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +145, pai: "Certo. Apresentação oral no NeurIPS, 200 citações em 30 dias de pesquisadores, seis replicações independentes, sem hype de imprensa. É assim que o padrão AlexNet parece. Você o detectou." },
      small: { delta: +70,  pai: "Boa direção. Replicação independente nessa velocidade e escala era rara. Ir maior era justificado." },
      pass:  { delta: -90,  pai: "Seis replicações independentes, 200 citações de pesquisadores, sem hype de imprensa. É assim que sinal técnico limpo parece." },
      bluff: { delta: -145, pai: "Replicação independente de seis equipes não é teatro. Isso é o oposto de um blefe — é ciência verificada." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2025',
    source: 'Press Release de Laboratório de IA, Dia do Investidor',
    paiIntro: "Última rodada. Um laboratório de fronteira anuncia um avanço de treinamento que reduzirá o custo de treinar modelos de fronteira em 90%. Anunciado no Dia do Investidor. Sem artigo ainda. CEO diz que muda tudo.",
    claim: "Nossa nova arquitetura de treinamento alcança desempenho equivalente aos modelos de fronteira atuais a um décimo do custo computacional. Esse avanço torna a IA de fronteira economicamente viável em 10x a escala atual.",
    best: 'pass',
    good: ['bluff'],
    outcomes: {
      big:   { delta: -150, pai: "Dia do investidor, anúncio do CEO, sem artigo, sem verificação independente. Você já viu essa estrutura antes. A afirmação de 90% sem metodologia é puro hype até ser verificado." },
      small: { delta: -60,  pai: "Direção errada. Público de investidores, anúncio liderado por CEO, sem artigo técnico, sem replicação — esse é o oposto do sinal do NeurIPS." },
      pass:  { delta: +120, pai: "Certo. Sem artigo, público de investidores, CEO apresentando. Aguarde a ciência, não o pitch." },
      bluff: { delta: +95,  pai: "Também correto. Anúncios de dia do investidor sobre avanços de computação sem artigos técnicos seguem um padrão consistente." },
    },
  },
]

export default theGradientRoundsPT
