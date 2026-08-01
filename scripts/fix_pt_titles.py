#!/usr/bin/env python3
"""Normalize generator-mangled Portuguese module titles.

The middle-school PT generator ran an English title-caser over Portuguese
module titles, capitalizing function words and downcasing the acronym IA:
"Definindo A Ia", "Alan Turing E O Teste De Turing". This rewrites only the
module-level `title:` lines in app/data/lessons/wm_w*_pt.ts:

  - standalone "Ia" -> "IA" (and "Pai" -> "PAI")
  - Portuguese function words are lowercased when not the first word

Run with --check to report offending lines without writing (used by lint).
"""
import re
import sys
import glob
import os

FUNCTION_WORDS = {
    'a', 'o', 'as', 'os', 'um', 'uma', 'uns', 'umas',
    'de', 'da', 'do', 'das', 'dos', 'e', 'ou',
    'em', 'na', 'no', 'nas', 'nos', 'num', 'numa',
    'por', 'para', 'pra', 'com', 'sem', 'sob', 'sobre',
    'que', 'ao', 'aos', 'à', 'às', 'é',
}
ACRONYMS = {'ia': 'IA', 'pai': 'PAI'}

TITLE_RE = re.compile(r'^(\s{4}title: ")(.*)(",?)$')


def fix_title(text: str) -> str:
    words = text.split(' ')
    out = []
    for i, w in enumerate(words):
        # Strip trailing punctuation for matching, keep it for output
        m = re.match(r'^(\W*)([\wÀ-ÿ]+)(\W*)$', w)
        if not m:
            out.append(w)
            continue
        pre, core, post = m.groups()
        low = core.lower()
        if low in ACRONYMS:
            core = ACRONYMS[low]
        elif i > 0 and low in FUNCTION_WORDS and core[:1].isupper():
            core = low
        out.append(pre + core + post)
    return ' '.join(out)


def main() -> int:
    check_only = '--check' in sys.argv
    root = os.path.join(os.path.dirname(__file__), '..', 'app', 'data', 'lessons')
    bad = 0
    for path in sorted(glob.glob(os.path.join(root, 'wm_w*_pt.ts'))):
        lines = open(path, encoding='utf-8').read().splitlines(keepends=True)
        changed = False
        for i, line in enumerate(lines):
            m = TITLE_RE.match(line.rstrip('\n'))
            if not m:
                continue
            fixed = fix_title(m.group(2))
            if fixed != m.group(2):
                bad += 1
                if check_only:
                    print(f"{os.path.basename(path)}: {m.group(2)!r} -> {fixed!r}")
                else:
                    lines[i] = m.group(1) + fixed + m.group(3) + '\n'
                    changed = True
        if changed:
            open(path, 'w', encoding='utf-8').writelines(lines)
            print(f"fixed {os.path.basename(path)}")
    if check_only and bad:
        print(f"{bad} mangled title(s) found")
        return 1
    print(f"{bad} title(s) {'found' if check_only else 'fixed'}")
    return 0


if __name__ == '__main__':
    sys.exit(main())
