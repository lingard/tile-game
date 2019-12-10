import store from './store'
import bootstrapGui from './gui'
import createGame from './game'

import './background'
import './index.scss'

const game = createGame(store)

game.start()

bootstrapGui(store)
