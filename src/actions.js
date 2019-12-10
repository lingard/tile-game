// MENUES

export const SHOW_MAIN_MENU = 'SHOW_MAIN_MENU'

export const showMainMenu = () => ({
  type: SHOW_MAIN_MENU
})

export const START_GAME = 'START_GAME'

export const startGame = () => ({
  type: START_GAME
})

export const PAUSE_REQUESTED = 'PAUSE_REQUESTED'

export const pauseRequested = () => ({
  type: PAUSE_REQUESTED
})

export const RESUME_GAME = 'RESUME_GAME'

export const resumeGame = () => ({
  type: RESUME_GAME
})

export const EXIT_GAME = 'EXIT_GAME'

export const exitGame = () => ({
  type: EXIT_GAME
})

// GAME

export const TICK = 'TICK'

export const tick = () => ({
  type: TICK
})

export const NEW_ACTIVE_TILES_REQUESTED = 'NEW_ACTIVE_TILES_REQUESTED'

export const newActiveTilesRequested = () => ({
  type: NEW_ACTIVE_TILES_REQUESTED
})

export const MOVE_ACTIVE_TILES = 'MOVE_ACTIVE_TILES'

export const moveActiveTiles = () => ({
  type: 'MOVE_ACTIVE_TILES'
})

// CONTROLS

export const KEY_DOWN = 'KEY_DOWN'

export const keyDown = (keyCode) => ({
  type: KEY_DOWN,
  payload: {
    keyCode
  }
})

export const KEY_UP = 'KEY_UP'

export const keyUp = () => ({
  type: KEY_UP
})
