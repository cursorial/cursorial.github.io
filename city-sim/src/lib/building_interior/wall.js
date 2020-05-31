import * as THREE from 'three'

const Wall = (x, z, width, height, xRotation, yRotation, zRotation) => {
  const geometry = new THREE.PlaneGeometry(width, height, 1, 1)
  const material = new THREE.MeshLambertMaterial({ color: 0xAAAAAA })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = x
  mesh.position.y = height / 2
  mesh.position.z = z

  mesh.rotation.x = xRotation || 0
  mesh.rotation.y = yRotation || 0
  mesh.rotation.z = zRotation || 0

  mesh.userData = {
    type: 'wall'
  }

  return mesh
}

export default Wall
