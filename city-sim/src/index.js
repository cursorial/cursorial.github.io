/*
  global requestAnimationFrame
*/

import * as THREE from 'three'
import generateCity from './lib/procedural/city-generation'
import { FOV, ASPECT, NEAR, FAR } from './lib/camera/constants'
import PointerLockControls from './lib/controls/pointer_lock'
import Sun from './lib/lighting/sun'
import { initInput, handleInput } from './lib/controls/key_handler'
import { handlePlayerCollision } from './lib/controls/player_collision'

const cityGrid = generateCity(100, 100)
let currentSpatialIndex = cityGrid

const clock = new THREE.Clock(true)

let currentScene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR)
camera.position.x = 0
camera.position.y = 1.1
camera.position.z = 1

const raycaster = new THREE.Raycaster()

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor('rgb(200, 200, 255)', 1)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement)

for (let x = 0; x < cityGrid.length; x++) {
  for (let y = 0; y < cityGrid[x].length; y++) {
    const mesh = cityGrid[x][y].mesh
    currentScene.add(mesh)
  }
}

let currentAction = () => {}

const sun = Sun()
currentScene.add(sun.lightObject)

const controls = new PointerLockControls(camera)
controls.connect()

const keysDown = {}
initInput(keysDown)

const switchScene = (newScene, objectCameraStart) => {
  return () => {
    currentSpatialIndex = []
    currentScene = newScene
    camera.position.x = objectCameraStart.x
    camera.position.y = objectCameraStart.y
    camera.position.z = objectCameraStart.z
    renderer.clear()
  }
}

const animate = () => {
  const lastPosition = {
    x: camera.position.x,
    z: camera.position.z
  }

  handleInput(controls, keysDown, currentAction, camera)

  raycaster.setFromCamera(controls.getMouseLocation(), camera)
  const intersects = raycaster.intersectObjects(currentScene.children)
  if (intersects.length > 0) {
    const {
      type: objectType,
      scene: objectScene,
      cameraStart: objectCameraStart
    } = intersects[0].object.userData
    document.getElementById('looking-at').innerHTML = `
      ${objectType}
    `
    if (objectScene) {
      currentAction = switchScene(objectScene, objectCameraStart)
    }
  }

  if (camera.position.y > 1.1) camera.position.y -= 0.05
  document.getElementById('info').innerHTML = `
    x: ${camera.position.x}
    y: ${camera.position.y}
    z: ${camera.position.z}
  `

  handlePlayerCollision(currentSpatialIndex, camera, lastPosition)

  sun.update(clock.getElapsedTime())

  requestAnimationFrame(animate)
  renderer.render(currentScene, camera)
}

document.body.onclick = () => {
  controls.lock()
}

animate()
