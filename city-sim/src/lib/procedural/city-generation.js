import Building from '../building'
import Road from '../road'
import Grass from '../grass'

const generateCity = (width, height) => {
  const grid = []
  for (let x = 0; x < width; x++) {
    grid[x] = []
    for (let y = 0; y < height; y++) {
      if (x % 4 === 0 || y % 4 === 0 || x % 3 === 0 || y % 3 === 0) {
        grid[x][y] = {
          isLit: x % 8 === 0 && y % 8 === 0,
          mesh: Road(x, y),
          collides: false
        }
      } else {
        const center = {
          x: width / 2,
          y: height / 2
        }
        const getDistanceFromCenter = (x, y) => {
          return Math.sqrt(
            Math.pow(Math.abs(center.x - x), 2) +
            Math.pow(Math.abs(center.y - y), 2)
          )
        }
        const normalizedHeight = () => {
          const baseHeight = getDistanceFromCenter(0, 0) - getDistanceFromCenter(x, y)
          if (baseHeight < 2) return 2
          if (baseHeight > 6) return 6
          return baseHeight
        }
        const normalizedRandomRange = () => {
          const min = 0
          const max = getDistanceFromCenter(0, 0)
          const baseRandom = getDistanceFromCenter(0, 0) - getDistanceFromCenter(x, y)
          return (baseRandom - min) / (max - min)
        }
        const buildingHeight = Math.ceil((Math.random() + 1) * normalizedHeight())
        if (Math.random() < normalizedRandomRange()) {
          grid[x][y] = {
            mesh: Building(x, y, buildingHeight),
            collides: true
          }
        } else {
          grid[x][y] = {
            mesh: Grass(x, y),
            collides: false
          }
        }
      }
    }
  }
  return grid
}

export default generateCity
