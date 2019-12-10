import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import GuiController from './controller'

const rootNode = document.getElementById('gui-root')

const bootstrapGui = (store) => {
  const Root = () => (
    <Provider store={store}>
      <GuiController />
    </Provider>
  )

  ReactDOM.render(<Root />, rootNode)
}

export default bootstrapGui
