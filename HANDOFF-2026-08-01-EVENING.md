# PAI — state after the 2026-08-01 session (supersedes HANDOFF-2026-08-01.md)

Deployed to paiforkids.com (commit `00d45fa` + docs). All of Sonali's
2026-08-01 report is fixed, root-caused, and covered by a new test suite that
was verified to FAIL against the pre-fix build before being trusted.

## What her report actually was (reproduced, then fixed)

1. **"pressed back → everything turned English"** — no page checked whether
   the signed-in student belonged there. On a shared computer, browser
   history from the previous student's English session rendered fully, and
   every link from there kept you in the English track.
2. **"clicked middle school → put to elementary"** — same missing guard:
   /elementary/* URLs rendered for a fund2 student and nothing pulled her
   back. (PT middle school also *lives* at /elementary/middle-pt.)
3. **"saw some english things"** — /middle/world/[id] had zero Portuguese
   chrome (HOME/MODULES/UP NEXT/INTERMEDIATE); FACT/EASY badges were
   English inside PT lessons.

## The fix (structural, per her URL instinct)

- `app/data/track.ts` — one map from student (grade+lang) and content id to
  track; `homeRoute()` replaces all copied grade-branch logic.
- `useTrackGuard` in every track page: wrong-track students bounce to THEIR
  home; anonymous visitors go to onboarding; wiped localStorage heals from
  the server session (`GET /api/auth` → restore profile + progress).
- Content pages derive language from the CONTENT id (ids already encode
  language), so any URL renders identically no matter who loads it or how.
  Only the bilingual high-school track still follows `pai_lang` (that's the
  translation-overlay design).
- Full `app/[lang]/` URL restructure was considered and deliberately NOT
  done two days before distribution — guards + id-derived language give the
  same invariant with ~30 small edits instead of moving every file. A
  post-launch migration note, if ever wanted, not a prerequisite.

## New suite: `npm run test:flows` (scripts/test_flows.mjs)

Only does what a student can do — clicks, typing, back button. No
localStorage injection anywhere. Scenarios: PT signup → PT home; world/
lesson/refresh/back stay PT; shared computer (EN student then PT student,
back-button mash + deep-URL bounce); sign-out/sign-in restore; cookie-only
healing; all 6 grade/language combinations land correctly; double-Enter
race; onboarding reachable at 1366x768 and 1280x720.

**Fail-proof:** run against the pre-fix build it fails 9 checks (guard
missing, English chrome leak, no healing, broken /reset). Against the fixed
build and against prod: 39/39.

## Harness bugs fixed (the step 8 / step 11 mysteries)

- Journey step 8 looked for a "?" — quiz questions are statements. Now
  detects the True/False buttons. Passes everywhere.
- Step 11 looked for the chat trigger on the quiz screen where it never
  renders. Now returns to the lesson first. **Passes on prod in both
  languages — the first 11/11 journey runs this project has had.**
- Step 2 now retries through dev-server cold compiles instead of a fixed
  700ms pause (was the phantom webkit-tablet failure).
- Local-only caveats: step 11 cannot pass against localhost (no Groq key
  locally — Vercel stores it write-only; and `devIndicators: false` was
  added because the Next dev overlay sat exactly over the chat button and
  ate its clicks).
- Pressure tester now labels the app's own 429 daily-cap reply as
  DAILY-CAP (the limiter working) instead of REQUEST-FAILED.

## Also fixed this session (from the open-issues list)

- /reset now wipes all pai_* keys AND the session cookie — delivered the
  welcome screen first try on prod (was 1-in-6).
- Signal Drop EN instructions described the old catch/dodge concept; the
  game is pong. Rewritten to match the PT ones.
- 280px exit-button bug root-caused: overflowing game content widened the
  mobile layout viewport, dragging the fixed button off-screen. Games
  layout now clips horizontal overflow. Verified via journey chromium 280.
- 37 mangled PT module titles ("Definindo A Ia") normalized;
  `scripts/fix_pt_titles.py --check` guards regressions.
- FACT/EXAMPLE/EASY → Fato/Exemplo/Fácil (+ Big idea/Hot take/Medium/Hard)
  on PT content, driven by content id.
- Connections dev footer removed. Abandoned draft lessons 161–164 deleted.
- Pig videos re-exported with white padding on the clipped sides (originals
  in .backups/videos-BAK-0801/). Verified on prod.
- PT lesson 311 slide parity restored (EN had split slide 4 into two during
  the review sync; PT now split identically — translation of already
  approved content, flagged to Sonali).
- Onboarding card capped at viewport height (school laptops).

## Local development (new)

- `lib/db.ts` falls back to an embedded PGlite database (`.dev-db/`,
  gitignored) when DATABASE_URL is missing/invalid outside production. The
  full signup/login/progress flow now works offline. Prod path unchanged.
- Why needed: `vercel env pull` writes the literal string "[SENSITIVE]" for
  every secret (they are write-only sensitive vars). This is normal; the
  server-side values are intact — confirmed by a redeploy that predated
  today's work. Do not try to "fix" the env vars.
- Local chat cannot reach Groq (no key) — chat tests only prove out against
  prod/preview.

## Verified on prod after deploy (2026-08-01)

- test:flows 39/39 · test:routes 136/136 · journey chromium 360x640 EN and
  PT both 11/11 (incl. real chat refusal, both languages)
- Pressure test: 28 adversarial replies verified clean, remainder blocked
  by the app's own daily cap (correct behavior; tester now labels it so)
- Visual: welcome pig unclipped; /middle/world/261 fully Portuguese

## Still open

1. ~~Connections puzzle content~~ DONE (Sonali approved same day): kid-level
   "Spot the AI" / "Encontre a IA" live in both languages; the engine's
   isPT prop is now actually passed (PT students used to get English
   controls); played to a clean win in PT on prod. First game verified
   through an actual win — the other 27 still only load/exit-tested.
2. Rafa before camp: confirm Groq spend cap + PAID tier (free tier =
   1K requests/day = dead chat on day one at 5,000 kids). See
   `RAFA-BEFORE-CAMP.md`.
3. zz_* QA accounts on the prod DB (grew again today from prod suite runs)
   — safe to delete any time.
4. test:games still verifies load/exit only — no game played to win/loss.
5. /mobile mirror tree exists but is only reachable via /dev; untouched by
   today's guard work.
6. Full 3-engine journey matrix was run against LOCAL (clean except the two
   local-only chat caveats); prod matrix run was chromium-only to spare the
   chat cap. Nightly re-verification should alternate engines.
