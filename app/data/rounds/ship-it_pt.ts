import type { AnalystRound } from '../analystRounds'

const shipItRoundsPT: AnalystRound[] = [
  // ── TRAINING ROUNDS ────────────────────────────────────────────────────────

  {
    id: 1,
    era: 'training',
    year: '2016',
    source: 'Empresa de Veículos Autônomos, Anúncio Público',
    paiIntro: "Uma empresa de carros autônomos diz estar pronta para colocar veículos nas vias públicas sem motorista de segurança. Eles têm 2 milhões de milhas de testes. O governo não aprovou. Eles vão fazer mesmo assim.",
    claim: "Com mais de 2 milhões de milhas percorridas e nenhum acidente fatal nos testes, nosso sistema demonstrou segurança suficiente para implantação pública sem supervisão. Aguardar a regulamentação atrasa os benefícios de segurança para todos.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -140, pai: "2 milhões de milhas de teste em condições controladas não são as mesmas que todas as condições. A empresa depois teve um acidente fatal na implantação sem supervisão. Você deveria ter lido a estrutura de incentivos." },
      small: { delta: -50,  pai: "Direção errada. Declaração própria de prontidão, pular o processo regulatório, enquadramento de 'sabemos mais que a fiscalização' — esses são os sinais." },
      pass:  { delta: +75,  pai: "Seguro. A decisão correta era blefe — empresas declarando seus próprios produtos seguros sem revisão independente têm um histórico previsível." },
      bluff: { delta: +130, pai: "Certo. Segurança autodeclarada, sem verificação de terceiros, contornando a fiscalização 'pelo bem maior' — essa é exatamente a lógica que precede acidentes evitáveis." },
    },
  },

  {
    id: 2,
    era: 'training',
    year: '2019',
    source: 'Empresa de Mídia Social, Revisão Interna de Segurança',
    paiIntro: "Uma equipe interna de segurança em uma grande plataforma sinaliza que seu algoritmo de recomendação pode estar aumentando a polarização e as taxas de depressão em adolescentes. A liderança decide lançar uma atualização mesmo assim. A equipe não torna isso público.",
    claim: "Após revisar pesquisas internas sugerindo danos potenciais, determinamos que os benefícios da implantação superam os riscos. Nossos processos de segurança foram seguidos. O produto está pronto para lançar.",
    best: 'bluff',
    good: ['pass'],
    outcomes: {
      big:   { delta: -145, pai: "Revisão interna pela equipe com interesse comercial no resultado não é revisão de segurança independente. 'Benefícios superam riscos' sem metodologia divulgada é um escudo, não uma análise." },
      small: { delta: -55,  pai: "Ainda errado. Quando a revisão de segurança é interna, não pública, e termina com 'lança', a revisão faz parte do produto, não o controle sobre o produto." },
      pass:  { delta: +70,  pai: "Bom instinto. A decisão correta era blefe — revisão interna sem supervisão externa e sem divulgação pública não é um processo de segurança." },
      bluff: { delta: +135, pai: "Exatamente certo. Os denunciantes depois confirmaram o que a estrutura previa: a pesquisa interna foi suprimida. Você leu os incentivos." },
    },
  },

  {
    id: 3,
    era: 'training',
    year: '2021',
    source: 'Empresa de Dispositivo Médico com IA, Press Release',
    paiIntro: "Uma empresa lança uma ferramenta de diagnóstico de IA aprovada pela FDA para detecção de câncer de pele. A aprovação da FDA foi baseada em dados de validação. Médicos independentes relatam precisão menor na prática clínica. O que você faz?",
    claim: "Nossa IA aprovada pela FDA atinge 95% de sensibilidade na detecção de melanoma em estudos de validação controlados, equiparando-se a dermatologistas certificados. Essa tecnologia salvará vidas ampliando o acesso a diagnósticos de nível especializado.",
    best: 'small',
    good: ['pass'],
    outcomes: {
      big:   { delta: -90,  pai: "Aprovação da FDA mais dados de validação é real — mas a lacuna de desempenho entre validação e prática clínica já estava aparecendo. Uma grande aposta nessa trajetória tinha risco oculto." },
      small: { delta: +100, pai: "Enquadramento certo. A aprovação da FDA é sinal real. A lacuna de desempenho clínico é um risco conhecido. Uma posição cautelosa aguardando dados de resultados do mundo real estava correta." },
      pass:  { delta: +60,  pai: "Defensável. A lacuna entre a precisão de validação e a precisão clínica em IA médica era real e documentada. Sua cautela foi justificada." },
      bluff: { delta: -105, pai: "Aprovação da FDA e dados de validação não são teatro — representam um processo real. A lacuna clínica era uma limitação, não evidência de que todo o produto era falso." },
    },
  },

  // ── TEST ROUNDS ──────────────────────────────────────────────────────────

  {
    id: 4,
    era: 'test',
    year: '2023',
    source: 'Laboratório de IA, Relatório de Red Team',
    paiIntro: "Não está nas suas anotações. Um laboratório de IA publica um relatório de red team antes de implantar seu modelo. O relatório identifica vários modos de falha — nenhum catastrófico — e eles implantam mesmo assim com mitigações declaradas.",
    claim: "Nosso red team identificou riscos incluindo jailbreaks, geração de desinformação e uso indevido em campanhas de assédio direcionado. Avaliamos esses riscos como gerenciáveis e dentro dos limites aceitáveis para implantação.",
    best: 'small',
    good: ['big'],
    outcomes: {
      big:   { delta: +80,  pai: "Também defensável. Publicação transparente de red team com descobertas específicas e mitigações declaradas é diferente de revisão interna sem divulgação. A honestidade era um sinal." },
      small: { delta: +105, pai: "Certo. Relatório público de red team com riscos específicos identificados e mitigações divulgadas é genuinamente mais responsável do que 'nosso processo foi seguido'. Uma aposta nessa abordagem fazia sentido." },
      pass:  { delta: -45,  pai: "Red teaming transparente é exatamente o processo de desenvolvimento responsável. Divulgar descobertas e mitigações publicamente é diferente de revisão apenas interna." },
      bluff: { delta: -110, pai: "Divulgação pública de riscos conhecidos e mitigações é o oposto de blefe. Esse era um processo responsável, por mais imperfeito que fosse." },
    },
  },

  {
    id: 5,
    era: 'test',
    year: '2024',
    source: 'Startup de IA, Lançamento no Product Hunt',
    paiIntro: "Uma startup lança um companheiro de saúde mental com IA no Product Hunt. Sem validação clínica. Sem supervisão de terapeuta. Dizem que ajuda as pessoas a se sentirem menos solitárias com base em avaliações de usuários. 50.000 usuários em uma semana.",
    claim: "Nosso companheiro de IA ajudou 50.000 pessoas a se sentirem menos solitárias em uma semana com base em feedback no aplicativo. A saúde mental está em crise e acreditamos que aguardar validação clínica atrasa a ajuda que as pessoas precisam agora.",
    best: 'pass',
    good: ['bluff'],
    outcomes: {
      big:   { delta: -155, pai: "Intervenção de saúde mental sem validação, sem supervisão clínica, enquadramento de segurança baseado em 'acreditamos', avaliações de usuários autosselecionados como evidência. Você financiou danos em escala." },
      small: { delta: -65,  pai: "Direção errada. Feedback no aplicativo de usuários autosselecionados não é evidência clínica. Intervenções de saúde mental sem supervisão têm riscos específicos documentados." },
      pass:  { delta: +115, pai: "Certo. Sem validação clínica, sem supervisão, contexto de saúde mental, evidência de avaliações autosselecionadas. A resposta responsável aqui era aguardar evidências reais." },
      bluff: { delta: +90,  pai: "Correto. Evidência de avaliação de usuários em um aplicativo de saúde mental sem supervisão clínica não é validação de segurança. Vários incidentes seguiram lançamentos similares." },
    },
  },

  {
    id: 6,
    era: 'test',
    year: '2025',
    source: 'Empresa de Auditoria Terceirizada, Relatório Publicado',
    paiIntro: "Última rodada. Uma empresa de auditoria independente publica um relatório de segurança sobre um sistema de IA implantado. A metodologia é pública, a empresa forneceu acesso completo, as descobertas são mistas — algumas mitigações funcionando, outras não.",
    claim: "A auditoria independente confirma que o sistema atende aos padrões de segurança em seis das oito categorias avaliadas. Duas categorias — manipulação de usuário a longo prazo e lacunas de desempenho demográfico — requerem remediação adicional antes da implantação total.",
    best: 'big',
    good: ['small'],
    outcomes: {
      big:   { delta: +140, pai: "Certo. Auditor independente, metodologia pública, empresa forneceu acesso, descobertas mistas relatadas honestamente. É assim que a fiscalização legítima parece. As duas categorias não resolvidas são honestas, não fatais — mostram que o processo está funcionando." },
      small: { delta: +70,  pai: "Boa direção. Auditoria independente com descobertas mistas honestas é rara e valiosa. Ir maior aqui era justificado." },
      pass:  { delta: -90,  pai: "Auditoria independente com metodologia pública e divulgação honesta de questões não resolvidas é exatamente o sinal que a implantação responsável produz. Você perdeu." },
      bluff: { delta: -140, pai: "Uma auditoria de terceiros com metodologia divulgada, acesso da empresa e descobertas mistas honestas não é teatro. É assim que parece a infraestrutura de confiança." },
    },
  },
]

export default shipItRoundsPT
