#!/usr/bin/env python3
"""
Extract World 7 and 8 content from the DOCX and output a normalized text file
in the exact format that gen_lessons.py expects (same as Worlds 1-6).

Output structure per module:
  Module N — Title
  SLIDES
  Slide 1 — Tag — Title
  body text
  ...
  QUIZ
  Q1 — Easy — Fact
  "question"
  True · verdict. explanation
  ...

Usage: python3 scripts/normalize_w7w8.py > scripts/w7w8_normalized.txt
"""
import docx, re, sys
from lxml import etree

DOCX = '/Users/rafa/Downloads/Main  (2).docx'

def para_segments(para):
    """Split a paragraph at soft line breaks (Shift+Enter / w:br)."""
    segs, current = [], []
    for elem in para._element.iter():
        tag = elem.tag.split('}')[-1] if '}' in elem.tag else elem.tag
        if tag == 't' and elem.text:
            current.append(elem.text)
        elif tag == 'br':
            s = ''.join(current).strip()
            if s: segs.append(s)
            current = []
    s = ''.join(current).strip()
    if s: segs.append(s)
    return segs

def clean(s):
    return (s.replace('"', '"').replace('"', '"')
             .replace('‘', "'").replace('’', "'"))

def get_segs(path):
    doc = docx.Document(path)
    out = []
    for para in doc.paragraphs:
        for s in para_segments(para):
            c = clean(s).strip()
            if c:
                out.append(c)
    return out

IS_WORLD  = re.compile(r'^World\s+(\d+)\s+[–—]\s+(.+)', re.IGNORECASE)
IS_MOD    = re.compile(r'^Module\s+(\d+)\s+[–—]\s+(.+)')
IS_SLIDE  = re.compile(r'^Slide\s+\d+\s+[–—]\s+(.+?)\s+[–—]\s+(.+)')
IS_Q_COMB = re.compile(r'^Q(\d+)\s+[–—]\s+(Easy|Medium|Hard)\s+"(.+?)"\s+(True|False)\s*[·•]\s*(.+)', re.DOTALL)
IS_QUIZ_M = re.compile(r'Now the quizzes', re.IGNORECASE)

SEP = '────────────────────────────────────────────────────────────'

def split_title_body(text):
    """For combined-format slides: split title words from body text."""
    words = text.split()
    if len(words) <= 2:
        return text, ''
    for end in range(2, min(8, len(words))):
        if words[end] and words[end][0].islower():
            return ' '.join(words[:end]), ' '.join(words[end:])
    return ' '.join(words[:4]), ' '.join(words[4:])

def slide_num(s):
    m = re.match(r'Slide\s+(\d+)', s)
    return m.group(1) if m else '?'

def parse_q(s):
    """Parse combined quiz line → dict."""
    m = IS_Q_COMB.match(s)
    if not m:
        return None
    qnum, diff, qtext, ans, rest = m.group(1), m.group(2), m.group(3), m.group(4), m.group(5).strip()
    ms = re.search(r'\.(?:\s+|(?=[A-Z]))', rest)
    if ms:
        verdict = rest[:ms.start()+1].strip()
        expl    = rest[ms.end():].strip()
    else:
        verdict, expl = rest, ''
    return {'num': qnum, 'diff': diff.capitalize(), 'q': qtext.strip(), 'ans': ans, 'verdict': verdict, 'expl': expl}

def format_q(q):
    return [f'Q{q["num"]} — {q["diff"]} — Fact', f'"{q["q"]}"', f'{q["ans"]} · {q["verdict"]} {q["expl"]}'.strip()]

def main():
    sys.stderr.write(f'Reading {DOCX}...\n')
    segs = get_segs(DOCX)
    sys.stderr.write(f'{len(segs)} segments\n')

    # Find World 7 start
    start = next((i for i, s in enumerate(segs) if IS_WORLD.match(s) and
                  int(IS_WORLD.match(s).group(1)) >= 7), None)
    if start is None:
        sys.stderr.write('ERROR: World 7 not found\n'); sys.exit(1)

    # ── Pass 1: collect slides and questions per world/module ──────────────
    worlds = {}   # {world_num: {mod_num: {title, slides: [(tag,title,body)], qs: [q_dict]}}}
    cur_w, cur_m = None, None
    in_quiz = False

    i = start
    while i < len(segs):
        s = segs[i]

        mw = IS_WORLD.match(s)
        if mw:
            wnum = int(mw.group(1))
            if wnum >= 7:
                cur_w, cur_m = wnum, None
                in_quiz = False
                if cur_w not in worlds: worlds[cur_w] = {'title': mw.group(2), 'mods': {}}
            i += 1; continue

        if cur_w is None: i += 1; continue

        if IS_QUIZ_M.search(s):
            in_quiz = True
            i += 1; continue

        mm = IS_MOD.match(s)
        if mm:
            cur_m = int(mm.group(1))
            if not in_quiz:
                if cur_m not in worlds[cur_w]['mods']:
                    worlds[cur_w]['mods'][cur_m] = {'title': mm.group(2).strip(), 'slides': [], 'qs': []}
            i += 1; continue

        if cur_m is None: i += 1; continue

        if not in_quiz:
            ms = IS_SLIDE.match(s)
            if ms:
                tag   = ms.group(1).strip()
                rest  = ms.group(2).strip()
                # Check if next segment is body text
                next_s = segs[i+1] if i+1 < len(segs) else ''
                next_is_body = (next_s and not IS_SLIDE.match(next_s)
                                and not IS_MOD.match(next_s)
                                and not IS_WORLD.match(next_s)
                                and not IS_QUIZ_M.search(next_s)
                                and next_s not in ('SLIDES','QUIZ'))
                if next_is_body:
                    title, body = rest, next_s
                    i += 2
                else:
                    title, body = split_title_body(rest)
                    i += 1
                worlds[cur_w]['mods'][cur_m]['slides'].append((tag, title, body))
                continue
        else:
            q = parse_q(s)
            if q and cur_m in worlds[cur_w]['mods']:
                worlds[cur_w]['mods'][cur_m]['qs'].append(q)

        i += 1

    # ── Pass 2: output in standard format ──────────────────────────────────
    lines = []
    for wnum in sorted(worlds.keys()):
        wd = worlds[wnum]
        lines += [f'WORLD {wnum} — {wd["title"].upper()}', SEP]
        for mnum in sorted(wd['mods'].keys()):
            mod = wd['mods'][mnum]
            lines += [SEP, f'Module {mnum} — {mod["title"]}', SEP, 'SLIDES']
            for snum, (tag, title, body) in enumerate(mod['slides'], start=1):
                lines.append(f'Slide {snum} — {tag} — {title}')
                if body: lines.append(body)
            lines.append('QUIZ')
            for q in mod['qs']:
                lines.extend(format_q(q))

    print('\n'.join(lines))

    # Stats
    for wnum, wd in sorted(worlds.items()):
        sys.stderr.write(f'\nWorld {wnum}:\n')
        for mnum, mod in sorted(wd['mods'].items()):
            ns = len(mod['slides']); nq = len(mod['qs'])
            flag = ' ⚠' if ns != 8 or nq != 8 else '  '
            sys.stderr.write(f'{flag}  mod {mnum}: {mod["title"][:40]:<40} {ns}s {nq}q\n')

if __name__ == '__main__':
    main()
