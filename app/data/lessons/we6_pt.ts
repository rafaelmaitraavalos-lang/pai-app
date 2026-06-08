import { LessonData } from '../index'

// Same stops as we5_pt — harder questions (grades 3–5 equivalent)
const we6_pt: Record<number, LessonData> = {
  68: {
    id: 68, worldId: 8, title: 'O Que é o Cérebro da PAI?',
    stops: [
      { tag: 'Fact', title: 'O Que é o Cérebro da PAI?', body: "A PAI tem um cérebro especial feito de pequenos ajudantes que trabalham juntos — como um jogo de telefone sem fio! Imagine que você sussurra algo para o seu amigo, ele sussurra para o próximo, e assim por diante. No final, a mensagem passou por muitas pessoas e algo incrível aparece! O cérebro da PAI funciona da mesma forma. Ele tem fileiras e fileiras de ajudantes. Uma fileira recebe a pergunta. A próxima fileira pensa sobre ela. A próxima fileira pensa ainda mais. E a última fileira te dá a resposta!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'O Que é o Cérebro da PAI?', question: `"Imagine sussurrar um segredo por uma longa fila de amigos. Isso é semelhante a como o cérebro da PAI funciona."`, answer: true, verdict: 'Correto!', explanation: "No jogo do telefone sem fio, cada pessoa passa a mensagem para a próxima. O cérebro da PAI funciona da mesma forma — cada fileira de ajudantes passa informação para a próxima até que a resposta final apareça!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'O Que é o Cérebro da PAI?', question: `"O cérebro da PAI tem apenas alguns ajudantes."`, answer: false, verdict: 'Não é bem assim!', explanation: "O cérebro da PAI tem fileiras e fileiras de ajudantes — não apenas alguns! Todos eles trabalham juntos para pegar sua pergunta e transformá-la em uma resposta." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'O Que é o Cérebro da PAI?', question: `"A primeira fileira de ajudantes no cérebro da PAI é a que recebe sua pergunta."`, answer: true, verdict: 'Correto!', explanation: "A primeira fileira recebe a pergunta, as fileiras do meio pensam sobre ela cada vez mais duro, e a última fileira te dá a resposta. Cada fileira tem um trabalho importante!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'O Que é o Cérebro da PAI?', question: `"O cérebro da PAI sempre precisa de um livro ou site para encontrar respostas."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI não procura respostas! Suas fileiras de ajudantes trabalham juntas para descobrir a resposta por conta própria — passando informação de fileira em fileira até que a última fileira te dê a resposta final." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'O Que é o Cérebro da PAI?', question: `"As fileiras de ajudantes da PAI trabalhando juntas é o que permite que a PAI responda perguntas."`, answer: true, verdict: 'Correto!', explanation: "O trabalho em equipe das fileiras de ajudantes da PAI é o que a torna inteligente! Cada fileira faz sua parte, passando informação adiante, até que a última fileira monta sua resposta." },
    ],
  },

  69: {
    id: 69, worldId: 8, title: 'Como a PAI Aprende',
    stops: [
      { tag: 'Example', title: 'Como a PAI Aprende', body: "A PAI aprende tentando, errando e tentando de novo — assim como você! Imagine aprender a jogar uma bola de basquete. Na primeira vez, você pode errar. Mas cada vez que você erra, aprende um pouco mais sobre como mirar melhor. Você continua praticando e praticando até acertar! A PAI faz a mesma coisa — milhões e milhões de vezes — até ficar muito, muito boa." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Aprende', question: `"A PAI só consegue aprender se nunca cometer erros."`, answer: false, verdict: 'Não é bem assim!', explanation: "Os erros são na verdade como a PAI aprende! Cada vez que a PAI erra algo, ela descobre como fazer melhor na próxima vez. Cometer erros é uma parte importante de ficar muito bom." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Aprende', question: `"A PAI fica cada vez melhor quanto mais pratica."`, answer: true, verdict: 'Correto!', explanation: "Assim como você fica melhor em jogar basquete com prática, a PAI fica cada vez melhor quanto mais tenta. Milhões de rodadas de prática tornam a PAI muito, muito boa!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'Como a PAI Aprende', question: `"Quando você erra uma cesta de basquete, não aprende nada e deveria parar de tentar."`, answer: false, verdict: 'Não é bem assim!', explanation: "Cada erro te ensina algo sobre como mirar melhor! A PAI é igual — cada erro a ajuda a aprender. Nunca pare de tentar!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'Como a PAI Aprende', question: `"A PAI pratica milhões de vezes, o que é muito mais do que qualquer pessoa poderia praticar."`, answer: true, verdict: 'Correto!', explanation: "Uma grande diferença entre a PAI e as pessoas é a velocidade. A PAI consegue praticar milhões de vezes super rápido — muito mais do que qualquer pessoa poderia em uma vida inteira. Isso é parte do motivo pelo qual ela fica tão boa!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Como a PAI Aprende', question: `"Tentar e falhar é perda de tempo tanto para pessoas quanto para a PAI."`, answer: false, verdict: 'Não é bem assim!', explanation: "Tentar e falhar nunca é perda de tempo! Para pessoas e para a PAI, cada erro é uma chance de aprender. É exatamente assim que você vai da sua primeira tentativa à sua melhor jogada!" },
    ],
  },

  70: {
    id: 70, worldId: 8, title: 'A PAI Fica Mais Inteligente com Mais Prática',
    stops: [
      { tag: 'Big idea', title: 'A PAI Fica Mais Inteligente com Mais Prática', body: "Quanto mais a PAI pratica, melhor ela fica em enxergar o QUADRO GERAL. Pense como se fosse desenhar. Quando você começa, consegue desenhar um ponto. Depois uma linha. Depois uma forma. Depois um rosto! Cada etapa se baseia na anterior. A PAI começa notando coisas pequenas — como linhas e cores. Depois as junta para ver coisas maiores — como formas. Depois coisas ainda maiores — como um cachorro ou um gato! Cada etapa torna a PAI mais inteligente." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'A PAI Fica Mais Inteligente com Mais Prática', question: `"A PAI fica melhor em enxergar o quadro geral quanto mais pratica."`, answer: true, verdict: 'Correto!', explanation: "A prática torna a PAI mais inteligente! Quanto mais a PAI pratica, melhor fica em juntar coisas pequenas para entender o quadro completo." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'A PAI Fica Mais Inteligente com Mais Prática', question: `"A PAI começa reconhecendo um rosto inteiro ou um cachorro todo antes de notar detalhes menores."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI começa pequeno! Ela primeiro nota coisas minúsculas como linhas e cores. Depois vai construindo até formas. Depois coisas maiores como um cachorro ou um gato. Etapas pequenas levam ao quadro grande!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'A PAI Fica Mais Inteligente com Mais Prática', question: `"Desenhar começa com um simples ponto e vai até um rosto completo — isso é semelhante a como a PAI constrói sua compreensão."`, answer: true, verdict: 'Correto!', explanation: "O desenho começa com um ponto, depois uma linha, depois uma forma, depois um rosto. O aprendizado da PAI é igual — começando com detalhes minúsculos e construindo até reconhecer coisas grandes e complexas!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'A PAI Fica Mais Inteligente com Mais Prática', question: `"É possível pular etapas ao construir compreensão, tanto no desenho quanto para a PAI."`, answer: false, verdict: 'Não é bem assim!', explanation: "Você não consegue desenhar um rosto sem antes aprender linhas e formas, e a PAI não consegue reconhecer um cachorro sem antes aprender linhas e cores. Cada etapa é necessária antes da próxima!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'A PAI Fica Mais Inteligente com Mais Prática', question: `"A PAI constrói desde detalhes pequenos, como linhas e cores, até reconhecer coisas como cachorros e gatos."`, answer: true, verdict: 'Correto!', explanation: "A inteligência da PAI é construída camada por camada! Ela começa com as menores coisas e trabalha até ideias cada vez maiores. É isso que torna cada etapa de prática tão valiosa." },
    ],
  },

  71: {
    id: 71, worldId: 8, title: 'Como a PAI Conversa com Você?',
    stops: [
      { tag: 'Fact', title: 'Como a PAI Conversa com Você?', body: "Quando você digita uma pergunta para a PAI, ela não vai procurar a resposta em um livro. Ela descobre a resposta uma palavra de cada vez — como um jogo de adivinhação muito inteligente! A PAI lê tudo o que você disse e pensa: \"Qual palavra provavelmente vem a seguir?\" Depois a próxima palavra. Depois a próxima. Até que uma resposta completa aparece! É como terminar a frase de alguém — mas a PAI é TÃO boa nisso que a resposta toda faz sentido!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Conversa com Você?', question: `"A PAI responde perguntas adivinhando uma palavra de cada vez."`, answer: true, verdict: 'Correto!', explanation: "A PAI pensa qual palavra provavelmente vem a seguir, depois a próxima, depois a próxima — até que uma resposta completa aparece. É um grande e muito inteligente jogo de adivinhação!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Conversa com Você?', question: `"A PAI lê o que você escreveu antes de decidir qual palavra provavelmente vem a seguir."`, answer: true, verdict: 'Correto!', explanation: "A PAI lê tudo o que você disse e usa isso para descobrir qual palavra provavelmente deve vir a seguir em sua resposta. Quanto mais ela sabe sobre sua pergunta, melhor é sua resposta!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'Como a PAI Conversa com Você?', question: `"A PAI encontra suas respostas da mesma forma que você procura informações em uma biblioteca."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI não procura coisas! Em vez disso, ela descobre a resposta palavra por palavra — pensando qual palavra provavelmente vem a seguir a cada vez. Isso é muito diferente de pesquisar em uma biblioteca!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'Como a PAI Conversa com Você?', question: `"A criação de respostas da PAI funciona como um jogo de adivinhação onde cada palpite se baseia no anterior."`, answer: true, verdict: 'Correto!', explanation: "Cada palavra que a PAI escolhe a ajuda a descobrir a próxima palavra. Ela constrói a resposta uma palavra de cada vez — como um jogo de adivinhação que continua até que a resposta completa esteja pronta!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Como a PAI Conversa com Você?', question: `"Como a PAI é tão boa em prever a próxima palavra, suas respostas completas quase sempre fazem sentido."`, answer: true, verdict: 'Correto!', explanation: "A PAI praticou adivinhar a próxima palavra tantas vezes que ficou muito, muito boa nisso. É por isso que suas respostas geralmente fazem sentido da primeira à última palavra!" },
    ],
  },

  72: {
    id: 72, worldId: 8, title: 'Como a PAI Decide o Que Mostrar a Você',
    stops: [
      { tag: 'Example', title: 'Como a PAI Decide o Que Mostrar a Você', body: "Você já percebeu que o YouTube continua mostrando vídeos que você realmente gosta? A PAI observa e aprende o que você curte. Depois encontra outras pessoas que gostam das mesmas coisas — e mostra a você o que ELAS gostaram também! É como seu amigo dizendo: \"Você adora dinossauros E espaço? Então você TEM que assistir isso — eu amo essas coisas também!\" Mas lembre-se — a PAI é muito boa em mostrar coisas emocionantes que fazem você querer continuar assistindo. É sempre bom fazer pausas e fazer outras coisas também!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'Como a PAI Decide o Que Mostrar a Você', question: `"Se você adora dinossauros E espaço, a PAI pode te mostrar vídeos que outros fãs de dinossauros e espaço gostaram."`, answer: true, verdict: 'Correto!', explanation: "A PAI encontra pessoas com gostos parecidos com os seus e te mostra o que elas gostaram. É como um amigo dizendo 'você tem que assistir isso — eu amo essas coisas também!'" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Decide o Que Mostrar a Você', question: `"A PAI não consegue aprender nada sobre o que você gosta."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI observa e aprende o que você gosta! Ela presta atenção no que você gosta, assiste e clica, e então usa tudo isso para sugerir mais coisas que você pode adorar." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Decide o Que Mostrar a Você', question: `"Fazer pausas de assistir vídeos é uma escolha saudável mesmo quando a PAI continua mostrando coisas emocionantes."`, answer: true, verdict: 'Correto!', explanation: "A PAI é muito boa em fazer você querer continuar assistindo. Mas fazer pausas para brincar, ler ou sair é tão importante! Certifique-se de que VOCÊ está no controle de quando assistir — não a PAI." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Como a PAI Decide o Que Mostrar a Você', question: `"A PAI decide o que te mostrar baseada apenas no que você disse que gosta."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI observa o que você realmente assiste e gosta — não apenas o que você diz que gosta. Ela também encontra outras pessoas com gostos parecidos e te mostra o que elas gostaram. Ela aprende com suas ações!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'Como a PAI Decide o Que Mostrar a Você', question: `"A PAI é projetada para te mostrar coisas que fazem você querer continuar assistindo."`, answer: true, verdict: 'Correto!', explanation: "Esse é o trabalho da PAI — manter você engajado! Ela é muito boa nisso. É por isso que é importante fazer suas próprias escolhas sobre quando parar de assistir e ir fazer outra coisa." },
    ],
  },

  73: {
    id: 73, worldId: 8, title: 'Como a PAI Vê Imagens',
    stops: [
      { tag: 'Fact', title: 'Como a PAI Vê Imagens', body: "A PAI pode olhar para uma imagem e descobrir o que está nela — mas ela vê imagens de uma forma muito diferente da sua! Quando você olha para um cachorro, você simplesmente sabe que é um cachorro. Mas a PAI vê milhões de quadradinhos coloridos chamados pixels. Ela olha para todos esses quadradinhos com muito cuidado e encontra padrões — orelhas pontudas, quatro patas, um rabo — e então adivinha \"cachorro!\" É como um quebra-cabeça. Você não olha para cada peça separadamente — você as junta para ver a imagem completa. A PAI faz a mesma coisa!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Vê Imagens', question: `"Os quadradinhos coloridos minúsculos que formam uma imagem são chamados de pixels."`, answer: true, verdict: 'Correto!', explanation: "Toda imagem em uma tela é feita de milhões de quadradinhos coloridos minúsculos chamados pixels. É isso que a PAI vê quando olha para uma foto — e ela examina cuidadosamente todos eles!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'Como a PAI Vê Imagens', question: `"A PAI consegue reconhecer um cachorro encontrando padrões em uma imagem, como quatro patas e orelhas pontudas."`, answer: true, verdict: 'Correto!', explanation: "A PAI procura padrões em todos aqueles pixels minúsculos. Quando encontra coisas como quatro patas, orelhas pontudas e um rabo, ela soma tudo e adivinha 'cachorro!' É assim que ela aprende a ver!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Vê Imagens', question: `"A PAI e os humanos veem imagens exatamente da mesma forma."`, answer: false, verdict: 'Não é bem assim!', explanation: "Você vê um cachorro e simplesmente sabe que é um cachorro. A PAI vê milhões de quadradinhos minúsculos e precisa procurar padrões para descobrir. Mesma imagem, formas muito diferentes de ver!" },
      { difficulty: 'Medium', tag: 'Example', stopTitle: 'Como a PAI Vê Imagens', question: `"Reconhecer uma imagem para a PAI é como resolver um quebra-cabeça — ela precisa juntar muitas peças pequenas."`, answer: true, verdict: 'Correto!', explanation: "Assim como um quebra-cabeça precisa de todas as suas peças para mostrar a imagem completa, a PAI junta todos os padrões de pixels minúsculos para descobrir o que está em uma foto. É muito trabalho — mas a PAI faz isso super rápido!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Como a PAI Vê Imagens', question: `"Os padrões que a PAI encontra nos pixels, como orelhas e patas, são o que a ajudam a adivinhar o que está em uma imagem."`, answer: true, verdict: 'Correto!', explanation: "Os padrões são a chave! A PAI identifica padrões em milhões de quadradinhos minúsculos — orelhas pontudas aqui, quatro patas ali, um rabo no canto — e usa esses padrões para fazer seu melhor palpite sobre o que está vendo." },
    ],
  },

  74: {
    id: 74, worldId: 8, title: 'O Mistério Dentro da PAI',
    stops: [
      { tag: 'Hot take', title: 'O Mistério Dentro da PAI', body: "Aqui está algo muito interessante — mesmo as pessoas que CRIARAM a PAI nem sempre entendem exatamente por que ela dá uma certa resposta! É como perguntar a alguém como soube que uma piada era engraçada. Elas simplesmente… souberam. Nem sempre conseguem explicar cada razão. A PAI trabalha através de TANTAS etapas tão rápido que até seus criadores nem sempre conseguem acompanhar. É por isso que os cientistas estão sempre trabalhando duro para entender melhor a PAI — para garantir que ela sempre seja útil e gentil." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Hot take', stopTitle: 'O Mistério Dentro da PAI', question: `"O cérebro da PAI é um pouco misterioso — até para os cientistas que o construíram."`, answer: true, verdict: 'Correto!', explanation: "A PAI trabalha através de tantas etapas tão rápido que até seus criadores nem sempre conseguem acompanhar. Esse mistério é uma das razões pelas quais os cientistas trabalham tão duro para entender melhor a PAI!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'O Mistério Dentro da PAI', question: `"Entender como a PAI toma decisões ajuda a garantir que ela seja sempre útil e gentil."`, answer: true, verdict: 'Correto!', explanation: "Se os cientistas conseguirem descobrir como a PAI pensa e toma decisões, podem detectar erros e garantir que a PAI sempre se comporte de maneiras úteis, justas e gentis para todos." },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'O Mistério Dentro da PAI', question: `"Quando alguém não consegue explicar por que uma piada é engraçada, isso é completamente diferente de como a PAI não consegue explicar suas respostas."`, answer: false, verdict: 'Não é bem assim!', explanation: "Na verdade são muito parecidos! Assim como você pode saber que uma piada é engraçada sem saber exatamente por quê, a PAI dá respostas que podem ser difíceis de rastrear por todas as suas etapas." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'O Mistério Dentro da PAI', question: `"A PAI é misteriosa porque trabalha através de um número enorme de etapas muito rapidamente."`, answer: true, verdict: 'Correto!', explanation: "O cérebro da PAI processa enormes quantidades de informação em velocidade incrível. Há tantas etapas acontecendo tão rápido que até seus criadores nem sempre conseguem rastreá-las todas. A velocidade cria mistério!" },
      { difficulty: 'Medium', tag: 'Hot take', stopTitle: 'O Mistério Dentro da PAI', question: `"Enquanto as respostas da PAI parecerem úteis, não importa como ela chegou a elas."`, answer: false, verdict: 'Não é bem assim!', explanation: "Importa muito! Se não entendemos como a PAI chega às suas respostas, não conseguimos corrigi-la quando comete erros ou verificar se ela está sendo justa. Entender a PAI ajuda a manter todos seguros." },
    ],
  },

  75: {
    id: 75, worldId: 8, title: 'Quando a PAI Erra',
    stops: [
      { tag: 'Fact', title: 'Quando a PAI Erra', body: "A PAI é muito inteligente, mas NÃO é perfeita. Às vezes ela comete erros! Imagine se você aprendeu uma regra de matemática errada no primeiro dia — então cada problema depois disso também pode estar um pouco errado. Pequenos erros podem se tornar maiores. É por isso que é TÃO importante sempre verificar o que a PAI te diz, especialmente para coisas muito importantes. A PAI é uma ótima ajudante, mas VOCÊ é quem tem que pensar e decidir. Seu cérebro é incrível e a PAI precisa de pessoas como você para mantê-la no caminho certo!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Quando a PAI Erra', question: `"A PAI é uma ótima ajudante, mas não é perfeita."`, answer: true, verdict: 'Correto!', explanation: "A PAI é muito inteligente e consegue fazer coisas incríveis — mas não é perfeita. Ela pode cometer erros, e esses erros às vezes podem crescer e se tornar maiores. Sempre verifique coisas importantes!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'Quando a PAI Erra', question: `"Aprender uma regra de matemática errada no primeiro dia é como um pequeno erro pode causar problemas maiores para a PAI depois."`, answer: true, verdict: 'Correto!', explanation: "Um erro aprendido cedo pode se propagar por tudo depois — para você na aula de matemática e para a PAI nas suas respostas. É por isso que detectar erros cedo e verificar as coisas é tão importante!" },
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'Quando a PAI Erra', question: `"A PAI não precisa de pessoas para mantê-la no caminho certo — ela sempre corrige seus próprios erros."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI precisa de pessoas como você! Os humanos são os que detectam os erros da PAI e a ajudam a manter o caminho certo. Seu cérebro e seu julgamento são incrivelmente valiosos — a PAI não conseguiria ir bem sem eles." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'Quando a PAI Erra', question: `"Verificar informações importantes que a PAI te dá é sempre uma ideia inteligente."`, answer: true, verdict: 'Correto!', explanation: "Mesmo que a PAI seja muito inteligente, ela pode estar errada. Para qualquer coisa muito importante, use seu próprio cérebro, pergunte a um adulto e verifique outras fontes também. Você é o tomador de decisão final!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Quando a PAI Erra', question: `"Pequenos erros que a PAI aprende podem ficar pequenos e nunca causar problemas maiores."`, answer: false, verdict: 'Não é bem assim!', explanation: "Pequenos erros podem crescer! Uma regra errada aprendida cedo pode levar a mais respostas erradas depois — assim como um erro de matemática no primeiro dia pode continuar aparecendo em todos os problemas depois. É por isso que corrigir erros cedo importa!" },
    ],
  },
}

export default we6_pt
