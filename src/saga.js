import { eventChannel, buffers, delay } from 'redux-saga'
import { call, put, select, take, race, fork } from 'redux-saga/effects'
import * as actions from './actions'

function ticker(maxFPS) {
  const tickerChannel = eventChannel((listener) => {
    const minFrameDelay = 1000 / maxFPS

    let raf = window.requestAnimationFrame(onTick)
    let lastFrameTimeMs = 0

    function onTick(timestamp) {
      if (timestamp < lastFrameTimeMs + minFrameDelay) {
        raf = window.requestAnimationFrame(onTick)

        return
      }

      const delta = timestamp - lastFrameTimeMs

      lastFrameTimeMs = timestamp

      listener(delta)

      raf = window.requestAnimationFrame(onTick)
    }

    return () => {
      window.cancelAnimationFrame(raf)
    }
  }, buffers.sliding(1))

  return tickerChannel
}

function *activeTilesLoop() {
  for (;;) {
    yield call(delay, 2000)
    yield put(actions.moveActiveTiles())
  }
}

function *loop() {
  const tickerChannel = ticker(140)

  fork(activeTilesLoop)

  for (;;) {
    const delta = yield take(tickerChannel)

    yield put(actions.tick(delta))

    const activeTiles = yield select(state => state.session.activeTiles)

    if (!activeTiles) {
      yield put(actions.newActiveTilesRequested())
    }
  }
}

function *game() {
  for (;;) {
    const { pause } = yield race({
      pause: take(actions.PAUSE_REQUESTED),
      game: call(loop)
    })

    if (pause) {
      yield take(actions.RESUME_GAME)
    }
  }
}

export default function *main() {
  for (;;) {
    yield put(actions.showMainMenu())
    yield take(actions.START_GAME)

    yield fork(game)

    yield take(actions.EXIT_GAME)
  }
}
