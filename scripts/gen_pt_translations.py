#!/usr/bin/env python3
"""
Parse PT-BR translation docx and output lessonTranslations pt section.
Usage: python3 scripts/gen_pt_translations.py
"""
import docx, re, os, sys

DOCX = '/Users/rafa/Downloads/PT-BR_PAI for Kids.docx'
APP  = os.path.join(os.path.dirname(__file__), '..')

# ── Lesson ID mapping ─────────────────────────────────────────────────────────
def lesson_id(world, module):
    if world == 1: return module
    return 7 + (world - 2) * 8 + module

# ── Patterns ──────────────────────────────────────────────────────────────────
IS_WORLD  = re.compile(r'^MUNDO\s+(\d+)', re.I)
IS_MODULE = re.compile(r'^Módulo\s+(\d+)\s*[–—\-]+\s*(.*)', re.I)
IS_SLIDE  = re.compile(r'^Slide\s+\d+\s+[–—\-]+\s+(.+?)\s+[–—\-]+\s+(.+)', re.I)
IS_QHEAD  = re.compile(r'^P(\d+)\s+[–—\-]+\s+(Fácil|Médio|Difícil)\s+[–—\-]+\s+(.+)', re.I)
IS_ANS    = re.compile(r'^(Verdadeiro|Falso)\s*[·•]\s*(.+)', re.I)
SMART_Q   = re.compile(r'^[""''"\']+|[""''"\']+$')

def clean(s):
    return (s.replace('"','\"').replace('"','\"')
             .replace(''',"\\'").replace(''',"\\'"))

def strip_q(s):
    return SMART_Q.sub('', s).strip()

def starts_quote(s):
    return bool(s) and s[0] in ('"', '"', '"', "'", ''', ''')

def esc(s):
    return s.replace('\\','\\\\').replace('"','\\"').replace('\n', ' ')

def esc_bt(s):
    return s.replace('\\','\\\\').replace('`','\\`').replace('${','\\${')

# ── Parse ─────────────────────────────────────────────────────────────────────
def parse(paras):
    worlds = {}
    cur_w = 1   # World 1 has no MUNDO 1 header — start there
    cur_m = None
    section = None
    cur_stop = None
    stop_body = []
    cur_q = None

    def save_stop():
        nonlocal cur_stop, stop_body
        if cur_stop and stop_body:
            cur_stop['body'] = ' '.join(stop_body)
            worlds[cur_w]['mods'][cur_m]['stops'].append(dict(cur_stop))
        cur_stop = None; stop_body = []

    def save_q():
        nonlocal cur_q
        if cur_q and cur_q.get('question') and cur_q.get('answer') is not None:
            worlds[cur_w]['mods'][cur_m]['questions'].append(dict(cur_q))
        cur_q = None

    for line in paras:
        # World marker (skip MUNDO 1 since we start there)
        mw = IS_WORLD.match(line)
        if mw:
            wnum = int(mw.group(1))
            if wnum >= 2:
                save_stop(); save_q()
                cur_w = wnum; cur_m = None; section = None
                if cur_w not in worlds: worlds[cur_w] = {'mods': {}}
            continue

        if cur_w not in worlds: worlds[cur_w] = {'mods': {}}

        # Module header
        mm = IS_MODULE.match(line)
        if mm:
            save_stop(); save_q()
            cur_m = int(mm.group(1))
            title = mm.group(2).strip() or ''
            # Don't reset section — W7/W8 have SLIDES at world level before modules
            if cur_m not in worlds[cur_w]['mods']:
                worlds[cur_w]['mods'][cur_m] = {'title': title, 'stops': [], 'questions': []}
            continue

        if cur_m is None: continue

        s = line.strip()

        if s == 'SLIDES':
            save_stop(); save_q(); section = 'slides'; continue
        if s in ('QUESTIONÁRIOS', 'QUESTÕES', 'QUIZ'):
            save_stop(); save_q(); section = 'quiz'; continue

        if section == 'slides':
            ms = IS_SLIDE.match(s)
            if ms:
                save_stop()
                cur_stop = {'title': ms.group(2).strip()}
                stop_body = []
            elif cur_stop is not None:
                stop_body.append(s)

        elif section == 'quiz':
            mq = IS_QHEAD.match(s)
            if mq:
                save_q()
                cur_q = {
                    'num': int(mq.group(1)),
                    'diff': mq.group(2),
                    'tag':  mq.group(3).strip(),
                    'question': '', 'answer': None, 'verdict': '', 'explanation': '',
                }
            elif cur_q is not None:
                if not cur_q['question'] and (starts_quote(s) or not IS_ANS.match(s)):
                    cur_q['question'] = strip_q(s)
                else:
                    ma = IS_ANS.match(s)
                    if ma:
                        cur_q['answer'] = ma.group(1).lower() == 'verdadeiro'
                        rest = ma.group(2).strip()
                        ms2 = re.search(r'\.(?:\s+|(?=[A-ZÀ-Ö]))', rest)
                        if ms2:
                            cur_q['verdict'] = rest[:ms2.start()+1].strip()
                            cur_q['explanation'] = rest[ms2.end():].strip()
                        else:
                            cur_q['verdict'] = rest; cur_q['explanation'] = ''
                    elif cur_q.get('answer') is not None:
                        if cur_q['explanation']:
                            cur_q['explanation'] += ' ' + s
                        else:
                            cur_q['explanation'] = s

    save_stop(); save_q()
    return worlds

# ── Generate TS ───────────────────────────────────────────────────────────────
def gen_ts(worlds):
    lines = ['  pt: {', '']
    for wnum in sorted(worlds.keys()):
        wd = worlds[wnum]
        lines.append(f'    // ── World {wnum} ──────────────────────────────────────────────────────────────')
        for mnum in sorted(wd['mods'].keys()):
            mod   = wd['mods'][mnum]
            lid   = lesson_id(wnum, mnum)
            stops = mod['stops']
            qs    = mod['questions']
            ns, nq = len(stops), len(qs)
            flag  = ' // ⚠' if ns != 8 or nq != 8 else ''

            lines.append(f'    {lid}: {{{flag}')
            lines.append(f'      title: "{esc(mod["title"])}",')
            lines.append(f'      stops: [')
            for st in stops:
                lines.append(f'        {{ title: "{esc(st["title"])}", body: "{esc(st["body"])}" }},')
            lines.append(f'      ],')
            lines.append(f'      questions: [')
            for q in qs:
                lines.append(f'        {{ question: `{esc_bt(q["question"])}`, verdict: "{esc(q["verdict"])}", explanation: "{esc(q["explanation"])}" }},')
            lines.append(f'      ],')
            lines.append(f'    }},')
        lines.append('')
    lines.append('  },')
    return '\n'.join(lines)

def main():
    print(f'Reading {DOCX}...', file=sys.stderr)
    doc   = docx.Document(DOCX)
    paras = [clean(p.text.strip()) for p in doc.paragraphs if p.text.strip()]
    print(f'  {len(paras)} paragraphs', file=sys.stderr)

    # Start from ENSINO MÉDIO
    start = next((i for i,p in enumerate(paras) if 'ENSINO MÉDIO' in p.upper()), 0)
    print(f'  High school content starts at para {start}', file=sys.stderr)

    worlds = parse(paras[start:])

    # Merge W7/W8 from pre-normalized file if available
    norm_path = os.path.join(APP, 'scripts', 'pt_w7w8_normalized.txt')
    if os.path.exists(norm_path):
        print(f'  Merging W7/W8 from {norm_path}', file=sys.stderr)
        with open(norm_path, encoding='utf-8') as f:
            norm_paras = [line.rstrip('\n') for line in f if line.strip()]
        extra = parse(norm_paras)
        for wnum, wd in extra.items():
            worlds[wnum] = wd   # always prefer normalized over stub

    # Stats
    total_lessons = sum(len(wd['mods']) for wd in worlds.values())
    print(f'\nParsed {len(worlds)} worlds, {total_lessons} lessons:', file=sys.stderr)
    for wnum, wd in sorted(worlds.items()):
        for mnum, mod in sorted(wd['mods'].items()):
            lid = lesson_id(wnum, mnum)
            ns, nq = len(mod['stops']), len(mod['questions'])
            flag = ' ⚠' if ns != 8 or nq != 8 else '  '
            print(f'{flag}  W{wnum} M{mnum} (L{lid:2d}): {mod["title"][:35]:<35} {ns}s {nq}q', file=sys.stderr)

    # Output TS snippet
    ts = gen_ts(worlds)
    out_path = os.path.join(APP, 'scripts', 'pt_translations_snippet.ts')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(ts)
    print(f'\nWrote snippet to {out_path}', file=sys.stderr)
    print('Now paste the pt: {{ ... }} block into lessonTranslations.ts', file=sys.stderr)

if __name__ == '__main__':
    main()
