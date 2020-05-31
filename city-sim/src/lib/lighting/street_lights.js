import { PointLight } from 'three'

export const createStreetLight = (x, y, scene) => {
  const light = new PointLight(0xffffaa, 5, 3)
  light.position.set(x, 3, y)
  scene.add(light)
}

export const updateStreetLights = () => {}
