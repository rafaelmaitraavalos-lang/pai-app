#!/usr/bin/env python3
"""Parse PT middle school curriculum PDF → wm_w1_pt.ts – wm_w5_pt.ts"""
import re, os

PDF_TXT = '/tmp/middle_pt.txt'
APP     = os.path.join(os.path.dirname(__file__), '..')

WORLD_TITLES = {
    1: 'O Que É a IA?',
    2: 'Como a IA Toma Decisões',
    3: 'IA e Sociedade',
    4: 'Ética na IA',
    5: 'O Futuro da IA',
}
SLIDE_TAGS = ['Fact','Example','Big idea','Hot take','Scenario','Fact','Example','Fact']

# PT module IDs: world 1 → 311-318, world 2 → 321-328, ...
def module_id(wn, mn):
    return 300 + wn * 10 + mn

def normalize(raw):
    t = re.sub(r'\s+', ' ', raw)
    t = re.sub(r'[═─]{3,}', ' ', t)
    return t.strip()

def split_modules(text):
    positions = []
    for m in re.finditer(r'MÓDULO\s+(\d+)\.(\d+)\s+[—\-]+\s+', text, re.IGNORECASE):
        positions.append((m.start(), int(m.group(1)), int(m.group(2)), m.end()))
    results = []
    for i, (start, wn, mn, cstart) in enumerate(positions):
        end   = positions[i+1][0] if i+1 < len(positions) else len(text)
        chunk = text[cstart:end].strip()
        tm    = re.match(r'([A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇ][A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇ0-9\s\-?!,()\'"]+?)(?=\s+SLIDE|\s+QUES)', chunk, re.IGNORECASE)
        title = tm.group(1).strip().title() if tm else f'Módulo {wn}.{mn}'
        results.append((wn, mn, title, chunk))
    return results

def parse_slides(chunk):
    parts  = re.split(r'SLIDE\s+(\d+)\s+', chunk, flags=re.IGNORECASE)
    slides = []
    i = 1
    while i+1 < len(parts):
        num     = int(parts[i])
        content = parts[i+1].strip()
        content = re.split(r'\s*QUESTION[ÁA]RIO\s*[—\-]', content, flags=re.IGNORECASE)[0].strip()
        if content:
            slides.append({'num': num, 'body': content})
        i += 2
    return slides

def parse_quiz(chunk):
    qm = re.search(r'QUESTION[ÁA]RIO\s*[—\-][^P]*(P\d+:.*)', chunk, re.IGNORECASE | re.DOTALL)
    if not qm:
        return []
    quiz_text = qm.group(1)
    q_parts   = re.split(r'P\d+:\s+', quiz_text)
    questions = []
    for part in q_parts:
        part = part.strip()
        if not part:
            continue
        opts = re.findall(r'[A-D]\)\s+(.*?)(?=\s+[A-D]\)|$)', part, re.DOTALL)
        if opts:
            q_text  = re.split(r'\s+[A-D]\)', part)[0].strip()
            correct = next((o.replace('✓','').strip() for o in opts if '✓' in o), None)
            if correct:
                questions.append({'question': correct, 'answer': True,
                                   'explanation': f'{q_text} — {correct}'})
        else:
            q_text = re.split(r'\s+[A-D]\)', part)[0].strip()
            answer = bool(re.search(r'A\)\s+Verdadeiro\s*✓', part, re.IGNORECASE))
            if q_text:
                questions.append({'question': q_text, 'answer': answer,
                                   'explanation': q_text})
    return questions[:4]

def esc(s):
    return str(s).replace('\\','\\\\').replace('"','\\"')

def esc_bt(s):
    return str(s).replace('\\','\\\\').replace('`','\\`').replace('${','\\${')

def gen_file(wn, modules):
    wid   = 260 + wn
    lines = ["import { LessonData } from '../index'", "",
             f"const wm_w{wn}_pt: Record<number, LessonData> = {{"]
    for mn in sorted(modules.keys()):
        m   = modules[mn]
        lid = module_id(wn, mn)
        lines += [f"  {lid}: {{",
                  f"    id: {lid}, worldId: {wid},",
                  f"    title: \"{esc(m['title'])}\",",
                  f"    stops: ["]
        for i, s in enumerate(m['slides']):
            lines.append(f"      {{ tag: \"{SLIDE_TAGS[i%len(SLIDE_TAGS)]}\","
                         f" title: \"Slide {s['num']}\","
                         f" body: \"{esc(s['body'])}\" }},")
        lines += ["    ],", "    questions: ["]
        for q in m['questions']:
            lines.append(f"      {{ difficulty: \"Easy\", tag: \"Fact\", stopTitle: '',"
                         f" question: `\"{esc_bt(q['question'])}\"`,"
                         f" answer: {'true' if q['answer'] else 'false'},"
                         f" verdict: \"Correto.\","
                         f" explanation: \"{esc(q['explanation'])}\" }},")
        lines += ["    ],", "  },"]
    lines += ["}", "", f"export default wm_w{wn}_pt", ""]
    return '\n'.join(lines)

def main():
    with open(PDF_TXT) as f:
        raw = f.read()
    text   = normalize(raw)
    chunks = split_modules(text)
    worlds = {}
    for wn, mn, title, chunk in chunks:
        if wn not in worlds:
            worlds[wn] = {}
        worlds[wn][mn] = {'title': title, 'slides': parse_slides(chunk),
                           'questions': parse_quiz(chunk)}
    for wn in range(1, 6):
        if wn not in worlds:
            print(f"WARNING: World {wn} missing"); continue
        mods = worlds[wn]
        out  = os.path.join(APP, 'app', 'data', 'lessons', f'wm_w{wn}_pt.ts')
        with open(out, 'w') as f:
            f.write(gen_file(wn, mods))
        print(f"\nMundo {wn} ({WORLD_TITLES[wn]}) → {os.path.basename(out)}")
        for mn in sorted(mods.keys()):
            m    = mods[mn]
            lid  = module_id(wn, mn)
            ns   = len(m['slides'])
            nq   = len(m['questions'])
            flag = ' ⚠' if ns < 3 or nq < 3 else '  '
            print(f"{flag} {lid} {m['title'][:40]:<40} {ns}s {nq}q")
    print("\nDone.")

if __name__ == '__main__':
    main()
