import { compose, map, tail, head, find, chain, reverse, times, always, flatten, slice, all, range, any, isNil } from 'ramda'
import { getRandomInt } from './utils'
import { easeOut } from './utils/easing'
import * as actions from './actions'

const KEY = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  SPACE: 32
}

const createMatrix = (x, y) => times(() => times(always(null), y), x)

const createTile = (x = 0, y = 0) => ({
  position: [x, y],
  prevPosition: [0, 0],
  progress: 1,
  isRectangle: false,
  color: getRandomInt(0, 1) === 1 ? 'primary': 'secondary'
})

const createActiveTiles = (x) => ({
  position: [x, -2],
  vx: 0,
  vy: 0,
  tiles: times(createTile, 4)
})

const createLevel = ({ primaryColor, secondaryColor, numRounds }) => ({
  primaryColor,
  secondaryColor,
  rounds: times(() => createActiveTiles(0), numRounds)
})

const firstLevel = createLevel({
  primaryColor: '#FF791D',
  secondaryColor: '#D8D8D8',
  numRounds: 100
})

const createSession = () => ({
  levels: [
    firstLevel,

    createLevel({
      primaryColor: '#5B43EE',
      secondaryColor: '#E51B3F',
      numRounds: 14
    }),
  ],
  currentLevel: 0,
  currentRounds: firstLevel.rounds,
  progress: 0,
  tiles: createMatrix(16, 10),
  activeTiles: null
})

const setTilePos = (tile, x, y) => ({
  ...tile,
  position: [x, y]
})

const addTileAtPos = (tile, [x, y], tiles) => {
  tiles[x][y] = setTilePos(tile, x, y)

  return tiles
}

const setActiveTilesXPos = (activeTiles, x) => ({
  ...activeTiles,
  position: [x, activeTiles.position[1]]
})

const rotateTiles = (tiles) =>
  [tiles[2], tiles[0], tiles[3], tiles[1]]

const findTileAtCoordinate = (coordinate, tiles) => {
  const column = tiles[coordinate[0]]

  if (!column) {
    return
  }

  return column[coordinate[1]]
}

const findCollisionInArea = (tl, br, tiles) => {
  const xPositions = range(tl[0], br[0] + 1)
  const yPositions = range(tl[1], br[1] + 1)
  const coordinates = chain(x =>
    map(y => ([x, y]), yPositions), xPositions)

  const collision = coordinates.find(([x, y]) =>
    findTileAtCoordinate([x, y], tiles))

  if (collision) {
    return collision
  }

  if (tl[1] + 2 >= (tiles[0].length - 1)) {
    return [tl[0], tiles[0].length]
  }
}

const findNewYpos = ([x, y], tiles) => {
  const foo = slice(y, tiles[x].length, tiles[x])
  const delta = tiles[x].length - foo.length

  let newPos = tiles[x].length - 1

  foo.forEach((maybeTile, index) => {
    if (!maybeTile) {
      newPos = delta + index
    }
  })

  return newPos
}

const moveTilesIfNeeded = (tiles, grid) => {
  let newTiles = createMatrix(grid.columns, grid.rows)

  tiles.forEach((row) => {
    reverse(row).forEach((tile) => {
      if (!tile) {
        return
      }

      const nextTile = findTileAtCoordinate([tile.position[0], tile.position[1] + 1], newTiles)

      if (
        tile.position[1] === (grid.rows - 1) ||
        nextTile
      ) {
        newTiles[tile.position[0]][tile.position[1]] = tile

        return
      }

      const newYPos = findNewYpos(tile.position, newTiles)

      let newTile = {
        ...setTilePos(tile, tile.position[0], newYPos),
        prevPosition: tile.position,
        progress: 0,
      }

      newTiles[tile.position[0]][newYPos] = newTile
    })
  })

  return newTiles
}

const findSquareInArea = (topLeft, bottomRight, color, tiles) =>
  all(([x, y]) => {
    const tile = findTileAtCoordinate([x, y], tiles)

    if (!tile) {
      return false
    }

    return tile.color === color
  },
  [
    topLeft,
    [topLeft[0] + 1, topLeft[1]],
    [topLeft[0], topLeft[1] + 1],
    bottomRight
  ])

const findSquareAtPos = (x, y, color, tiles) => {
  const pos = [x, y]

  const areas = [
    [[x - 1, y - 1], pos],
    [[x, y - 1], [x + 1, y]],
    [[x - 1, y], [x, y + 1]],
    [pos, [x + 1, y + 1]],
  ]

  return find(([topLeft, bottomRight]) =>
    findSquareInArea(topLeft, bottomRight, color, tiles), areas)
}

const alg = (tiles) => {
  return tiles.map((row, x) => {
    return row.map((tile, y) => {
      if (!tile) {
        return null
      }

      if (tile.isRectangle) {
        return tile
      }

      const area = findSquareAtPos(x, y, tile.color, tiles)

      if (area) {
        return {
          ...tile,
          isRectangle: true
        }

        // return null
      }

      return tile
    })
  })
}

const moveActiveTilesDown = (state, grid) => {
  const { activeTiles, tiles } = state
  const { position, vy } = activeTiles
  const y = Math.min(position[1] + (1 + vy), grid.rows - 2)

  const collision = findCollisionInArea(position, [position[0] + 1, y + 2], tiles)

  if (collision) {
    const newY = Math.min(collision[1] - 2, y)

    let newTiles = [...tiles]

    newTiles = addTileAtPos(activeTiles.tiles[0], [position[0], newY], newTiles)
    newTiles = addTileAtPos(activeTiles.tiles[1], [position[0] + 1, newY], newTiles)
    newTiles = addTileAtPos(activeTiles.tiles[2], [position[0], newY + 1], newTiles)
    newTiles = addTileAtPos(activeTiles.tiles[3], [position[0] + 1, newY + 1], newTiles)

    return {
      ...state,
      tiles: newTiles,
      activeTiles: null
    }
  }

  return {
    ...state,
    activeTiles: {
      ...activeTiles,
      position: [
        position[0],
        y
      ]
    }
  }
}

const gameReducer = (state, grid, action) => {
  switch (action.type) {
    case 'TICK': {
      const shouldRestart = state.progress >= 1

      let tiles

      if (shouldRestart) {
        tiles = map(map(tile => {
          if (!tile || tile.isRectangle) {
            return null
          }

          return tile
        }), state.tiles)
      } else {
        tiles = state.tiles
      }

      const hasAnimations = any(tile =>
        (!isNil(tile) && tile.progress !== 1), flatten(tiles))

      if (hasAnimations) {
        tiles = tiles.map(row =>
          row.map(tile => {
            if (!tile || tile.progress === 1) {
              return tile
            }

            return {
              ...tile,
              progress: easeOut(Math.max(0.01, tile.progress))
            }
          })
        )
      }

      return {
        ...state,

        progress: shouldRestart >= 1 ? 0 : state.progress + 0.005,
        tiles
      }
    }

    case 'NEW_ACTIVE_TILES_REQUESTED': {
      // const currentLevel = state.levels[state.currentLevel]

      if (state.currentRounds.length === 0) {
        const newLevel = state.currentLevel + 1

        return {
          ...state,
          currentLevel: newLevel,
          currentRounds: state.levels[newLevel].rounds
        }
      }

      return {
        ...state,
        currentRounds: tail(state.currentRounds),
        activeTiles: head(state.currentRounds)
        // activeTiles: createActiveTiles(getRandomInt(0, state.grid.columns - 2))
      }
    }

    case 'MOVE_ACTIVE_TILES': {
      if (!state.activeTiles) {
        return state
      }

      return moveActiveTilesDown(state, grid)
    }

    case 'KEY_DOWN': {
      const { activeTiles, tiles } = state

      if (!activeTiles) {
        return state
      }

      switch (event.keyCode) {
        case KEY.LEFT:  {
          const newX = Math.max(0, activeTiles.position[0] - 1)

          if (
            findTileAtCoordinate([newX, activeTiles.position[1]], tiles) ||
            findTileAtCoordinate([newX, activeTiles.position[1] + 1], tiles)
          ) {
            return state
          }

          return {
            ...state,
            activeTiles: setActiveTilesXPos(activeTiles, newX)
          }
        }

        case KEY.RIGHT: {
          const newX = Math.min(grid.columns - 2, activeTiles.position[0] + 1)

          if (
            findTileAtCoordinate([newX + 1, activeTiles.position[1]], tiles) ||
            findTileAtCoordinate([newX + 1, activeTiles.position[1] + 1], tiles)
          ) {
            return state
          }

          return {
            ...state,
            activeTiles: setActiveTilesXPos(activeTiles, newX)
          }
        }

        case KEY.DOWN: {
          if (!activeTiles) {
            return state
          }

          const newState = moveActiveTilesDown(state, grid)

          if (!newState.activeTiles) {
            return newState
          }

          return {
            ...newState,
            activeTiles: {
              ...newState.activeTiles,
              vy: newState.activeTiles.vy + 2
            }
          }
        }

        case KEY.SPACE: {
          return {
            ...state,
            activeTiles: {
              ...state.activeTiles,
              tiles: rotateTiles(state.activeTiles.tiles)
            }
          }
        }
      }

      return state
    }

    case 'KEY_UP': {
      if (!state.activeTiles) {
        return state
      }

      return {
        ...state,
        activeTiles: {
          ...state.activeTiles,
          vy: 0
        }
      }
    }
  }

  return state
}

const sessionReducer = (state, grid, action) => {
  const newState = gameReducer(state, grid, action)

  if (newState.tiles === state.tiles) {
    return newState
  }

  return {
    ...newState,
    tiles: compose(
      alg,
      tiles => moveTilesIfNeeded(tiles, grid)
    )(newState.tiles)
  }
}

const initialState = {
  grid: {
    columns: 16,
    rows: 10
  },
  menu: null,
  session: null
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SHOW_MAIN_MENU: {
      return {
        ...state,
        menu: 'MAIN'
      }
    }

    case actions.START_GAME: {
      return {
        ...state,
        menu: null,
        session: createSession()
      }
    }

    case actions.PAUSE_REQUESTED: {
      return {
        ...state,
        menu: 'PAUSE'
      }
    }

    case actions.RESUME_GAME: {
      return {
        ...state,
        menu: null
      }
    }

    case actions.EXIT_GAME: {
      return {
        ...state,
        session: null
      }
    }
  }

  if (state.session) {
    const newSession = sessionReducer(state.session, state.grid, action)

    if (newSession !== state.session) {
      return {
        ...state,
        session: newSession
      }
    }
  }

  return state
}

export default mainReducer
