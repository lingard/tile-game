export * from './interpolate'

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const roundRect = (x, y, w, h, r) =>
  (ctx) => {
    if (w < 2 * r) r = w / 2
    if (h < 2 * r) r = h / 2

    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()

    return ctx
  }

export const getContextRatio = (ctx) => {
  const devicePixelRatio = window.devicePixelRatio || 1

  // determine the 'backing store ratio' of the canvas context
  const backingStoreRatio = (
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1
  )

  return devicePixelRatio / backingStoreRatio
}
