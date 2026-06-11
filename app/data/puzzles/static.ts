import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'static',
  title: 'Static',
  groups: [
    {
      name: 'WHAT A CNN DETECTS FIRST',
      difficulty: 1,
      cards: ['Edges', 'Lines', 'Textures', 'Brightness'],
      reveal: 'Early layers in a CNN respond to the simplest visual signals — edges, lines, textures, differences in brightness. These are the building blocks everything else is built from.',
    },
    {
      name: 'WHAT A CNN DETECTS LATER',
      difficulty: 2,
      cards: ['Shapes', 'Patterns', 'Object parts', 'Combinations'],
      reveal: 'Later layers combine those simple signals into more complex features. Shapes emerge from edges. Patterns emerge from textures. Object parts emerge from shapes.',
    },
    {
      name: 'WAYS COMPUTER VISION CAN FAIL',
      difficulty: 3,
      cards: ['Bad lighting', 'Unusual angle', 'Adversarial noise', 'Out-of-distribution input'],
      reveal: 'Computer vision systems fail when the input looks different from what they trained on. Bad lighting, unusual angles, adversarial examples, and inputs the model has never seen before can all break a sy',
    },
    {
      name: 'THINGS COMPUTER VISION DOES BEYOND LABELING',
      difficulty: 4,
      cards: ['Object detection', 'Semantic segmentation', 'Pose estimation', 'Depth estimation'],
      reveal: 'Labeling an image is just one thing computer vision can do. It can also locate objects, label every pixel, track body positions, and estimate physical depth. These are used in medicine, robotics, acce',
    },
  ],
}

export default puzzle
