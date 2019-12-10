import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Menu } from '../components'

class MainMenu extends PureComponent {
  render() {
    return (
      <Menu
        items={[
          {
            label: 'Start Game',
            onClick: this.props.onStartGame
          },
          {
            label: 'Settings',
            onClick: this.props.onStartGame
          }
        ]}
      />
    )
  }
}

MainMenu.propTypes = {
  onStartGame: PropTypes.func.isRequired
}

export default connect(null, {
  onStartGame: actions.startGame
})(MainMenu)
