import * as THREE from 'three'

const Road = (x, y, height) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshLambertMaterial({ color: 0x999999 })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = x
  mesh.position.y = 0
  mesh.position.z = y

  mesh.userData = {
    type: 'road'
  }

  return mesh
}

export default Road
