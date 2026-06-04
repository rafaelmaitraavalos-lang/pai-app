// Slide titles for every lesson — used by WorldModuleView to show contents.
// Worlds 1-2 are hardcoded (their data lives in individual page files).
// Worlds 3-8 are derived from LESSONS at the bottom.

import { LESSONS } from './index'

const WORLD_1_2: Record<number, string[]> = {
  // World 1 — What Is AI?
  1:  ['Before Computers', 'Ada Lovelace', 'The Turing Test', 'The Birth of AI', 'The AI Winters', 'Deep Blue', 'Everything Changes', "You're In It"],
  2:  ['The Magic Trick', 'How You Learned', 'Show It Enough Cats', 'Garbage In', "No One's Home", 'Why It Feels Like Magic', 'Where It Breaks', 'The Mirror'],
  3:  ['Already Everywhere', 'The Feed', 'Search Is Sorted', 'Face in the Crowd', 'The Resume Filter', 'Your Doctor Uses It', 'The Map Decides', 'The Invisible Layer'],
  4:  ['One Trick Ponies', 'Deep Blue Again', 'The Spectrum', 'ChatGPT Is Still Narrow', 'Why This Matters', 'The AGI Question', 'What We Can Measure', 'Where We Actually Are'],
  5:  ["It Wasn't Programmed", 'Supervised Learning', 'Unsupervised Learning', 'The Training Data Problem', 'Reinforcement Learning', 'It Never Stops Being Wrong', 'Who Does The Real Work', 'Learning Without Understanding'],
  6:  ['Confident and Wrong', 'The Hallucination Problem', 'Bias Is Baked In', 'The Edge Case', 'When Context Disappears', 'The Accountability Gap', 'Failure At Scale', 'Why We Deploy Anyway'],
  7:  ['The Definitions Problem', 'The Turing Frame', 'What We Know It Does', "What We Know It Isn't", 'The Question We Started With', 'Intelligence Without Understanding', 'The Moving Goalposts', 'Where That Leaves Us'],
  // World 2 — How AI Thinks
  8:  ['Not Magic, Just Math', 'Your Brain First', 'The Artificial Neuron', 'The Layers', 'Inspired By But Not Like Your Brain', 'The Weights Are Everything', 'What Actually Happens When You Use ChatGPT', 'Simple Units, Emergent Complexity'],
  9:  ['The Loss Function', 'Gradient Descent', 'Backpropagation', 'Epochs and Batches', 'Overfitting', 'Regularization', 'The Validation Set', 'When Training Goes Wrong'],
  10: ['Depth Changes Everything', 'What Each Layer Sees', 'The 2012 Moment', 'Why It Needed GPUs', 'Transfer Learning', "More Layers Isn't Always Better", "What Deep Learning Can Do That Shallow Learning Can't", 'Representations All The Way Down'],
  11: ["It's Not Thinking", 'The Training Data', 'The Transformer', 'Tokens Not Words', 'It Has No Memory', 'The Context Window', 'Why It Hallucinates', 'The Imitation Game At Scale'],
  12: ['The Engagement Problem', 'Collaborative Filtering', 'The Filter Bubble', 'Cold Start', 'Optimizing for What', 'When Recommendations Go Wrong', 'The Feedback Loop', 'Who Designs the Signal'],
  13: ['Pixels to Meaning', 'Convolutional Networks', 'Object Detection', 'Facial Recognition', 'Medical Imaging', 'Autonomous Perception', 'Adversarial Examples', 'The Limits of Vision'],
  14: ['The Explainability Problem', 'Why Black Boxes Matter', 'Saliency Maps', 'LIME and SHAP', 'Interpretable Models', 'When Explanation Fails', 'Regulatory Pressure', 'The Trade-off'],
  15: ['Scale Changes Everything', 'The Compas Case', 'Algorithmic Bail', 'Content Moderation at Scale', 'Hiring Algorithms', 'Medical AI Failures', 'Who Gets Blamed', 'What Accountability Looks Like'],
}

// Worlds 3-8 derived from LESSONS data
const fromLessons: Record<number, string[]> = {}
Object.values(LESSONS).forEach(lesson => {
  fromLessons[lesson.id] = lesson.stops.map(s => s.title)
})

export const SLIDE_TITLES: Record<number, string[]> = { ...WORLD_1_2, ...fromLessons }

export function getSlideTitles(lessonId: number): string[] {
  return SLIDE_TITLES[lessonId] ?? []
}
