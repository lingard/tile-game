import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Menu } from '../components'

class PauseMenu extends PureComponent {
  render() {
    return (
      <Menu
        items={[
          {
            label: 'Resume',
            onClick: this.props.onResumeGame
          },
          {
            label: 'Exit',
            onClick: this.props.onExitGame
          }
        ]}
      />
    )
  }
}

PauseMenu.propTypes = {
  onResumeGame: PropTypes.func.isRequired,
  onExitGame: PropTypes.func.isRequired
}

export default connect(null, {
  onResumeGame: actions.resumeGame,
  onExitGame: actions.exitGame,
})(PauseMenu)
