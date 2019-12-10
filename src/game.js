import { take, filter, reverse, identity, flatten } from 'ramda'
import { interpolate, getContextRatio } from './utils'
import scaleCanvas from './utils/scale-canvas'
import activeTilesView from './views/active-tiles'
import tileView from './views/tile'
import gridView from './views/grid'
import lineView from './views/line'
import queView from './views/que'
import cursorView from './views/cursor'
import * as actions from './actions'

const createContext = () => {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')

  scaleCanvas(canvas, context, window.innerWidth, window.innerHeight)

  return context
}

const render = (context, ratio, state) => {
  const { canvas } = context

  context.clearRect(0, 0, canvas.width, canvas.height)

  const { grid, session } = state
  const { activeTiles, tiles, currentLevel, currentRounds, levels, progress } = session

  const width = 920
  const tileSize = width / grid.columns
  const height = tileSize * grid.rows
  const level = levels[currentLevel]

  context.clearRect(0, 0, width, height)

  context.save()

  context.translate(
    ((canvas.width / 2) / ratio) - width / 2,
    ((canvas.height / 2) / ratio) - height / 2
  )

  context.save()

  context.translate(
    -tileSize * 3,
    0
  )

  queView({
    items: reverse(take(3, currentRounds)),
    currentLevel: level,
    tileSize
  })(context)

  context.restore()

  gridView({
    tileSize,
    columns: grid.columns,
    rows: grid.rows,
    height,
    width
  })(context)

  const flattenedTiles = filter(identity, flatten(tiles))

  flattenedTiles.forEach((tile) => {
    tileView({
      x: interpolate([0, 1], [tile.prevPosition[0], tile.position[0]])(tile.progress),
      y: interpolate([0, 1], [tile.prevPosition[1], tile.position[1]])(tile.progress),
      color: tile.color === 'primary' ? level.primaryColor : level.secondaryColor,
      size: tileSize,
      isRectangle: tile.isRectangle
    })(context)
  })

  if (activeTiles) {
    cursorView({
      x: activeTiles.position[0],
      y: activeTiles.position[1],
      tileSize,
      height,
      rows: grid.rows,
    })(context)
  }

  if (activeTiles) {
    activeTilesView({
      x: activeTiles.position[0],
      y: activeTiles.position[1],
      tiles: activeTiles.tiles,
      tileSize,
      currentLevel: level
    })(context)
  }

  lineView({
    height,
    x: width * progress
  })(context)

  context.restore()
}

const createGame = (store) => {
  const context = createContext()
  const ratio = getContextRatio(context)

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      store.dispatch(actions.pauseRequested())

      return
    }

    store.dispatch(actions.keyDown(e.keyCode))
  }

  const handleKeyUp = () =>
    store.dispatch(actions.keyUp())

  const storeSubscription = store.subscribe(() => {
    const state = store.getState()

    if (!state.session) {
      const { canvas } = context

      context.clearRect(0, 0, canvas.width, canvas.height)

      return
    }

    render(context, ratio, state)
  })

  return {
    start: () => {
      window.addEventListener('keydown', handleKeyDown, false)
      window.addEventListener('keyup', handleKeyUp, false)
    },
    stop: () => {
      storeSubscription()
    }
  }
}

export default createGame
