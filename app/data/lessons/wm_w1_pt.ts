import { LessonData } from '../index'

const wm_w1_pt: Record<number, LessonData> = {
  311: {
    id: 311, worldId: 261,
    title: "Definindo A Ia",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "A inteligência artificial é um software projetado para executar tarefas que normalmente exigem habilidades humanas, como entender a linguagem, reconhecer imagens, fazer previsões ou encontrar padrões em grandes volumes de informações." },
      { tag: "Example", title: "Slide 2", body: "A IA não é uma tecnologia única. Um chatbot, um sistema de reconhecimento facial e um algoritmo de recomendação podem usar a IA, mas foram construídos para propósitos diferentes e não funcionam necessariamente da mesma maneira." },
      { tag: "Big idea", title: "Slide 3", body: "A principal diferença entre o software tradicional e o machine learning é a forma como o sistema obtém suas regras. Um programa tradicional segue instruções escritas por um programador. Um sistema de machine learning aprende padrões a partir de exemplos. Em vez de escrever uma regra separada para cada situação possível, os desenvolvedores treinam o sistema com dados e permitem que ele melhore por meio da experiência." },
      { tag: "Hot take", title: "Slide 4", body: "Ele ainda não está pensando como uma pessoa. Apenas se tornou muito bom em identificar padrões. A IA não é automaticamente mais inteligente que um humano. Ela simplesmente processou muito mais exemplos do que uma pessoa conseguiria analisar durante toda a vida. Isso a torna poderosa em algumas áreas e surpreendentemente frágil em outras." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"O machine learning aprende padrões a partir de dados em vez de seguir regras fixas programadas"`, answer: true, verdict: "Correto.", explanation: "Qual é a principal diferença entre o software tradicional e o machine learning? — O machine learning aprende padrões a partir de dados em vez de seguir regras fixas programadas" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Falso"`, answer: true, verdict: "Correto.", explanation: "Verdadeiro ou falso: Todos os sistemas de IA funcionam da mesma maneira. — Falso" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Ela processou muito mais exemplos do que qualquer humano conseguiria durante toda a vida"`, answer: true, verdict: "Correto.", explanation: "Por que a IA consegue superar os humanos em certas tarefas específicas? — Ela processou muito mais exemplos do que qualquer humano conseguiria durante toda a vida" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um filtro de e-mails de spam"`, answer: true, verdict: "Correto.", explanation: "Qual destes é um exemplo de IA? — Um filtro de e-mails de spam" },
    ],
  },
  312: {
    id: 312, worldId: 261,
    title: "Como A Ia Aprende",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "A maioria dos sistemas modernos de IA aprende por meio de um processo chamado machine learning. Imagine ensinar um computador a reconhecer gatos. Você poderia mostrar a ele milhares de imagens rotuladas como \"gato\" e \"não é gato\". No início, o sistema cometeria muitos erros. Com o tempo, ele ajustaria suas configurações internas e se tornaria melhor em prever a resposta correta." },
      { tag: "Example", title: "Slide 2", body: "A mesma ideia básica pode ser usada para muitas tarefas: • Identificar e-mails de spam • Traduzir idiomas • Recomendar músicas • Reconhecer objetos em fotos • Identificar padrões em exames médicos" },
      { tag: "Big idea", title: "Slide 3", body: "O sistema melhora ao ver exemplos, fazer previsões, medir seus erros e se ajustar. Esse processo pode ser repetido milhões ou bilhões de vezes." },
      { tag: "Hot take", title: "Slide 4", body: "Nenhum ajuste individual muda muita coisa. A melhoria vem da repetição ao longo de um número enorme de exemplos." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um sistema que aprende padrões a partir de exemplos em vez de regras fixas"`, answer: true, verdict: "Correto.", explanation: "O que é machine learning? — Um sistema que aprende padrões a partir de exemplos em vez de regras fixas" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Ele se ajusta levemente para reduzir o erro"`, answer: true, verdict: "Correto.", explanation: "No ciclo de aprendizado do machine learning, o que acontece depois que o sistema faz uma previsão errada? — Ele se ajusta levemente para reduzir o erro" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Pequenos ajustes se acumulam em melhorias reais e significativas"`, answer: true, verdict: "Correto.", explanation: "Por que repetir o ciclo de treinamento bilhões de vezes é importante? — Pequenos ajustes se acumulam em melhorias reais e significativas" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A uma ampla variedade de tarefas, incluindo detecção de spam, recomendação de músicas e imagens médicas"`, answer: true, verdict: "Correto.", explanation: "A quais tarefas o machine learning pode ser aplicado? — A uma ampla variedade de tarefas, incluindo detecção de spam, recomendação de músicas e imagens médicas" },
    ],
  },
  313: {
    id: 313, worldId: 261,
    title: "Alan Turing E O Teste De Turing",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "Em 1950, o matemático britânico Alan Turing publicou um artigo intitulado \"Computing Machinery and Intelligence\". Ele começava com uma pergunta que ainda é relevante hoje: As máquinas podem pensar?" },
      { tag: "Example", title: "Slide 2", body: "Turing não tentou resolver a questão diretamente. Em vez disso, ele propôs um teste. Imagine um juiz humano tendo duas conversas por texto ao mesmo tempo — uma com uma pessoa, outra com uma máquina. Se o juiz não conseguir distinguir de forma confiável quem é quem, a máquina passou no que mais tarde ficou conhecido como o Teste de Turing." },
      { tag: "Big idea", title: "Slide 3", body: "Turing mudou o debate. Em vez de perguntar se uma máquina realmente pensa, ele perguntou se o comportamento dela poderia parecer inteligente visto de fora. Essa reformulação — focada no comportamento observável em vez da experiência interna — ajudou a moldar todo o campo da IA." },
      { tag: "Hot take", title: "Slide 4", body: "O teste ainda é debatido. Uma máquina pode soar convincente sem entender o que está dizendo. Mas a pergunta de Turing ajudou a moldar o campo da IA e permanece relevante até hoje." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"As máquinas podem pensar?"`, answer: true, verdict: "Correto.", explanation: "Com que pergunta o artigo de Alan Turing de 1950 começava? — As máquinas podem pensar?" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um teste em que um juiz tenta determinar se está conversando com um humano ou uma máquina"`, answer: true, verdict: "Correto.", explanation: "O que é o Teste de Turing? — Um teste em que um juiz tenta determinar se está conversando com um humano ou uma máquina" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Ele mudou o foco de se as máquinas realmente pensam para se o comportamento delas é indistinguível do pensamento"`, answer: true, verdict: "Correto.", explanation: "Como Turing reformulou a questão da inteligência das máquinas? — Ele mudou o foco de se as máquinas realmente pensam para se o comportamento delas é indistinguível do pensamento" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Comportar-se de forma inteligente não é o mesmo que ser realmente inteligente"`, answer: true, verdict: "Correto.", explanation: "Qual é a principal crítica ao Teste de Turing? — Comportar-se de forma inteligente não é o mesmo que ser realmente inteligente" },
    ],
  },
  314: {
    id: 314, worldId: 261,
    title: "O Que A Ia Consegue E Não Consegue Fazer",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "A IA não é automaticamente mais inteligente que um humano. Ela simplesmente processou muito mais exemplos do que uma pessoa conseguiria analisar durante toda a vida. Isso a torna poderosa em algumas áreas e surpreendentemente frágil em outras." },
      { tag: "Example", title: "Slide 2", body: "Os sistemas de IA podem ter dificuldades com tarefas que exigem raciocínio genuíno sobre situações novas, conhecimento de senso comum ou compreensão de contexto da maneira que os humanos fazem — mesmo quando têm um desempenho impressionante em tarefas estruturadas e bem definidas." },
      { tag: "Big idea", title: "Slide 3", body: "Um modelo de linguagem pode escrever uma redação convincente sem entender uma única palavra dela. Ele gera continuações estatisticamente prováveis de texto com base em padrões nos dados de treinamento — não em significado, intenção ou compreensão." },
      { tag: "Hot take", title: "Slide 4", body: "Os sistemas de IA também não têm objetivos próprios. Eles não querem nada. Os objetivos que parecem perseguir são objetivos que seus criadores lhes deram. Essa distinção é importante ao avaliar o comportamento da IA." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A IA processou vastas quantidades de dados, tornando-a forte em reconhecimento de padrões, mas frágil fora desses padrões"`, answer: true, verdict: "Correto.", explanation: "Por que a IA consegue superar os humanos em tarefas específicas e ao mesmo tempo falhar em outras? — A IA processou vastas quantidades de dados, tornando-a forte em reconhecimento de padrões, mas frágil fora desses padrões" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Geração de padrões de texto estatisticamente prováveis sem verdadeiro entendimento"`, answer: true, verdict: "Correto.", explanation: "Um modelo de linguagem escrevendo uma redação convincente é melhor descrito como: — Geração de padrões de texto estatisticamente prováveis sem verdadeiro entendimento" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Falso — qualquer objetivo aparente vem de como o sistema foi projetado"`, answer: true, verdict: "Correto.", explanation: "Verdadeiro ou falso: Os sistemas de IA têm seus próprios objetivos e motivações. — Falso — qualquer objetivo aparente vem de como o sistema foi projetado" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Ela pode falhar em tarefas que exigem raciocínio genuíno ou senso comum fora do seu treinamento"`, answer: true, verdict: "Correto.", explanation: "O que torna a IA \"surpreendentemente frágil\" em algumas áreas? — Ela pode falhar em tarefas que exigem raciocínio genuíno ou senso comum fora do seu treinamento" },
    ],
  },
  315: {
    id: 315, worldId: 261,
    title: "A Ia No Dia A Dia",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "A maioria das pessoas não se depara com a IA por meio de laboratórios de pesquisa ou de debates sobre políticas. Elas a encontram de maneiras pequenas e rotineiras: • Aplicativos de navegação redirecionando o trânsito • Filtros de e-mail bloqueando spam • Celulares sendo desbloqueados com reconhecimento facial • Aplicativos de música recomendando canções • Bancos detectando compras incomuns • Mecanismos de busca classificando resultados • Chatbots de atendimento ao cliente respondendo a perguntas" },
      { tag: "Example", title: "Slide 2", body: "A maior parte disso é útil. Mas vale a pena notar o quanto a tomada de decisões foi transferida para sistemas que as pessoas raramente veem ou entendem." },
      { tag: "Big idea", title: "Slide 3", body: "Quando um algoritmo decide quais notícias aparecem no seu feed, quais produtos você vê ou quais oportunidades são recomendadas a você, essas decisões não são neutras. Elas refletem as prioridades das pessoas e das empresas que construíram o sistema." },
      { tag: "Hot take", title: "Slide 4", body: "Entender isso dá a você mais controle." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um mecanismo de busca classificando resultados"`, answer: true, verdict: "Correto.", explanation: "Qual destes é um exemplo de IA operando de forma invisível no dia a dia? — Um mecanismo de busca classificando resultados" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Eles refletem as prioridades e escolhas das pessoas que os criaram"`, answer: true, verdict: "Correto.", explanation: "Por que as decisões algorítmicas são descritas como \"não neutras\"? — Eles refletem as prioridades e escolhas das pessoas que os criaram" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um algoritmo de recomendação decidindo quais vagas de emprego você vê"`, answer: true, verdict: "Correto.", explanation: "Qual destes é uma decisão de IA potencialmente consequente que as pessoas frequentemente não percebem? — Um algoritmo de recomendação decidindo quais vagas de emprego você vê" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Mais controle sobre como você interage com esses sistemas e que suposições você traz às informações que eles apresentam"`, answer: true, verdict: "Correto.", explanation: "O que o conhecimento sobre a tomada de decisões por IA oferece a você? — Mais controle sobre como você interage com esses sistemas e que suposições você traz às informações que eles apresentam" },
    ],
  },
  316: {
    id: 316, worldId: 261,
    title: "Uma Breve História Da Ia",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "A IA moderna remonta a um artigo de Alan Turing de 1950. Em 1956, o termo \"Inteligência Artificial\" foi cunhado na Conferência de Dartmouth — amplamente considerada o nascimento da IA como campo formal de pesquisa." },
      { tag: "Example", title: "Slide 2", body: "As primeiras décadas trouxeram entusiasmo seguido de colapso. Pesquisadores dos anos 1960 previam IA no nível humano em 20 anos. Quando esse progresso estagnou, o financiamento secou. Esses períodos de colapso são conhecidos como Invernos da IA." },
      { tag: "Big idea", title: "Slide 3", body: "A IA voltou na década de 1980 com sistemas especialistas — programas que codificavam a expertise humana como regras explícitas. Eles também se mostraram caros e frágeis, e o interesse entrou em colapso novamente." },
      { tag: "Hot take", title: "Slide 4", body: "A era moderna começou com dois momentos-chave: o Deep Blue da IBM derrotando o campeão de xadrez Garry Kasparov em 1997, e o avanço do AlexNet em 2012, quando o deep learning superou dramaticamente abordagens anteriores de reconhecimento de imagens. A onda atual — grandes modelos de linguagem, IA generativa — cresceu a partir desse ponto de virada." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um período em que o progresso da IA estancou e o financiamento entrou em colapso após promessas exageradas"`, answer: true, verdict: "Correto.", explanation: "O que é um \"Inverno da IA\"? — Um período em que o progresso da IA estancou e o financiamento entrou em colapso após promessas exageradas" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Programas que codificavam a expertise humana como regras explícitas"`, answer: true, verdict: "Correto.", explanation: "O que eram sistemas especialistas? — Programas que codificavam a expertise humana como regras explícitas" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"O deep learning superou dramaticamente abordagens anteriores de reconhecimento de imagens na competição ImageNet"`, answer: true, verdict: "Correto.", explanation: "O que tornou 2012 um ponto de virada na história da IA? — O deep learning superou dramaticamente abordagens anteriores de reconhecimento de imagens na competição ImageNet" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Foi onde o termo "Inteligência Artificial" foi cunhado e o campo formalmente fundado"`, answer: true, verdict: "Correto.", explanation: "Pelo que a Conferência de Dartmouth é significativa? — Foi onde o termo \"Inteligência Artificial\" foi cunhado e o campo formalmente fundado" },
    ],
  },
  317: {
    id: 317, worldId: 261,
    title: "Quem Constrói A Ia E Por Quê",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "A IA não se constrói sozinha. Um pequeno número de grandes empresas de tecnologia, laboratórios de pesquisa governamentais e universidades toma a maioria das decisões fundamentais sobre como os poderosos sistemas de IA funcionam. Essas decisões afetam todos." },
      { tag: "Example", title: "Slide 2", body: "As empresas constroem IA por diversas razões: produtos comerciais, vantagem competitiva, crença genuína no seu benefício para a sociedade e a capacidade de substituir mão de obra humana cara. Esses incentivos nem sempre estão alinhados com os interesses dos usuários ou do público em geral." },
      { tag: "Big idea", title: "Slide 3", body: "A concentração do desenvolvimento de IA importa. Os pesquisadores e engenheiros que constroem a IA têm seus próprios valores, pontos cegos e acesso a dados. Um sistema construído principalmente por pessoas de contextos ricos e anglófonos pode ter um desempenho menos confiável para pessoas fora desses contextos." },
      { tag: "Hot take", title: "Slide 4", body: "Isso não significa que a IA seja sempre tendenciosa ou prejudicial. Significa que perguntar quem constrói a IA, por que e com quais dados é uma questão razoável e importante — não uma questão conspiratória." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um pequeno número de grandes empresas de tecnologia, laboratórios governamentais e universidades"`, answer: true, verdict: "Correto.", explanation: "Quem toma atualmente a maioria das decisões fundamentais sobre como os poderosos sistemas de IA funcionam? — Um pequeno número de grandes empresas de tecnologia, laboratórios governamentais e universidades" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Um pequeno grupo está tomando decisões que afetam todos, sem ampla responsabilização"`, answer: true, verdict: "Correto.", explanation: "Por que a concentração do desenvolvimento de IA importa? — Um pequeno grupo está tomando decisões que afetam todos, sem ampla responsabilização" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Seus valores, pontos cegos e acesso a dados moldam o desempenho dos sistemas em diferentes grupos"`, answer: true, verdict: "Correto.", explanation: "Como o contexto dos criadores de IA pode afetar os sistemas de IA? — Seus valores, pontos cegos e acesso a dados moldam o desempenho dos sistemas em diferentes grupos" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Uma questão razoável e importante sobre responsabilização e escolhas de design"`, answer: true, verdict: "Correto.", explanation: "Perguntar quem constrói a IA e por que é melhor descrito como: — Uma questão razoável e importante sobre responsabilização e escolhas de design" },
    ],
  },
  318: {
    id: 318, worldId: 261,
    title: "Tipos De Ia",
    stops: [
      { tag: "Fact", title: "Slide 1", body: "A IA Estreita — também chamada de IA Fraca — é projetada para uma tarefa específica. É toda a IA que existe atualmente. Exemplos: reconhecimento facial, filtros de spam, motores de xadrez, assistentes de voz. Uma IA de xadrez não consegue dirigir um carro; um modelo de linguagem não consegue realizar cirurgias." },
      { tag: "Example", title: "Slide 2", body: "A Inteligência Artificial Geral (IAG) se refere a uma IA hipotética capaz de realizar qualquer tarefa intelectual que um humano possa. Ela não existe ainda. Se e quando poderia surgir é assunto de discordância genuína entre pesquisadores sérios." },
      { tag: "Big idea", title: "Slide 3", body: "A IA superinteligente — IA que supera a inteligência humana em todos os domínios — existe apenas na teoria. Alguns pesquisadores a consideram um resultado plausível a longo prazo; outros acham que nunca será alcançada." },
      { tag: "Hot take", title: "Slide 4", body: "A maior parte da preocupação pública com a IA — deslocamento de empregos, decisões autônomas perigosas, risco existencial — se relaciona à IA geral ou superinteligente. Entender o que realmente temos (IA estreita) versus o que é especulativo ajuda a enquadrar esses debates com mais precisão." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"IA Estreita"`, answer: true, verdict: "Correto.", explanation: "Que tipo de IA existe atualmente? — IA Estreita" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Uma IA hipotética capaz de realizar qualquer tarefa cognitiva que um humano possa"`, answer: true, verdict: "Correto.", explanation: "O que é IAG? — Uma IA hipotética capaz de realizar qualquer tarefa cognitiva que um humano possa" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"A maioria dos medos públicos se relaciona à IAG, não aos sistemas de IA estreita que existem hoje"`, answer: true, verdict: "Correto.", explanation: "Por que a distinção entre IA estreita e IAG importa para o debate público? — A maioria dos medos públicos se relaciona à IAG, não aos sistemas de IA estreita que existem hoje" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `"Falso      MUNDO 2: COMO A IA TOMA DECISÕES"`, answer: true, verdict: "Correto.", explanation: "Verdadeiro ou falso: A IA superinteligente existe atualmente. — Falso      MUNDO 2: COMO A IA TOMA DECISÕES" },
    ],
  },
}

export default wm_w1_pt
