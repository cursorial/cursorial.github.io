import * as THREE from 'three'

const Floor = (width, height) => {
  const geometry = new THREE.PlaneGeometry(width, height, 1, 1)
  const material = new THREE.MeshLambertMaterial({ color: 0xAAAAAA })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = 0
  mesh.position.y = 0
  mesh.position.z = 0

  mesh.rotation.x -= 1.5708

  mesh.userData = {
    type: 'floor'
  }

  return mesh
}

export default Floor
