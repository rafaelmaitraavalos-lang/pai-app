# How dangerous are the machine-written quiz explanations? — independent assessment

Question asked by Sonali 2026-08-02, before ship. Her prior: "not a huge
deal — these are just quiz explanations." Method chosen so the assessment
could disagree with both of us.

## Method

Two independent, fresh-context assessors. Neither knew who wrote any text,
that Portuguese was under suspicion, or that the human-approved English
explanations were mixed in as a calibration control. Corpus: all 228
Portuguese explanations (160 middle + 68 elementary) + 126 English controls,
shuffled. Assessor 1: facts and logic only. Assessor 2: what a student of
the target age actually experiences, graded 0 (fine) / 1 (awkward) /
2 (confusing) / 3 (harmful).

## Results

**Harm: zero.** 354 items — no grade-3 (harmful), no grade-2 (confusing).
344 grade-0, 10 grade-1 (awkward but the student takes away the right idea).
No explanation anywhere contradicts its RIGHT/WRONG verdict — the one
failure mode that would genuinely mislead a child during a quiz.

**The Portuguese scored cleaner than the human-approved English.** The 160
machine-translated middle-school PT explanations: 159/160 clean — the best
set in the corpus. The approved EN middle set: 58/64, including five
explanations that were still raw multiple-choice fragments ("...is best
described as: —") — the same scaffold-leak disease we fixed in Portuguese,
sitting undetected in English.

**Facts: 3 real defects in 354 items — every one already present in the
human-era content, in BOTH languages:** an elementary AlphaFold explanation
inventing a false mechanism ("read millions of scientific articles"); a
question misattributing job-displacement fears to AGI in contradiction with
the rest of the curriculum; a "nobody had ever asked before" hyperbole about
Turing. All six affected items (EN + PT) corrected on 2026-08-02, before
ship. The Turing hyperbole ALSO appears in an approved slide (L101.S2) —
left as-is, flagged as Sonali's call.

## Verdict

Sonali's instinct is confirmed, with evidence: the machine-written
explanations are not a meaningful risk. Zero harmful items; error profile
equal to or better than the professionally-reviewed English; and the audit's
main practical yield was defects in the HUMAN-approved content, now fixed.
The lint now hard-fails all scaffold signatures in both languages, so this
class cannot ship again.

Residual known cosmetics (grade-1, not blocking): the shared
control-vs-responsibility non-sequitur duplicated in both languages
(approved content), one EN persona-break ("a chatbot like me"), and a
leading-quote artifact on some PT middle questions.
