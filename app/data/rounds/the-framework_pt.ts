import type { AnalystRound } from '../analystRounds'

const theFrameworkRoundsPT: AnalystRound[] = [
  // ── TRAINING ROUNDS ────────────────────────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '2016',
    source: 'Partnership on AI, Press Release de Lançamento',
    paiIntro: "Os maiores laboratórios de IA acabaram de formar uma coalizão para IA ética. Publicaram princípios compartilhados. Sem fiscalização. Sem penalidades. Autogovernança da indústria. O que você faz?",
    claim: "A Partnership on AI une as principais empresas em torno de princípios compartilhados para o desenvolvimento responsável. Com os líderes do setor alinhados em ética, os danos da IA podem ser prevenidos por meio de compromissos voluntários.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -135, pai: "Princípios voluntários de partes com interesses comerciais concorrentes e sem mecanismo de aplicação têm um histórico consistente: produzem documentos, não mudanças." },
      small: { delta: -50,  pai: "Direção errada. Princípios sem responsabilidade não são estruturas — são relações públicas. O padrão estava claro desde o início." },
      pass:  { delta: +70,  pai: "Seguro. A leitura correta era blefe — autogovernança voluntária sem aplicação tem um histórico confiável de não funcionar." },
      bluff: { delta: +130, pai: "Certo. Sem aplicação, sem penalidades, interesses concorrentes. Princípios assinados por concorrentes que se beneficiam de mover rápido são decorativos." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '2018',
    source: 'Grupo de Alto Nível de Especialistas em IA da UE, Rascunho de Relatório',
    paiIntro: "A UE acabou de publicar diretrizes detalhadas de ética em IA — sete princípios incluindo equidade, transparência e supervisão humana. Tem processo real por trás. Patrocinado pelo governo. Isso é diferente?",
    claim: "Os sete princípios da UE para IA confiável fornecem uma estrutura abrangente para garantir que os sistemas de IA sejam desenvolvidos de forma responsável. Empresas que adotarem esses princípios prevenirão danos previsíveis de IA.",
    best: 'small',
    good: ['pass'],
    outcomes: {
      big:   { delta: -90,  pai: "Princípios sem operacionalização técnica são difíceis de implementar. 'Equidade' significa coisas diferentes para equipes diferentes. Sem critérios de medição, a adoção não previne danos." },
      small: { delta: +100, pai: "Enquadramento certo. Apoio governamental com processo real é diferente de autogovernança da indústria — mas princípios ainda precisam de operacionalização. Uma aposta cautelosa estava correta." },
      pass:  { delta: +55,  pai: "Defensável. O processo da UE era mais crível que a autogovernança da indústria, mas princípios sozinhos não previnem danos. A cautela fazia sentido." },
      bluff: { delta: -100, pai: "Isso tinha apoio governamental real e um processo genuíno. Chamá-lo de blefe perdeu o sinal — essa era a semente do que se tornou o Ato de IA da UE." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '2021',
    source: 'Iniciativa Nacional de IA dos EUA, Casa Branca',
    paiIntro: "O governo dos EUA lançou uma Carta de Direitos de IA com proteções específicas. Ainda sem mecanismo de aplicação — mas linguagem governamental oficial e momentum político crescente.",
    claim: "A Carta de Direitos de IA estabelece proteções claras para cidadãos contra danos algorítmicos. O reconhecimento governamental desses direitos marca um ponto de virada na responsabilização da IA.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +85,  pai: "Também defensável. Linguagem governamental sem aplicação ainda é uma mudança de enquadramento — cria expectativas e pontos de apoio legais futuros. Ir além do cauteloso era razoável aqui." },
      small: { delta: +110, pai: "Boa leitura. Enquadramento governamental oficial, momentum crescente, contexto político real — isso é diferente de princípios voluntários. Uma pequena aposta nessa trajetória estava certa." },
      pass:  { delta: -40,  pai: "Linguagem governamental oficial sobre direitos de IA cria precedente real mesmo sem aplicação imediata. Você perdeu um sinal significativo." },
      bluff: { delta: -115, pai: "Estruturas de direitos emitidas pelo governo — mesmo sem aplicação imediata — mudam o cenário legal. Isso se tornou a base para a regulamentação futura." },
    },
  },

  // ── TEST ROUNDS ──────────────────────────────────────────────────────────

  {
    id: 4,
    era: 'test',
    year: '2022',
    source: 'Grande Empresa de Tecnologia, Relatório de Revisão Interna de Ética',
    paiIntro: "Não está nas suas anotações. Uma empresa publica uma auditoria interna de seu sistema de IA constatando que tem impacto disparado em um grupo protegido. Dizem que sua estrutura de ética detectou o problema. Isso é uma vitória real?",
    claim: "Nosso processo interno de revisão de ética detectou e sinalizou um problema de viés antes da implantação. Isso demonstra que estruturas de ética, quando devidamente implementadas, podem prevenir danos de IA em escala.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -145, pai: "Uma estrutura de ética que encontra um problema é uma ferramenta. A questão real é o que acontece depois: foi corrigido? A implantação foi adiada? Ou a auditoria foi teatro?" },
      small: { delta: -55,  pai: "Encontrar um problema é o passo um. O que importa é o que foi feito com a descoberta — e as empresas raramente relatam a resposta para isso." },
      pass:  { delta: +70,  pai: "Bom instinto. A decisão correta é blefe — uma auditoria que encontra um problema só importa se uma ação se segue. O relatório conta apenas metade da história." },
      bluff: { delta: +130, pai: "Certo. Auditoria interna, resultado autorrelatado, sem verificação independente, sem resultado reportado. Teatro de ética é quando a auditoria é o produto." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2023',
    source: 'Ato de IA da UE, Texto Final Publicado',
    paiIntro: "O Ato de IA da UE é aprovado — lei vinculante com aplicação real, multas de até 6% da receita global e auditorias obrigatórias para sistemas de alto risco. Primeira grande regulamentação de IA com dentes reais.",
    claim: "O Ato de IA da UE cria a primeira regulamentação vinculante abrangente de IA do mundo. Sistemas de IA de alto risco agora devem passar por avaliações obrigatórias de conformidade antes da implantação no mercado da UE.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +145, pai: "Certo. Lei vinculante com aplicação, multas vinculadas à receita global, auditorias obrigatórias — isso é categoricamente diferente de princípios e estruturas voluntárias. Você reconheceu a mudança." },
      small: { delta: +70,  pai: "Boa direção. A aplicação vinculante era a peça faltante em todas as estruturas anteriores. Isso importava." },
      pass:  { delta: -90,  pai: "Lei vinculante com penalidades financeiras reais é categoricamente diferente de documentos de princípios. Esse foi um ponto de virada genuíno." },
      bluff: { delta: -145, pai: "Legislação aprovada com dentes de aplicação não é hype. O Ato de IA da UE criou obrigações legais reais pela primeira vez." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2025',
    source: 'Laboratório de IA, Anúncio Público',
    paiIntro: "Última rodada. Um laboratório de fronteira anuncia uma nova estrutura interna de ética prometendo impedir que seus modelos causem danos. Sem supervisão externa. Voluntário. Publicado como um white paper.",
    claim: "Nossa estrutura abrangente de ética cobre equidade, transparência, responsabilidade e segurança. Estamos comprometidos com IA responsável e não implantaremos sistemas que não passem em nossos padrões internos de revisão.",
    best: 'pass',
    good: ['bluff'],
    outcomes: {
      big:   { delta: -150, pai: "Voluntário, interno, sem supervisão externa, sem aplicação, de uma parte que se beneficia comercialmente da implantação. Você já viu essa estrutura antes." },
      small: { delta: -60,  pai: "Direção errada. Essa é a mesma estrutura de 2016 — princípios voluntários, sem dentes, escritos pela parte com interesses concorrentes." },
      pass:  { delta: +120, pai: "Certo. Padrões voluntários internos de um laboratório comercial parecem idênticos a todas as estruturas anteriores que não conseguiram prevenir danos." },
      bluff: { delta: +95,  pai: "Também certo. O padrão é reconhecível: voluntário, autogovernado, comercialmente conveniente. Você já viu esse filme." },
    },
  },
]

export default theFrameworkRoundsPT
