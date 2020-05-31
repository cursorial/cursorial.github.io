import {
  PointLight
} from 'three'

const Sun = () => {
  const light = new PointLight(0xffffff, 2, 200)

  let xPosition = -50
  let yPosition = 100
  let zPosition = -50

  light.position.set(xPosition, yPosition, zPosition)
  light.castShadow = true

  return {
    lightObject: light,
    update: (elapsedTime) => {
      light.position.set(xPosition, yPosition, zPosition)
      xPosition = Math.cos(elapsedTime / 5) * 100
      yPosition = Math.sin(elapsedTime / 5) * 100
      zPosition = Math.cos(elapsedTime / 5) * 100
    }
  }
}

export default Sun
