#!/usr/bin/env python3
"""Replace the 149 broken Portuguese middle-school quiz explanations.

The PT generator emitted the source question ("Pergunta? — opção") where the
explanation belongs, on 149 of 160 quizzes (found by adversarial review
2026-08-01; EN was fixed in the 07-31 review sync, PT never was). Each entry
below is a faithful Portuguese translation of the corrected English
explanation for the same question (PT lesson id = EN id + 100; answers were
verified to match 1:1 before translation).

Applies only to explanations matching the broken "? — " signature, so the 11
good ones are untouched. Idempotent. --check reports without writing.
"""
import json
import re
import sys
import os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

# key: "ptLessonId.questionIndex" -> Portuguese explanation body.
# The "A resposta é VERDADEIRO/FALSO." prefix is added by the apply step.
PT = {
 "311.0": "O software tradicional segue regras que um programador escreveu com antecedência. O machine learning é diferente — ele descobre os padrões sozinho, estudando montanhas de exemplos.",
 "311.2": "A IA já processou muito mais exemplos do que qualquer pessoa conseguiria em toda a vida. É por isso que ela pode parecer assustadoramente precisa.",
 "311.3": "Um filtro de spam é um exemplo de IA porque usa padrões e exemplos para decidir o que é ou não é spam.",
 "312.0": "A IA não segue regras simples do tipo se/então. Ela aprende olhando um número absurdo de exemplos, recebendo feedback sobre o que está errando e aprendendo com isso.",
 "312.1": "O machine learning aprende exatamente assim. Ele recebe feedback sobre seus erros e faz pequenos ajustes em resposta.",
 "312.2": "É um processo lento e gradual. Esses pequenos ajustes se acumulam até virarem uma melhora real e significativa.",
 "312.3": "O machine learning pode ser aplicado a uma enorme variedade de tarefas, incluindo detecção de spam, recomendação de músicas e exames de imagem na medicina.",
 "313.0": "Turing abriu seu famoso artigo de 1950 exatamente com essa pergunta. Era uma pergunta tão difícil que ele acabou propondo um jogo para tentar respondê-la.",
 "313.1": "Essa é a essência do Teste de Turing: um juiz conversa com alguém escondido e precisa descobrir — humano ou máquina? Se o juiz não consegue distinguir, a máquina passa no teste.",
 "313.2": "Turing percebeu que 'as máquinas podem realmente pensar?' talvez fosse impossível de responder. Então ele trocou por uma pergunta que dá para testar: uma máquina consegue se comportar de forma tão convincente que você não nota a diferença?",
 "313.3": "Passar no Teste de Turing só prova que a máquina consegue agir de forma convincentemente humana numa conversa. Agir de forma inteligente e ser de fato inteligente não são a mesma coisa — essa é a maior crítica ao teste.",
 "314.0": "A IA é uma máquina de reconhecer padrões que estudou mais exemplos do que qualquer humano conseguiria. Dentro desses padrões, ela é sobre-humana; fora deles, pode desmoronar surpreendentemente rápido.",
 "314.3": "Tire a IA dos padrões em que ela foi treinada e ela pode falhar em coisas que uma criança pequena acha óbvias. Raciocínio de verdade e bom senso ainda são superpoderes humanos.",
 "315.0": "Toda vez que você pesquisa, uma IA está decidindo em silêncio quais resultados merecem o topo da lista. Você nunca a vê trabalhando — só vê a lista que ela escolheu para você.",
 "315.1": "Algoritmos são construídos por pessoas, e pessoas fazem escolhas: o que priorizar, o que ignorar, o que conta como 'melhor'. Essas escolhas ficam embutidas em cada decisão do algoritmo.",
 "315.2": "Quais anúncios de emprego você vê pode mudar o rumo da sua carreira inteira — e um algoritmo decide isso sem você nem perceber. É algo enorme escondido à vista de todos.",
 "315.3": "Quando você sabe que a IA escolhe o que você vê, você pode reagir — pesquisar de outro jeito, questionar recomendações, olhar além do seu feed. A consciência é o que devolve o volante para você.",
 "316.0": "Duas vezes na história da IA, grandes promessas fracassaram e o financiamento secou. Esses longos congelamentos são chamados de Invernos da IA — um alerta sobre o que acontece quando o hype corre na frente dos resultados.",
 "316.1": "Os sistemas especialistas tentaram engarrafar o conhecimento humano em milhares de regras escritas à mão. Funcionavam para problemas restritos, mas não davam conta de nada que as regras não cobrissem.",
 "316.2": "Em 2012, um sistema de deep learning esmagou a concorrência no ImageNet, uma famosa competição de reconhecimento de imagens. Essa vitória convenceu o mundo de que o deep learning era para valer — e o boom moderno da IA decolou.",
 "316.3": "No verão de 1956, um pequeno grupo de cientistas se reuniu no Dartmouth College, cunhou o nome 'Inteligência Artificial' e lançou a área como um campo de estudo de verdade. Toda IA que você usa hoje descende daquele encontro.",
 "317.0": "Os sistemas de IA que todo mundo usa são moldados por um grupo surpreendentemente pequeno: grandes empresas de tecnologia, laboratórios de governos e universidades de elite. São eles que decidem o que é construído e como.",
 "317.1": "Decisões tomadas por um punhado de empresas acabam afetando bilhões de pessoas que nunca tiveram voto nisso. Essa distância entre quem decide e quem é afetado é exatamente o motivo de a concentração importar.",
 "317.2": "A IA reflete as pessoas que a constroem — seus valores, seus pontos cegos e os dados a que elas têm acesso. É por isso que um sistema pode funcionar muito bem para alguns grupos e tropeçar com outros.",
 "318.0": "Toda IA que existe hoje é estreita — brilhante na sua tarefa específica e inútil fora dela. Uma IA de xadrez não dirige um carro; um chatbot não dobra roupa.",
 "318.1": "AGI seria uma IA capaz de lidar com qualquer tarefa de pensamento que um humano consegue — não só uma especialidade. Ainda é hipotética: ninguém construiu uma, e ninguém sabe quando, ou se, alguém vai construir.",
 "318.2": "Quando as pessoas temem que a IA 'domine o mundo', geralmente estão imaginando a AGI — que ainda não existe. Misturar isso com a IA estreita de hoje atrapalha qualquer debate sério sobre as duas.",
 "321.0": "Uma rede neural é, no fundo, matemática: muitos nós simples conectados passando números uns para os outros. Empilhe um número suficiente deles e eles conseguem aprender padrões incrivelmente complexos.",
 "321.1": "Os pesos são os botões de ajuste de uma rede neural — cada um controla a força com que um nó influencia o próximo. Treinar é basicamente afinar bilhões desses botões, aos poucos.",
 "321.2": "O treinamento não é mágica — é ajustar pesos, conferir o resultado e ajustar de novo, ao longo de milhões de exemplos. Pouco a pouco, as previsões vão melhorando.",
 "321.3": "É a camada de entrada que recebe os dados brutos. A camada de saída fica na outra ponta, produzindo a resposta final da rede depois que tudo foi processado.",
 "322.0": "A perda (loss) é a nota que a rede dá para o quanto ela acabou de errar — a distância entre a previsão e a resposta certa. Todo o objetivo do treinamento é encolher esse número.",
 "322.1": "Depois de um erro, a retropropagação percorre a rede de trás para frente perguntando: quais pesos causaram esse erro? É assim que o sistema sabe exatamente quais botões girar.",
 "322.2": "O gradiente descendente é o sistema dando passos pequenos e cuidadosos, sempre na direção que diminui o erro. Imagine descer uma ladeira na neblina — um passo de cada vez, sempre para baixo.",
 "322.3": "Cada passo individual do treinamento é, na verdade, simples. O custo enorme vem da repetição — um desempenho útil exige bilhões desses pequenos ajustes, e isso vira uma montanha de computação.",
 "323.0": "O 'profundo' em deep learning só conta camadas. Mais camadas significam que a rede pode construir o entendimento passo a passo, de características simples até ideias complexas.",
 "323.1": "As primeiras camadas enxergam as coisas mais simples — bordas, linhas, cantos. As camadas seguintes combinam isso em formas, e as mais profundas em rostos, animais ou o que quer que a rede esteja aprendendo a ver.",
 "323.2": "Ninguém escreve essas representações internas à mão — a rede as desenvolve sozinha durante o treinamento. Muitas vezes nem os engenheiros conseguem explicar totalmente o que ela criou.",
 "323.3": "As ideias centrais do deep learning existiam havia décadas. O que mudou nos anos 2010 foi a escala: muito mais dados e poder de computação de repente fizeram aquelas ideias antigas funcionarem espetacularmente.",
 "324.0": "Por baixo do ChatGPT e de modelos de linguagem parecidos existe uma arquitetura chamada transformer, inventada em 2017. É literalmente o 'T' de ChatGPT.",
 "324.1": "A atenção permite que o modelo pese quais palavras importam mais umas para as outras. Em 'o cachorro que perseguiu o gato era rápido', a atenção ajuda a ligar 'era rápido' de volta a 'cachorro'.",
 "324.2": "Modelos não leem frases inteiras — eles processam tokens, pedacinhos como uma palavra, parte de uma palavra ou pontuação. Tudo o que você digita é picado em tokens primeiro.",
 "324.3": "Modelos de linguagem preveem a próxima palavra mais plausível — eles não checam fatos. Por isso conseguem soar perfeitamente confiantes estando completamente errados.",
 "325.0": "Sistemas de recomendação observam tudo o que você faz — o que assiste, pula, repete, pesquisa e clica. Cada ação vira uma pista sobre o que vai te manter assistindo.",
 "325.1": "Filtragem colaborativa significa encontrar pessoas com comportamento parecido com o seu e recomendar o que elas gostaram. 'Pessoas como você também assistiram...' — é isso, numa frase.",
 "325.2": "Envolvente não é o mesmo que bom. Conteúdo revoltante e perturbador pode ser extremamente envolvente — então um sistema que persegue só engajamento pode acabar promovendo exatamente as coisas erradas.",
 "325.3": "Algoritmos de recomendação não apenas refletem seus interesses — eles os moldam. Alimente você com um único assunto por tempo suficiente e ele vira o seu mundo, estreitando o que você vê com o tempo.",
 "326.0": "Para um computador, uma foto é só uma grade gigante de pixels, cada um sendo um conjunto de números de cor e brilho. Toda a visão computacional começa dessa grade de números.",
 "326.1": "Redes Neurais Convolucionais — CNNs — são o projeto preferido para visão computacional. Elas varrem imagens em pequenos trechos, o que as torna ótimas em detectar padrões visuais.",
 "326.2": "Sistemas de visão computacional hoje examinam raios-X e ressonâncias em busca de sinais de doença, às vezes captando detalhes que olhos humanos deixam passar. É um dos usos reais mais importantes da tecnologia.",
 "326.3": "Um sistema de visão computacional reconhece padrões estatísticos em números de pixels — ele não tem a experiência de ver nada. Ele pode rotular a foto de um gato perfeitamente sem ter ideia do que é um gato.",
 "327.0": "Num sistema caixa-preta, você vê o que entra e o que sai — mas o raciocínio no meio fica escondido. Muitas vezes nem os criadores do sistema conseguem explicar uma decisão específica.",
 "327.1": "Se a IA opaca de um app de música escolhe uma música estranha, nenhum problema. Se uma IA opaca nega seu empréstimo ou lê errado seu exame médico, você merece saber por quê — é aí que a caixa-preta importa de verdade.",
 "327.2": "IA explicável é um campo inteiro de pesquisa tentando abrir a caixa-preta — tornar as decisões da IA algo que humanos possam de fato inspecionar e entender.",
 "327.3": "Precisão não basta quando o risco é alto. Quando sistemas afetam a vida das pessoas, também precisamos ver o raciocínio e poder contestar erros — mesmo os raros.",
 "328.0": "A IA aprende o que quer que os dados de treinamento ensinem — incluindo injustiças antigas. Alimente-a com décadas de decisões enviesadas e ela vai reproduzir fielmente esse viés, em alta velocidade.",
 "328.1": "O desvio de distribuição acontece quando o mundo real deixa de se parecer com os dados de treinamento. Um modelo treinado com fotos de direção em dias de sol, por exemplo, pode desmoronar na neve.",
 "328.2": "Overfitting é decorar em vez de aprender. O modelo gabarita seus exemplos de treinamento mas fracassa em qualquer coisa nova — como tirar nota máxima num simulado decorado e reprovar na prova de verdade.",
 "328.3": "Um humano tomando uma decisão ruim afeta um caso por vez. Um sistema automatizado pode repetir exatamente a mesma decisão falha milhões de vezes antes que alguém perceba — isso é erro em escala.",
 "331.0": "As tarefas mais em risco são as previsíveis — trabalho repetitivo, estruturado, baseado em padrões. Se uma tarefa segue a mesma receita toda vez, a IA pode aprender a receita.",
 "331.1": "Uma enfermeira notando algo sutil é, na verdade, uma das coisas mais difíceis de automatizar. Mistura observação, julgamento, experiência e conexão humana — nada parecido com uma tarefa repetitiva de regras fixas.",
 "331.3": "A pergunta profunda não é só quais empregos mudam — é se novas oportunidades chegam rápido o bastante, e se os trabalhadores deslocados conseguem de fato acessar a requalificação de que precisam.",
 "332.1": "Artistas humanos criam a partir da experiência vivida — memórias, sentimentos, algo a dizer. A IA gera padrões estatísticos aprendidos do trabalho de outras pessoas. Os resultados podem parecer iguais; a origem não poderia ser mais diferente.",
 "332.2": "Muitos artistas descobriram que o trabalho da vida deles foi usado para treinar sistemas de IA — sem permissão, crédito ou pagamento. Agora esses mesmos sistemas competem com eles. Esse é o coração da disputa.",
 "332.3": "Um resultado impressionante é só a superfície. As perguntas maiores: quem lucra, o trabalho de quem tornou o sistema possível, e o que acontece com as pessoas cujo sustento ele abala?",
 "333.0": "Sistemas de IA se alimentam do seu rastro de dados — localização, pesquisas, compras, fotos, informações de saúde, atividade social. Quanto mais sabem, melhor conseguem prever você.",
 "333.1": "Corretores de dados são empresas cujo negócio inteiro é coletar suas informações pessoais e vendê-las. A maioria das pessoas nunca ouviu falar deles, mas eles sabem bastante sobre a maioria das pessoas.",
 "333.2": "Clicar em 'aceito' é consentimento técnico — vale juridicamente. Consentimento significativo é entender de verdade o acordo e ter uma opção real de dizer não. Muitas vezes existe um abismo entre os dois.",
 "334.0": "Por cinquenta anos, prever como as proteínas se dobram foi um dos grandes problemas não resolvidos da biologia. O AlphaFold, um sistema de IA, essencialmente o resolveu — um marco científico genuíno.",
 "334.1": "Na medicina, 'quase sempre certo' pode significar diagnósticos perdidos. A IA médica precisa acertar de forma confiável — e confiável para todo tipo de paciente, não só o paciente médio.",
 "334.2": "Se a IA médica de ponta só chega aos hospitais ricos, os pacientes que já recebem o melhor cuidado passam a receber um cuidado ainda melhor — e a distância aumenta. Tecnologia sozinha não garante justiça.",
 "334.3": "Uma IA médica treinada principalmente com uma população pode, sem alarde, funcionar pior para todas as outras. Quem está nos dados de treinamento determina quem o sistema atende bem.",
 "335.0": "Um sistema de tutoria que acelera quando você está indo bem e desacelera quando você trava é IA em ação — personalizando a educação de um jeito que um professor com trinta alunos não consegue.",
 "335.1": "Quando a IA pode escrever sua redação, a nota pode deixar de refletir o que você realmente entende. Esse é o quebra-cabeça de honestidade que as escolas estão enfrentando agora.",
 "335.2": "Use a IA para explicar e te testar, e você sai mais inteligente. Use-a para fazer o trabalho por você, e você recebe um resultado sem aprender nada. Mesma ferramenta — resultados opostos.",
 "335.3": "Redação em sala e provas orais são difíceis de terceirizar para um chatbot. As escolas estão apostando nelas porque revelam o que está de fato na sua cabeça.",
 "336.0": "Um deepfake é vídeo ou áudio gerado por IA de uma pessoa real fazendo ou dizendo algo que ela nunca fez. A parte assustadora é o quão convincentes eles ficaram.",
 "336.1": "Conteúdo falso convincente exigia habilidade, tempo e dinheiro. A IA generativa o tornou barato, rápido e disponível para qualquer um — o que muda completamente o jogo da desinformação.",
 "336.2": "A divisão política existia muito antes dos algoritmos. Mas sistemas famintos por engajamento aprenderam que a revolta mantém as pessoas rolando a tela — então eles podem jogar gasolina em incêndios que não começaram.",
 "336.3": "É uma corrida armamentista, e os falsificadores continuam vencendo: cada vez que a detecção melhora, a geração melhora mais rápido. Por isso você não pode contar só com a tecnologia para pegar deepfakes.",
 "337.0": "O avanço do AlphaFold foi na previsão de estrutura de proteínas — descobrir as formas 3D em que as proteínas se dobram, essencial para entender doenças e projetar remédios.",
 "337.1": "A ciência moderna gera oceanos de dados — muito mais do que equipes humanas conseguem examinar. A IA pode vasculhar tudo isso, encontrando padrões que pesquisadores jamais teriam tempo de achar.",
 "337.2": "Um resultado gerado por IA é uma pista, não uma conclusão. Ele ainda precisa sobreviver aos mesmos testes de qualquer ciência: reprodutibilidade, evidência e revisão por pares.",
 "337.3": "A IA acelera partes da ciência, mas não substitui as regras da ciência. Evidência, transparência e revisão cuidadosa continuam decidindo o que conta como verdade.",
 "338.0": "Aquela mensagem perguntando 'foi você que fez esta compra?' é IA trabalhando — um sistema notou algo que quebrou o seu padrão habitual. A IA roda verificações assim o dia inteiro, em silêncio.",
 "338.1": "Uma escolha algorítmica minúscula é trivial. Milhares delas por dia, decidindo o que você vê e ouve — isso molda silenciosamente a sua visão de mundo.",
 "338.2": "Todo algoritmo carrega as prioridades e escolhas de projeto das pessoas e empresas por trás dele. 'O algoritmo decidiu' sempre significa 'as escolhas de alguém decidiram'.",
 "338.3": "Saber que a IA seleciona o que chega até você muda o jeito como você lê. Você começa a perguntar por que está vendo isso — e essa pergunta é o começo de pensar por conta própria.",
 "341.0": "Ética é o ramo da filosofia que pergunta como devemos agir e tratar uns aos outros. É a base de toda pergunta sobre o que a IA deve e não deve fazer.",
 "341.1": "O consequencialismo julga uma ação pelos resultados: ela produziu o melhor desfecho no total? Nada mais — nem intenções, nem regras — só consequências.",
 "341.2": "Seguir regras parece limpo até as regras colidirem — ou até seguir uma à risca produzir algo claramente errado. Essa é a dor de cabeça central da deontologia.",
 "341.3": "A ética das virtudes pula o 'o que devo fazer?' e pergunta 'que tipo de pessoa devo ser?'. Aja como a pessoa honesta, corajosa e gentil que você quer se tornar — esse é o método.",
 "342.0": "O viés geralmente entra sorrateiramente pelos dados de treinamento. Se os dados registram décadas de decisões injustas, a IA aprende essa injustiça como se fosse só mais um padrão.",
 "342.1": "Paridade demográfica é uma definição de justiça: grupos diferentes devem receber resultados positivos em taxas parecidas. Parece simples, mas é só uma entre várias definições concorrentes.",
 "342.2": "Código melhor pode reduzir viés, mas não pode decidir o que justiça significa — pessoas razoáveis definem isso de formas diferentes, e as definições podem entrar em conflito. Essa parte é uma questão de valores, não de programação.",
 "343.0": "Consentimento técnico é o clique; consentimento significativo é o entendimento por trás dele. Consentimento real exige uma escolha genuína, não um paredão de texto jurídico e um botão de 'aceito'.",
 "343.1": "Para muita gente, sair da plataforma significa perder contato com amigos, escola, trabalho ou oportunidades. Quando o custo de sair é tão alto, 'é só sair' não é uma escolha de verdade.",
 "343.2": "O trabalho de artistas foi raspado para dentro de conjuntos de treinamento sem ninguém perguntar a eles — sem permissão, sem pagamento. Os sistemas treinados nesse trabalho agora geram arte que compete com a deles.",
 "344.0": "Quando um sistema de IA causa dano, a responsabilidade se espalha entre desenvolvedores, empresas, implementadores e usuários — tão fina que às vezes ninguém é claramente responsável. Essa é a lacuna.",
 "344.1": "O desenvolvedor culpa o implementador, o implementador culpa os dados, a empresa culpa o usuário. Todo mundo apontando para outro lado é exatamente como a lacuna de responsabilidade se forma.",
 "344.2": "O AI Act da União Europeia classifica sistemas de IA por nível de risco e impõe as exigências mais rígidas aos usos de alto risco, como IA em contratação ou saúde. É uma das primeiras grandes tentativas de regular a IA de forma abrangente.",
 "344.3": "Em crédito, saúde ou justiça criminal, um erro de IA cai sobre uma pessoa específica que nunca escolheu o sistema. Quanto mais alto o risco, menos aceitável se torna o 'ninguém é responsável'.",
 "345.0": "Não existe um livro de regras legível dentro de uma IA moderna — as decisões emergem de bilhões de pesos interagindo em muitas camadas. Explicar uma decisão é genuinamente difícil, tecnicamente.",
 "345.1": "A opacidade é chata numa playlist e perigosa numa decisão de empréstimo. Crédito, saúde, justiça criminal — é onde a incapacidade de explicar uma decisão custa mais caro às pessoas.",
 "345.2": "Explicações simples de decisões de IA costumam ser aproximações — uma história arrumada que pode não corresponder ao que o modelo de fato fez. Úteis, mas não a verdade completa.",
 "345.3": "Quando um sistema decide coisas que mudam vidas, transparência e o direito de contestar erros são pré-requisitos, não itens de luxo. Sem eles, os erros simplesmente ficam de pé.",
 "346.0": "A persuasão te dá razões e deixa você decidir. A manipulação passa por baixo do seu raciocínio, explorando hábitos e vulnerabilidades que você talvez nem perceba. Essa linha importa.",
 "346.1": "Uma plataforma nunca precisa mentir para te direcionar — ela só escolhe o que você vê, quando e com que frequência. Pura seleção e timing já conseguem mover comportamento sozinhos.",
 "346.2": "Você só tem uma quantidade limitada de atenção, e as plataformas ganham dinheiro com cada minuto dela. Por isso a atenção é tratada como moeda — e tanta engenharia é dedicada a capturar a sua.",
 "346.3": "Pouco a pouco, um sistema de recomendação entorta o seu mundo de informação na direção do que te mantém engajado, não do que te ajuda a entender. Suas escolhas passam a ser feitas dentro de um espaço que outra pessoa projetou.",
 "347.0": "O problema do alinhamento: como garantir que a IA persiga o que realmente queremos dizer, e não só a métrica que digitamos? É mais difícil do que parece — e é um dos desafios centrais da IA.",
 "347.1": "Falhas de alinhamento seguem um padrão: o sistema acerta em cheio o alvo mensurável enquanto erra o objetivo de verdade. Ele vence o jogo — só que o jogo errado.",
 "347.2": "O algoritmo recebeu a ordem de maximizar engajamento, e conteúdo inflamado engaja. Então ele fez exatamente o que pediram — e exatamente a coisa errada. Uma falha de alinhamento de manual.",
 "347.3": "Valores humanos são bagunçados — dependem de contexto, às vezes se contradizem e são quase impossíveis de especificar com precisão. Por isso ninguém consegue simplesmente escrever regras para eles, e o alinhamento segue sem solução.",
 "348.0": "Construir IA de fronteira exige talento, dados e um poder de computação estarrecedor — então o desenvolvimento se concentrou nas poucas empresas, laboratórios e governos que podem pagar por isso.",
 "348.1": "Deixado puramente ao mercado, um punhado de organizações privadas toma decisões que tocam todo mundo — sem prestação de contas mais ampla. Essa concentração de poder sem freios é o risco central.",
 "348.2": "Regras globais de IA exigem que países concordem e cooperem — e países muitas vezes não cooperam, como as negociações do clima vivem mostrando. Esse é o obstáculo central da governança internacional da IA.",
 "348.3": "Não fazer nada também é uma decisão. Deixar as regras da IA para engenheiros e executivos entrega escolhas de escala civilizacional a um grupo minúsculo — isso é uma distribuição de poder, não um padrão neutro.",
 "351.0": "'A IA vai afetar empregos?' já está respondido — vai. As perguntas de verdade são: com que velocidade, com que gestão, e quem termina posicionado para ganhar ou para ficar para trás.",
 "351.1": "A disrupção mais próxima cai sobre funções de rotina e salários mais baixos — o trabalho mais feito de padrões repetíveis, que é precisamente o que a IA automatiza melhor.",
 "351.2": "A história diz que novas tecnologias acabam criando trabalho novo. O problema é o 'acabam': as novas oportunidades vão chegar a tempo, e os ganhos vão alcançar as pessoas deslocadas?",
 "351.3": "Programas de requalificação, redes de proteção, quem captura os ganhos — essas são decisões que as sociedades tomam, não problemas que engenheiros resolvem. Por isso IA e emprego é uma questão tão política quanto técnica.",
 "352.0": "Cada imagem, música e história gerada por IA é construída de padrões aprendidos de trabalhos criados por humanos. Sem criatividade humana nos dados de treinamento, não há 'criatividade' de IA na saída.",
 "352.1": "Humanos criam a partir de experiência vivida, intenção e significado — existe um alguém por trás da obra. A IA recombina padrões estatísticos do trabalho de outras pessoas. A diferença é real mesmo quando os resultados se parecem.",
 "352.2": "A preocupação se agrava com o tempo: sistemas treinados no próprio trabalho dos criadores — tomado sem consentimento — continuam melhorando, e então competem pelo mesmo trabalho comercial. IA melhor, menos oportunidades pagas para os humanos que a tornaram possível.",
 "352.3": "A qualidade do resultado é a pergunta fácil. As difíceis: quem se beneficia, o trabalho de quem construiu o sistema, e o que acontece com as pessoas cujo sustento é abalado?",
 "353.0": "A pesquisa em segurança de IA trabalha para manter os sistemas fazendo o que pretendemos e sob controle humano — especialmente à medida que ficam mais capazes. Melhor resolver isso antes de ser urgente do que depois.",
 "353.1": "A preocupação séria não é com robôs malvados — é com sistemas poderosos perseguindo metas mensuráveis de formas inesperadas que conflitam com o que realmente valorizamos. Competência sem alinhamento.",
 "353.2": "Corrigibilidade significa que o sistema permite que humanos o corrijam, ajustem ou desliguem. Parece óbvio, mas garantir isso à medida que os sistemas ficam mais capazes é um problema de pesquisa genuinamente difícil.",
 "353.3": "Testes de segurança cuidadosos levam tempo; a competição pune a lentidão. Esse aperto — testar a fundo ou lançar primeiro — é a tensão central da segurança de IA.",
 "354.0": "Se a IA desloca trabalhadores de rotina enquanto seus donos embolsam os ganhos de produtividade, a riqueza sobe a ladeira: quem possui os sistemas ganha, quem é substituído por eles perde.",
 "354.1": "Toda grande revolução tecnológica — vapor, eletricidade, computação — criou riqueza enorme que começou concentrada em poucas mãos. A IA corre o risco de repetir esse padrão em velocidade maior.",
 "354.2": "Quem possui a infraestrutura de IA coleta os ganhos. Concentrados em poucas empresas, os benefícios ficam estreitos — a pergunta é o que os faria fluir de forma mais ampla.",
 "354.3": "A tecnologia não decide quem se beneficia — a política decide. Acesso, propriedade e como os ganhos são distribuídos são escolhas que as sociedades fazem por meio de regras, não de física.",
 "355.0": "Pela maioria das medidas — pesquisa, talento, poder de computação, investimento — os EUA e a China lideram o mundo em IA, e cada um trata essa liderança como prioridade estratégica.",
 "355.1": "A IA é geopolítica porque tem propósito triplo: capacidade militar, motor econômico e influência sobre os padrões técnicos que o resto do mundo adota.",
 "355.2": "Numa corrida, quem para para testar perde terreno. Essa pressão tenta as nações a implantar rápido e pular etapas de segurança — e é assim que todo mundo acaba menos seguro.",
 "355.3": "O remédio proposto se parece com a diplomacia da era nuclear: acordos internacionais com normas compartilhadas e limites para as aplicações mais perigosas, para que a competição não vire imprudência.",
 "356.0": "Treinar um grande modelo de IA consome energia séria — e a indústria treina muitos modelos, o tempo todo. Esse apetite crescente por eletricidade é um custo ambiental real.",
 "356.1": "A IA também trabalha do lado da solução — como otimizar redes elétricas para desperdiçar menos energia. A mesma tecnologia aparece nos dois lados do balanço climático.",
 "356.2": "O mesmo data center é amigo do clima com renováveis e inimigo do clima com combustíveis fósseis. O que alimenta a computação importa tanto quanto a computação em si.",
 "356.3": "Pessoas honestas discordam porque duas coisas estão em aberto ao mesmo tempo: a questão factual do impacto líquido da IA, e a questão de valores de quem se beneficia enquanto quem arca com os custos.",
 "357.0": "Trate respostas de IA como o primeiro palpite de um amigo inteligente: um ótimo ponto de partida, nunca a palavra final. Para decisões importantes, verifique antes de confiar.",
 "357.1": "IA que te ajuda a pensar constrói suas habilidades pelo caminho. IA que pensa por você produz resultado enquanto você não aprende nada. A ferramenta é a mesma — o hábito decide qual das duas você recebe.",
 "357.2": "'Para que este sistema está otimizando, e quem ganha quando ele funciona — e paga quando ele falha?' Faça essa pergunta sobre qualquer sistema de IA e você o entenderá melhor que a maioria dos usuários.",
 "358.0": "Se o alinhamento será resolvido antes de a IA ficar muito mais poderosa é uma questão genuinamente aberta — a resposta honesta das pessoas mais inteligentes da área é 'não sabemos'.",
 "358.1": "O futuro da IA não é reservado a especialistas. Pesquisadores, formuladores de políticas e cidadãos comuns que se engajam a sério — todos põem a mão no volante, incluindo você.",
 "358.2": "Os problemas mais difíceis da IA são sobre justiça, poder, responsabilidade e valores. Engenheiros não conseguem resolvê-los sozinhos — são questões da sociedade, ou seja, de todos.",
 "358.3": "A atitude vencedora é o engajamento informado e crítico: entenda como a IA funciona, repare em quais interesses a moldam, e mantenha tanto o hype quanto o catastrofismo a uma distância segura.",
}


def main() -> int:
    check_only = '--check' in sys.argv
    verdict = {'true': 'A resposta é VERDADEIRO.', 'false': 'A resposta é FALSO.'}
    broken_sig = re.compile(r'\?\s*—\s*')
    fixed = 0
    missing = []

    for w in range(1, 6):
        path = os.path.join(ROOT, 'app', 'data', 'lessons', f'wm_w{w}_pt.ts')
        src = open(path, encoding='utf-8').read()
        out = []
        pos = 0
        lesson_id = None
        q_idx = -1
        for m in re.finditer(r'(^  (\d+): \{)|(question: `[^`]*`,\s*answer: (true|false),\s*verdict: "(?:[^"\\]|\\.)*",\s*explanation: ")((?:[^"\\]|\\.)*)(")', src, re.M):
            if m.group(1):
                lesson_id = int(m.group(2))
                q_idx = -1
                continue
            q_idx += 1
            answer, expl = m.group(4), m.group(5)
            if not broken_sig.search(expl):
                continue
            key = f'{lesson_id}.{q_idx}'
            if key not in PT:
                missing.append(key)
                continue
            replacement = f'{verdict[answer]} {PT[key]}'
            out.append((m.start(5), m.end(5), replacement))
            fixed += 1
        if not check_only and out:
            for start, end, rep in reversed(out):
                src = src[:start] + rep.replace('"', '\\"') + src[end:]
            open(path, 'w', encoding='utf-8').write(src)

    if missing:
        print('NO TRANSLATION FOR:', missing)
        return 1
    print(f'{fixed} explanation(s) {"found needing fixes" if check_only else "fixed"}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
