/* eslint-disable */

import { compose, prop, map } from 'ramda'
import React from 'react'

const MenuItem = ({ label, onClick }) => (
  <div key={label} className='menu__item' onClick={onClick}>
    <span>{label}</span>
  </div>
)

const Menu = compose((items) => (
  <div className='menu-container'>
    <div className='menu'>
      {items}
    </div>
  </div>
), map(MenuItem), prop('items'))

export default Menu
