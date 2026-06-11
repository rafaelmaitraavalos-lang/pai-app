import type { AnalystRound } from './analystRounds'

const analystRoundsPT: AnalystRound[] = [

  {
    id: 1,
    era: 'training',
    year: '1843',
    source: 'Notas de Ada Lovelace — Motor Analítico',
    paiIntro: "Começamos com facilidade. Uma matemática publicando notas sobre uma máquina que ainda não existe. A afirmação é enorme. O que você faz com isso?",
    claim: "Esta máquina poderia compor peças musicais elaboradas, produzir figuras e gráficos, e resolver problemas de qualquer grau de complexidade — desde que receba as operações corretas.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +130, pai: "Certo. Ela publicou o primeiro algoritmo da história em 1843. Previu a computação de uso geral um século antes de ela existir. A afirmação não era exagero. Era precoce." },
      small: { delta: +60,  pai: "Boa cautela. Mas a aposta certa aqui era total — ela previu exatamente o que as máquinas fariam um século depois." },
      pass:  { delta: -80,  pai: "A máquina era teórica, mas a afirmação era real. Ela publicou o primeiro algoritmo da história. Você perdeu um sinal verdadeiro." },
      bluff: { delta: -130, pai: "Não foi blefe. Ela formalizou o que as máquinas poderiam fazer antes de qualquer máquina existir. O primeiro algoritmo da história." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '1956',
    source: 'Proposta da Conferência de Dartmouth',
    paiIntro: "O campo acabou de ganhar nome. Os melhores pesquisadores prometem resolver tudo em um verão. Você reconhece essa estrutura?",
    claim: "Propomos que a inteligência artificial pode ser resolvida em dois meses com dez pesquisadores cuidadosamente selecionados trabalhando em tempo integral.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -150, pai: "Esse 'verão' se tornou 70 anos e ainda não acabou. A visão era real. O prazo era impossível. Você financiou a confiança, não a ciência." },
      small: { delta: -50,  pai: "Ainda no sentido errado. A promessa era genuína na intenção, mas o erro estava no prazo. Você não percebeu o blefe." },
      pass:  { delta: +70,  pai: "Bom instinto. Você sentiu que algo estava errado. O correto era desmascarar o blefe, mas não investir bate investir." },
      bluff: { delta: +130, pai: "Certo. Prazo impossível, confiança absoluta, os melhores na sala. O nome pegou. A ambição era certa. A velocidade foi o erro clássico da IA." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '1974',
    source: 'Relatório Lighthill / Comitês de Financiamento',
    paiIntro: "O campo quebrou duas vezes. Laboratórios fechando. Consenso formado: tudo foi hype. A multidão vai embora. Você vai junto?",
    claim: "A pesquisa em IA não produziu nada de valor duradouro e é fundamentalmente equivocada. A retirada completa de financiamento é a resposta racional.",
    best: 'pass',
    good: ['small'],
    outcomes: {
      big:   { delta: -130, pai: "Contrarian demais. O campo estava genuinamente quebrado nos anos 70. Apostar pesado contra o consenso queimou capital que você precisava depois." },
      small: { delta: +80,  pai: "Quadro certo. O campo estava overhyped, mas a questão era real. Uma pequena aposta mantém o fio vivo enquanto a multidão corrige demais." },
      pass:  { delta: +100, pai: "Defensável. Você não jogou bom dinheiro atrás do ruim. Esse foi o Primeiro Inverno da IA. As ideias que sobreviveram se tornaram a base de tudo." },
      bluff: { delta: -110, pai: "O consenso pessimista estava parcialmente certo — os invernos foram reais. Não dá para chamar de blefe quando as falhas eram genuínas." },
    },
  },

  {
    id: 4,
    era: 'training',
    year: '1997',
    source: 'IBM Research / Imprensa Internacional',
    paiIntro: "Deep Blue acabou de vencer o campeão mundial de xadrez. As manchetes dizem que as máquinas finalmente podem pensar. O que você faz com isso?",
    claim: "A vitória do Deep Blue sobre Kasparov demonstra que as máquinas atingiram inteligência genuína. O limiar foi ultrapassado.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -140, pai: "O Deep Blue não conseguia jogar damas. Tinha um truque. Você acabou de financiar uma peça de xadrez muito cara." },
      small: { delta: -55,  pai: "Mesmo uma aposta pequena perde. 'Inteligência genuína' de um sistema que não consegue sair do tabuleiro de xadrez — é teatro." },
      pass:  { delta: +70,  pai: "Bom instinto. Você sentiu que algo estava errado. O correto era desmascarar o blefe, mas não investir bate investir." },
      bluff: { delta: +130, pai: "Exatamente certo. Uma tarefa estreita. Não reconhecia um rosto. Não conseguia ter uma conversa. Derrotar Kasparov era cálculo rápido, não inteligência." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2012',
    source: 'ImageNet Large Scale Visual Recognition Challenge',
    paiIntro: "Uma competição técnica obscura publicou resultados. Uma equipe ganhou por uma margem que não deveria ser possível. Sem comunicado de imprensa. Seu trabalho é notar o que os outros não notam.",
    claim: "A AlexNet alcançou uma melhoria de 10,8 pontos percentuais sobre o segundo lugar usando uma rede neural convolucional profunda treinada em clusters de GPU.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +150, pai: "Foi esse momento. GPT, Claude, DALL-E, Gemini — tudo remonta a esse resultado. Você captou o sinal real antes do ruído chegar." },
      small: { delta: +65,  pai: "Você notou algo real, mas foi cauteloso demais. Esse foi o momento da AlexNet, a mudança de paradigma real. Você não estava dormindo." },
      pass:  { delta: -80,  pai: "Uma margem de 10,8 pontos numa competição onde 0,1 pontos importa. Isso não é ruído. Os que perceberam isso construíram o futuro." },
      bluff: { delta: -145, pai: "Essa margem não era hype. Era um resultado científico que virou um campo inteiro quase da noite para o dia. O oposto de um blefe." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2018',
    source: 'Startup de Recrutamento com IA',
    paiIntro: "Uma startup está apresentando uma ferramenta de recrutamento com IA que parece impressionante. Dez anos de dados históricos. Resultados rápidos. O que os dados escondem?",
    claim: "Nossa ferramenta foi treinada com dez anos de dados de contratações bem-sucedidas e identifica candidatos fortes mais rápido do que qualquer avaliador humano. A demonstração fala por si mesma.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -140, pai: "Os dados de treinamento vieram principalmente de homens. O sistema aprendeu esse padrão e penalizou currículos associados a mulheres. O viés estava nos dados." },
      small: { delta: -60,  pai: "Mesmo uma aposta pequena no dataset envenenado perde. A demonstração era real. O problema era o que a demo não mostrava." },
      pass:  { delta: +70,  pai: "Cautela razoável. O correto era desmascarar o blefe — mas não investir em dados envenenados é a decisão inteligente." },
      bluff: { delta: +130, pai: "Certo. Dez anos de dados de uma empresa que historicamente contratava principalmente homens. Esse é um dataset com um problema embutido. O viés estava nos dados." },
    },
  },

  {
    id: 7,
    era: 'test',
    year: '2022',
    source: 'Mídia / Consultor de Tecnologia',
    paiIntro: "Um produto de IA atingiu 100 milhões de usuários em dois meses — mais rápido do que qualquer app na história. Um consultor está chamando de moda passageira. Quem está errado?",
    claim: "Este produto atingiu 100 milhões de usuários em tempo recorde. É claramente uma moda passageira — os usuários vão embora quando a novidade acabar. Já vimos isso antes.",
    best: 'bluff',
    good: ['big'],
    outcomes: {
      big:   { delta: +80,  pai: "Você viu o sinal certo. Mas o enquadramento mais preciso era desmascarar o consultor — não apenas investir no produto." },
      small: { delta: -30,  pai: "Você não foi convencido de nenhum lado. A velocidade de adoção era um sinal claro. Cautela demais aqui perdeu o ponto." },
      pass:  { delta: +40,  pai: "Você não foi enganado pelo consultor. Mas o correto era desmascarar ativamente o blefe dele." },
      bluff: { delta: +130, pai: "Exatamente. O ChatGPT não foi moda passageira. O consultor cometeu o mesmo erro que as pessoas cometeram com o Deep Blue — só que ao contrário." },
    },
  },

  {
    id: 8,
    era: 'test',
    year: 'Hoje',
    source: 'Dois pesquisadores em fóruns opostos',
    paiIntro: "Última rodada. Dois especialistas. Certezas opostas. Nenhum admite dúvida. Um afirma que tudo vai mudar em cinco anos. O outro afirma que nada vai mudar nunca. O que você faz?",
    claim: "Um pesquisador afirma que a IA resolverá todos os principais problemas humanos em cinco anos. Outro afirma que a IA é fundamentalmente incapaz de inteligência real. Qual dos dois você apoia?",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -100, pai: "Você apostou no otimista. Apostar tudo em 'cinco anos' é o mesmo erro de Dartmouth. A história da IA é uma história de especialistas confiantes que erram." },
      small: { delta: -50,  pai: "Mesmo uma aposta pequena no otimista perde. A incerteza sobre cronogramas é a única certeza honesta nesse campo." },
      pass:  { delta: +70,  pai: "Cauteloso. Você não foi convencido por nenhum. O correto era desmascarar os dois, mas não investir em nenhum lado bate investir no lado errado." },
      bluff: { delta: +140, pai: "Exatamente. A história da IA é uma história de especialistas que se enganam com confiança nos dois sentidos. Quem afirma certeza sobre o cronograma está se precipitando." },
    },
  },

]

export default analystRoundsPT
