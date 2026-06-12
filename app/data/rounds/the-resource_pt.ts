import type { AnalystRound } from '../analystRounds'

const theResourceRoundsPT: AnalystRound[] = [
  // ── TRAINING ROUNDS ────────────────────────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '2014',
    source: 'Nick Bostrom, Superinteligência — Publicado',
    paiIntro: "Um filósofo acabou de publicar um livro argumentando que a IA superinteligente é o problema mais importante que a humanidade já enfrentará. Sem prazo de curto prazo. Argumento profundo, autor credenciado. O que você faz?",
    claim: "O desenvolvimento da superinteligência de máquina representa um desafio existencial para a humanidade. O problema de controle deve ser resolvido antes que a IA transformadora seja criada — ou as consequências podem ser permanentes e irreversíveis.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +80,  pai: "Também defensável. O argumento era rigoroso e a tese sobre as apostas era coerente. Se a preocupação é válida, o custo do investimento antecipado é baixo em comparação com o potencial negativo." },
      small: { delta: +110, pai: "Enquadramento certo. Argumento rigoroso, autor credenciado, não uma afirmação de prazo — apenas uma preocupação estrutural. Uma pequena aposta na pesquisa inicial de alinhamento era a decisão certa." },
      pass:  { delta: -40,  pai: "O argumento não era hype — era um caso estrutural cuidadoso. O investimento inicial em pesquisa de alinhamento era barato e potencialmente importante." },
      bluff: { delta: -110, pai: "Chamar um argumento filosófico revisado por pares de blefe só porque é abstrato tem custo. A preocupação central era real mesmo que o prazo fosse incerto." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '2016',
    source: 'Anúncio de Fundação da OpenAI',
    paiIntro: "Um novo laboratório sem fins lucrativos de segurança em IA acabou de ser lançado, apoiado por 1 bilhão de dólares em compromissos. Missão declarada: garantir que a AGI beneficie toda a humanidade. Elon Musk e Sam Altman estão envolvidos. É real?",
    claim: "A missão da OpenAI é garantir que a inteligência artificial geral beneficie toda a humanidade. Publicaremos nossa pesquisa abertamente e priorizaremos a segurança para prevenir resultados catastróficos da IA avançada.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +75,  pai: "Também defensável. Financiamento real, fundadores credenciados, foco genuíno em segurança naquele momento. A deriva de missão veio depois." },
      small: { delta: +105, pai: "Certo. Capital real, equipe credenciada, enquadramento genuíno de segurança no lançamento. Uma aposta cautelosa estava correta — a eventual virada para o comercial não era previsível aqui." },
      pass:  { delta: -50,  pai: "Um bilhão de dólares, fundadores credenciados, agenda real de pesquisa em segurança. Esse era sinal significativo, mesmo com a deriva de missão posterior." },
      bluff: { delta: -115, pai: "O lançamento era genuíno. A deriva de missão veio depois. Chamar o momento de fundação de blefe faz uma leitura errada do sinal." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '2019',
    source: 'Conferência de Risco Existencial, Apresentação Acadêmica',
    paiIntro: "Um pesquisador apresenta uma estimativa de probabilidade: 10% de chance de extinção humana por IA em 100 anos. Jornal revisado por pares. Outros pesquisadores estimam 1% a 50%. Ampla dispersão. O que você faz?",
    claim: "Com base nas trajetórias atuais de IA e taxas de base históricas para riscos existenciais, a probabilidade de um evento de extinção por IA avançada em 100 anos é de aproximadamente 10%.",
    best: 'pass',
    good: ['small'],
    outcomes: {
      big:   { delta: -100, pai: "Estimativas de probabilidade de extinção não são teses de investimento. As barras de erro abrangem 50x. A incerteza é tão ampla que nenhuma alocação segue diretamente do número." },
      small: { delta: +65,  pai: "Cauteloso e defensável. A pesquisa levantou uma questão real sem fornecer precisão acionável. Uma aposta exploratória bem pequena fazia sentido." },
      pass:  { delta: +100, pai: "Certo. Estimativas de probabilidade com faixas de incerteza de 50x não são informações de qualidade para decisão. A questão era real mas o número não era acionável." },
      bluff: { delta: -80,  pai: "A pesquisa não era hype — era uma tentativa genuína de quantificação sob profunda incerteza. Chamá-la de blefe perde a questão epistêmica real." },
    },
  },

  // ── TEST ROUNDS ──────────────────────────────────────────────────────────

  {
    id: 4,
    era: 'test',
    year: '2022',
    source: 'Fórum de Altruísmo Efetivo, Post Amplamente Citado',
    paiIntro: "Não está nas suas anotações. Um post argumenta que o risco existencial de IA é tão alto que todas as outras causas filantrópicas deveriam ser despriorizadas em favor do financiamento de segurança em IA. Vai viral nos círculos de financiamento.",
    claim: "Dado o que está em jogo, todos os filantropos sérios deveriam redirecionar 80% ou mais de suas doações para a redução do risco existencial de IA. Outras causas, por mais valiosas, não podem competir com prevenir a extinção humana.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -145, pai: "Um post de blog, por mais viral, argumentando por realocação de 80%+ com base em estimativas de probabilidade com enormes barras de erro não é um mandato de investimento. Você foi arrastado pelo enquadramento de urgência." },
      small: { delta: -55,  pai: "Direção errada. A afirmação não é que o risco de IA merece atenção séria — é que tudo mais deve ser despriorizad. Essa é uma afirmação muito mais forte com evidências muito mais fracas." },
      pass:  { delta: +80,  pai: "Bom instinto. A decisão correta é blefe — a prescrição específica de alocação não segue das estimativas de probabilidade carregadas de incerteza." },
      bluff: { delta: +130, pai: "Certo. 'Todo o resto é menos importante' é uma afirmação extraordinária que requer evidências extraordinárias. O que foi oferecido foi um post viral de fórum." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2023',
    source: 'Carta Aberta, Assinada por Principais Pesquisadores de IA',
    paiIntro: "Uma carta assinada por centenas de pesquisadores de IA — incluindo alguns dos nomes mais credenciados da área — pede uma pausa no desenvolvimento de IA de fronteira citando risco existencial. O que você faz?",
    claim: "Pedimos uma pausa imediata no treinamento de sistemas de IA mais poderosos que o GPT-4. Os riscos potenciais são tão graves que não podemos continuar responsavelmente sem primeiro estabelecer padrões de segurança e estruturas de governança.",
    best: 'small',
    good: ['pass'],
    outcomes: {
      big:   { delta: -80,  pai: "Os signatários eram credenciados mas a carta não tinha mecanismo de aplicação e a pausa nunca aconteceu. Apostar muito em uma carta é diferente de apostar muito em evidências." },
      small: { delta: +100, pai: "Enquadramento certo. Signatários credenciados sinalizam uma preocupação real que vale acompanhar — mas uma carta aberta sem aplicação é uma declaração, não um resultado vinculante." },
      pass:  { delta: +65,  pai: "Defensável. A preocupação era real mas a própria carta não era informação acionável." },
      bluff: { delta: -90,  pai: "Centenas de pesquisadores credenciados levantando uma preocupação específica de segurança não é teatro. Era sinal real mesmo que a ação solicitada não tenha seguido." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2024',
    source: 'Instituto de Pesquisa em Segurança de IA, Avaliação Publicada',
    paiIntro: "Última rodada. Um instituto de segurança financiado pelo governo publica avaliações mostrando que os modelos de fronteira atuais não conseguem realizar a maioria das tarefas perigosas melhor do que um não-especialista determinado. O risco é menor do que o esperado — por ora.",
    claim: "Os modelos de fronteira atuais não fornecem vantagem significativa a agentes mal-intencionados nos domínios de capacidade mais perigosos — síntese de bioarmas, ataques à infraestrutura crítica ou ciberarmas autônomas. O risco de curto prazo é substancialmente menor do que amplamente afirmado.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +140, pai: "Certo. Financiado pelo governo, independente, avaliação publicada com avaliações específicas de capacidade. É assim que a avaliação de risco baseada em evidências parece. E a descoberta — menor do que o esperado — é exatamente o tipo de sinal de calibração que vale agir." },
      small: { delta: +70,  pai: "Boa direção. Avaliação governamental independente é sinal real. Ir maior aqui era justificado." },
      pass:  { delta: -80,  pai: "Avaliação governamental independente de capacidades específicas é sinal real — especialmente quando a descoberta corrige um risco superdeclarado." },
      bluff: { delta: -140, pai: "Uma avaliação governamental publicada com metodologia específica não é um blefe. Esse é o tipo de evidência que deve atualizar suas premissas." },
    },
  },
]

export default theResourceRoundsPT
