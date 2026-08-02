import { LessonData } from '../index'

const wm_w1_pt: Record<number, LessonData> = {
  311: {
    id: 311, worldId: 261,
    title: "Definindo a IA",
    stops: [
      { tag: "Fact", title: "O Que É IA?", body: "A inteligência artificial é um software projetado para executar tarefas que normalmente exigem habilidades humanas, como entender a linguagem, reconhecer imagens, fazer previsões ou encontrar padrões em grandes volumes de informações." },
      { tag: "Example", title: "Não É Uma Só Tecnologia", body: "A IA não é uma tecnologia única. Um chatbot, um sistema de reconhecimento facial e um algoritmo de recomendação podem usar a IA, mas foram construídos para propósitos diferentes e não funcionam necessariamente da mesma maneira." },
      { tag: "Big idea", title: "Regras vs. Aprendizado", body: "A principal diferença entre o software tradicional e o machine learning é a forma como o sistema obtém suas regras. Um programa tradicional segue instruções escritas por um programador. Um sistema de machine learning aprende padrões a partir de exemplos. Em vez de escrever uma regra separada para cada situação possível, os desenvolvedores treinam o sistema com dados e permitem que ele melhore por meio da experiência." },
      { tag: "Hot take", title: "Padrões, Não Pensamento", body: "Isso não significa que o sistema pensa como uma pessoa. Significa que ele pode se tornar muito bom em reconhecer padrões." },
      { tag: "Scenario", title: "Poderosa, mas Frágil", body: "A IA não é automaticamente mais inteligente que um humano. Ela simplesmente processou muito mais exemplos do que uma pessoa conseguiria analisar durante toda a vida. Isso a torna poderosa em algumas áreas e surpreendentemente frágil em outras." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Sistemas de machine learning aprendem padrões a partir de dados em vez de seguir regras fixas programadas.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. O software tradicional segue regras que um programador escreveu com antecedência. O machine learning é diferente — ele descobre os padrões sozinho, estudando montanhas de exemplos." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Todos os sistemas de IA funcionam da mesma maneira.`, answer: false, verdict: "Correto.", explanation: "A resposta é FALSO. Diferentes sistemas de IA são construídos para propósitos diferentes — um chatbot, um sistema de reconhecimento facial e um algoritmo de recomendação são todos IA, mas não funcionam da mesma forma." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A IA consegue superar os humanos em certas tarefas específicas porque processou muito mais exemplos do que qualquer humano conseguiria durante toda a vida.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. A IA já processou muito mais exemplos do que qualquer pessoa conseguiria em toda a vida. É por isso que ela pode parecer assustadoramente precisa." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Um filtro de e-mails de spam é um exemplo de IA.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Um filtro de spam é um exemplo de IA porque usa padrões e exemplos para decidir o que é ou não é spam." },
    ],
  },
  312: {
    id: 312, worldId: 261,
    title: "Como a IA Aprende",
    stops: [
      { tag: "Fact", title: "Aprendendo por Exemplos", body: "A maioria dos sistemas modernos de IA aprende por meio de um processo chamado machine learning. Imagine ensinar um computador a reconhecer gatos. Você poderia mostrar a ele milhares de imagens rotuladas como \"gato\" e \"não é gato\". No início, o sistema cometeria muitos erros. Com o tempo, ele ajustaria suas configurações internas e se tornaria melhor em prever a resposta correta." },
      { tag: "Example", title: "Muitas Aplicações", body: "A mesma ideia básica pode ser usada para muitas tarefas: • Identificar e-mails de spam • Traduzir idiomas • Recomendar músicas • Reconhecer objetos em fotos • Identificar padrões em exames médicos" },
      { tag: "Big idea", title: "O Ciclo de Aprendizado", body: "O sistema melhora ao ver exemplos, fazer previsões, medir seus erros e se ajustar. Esse processo pode ser repetido milhões ou bilhões de vezes." },
      { tag: "Hot take", title: "O Poder da Repetição", body: "Nenhum ajuste individual muda muita coisa. A melhoria vem da repetição ao longo de um número enorme de exemplos." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Machine learning é um sistema que aprende padrões a partir de exemplos em vez de seguir regras fixas.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. A IA não segue regras simples do tipo se/então. Ela aprende olhando um número absurdo de exemplos, recebendo feedback sobre o que está errando e aprendendo com isso." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Quando um sistema de machine learning faz uma previsão errada, ele se ajusta levemente para reduzir o erro.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. O machine learning aprende exatamente assim. Ele recebe feedback sobre seus erros e faz pequenos ajustes em resposta." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Repetir o ciclo de treinamento bilhões de vezes é importante porque pequenos ajustes se acumulam em melhorias reais e significativas.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. É um processo lento e gradual. Esses pequenos ajustes se acumulam até virarem uma melhora real e significativa." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `O machine learning só pode ser aplicado a um único tipo de tarefa, como reconhecimento de imagens.`, answer: false, verdict: "Correto.", explanation: "A resposta é FALSO. O machine learning pode ser aplicado a uma enorme variedade de tarefas, incluindo detecção de spam, recomendação de músicas e exames de imagem na medicina." },
    ],
  },
  313: {
    id: 313, worldId: 261,
    title: "Alan Turing e o Teste de Turing",
    stops: [
      { tag: "Fact", title: "As Máquinas Podem Pensar?", body: "Em 1950, o matemático britânico Alan Turing publicou um artigo intitulado \"Computing Machinery and Intelligence\". Ele começava com uma pergunta que ainda é relevante hoje: As máquinas podem pensar?" },
      { tag: "Example", title: "O Jogo da Imitação", body: "Turing não tentou resolver a questão diretamente. Em vez disso, ele propôs um teste. Imagine um juiz humano tendo duas conversas por texto ao mesmo tempo — uma com uma pessoa, outra com uma máquina. Se o juiz não conseguir distinguir de forma confiável quem é quem, a máquina passou no que mais tarde ficou conhecido como o Teste de Turing." },
      { tag: "Big idea", title: "Comportamento Externo", body: "Turing mudou o debate. Em vez de perguntar se uma máquina realmente pensa, ele perguntou se o comportamento dela poderia parecer inteligente visto de fora. Essa reformulação — focada no comportamento observável em vez da experiência interna — ajudou a moldar todo o campo da IA." },
      { tag: "Hot take", title: "Limites do Teste", body: "O teste ainda é debatido. Uma máquina pode soar convincente sem entender o que está dizendo. Mas a pergunta de Turing ajudou a moldar o campo da IA e permanece relevante até hoje." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `O artigo de Alan Turing de 1950 começava com a pergunta "As máquinas podem pensar?"`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Turing abriu seu famoso artigo de 1950 exatamente com essa pergunta. Era uma pergunta tão difícil que ele acabou propondo um jogo para tentar respondê-la." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `No Teste de Turing, um juiz tenta determinar se está conversando com um humano ou uma máquina.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Essa é a essência do Teste de Turing: um juiz conversa com alguém escondido e precisa descobrir — humano ou máquina? Se o juiz não consegue distinguir, a máquina passa no teste." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Turing mudou o foco de se as máquinas realmente pensam para se o comportamento delas é indistinguível do pensamento.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Turing percebeu que 'as máquinas podem realmente pensar?' talvez fosse impossível de responder. Então ele trocou por uma pergunta que dá para testar: uma máquina consegue se comportar de forma tão convincente que você não nota a diferença?" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Uma máquina que passa no Teste de Turing é definitivamente inteligente da mesma forma que um humano.`, answer: false, verdict: "Correto.", explanation: "A resposta é FALSO. Passar no Teste de Turing só prova que a máquina consegue agir de forma convincentemente humana numa conversa. Agir de forma inteligente e ser de fato inteligente não são a mesma coisa — essa é a maior crítica ao teste." },
    ],
  },
  314: {
    id: 314, worldId: 261,
    title: "O que a IA Consegue e Não Consegue Fazer",
    stops: [
      { tag: "Fact", title: "Poderosa mas Limitada", body: "A IA não é automaticamente mais inteligente que um humano. Ela simplesmente processou muito mais exemplos do que uma pessoa conseguiria analisar durante toda a vida. Isso a torna poderosa em algumas áreas e surpreendentemente frágil em outras." },
      { tag: "Example", title: "Onde A IA Tem Dificuldades", body: "Os sistemas de IA podem ter dificuldades com tarefas que exigem raciocínio genuíno sobre situações novas, conhecimento de senso comum ou compreensão de contexto da maneira que os humanos fazem — mesmo quando têm um desempenho impressionante em tarefas estruturadas e bem definidas." },
      { tag: "Big idea", title: "Fluência sem Compreensão", body: "Um modelo de linguagem pode escrever uma redação convincente sem entender uma única palavra dela. Ele gera continuações estatisticamente prováveis de texto com base em padrões nos dados de treinamento — não em significado, intenção ou compreensão." },
      { tag: "Hot take", title: "Sem Objetivos Próprios", body: "Os sistemas de IA também não têm objetivos próprios. Eles não querem nada. Os objetivos que parecem perseguir são objetivos que seus criadores lhes deram. Essa distinção é importante ao avaliar o comportamento da IA." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A IA consegue superar os humanos em tarefas específicas e ao mesmo tempo falhar em outras porque é forte em reconhecimento de padrões, mas frágil fora desses padrões.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. A IA é uma máquina de reconhecer padrões que estudou mais exemplos do que qualquer humano conseguiria. Dentro desses padrões, ela é sobre-humana; fora deles, pode desmoronar surpreendentemente rápido." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Quando um modelo de linguagem escreve uma redação convincente, ele está gerando padrões de texto estatisticamente prováveis sem verdadeiro entendimento.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Um modelo de linguagem escrevendo uma redação convincente é melhor descrito como: — Geração de padrões de texto estatisticamente prováveis sem verdadeiro entendimento" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Os sistemas de IA têm seus próprios objetivos e motivações.`, answer: false, verdict: "Correto.", explanation: "A resposta é FALSO. Verdadeiro ou falso: Os sistemas de IA têm seus próprios objetivos e motivações. — Falso — qualquer objetivo aparente vem de como o sistema foi projetado" },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A IA pode falhar em tarefas que exigem raciocínio genuíno ou senso comum fora do seu treinamento.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Tire a IA dos padrões em que ela foi treinada e ela pode falhar em coisas que uma criança pequena acha óbvias. Raciocínio de verdade e bom senso ainda são superpoderes humanos." },
    ],
  },
  315: {
    id: 315, worldId: 261,
    title: "A IA no Dia a Dia",
    stops: [
      { tag: "Fact", title: "IA em Todo Lugar", body: "A maioria das pessoas não se depara com a IA por meio de laboratórios de pesquisa ou de debates sobre políticas. Elas a encontram de maneiras pequenas e rotineiras: • Aplicativos de navegação redirecionando o trânsito • Filtros de e-mail bloqueando spam • Celulares sendo desbloqueados com reconhecimento facial • Aplicativos de música recomendando canções • Bancos detectando compras incomuns • Mecanismos de busca classificando resultados • Chatbots de atendimento ao cliente respondendo a perguntas" },
      { tag: "Example", title: "Tomadas de Decisão Invisíveis", body: "A maior parte disso é útil. Mas vale a pena notar o quanto a tomada de decisões foi transferida para sistemas que as pessoas raramente veem ou entendem." },
      { tag: "Big idea", title: "Decisões Não São Neutras", body: "Quando um algoritmo decide quais notícias aparecem no seu feed, quais produtos você vê ou quais oportunidades são recomendadas a você, essas decisões não são neutras. Elas refletem as prioridades das pessoas e das empresas que construíram o sistema." },
      { tag: "Hot take", title: "Consciência Traz Controle", body: "Entender isso dá a você mais controle." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Um mecanismo de busca classificando resultados é um exemplo de IA operando de forma invisível no dia a dia.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Toda vez que você pesquisa, uma IA está decidindo em silêncio quais resultados merecem o topo da lista. Você nunca a vê trabalhando — só vê a lista que ela escolheu para você." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `As decisões algorítmicas são descritas como "não neutras" porque refletem as prioridades e escolhas das pessoas que as criaram.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Algoritmos são construídos por pessoas, e pessoas fazem escolhas: o que priorizar, o que ignorar, o que conta como 'melhor'. Essas escolhas ficam embutidas em cada decisão do algoritmo." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Um algoritmo de recomendação decidindo quais vagas de emprego você vê é uma decisão de IA potencialmente consequente que as pessoas frequentemente não percebem.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Quais anúncios de emprego você vê pode mudar o rumo da sua carreira inteira — e um algoritmo decide isso sem você nem perceber. É algo enorme escondido à vista de todos." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Entender como a IA toma decisões dá a você mais controle sobre como você interage com esses sistemas.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Quando você sabe que a IA escolhe o que você vê, você pode reagir — pesquisar de outro jeito, questionar recomendações, olhar além do seu feed. A consciência é o que devolve o volante para você." },
    ],
  },
  316: {
    id: 316, worldId: 261,
    title: "Uma Breve História da IA",
    stops: [
      { tag: "Fact", title: "De Dartmouth Até Hoje", body: "A IA moderna remonta a um artigo de Alan Turing de 1950. Em 1956, o termo \"Inteligência Artificial\" foi cunhado na Conferência de Dartmouth — amplamente considerada o nascimento da IA como campo formal de pesquisa." },
      { tag: "Example", title: "Ciclos de Alta e Baixa", body: "As primeiras décadas trouxeram entusiasmo seguido de colapso. Pesquisadores dos anos 1960 previam IA no nível humano em 20 anos. Quando esse progresso estagnou, o financiamento secou. Esses períodos de colapso são conhecidos como Invernos da IA." },
      { tag: "Big idea", title: "A Era dos Sistemas Especialistas", body: "A IA voltou na década de 1980 com sistemas especialistas — programas que codificavam a expertise humana como regras explícitas. Eles também se mostraram caros e frágeis, e o interesse entrou em colapso novamente." },
      { tag: "Hot take", title: "O Avanço do Deep Learning", body: "A era moderna começou com dois momentos-chave: o Deep Blue da IBM derrotando o campeão de xadrez Garry Kasparov em 1997, e o avanço do AlexNet em 2012, quando o deep learning superou dramaticamente abordagens anteriores de reconhecimento de imagens. A onda atual — grandes modelos de linguagem, IA generativa — cresceu a partir desse ponto de virada." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Um "Inverno da IA" é um período em que o progresso da IA estagnou e o financiamento entrou em colapso após promessas exageradas.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Duas vezes na história da IA, grandes promessas fracassaram e o financiamento secou. Esses longos congelamentos são chamados de Invernos da IA — um alerta sobre o que acontece quando o hype corre na frente dos resultados." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Os sistemas especialistas eram programas que codificavam a expertise humana como regras explícitas.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Os sistemas especialistas tentaram engarrafar o conhecimento humano em milhares de regras escritas à mão. Funcionavam para problemas restritos, mas não davam conta de nada que as regras não cobrissem." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `2012 foi um ponto de virada na história da IA porque o deep learning superou dramaticamente abordagens anteriores de reconhecimento de imagens.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Em 2012, um sistema de deep learning esmagou a concorrência no ImageNet, uma famosa competição de reconhecimento de imagens. Essa vitória convenceu o mundo de que o deep learning era para valer — e o boom moderno da IA decolou." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A Conferência de Dartmouth é significativa porque foi onde o termo "Inteligência Artificial" foi cunhado e o campo formalmente fundado.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. No verão de 1956, um pequeno grupo de cientistas se reuniu no Dartmouth College, cunhou o nome 'Inteligência Artificial' e lançou a área como um campo de estudo de verdade. Toda IA que você usa hoje descende daquele encontro." },
    ],
  },
  317: {
    id: 317, worldId: 261,
    title: "Quem Constrói a IA e por Quê",
    stops: [
      { tag: "Fact", title: "Desenvolvimento Concentrado", body: "A IA não se constrói sozinha. Um pequeno número de grandes empresas de tecnologia, laboratórios de pesquisa governamentais e universidades toma a maioria das decisões fundamentais sobre como os poderosos sistemas de IA funcionam. Essas decisões afetam todos." },
      { tag: "Example", title: "Incentivos Concorrentes", body: "As empresas constroem IA por diversas razões: produtos comerciais, vantagem competitiva, crença genuína no seu benefício para a sociedade e a capacidade de substituir mão de obra humana cara. Esses incentivos nem sempre estão alinhados com os interesses dos usuários ou do público em geral." },
      { tag: "Big idea", title: "Construtores Moldam Sistemas", body: "A concentração do desenvolvimento de IA importa. Os pesquisadores e engenheiros que constroem a IA têm seus próprios valores, pontos cegos e acesso a dados. Um sistema construído principalmente por pessoas de contextos ricos e anglófonos pode ter um desempenho menos confiável para pessoas fora desses contextos." },
      { tag: "Hot take", title: "Uma Pergunta Legítima", body: "Isso não significa que a IA seja sempre tendenciosa ou prejudicial. Significa que perguntar quem constrói a IA, por que e com quais dados é uma questão razoável e importante — não uma questão conspiratória." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A maioria das decisões fundamentais sobre como os poderosos sistemas de IA funcionam é tomada por um pequeno número de grandes empresas de tecnologia, laboratórios governamentais e universidades.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Os sistemas de IA que todo mundo usa são moldados por um grupo surpreendentemente pequeno: grandes empresas de tecnologia, laboratórios de governos e universidades de elite. São eles que decidem o que é construído e como." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A concentração do desenvolvimento de IA importa porque um pequeno grupo está tomando decisões que afetam todos, sem ampla responsabilização.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Decisões tomadas por um punhado de empresas acabam afetando bilhões de pessoas que nunca tiveram voto nisso. Essa distância entre quem decide e quem é afetado é exatamente o motivo de a concentração importar." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Os valores, pontos cegos e acesso a dados dos construtores de IA podem moldar o desempenho dos sistemas em diferentes grupos.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. A IA reflete as pessoas que a constroem — seus valores, seus pontos cegos e os dados a que elas têm acesso. É por isso que um sistema pode funcionar muito bem para alguns grupos e tropeçar com outros." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `Perguntar quem constrói a IA e por que é uma questão conspiratória sem fundamento legítimo.`, answer: false, verdict: "Correto.", explanation: "A resposta é FALSO. Perguntar quem constrói a IA e por que é melhor descrito como: — Uma questão razoável e importante sobre responsabilização e escolhas de design" },
    ],
  },
  318: {
    id: 318, worldId: 261,
    title: "Tipos de IA",
    stops: [
      { tag: "Fact", title: "IA Estreita Hoje", body: "A IA Estreita — também chamada de IA Fraca — é projetada para uma tarefa específica. É toda a IA que existe atualmente. Exemplos: reconhecimento facial, filtros de spam, motores de xadrez, assistentes de voz. Uma IA de xadrez não consegue dirigir um carro; um modelo de linguagem não consegue realizar cirurgias." },
      { tag: "Example", title: "IAG: Ainda Hipotética", body: "A Inteligência Artificial Geral (IAG) se refere a uma IA hipotética capaz de realizar qualquer tarefa intelectual que um humano possa. Ela não existe ainda. Se e quando poderia surgir é assunto de discordância genuína entre pesquisadores sérios." },
      { tag: "Big idea", title: "Superinteligência: Só na Teoria", body: "A IA superinteligente — IA que supera a inteligência humana em todos os domínios — existe apenas na teoria. Alguns pesquisadores a consideram um resultado plausível a longo prazo; outros acham que nunca será alcançada." },
      { tag: "Hot take", title: "Medos vs. Realidade", body: "A maior parte da preocupação pública com a IA — deslocamento de empregos, decisões autônomas perigosas, risco existencial — se relaciona à IA geral ou superinteligente. Entender o que realmente temos (IA estreita) versus o que é especulativo ajuda a enquadrar esses debates com mais precisão." },
    ],
    questions: [
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `O único tipo de IA que existe atualmente é a IA Estreita.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Toda IA que existe hoje é estreita — brilhante na sua tarefa específica e inútil fora dela. Uma IA de xadrez não dirige um carro; um chatbot não dobra roupa." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A IAG é uma IA hipotética capaz de realizar qualquer tarefa cognitiva que um humano possa.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. AGI seria uma IA capaz de lidar com qualquer tarefa de pensamento que um humano consegue — não só uma especialidade. Ainda é hipotética: ninguém construiu uma, e ninguém sabe quando, ou se, alguém vai construir." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A maioria dos medos públicos sobre IA — como deslocamento de empregos e risco existencial — se relaciona à IAG, não aos sistemas de IA estreita que existem hoje.`, answer: true, verdict: "Correto.", explanation: "A resposta é VERDADEIRO. Quando as pessoas temem que a IA 'domine o mundo', geralmente estão imaginando a AGI — que ainda não existe. Misturar isso com a IA estreita de hoje atrapalha qualquer debate sério sobre as duas." },
      { difficulty: "Easy", tag: "Fact", stopTitle: '', question: `A IA superinteligente existe atualmente e está sendo usada por governos.`, answer: false, verdict: "Correto.", explanation: "A resposta é FALSO. Verdadeiro ou falso: A IA superinteligente existe atualmente. — Falso" },
    ],
  },
}

export default wm_w1_pt
