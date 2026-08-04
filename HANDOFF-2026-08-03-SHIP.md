# PAI — SHIP-DAY HANDOFF (2026-08-03) — read this first in any new session

Supersedes HANDOFF-2026-08-01-EVENING.md (keep it for history). Today the app
ships to ~5,000 Brazilian students. Everything below is deployed to
paiforkids.com and verified against the exact shipping build.

## State: SHIPPED AND GREEN

Final verification on the shipping deploy (last commits: a571825):
- flows 48/48 · full sweep 1,274 page loads × 7 personas clean · routes
  136/136 · journey 11/11 chromium EN and PT (incl. live Groq chat)
- Six-persona full-curriculum run (test_ship_night.mjs): elementary 14/14,
  middle 40/40, high school 63/63 lessons in BOTH languages, ~936 quiz
  answers all truth-consistent, world unlocks asserted, progress survives
  sign-out/sign-in, zero wrong-language chrome, zero page errors — 36/36,
  run twice (after content fixes, and again on the final build)

## The documents that matter (all in repo root)

- `QA-DOCTRINE-2026-08-01.md` — why bugs kept slipping through; seven
  failure classes each with a mechanical detector; LLM-confirmation-bias
  controls (predictions before runs, priors-as-hypotheses, mutation-validate
  every detector, fresh-context adversary). FOLLOW THIS in future work.
- `QA-RUN-2026-08-01.md` — the full predictions-vs-results log.
- `QUIZ-EXPLANATION-RISK.md` — blind assessment of machine-written
  explanations: zero harmful/confusing in 354; PT scored cleaner than the
  human-approved EN control; 3 factual defects found (all in human-era
  content) and fixed in both languages.
- `PT-PROFESSIONAL-DIFF.md` — audit of every replaced professional-PT field:
  25/26 one-to-one replacements tracked approved EN content changes; ZERO
  stylistic rewrites of the professional's conversational prose.
- `PT-REVIEW-PACK.md` — 30-min native-speaker spot-read pack + the standing
  machine layers guarding Portuguese without a translator.
- `RAFA-BEFORE-CAMP.md` — his list. STILL OPEN: (1) confirm Groq PAID tier
  (free tier = 1K requests/day = chat dies day one) and (2) the ~$50 spend
  cap screenshot. Analytics needs NOTHING (enabled, collecting; earlier
  note retracted). Connections puzzle suggestion can wait until after camp.

## Test infrastructure (all in scripts/, mutation-validated)

- `npm run test:flows` — real-UI flows: language chosen by clicking, back
  walks, shared computer, sign-out/in, heal, two tabs, refresh mid-quiz,
  chat-down, double-Enter, laptop viewports. 48 checks.
- `node scripts/test_sweep.mjs [--full]` — absence sweep, every route ×
  persona: wrong-language chrome, dev artifacts, console errors, blank
  pages, overflow, guard redirects, game exits.
- `node scripts/test_monkey.mjs --seed N` — seeded random walks + invariants.
- `node scripts/test_ship_night.mjs` — six students walk their ENTIRE
  curriculum on prod; hard per-persona lesson-count expectations; verdict
  truth-checking without an answer key (badge ✓/✕ vs stated answer).
- `node scripts/harvest_game_text.mjs <base> pt|en` — plays into all 28
  games as a student, flags wrong-language text (validated: fires 28/28 on
  the wrong language).
- journey/viewports/games/routes/content/lint suites as before; lint now
  hard-fails ALL scaffold-explanation signatures (EN + PT) and unmapped tags.
- `scripts/fix_pt_titles.py`, `fix_pt_explanations.py`, `apply_pt_review.py`
  — idempotent content fixers with --check modes.

## What changed since the 08-01 evening handoff (all deployed)

1. Content: 149 PT middle explanations rebuilt (were generator scaffolding),
   +10 more found by editorial review (2nd scaffold signature), 3 factual
   fixes EN+PT (AlphaFold mechanism, AGI/jobs misattribution, Turing
   priority hyperbole — the SLIDE keeps the hyperbole, Sonali's call),
   5 EN scaffold fragments, 120 EN + 504 PT-overlay high-school
   explanations got the "answer is..." prefix (the 07-31 pass missed both).
2. Guards/UX: /games + all games require sign-in; bilingual 404; PT
   onboarding errors actually in PT; username sanitize preview ("João" →
   shows "joo" before account creation); session heal can no longer destroy
   a valid cookie on transient errors; /about renders blank until language
   known; middle-pt home greeting.
3. The mascot video saga (READ BEFORE TOUCHING THE VIDEOS):
   - The four animation videos were GENERATED with the pig cropped inside
     the frames — flat-cut ears/feet at motion extremes. Not fixable by
     padding (pixels don't exist). Sonali has accepted the occasional clip
     in exchange for the full 5.2s dance: public/*.mp4 are the start-of-
     08-03 padded versions, HER EXPLICIT CHOICE after trying alternatives
     (static mascot + CSS float: "not dancing"; trimmed clean-segment
     loops: "just clapping"). The clean loops live in .backups and the
     analysis pipeline is in the session log. The real fix is regenerating
     animations from source — Rafa, post-camp.
   - `AutoplayVideo` component wraps ALL 11 video usages: React never
     renders the muted attribute and iOS requires muted-at-parse for
     autoplay; the wrapper forces muted, retries play() on mount, and
     starts playback on first touch (covers Low Power Mode). This killed
     the ▶ overlay Sonali saw on mobile — a latent June bug.
4. Rafa's analytics: enabled and collecting (API-verified). The tracker
   ignores automated browsers — so tests can't see it AND test traffic
   doesn't pollute his data. Blocked-tracker (school filters) verified
   harmless.

## Gotchas that will bite future sessions (hard-won today)

- Test browsers BLOCK VIDEO AUTOPLAY: every screenshot shows frame zero.
  Seek videos to specific timestamps before capturing. Frame-scan assets
  (all frames, interior truncation too) — edge clearance isn't enough.
- @vercel/analytics is invisible to Playwright by design — don't diagnose
  it with automation.
- innerText reflects CSS text-transform: match case-insensitively.
- Never pipe harness output through `tail` — full output to files.
- `vercel env pull` writes literal "[SENSITIVE]" (write-only vars). Server
  values are fine. Local dev uses PGlite (.dev-db); local prod-mode server:
  PAI_DEV_DB=1 npx next start. No Groq key exists locally — chat proves out
  only on prod.
- HS world page is "/lessons" (substring-matches "/lesson"!); HS worlds are
  accordions whose animations eat automated clicks — walk HS lessons by
  direct URL (/lesson/1..63).
- The CLI's Vercel auth is Sonali's own account (sonalim-9623) on Rafa's
  team; API calls with its token work for project state.
- git: another human (Rafa) pushes to main — always fetch/rebase, never
  force.

## Open items (post-ship)

1. Rafa: Groq paid tier + spend cap (CRITICAL, see RAFA-BEFORE-CAMP.md).
2. Prod DB cleanup: zz_qa_*, zz_adv_*, zz_ship_*, zz_sweep_bot,
   zz_monkey_bot + three unprefixed (`scriptalert1`, `zzadvsp3126`,
   `bzz_adv_bold3126b`). Needs DB access (Neon console via Rafa, or an
   admin script server-side).
3. Regenerate mascot animations from source (Rafa, post-camp) — drop-in
   replacement of public/*.mp4, zero code changes.
4. Connections puzzle style items + PT should-improve list (PT-REVIEW-PACK).
5. Known cosmetics, tracked not blocking: header tap targets under 32px,
   /home slow-device redirect flash, route-naming inconsistency (candidate
   post-launch refactor: app/[lang]/ structure), 27 games never played to
   win/loss by automation, /mobile tree unused and unguarded.
6. Nightly re-verification per the standing memory: cold-rerun the battery;
   alternate journey engines; pressure test respects the daily chat cap
   (tester labels cap-hits DAILY-CAP).

## First hours of launch — what to watch

- Groq rate limits are THE capacity risk (2 model calls per chat question).
  Symptoms: chat "unreachable" messages spike. Mitigations already live:
  per-user caps 5/day 25/month, answer cache, sitewide breaker, retry.
- Vercel Analytics tab now shows real student traffic (Rafa's login, or
  Sonali's own account can view).
- If anything breaks: `git revert` the offending commit and push — deploys
  are ~35s. Videos/back-out states all in .backups/.
