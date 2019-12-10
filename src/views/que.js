import activeTilesView from './active-tiles'

const queView = ({ items, tileSize, currentLevel }) =>
  ctx => {
    items.forEach((activeTiles, index) => {
      activeTilesView({
        x: 0,
        y: index * 2.25,
        tiles: activeTiles.tiles,
        tileSize,
        currentLevel
      })(ctx)
    })
  }

  export default queView
