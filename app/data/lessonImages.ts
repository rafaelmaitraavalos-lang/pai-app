// Worlds 1–5: local files downloaded by scripts/fetch-images.py
// Worlds 6–8 (lessons 40–63): direct Unsplash CDN URLs, curated per-module
export const LESSON_IMAGES: Record<number, string> = {
  1:  '/images/lessons/lesson-1.jpg',
  2:  '/images/lessons/lesson-2.jpg',
  3:  '/images/lessons/lesson-3.jpg',
  4:  '/images/lessons/lesson-4.jpg',
  5:  '/images/lessons/lesson-5.jpg',
  6:  '/images/lessons/lesson-6.jpg',
  7:  '/images/lessons/lesson-7.jpg',
  8:  '/images/lessons/lesson-8.jpg',
  9:  '/images/lessons/lesson-9.jpg',
  10: '/images/lessons/lesson-10.jpg',
  11: '/images/lessons/lesson-11.jpg',
  12: '/images/lessons/lesson-12.jpg',
  13: '/images/lessons/lesson-13.jpg',
  // 14: missing
  15: '/images/lessons/lesson-15.jpg',
  16: '/images/lessons/lesson-16.jpg',
  17: '/images/lessons/lesson-17.jpg',
  18: '/images/lessons/lesson-18.jpg',
  19: '/images/lessons/lesson-19.jpg',
  20: '/images/lessons/lesson-20.jpg',
  21: '/images/lessons/lesson-21.jpg',
  22: '/images/lessons/lesson-22.jpg',
  23: '/images/lessons/lesson-23.jpg',
  24: '/images/lessons/lesson-24.jpg',
  25: '/images/lessons/lesson-25.jpg',
  26: '/images/lessons/lesson-26.jpg',
  27: '/images/lessons/lesson-27.jpg',
  28: '/images/lessons/lesson-28.jpg',
  29: '/images/lessons/lesson-29.jpg',
  30: '/images/lessons/lesson-30.jpg',
  31: '/images/lessons/lesson-31.jpg',
  32: '/images/lessons/lesson-32.jpg',
  33: '/images/lessons/lesson-33.jpg',
  34: '/images/lessons/lesson-34.jpg',
  35: '/images/lessons/lesson-35.jpg',
  36: '/images/lessons/lesson-36.jpg',
  37: '/images/lessons/lesson-37.jpg',
  38: '/images/lessons/lesson-38.jpg',
  39: '/images/lessons/lesson-39.jpg',

  // ── World 6: How Neural Networks Work ───────────────────────────────────────
  // 40: neuron synapse under microscope — weighted sums, composition of neurons
  40: 'https://images.unsplash.com/photo-1719650592946-55163c4994cb?auto=format&fit=crop&w=1200&q=80',
  // 41: fiber optic light cables — data flowing forward through layers
  41: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=1200&q=80',
  // 42: mountain valley aerial — loss landscape / gradient descent metaphor
  42: 'https://images.unsplash.com/photo-1760126004303-d4e8f118ae8c?auto=format&fit=crop&w=1200&q=80',
  // 43: chain links close-up — chain rule / credit assignment
  43: 'https://images.unsplash.com/photo-1488272690691-2636704d6000?auto=format&fit=crop&w=1200&q=80',
  // 44: circuit board components — activation functions as on/off switches
  44: 'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=1200&q=80',
  // 45: dramatic theater spotlight — attention as focused spotlight on sequence
  45: 'https://images.unsplash.com/photo-1471877325906-aee7c2240b5f?auto=format&fit=crop&w=1200&q=80',
  // 46: geometric building structure — transformer architecture and its layers
  46: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?auto=format&fit=crop&w=1200&q=80',
  // 47: server room data center — GPU clusters, months of compute at scale
  47: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',

  // ── World 7: Build With AI ───────────────────────────────────────────────────
  // 48: person writing in notebook — prompts as briefs to a capable contractor
  48: 'https://images.unsplash.com/photo-1698434156091-05773f7a3cb5?auto=format&fit=crop&w=1200&q=80',
  // 49: engineering blueprint — prompting techniques as structured craft
  49: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1200&q=80',
  // 50: code on dark screen — API calls, tokens, context windows, streaming
  50: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80',
  // 51: library shelves — retrieval from a knowledge base, grounding answers
  51: 'https://images.unsplash.com/photo-1648061557966-8e30f972f0be?auto=format&fit=crop&w=1200&q=80',
  // 52: musician tuning strings — fine-tuning model behavior with precision
  52: 'https://images.unsplash.com/photo-1590488629946-df5f7d1a359d?auto=format&fit=crop&w=1200&q=80',
  // 53: industrial robotic arm — agents taking actions in an autonomous loop
  53: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&w=1200&q=80',
  // 54: precision measurement lab — eval sets, benchmarks, regression testing
  54: 'https://images.unsplash.com/photo-1772683709393-f0cf8c226872?auto=format&fit=crop&w=1200&q=80',
  // 55: architect with blueprints — builder accountability, responsible design
  55: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',

  // ── World 8: The Frontier ────────────────────────────────────────────────────
  // 56: photography studio / multiple screens — text + image + audio together
  56: 'https://images.unsplash.com/photo-1612544409025-e1f6a56c1152?auto=format&fit=crop&w=1200&q=80',
  // 57: drone swarm aerial formation — coordinated autonomous agents at scale
  57: 'https://images.unsplash.com/photo-1753781467329-416d05e7e477?auto=format&fit=crop&w=1200&q=80',
  // 58: observatory telescope at night — pushing to the frontier of capability
  58: 'https://images.unsplash.com/photo-1698677364363-50cfadf64be7?auto=format&fit=crop&w=1200&q=80',
  // 59: scientist at microscope — AlphaFold, drug discovery, materials science
  59: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1200&q=80',
  // 60: robot hand / humanoid technology — embodied AI in the physical world
  60: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80',
  // 61: lighthouse in storm — safety research navigating dangerous uncertainty
  61: 'https://images.unsplash.com/photo-1523955248191-0841a01f29aa?auto=format&fit=crop&w=1200&q=80',
  // 62: globe overview — US-China competition, export controls, AI governance
  62: 'https://images.unsplash.com/photo-1758242867435-a99042434f71?auto=format&fit=crop&w=1200&q=80',
  // 63: golden sunrise horizon — three possible futures, informed engagement
  63: 'https://images.unsplash.com/photo-1484766280341-87861644c80d?auto=format&fit=crop&w=1200&q=80',
}
