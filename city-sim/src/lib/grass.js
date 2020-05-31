import * as THREE from 'three'

const Grass = (x, y) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshLambertMaterial({ color: 0x22FF32 })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = x
  mesh.position.y = 0
  mesh.position.z = y

  mesh.userData = {
    type: 'grass'
  }

  return mesh
}

export default Grass
