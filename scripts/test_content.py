#!/usr/bin/env python3
"""Content integrity tests — every lesson, every slide, every quiz question.

Offline and fast, so it can run on every change. Each check exists because a
real defect got through: World 8's 54 slides opened mid-sentence, 148 quiz
explanations restated the question instead of answering it, and a slide cited a
completion game that had to actually exist as a route.

Run:  python3 scripts/test_content.py     (exit 1 on any failure)
"""
import glob, json, os, re, sys
from collections import Counter, defaultdict

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
LESSONS = os.path.join(ROOT, 'app', 'data', 'lessons')

# Values appear in all three quote styles across the codebase (we1.ts uses
# single quotes, w8.ts double, quiz questions backticks). A parser that assumed
# double quotes silently reported we1.ts as having zero slides — a false failure,
# which is worse than no test.
V = r'(?:"((?:[^"\\]|\\.)*)"|\'((?:[^\'\\]|\\.)*)\'|`([^`]*)`)'

def _v(groups, start):
    """Pick whichever quote-style group matched."""
    return next((g for g in groups[start:start+3] if g is not None), '')

SLIDE_RE = re.compile(r'tag:\s*' + V + r'\s*,\s*title:\s*' + V +
                      r'\s*,(?:\s*image:\s*' + V + r'\s*,)?\s*body:\s*' + V)
LESSON_HEAD = re.compile(r'^\s*(\d+):\s*\{\s*$', re.M)
QUESTION_RE = re.compile(r'question:\s*' + V + r'\s*,\s*answer:\s*(true|false)\s*,'
                         r'\s*verdict:\s*' + V + r'\s*,\s*explanation:\s*' + V)

def parse_slides(src):
    out = []
    for m in SLIDE_RE.finditer(src):
        g = m.groups()
        out.append((_v(g, 0), _v(g, 3), _v(g, 6), _v(g, 9)))   # tag, title, image, body
    return out

def parse_quiz(src):
    out = []
    for m in QUESTION_RE.finditer(src):
        g = m.groups()
        out.append((_v(g, 0), g[3], _v(g, 4), _v(g, 7)))       # question, answer, verdict, explanation
    return out
COMPLETION = re.compile(r"completionPage:\s*'([^']+)'")
TRAILING_JUNK = {'the','a','an','and','or','but','of','in','on','at','to','for',
                 'with','from','by','as','that','this','these'}

failures, warnings, stats = [], [], Counter()


def fail(test, detail):
    failures.append((test, detail))


def warn(test, detail):
    warnings.append((test, detail))


def main():
    files = sorted(glob.glob(os.path.join(LESSONS, '*.ts')))
    if not files:
        print('no lesson files found', file=sys.stderr)
        return 1

    slides_by_file, quiz_by_file, lesson_ids = {}, {}, defaultdict(list)

    for path in files:
        name = os.path.basename(path)
        src = open(path, encoding='utf-8').read()
        slides = parse_slides(src)
        quizzes = parse_quiz(src)
        slides_by_file[name] = slides
        quiz_by_file[name] = quizzes
        stats['slides'] += len(slides)
        stats['quiz'] += len(quizzes)
        for m in LESSON_HEAD.finditer(src):
            lesson_ids[name].append(int(m.group(1)))

        # Which lesson each slide belongs to, so a repeat inside one lesson can be
        # told apart from deliberate spaced repetition across lessons.
        heads = [(m.start(), m.group(1)) for m in LESSON_HEAD.finditer(src)]
        def lesson_of(pos):
            prior = [h for h in heads if h[0] < pos]
            return prior[-1][1] if prior else '?'
        body_positions = {}
        for m in SLIDE_RE.finditer(src):
            g = m.groups()
            body_positions.setdefault(_v(g, 9), []).append(m.start())

        # ---- slide-level checks -------------------------------------------
        seen_bodies = {}
        for tag, title, image, body in slides:
            where = f'{name} "{title[:40]}"'
            if not title.strip():
                fail('slide has no title', where)
            if not body.strip():
                fail('slide has no body', where)
            if body and body[0].islower():
                fail('body starts mid-sentence', f'{where} -> {body[:60]!r}')
            if title.split() and title.split()[-1].lower() in TRAILING_JUNK:
                fail('title ends on an article', where)
            if not tag.strip():
                fail('slide has no tag', where)
            for marker in ('undefined', 'null', 'TODO', 'FIXME', 'Lorem ipsum'):
                if marker in body:
                    fail('placeholder text in body', f'{where} contains {marker!r}')
            if re.search(r'\[L\w*\d+\.[SQ]\d+', body):
                fail('review-document marker left in body', where)
            if '  ' in body:
                warn('double space in body', where)
            if re.search(r'[.!?]{2,}(?!\.)', body.replace('...', '')):
                warn('doubled punctuation', f'{where} -> {body[:60]!r}')
            # Elementary slides often end on an emoji, and several slides end on a
            # bullet list. Strip trailing emoji/symbols and skip lists before judging.
            tail = re.sub(r'[\s\u2190-\u27bf\U0001F000-\U0001FAFF\ufe0f]+$', '', body)
            if tail and tail[-1] not in '.!?")\u2026' and '\u2022' not in body[-90:]:
                warn('body does not end in punctuation', f'{where} -> ...{tail[-40:]!r}')
            if body in seen_bodies:
                lessons = {lesson_of(p) for p in body_positions.get(body, [])}
                msg = f'{name}: "{title[:30]}" duplicates "{seen_bodies[body][:30]}"'
                if len(lessons) <= 1:
                    fail('identical slide body twice in the SAME lesson', msg)
                else:
                    warn('identical slide body in different lessons (spaced repetition?)',
                         f'{msg} — lessons {sorted(lessons)}')
            else:
                seen_bodies[body] = title
            if image:
                img_path = os.path.join(ROOT, 'public', image.lstrip('/'))
                if not os.path.exists(img_path):
                    fail('image file missing', f'{where} -> {image}')
                stats['images'] += 1

        # ---- quiz-level checks --------------------------------------------
        for question, answer, verdict, expl in quizzes:
            where = f'{name} "{question[:45]}"'
            if not question.strip():
                fail('quiz question empty', name)
            if not expl.strip():
                fail('quiz explanation empty', where)
            if not verdict.strip():
                fail('quiz verdict empty', where)
            # The defect that produced 148 bad explanations: the explanation is
            # just the question echoed back, optionally with the answer after a dash.
            if re.match(r'^\s*(True or false|Which of these|What is|Why |How |Who )', expl) \
                    and ('? —' in expl or expl.rstrip().endswith('?')):
                fail('explanation restates the question instead of explaining', where)
            if expl.strip().lower() == question.strip().lower():
                fail('explanation identical to question', where)
            if re.search(r'\[L\w*\d+\.[SQ]\d+', expl):
                fail('review-document marker left in explanation', where)

        # ---- completion pages must exist as routes -------------------------
        for route in COMPLETION.findall(src):
            page = os.path.join(ROOT, 'app', route.lstrip('/'), 'page.tsx')
            if not os.path.exists(page):
                fail('completionPage route does not exist', f'{name} -> {route}')
            stats['completion_routes'] += 1

    # ---- EN / PT parity ---------------------------------------------------
    for en_name in list(slides_by_file):
        pt_name = en_name.replace('.ts', '_pt.ts')
        if pt_name in slides_by_file:
            en, pt = len(slides_by_file[en_name]), len(slides_by_file[pt_name])
            if en != pt:
                fail('EN/PT slide count mismatch', f'{en_name}={en} vs {pt_name}={pt}')
            eq, pq = len(quiz_by_file[en_name]), len(quiz_by_file[pt_name])
            if eq != pq:
                fail('EN/PT quiz count mismatch', f'{en_name}={eq} vs {pt_name}={pq}')
            stats['pt_pairs'] += 1

    # Lesson ids are NOT globally unique by design: app/data/elementary.ts remaps
    # the elementary and middle-school files into their own id ranges, so raw ids
    # repeat across source files without colliding at runtime.
    stats['lessons'] = sum(len(v) for v in lesson_ids.values())

    # ---- report -----------------------------------------------------------
    print(f'checked {len(files)} lesson files | {stats["lessons"]} lessons | '
          f'{stats["slides"]} slides | {stats["quiz"]} quiz questions | '
          f'{stats["images"]} images | {stats["completion_routes"]} game links')

    if warnings:
        print(f'\n{len(warnings)} warning(s):')
        for t, d in warnings[:25]:
            print(f'  ~ {t}: {d}')
        if len(warnings) > 25:
            print(f'  … and {len(warnings)-25} more')

    if failures:
        print(f'\nFAIL — {len(failures)} problem(s):')
        grouped = defaultdict(list)
        for t, d in failures:
            grouped[t].append(d)
        for t, ds in grouped.items():
            print(f'\n  {t} ({len(ds)}):')
            for d in ds[:12]:
                print(f'    - {d}')
            if len(ds) > 12:
                print(f'    … and {len(ds)-12} more')
        return 1

    print('\nPASS — content integrity clean.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
