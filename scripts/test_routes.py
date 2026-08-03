#!/usr/bin/env python3
"""Route tests — every lesson, every game, every page, in both languages.

Hits a running server and asserts each page returns 200 and actually renders its
content. Catches broken routes, blank pages, and server-side crashes that a
build passing does not.

Run against local:       python3 scripts/test_routes.py
Run against production:  python3 scripts/test_routes.py --base https://paiforkids.com
"""
import argparse, concurrent.futures, glob, json, os, re, subprocess, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

# Signals that a page rendered nothing useful even though it returned 200.
EMPTY_MARKERS = ('Application error', 'client-side exception', 'Internal Server Error')


def discover():
    """Collect every route the app actually defines."""
    routes = []

    # Static pages
    for page in glob.glob(os.path.join(ROOT, 'app', '**', 'page.tsx'), recursive=True):
        rel = os.path.relpath(os.path.dirname(page), os.path.join(ROOT, 'app'))
        if rel == '.':
            routes.append(('/', 'home'))
            continue
        if '[' in rel:            # dynamic segments handled below
            continue
        if rel.startswith('fake'):  # internal scratch route
            continue
        routes.append(('/' + rel.replace(os.sep, '/'), 'page'))

    # Only the high-school files (w1..w8) use their raw ids as routes. The
    # elementary and middle-school files are remapped, so their raw keys are not
    # reachable URLs — treating them as routes invented ~120 phantom 404s.
    ids = set()
    for f in glob.glob(os.path.join(ROOT, 'app', 'data', 'lessons', '*.ts')):
        if not re.fullmatch(r'w[1-8]\.ts', os.path.basename(f)):
            continue
        src = open(f, encoding='utf-8').read()
        ids.update(int(m.group(1)) for m in re.finditer(r'^\s*(\d+):\s*\{\s*$', src, re.M))
    # NOT COVERED HERE: elementary and middle-school lessons (ids 101+, including
    # every Portuguese lesson). /lesson/101 returns 404 to an anonymous request
    # because the page resolves the lesson against the signed-in student's track,
    # which lives in the browser. They need a session to test, so this suite
    # cannot cover them — verify those by hand or with a browser-driven test.
    # Failing to state that would let a green run imply coverage it does not have.
    for i in sorted(ids):
        routes.append((f'/lesson/{i}', 'lesson'))

    # Worlds — WORLD_IDS from the data, not a guessed range.
    idx = open(os.path.join(ROOT, 'app', 'data', 'index.ts'), encoding='utf-8').read()
    m = re.search(r'export const WORLD_IDS\s*=\s*\[([^\]]*)\]', idx)
    for w in re.findall(r'\d+', m.group(1) if m else ''):
        routes.append((f'/world/{w}', 'world'))

    return routes


def check(base, route, kind, timeout=45):
    url = base.rstrip('/') + route
    try:
        out = subprocess.run(
            ['curl', '-sS', '-L', '--max-time', str(timeout), '-w', '\n%{http_code}', url],
            capture_output=True, text=True)
        if out.returncode != 0:
            return route, kind, 0, f'curl failed: {out.stderr.strip()[:90]}'
        body, _, code = out.stdout.rpartition('\n')
        code = int(code) if code.isdigit() else 0
        if code != 200:
            return route, kind, code, f'HTTP {code}'
        for marker in EMPTY_MARKERS:
            if marker in body:
                return route, kind, code, f'page rendered an error: {marker!r}'
        if len(body) < 800:
            return route, kind, code, f'suspiciously small response ({len(body)} bytes)'
        return route, kind, code, None
    except Exception as e:
        return route, kind, 0, f'{e}'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', default='http://localhost:3000')
    ap.add_argument('--workers', type=int, default=6)
    a = ap.parse_args()

    routes = discover()
    print(f'checking {len(routes)} routes against {a.base}\n')

    failures = []
    by_kind = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=a.workers) as pool:
        for route, kind, code, err in pool.map(lambda r: check(a.base, *r), routes):
            by_kind[kind] = by_kind.get(kind, 0) + 1
            if err:
                failures.append((route, err))
                print(f'  FAIL {route}  {err}')

    print(f'\nchecked: ' + ', '.join(f'{v} {k}' for k, v in sorted(by_kind.items())))
    if failures:
        print(f'\nFAIL — {len(failures)} broken route(s).')
        return 1
    print('PASS — every route renders.')
    print('\nNOTE: elementary + middle-school lessons (ids 101+, all Portuguese '
          'content) are NOT covered — they need a signed-in session to resolve.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
