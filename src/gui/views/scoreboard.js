/* eslint-disable */

import React from 'react'
import { connect } from 'react-redux'

const Scoreboard = ({ time, points, currentLevel }) => (
  <div className='scoreboard'>
    <div>
      <div className='scoreboard__row'>
        <span>{time}</span>
      </div>
      <div className='scoreboard__row'>
        <span>Points: {points}</span>
      </div>
      <div className='scoreboard__row'>
        <span>Level: {currentLevel}</span>
      </div>
    </div>
  </div>
)

const mapStateToProps = ({ session }) => ({
  time: session.time,
  points: session.points,
  currentLevel: session.currentLevel
})

export default connect(mapStateToProps)(Scoreboard)
