import * as THREE from 'three'
import Ceiling from './building_interior/ceiling'
import Floor from './building_interior/floor'
import Wall from './building_interior/wall'

const Building = (x, y, height) => {
  const geometry = new THREE.BoxGeometry(1, height, 1)
  const material = new THREE.MeshLambertMaterial({ color: 0xAFAFAF })
  const mesh = new THREE.Mesh(geometry, material)
  const scene = new THREE.Scene()
  const light = new THREE.PointLight(0xffffff, 4, 20)
  light.position.set(0, 4, 0)

  mesh.position.x = x
  mesh.position.y = height / 2
  mesh.position.z = y

  scene.add(Floor(20, 20))
  scene.add(Wall(0, -10, 20, 5, 0, 0))
  scene.add(Wall(0, 10, 20, 5, 0, Math.PI, 0))
  scene.add(Wall(-10, 0, 20, 5, 0, Math.PI / 2, 0))
  scene.add(Wall(10, 0, 20, 5, 0, -Math.PI / 2, 0))
  scene.add(Ceiling(20, 20))
  scene.add(light)

  mesh.userData = {
    type: 'building',
    scene: scene,
    cameraStart: new THREE.Vector3(0, 1, 0)
  }

  return mesh
}

export default Building
