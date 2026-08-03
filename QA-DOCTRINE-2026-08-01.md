# Why we keep finding new bugs — retrospective, doctrine, and the 100% plan

Requested by Sonali 2026-08-01 before the next full pass: look at everything we
found, explain why each was missed, control for those causes, and design a way
to find what we're *still* missing — including controlling for LLM
confirmation bias. This document is the thinking; the harnesses it prescribes
are in `scripts/` and every claim in it is falsifiable.

---

## Part 1 — Every bug we've found, and why the previous net missed it

| # | Bug | Why it was missed |
|---|---|---|
| 1 | Back button strands PT student in English elementary track | No test ever pressed Back; no test had TWO students share a browser; suites injected `pai_lang` instead of choosing it |
| 2 | English chrome on PT world pages (MODULES / UP NEXT) | Tests asserted the page *renders*, never that the wrong language is *absent* |
| 3 | Middle-schooler stranded on elementary home | No page checked ownership; no test asserted "who should be here" |
| 4 | Language buttons unreachable at 768px-high laptops | Viewport list assumed *kids = phones*; school computers weren't in the size list. Found by accident |
| 5 | /reset left you signed in (1-in-6 welcome) | Fixed key list; nobody tested /reset as a feature |
| 6 | Signal Drop EN instructions described a different game | No test compares instructions to gameplay; humans had read the PT text (correct) and assumed EN matched |
| 7 | Login with grade-less account lands on unchosen track | Nobody imagined an interrupted signup as a persistent state |
| 8 | Connections PT strings existed but were never wired (missing prop) | Games tested load/exit only; the code "looked right" on review |
| 9 | EN/PT slide count mismatch (211 vs 311) | Content edit shipped without running the parity suite; no commit gate |
| 10 | Exit button off-screen at 280px | Symptom known, mechanism not: overflowing content widens the mobile layout viewport, dragging fixed elements off-screen |
| 11 | Journey step 8 "never reached quiz" on all 36 runs | Harness looked for "?" — quiz questions are statements. Harness assumption never checked against the real UI |
| 12 | Journey step 11 "no chat trigger" | Harness looked on a screen where the trigger never renders |
| 13 | Pressure tester called the app's own rate-cap a server failure | Harness can't tell "defended correctly" from "broken" |
| 14 | Next dev overlay ate the chat button's clicks in local runs | Environment artifact polluting results |

And two of **my own** misses from today, kept here deliberately:

| 15 | I nearly declared a production emergency over `[SENSITIVE]` env vars | I pattern-matched "sanitized secrets = broken deploys" and started acting on it. A 3-hour-old successful redeploy falsified it. Lesson: I acted on a dramatic hypothesis before seeking the cheap disconfirming evidence that existed |
| 16 | The handoff said Connections was "English-only" — false; a PT file existed and the bug was a missing prop | I nearly built a duplicate PT file because I trusted a prior session's claim instead of looking. Handoffs and memories are *hypotheses*, not facts |

## Part 2 — The seven failure classes (generalized)

Every bug above belongs to one of these. The next net is built per-class, not
per-bug — the goal is that each *class* has a mechanical detector.

**A. State injection.** Tests teleported the app into states no student passes
through, so everything about *reaching* states was untested.
→ Control: `test_flows.mjs` (exists) — only ever does what a student can do.

**B. Presence-only assertions.** We asserted the right thing exists, never
that the wrong thing is absent. English on a PT page passes a "renders" check.
→ Control: NEW absence sweep (`test_sweep.mjs`) — every page × every persona,
forbidden-token lists (wrong-language chrome, dev artifacts, `undefined`,
`NaN`, `[object Object]`, `[SENSITIVE]`), console errors, blank pages,
horizontal overflow.

**C. Single-actor worldview.** One clean kid, one clean browser, forever.
Reality: shared machines, sequential kids, stale history, abandoned sessions.
→ Control: flows S3-S5 (exist) + NEW: two tabs open at once, refresh
mid-quiz, abandoned mid-signup, chat offline.

**D. Hidden population assumptions.** "Kids use phones" excluded laptops;
"users finish signup" excluded grade-less accounts. These are invisible
because they're baked into the *test data*, not the test logic.
→ Control: Part 3's use inventory was built by enumerating personas ×
environments × behaviors *before* deciding what's testable, and the sweep's
matrix (routes from the filesystem, personas from the data model) is
generated, not remembered.

**E. Unvalidated harnesses.** The tests had their own bugs and their own
assumptions ("quiz has a ?"). A harness is code; code lies.
→ Control: MUTATION RUNS — before trusting any new detector, deliberately
break the app in a worktree (remove a guard, plant English on a PT page,
plant `undefined`, break a console) and confirm the detector fires. A
detector that has never fired is presumed broken.

**F. Happy-path directionality.** Forward-only scripted flows can't imagine
weird sequences.
→ Control: NEW monkey test (`test_monkey.mjs`) — seeded random walks
(clicks, back, forward, reload, typing garbage) with INVARIANT MONITORS:
never a console error, never wrong-track content for the signed-in student,
never a dead-end without an interactive element, never horizontal scroll.
The monkey doesn't know our assumptions, which is precisely its value.

**G. Outcome blindness.** No game played to win/loss; no quiz completed
wrong-then-right in every track.
→ Control: Connections now has a played-to-win test path; the flows suite
answers quizzes both ways. Remaining 27 games stay load/exit-tested — cost
of full play-through automation is high; the monkey partially covers it, and
this gap stays DOCUMENTED as a gap rather than silently absorbed.

## Part 3 — The use inventory (who × where × how)

**Personas (8):** EN elementary · EN middle · EN high school · PT fund1 ·
PT fund2 · PT médio (HS track w/ translation overlay) · anonymous visitor
(shared link) · teacher demoing to a class. All eight exist in the sweep
matrix; "teacher" = an account that jumps across many lessons quickly.

**Environments:** shared school desktop (many kids/day — THE deployment
reality) · old Android Chrome 360×640 · 768px school laptop · tablet ·
280px foldable · slow/flaky school WiFi · offline mid-session · incognito
(storage vanishes on close) · browser auto-translate turned on (Chrome will
offer to translate the EN app for PT kids — worth one manual check) ·
two tabs of the app at once.

**Behaviors:** back/forward mashing · refresh mid-quiz · double-click and
Enter-spam everything · bookmark a lesson and return weeks later · share a
lesson URL to a friend on a different track · sign out mid-lesson · walk
away mid-quiz · type emoji/accents/spaces into username · zoom 200% ·
rotate to landscape · click during transition animations.

**System states:** Groq down or rate-limited (chat must degrade politely,
never crash the lesson) · DB down · daily/monthly cap boundaries · a deploy
happening while a tab is open (stale chunk 404s — known Next.js failure
mode; UNTESTED, documented as accepted risk) · month rollover for caps.

## Part 4 — Controls for LLM confirmation bias (the part Sonali asked for)

The failure mode: an LLM forms a hypothesis from the handoff, the memory, or
the first file it reads, then *finds* what it expects. Bugs 15 and 16 above
are exactly this. Willpower doesn't fix it; structure does.

1. **Priors are hypotheses.** Any claim inherited from a handoff, a memory,
   or an earlier session gets re-verified by direct observation before any
   work builds on it — if the check costs under a minute, always. (The
   Connections "English-only" claim failed this and cost nothing to check.)
2. **Predict before running.** Before each suite run, write the predicted
   outcome. If every prediction comes true across a whole session, the tests
   are probably not probing anything new — track the surprise rate. Zero
   surprises is a red flag about the tests, not evidence of quality.
3. **Falsification-first.** Unchanged rule, now applied to every NEW
   detector via mutation runs (Part 2E). A green that has never been seen
   red is not evidence.
4. **Fresh-context adversary.** After I declare everything green, a separate
   agent with a CLEAN context — no access to my reasoning, only the deployed
   URL and the claim list — attacks the claims and tries to construct
   counterexamples. It can't inherit my anchoring because it never sees it.
   (One at a time — the parallel-browser-agents rule stands.)
5. **Behavior over code-reading.** "The code looks right" is never a
   verification (bug 8 looked right). Only observed behavior in a real
   browser counts as evidence, and the observation goes in the report.
6. **Absence checks are mechanical, not judgment calls.** Judgment is where
   bias lives; token lists and invariant monitors don't have priors.
7. **Cheapest disconfirming evidence first.** Before acting on any alarming
   hypothesis, ask: what single observation would kill this? Get it. (Bug
   15: "did the last redeploy work?" — one command.)

## Part 5 — The run plan (execution order)

1. Build `test_sweep.mjs` (absence sweep, full route×persona matrix) and
   `test_monkey.mjs` (seeded random walk with invariants).
2. **Mutation-validate both** in a broken worktree: unguarded page, planted
   English chrome on middle-pt, planted `undefined` in a body, planted
   console error, removed exit button. Every detector must fire; any that
   doesn't gets fixed before its output is ever believed.
3. Extend `test_flows.mjs`: two-tab sync, refresh mid-quiz, chat-down
   degradation, Enter-spam + double-click pass.
4. Full local run: flows + sweep + monkey + journey (3 engines × 6 sizes ×
   2 langs) + content + lint + routes + viewports + games + build.
5. Prod run: flows, routes, sweep (prod), journey (chromium, both langs),
   monkey (short, seeded), pressure test (respecting the daily cap budget).
6. Fresh-context adversary pass against prod (Part 4.4).
7. Human 15-minute script for Sonali — the judgment-only items no machine
   can do: does the Portuguese read like a person wrote it; is anything
   confusing or embarrassing; does the tone fit; try browser auto-translate.

Predictions, results, and surprises recorded in `QA-RUN-2026-08-01.md`.
