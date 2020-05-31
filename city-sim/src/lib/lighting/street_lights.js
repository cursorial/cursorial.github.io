import { PointLight } from 'three'

export const createStreetLight = (x, y, scene) => {
  const light = new PointLight(0xffff99, 1, 2.5)
  light.position.set(x, 2, y)
  scene.add(light)
}

export const updateStreetLights = () => {}
