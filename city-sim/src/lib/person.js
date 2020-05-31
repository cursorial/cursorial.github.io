import * as THREE from 'three'

const Person = (x, y) => {
  const geometry = new THREE.BoxGeometry(0.25, 0.7, 0.25)
  const material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = x
  mesh.position.y = 0.7
  mesh.position.z = y

  let target = {
    x: Math.round(1 + Math.random() * 50),
    y: Math.round(1 + Math.random() * 50)
  }

  return {
    update: (cityGrid) => {
  
    },
    mesh: mesh
  }
}

export default Person
