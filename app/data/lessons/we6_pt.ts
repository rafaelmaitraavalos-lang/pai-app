import { LessonData } from '../index'

const we6_pt: Record<number, LessonData> = {
  52: {
    id: 52, worldId: 8, title: 'A IA é Justa?',
    stops: [
      { tag: 'Big idea', title: 'O que é Ética?', body: "Ética significa pensar sobre o que é certo e errado — e tentar fazer boas escolhas, mesmo quando é difícil. Você faz isso todo dia quando decide compartilhar, falar a verdade ou defender alguém.\n\nA IA também precisa de ética! Como a IA fala com milhões de pessoas, mesmo uma pequena escolha errada pode causar muito dano. Por isso, perguntar 'isso é justo?' é muito importante." },
      { tag: 'Fact', title: 'O Problema do Viés', body: "Imagine se um professor só chamasse crianças com mochilas vermelhas. Isso não seria justo com os outros! Esse padrão injusto se chama viés.\n\nA IA também pode ter viés. Se ela aprendeu com informações que deixaram algumas pessoas de fora, pode não tratar todo mundo de forma igual. Não é maldade — ela apenas aprendeu padrões injustos." },
      { tag: 'Fact', title: 'O Problema do Consentimento', body: "Consentimento significa dizer 'sim, pode.' Se alguém usar seu desenho sem pedir — isso não está certo!\n\nA IA aprendeu com milhões de coisas que as pessoas escreveram e criaram — mas nem todo mundo disse 'sim, pode usar meu trabalho.' Essa é uma grande questão que as pessoas ainda estão tentando resolver." },
      { tag: 'Hot take', title: 'Quem é Responsável?', body: "Se um robô esbarrar em alguém, quem é responsável — o robô, a empresa que o fez, ou a pessoa que o ligou?\n\nQuando a IA faz algo errado, é difícil saber quem deve corrigir. Garantir que ALGUÉM seja responsável — e vá consertar os erros — é muito importante." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'O que é Ética?', question: `"Ética significa pensar sobre o que é certo e errado e tentar fazer boas escolhas."`, answer: true, verdict: 'Correto!', explanation: "Ética é sobre fazer boas escolhas — e a IA também precisa de ética. Quando a IA fala com milhões de pessoas, até uma pequena escolha errada pode causar muito dano." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'O Problema do Viés', question: `"A IA pode ter viés se aprendeu com informações que deixaram algumas pessoas de fora."`, answer: true, verdict: 'Correto!', explanation: "A IA não está tentando ser injusta — ela apenas aprendeu padrões injustos. Por isso é tão importante que as informações que a IA aprende sejam corretas e completas." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'O Problema do Consentimento', question: `"Todo mundo cujo trabalho a IA aprendeu disse 'sim, pode usar o meu trabalho.'"`, answer: false, verdict: 'Não exatamente!', explanation: "Na verdade, nem todo mundo deu permissão! A IA aprendeu com milhões de coisas que as pessoas criaram, mas muitas pessoas nunca foram consultadas. Essa é uma grande questão que ainda está sendo resolvida." },
    ],
  },

  53: {
    id: 53, worldId: 8, title: 'IA e Escolhas',
    stops: [
      { tag: 'Hot take', title: 'O Mistério Dentro da IA', body: "Às vezes, até as pessoas que FIZERAM a IA não conseguem explicar totalmente por que ela deu uma certa resposta — é como perguntar por que você gosta de uma música, mas não ter palavras para explicar.\n\nIsso torna difícil verificar se a IA está sendo justa. Os cientistas estão trabalhando para tornar a IA mais fácil de entender." },
      { tag: 'Example', title: 'Empurrões e Escolhas de Verdade', body: "Um empurrão é quando algo te leva suavemente a uma escolha — como quando um aplicativo pergunta 'mais um vídeo?' várias vezes.\n\nEmpurrões demais podem impedir que você tome SUA PRÓPRIA decisão. Escolha de verdade significa que VOCÊ decide — não porque algo ficou te empurrando." },
      { tag: 'Big idea', title: 'Fazer o que Você Realmente Quer Dizer', body: "Você disse para a PAI: 'me ajude a limpar minha redação.' A PAI apagou tudo. Tecnicamente está limpo — mas NÃO era isso que você queria dizer!\n\nFazer a IA entender o que você realmente quer — não apenas as palavras que você disse — se chama alinhamento. É um dos problemas mais difíceis de toda a IA." },
      { tag: 'Big idea', title: 'Quem Decide?', body: "Quem deve fazer as regras sobre a IA — cientistas? Governos? Empresas? Crianças que vão crescer usando ela?\n\nEssas são perguntas reais que as pessoas estão fazendo AGORA MESMO. Um dia, a sua voz vai importar para fazer essas regras também." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'Empurrões e Escolhas de Verdade', question: `"Um empurrão te leva suavemente a uma escolha várias vezes, o que pode impedir que você decida por conta própria."`, answer: true, verdict: 'Correto!', explanation: "Escolha de verdade significa que VOCÊ decide — não porque um aplicativo ficou perguntando 'mais um?' várias vezes. Perceber os empurrões é o primeiro passo para fazer suas próprias escolhas." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Fazer o que Você Realmente Quer Dizer', question: `"Alinhamento significa fazer a IA entender o que você realmente quer, não apenas as palavras exatas que você disse."`, answer: true, verdict: 'Correto!', explanation: "É exatamente isso! Se você disser 'limpe minha redação' e a IA apagar tudo — tecnicamente ela seguiu as instruções, mas não entendeu o que você queria dizer. O alinhamento é um dos problemas mais difíceis da IA." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Quem Decide?', question: `"Só cientistas e governos devem decidir as regras sobre a IA — não pessoas comuns."`, answer: false, verdict: 'Não exatamente!', explanation: "A voz de todos importa — incluindo a sua! As regras sobre a IA afetarão todos que a usam. As crianças que crescem com a IA hoje também vão ajudar a moldar essas regras." },
    ],
  },
}

export default we6_pt
