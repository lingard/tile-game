export const linear = (p) => p

export const createReversedEasing = (easing) =>
  (p) => 1 - easing(1 - p)

export const createMirroredEasing = (easing) =>
  (p) => (p <= 0.5) ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2

export const createExpoIn = (power) => (p) => p ** power
export const easeIn = createExpoIn(2)
export const easeOut = createReversedEasing(easeIn)
export const easeInOut = createMirroredEasing(easeIn)
