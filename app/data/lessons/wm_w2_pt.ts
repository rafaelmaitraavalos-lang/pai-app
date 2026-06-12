import { LessonData } from '../index'

const wm_w2_pt: Record<number, LessonData> = {
  321: {
    id: 321, worldId: 262,
    title: "O Que É Uma Rede Neural?",
    stops: [
      { tag: "Fact", title: "Matemática, Não um Mini Cérebro", body: "Muitos sistemas modernos de IA usam uma estrutura chamada rede neural. O nome é baseado no cérebro. O cérebro humano contém bilhões de neurônios conectados uns aos outros. Essas conexões mudam à medida que as pessoas aprendem. As redes neurais artificiais pegam emprestada uma versão muito simplificada dessa ideia. Elas não são cérebros em miniatura. São sistemas matemáticos compostos por unidades conectadas, frequentemente chamadas de nós." },
      { tag: "Example", title: "Três Camadas, Um Sistema", body: "Uma rede neural básica tem três partes: • Camada de entrada: recebe informações, como pixels, palavras ou números • Camadas ocultas: processam e transformam essas informações • Camada de saída: produz um resultado, como uma previsão ou classificação" },
      { tag: "Big idea", title: "Pesos Conduzem o Aprendizado", body: "As conexões entre os nós possuem valores chamados de pesos. Um peso determina a intensidade com que uma informação influencia a outra. Treinar uma rede neural significa ajustar esses pesos até que o sistema se torne melhor em sua tarefa." },
      { tag: "Hot take", title: "Precisão Exige Repetição", body: "No início do treinamento, uma rede neural não é muito útil. Suas previsões podem ser extremamente imprecisas. A melhoria vem inteiramente do ajuste repetido dos pesos ao longo de um número enorme de exemplos." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um sistema matemático de nós conectados que processa informações"`, answer: true, verdict: "Correto.", explanation: "O que é uma rede neural? — Um sistema matemático de nós conectados que processa informações" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Valores que controlam a intensidade com que um nó influencia o outro"`, answer: true, verdict: "Correto.", explanation: "O que são pesos em uma rede neural? — Valores que controlam a intensidade com que um nó influencia o outro" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Ajustar os pesos repetidamente ao longo de muitos exemplos até que as previsões melhorem"`, answer: true, verdict: "Correto.", explanation: "O que treinar uma rede neural realmente envolve? — Ajustar os pesos repetidamente ao longo de muitos exemplos até que as previsões melhorem" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Camada de saída"`, answer: true, verdict: "Correto.", explanation: "Qual parte de uma rede neural produz o resultado final? — Camada de saída" },
    ],
  },
  322: {
    id: 322, worldId: 262,
    title: "Como As Redes São Treinadas",
    stops: [
      { tag: "Fact", title: "Começa Inútil, Vai Melhorando", body: "No início do treinamento, uma rede neural não é muito útil. Suas previsões podem ser extremamente imprecisas. O treinamento ajuda a rede a melhorar por meio de um processo estruturado." },
      { tag: "Example", title: "O Ciclo de Treinamento", body: "O processo de treinamento: 1. A rede faz uma previsão. 2. A previsão é comparada com a resposta correta. 3. O sistema mede a diferença. Essa diferença é chamada de perda (loss) ou erro. 4. A rede ajusta levemente seus pesos para reduzir o erro. 5. O processo se repete várias e várias vezes." },
      { tag: "Big idea", title: "Backprop e Gradiente Descendente", body: "Um dos métodos usados para atualizar os pesos é chamado de backpropagation. Ele funciona de trás para frente na rede para calcular quais pesos mais contribuíram para o erro. Outro conceito importante é o gradient descent — o sistema dando pequenos passos na direção que diminui o seu erro." },
      { tag: "Hot take", title: "Bilhões de Pequenos Passos", body: "Nenhum ajuste individual muda muita coisa. A melhoria vem da repetição. É por isso que grandes modelos exigem recursos computacionais enormes e tempo para treinar — não porque qualquer etapa individual seja complexa, mas porque um desempenho útil requer bilhões delas." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Uma medida de quão distante a previsão da rede está da resposta correta"`, answer: true, verdict: "Correto.", explanation: "O que é \"perda\" (loss) no contexto do treinamento de redes neurais? — Uma medida de quão distante a previsão da rede está da resposta correta" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Uma técnica que percorre a rede de trás para frente para identificar quais pesos mais contribuíram para o erro"`, answer: true, verdict: "Correto.", explanation: "O que é backpropagation? — Uma técnica que percorre a rede de trás para frente para identificar quais pesos mais contribuíram para o erro" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"O processo do sistema dando pequenos passos na direção que reduz seu erro"`, answer: true, verdict: "Correto.", explanation: "O que é gradient descent? — O processo do sistema dando pequenos passos na direção que reduz seu erro" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um desempenho útil requer bilhões de pequenos ajustes, não porque qualquer etapa individual seja complexa"`, answer: true, verdict: "Correto.", explanation: "Por que treinar grandes modelos exige recursos computacionais enormes? — Um desempenho útil requer bilhões de pequenos ajustes, não porque qualquer etapa individual seja complexa" },
    ],
  },
  323: {
    id: 323, worldId: 262,
    title: "Deep Learning",
    stops: [
      { tag: "Fact", title: "Profundidade São Camadas", body: "Uma rede neural é composta por camadas. Uma rede rasa tem apenas algumas camadas ocultas. Uma rede profunda tem muitas outras. É isso que a palavra \"profundo\" (deep) significa em deep learning. O sistema não está pensando de forma mais profunda. A informação apenas passa por mais camadas de cálculos." },
      { tag: "Example", title: "Cada Camada Aprende Algo", body: "Em um sistema de reconhecimento de imagem, diferentes camadas podem responder a diferentes tipos de informações visuais: • As primeiras camadas podem detectar bordas ou linhas • As camadas intermediárias podem detectar texturas ou formas • As camadas mais profundas podem combinar esses padrões em características mais complexas Por exemplo, um sistema pode passar gradualmente de perceber linhas simples para identificar partes de um rosto, de uma roda ou de um animal." },
      { tag: "Big idea", title: "Padrões Surgem do Treinamento", body: "Nenhum programador escreve cada uma dessas características manualmente. O sistema desenvolve padrões internos úteis por meio do treinamento. A profundidade ajuda, mas não é mágica. Uma rede mais profunda não é automaticamente melhor em todas as tarefas." },
      { tag: "Hot take", title: "Escala Fez a Diferença", body: "O deep learning impulsionou os grandes avanços da década de 2010, incluindo o sucesso do AlexNet no reconhecimento de imagens em 2012 e o AlphaGo derrotando o campeão mundial de Go em 2016. Esses resultados não vieram de uma nova ideia fundamental, mas da aplicação de ideias existentes em uma escala muito maior." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A rede neural contém muitas camadas de processamento"`, answer: true, verdict: "Correto.", explanation: "O que \"profundo\" (deep) significa em deep learning? — A rede neural contém muitas camadas de processamento" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Bordas e linhas"`, answer: true, verdict: "Correto.", explanation: "O que as primeiras camadas de uma rede profunda de reconhecimento de imagens podem detectar? — Bordas e linhas" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"O sistema as desenvolve por meio do treinamento com dados"`, answer: true, verdict: "Correto.", explanation: "Como uma rede neural profunda desenvolve suas representações internas? — O sistema as desenvolve por meio do treinamento com dados" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A aplicação das ideias existentes de deep learning em uma escala muito maior"`, answer: true, verdict: "Correto.", explanation: "O que impulsionou os grandes avanços de IA da década de 2010? — A aplicação das ideias existentes de deep learning em uma escala muito maior" },
    ],
  },
  324: {
    id: 324, worldId: 262,
    title: "Como Os Modelos De Linguagem Funcionam",
    stops: [
      { tag: "Fact", title: "Atenção é Tudo", body: "O ChatGPT é baseado em um tipo de rede neural chamado transformer. Os transformers ganharam importância depois que pesquisadores os apresentaram em um artigo de 2017 intitulado \"Attention Is All You Need\". Uma das ideias centrais é a atenção. A atenção ajuda o modelo a decidir quais partes de uma frase ou conversa são mais importantes em um dado momento." },
      { tag: "Example", title: "Contexto Acima de Sequência", body: "Por exemplo, considere a frase: \"Maya deixou o copo cair no chão porque ele estava escorregadio.\" Para entender a que \"ele\" se refere, o sistema precisa usar as palavras ao redor e o contexto. Os mecanismos de atenção permitem que o modelo pondere diferentes partes da entrada entre si, em vez de processar as palavras em sequência estrita." },
      { tag: "Big idea", title: "Um Token de Cada Vez", body: "O ChatGPT processa o texto na forma de tokens. Um token pode ser uma palavra inteira, parte de uma palavra, uma pontuação ou até mesmo um único caractere. Quando o ChatGPT responde, ele gera um token de cada vez. A cada etapa, ele estima qual token deve vir a seguir com base na conversa até o momento." },
      { tag: "Hot take", title: "Fluente, Mas Não Confiável", body: "O ChatGPT não está extraindo um parágrafo pronto de um banco de dados. Ele está gerando uma resposta à medida que avança. Esse processo envolve um número colossal de cálculos e padrões aprendidos durante o treinamento — e é por isso que os modelos de linguagem podem ser impressionantemente fluentes e ao mesmo tempo confiante e erroneamente incorretos." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Transformer"`, answer: true, verdict: "Correto.", explanation: "Que tipo de arquitetura de rede neural está por trás do ChatGPT e de modelos de linguagem similares? — Transformer" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um mecanismo que permite ao modelo ponderar a relevância de diferentes partes da entrada"`, answer: true, verdict: "Correto.", explanation: "O que é \"atenção\" no contexto dos transformers? — Um mecanismo que permite ao modelo ponderar a relevância de diferentes partes da entrada" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um fragmento de texto — uma palavra, parte de uma palavra ou pontuação — que o modelo processa como uma unidade"`, answer: true, verdict: "Correto.", explanation: "O que é um token? — Um fragmento de texto — uma palavra, parte de uma palavra ou pontuação — que o modelo processa como uma unidade" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Eles geram o próximo token estatisticamente mais plausível em vez de verificar a precisão factual"`, answer: true, verdict: "Correto.", explanation: "Por que os modelos de linguagem podem ser fluentes e ainda assim confiante e erroneamente incorretos? — Eles geram o próximo token estatisticamente mais plausível em vez de verificar a precisão factual" },
    ],
  },
  325: {
    id: 325, worldId: 262,
    title: "Algoritmos De Recomendação",
    stops: [
      { tag: "Fact", title: "Prevendo Seu Próximo Clique", body: "Quando o YouTube sugere um vídeo, o Spotify cria uma playlist ou o Instagram organiza o seu feed, um sistema de recomendação está fazendo previsões sobre o que pode reter a sua atenção. Esses sistemas aprendem com o seu comportamento: a que você assiste, o que você pula, o que você repete, o que você pesquisa, do que você gosta, quanto tempo você pausa antes de rolar a tela." },
      { tag: "Example", title: "Filtragem Colaborativa Explicada", body: "Eles também comparam o seu comportamento com padrões de outros usuários. Um método comum é chamado de filtragem colaborativa. Suponha que duas pessoas tenham gostado de muitos filmes em comum. Se uma delas assiste a outro filme e gosta, o sistema pode recomendar esse filme para a outra pessoa também." },
      { tag: "Big idea", title: "Engajamento Não É Bem-Estar", body: "Os algoritmos de recomendação podem ser úteis. Eles ajudam as pessoas a filtrar muito mais conteúdo do que elas conseguiriam analisar sozinhas. Mas engajamento não é a mesma coisa que bem-estar. Um vídeo pode prender sua atenção porque é engraçado, informativo, perturbador ou enfurecedor. O sistema consegue medir a sua reação sem entender se a experiência foi boa para você." },
      { tag: "Hot take", title: "Algoritmos Moldam Interesses", body: "Os algoritmos de recomendação não refletem simplesmente os seus interesses. Eles também podem moldá-los. Com o tempo, podem estreitar o que você vê e influenciar o que você passa a acreditar ser normal, importante ou desejável." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Seu comportamento de engajamento — o que você assiste, pula, repete, pesquisa e clica"`, answer: true, verdict: "Correto.", explanation: "O que os sistemas de recomendação rastreiam principalmente? — Seu comportamento de engajamento — o que você assiste, pula, repete, pesquisa e clica" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Encontrar usuários com comportamento semelhante e usar o engajamento deles para recomendar conteúdo a você"`, answer: true, verdict: "Correto.", explanation: "O que é filtragem colaborativa? — Encontrar usuários com comportamento semelhante e usar o engajamento deles para recomendar conteúdo a você" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"O conteúdo pode ser envolvente por ser ultrajante ou perturbador, e não necessariamente benéfico"`, answer: true, verdict: "Correto.", explanation: "Por que otimizar para \"engajamento\" é uma meta limitada para sistemas de recomendação? — O conteúdo pode ser envolvente por ser ultrajante ou perturbador, e não necessariamente benéfico" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Moldar ativamente seus interesses e estreitar sua visão de mundo ao longo do tempo"`, answer: true, verdict: "Correto.", explanation: "Além de refletir seus interesses, o que mais os algoritmos de recomendação podem fazer? — Moldar ativamente seus interesses e estreitar sua visão de mundo ao longo do tempo" },
    ],
  },
  326: {
    id: 326, worldId: 262,
    title: "Visão Computacional",
    stops: [
      { tag: "Fact", title: "Imagens São Apenas Números", body: "A visão computacional é a área da IA focada em imagens e vídeos. Uma imagem digital é formada por pixels organizados em uma grade. Cada pixel é representado por números que descrevem a cor e o brilho. Para um computador, uma imagem começa como um grande conjunto de números." },
      { tag: "Example", title: "CNNs Buscam Padrões", body: "Muitos sistemas de visão computacional usam um tipo de rede neural chamada rede neural convolucional, ou CNN. Uma CNN examina pequenas partes de uma imagem e procura por padrões visuais. As primeiras camadas podem detectar características simples, como bordas ou texturas. As camadas posteriores podem combinar esses sinais em formas mais complexas." },
      { tag: "Big idea", title: "Visão Além da Identificação", body: "A visão computacional pode ser usada para: • Identificar objetos • Ler textos em imagens • Desbloquear um celular usando escaneamento facial • Analisar exames médicos • Ajudar robôs a navegar em espaços físicos Em 2012, um sistema de deep learning chamado AlexNet teve um desempenho excelente em uma grande competição de reconhecimento de imagens chamada ImageNet. Seu sucesso ajudou a impulsionar um interesse muito mais amplo pelo deep learning." },
      { tag: "Hot take", title: "Reconhecer Não É Entender", body: "A visão computacional pode ser impressionante. Mas identificar um gato em uma foto não é o mesmo que entender o que é um gato. Esses sistemas reconhecem padrões — eles não percebem, interpretam nem compreendem em nenhum sentido significativo." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Uma grade de pixels, cada um representado por números de cor e brilho"`, answer: true, verdict: "Correto.", explanation: "No nível mais básico, o que é uma imagem digital para um computador? — Uma grade de pixels, cada um representado por números de cor e brilho" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Rede Neural Convolucional (CNN)"`, answer: true, verdict: "Correto.", explanation: "Que tipo de rede neural é mais comumente usado para visão computacional? — Rede Neural Convolucional (CNN)" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Analisar imagens médicas em busca de sinais de doenças"`, answer: true, verdict: "Correto.", explanation: "Qual é uma aplicação real da visão computacional? — Analisar imagens médicas em busca de sinais de doenças" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Eles reconhecem padrões estatísticos sem qualquer forma de percepção ou compreensão"`, answer: true, verdict: "Correto.", explanation: "Por que é impreciso dizer que sistemas de visão computacional realmente \"enxergam\"? — Eles reconhecem padrões estatísticos sem qualquer forma de percepção ou compreensão" },
    ],
  },
  327: {
    id: 327, worldId: 262,
    title: "O Problema Da Caixa Preta",
    stops: [
      { tag: "Fact", title: "Sem Manual de Regras", body: "As redes neurais podem ser difíceis de interpretar. Um programa tradicional geralmente segue regras que uma pessoa consegue ler — se isso, então aquilo. Uma rede neural funciona de maneira diferente. Suas decisões são moldadas por um grande número de pesos espalhados por muitas camadas. Quando um sistema complexo produz uma resposta, muitas vezes é difícil explicar o porquê. Isso às vezes é chamado de problema da caixa preta." },
      { tag: "Example", title: "O Contexto Muda Tudo", body: "A questão é mais importante quando a IA afeta a vida das pessoas. Se um sistema recomenda uma música, um erro pode ser irritante, mas inofensivo. Se um sistema influencia uma decisão de empréstimo, sinaliza alguém como um risco de segurança ou ajuda a avaliar um exame médico, as pessoas podem, com razão, querer saber como a decisão foi tomada." },
      { tag: "Big idea", title: "IA Explicável Existe—Em Parte", body: "Os pesquisadores estão trabalhando em ferramentas que tornam os sistemas de IA mais fáceis de interpretar. Esse campo costuma ser chamado de IA explicável, ou XAI. Houve progresso, mas o problema não está resolvido." },
      { tag: "Hot take", title: "Precisão Não É Suficiente", body: "Em cenários de alto risco, a precisão não é o único objetivo. As pessoas também precisam de transparência, de supervisão e de uma maneira de contestar os erros. Um sistema correto em 95% das vezes, mas opaco quanto aos outros 5%, não é suficiente quando as consequências de um erro são sérias." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Quando o processo de tomada de decisão de um sistema de IA é opaco — entradas e saídas são visíveis, mas o raciocínio não é"`, answer: true, verdict: "Correto.", explanation: "O que é o \"problema da caixa preta\"? — Quando o processo de tomada de decisão de um sistema de IA é opaco — entradas e saídas são visíveis, mas o raciocínio não é" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Quando a IA toma decisões consequentes que afetam a vida das pessoas, como empréstimos ou avaliações médicas"`, answer: true, verdict: "Correto.", explanation: "Em que tipo de situação o problema da caixa preta importa mais? — Quando a IA toma decisões consequentes que afetam a vida das pessoas, como empréstimos ou avaliações médicas" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Pesquisa focada em tornar a tomada de decisão da IA interpretável e compreensível para os humanos"`, answer: true, verdict: "Correto.", explanation: "O que é IA explicável (XAI)? — Pesquisa focada em tornar a tomada de decisão da IA interpretável e compreensível para os humanos" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Mesmo sistemas precisos precisam de transparência e da possibilidade de contestação quando ocorrem erros"`, answer: true, verdict: "Correto.", explanation: "Por que um sistema de IA altamente preciso, mas opaco, é insuficiente em cenários de alto risco? — Mesmo sistemas precisos precisam de transparência e da possibilidade de contestação quando ocorrem erros" },
    ],
  },
  328: {
    id: 328, worldId: 262,
    title: "Quando As Decisões Dão Errado",
    stops: [
      { tag: "Fact", title: "Viés Vem dos Dados", body: "Os sistemas de IA cometem erros. A pergunta importante é que tipo de erros eles cometem e quantas pessoas podem ser afetadas. Dados de treinamento enviesados: Os sistemas de IA aprendem com base em exemplos. Se os exemplos refletirem injustiças do passado, o sistema poderá repetir esses padrões. Um algoritmo de contratação treinado com base em decisões de contratação anteriores pode aprender a favorecer os mesmos grupos que foram favorecidos no passado. O modelo não tem preconceito no sentido humano. Ele está copiando padrões de dados enviesados." },
      { tag: "Example", title: "Desempenho Muda com o Contexto", body: "Desvio de distribuição (Distribution shift): Um modelo pode ter um bom desempenho em um cenário e ter dificuldades em outro. Um sistema treinado principalmente em estradas ensolaradas pode ter problemas sob neve forte. Uma ferramenta médica treinada em uma população pode funcionar de forma menos confiável para outra." },
      { tag: "Big idea", title: "Overfitting Demais", body: "Overfitting: Um modelo pode ficar excessivamente ajustado aos seus dados de treinamento. Ele pode ter um bom desempenho em exemplos que já viu, mas ter dificuldades com exemplos desconhecidos. Em vez de aprender um padrão geral, ele aprendeu algo específico demais." },
      { tag: "Hot take", title: "Erros se Multiplicam em Escala", body: "Erros em escala: Uma pessoa pode tomar uma decisão ruim. Um sistema automatizado pode repetir a mesma decisão ruim milhares ou milhões de vezes. A automação não inventa decisões ruins. Ela pode produzi-las em massa. É por isso que as falhas da IA não são apenas problemas técnicos. Elas podem se tornar problemas sociais, legais e éticos também." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Exemplos de treinamento que refletem desigualdades históricas, fazendo com que a IA reproduza esses padrões"`, answer: true, verdict: "Correto.", explanation: "O que são \"dados de treinamento enviesados\"? — Exemplos de treinamento que refletem desigualdades históricas, fazendo com que a IA reproduza esses padrões" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Quando os dados do mundo real diferem dos dados de treinamento, fazendo o modelo ter um desempenho pior"`, answer: true, verdict: "Correto.", explanation: "O que é desvio de distribuição (distribution shift)? — Quando os dados do mundo real diferem dos dados de treinamento, fazendo o modelo ter um desempenho pior" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Quando um modelo memoriza os dados de treinamento com muita precisão e falha em generalizar para novos exemplos"`, answer: true, verdict: "Correto.", explanation: "O que é overfitting? — Quando um modelo memoriza os dados de treinamento com muita precisão e falha em generalizar para novos exemplos" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um sistema automatizado pode repetir a mesma decisão equivocada milhões de vezes"`, answer: true, verdict: "Correto.", explanation: "Por que \"erros em escala\" é uma preocupação específica e séria com sistemas de IA automatizados? — Um sistema automatizado pode repetir a mesma decisão equivocada milhões de vezes" },
    ],
  },
}

export default wm_w2_pt
