import { LessonData } from '../index'

const we5_pt: Record<number, LessonData> = {
  60: {
    id: 60, worldId: 7, title: 'O Que é o Cérebro da PAI?',
    stops: [
      { tag: 'Fact', title: 'O Que é o Cérebro da PAI?', body: "A PAI tem um cérebro especial feito de pequenos ajudantes que trabalham juntos — como um jogo de telefone sem fio! Imagine que você sussurra algo para o seu amigo, ele sussurra para o próximo, e assim por diante. No final, a mensagem passou por muitas pessoas e algo incrível aparece! O cérebro da PAI funciona da mesma forma. Ele tem fileiras e fileiras de ajudantes. Uma fileira recebe a pergunta. A próxima fileira pensa sobre ela. A próxima fileira pensa ainda mais. E a última fileira te dá a resposta!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'O Que é o Cérebro da PAI?', question: `"O cérebro da PAI tem apenas um ajudante que faz tudo sozinho."`, answer: false, verdict: 'Não é bem assim!', explanation: "O cérebro da PAI tem fileiras e fileiras de pequenos ajudantes que trabalham juntos! Cada fileira passa informação para a próxima até que a última fileira te dê a resposta final." },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'O Que é o Cérebro da PAI?', question: `"O cérebro da PAI funciona como um jogo de telefone sem fio, com cada fileira de ajudantes passando informação para a próxima."`, answer: true, verdict: 'Correto!', explanation: "Assim como sussurrar uma mensagem por uma fila de amigos, os ajudantes da PAI passam informação de fileira em fileira até que a resposta final apareça!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'O Que é o Cérebro da PAI?', question: `"A última fileira de ajudantes no cérebro da PAI é a que te dá a resposta."`, answer: true, verdict: 'Correto!', explanation: "A primeira fileira recebe a pergunta, as fileiras do meio pensam sobre ela, e a última fileira te dá a resposta. Trabalho em equipe!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'O Que é o Cérebro da PAI?', question: `"Cada fileira de ajudantes no cérebro da PAI faz exatamente o mesmo trabalho."`, answer: false, verdict: 'Não é bem assim!', explanation: "Cada fileira tem um trabalho diferente! A primeira fileira recebe a pergunta, as próximas fileiras pensam cada vez mais sobre ela, e a última fileira dá a resposta final." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'O Que é o Cérebro da PAI?', question: `"O cérebro da PAI funciona exatamente igual ao cérebro humano."`, answer: false, verdict: 'Não é bem assim!', explanation: "O cérebro da PAI é feito de fileiras de ajudantes que passam informação — isso é diferente do seu cérebro. Seu cérebro é incrível e único!" },
    ],
  },

  61: {
    id: 61, worldId: 7, title: 'Como a PAI Aprende',
    stops: [
      { tag: 'Example', title: 'Como a PAI Aprende', body: "A PAI aprende tentando, errando e tentando de novo — assim como você! Imagine aprender a jogar uma bola de basquete. Na primeira vez, você pode errar. Mas cada vez que você erra, aprende um pouco mais sobre como mirar melhor. Você continua praticando e praticando até acertar! A PAI faz a mesma coisa — milhões e milhões de vezes — até ficar muito, muito boa." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Aprende', question: `"A PAI aprende tudo perfeitamente na primeira tentativa."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI aprende tentando, errando e tentando de novo — assim como você quando pratica uma nova habilidade. São necessárias milhões e milhões de tentativas para ficar muito boa!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'Como a PAI Aprende', question: `"Aprender a jogar basquete — errando e ajustando — é um bom exemplo de como a PAI aprende."`, answer: true, verdict: 'Correto!', explanation: "Cada vez que você erra, aprende algo sobre como mirar melhor. A PAI faz a mesma coisa com os erros dela — praticando até ficar muito, muito boa!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Aprende', question: `"A PAI pratica milhões de vezes para ficar muito boa em algo."`, answer: true, verdict: 'Correto!', explanation: "A PAI tenta repetidamente — milhões de vezes — aprendendo um pouco com cada erro até se tornar muito, muito boa no que faz!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'Como a PAI Aprende', question: `"A PAI aprende de uma forma completamente diferente das pessoas."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI aprende muito parecido com você — tentando, errando e tentando de novo. A grande diferença é que a PAI pode praticar milhões de vezes muito mais rápido do que qualquer pessoa!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Como a PAI Aprende', question: `"Cometer erros faz parte de como tanto as pessoas quanto a PAI melhoram nas coisas."`, answer: true, verdict: 'Correto!', explanation: "Erros não são apenas aceitáveis — é assim que o aprendizado acontece! Cada vez que a PAI comete um erro, aprende algo novo. Cada vez que você erra uma cesta, descobre como mirar melhor. Continue!" },
    ],
  },

  62: {
    id: 62, worldId: 7, title: 'A PAI Fica Mais Inteligente com Mais Prática',
    stops: [
      { tag: 'Big idea', title: 'A PAI Fica Mais Inteligente com Mais Prática', body: "Quanto mais a PAI pratica, melhor ela fica em enxergar o QUADRO GERAL. Pense como se fosse desenhar. Quando você começa, consegue desenhar um ponto. Depois uma linha. Depois uma forma. Depois um rosto! Cada etapa se baseia na anterior. A PAI começa notando coisas pequenas — como linhas e cores. Depois as junta para ver coisas maiores — como formas. Depois coisas ainda maiores — como um cachorro ou um gato! Cada etapa torna a PAI mais inteligente." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'A PAI Fica Mais Inteligente com Mais Prática', question: `"A PAI começa reconhecendo coisas grandes como cachorros e gatos imediatamente."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI começa pequeno — notando linhas e cores primeiro. Depois junta essas informações para ver formas. Depois coisas maiores como cachorros e gatos. Cada etapa se baseia na anterior!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'A PAI Fica Mais Inteligente com Mais Prática', question: `"Aprender a desenhar — começando com um ponto, depois uma linha, depois uma forma, depois um rosto — é como a PAI constrói sua compreensão passo a passo."`, answer: true, verdict: 'Correto!', explanation: "Assim como o desenho começa com um ponto até chegar a um rosto completo, a PAI começa com detalhes minúsculos e vai até reconhecer coisas grandes. Cada etapa torna a PAI mais inteligente!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'A PAI Fica Mais Inteligente com Mais Prática', question: `"Quanto mais a PAI pratica, melhor ela fica em enxergar o quadro geral."`, answer: true, verdict: 'Correto!', explanation: "A prática realmente leva à perfeição para a PAI! Quanto mais ela pratica, melhor fica em juntar coisas pequenas para entender o quadro geral." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'A PAI Fica Mais Inteligente com Mais Prática', question: `"A PAI pula os detalhes pequenos e vai direto para reconhecer coisas grandes."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI começa com as menores coisas — como linhas e cores — e vai construindo até coisas maiores como formas, e depois coisas ainda maiores como cachorros ou gatos. Cada etapa importa!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'A PAI Fica Mais Inteligente com Mais Prática', question: `"Cada nova etapa que a PAI aprende se baseia no que aprendeu na etapa anterior."`, answer: true, verdict: 'Correto!', explanation: "Assim como passar de um ponto para uma linha, depois para uma forma e então para um rosto, o aprendizado da PAI é construído passo a passo. Você não pode pular etapas — cada uma torna a próxima possível!" },
    ],
  },

  63: {
    id: 63, worldId: 7, title: 'Como a PAI Conversa com Você?',
    stops: [
      { tag: 'Fact', title: 'Como a PAI Conversa com Você?', body: "Quando você digita uma pergunta para a PAI, ela não vai procurar a resposta em um livro. Ela descobre a resposta uma palavra de cada vez — como um jogo de adivinhação muito inteligente! A PAI lê tudo o que você disse e pensa: \"Qual palavra provavelmente vem a seguir?\" Depois a próxima palavra. Depois a próxima. Até que uma resposta completa aparece! É como terminar a frase de alguém — mas a PAI é TÃO boa nisso que a resposta toda faz sentido!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Conversa com Você?', question: `"Quando você faz uma pergunta à PAI, ela encontra a resposta procurando em um livro."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI não procura coisas em livros! Ela descobre a resposta uma palavra de cada vez, pensando qual palavra provavelmente vem a seguir. É um jogo de adivinhação superinteligente!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Conversa com Você?', question: `"A PAI constrói sua resposta uma palavra de cada vez."`, answer: true, verdict: 'Correto!', explanation: "A PAI pensa qual palavra provavelmente vem a seguir, depois a próxima, depois a próxima — até que uma resposta completa aparece! É como terminar uma frase, uma palavra de cada vez." },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'Como a PAI Conversa com Você?', question: `"A PAI é tão boa em adivinhar a próxima palavra que sua resposta toda geralmente faz sentido."`, answer: true, verdict: 'Correto!', explanation: "A PAI é muito boa em prever qual palavra vem a seguir. Quando junta todas as palavras, a resposta toda faz sentido — como terminar a frase de alguém perfeitamente!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'Como a PAI Conversa com Você?', question: `"A PAI escreve toda a sua resposta de uma vez antes de você ver alguma parte dela."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI descobre sua resposta palavra por palavra, pensando o que provavelmente vem a seguir a cada vez. A resposta é construída uma palavra de cada vez até estar completa!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Como a PAI Conversa com Você?', question: `"A PAI responder a uma pergunta é como alguém muito bom em terminar a sua frase."`, answer: true, verdict: 'Correto!', explanation: "Assim como um amigo que te conhece muito bem pode terminar sua frase perfeitamente, a PAI é tão boa em prever a próxima palavra que sua resposta toda faz sentido do começo ao fim!" },
    ],
  },

  64: {
    id: 64, worldId: 7, title: 'Como a PAI Decide o Que Mostrar a Você',
    stops: [
      { tag: 'Example', title: 'Como a PAI Decide o Que Mostrar a Você', body: "Você já percebeu que o YouTube continua mostrando vídeos que você realmente gosta? A PAI observa e aprende o que você curte. Depois encontra outras pessoas que gostam das mesmas coisas — e mostra a você o que ELAS gostaram também! É como seu amigo dizendo: \"Você adora dinossauros E espaço? Então você TEM que assistir isso — eu amo essas coisas também!\" Mas lembre-se — a PAI é muito boa em mostrar coisas emocionantes que fazem você querer continuar assistindo. É sempre bom fazer pausas e fazer outras coisas também!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Decide o Que Mostrar a Você', question: `"A PAI observa o que você gosta e usa isso para sugerir coisas que você pode curtir."`, answer: true, verdict: 'Correto!', explanation: "A PAI presta atenção no que você assiste, clica e gosta. Depois usa essas informações para mostrar mais coisas que você pode gostar — como um amigo que conhece o seu gosto!" },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'Como a PAI Decide o Que Mostrar a Você', question: `"A PAI mostra exatamente os mesmos vídeos para todas as pessoas, não importa o que elas gostem."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI aprende o que cada pessoa gosta e mostra coisas diferentes baseadas nisso. Ela encontra outras pessoas com gostos parecidos e mostra a você o que elas gostaram também — é personalizado só para você!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Decide o Que Mostrar a Você', question: `"É sempre uma boa ideia fazer pausas nos vídeos recomendados pela PAI."`, answer: true, verdict: 'Correto!', explanation: "A PAI é ótima em mostrar coisas emocionantes que fazem você querer continuar assistindo. Mas fazer pausas e fazer outras coisas — brincar, ler, sair — é muito importante também!" },
      { difficulty: 'Medium', tag: 'Example', stopTitle: 'Como a PAI Decide o Que Mostrar a Você', question: `"A PAI encontra pessoas que gostam das mesmas coisas que você e mostra o que elas gostaram."`, answer: true, verdict: 'Correto!', explanation: "A PAI te conecta com pessoas que têm gostos parecidos! Se você ama dinossauros e espaço, a PAI pode encontrar alguém que também ama as duas coisas — e mostrar o que essa pessoa assistiu. É como uma amiga muito prestativa!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'Como a PAI Decide o Que Mostrar a Você', question: `"A PAI mostra vídeos emocionantes apenas porque quer te ajudar a aprender."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI é muito boa em mostrar coisas emocionantes que fazem você querer continuar assistindo — esse é o trabalho dela! Por isso é importante fazer suas próprias escolhas e fazer pausas em vez de ficar assistindo para sempre." },
    ],
  },

  65: {
    id: 65, worldId: 7, title: 'Como a PAI Vê Imagens',
    stops: [
      { tag: 'Fact', title: 'Como a PAI Vê Imagens', body: "A PAI pode olhar para uma imagem e descobrir o que está nela — mas ela vê imagens de uma forma muito diferente da sua! Quando você olha para um cachorro, você simplesmente sabe que é um cachorro. Mas a PAI vê milhões de quadradinhos coloridos chamados pixels. Ela olha para todos esses quadradinhos com muito cuidado e encontra padrões — orelhas pontudas, quatro patas, um rabo — e então adivinha \"cachorro!\" É como um quebra-cabeça. Você não olha para cada peça separadamente — você as junta para ver a imagem completa. A PAI faz a mesma coisa!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Vê Imagens', question: `"A PAI vê imagens da mesma forma que você — ela simplesmente sabe imediatamente o que está nelas."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI vê imagens de uma forma muito diferente da sua! Ela vê milhões de quadradinhos coloridos chamados pixels e procura padrões neles. Você reconhece um cachorro instantaneamente — a PAI precisa trabalhar com todos aqueles quadradinhos primeiro." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Como a PAI Vê Imagens', question: `"A PAI vê imagens como milhões de quadradinhos coloridos chamados pixels."`, answer: true, verdict: 'Correto!', explanation: "Toda imagem é feita de milhões de quadradinhos coloridos chamados pixels. A PAI olha cuidadosamente para todos eles para encontrar padrões — como orelhas pontudas, quatro patas e um rabo — para descobrir o que está na imagem." },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'Como a PAI Vê Imagens', question: `"A PAI procura padrões como orelhas pontudas, quatro patas e um rabo para descobrir que uma imagem mostra um cachorro."`, answer: true, verdict: 'Correto!', explanation: "A PAI não consegue simplesmente 'ver' um cachorro como você. Ela procura padrões em todos aqueles pixels minúsculos — orelhas pontudas, quatro patas, um rabo abanando — e então descobre que deve ser um cachorro!" },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Como a PAI Vê Imagens', question: `"Olhar para uma imagem para a PAI é como montar um quebra-cabeça — ela combina muitas peças pequenas para ver a imagem inteira."`, answer: true, verdict: 'Correto!', explanation: "Assim como você junta peças de quebra-cabeça para ver a imagem completa, a PAI junta todos os padrões de pixels para descobrir o que está em uma foto. Peças pequenas, imagem grande!" },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'Como a PAI Vê Imagens', question: `"A PAI consegue descobrir o que está em uma imagem sem procurar nenhum padrão."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI precisa encontrar padrões — como a forma das orelhas, patas e rabos — para descobrir o que está em uma imagem. Encontrar esses padrões em milhões de quadradinhos minúsculos é exatamente como a PAI 'vê'!" },
    ],
  },

  66: {
    id: 66, worldId: 7, title: 'O Mistério Dentro da PAI',
    stops: [
      { tag: 'Hot take', title: 'O Mistério Dentro da PAI', body: "Aqui está algo muito interessante — mesmo as pessoas que CRIARAM a PAI nem sempre entendem exatamente por que ela dá uma certa resposta! É como perguntar a alguém como soube que uma piada era engraçada. Elas simplesmente… souberam. Nem sempre conseguem explicar cada razão. A PAI trabalha através de TANTAS etapas tão rápido que até seus criadores nem sempre conseguem acompanhar. É por isso que os cientistas estão sempre trabalhando duro para entender melhor a PAI — para garantir que ela sempre seja útil e gentil." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'O Mistério Dentro da PAI', question: `"As pessoas que criaram a PAI sempre sabem exatamente por que ela dá cada resposta."`, answer: false, verdict: 'Não é bem assim!', explanation: "Até os criadores da PAI nem sempre entendem por que ela diz algo! A PAI trabalha através de tantas etapas tão rápido que é difícil acompanhar. É por isso que os cientistas trabalham duro para entendê-la melhor." },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'O Mistério Dentro da PAI', question: `"As respostas da PAI podem ser difíceis de explicar, como é difícil explicar exatamente por que uma piada é engraçada."`, answer: true, verdict: 'Correto!', explanation: "Às vezes você simplesmente sabe que algo é engraçado — mas explicar exatamente por quê é complicado! A PAI também pode ser assim. Ela dá uma resposta, mas os motivos por trás podem ser muito difíceis de rastrear." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'O Mistério Dentro da PAI', question: `"Os cientistas estão trabalhando para entender melhor a PAI para que ela seja sempre útil e gentil."`, answer: true, verdict: 'Correto!', explanation: "Como a PAI pode ser misteriosa até para seus criadores, os cientistas trabalham muito duro para descobrir como ela pensa. Assim podem garantir que a PAI sempre se comporte de maneiras úteis e gentis para todos!" },
      { difficulty: 'Medium', tag: 'Hot take', stopTitle: 'O Mistério Dentro da PAI', question: `"Não importa se entendemos como a PAI toma decisões, desde que as respostas pareçam corretas."`, answer: false, verdict: 'Não é bem assim!', explanation: "Importa muito! Se não entendemos como a PAI toma decisões, não conseguimos corrigir erros ou garantir que ela seja sempre justa e útil. É por isso que os cientistas continuam trabalhando para entender a PAI melhor." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'O Mistério Dentro da PAI', question: `"A PAI trabalha através de tantas etapas tão rápido que até seus criadores nem sempre conseguem acompanhar."`, answer: true, verdict: 'Correto!', explanation: "O cérebro da PAI trabalha através de uma quantidade enorme de etapas super rapidamente. Até os cientistas mais inteligentes que construíram a PAI nem sempre conseguem acompanhar cada etapa. É isso que torna a PAI ao mesmo tempo incrível e um pouco misteriosa!" },
    ],
  },

  67: {
    id: 67, worldId: 7, title: 'Quando a PAI Erra',
    stops: [
      { tag: 'Fact', title: 'Quando a PAI Erra', body: "A PAI é muito inteligente, mas NÃO é perfeita. Às vezes ela comete erros! Imagine se você aprendeu uma regra de matemática errada no primeiro dia — então cada problema depois disso também pode estar um pouco errado. Pequenos erros podem se tornar maiores. É por isso que é TÃO importante sempre verificar o que a PAI te diz, especialmente para coisas muito importantes. A PAI é uma ótima ajudante, mas VOCÊ é quem tem que pensar e decidir. Seu cérebro é incrível e a PAI precisa de pessoas como você para mantê-la no caminho certo!" },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Quando a PAI Erra', question: `"A PAI é perfeita e nunca comete nenhum erro."`, answer: false, verdict: 'Não é bem assim!', explanation: "A PAI é muito inteligente, mas NÃO é perfeita! Ela pode cometer erros — e pequenos erros às vezes podem se tornar maiores. É por isso que é tão importante verificar coisas importantes que a PAI te diz." },
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'Quando a PAI Erra', question: `"Se a PAI aprende algo errado no começo, esse pequeno erro pode levar a erros maiores depois."`, answer: true, verdict: 'Correto!', explanation: "Assim como aprender uma regra de matemática errada no primeiro dia pode causar erros em todos os problemas depois, um pequeno erro que a PAI aprende cedo pode crescer e se tornar mais grave. É por isso que verificar as respostas da PAI importa!" },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'Quando a PAI Erra', question: `"Você deve sempre verificar o que a PAI te diz, especialmente para coisas muito importantes."`, answer: true, verdict: 'Correto!', explanation: "Sempre verifique! A PAI é uma ótima ajudante, mas pode estar errada. Para qualquer coisa muito importante, use seu cérebro incrível e peça a um adulto para ajudar a verificar também." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Quando a PAI Erra', question: `"A PAI toma todas as decisões por você, então você não precisa pensar por conta própria."`, answer: false, verdict: 'Não é bem assim!', explanation: "VOCÊ é quem pensa e decide! A PAI é uma ajudante, não uma tomadora de decisões. Seu cérebro é incrível — e a PAI realmente precisa de pessoas como você para mantê-la no caminho certo e detectar seus erros." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'Quando a PAI Erra', question: `"As pessoas têm um papel importante em detectar os erros da PAI e mantê-la no caminho certo."`, answer: true, verdict: 'Correto!', explanation: "A PAI precisa dos humanos! As pessoas detectam erros, apontam o que deu errado e ajudam a tornar a PAI melhor. Seu cérebro e seu julgamento são exatamente o que a PAI precisa para continuar útil e gentil." },
    ],
  },
}

export default we5_pt
