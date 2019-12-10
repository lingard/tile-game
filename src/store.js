import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

const middleware = applyMiddleware(
  sagaMiddleware,
  createLogger({
    // predicate: () => false
  })
)

const store = createStore(reducer, middleware)

sagaMiddleware.run(saga)

export default store
