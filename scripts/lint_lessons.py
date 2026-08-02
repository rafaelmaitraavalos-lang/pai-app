#!/usr/bin/env python3
"""Guard against corrupted slide text shipping to students.

Born from a real incident: a title/body splitter in the content generator pulled
the opening words of every World 8 slide up into its title, so 54 live slides
rendered with titles like "The Unified Model The" over bodies starting
mid-sentence in lowercase — and on two of them the term the slide existed to
define never appeared at all. Nothing caught it; it took a manual read to find.

Run:  python3 scripts/lint_lessons.py       (exit 1 if anything is wrong)
"""
import glob, os, re, sys

SLIDE = re.compile(r'title:\s*"((?:[^"\\]|\\.)*)"\s*,\s*body:\s*"((?:[^"\\]|\\.)*)"')
# A title ending on one of these means the body's first word was swallowed.
TRAILING_JUNK = {'the', 'a', 'an', 'and', 'or', 'but', 'of', 'in', 'on', 'at',
                 'to', 'for', 'with', 'from', 'by', 'as', 'that', 'this', 'these'}

# Every tag value the UI knows how to render in Portuguese. A new tag that is
# not in this set would show raw English on Portuguese lessons (a 2026-08-01
# "SCENARIO" slipped through exactly this way — found by adversarial review).
# Keep in sync with tagLabel in app/components/LessonTemplate.tsx.
KNOWN_TAGS = {'Fact', 'Example', 'Big idea', 'Hot take', 'Scenario', 'Myth bust'}
TAG = re.compile(r'tag:\s*"((?:[^"\\]|\\.)*)"')

# The Portuguese middle-school explanation generator emitted the source
# question ("Pergunta? — opção") instead of an explanation on 149 of 160
# quizzes. That signature — a question mark followed by an em-dash option —
# must never ship again.
BROKEN_EXPLANATION = re.compile(r'explanation:\s*"[^"]*\?\s*—\s*[^"]*"')

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')


def check(path):
    problems = []
    src = open(path, encoding='utf-8').read()
    for m in TAG.finditer(src):
        if m.group(1) not in KNOWN_TAGS:
            problems.append((m.group(1), '', 'tag has no Portuguese label in LessonTemplate'))
    for m in BROKEN_EXPLANATION.finditer(src):
        problems.append(('', m.group(0)[:70], 'explanation is a "question — option" stem, not an explanation'))
    for m in SLIDE.finditer(open(path, encoding='utf-8').read()):
        title, body = m.group(1), m.group(2)
        if not body:
            continue
        if body[0].islower():
            problems.append((title, body, 'body starts mid-sentence (lowercase)'))
        elif title.split() and title.split()[-1].lower() in TRAILING_JUNK:
            problems.append((title, body, f'title ends on "{title.split()[-1]}"'))
    return problems


def main():
    files = sorted(glob.glob(os.path.join(ROOT, 'app', 'data', 'lessons', '*.ts')))
    if not files:
        print('lint_lessons: no lesson files found', file=sys.stderr)
        return 1

    total = 0
    for f in files:
        problems = check(f)
        if problems:
            total += len(problems)
            print(f'\n{os.path.relpath(f, ROOT)} — {len(problems)} problem(s):')
            for title, body, why in problems:
                print(f'  {why}\n    title: {title!r}\n    body:  {body[:70]!r}')

    if total:
        print(f'\nFAIL — {total} corrupted slide(s) across {len(files)} lesson files.')
        print('The words are usually recoverable from the title itself: move the '
              'stolen prefix back to the front of the body.')
        return 1
    print(f'OK — {len(files)} lesson files clean.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
