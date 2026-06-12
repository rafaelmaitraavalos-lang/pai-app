import type { AnalystRound } from '../analystRounds'

const dispatchRoundsPT: AnalystRound[] = [
  // ── TRAINING ROUNDS ────────────────────────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '2017',
    source: 'Conselho de Estado da China, Documento Estratégico Publicado',
    paiIntro: "A China acaba de lançar uma estratégia nacional formal de IA com meta de liderança mundial até 2030. Respaldada por financiamento estatal. Não é um press release — é um documento de política governamental com alocações orçamentárias.",
    claim: "O Plano de Desenvolvimento de IA de Nova Geração da China se compromete a alcançar capacidades de IA de liderança mundial até 2030, com metas intermediárias em 2020 e 2025. A estratégia é apoiada por investimento significativo do governo central.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +135, pai: "Certo. Documento de política estatal com orçamento, não press release. Metas intermediárias específicas, não ambição vaga. A trajetória de investimento em IA da China correspondeu à intenção do documento. Esse era o sinal real." },
      small: { delta: +70,  pai: "Boa direção. Estratégia governamental com orçamento é diferente de um discurso. Era uma intenção real que valia acompanhar." },
      pass:  { delta: -80,  pai: "Documentos de política estatal com alocações orçamentárias e metas intermediárias não são press releases. O desenvolvimento de IA da China correspondeu ao que esse documento descrevia." },
      bluff: { delta: -130, pai: "Isso não era hype — era política. O investimento que se seguiu foi consistente com o documento. Você perdeu um sinal geopolítico." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '2019',
    source: 'Departamento de Defesa dos EUA, Estratégia de IA',
    paiIntro: "O Departamento de Defesa dos EUA publica uma estratégia de IA chamando-a de 'necessidade estratégica'. Sem orçamento específico. Base em princípios. Enquadramento militar em torno da competição com a China. É real?",
    claim: "Os Estados Unidos precisam adotar IA para manter vantagem militar. A IA é uma necessidade estratégica em uma era de grande competição entre potências. O DoD integrará IA em todos os domínios de combate.",
    best: 'small',
    good: ['pass'],
    outcomes: {
      big:   { delta: -80,  pai: "Estratégia sem alocação orçamentária específica é intenção, não compromisso. Os gastos de defesa dos EUA em IA cresceram, mas o documento em si eram princípios, não programa." },
      small: { delta: +100, pai: "Enquadramento certo. Documento de estratégia sem orçamento é sinal mais fraco que o plano chinês de 2017. A intenção era real mas o atraso na implementação era previsível." },
      pass:  { delta: +60,  pai: "Defensável. Sem orçamento, sem programa imediato. A intenção era real mas o documento era princípios, não alocação de recursos." },
      bluff: { delta: -95,  pai: "A intenção estratégica era genuína — os gastos de defesa dos EUA em IA aceleraram depois disso. Chamá-lo de blefe exagerou o ceticismo." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '2023',
    source: 'Departamento de Comércio dos EUA, Anúncio de Controles de Exportação',
    paiIntro: "Os EUA anunciam controles de exportação bloqueando chips semicondutores avançados para a China. Chips específicos nomeados. Com efeito imediato. Sem consulta prévia a aliados.",
    claim: "Novos controles de exportação impedirão a China de obter os semicondutores avançados necessários para treinar modelos de IA de fronteira. Essa ação protege a liderança dos EUA em IA e limita possíveis aplicações militares.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +85,  pai: "Também defensável. Instrumento legal real, chips específicos nomeados, efeito imediato. Controles de exportação criam fricção real mesmo que não impeçam permanentemente o desenvolvimento de capacidades." },
      small: { delta: +105, pai: "Certo. Essa era política real com dentes reais — chips específicos, efeito imediato, aplicação legal. A questão era se funcionaria a longo prazo. Uma aposta cautelosa estava correta." },
      pass:  { delta: -50,  pai: "Controles de exportação são juridicamente vinculantes com aplicação real. As respostas de desenvolvimento de chips da China mostraram que esses controles tiveram impacto real." },
      bluff: { delta: -115, pai: "Controles de exportação legais específicos sobre chips nomeados são instrumentos políticos reais. Isso não era hype." },
    },
  },

  // ── TEST ROUNDS ──────────────────────────────────────────────────────────

  {
    id: 4,
    era: 'test',
    year: '2024',
    source: 'Conferência Tecnológica, CEO de IA',
    paiIntro: "Não está nas suas anotações. Um CEO diz que a IA acabará com a dependência dos EUA da manufatura chinesa inteiramente em quatro anos. Ovação em pé. Investidores na sala. Nenhuma análise econômica apresentada.",
    claim: "A automação por IA tornará as vantagens de custo da manufatura chinesa irrelevantes em quatro anos. Fábricas americanas usando IA serão mais competitivas do que qualquer opção offshore. A era da terceirização acabou.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -150, pai: "Prazo de quatro anos. Certeza total. Público de investidores. Sem análise econômica. Você já viu essa estrutura antes. Sempre." },
      small: { delta: -55,  pai: "Direção errada. Afirmação de prazo mais certeza absoluta mais público de investidores mais sem análise de suporte. A estrutura prevê o resultado." },
      pass:  { delta: +80,  pai: "Bom instinto. A leitura correta era blefe — a estrutura era um overclaim clássico." },
      bluff: { delta: +130, pai: "Certo. Prazo específico, certeza total, sem metodologia, público de investidores, CEO apresentando. Essa é a estrutura de Dartmouth aplicada à geopolítica." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2024',
    source: 'Lei de IA da UE, Fase de Aplicação',
    paiIntro: "A UE começa a aplicar a Lei de IA. Primeiros prazos de conformidade chegam. Uma grande empresa de IA dos EUA recebe um aviso por não apresentar a documentação exigida para um sistema de alto risco implantado na UE.",
    claim: "A aplicação pela UE da Lei de IA a uma empresa americana demonstra que a regulação digital extraterritorial é viável. Outros mercados seguirão o modelo da UE, criando padrões globais de governança de IA.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +80,  pai: "Também defensável. O Efeito Bruxelas — a regulamentação da UE moldando padrões globais — está bem documentado no RGPD. A regulamentação de IA seguindo o mesmo padrão é uma tendência real." },
      small: { delta: +105, pai: "Certo. A primeira ação de aplicação em regulação extraterritorial de IA é um precedente significativo. Não garantido de generalizar, mas sinal real que vale acompanhar." },
      pass:  { delta: -50,  pai: "A primeira aplicação de regulamentação extraterritorial é precedente real. O padrão do RGPD sugeria que isso valia uma pequena aposta." },
      bluff: { delta: -110, pai: "Ação de aplicação real criando precedente legal não é teatro. O Efeito Bruxelas na regulação digital tem um histórico sólido." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2025',
    source: 'Cúpula Internacional de Segurança em IA, Declaração Conjunta',
    paiIntro: "Última rodada. Vinte e oito países assinam uma declaração conjunta sobre segurança em IA, concordando em compartilhar avaliações de segurança antes de implantar modelos de fronteira. Sem aplicação. Voluntário. Mas os signatários incluem EUA, Reino Unido, UE e China.",
    claim: "A Declaração de Bletchley estabelece cooperação internacional sem precedentes em segurança de IA. Com todas as principais potências de IA participando, os compromissos voluntários de compartilhar avaliações de segurança representam um avanço genuíno na governança.",
    best: 'small',
    good: ['pass'],
    outcomes: {
      big:   { delta: -80,  pai: "Voluntário, sem aplicação, mas lista de participantes sem precedentes incluindo a China. Isso é diferente da autogovernança da indústria — mas não é vinculante. O enquadramento de 'avanço genuíno' superestima onde realmente chegou." },
      small: { delta: +100, pai: "Enquadramento certo. Lista de participantes sem precedentes incluindo a China é sinal real. Sem aplicação significa dentes limitados. Uma aposta cautelosa no precedente estava correta." },
      pass:  { delta: +65,  pai: "Defensável. Compromissos voluntários sem aplicação têm histórico misto. Sua cautela foi razoável." },
      bluff: { delta: -95,  pai: "Fazer China e EUA assinarem a mesma declaração de segurança em IA não é teatro — foi diplomaticamente significativo mesmo sem aplicação." },
    },
  },
]

export default dispatchRoundsPT
