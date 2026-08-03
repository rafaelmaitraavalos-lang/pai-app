# Suggested replacement for the Connections puzzle (NOT applied)

Current state (`app/data/samplePuzzle.ts`): the live puzzle is graduate-level —
"Samples from distributions", "RAG pipeline", "Constitutional AI", "Attention
heads" — and English-only, shown to all tracks including Portuguese students.
Per the content rule these are suggestions for you/Rafa to approve, not edits
I have made.

## Suggested puzzle — middle-school level (English)

**Title:** Spot the AI

| Group (difficulty) | Cards |
|---|---|
| Things AI is great at (1) | Spotting patterns · Translating languages · Recommending videos · Finding spam |
| Things AI struggles with (2) | Knowing what's true · Common sense · Feelings · Very new events |
| Where AI hides in your day (3) | Autocomplete · Face unlock · Music shuffle · Map directions |
| People from AI history (4) | Alan Turing · Ada Lovelace · John McCarthy · Garry Kasparov |

All sixteen concepts already appear in the middle-school curriculum (Worlds
201/261 and the glossary), so nothing here is new material.

## Suggested puzzle — Portuguese (same groups)

**Título:** Encontre a IA

| Grupo (dificuldade) | Cartas |
|---|---|
| Coisas que a IA faz bem (1) | Encontrar padrões · Traduzir idiomas · Recomendar vídeos · Filtrar spam |
| Coisas difíceis para a IA (2) | Saber o que é verdade · Bom senso · Sentimentos · Fatos muito recentes |
| Onde a IA se esconde no seu dia (3) | Autocompletar · Desbloqueio facial · Música aleatória · Rotas no mapa |
| Pessoas da história da IA (4) | Alan Turing · Ada Lovelace · John McCarthy · Garry Kasparov |

## Wiring note (code change I can make once content is approved)

`ConnectionsGame` takes any `Puzzle` object; adding a `samplePuzzle_pt` and
selecting it for Portuguese students (by track, same mechanism as the rest of
today's language work) is a ten-minute change once you approve the words.
