import { LessonData } from '../index'

const wm_w4_pt: Record<number, LessonData> = {
  341: {
    id: 341, worldId: 264,
    title: "O Que É Ética?",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "A ética é o ramo da filosofia que questiona como as pessoas devem agir. O que devemos uns aos outros? O que é considerado dano? Como devemos tomar decisões quando há conflito de valores? Várias estruturas éticas importantes aparecem com frequência nas discussões sobre IA." },
      { tag: "Example", title: "Slide 2", body: "O consequencialismo julga as ações pelos seus resultados. Uma ação é considerada boa se produzir o melhor resultado geral. A dificuldade é que os resultados podem ser difíceis de prever. As pessoas também podem discordar sobre o que é considerado o \"melhor\" resultado e quem deveria se beneficiar mais." },
      { tag: "Big idea", title: "Slide 3", body: "A deontologia concentra-se em deveres e regras. Algumas ações podem ser erradas mesmo que levem a um bom resultado. A dificuldade é que as regras podem entrar em conflito. Seguir regras de forma estrita também pode levar a resultados estranhos em situações incomuns." },
      { tag: "Hot take", title: "Slide 4", body: "A ética das virtudes faz uma pergunta diferente: Que tipo de pessoa eu deveria ser? Ela se concentra em qualidades como honestidade, justiça, coragem e compaixão. A dificuldade é que o caráter, por si só, nem sempre diz a alguém exatamente o que fazer em uma situação nova. A ética na IA é importante porque os sistemas de IA podem afetar um grande número de pessoas. As questões éticas não estão separadas da tecnologia. Elas moldam como os sistemas devem ser construídos, testados e usados." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"O ramo da filosofia que questiona como as pessoas devem agir e se tratar"`, answer: true, verdict: "Correto.", explanation: "O que é ética? — O ramo da filosofia que questiona como as pessoas devem agir e se tratar" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Seus resultados — se produzem o melhor resultado geral"`, answer: true, verdict: "Correto.", explanation: "O que o consequencialismo avalia as ações por? — Seus resultados — se produzem o melhor resultado geral" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"As regras podem entrar em conflito umas com as outras, e segui-las de forma estrita pode produzir resultados claramente errados em casos incomuns"`, answer: true, verdict: "Correto.", explanation: "Qual é o principal desafio da deontologia? — As regras podem entrar em conflito umas com as outras, e segui-las de forma estrita pode produzir resultados claramente errados em casos incomuns" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Que tipo de pessoa eu deveria ser?"`, answer: true, verdict: "Correto.", explanation: "Que pergunta central a ética das virtudes faz? — Que tipo de pessoa eu deveria ser?" },
    ],
  },
  342: {
    id: 342, worldId: 264,
    title: "O Problema Do Viés",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "O viés na IA costuma ser descrito como se fosse um simples bug técnico. Geralmente, é mais complicado do que isso. Os sistemas de IA aprendem a partir de dados. Se os dados refletirem desigualdades do passado, o sistema poderá reproduzi-las. Uma ferramenta de contratação treinada com base em decisões de contratação históricas pode aprender padrões que prejudicam determinados candidatos. O modelo não tem preconceito no sentido humano. Ele está copiando padrões de dados enviesados." },
      { tag: "Example", title: "Slide 2", body: "A pergunta mais difícil é o que \"justiça\" deveria significar. Existem várias definições possíveis: • Paridade demográfica: diferentes grupos devem receber resultados semelhantes • Igualdade de precisão: o sistema deve ter um desempenho igualmente bom para grupos diferentes • Justiça individual: indivíduos semelhantes devem ser tratados de maneira semelhante" },
      { tag: "Big idea", title: "Slide 3", body: "Esses objetivos podem entrar em conflito. Um sistema pode melhorar uma medida de justiça e, ao mesmo tempo, piorar outra. Um código melhor pode reduzir o viés. Ele não consegue decidir o que a justiça deve significar. Isso ainda exige o discernimento humano." },
      { tag: "Hot take", title: "Slide 4", body: "Isso significa que o viés na IA não é apenas um problema técnico. É um problema de valores — sobre qual concepção de justiça uma sociedade quer priorizar. Essa questão não pode ser respondida apenas por engenheiros." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Por meio de dados de treinamento que refletem desigualdades históricas"`, answer: true, verdict: "Correto.", explanation: "Como o viés mais comumente entra nos sistemas de IA? — Por meio de dados de treinamento que refletem desigualdades históricas" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Uma definição de justiça em que diferentes grupos demográficos recebem taxas semelhantes de resultados positivos"`, answer: true, verdict: "Correto.", explanation: "O que é paridade demográfica? — Uma definição de justiça em que diferentes grupos demográficos recebem taxas semelhantes de resultados positivos" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Decidir o que a justiça significa exige julgamentos de valor que vão além do que um código melhor pode determinar"`, answer: true, verdict: "Correto.", explanation: "Por que o viés na IA não pode ser totalmente resolvido apenas por meio de correções técnicas? — Decidir o que a justiça significa exige julgamentos de valor que vão além do que um código melhor pode determinar" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Tanto um problema técnico quanto de valores — sobre o que a justiça deve significar e de quem são os interesses que importam"`, answer: true, verdict: "Correto.", explanation: "O viés na IA é melhor entendido como: — Tanto um problema técnico quanto de valores — sobre o que a justiça deve significar e de quem são os interesses que importam" },
    ],
  },
  343: {
    id: 343, worldId: 264,
    title: "O Problema Do Consentimento",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "Muitos sistemas de IA dependem de dados coletados de pessoas que não entendiam perfeitamente como eles seriam usados. Um consentimento significativo exige mais do que clicar em \"concordo\". Uma pessoa deve entender o que está aceitando. Ela também deve ter a escolha real de dizer não." },
      { tag: "Example", title: "Slide 2", body: "Na prática, isso é difícil. Os acordos de termos de serviço podem ter dezenas de páginas. As políticas de privacidade podem estar escritas em jargão jurídico. Optar por não participar pode significar perder o acesso a um serviço do qual as pessoas dependem." },
      { tag: "Big idea", title: "Slide 3", body: "Existe uma diferença entre consentimento técnico e consentimento significativo. Consentimento técnico significa que alguém clicou em um botão. Consentimento significativo significa que a pessoa entendeu a escolha e a fez de livre e espontânea vontade. Nem sempre essas são a mesma coisa." },
      { tag: "Hot take", title: "Slide 4", body: "O problema do consentimento se estende aos criadores. Os geradores de imagens de IA e os modelos de linguagem foram treinados com enormes quantidades de conteúdo criado por humanos — muito extraído da internet sem o conhecimento, consentimento ou remuneração das pessoas que o criaram. O status legal e ético dessa prática é ativamente contestado." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"O consentimento técnico significa clicar em "concordo"; o consentimento significativo significa entender a escolha e ter uma opção genuína de recusar"`, answer: true, verdict: "Correto.", explanation: "Qual é a diferença entre consentimento técnico e consentimento significativo? — O consentimento técnico significa clicar em \"concordo\"; o consentimento significativo significa entender a escolha e ter uma opção genuína de recusar" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Optar por não participar pode significar perder o acesso a serviços centrais para a vida social e profissional das pessoas"`, answer: true, verdict: "Correto.", explanation: "Por que \"simplesmente não usar a plataforma\" geralmente não é uma alternativa realista para a maioria dos usuários? — Optar por não participar pode significar perder o acesso a serviços centrais para a vida social e profissional das pessoas" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Seu trabalho foi frequentemente coletado e usado para treinar sistemas de IA sem permissão ou remuneração"`, answer: true, verdict: "Correto.", explanation: "Que problema de consentimento artistas e criadores enfrentam em relação à IA? — Seu trabalho foi frequentemente coletado e usado para treinar sistemas de IA sem permissão ou remuneração" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Falso — elas geralmente são longas, escritas em linguagem jurídica e raramente lidas ou compreendidas pelos usuários"`, answer: true, verdict: "Correto.", explanation: "Verdadeiro ou falso: As políticas de privacidade geralmente são projetadas para informar claramente os usuários sobre como seus dados serão usados. — Falso — elas geralmente são longas, escritas em linguagem jurídica e raramente lidas ou compreendidas pelos usuários" },
    ],
  },
  344: {
    id: 344, worldId: 264,
    title: "A Lacuna De Responsabilidade",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "Quando um sistema de IA causa danos, quem é o responsável? A resposta nem sempre é óbvia. Vários grupos podem estar envolvidos: os pesquisadores que projetaram o modelo, as empresas que o treinaram, os engenheiros que o implementaram, as empresas que o utilizaram, as pessoas que confiaram nos seus resultados. A responsabilidade pode se espalhar por toda a cadeia. Cada grupo pode apontar o dedo para outro. Isso cria uma lacuna de responsabilidade (accountability gap)." },
      { tag: "Example", title: "Slide 2", body: "Fechar essa lacuna exige regras mais claras sobre quem é responsável quando sistemas automatizados causam danos. Alguns governos estão começando a criar leis para isso. A Lei de IA da União Europeia é uma das principais tentativas de regulamentar os sistemas de IA com base no risco." },
      { tag: "Big idea", title: "Slide 3", body: "Os detalhes continuarão a mudar, mas a pergunta básica é simples: Quem deve prestar contas quando um sistema automatizado afeta a vida de alguém?" },
      { tag: "Hot take", title: "Slide 4", body: "Essa questão se torna mais urgente à medida que os sistemas de IA são implantados em contextos de maior risco — decisões de crédito, recomendações médicas, avaliações de risco criminal — onde as consequências dos erros recaem sobre pessoas específicas que não tiveram nenhum papel no projeto do sistema." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Quando a responsabilidade pelo dano causado pela IA está distribuída entre tantas partes que ninguém é claramente responsável"`, answer: true, verdict: "Correto.", explanation: "O que é a lacuna de responsabilidade (accountability gap)? — Quando a responsabilidade pelo dano causado pela IA está distribuída entre tantas partes que ninguém é claramente responsável" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Cada parte da cadeia apontando a responsabilidade para outra"`, answer: true, verdict: "Correto.", explanation: "Qual destes contribui para a lacuna de responsabilidade? — Cada parte da cadeia apontando a responsabilidade para outra" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Categorizar sistemas de IA por nível de risco e estabelecer requisitos para aplicações de alto risco"`, answer: true, verdict: "Correto.", explanation: "O que a Lei de IA da UE tenta fazer? — Categorizar sistemas de IA por nível de risco e estabelecer requisitos para aplicações de alto risco" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Os erros em contextos de alto risco — crédito, saúde, justiça criminal — recaem sobre pessoas específicas que não tiveram nenhum papel no projeto do sistema"`, answer: true, verdict: "Correto.", explanation: "Por que a lacuna de responsabilidade se torna mais urgente à medida que a IA é implantada em contextos de maior risco? — Os erros em contextos de alto risco — crédito, saúde, justiça criminal — recaem sobre pessoas específicas que não tiveram nenhum papel no projeto do sistema" },
    ],
  },
  345: {
    id: 345, worldId: 264,
    title: "O Problema Da Transparência",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "As pessoas muitas vezes querem que os sistemas de IA expliquem as suas decisões. Isso parece razoável. Se um sistema influencia a possibilidade de alguém receber um empréstimo, ser sinalizado como um risco ou receber uma recomendação médica, a pessoa pode querer saber o porquê." },
      { tag: "Example", title: "Slide 2", body: "A dificuldade é que alguns sistemas poderosos de IA são difíceis de explicar. Uma rede neural profunda nem sempre toma decisões por meio de uma lista curta de regras legíveis. Seu resultado pode emergir de muitos cálculos distribuídos por uma grande rede." },
      { tag: "Big idea", title: "Slide 3", body: "Os pesquisadores estão tentando tornar os sistemas de IA mais interpretáveis. Mas as explicações podem ser imperfeitas. Uma explicação simplificada pode não captar tudo o que está acontecendo dentro do modelo." },
      { tag: "Hot take", title: "Slide 4", body: "Em cenários de alto risco, a precisão não é o único objetivo. As pessoas também precisam de transparência, de supervisão e de uma maneira de contestar os erros. Esses não são recursos opcionais — são pré-requisitos para que sistemas que afetam a vida das pessoas operem de forma legítima." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"As decisões emergem de bilhões de pesos em muitas camadas, em vez de um conjunto legível de regras"`, answer: true, verdict: "Correto.", explanation: "Por que a transparência é genuinamente difícil para sistemas de IA complexos? — As decisões emergem de bilhões de pesos em muitas camadas, em vez de um conjunto legível de regras" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Contextos de alto risco como concessão de crédito, saúde e justiça criminal"`, answer: true, verdict: "Correto.", explanation: "Em que contextos a falta de transparência da IA importa mais? — Contextos de alto risco como concessão de crédito, saúde e justiça criminal" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Uma explicação simplificada pode não capturar com precisão o que o modelo realmente fez internamente"`, answer: true, verdict: "Correto.", explanation: "Qual é uma limitação das explicações simplificadas de IA? — Uma explicação simplificada pode não capturar com precisão o que o modelo realmente fez internamente" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Sistemas que afetam a vida das pessoas precisam ser responsabilizáveis e contestáveis, não apenas precisos"`, answer: true, verdict: "Correto.", explanation: "Por que a transparência e a capacidade de contestar decisões são tratadas como pré-requisitos, e não como recursos opcionais, na IA de alto risco? — Sistemas que afetam a vida das pessoas precisam ser responsabilizáveis e contestáveis, não apenas precisos" },
    ],
  },
  346: {
    id: 346, worldId: 264,
    title: "Autonomia E Manipulação",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "Os sistemas de IA costumam ser projetados para prever comportamentos. Isso pode ser útil. Um aplicativo de recomendação pode ajudar alguém a descobrir uma música que vai adorar. Um aplicativo de navegação pode sugerir uma rota mais rápida. Mas os sistemas que preveem comportamentos também podem influenciar esses comportamentos. Os feeds de redes sociais, os anúncios direcionados e os algoritmos de recomendação podem ser projetados para manter os usuários engajados pelo maior tempo possível." },
      { tag: "Example", title: "Slide 2", body: "A linha que separa a persuasão da manipulação é importante. A persuasão oferece a alguém informações e razões. A manipulação tira proveito das vulnerabilidades ou das emoções de uma pessoa de maneiras que ela talvez não perceba." },
      { tag: "Big idea", title: "Slide 3", body: "Uma plataforma não precisa mentir para influenciar alguém. Ela pode moldar o que a pessoa vê, quando vê e com que frequência vê. É por isso que a atenção tem valor." },
      { tag: "Hot take", title: "Slide 4", body: "A autonomia — a capacidade de formar suas próprias opiniões e tomar suas próprias decisões — é gradualmente comprometida quando o ambiente de informação que você habita é moldado por sistemas que otimizam algo que não seja a sua compreensão ou bem-estar." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A persuasão fornece razões; a manipulação explora vulnerabilidades de maneiras que a pessoa talvez não perceba"`, answer: true, verdict: "Correto.", explanation: "O que distingue persuasão de manipulação? — A persuasão fornece razões; a manipulação explora vulnerabilidades de maneiras que a pessoa talvez não perceba" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Moldando o que os usuários veem, quando veem e com que frequência — sem deturpar nada"`, answer: true, verdict: "Correto.", explanation: "Como uma plataforma pode influenciar o comportamento sem mentir? — Moldando o que os usuários veem, quando veem e com que frequência — sem deturpar nada" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A atenção é um recurso cognitivo limitado e as plataformas competem por ela comercialmente"`, answer: true, verdict: "Correto.", explanation: "Por que a atenção é descrita como tendo valor? — A atenção é um recurso cognitivo limitado e as plataformas competem por ela comercialmente" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Moldando o ambiente de informação em direção ao conteúdo que maximiza o engajamento em vez da compreensão ou do bem-estar"`, answer: true, verdict: "Correto.", explanation: "Como os sistemas de recomendação minam gradualmente a autonomia? — Moldando o ambiente de informação em direção ao conteúdo que maximiza o engajamento em vez da compreensão ou do bem-estar" },
    ],
  },
  347: {
    id: 347, worldId: 264,
    title: "O Problema Do Alinhamento",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "O problema do alinhamento faz uma pergunta simples: Como garantir que um sistema de IA faça o que as pessoas realmente querem? A dificuldade é que as pessoas nem sempre dizem exatamente o que querem dizer." },
      { tag: "Example", title: "Slide 2", body: "Imagine mandar um sistema maximizar o número de cliques em uma plataforma. Ele pode descobrir que a raiva e a ansiedade aumentam o engajamento. Tecnicamente, ele está sendo bem-sucedido. Mas não está produzindo o resultado que as pessoas realmente desejavam." },
      { tag: "Big idea", title: "Slide 3", body: "Esse problema se apresenta de muitas formas: • Um algoritmo de recomendação promove conteúdo inflamatório • Um sistema de moderação bloqueia postagens inofensivas • Uma ferramenta de correção recompensa uma escrita baseada em fórmulas • Um sistema encontra um atalho que melhora a pontuação sem resolver o problema real" },
      { tag: "Hot take", title: "Slide 4", body: "Os valores humanos são complicados. Eles dependem do contexto. As pessoas discordam a respeito deles. Mesmo quando concordam, podem ter dificuldade em explicar os seus valores com precisão. O alinhamento é o desafio de traduzir objetivos humanos em instruções que um sistema possa seguir de forma confiável. Isso continua sendo um problema em aberto." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"O desafio de garantir que os sistemas de IA persigam os objetivos que os humanos realmente pretendem, e não apenas as métricas que receberam"`, answer: true, verdict: "Correto.", explanation: "O que é o problema do alinhamento? — O desafio de garantir que os sistemas de IA persigam os objetivos que os humanos realmente pretendem, e não apenas as métricas que receberam" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um sistema otimiza uma métrica de proxy mensurável enquanto perde o objetivo real — "vencendo" o jogo errado"`, answer: true, verdict: "Correto.", explanation: "Que padrão uma falha de alinhamento segue? — Um sistema otimiza uma métrica de proxy mensurável enquanto perde o objetivo real — \"vencendo\" o jogo errado" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um algoritmo de recomendação promovendo conteúdo inflamatório porque aumenta o engajamento"`, answer: true, verdict: "Correto.", explanation: "Qual destes é um exemplo de falha de alinhamento? — Um algoritmo de recomendação promovendo conteúdo inflamatório porque aumenta o engajamento" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Os valores humanos dependem do contexto, às vezes são contraditórios e difíceis de especificar com precisão suficiente para um sistema seguir de forma confiável em todas as situações"`, answer: true, verdict: "Correto.", explanation: "Por que o alinhamento continua sendo um problema em aberto? — Os valores humanos dependem do contexto, às vezes são contraditórios e difíceis de especificar com precisão suficiente para um sistema seguir de forma confiável em todas as situações" },
    ],
  },
  348: {
    id: 348, worldId: 264,
    title: "Quem Decide?",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "O desenvolvimento da IA está concentrado em um número relativamente pequeno de empresas, de laboratórios de pesquisa e de governos. As decisões tomadas por essas organizações podem afetar pessoas no mundo todo. Quem deveria estabelecer as regras?" },
      { tag: "Example", title: "Slide 2", body: "Empresas e pesquisadores: Os defensores argumentam que os especialistas e os desenvolvedores são os que melhor entendem a tecnologia e podem agir rapidamente. O risco é que um pequeno grupo de organizações privadas tome decisões que afetam todas as outras pessoas. Governos: Os defensores argumentam que instituições eleitas devem regulamentar tecnologias poderosas. O risco é que os governos ajam lentamente ou não tenham conhecimento técnico." },
      { tag: "Big idea", title: "Slide 3", body: "Organizações internacionais: Os defensores argumentam que a IA é global e precisa de supervisão internacional. O risco é que os países discordem sobre as regras ou se recusem a cooperar. Comunidades afetadas: Os defensores argumentam que as pessoas diretamente afetadas pelos sistemas de IA deveriam ter voz sobre como esses sistemas são usados. A dificuldade é tornar essa participação significativa em vez de simbólica." },
      { tag: "Hot take", title: "Slide 4", body: "Não existe uma resposta perfeita. Mas deixar as grandes decisões inteiramente a cargo de um pequeno grupo de engenheiros e executivos não é uma escolha neutra. É uma escolha sobre quem detém o poder. Essa é uma das questões mais importantes na ética da IA." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Principalmente em um pequeno número de empresas, laboratórios de pesquisa e governos"`, answer: true, verdict: "Correto.", explanation: "Onde o desenvolvimento de IA está atualmente concentrado? — Principalmente em um pequeno número de empresas, laboratórios de pesquisa e governos" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um pequeno grupo de organizações privadas toma decisões que afetam todos, sem ampla responsabilização"`, answer: true, verdict: "Correto.", explanation: "Qual é o principal risco da governança de IA baseada no mercado? — Um pequeno grupo de organizações privadas toma decisões que afetam todos, sem ampla responsabilização" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Os países podem discordar sobre as regras ou se recusar a cooperar, como têm feito em desafios globais comparáveis"`, answer: true, verdict: "Correto.", explanation: "Qual é o principal desafio da governança internacional de IA? — Os países podem discordar sobre as regras ou se recusar a cooperar, como têm feito em desafios globais comparáveis" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Permitir que um pequeno grupo tome decisões em escala civilizatória sem responsabilização é, em si, uma decisão sobre quem detém o poder"`, answer: true, verdict: "Correto.", explanation: "Por que deixar a governança da IA a cargo de engenheiros e executivos é descrito como uma escolha, e não como um padrão neutro? — Permitir que um pequeno grupo tome decisões em escala civilizatória sem responsabilização é, em si, uma decisão sobre quem detém o poder" },
    ],
  },
}

export default wm_w4_pt
