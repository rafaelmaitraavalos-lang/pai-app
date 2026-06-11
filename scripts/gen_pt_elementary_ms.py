#!/usr/bin/env python3
"""
Parse PT-BR elementary (Lições 1-4) and middle school (Units 1-4) content
from the translation doc, and generate lesson data files.

Usage: python3 scripts/gen_pt_elementary_ms.py
"""
import docx, re, os, sys

DOCX = '/Users/rafa/Downloads/PT-BR_PAI for Kids.docx'
APP  = os.path.join(os.path.dirname(__file__), '..')

def clean(s):
    return (s.replace('"','"').replace('"','"')
             .replace(''', "'").replace(''', "'").strip())

def esc(s):
    return s.replace('\\','\\\\').replace('"','\\"').replace('\n', ' ')

# ── Elementary: parse Lições 1-4 ─────────────────────────────────────────────

def parse_elementary(paras):
    """Parse numbered-section elementary lessons from CONTEÚDO BÁSICO."""
    lessons = {}
    cur_lesson = None
    cur_stop = None
    stop_body = []

    LESSON_HDR = re.compile(r'^Lição\s+(\d+):\s+(.+)', re.I)
    SECTION_HDR = re.compile(r'^\d+\.\s+(.+)')

    def save_stop():
        nonlocal cur_stop, stop_body
        if cur_stop and stop_body:
            cur_stop['body'] = ' '.join(stop_body)
            lessons[cur_lesson['id']]['stops'].append(dict(cur_stop))
        cur_stop = None; stop_body = []

    for line in paras:
        m = LESSON_HDR.match(line)
        if m:
            save_stop()
            lid = int(m.group(1))
            cur_lesson = {'id': lid, 'title': clean(m.group(2))}
            lessons[lid] = {'title': cur_lesson['title'], 'stops': []}
            continue
        if cur_lesson is None: continue

        ms = SECTION_HDR.match(line)
        if ms:
            save_stop()
            cur_stop = {'title': clean(ms.group(1))}
            stop_body = []
        elif cur_stop is not None:
            if line.strip():
                stop_body.append(clean(line))

    save_stop()
    return lessons

def gen_elementary_ts(lessons):
    """Generate we1_pt.ts content."""
    lines = [
        "import { LessonData } from '../index'",
        "",
        "const we1_pt: Record<number, LessonData> = {",
    ]
    # Lessons are numbered 1-4 in the doc; we store them starting at ID 44
    # (matching the existing we1_pt.ts structure remapped to 131-134 in elementary.ts)
    for doc_id, lesson in sorted(lessons.items()):
        ts_id = 43 + doc_id  # doc 1→44, 2→45, 3→46, 4→47
        lines += [
            f"  {ts_id}: {{",
            f"    id: {ts_id},",
            f"    worldId: 6,",
            f"    title: \"{esc(lesson['title'])}\",",
            f"    stops: [",
        ]
        for stop in lesson['stops']:
            lines.append(f"      {{ tag: 'Fact', title: \"{esc(stop['title'])}\", body: \"{esc(stop['body'])}\" }},")
        lines += [
            "    ],",
            "    questions: [],",
            "  },",
        ]
    lines += [
        "}",
        "",
        "export default we1_pt",
        "",
    ]
    return '\n'.join(lines)

# ── Middle school: parse Units 1-4 ───────────────────────────────────────────

def parse_middle_school(paras):
    """Parse article-style middle school units."""
    units = {}
    cur_unit = None
    cur_section = None
    section_body = []

    UNIT_HDR    = re.compile(r'^UNIDADE\s+(\d+):\s+(.+)', re.I)
    SECTION_HDR = re.compile(r'^[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ][A-ZÁÀÂÃÉÊÍÓÔÕÚÇ\s\d]+$')  # ALL CAPS heading
    NUMBERED    = re.compile(r'^\d+\.\s+[A-Z]')

    def save_section():
        nonlocal cur_section, section_body
        if cur_section and section_body:
            cur_section['body'] = ' '.join(section_body)
            units[cur_unit['id']]['stops'].append(dict(cur_section))
        cur_section = None; section_body = []

    for line in paras:
        m = UNIT_HDR.match(line)
        if m:
            save_section()
            uid = int(m.group(1))
            cur_unit = {'id': uid, 'title': clean(m.group(2))}
            units[uid] = {'title': cur_unit['title'], 'stops': []}
            continue
        if cur_unit is None: continue

        # All-caps heading = new section
        stripped = line.strip()
        is_allcaps_hdr = (len(stripped) > 3 and stripped == stripped.upper()
                          and not re.match(r'^[═╗╚╝╔║\s]+$', stripped)
                          and not stripped.startswith('UNIDADE'))
        numbered_hdr = NUMBERED.match(stripped)

        if is_allcaps_hdr or numbered_hdr:
            save_section()
            title = clean(stripped) if is_allcaps_hdr else clean(re.sub(r'^\d+\.\s+', '', stripped))
            cur_section = {'title': title}
            section_body = []
        elif cur_section is not None and stripped:
            # Skip list bullets / short fragments
            if len(stripped) > 15 and not re.match(r'^[•\-\*]', stripped):
                section_body.append(clean(stripped))

    save_section()
    return units

def gen_ms_ts(units, world_id_offset=107):
    """Generate lesson data files for middle school units."""
    files = {}
    for uid, unit in sorted(units.items()):
        world_id = world_id_offset + uid - 1  # 107,108,109,110
        lesson_id = 160 + uid                  # 161,162,163,164
        lines = [
            "import { LessonData } from '../index'",
            "",
            f"const wms{uid}_pt: Record<number, LessonData> = {{",
            f"  {lesson_id}: {{",
            f"    id: {lesson_id},",
            f"    worldId: {world_id},",
            f"    title: \"{esc(unit['title'])}\",",
            f"    stops: [",
        ]
        for stop in unit['stops']:
            if stop.get('body', '').strip():
                lines.append(f"      {{ tag: 'Fact', title: \"{esc(stop['title'])}\", body: \"{esc(stop['body'])}\" }},")
        lines += [
            "    ],",
            "    questions: [],",
            "  },",
            "}",
            "",
            f"export default wms{uid}_pt",
            "",
        ]
        files[uid] = '\n'.join(lines)
    return files

def main():
    sys.stderr.write(f'Reading {DOCX}...\n')
    doc = docx.Document(DOCX)
    paras = [p.text.strip() for p in doc.paragraphs if p.text.strip()]

    # Elementary: lines 0-68
    elem_start = 0
    ms_start = next((i for i,p in enumerate(paras) if 'ENSINO FUNDAMENTAL II' in p.upper()), 69)
    hs_start  = next((i for i,p in enumerate(paras) if 'ENSINO MÉDIO' in p.upper()), 404)

    sys.stderr.write(f'Elementary: 0–{ms_start-1}, Middle school: {ms_start}–{hs_start-1}\n')

    # ── Elementary ────────────────────────────────────────────────────────────
    elem_lessons = parse_elementary(paras[elem_start:ms_start])
    sys.stderr.write(f'\nElementary lessons parsed: {len(elem_lessons)}\n')
    for lid, l in sorted(elem_lessons.items()):
        sys.stderr.write(f'  Lição {lid}: {l["title"][:40]} — {len(l["stops"])} stops\n')

    we1_pt_path = os.path.join(APP, 'app', 'data', 'lessons', 'we1_pt.ts')
    with open(we1_pt_path, 'w', encoding='utf-8') as f:
        f.write(gen_elementary_ts(elem_lessons))
    sys.stderr.write(f'Wrote {we1_pt_path}\n')

    # ── Middle school ─────────────────────────────────────────────────────────
    ms_units = parse_middle_school(paras[ms_start:hs_start])
    sys.stderr.write(f'\nMiddle school units parsed: {len(ms_units)}\n')
    for uid, u in sorted(ms_units.items()):
        sys.stderr.write(f'  Unidade {uid}: {u["title"][:40]} — {len(u["stops"])} stops\n')

    ms_files = gen_ms_ts(ms_units)
    for uid, content in ms_files.items():
        path = os.path.join(APP, 'app', 'data', 'lessons', f'wms{uid}_pt.ts')
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        sys.stderr.write(f'Wrote {path}\n')

    sys.stderr.write('\nDone. Now update elementary.ts to add middle school worlds 107-110.\n')

if __name__ == '__main__':
    main()
