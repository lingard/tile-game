import { times } from 'ramda'

const cursorView = ({ x, y, tileSize, height, rows }) =>
  (ctx) => {
    ctx.save()
    ctx.translate(x * tileSize, 0)

    let gradient = ctx.createLinearGradient(-1, 0, 3, 0)

    gradient.addColorStop(0, 'rgba(78, 251, 255, 0.3)')
    gradient.addColorStop(1, 'rgba(78, 251, 255, 0.9)')

    ctx.fillStyle = gradient
    ctx.fillRect(-1, -(1 * tileSize), 3, height + (1 * tileSize))

    ctx.translate(2 * tileSize, 0)

    gradient = ctx.createLinearGradient(-1, 0, 3, 0)

    gradient.addColorStop(0, 'rgba(78, 251, 255, 0.3)')
    gradient.addColorStop(1, 'rgba(78, 251, 255, 0.9)')

    ctx.fillStyle = gradient
    ctx.fillRect(-1, -(1 * tileSize), 3, height + (1 * tileSize))

    ctx.restore()
    ctx.save()

    ctx.translate(x * tileSize, 0)

    gradient = ctx.createLinearGradient(0, 0, tileSize, tileSize)

    gradient.addColorStop(0, 'rgba(78, 251, 255, 0.15)')
    gradient.addColorStop(1, 'rgba(78, 251, 255, 0.1)')

    ctx.fillStyle = gradient

    times(y => {
      ctx.fillRect(0, y * tileSize, tileSize, tileSize)
      ctx.fillRect(tileSize, y * tileSize, tileSize, tileSize)
    }, rows)

    ctx.restore()

    if (y === -2) {
      ctx.save()
      ctx.translate(x * tileSize, 0)

      const spacing = 16

      const rectX = -spacing
      const rectY = 0 //-(tileSize * 2)

      const rectWidth = (tileSize * 2) + spacing * 2
      const rectHeight = (tileSize * 2) + spacing

      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.font = '18px Orbitron'
      ctx.fillText('NEXT', rectWidth / 2, -(2.5 * tileSize))

      const cornerRadius = 12

      ctx.beginPath()
      ctx.moveTo(rectX, rectY)
      ctx.lineTo(rectX, -((rectY + rectHeight) - cornerRadius))
      ctx.arcTo(rectX, -(rectY + rectHeight), rectX + cornerRadius, -(rectY + rectHeight), cornerRadius)
      ctx.lineTo(rectX + rectWidth, -(rectY + rectHeight))
      ctx.arcTo(rectX + rectWidth, -(rectY + rectHeight), rectX + rectWidth, -((rectY + rectHeight) - cornerRadius), cornerRadius)
      ctx.lineTo(rectX + rectWidth, rectY)

      // ctx.lineTo(rectX + rectWidth, rectY + rectHeight)

      // ctx.lineTo(rectX + rectWidth - cornerRadius, rectY)
      // ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius, cornerRadius)
      // ctx.lineTo(rectX + rectWidth, rectY + rectHeight)

      ctx.lineWidth = 2
      ctx.strokeStyle = '#fff'
      ctx.stroke()

      ctx.restore()
    }
  }


export default cursorView
