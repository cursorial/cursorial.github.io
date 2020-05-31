import {
  PointLight
} from 'three'

const Sun = () => {
  const light = new PointLight(0xffffff, 2, 200)

  let xPosition = 50
  let yPosition = 80

  light.position.set(xPosition, yPosition, 50)

  return {
    lightObject: light,
    update: (elapsedTime) => {
      light.position.set(xPosition, yPosition, 50)
      xPosition = Math.cos(elapsedTime / 10) * 100
      yPosition = Math.sin(elapsedTime / 10) * 100
    }
  }
}

export default Sun
