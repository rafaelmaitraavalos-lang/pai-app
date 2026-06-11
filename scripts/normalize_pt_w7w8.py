#!/usr/bin/env python3
"""
Normalize PT-BR Worlds 7 and 8 content into per-module SLIDES/QUESTIONÁRIOS format
so gen_pt_translations.py can parse them.

Usage: python3 scripts/normalize_pt_w7w8.py > scripts/pt_w7w8_normalized.txt
       Then re-run gen_pt_translations.py (it will read this file for W7/W8)
"""
import docx, re, sys, os

DOCX = '/Users/rafa/Downloads/PT-BR_PAI for Kids.docx'

IS_WORLD  = re.compile(r'^MUNDO\s+(\d+)', re.I)
IS_MODULE = re.compile(r'^Módulo\s+(\d+)\s*[–—\-]+\s*(.*)', re.I)
IS_SLIDE  = re.compile(r'^Slide\s+\d+\s+[–—\-]+\s+(.+?)\s+[–—\-]+\s+(.+)', re.I)
IS_QHEAD  = re.compile(r'^P(\d+)\s+[–—\-]+\s+(Fácil|Médio|Difícil)\s*$', re.I)
IS_ANS    = re.compile(r'^(Verdadeiro|Falso)\s*[·•]\s*(.+)', re.I)
IS_QUIZ_M = re.compile(r'Agora.*questionário', re.I)
SMART_Q   = re.compile(r'^[""''"\']+|[""''"\']+$')

def clean(s):
    return (s.replace('"','"').replace('"','"')
             .replace('’',"'").replace('‘',"'"))

def strip_q(s):
    return SMART_Q.sub('', s).strip()

SEP = '────────────────────────────────────────────────────────────'

def parse_and_normalize(paras):
    """Collect slides and quizzes per world/module, output in standard format."""
    worlds = {}
    cur_w = None
    cur_m = None
    in_quiz = False

    # Slide collection
    cur_slide = None
    slide_body = []

    def save_slide():
        nonlocal cur_slide, slide_body
        if cur_slide and slide_body:
            cur_slide['body'] = ' '.join(slide_body)
            worlds[cur_w]['mods'][cur_m]['slides'].append(dict(cur_slide))
        elif cur_slide:
            # No body — still save (empty body)
            cur_slide['body'] = ''
            worlds[cur_w]['mods'][cur_m]['slides'].append(dict(cur_slide))
        cur_slide = None
        slide_body = []

    # Quiz collection
    cur_q = None

    def save_q():
        nonlocal cur_q
        if cur_q and cur_q.get('question') and cur_q.get('answer') is not None:
            worlds[cur_w]['mods'][cur_m]['qs'].append(dict(cur_q))
        cur_q = None

    i = 0
    while i < len(paras):
        line = paras[i]

        # World header
        mw = IS_WORLD.match(line)
        if mw:
            wnum = int(mw.group(1))
            if wnum >= 7:
                save_slide(); save_q()
                cur_w = wnum; cur_m = None; in_quiz = False
                if cur_w not in worlds: worlds[cur_w] = {'title': line, 'mods': {}}
            i += 1; continue

        if cur_w is None: i += 1; continue

        # Quiz section marker
        if IS_QUIZ_M.search(line):
            save_slide(); save_q()
            in_quiz = True
            i += 1; continue

        # Module header
        mm = IS_MODULE.match(line)
        if mm:
            save_slide(); save_q()
            cur_m = int(mm.group(1))
            title = mm.group(2).strip()
            if cur_m not in worlds[cur_w]['mods']:
                worlds[cur_w]['mods'][cur_m] = {'title': title, 'slides': [], 'qs': []}
            i += 1

            # If next line is body text (not a slide header) — it's slide 1 without a header
            if not in_quiz and i < len(paras):
                next_line = paras[i]
                if (next_line and not IS_SLIDE.match(next_line)
                        and not IS_MODULE.match(next_line)
                        and not IS_WORLD.match(next_line)
                        and not IS_QHEAD.match(next_line)
                        and not IS_QUIZ_M.search(next_line)
                        and next_line not in ('SLIDES', 'QUESTIONÁRIOS')):
                    # This is Slide 1 body with no header — reconstruct it
                    cur_slide = {'tag': 'Fato', 'title': '—', 'num': 1}
                    slide_body = [next_line]
                    i += 1
            continue

        if cur_m is None: i += 1; continue

        if line in ('SLIDES', 'QUESTIONÁRIOS'): i += 1; continue  # handled by world-level structure

        if not in_quiz:
            ms = IS_SLIDE.match(line)
            if ms:
                save_slide()
                cur_slide = {'tag': ms.group(1).strip(), 'title': ms.group(2).strip()}
                slide_body = []
            elif cur_slide is not None:
                slide_body.append(line)
        else:
            # Quiz section
            mq = IS_QHEAD.match(line)
            if mq:
                save_q()
                cur_q = {
                    'num': int(mq.group(1)), 'diff': mq.group(2).strip(),
                    'question': '', 'answer': None, 'verdict': '', 'explanation': '',
                }
            elif cur_q is not None:
                if not cur_q['question']:
                    cur_q['question'] = strip_q(clean(line))
                else:
                    ma = IS_ANS.match(line)
                    if ma:
                        cur_q['answer'] = ma.group(1).lower() == 'verdadeiro'
                        rest = clean(ma.group(2).strip())
                        ms2 = re.search(r'\.(?:\s+|(?=[A-ZÀ-Ö]))', rest)
                        if ms2:
                            cur_q['verdict'] = rest[:ms2.start()+1].strip()
                            cur_q['explanation'] = rest[ms2.end():].strip()
                        else:
                            cur_q['verdict'] = rest; cur_q['explanation'] = ''
                    elif cur_q.get('answer') is not None:
                        if cur_q['explanation']:
                            cur_q['explanation'] += ' ' + line
                        else:
                            cur_q['explanation'] = line

        i += 1

    save_slide(); save_q()
    return worlds


def output_normalized(worlds):
    """Output in the format gen_pt_translations.py expects."""
    lines = []
    for wnum in sorted(worlds.keys()):
        wd = worlds[wnum]
        lines += [f'MUNDO {wnum} — {wd["title"].split("—",1)[-1].strip()}', SEP]
        for mnum in sorted(wd['mods'].keys()):
            mod = wd['mods'][mnum]
            lines += [SEP, f'Módulo {mnum} — {mod["title"]}', SEP, 'SLIDES']
            for snum, sl in enumerate(mod['slides'], 1):
                lines.append(f'Slide {snum} — {sl["tag"]} — {sl["title"]}')
                if sl['body']: lines.append(sl['body'])
            lines.append('QUESTIONÁRIOS')
            for q in mod['qs']:
                diff_map = {'Fácil':'Fácil', 'Médio':'Médio', 'Difícil':'Difícil'}
                lines.append(f'P{q["num"]} — {diff_map.get(q["diff"], q["diff"])} — Fato')
                lines.append(f'"{q["question"]}"')
                ans = 'Verdadeiro' if q['answer'] else 'Falso'
                lines.append(f'{ans} · {q["verdict"]} {q["explanation"]}'.strip())

    return '\n'.join(lines)


def main():
    sys.stderr.write(f'Reading {DOCX}...\n')
    doc = docx.Document(DOCX)
    paras = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
    sys.stderr.write(f'  {len(paras)} paragraphs\n')

    # Start from MUNDO 7
    start = next((i for i,p in enumerate(paras) if IS_WORLD.match(p) and
                  int(IS_WORLD.match(p).group(1)) >= 7), None)
    if start is None:
        sys.stderr.write('ERROR: MUNDO 7 not found\n'); sys.exit(1)
    sys.stderr.write(f'  MUNDO 7 starts at paragraph {start}\n')

    worlds = parse_and_normalize(paras[start:])

    # Stats
    for wnum, wd in sorted(worlds.items()):
        sys.stderr.write(f'\nWorld {wnum}:\n')
        for mnum, mod in sorted(wd['mods'].items()):
            ns, nq = len(mod['slides']), len(mod['qs'])
            flag = ' ⚠' if ns != 8 or nq != 8 else '  '
            sys.stderr.write(f'{flag}  M{mnum}: {mod["title"][:40]:<40} {ns}s {nq}q\n')

    print(output_normalized(worlds))


if __name__ == '__main__':
    main()
