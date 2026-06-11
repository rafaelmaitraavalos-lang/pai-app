#!/usr/bin/env python3
"""
Parse PT-BR games content doc and generate gamesContent_pt.ts

Usage: python3 scripts/gen_pt_games.py
"""
import docx, re, os, sys

DOCX = '/Users/rafa/Downloads/_All Games content pt-BR.docx'
APP  = os.path.join(os.path.dirname(__file__), '..')

GAME_SLUG_MAP = {
    'O ANALISTA':               'analyst',
    'QUEDA DE SINAL':           'signal-drop',
    'STATIC':                   'static',
    'SALA DE MUSCULACÃO':       'weight-room',
    'SALA DE MUSCULAÇÃO':       'weight-room',
    'MODOS DE FALHA':           'failure-modes',
    'O FEED':                   'the-feed',
    'SCAN DIÁRIO':              'daily-scan',
    'TRAJETÓRIAS DE DADOS':     'data-trails',
    'A CHAMADA':                'the-call',
    'FONTES DE VIES':           'bias-sources',
    'FONTES DE VIÉS':           'bias-sources',
    'TIPOS DE TRANSPARÊNCIA':   'transparency',
    'A ESTRUTURA':              'the-framework',
    'PODE OU NÃO PODE':         'can-or-cant',
    'O QUE É AGI':              'what-is-agi',
    'O RECURSO':                'the-resource',
    'FLUXO DE SINAL':           'signal-flow',
    'PARTES DO TRANSFORMADOR':  'transformer',
    'O GRADIENTE':              'the-gradient',
    'PROMPT DROP':              'prompt-drop',
    'PARTES DO AGENTE':         'agent-parts',
    'LANÇAR':                   'ship-it',
    'MULTIMODAL':               'multimodal',
    'CONCEITOS DE FRONTEIRA':   'frontier',
    'DISPATCH':                 'dispatch',
}

GAME_HDR = re.compile(r'^([A-ZÁÀÂÃÉÊÍÓÔÕÚÇÑ\s]+)\s+—\s+W\d+\s+M\d+$')

def clean(s):
    return (s.replace('"','"').replace('"','"')
             .replace(''', "'").replace(''', "'").strip())

def esc(s):
    return s.replace('\\','\\\\').replace('"','\\"').replace('\n', ' ')

def parse_games(paras):
    games = {}
    cur_slug = None
    cur_section = None
    buf = []

    def flush():
        if cur_slug and cur_section and buf:
            text = ' '.join(buf).strip()
            if cur_slug not in games: games[cur_slug] = {}
            if cur_section in games[cur_slug]:
                if isinstance(games[cur_slug][cur_section], list):
                    games[cur_slug][cur_section].append(text)
                else:
                    games[cur_slug][cur_section] += ' ' + text
            else:
                games[cur_slug][cur_section] = text

    SECTIONS = {
        'Intersticial': 'intro',
        'HUD': 'hud',
        'Captura de reações': 'catch_reacts',
        'Reações de captura': 'catch_reacts',
        'Reações de desvio': 'dodge_reacts',
        'Reações de falha': 'miss_reacts',
        'Itens a capturar': 'catch_items',
        'Itens a evitar': 'dodge_items',
        'Tela final': 'end_screen',
        'Fichas informativas': 'facts',
        'Rótulo redondo': 'round_label',
        'Tela de fim': 'end_screen',
        'Medidor de credibilidade': 'credibility',
        'PAI correto': 'pai_correct',
        'PAI incorreto': 'pai_incorrect',
        'Rótulos de botão': 'buttons',
        'Reações do PAI — consenso': 'consensus',
        'Reações do PAI — desacordo': 'disagree',
        'Reações': 'reactions',
        'Etiquetas': 'labels',
        'Revelação': 'reveal',
        'Grupos': 'groups',
    }

    for p in paras:
        # Game header
        mh = GAME_HDR.match(p)
        if mh:
            flush(); buf = []
            name = mh.group(1).strip()
            cur_slug = GAME_SLUG_MAP.get(name)
            if not cur_slug:
                # fuzzy match
                for k,v in GAME_SLUG_MAP.items():
                    if k in name or name in k:
                        cur_slug = v; break
            cur_section = None
            continue

        if cur_slug is None: continue

        # World header — skip
        if re.match(r'^MUNDO\s+\d+$', p): continue

        # Section header
        sec = SECTIONS.get(p)
        if sec:
            flush(); buf = []
            cur_section = sec
            # Init as list for multi-value sections
            if sec in ('catch_reacts','dodge_reacts','miss_reacts','facts','groups') and cur_slug not in games:
                games.setdefault(cur_slug, {})[sec] = []
            elif sec in ('catch_reacts','dodge_reacts','miss_reacts','facts','groups'):
                games[cur_slug].setdefault(sec, [])
            continue

        # Round content (interstitial games)
        round_m = re.match(r'^Rodada\s+(\d+)$', p)
        if round_m:
            flush(); buf = []
            cur_section = f'round_{round_m.group(1)}'
            games.setdefault(cur_slug, {})[cur_section] = ''
            continue

        # Group content (connections games)
        group_m = re.match(r'^Grupo\s+(\d+)$', p)
        if group_m:
            flush(); buf = []
            cur_section = f'group_{group_m.group(1)}'
            continue

        if cur_section:
            buf.append(clean(p))

    flush()
    return games

def gen_ts(games):
    lines = [
        "// PT-BR game content translations",
        "// Generated by scripts/gen_pt_games.py",
        "",
        "export type GameContentPT = {",
        "  intro?:        string",
        "  end_screen?:   string",
        "  catch_reacts?: string[]",
        "  dodge_reacts?: string[]",
        "  miss_reacts?:  string[]",
        "  facts?:        string[]",
        "  [key: string]: string | string[] | undefined",
        "}",
        "",
        "const GAMES_PT: Record<string, GameContentPT> = {",
    ]
    for slug, data in sorted(games.items()):
        lines.append(f'  "{slug}": {{')
        for k, v in data.items():
            if isinstance(v, list):
                items = ', '.join(f'"{esc(i)}"' for i in v if i.strip())
                lines.append(f'    {k}: [{items}],')
            else:
                lines.append(f'    {k}: "{esc(v)}",')
        lines.append('  },')
    lines += ['}', '', 'export default GAMES_PT', '']
    return '\n'.join(lines)

def main():
    sys.stderr.write(f'Reading {DOCX}...\n')
    doc = docx.Document(DOCX)
    paras = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
    sys.stderr.write(f'  {len(paras)} paragraphs\n')

    games = parse_games(paras)
    sys.stderr.write(f'  {len(games)} games parsed\n')
    for slug, data in sorted(games.items()):
        sys.stderr.write(f'    {slug}: {list(data.keys())}\n')

    ts = gen_ts(games)
    out = os.path.join(APP, 'app', 'data', 'gamesContent_pt.ts')
    with open(out, 'w', encoding='utf-8') as f:
        f.write(ts)
    sys.stderr.write(f'\nWrote {out}\n')

if __name__ == '__main__':
    main()
