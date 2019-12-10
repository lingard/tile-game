import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { MainMenu, PauseMenu, Scoreboard } from './views'

class GUIController extends PureComponent {
  render() {
    const { session, menu } = this.props

    if (!session && !menu) {
      return null
    }

    let menuComponent

    if (menu) {
      switch (menu) {
        case 'MAIN': {
          menuComponent = (
            <MainMenu />
          )

          break
        }

        case 'PAUSE': {
          menuComponent = (
            <PauseMenu />
          )
        }
      }
    }

    return (
      <div className='gui'>
        { session && <Scoreboard /> }

        { menu && menuComponent }
      </div>
    )
  }
}

GUIController.propTypes = {
  session: PropTypes.object,
  menu: PropTypes.string
}

const selectState = (state) => ({
  session: state.session,
  menu: state.menu
})

export default connect(selectState)(GUIController)
