export const getProgressFromValue = (from, to, value) => {
  const toFromDifference = to - from

  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference
}

export const getValueFromProgress = (from, to, progress) =>
  (- progress * from) + (progress * to) + from

const slowInterpolate = (
  input,
  output,
  rangeLength,
  rangeEasing
) => {
  const finalIndex = rangeLength - 1

  // If input runs highest -> lowest, reverse both arrays
  if (input[0] > input[finalIndex]) {
    input.reverse()
    output.reverse()
  }

  return (v) => {
    // If value outside minimum range, quickly return
    if (v <= input[0]) {
      return output[0]
    }

    // If value outside maximum range, quickly return
    if (v >= input[finalIndex]) {
      return output[finalIndex]
    }

    let i = 1

    // Find index of range start
    for (; i < rangeLength; i++) {
      if (input[i] > v || i === finalIndex) {
        break
      }
    }

    const progressInRange = getProgressFromValue(input[i - 1], input[i], v)
    const easedProgress = rangeEasing
      ? rangeEasing[i - 1](progressInRange)
      : progressInRange

    return getValueFromProgress(output[i - 1], output[i], easedProgress)
  }
}

const fastInterpolate = (
  minA,
  maxA,
  minB,
  maxB
) => (v) => ((v - minA) * (maxB - minB)) / (maxA - minA) + minB

export const interpolate = (
  input,
  output,
  rangeEasing
) => {
  const rangeLength = input.length

  return rangeLength !== 2
    ? slowInterpolate(input, output, rangeLength, rangeEasing)
    : fastInterpolate(input[0], input[1], output[0], output[1])
}
