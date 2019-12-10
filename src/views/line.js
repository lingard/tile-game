const lineView  = ({ x, height }) =>
  (ctx) => {
    ctx.save()
    ctx.translate(x, 0)

    let gradient = ctx.createLinearGradient(-160, 0, 0, 0)

    gradient.addColorStop(0, 'rgba(255, 106, 0, 0)')
    gradient.addColorStop(1, 'rgba(255, 202, 0, 0.55)')

    ctx.fillStyle = gradient
    ctx.fillRect(-160, 0, 160, height)

    // gradient = ctx.createLinearGradient(0, 0, 12, 0)
    //
    // gradient.addColorStop(0, 'rgba(255, 202, 0, 25')
    // gradient.addColorStop(1, 'rgba(255, 106, 0, 0')
    //
    // ctx.fillStyle = gradient
    // ctx.fillRect(0, 0, 12, height)

    ctx.fillStyle = '#FF8300'
    ctx.fillRect(0, 0, 4, height)

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.fillRect(2, 0, 2, height)

    // ctx.fillStyle = 'black'
    // ctx.beginPath()

    // ctx.rect(0, 0, 1, height)
    // ctx.closePath()
    // ctx.fill()

    ctx.restore()
  }

export default lineView
