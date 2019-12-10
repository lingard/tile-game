import { times } from 'ramda'
import { roundRect } from '../utils'

const grid = ({ tileSize, columns, rows, width, height }) =>
  (ctx) => {
    ctx.save()

    ctx.globalCompositeOperation = 'ligther'
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'
    ctx.lineWidth = 2

    // ctx.translate(x * tileSize, y * tileSize)
    times((x) => {
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.font = '12px Orbitron'
      ctx.fillText(x, x * tileSize, -24)

      ctx.beginPath()
      ctx.moveTo(x * tileSize, 0)
      ctx.lineTo(x * tileSize, height)
      ctx.stroke()
    }, columns + 1)

    times((y) => {
      ctx.beginPath()
      ctx.moveTo(0, y * tileSize)
      ctx.lineTo(width, y * tileSize)
      ctx.stroke()
    }, rows + 1)

    times((x) => {
      times((y) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
        roundRect((x * tileSize) - 3, (y * tileSize) - 3, 6, 6, 2)(ctx)
        ctx.fill()
      }, rows + 1)
    }, columns + 1)

    ctx.restore()

    // times(y => {
    //   ctx.save()
    //
    //   ctx.translate(x * tileSize, y * tileSize)
    //
    //   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
    //   ctx.beginPath()
    //
    //   ctx.rect(0, 0, tileSize, tileSize)
    //   ctx.closePath()
    //   ctx.stroke()
    //   ctx.restore()
    // }, rows)

  }


export default grid
