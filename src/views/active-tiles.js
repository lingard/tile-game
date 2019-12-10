// import {  } from 'ramda'
import tile from './tile'

const activeTiles = ({ x, y, tileSize, tiles, currentLevel }) =>
  (c) => {
    [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([ox, oy], index) =>
      tile({
        x: x + ox,
        y: y + oy,
        size: tileSize,
        color: tiles[index].color === 'primary' ? currentLevel.primaryColor : currentLevel.secondaryColor,
      })(c)
    )
  }


export default activeTiles
