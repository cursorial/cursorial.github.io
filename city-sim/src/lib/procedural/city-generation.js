import Building from '../building'
import Road from '../road'
import Grass from '../grass'

const generateCity = (width, height) => {
  const grid = []
  for (let x = 0; x < width; x++) {
    grid[x] = []
    for (let y = 0; y < height; y++) {
      if (x % 4 === 0 || y % 4 === 0) {
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
        const distanceFromCenter = Math.sqrt(
          Math.pow(Math.abs(center.x - x), 2) +
          Math.pow(Math.abs(center.y - y), 2)
        )
        const normalizedHeight = () => {
          const baseHeight = (31 - distanceFromCenter) / 2
          if (baseHeight < 2) return 2
          return baseHeight
        }
        const normalizedRandomRange = () => {
          const min = 0
          const max = 1
          const baseRandom = distanceFromCenter / 2
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
