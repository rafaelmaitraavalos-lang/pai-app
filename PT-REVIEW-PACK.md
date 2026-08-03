# Portuguese review pack — for Rafa (or any native pt-BR reader), ~30 min

We no longer have a dedicated translator. Machine layers now guard the
Portuguese (details at the bottom), but two things still deserve a native
speaker's eyes. Nothing here blocks launch — the must-fix defects found by
the editorial review are already corrected and deployed.

## 1. Spot-read the newest translated content (~20 min)

The 160 middle-school quiz explanations (worlds W01–W05 under Fundamental II)
were machine-translated on 2026-08-01 and machine-reviewed against the
English source (result: ~10% had defects, all corrected). A native
spot-check of ANY 10–15 quizzes would meaningfully raise confidence:
sign in as a Fundamental II student → any world → any module → skip to the
quiz ("Pular") → answer and READ THE EXPLANATION aloud. Flag anything that
sounds like a gringo wrote it.

Also worth 2 minutes each:
- Lesson "Definindo a IA" (W01·01), slides 4–5 — newly split/translated.
- The Connections game ("Encontre a IA") — new PT puzzle + controls.
- Sign-up error messages: try a taken username and a wrong username in the
  Portuguese flow.

## 2. Style calls a machine shouldn't make (your taste, 5 min)

From the editorial review's should-improve list — none applied, all await a
human yes/no:
1. Greeting "Pronto para aprender sobre IA?" is masculine-flavored for a
   mixed audience. Alternative: "Tudo pronto para aprender sobre IA?"
   (If yes: change it on BOTH elementary and middle-pt homes, consistently.)
2. Standardize "caixa preta" vs "caixa-preta" (both appear; hyphenated is
   the editor's recommendation) — mechanical, one decision.
3. "raios-X" → "raios X" (current orthography).
4. "conteúdo inflamado" → "conteúdo inflamatório" (347.2).
5. Question wording uses English terms ("backpropagation", "gradient
   descent") while explanations use Portuguese ("retropropagação",
   "gradiente descendente") — pick a policy: PT term with EN gloss on first
   use is the editor's suggestion.
6. "Lei de IA da UE" vs "AI Act da União Europeia" — pick one form.
7. A few calques flagged as awkward-but-not-wrong: "engarrafar o
   conhecimento" (316.1), "os benefícios ficam estreitos" (354.2),
   "dá a você maior engajamento informado" (338.3).

Say the word on any of these and the edits are five minutes of scripted work.

## What now guards Portuguese without a translator (standing layers)

1. **Absence sweep** — every page × Portuguese personas, flags any English
   chrome token (runs in the standard test battery).
2. **Games harvest** (`node scripts/harvest_game_text.mjs <base> pt`) —
   plays into all 28 games as a Brazilian student and flags English; the
   detector is validated (it lights up 28/28 when pointed at English).
3. **Content lints** — the two known broken-generator signatures
   (question-stem explanations) now hard-fail `npm run lint:lessons`; so do
   lesson tags with no Portuguese label.
4. **Editorial-review pattern** — any new batch of translated content gets a
   fresh-context pt-BR editor pass against the English source BEFORE it
   ships (meaning-fidelity + naturalness + register, must-fix/should-improve
   report). This is what caught the 10% defect rate in the first batch.
5. **The camp itself** — 5,000 native speakers. If a feedback channel ever
   exists (even a teacher emailing screenshots), route it to the repo.

What these layers can NOT do: certify that prose sounds native. That is why
item 1 above exists, and why any future large content batch should still get
at least a spot-read by a Brazilian.
