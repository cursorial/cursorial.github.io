import * as THREE from 'three'

const Table = (x, y) => {
  const geometry = new THREE.BoxGeometry(0.5, 0.25, 0.5)
  const material = new THREE.MeshLambertMaterial({ color: 0x964B00 })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = x
  mesh.position.y = 0
  mesh.position.z = y

  mesh.userData = {
    type: 'table'
  }

  return mesh
}

export default Table
