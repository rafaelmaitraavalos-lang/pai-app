#!/usr/bin/env python3
"""
Parse pai-app lesson DOCX and write world 3-8 lesson data files.
Usage: python3 scripts/gen_lessons.py
"""
import zipfile, re, os, sys

DOCX = '/Users/rafa/Downloads/Main  (2).docx'
APP  = os.path.join(os.path.dirname(__file__), '..')

# ── Extract paragraphs from DOCX ──────────────────────────────────────────────

def get_paras(path):
    with zipfile.ZipFile(path) as z:
        xml = z.read('word/document.xml').decode('utf-8')
    # Decode XML entities
    xml = xml.replace('&quot;', '"').replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    out = []
    for p in re.findall(r'<w:p[ >].*?</w:p>', xml, re.DOTALL):
        runs = re.findall(r'<w:t[^>]*>(.*?)</w:t>', p, re.DOTALL)
        # Filter out runs that are actually XML markup noise
        clean = [r for r in runs if r.strip() and not r.lstrip().startswith('<')]
        t = ''.join(clean).strip()
        if t:
            out.append(t)
    return out

# ── Patterns ──────────────────────────────────────────────────────────────────

SEP    = re.compile(r'^[─\-]{8,}$')
WORLD  = re.compile(r'^WORLD\s+(\d+)', re.IGNORECASE)
MODULE = re.compile(r'^Module\s+(\d+)\s+[–—\-]+\s+(.+)', re.IGNORECASE)
SLIDE  = re.compile(r'^Slide\s+\d+\s+[–—\-]+\s+(.+?)\s+[–—\-]+\s+(.+)', re.IGNORECASE)
QHEAD  = re.compile(r'^Q(\d+)\s+[–—\-]+\s+(Easy|Medium|Hard)\s+[–—\-]+\s+(.+)', re.IGNORECASE)
ANS    = re.compile(r'^(True|False)\s*[·•]\s*(.+)', re.IGNORECASE)
# Smart/curly quotes that appear in DOCX
SMART_Q = re.compile(r'^[“”‘’"\']+|[“”‘’"\']+$')

def strip_quotes(s):
    return SMART_Q.sub('', s).strip()

def starts_with_quote(s):
    return bool(s) and s[0] in ('"', '“', '‘', '’', '”')

def is_header(line):
    return (SEP.match(line) or WORLD.match(line) or MODULE.match(line) or
            SLIDE.match(line) or QHEAD.match(line) or
            line.strip() in ('SLIDES', 'QUIZ', 'HIGH SCHOOL', 'SLIDES'))

# ── Lesson ID mapping ─────────────────────────────────────────────────────────
# World 1: modules 1-7  → lessons 1-7
# World 2: modules 1-8  → lessons 8-15
# World N≥3: modules 1-8 → lessons 7 + (N-2)*8 + module

def lesson_id(world, module):
    if world == 1:
        return module
    return 7 + (world - 2) * 8 + module

# ── Parser ────────────────────────────────────────────────────────────────────

def parse(paras):
    worlds = {}
    cur_w = None
    cur_m = None
    section = None
    cur_stop = None
    stop_body = []
    cur_q = None

    def save_stop():
        nonlocal cur_stop, stop_body
        if cur_stop is not None and stop_body:
            cur_stop['body'] = ' '.join(stop_body)
            worlds[cur_w]['mods'][cur_m]['stops'].append(dict(cur_stop))
        cur_stop = None
        stop_body = []

    def save_q():
        nonlocal cur_q
        if cur_q and cur_q.get('question') and cur_q.get('answer') is not None:
            worlds[cur_w]['mods'][cur_m]['questions'].append(dict(cur_q))
        cur_q = None

    for line in paras:
        if SEP.match(line):
            continue

        m = WORLD.match(line)
        if m:
            save_stop(); save_q()
            cur_w = int(m.group(1))
            cur_m = None
            section = None
            if cur_w not in worlds:
                worlds[cur_w] = {'mods': {}}
            continue

        if cur_w is None:
            continue

        m = MODULE.match(line)
        if m:
            save_stop(); save_q()
            cur_m = int(m.group(1))
            title = m.group(2).strip()
            section = None
            # If this module number already exists in the current world,
            # the doc is missing a WORLD header — auto-advance to next world
            if cur_m in worlds[cur_w]['mods']:
                cur_w += 1
                if cur_w not in worlds:
                    worlds[cur_w] = {'mods': {}}
            if cur_m not in worlds[cur_w]['mods']:
                worlds[cur_w]['mods'][cur_m] = {'title': title, 'stops': [], 'questions': []}
            continue

        if cur_m is None:
            continue

        stripped = line.strip()

        if stripped == 'SLIDES':
            save_stop(); save_q()
            section = 'slides'
            continue
        if stripped == 'QUIZ':
            save_stop(); save_q()
            section = 'quiz'
            continue

        if section == 'slides':
            m = SLIDE.match(line)
            if m:
                save_stop()
                cur_stop = {'tag': m.group(1).strip(), 'title': m.group(2).strip()}
                stop_body = []
            elif cur_stop is not None:
                stop_body.append(stripped)

        elif section == 'quiz':
            m = QHEAD.match(line)
            if m:
                save_q()
                cur_q = {
                    'num': int(m.group(1)),
                    'difficulty': m.group(2).strip().capitalize(),
                    'tag': m.group(3).strip(),
                    'question': '',
                    'answer': None,
                    'verdict': '',
                    'explanation': '',
                }
            elif cur_q is not None:
                # Question text: strip surrounding smart/curly/straight quotes
                if not cur_q['question'] and (starts_with_quote(stripped) or not ANS.match(stripped)):
                    cur_q['question'] = strip_quotes(stripped)
                else:
                    m2 = ANS.match(stripped)
                    if m2:
                        cur_q['answer'] = m2.group(1).lower() == 'true'
                        rest = m2.group(2).strip()
                        # Split verdict from explanation.
                        # Handle both ". " (space) and ".[Capital]" (no space) between sentences.
                        ms = re.search(r'\.(?:\s+|(?=[A-Z]))', rest)
                        if ms:
                            cur_q['verdict'] = rest[:ms.start() + 1].strip()
                            cur_q['explanation'] = rest[ms.end():].strip()
                        else:
                            cur_q['verdict'] = rest
                            cur_q['explanation'] = ''
                    elif cur_q.get('answer') is not None:
                        # Continuation paragraph (explanation on next line)
                        if cur_q['explanation']:
                            cur_q['explanation'] += ' ' + stripped
                        else:
                            cur_q['explanation'] = stripped

    save_stop()
    save_q()
    return worlds

# ── TypeScript generation ─────────────────────────────────────────────────────

def esc(s):
    """Escape for double-quoted TypeScript string."""
    return s.replace('\\', '\\\\').replace('"', '\\"')

def esc_bt(s):
    """Escape for backtick template literal."""
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

def gen_file(world_num, world_data):
    lines = [
        "import { LessonData } from '../index'",
        "",
        f"const w{world_num}: Record<number, LessonData> = {{",
    ]

    for mod_num in sorted(world_data['mods'].keys()):
        mod = world_data['mods'][mod_num]
        lid = lesson_id(world_num, mod_num)

        lines += [
            f"  {lid}: {{",
            f"    id: {lid},",
            f"    worldId: {world_num},",
            f"    title: \"{esc(mod['title'])}\",",
            f"    stops: [",
        ]
        for s in mod['stops']:
            lines.append(
                f"      {{ tag: \"{esc(s['tag'])}\", title: \"{esc(s['title'])}\","
                f" body: \"{esc(s['body'])}\" }},"
            )
        lines += [
            f"    ],",
            f"    questions: [",
        ]
        for q in mod['questions']:
            ans = 'true' if q['answer'] else 'false'
            lines.append(
                f"      {{ difficulty: \"{esc(q['difficulty'])}\", tag: \"{esc(q['tag'])}\","
                f" stopTitle: '', question: `{esc_bt(q['question'])}`, answer: {ans},"
                f" verdict: \"{esc(q['verdict'])}\", explanation: \"{esc(q['explanation'])}\" }},"
            )
        lines += [
            f"    ],",
            f"  }},",
        ]

    lines += [
        "}",
        "",
        f"export default w{world_num}",
        "",
    ]
    return '\n'.join(lines)

# ── Main ──────────────────────────────────────────────────────────────────────

def paras_from_txt(path):
    """Read pre-normalized text file as paragraph list."""
    with open(path, encoding='utf-8') as f:
        return [line.rstrip('\n') for line in f if line.strip()]

def main():
    # Check for pre-normalized text file for worlds 7-8
    txt_path = os.path.join(APP, 'scripts', 'w7w8_normalized.txt')
    if os.path.exists(txt_path):
        print(f"Reading {txt_path} for worlds 7-8 ...")
        extra_paras = paras_from_txt(txt_path)
        extra_worlds = parse(extra_paras)
    else:
        extra_worlds = {}

    print(f"Reading {DOCX} ...")
    paras = get_paras(DOCX)
    print(f"  {len(paras)} paragraphs extracted")

    worlds = parse(paras)
    # Merge in any worlds found in the text file that weren't in the DOCX
    for wn, wd in extra_worlds.items():
        if wn not in worlds:
            worlds[wn] = wd

    for wn in range(3, 9):
        if wn not in worlds:
            print(f"  WARNING: World {wn} not found — skipping")
            continue

        wd = worlds[wn]
        mods = wd['mods']
        out_path = os.path.join(APP, 'app', 'data', 'lessons', f'w{wn}.ts')

        ts = gen_file(wn, wd)
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(ts)

        print(f"\nWorld {wn} → {os.path.relpath(out_path, APP)}")
        for mn in sorted(mods.keys()):
            mod = mods[mn]
            lid = lesson_id(wn, mn)
            ns = len(mod['stops'])
            nq = len(mod['questions'])
            flag = ' ⚠ ' if ns != 8 or nq != 8 else '   '
            print(f"{flag}  Lesson {lid:2d} (mod {mn}): {mod['title'][:40]:<40}  {ns} stops  {nq} questions")

    print("\nDone. Run: git diff app/data/lessons/ to review.")

if __name__ == '__main__':
    main()
