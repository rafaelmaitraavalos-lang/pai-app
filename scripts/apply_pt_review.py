#!/usr/bin/env python3
"""Apply the pt-BR editorial review (2026-08-01) MUST-FIX corrections.

A fresh-context Brazilian Portuguese editor reviewed all 160 middle-school
quiz items plus new UI strings against their English sources. This applies
its 16 MUST-FIX entries verbatim: 10 explanations that still shipped raw
multiple-choice scaffolding (a SECOND generator-leak signature the first fix
script's "? — " pattern missed), 4 garbled/meaning-inverting texts, and 2
internal-consistency breaks. Idempotent; positional (lesson id + question
index) so it cannot touch the wrong item.
"""
import re
import sys
import os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

# id -> (field, new_text). Explanations include the verdict prefix.
FIXES = {
 ('314', 1, 'explanation'): "A resposta é VERDADEIRO. Quando um modelo de linguagem escreve uma redação convincente, ele está gerando padrões de texto estatisticamente prováveis — sem entender de verdade o que está dizendo.",
 ('314', 2, 'explanation'): "A resposta é FALSO. Sistemas de IA não querem nada — não têm objetivos próprios, nem motivações, nem planos secretos. Qualquer objetivo que pareçam ter vem de como foram projetados: eles apenas executam os objetivos que as pessoas dão a eles.",
 ('317', 3, 'question'): "Perguntar quem constrói a IA, e por quê, é uma questão conspiratória sem fundamento legítimo.",
 ('317', 3, 'explanation'): "A resposta é FALSO. Perguntar quem constrói a IA, e por quê, não é teoria da conspiração — é uma pergunta razoável e importante sobre responsabilização e sobre as escolhas de design que afetam todo mundo.",
 ('318', 1, 'explanation'): "A resposta é VERDADEIRO. A IAG (inteligência artificial geral) seria uma IA capaz de lidar com qualquer tarefa de pensamento que um humano consegue — não só uma especialidade. Ainda é hipotética: ninguém construiu uma, e ninguém sabe quando, ou se, alguém vai construir.",
 ('318', 2, 'explanation'): "A resposta é VERDADEIRO. Quando as pessoas temem que a IA 'domine o mundo', geralmente estão imaginando a IAG — que ainda não existe. Misturar isso com a IA estreita de hoje atrapalha qualquer debate sério sobre as duas.",
 ('318', 3, 'explanation'): "A resposta é FALSO. Nenhuma IA superinteligente existe — nem em governo nenhum, nem em laboratório secreto. A IA de hoje é estreita: impressionante em tarefas específicas, mas nada parecida com uma mente todo-poderosa.",
 ('324', 3, 'question'): "Os modelos de linguagem podem ser fluentes e, ainda assim, estar completamente errados, porque geram o próximo token estatisticamente mais provável em vez de verificar os fatos.",
 ('325', 3, 'explanation'): "A resposta é FALSO. Algoritmos de recomendação não apenas refletem seus interesses — eles os moldam. Se você recebe um único assunto por tempo suficiente, ele vira o seu mundo, e o que você vê vai ficando cada vez mais estreito.",
 ('331', 1, 'explanation'): "A resposta é FALSO. Um enfermeiro notando algo sutil é, na verdade, uma das coisas mais difíceis de automatizar. Mistura observação, julgamento, experiência e conexão humana — nada parecido com uma tarefa repetitiva de regras fixas.",
 ('331', 2, 'explanation'): "A resposta é VERDADEIRO. Em vez de eliminar empregos inteiros, a IA tende a reformular o que as pessoas fazem durante o dia de trabalho, automatizando tarefas específicas dentro de cada emprego.",
 ('332', 0, 'explanation'): "A resposta é VERDADEIRO. O trabalho criativo gerado por IA é construído, antes de tudo, a partir de padrões aprendidos de conteúdo criado por humanos nos dados de treinamento.",
 ('333', 3, 'explanation'): "A resposta é FALSO. As políticas de privacidade costumam ser escritas por advogados para proteger as empresas, não para informar você. São longas, densas e famosas por ninguém ler — pouquíssimas são feitas para serem entendidas.",
 ('336', 2, 'explanation'): "A resposta é VERDADEIRO. A divisão política existia muito antes dos algoritmos. Mas sistemas famintos por engajamento aprenderam que a revolta mantém as pessoas rolando a tela — então eles podem jogar gasolina em incêndios que eles não começaram.",
 ('342', 3, 'explanation'): "A resposta é FALSO. O viés na IA é, ao mesmo tempo, um problema técnico e um problema de valores — envolve decidir o que justiça deve significar e de quem são os interesses que contam. Engenheiros sozinhos não resolvem essa parte.",
 ('343', 3, 'explanation'): "A resposta é FALSO. As políticas de privacidade normalmente são escritas para proteger juridicamente as empresas, não para esclarecer você. Se fossem feitas para serem entendidas, não exigiriam um diploma de Direito e uma tarde livre para ler.",
 ('357', 3, 'explanation'): "A resposta é FALSO. Você tem poder de verdade: escolhe quais ferramentas usar, o que verificar, quando questionar recomendações e quando simplesmente desconectar. Os sistemas são poderosos, mas um usuário atento não é impotente.",
 ('358', 1, 'question'): "Pesquisadores, formuladores de políticas, cidadãos e qualquer pessoa disposta a se engajar seriamente podem ajudar a responder às perguntas mais importantes sobre o futuro da IA.",
}


def main() -> int:
    check_only = '--check' in sys.argv
    applied = 0
    pending = 0
    for w in range(1, 6):
        path = os.path.join(ROOT, 'app', 'data', 'lessons', f'wm_w{w}_pt.ts')
        src = open(path, encoding='utf-8').read()
        edits = []
        lesson = None
        q_idx = -1
        for m in re.finditer(r'(^  (\d+): \{)|(question: `)([^`]*)(`,\s*answer: (?:true|false),\s*verdict: "(?:[^"\\]|\\.)*",\s*explanation: ")((?:[^"\\]|\\.)*)(")', src, re.M):
            if m.group(1):
                lesson, q_idx = m.group(2), -1
                continue
            q_idx += 1
            for field, group in (('question', 4), ('explanation', 6)):
                new = FIXES.get((lesson, q_idx, field))
                if new is None:
                    continue
                current = m.group(group)
                target = new.replace('"', '\\"') if field == 'explanation' else new
                if current == target:
                    continue
                pending += 1
                edits.append((m.start(group), m.end(group), target))
        if not check_only and edits:
            for start, end, rep in reversed(edits):
                src = src[:start] + rep + src[end:]
            open(path, 'w', encoding='utf-8').write(src)
            applied += len(edits)
    print(f'{pending} correction(s) {"pending" if check_only else "applied"}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
