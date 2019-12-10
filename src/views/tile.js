import { roundRect } from '../utils'

const tile = ({ x, y, size, color, isRectangle }) =>
  (c) => {
    const spacing = 8

    c.save()

    c.translate(x * size, y * size)

    c.fillStyle = color

    if (isRectangle) {
      c.beginPath()
      c.rect(3, 3, size - 6, size - 6)
      c.closePath()
      c.fill()
    } else {
      roundRect(spacing / 2, spacing / 2, size - spacing, size - spacing, 12)(c)
      c.fill()
    }

    c.restore()
  }


export default tile
