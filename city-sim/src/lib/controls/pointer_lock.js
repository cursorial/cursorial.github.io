import {
  Euler,
  EventDispatcher,
  Vector3,
  Vector2
} from 'three'

class PointerLockControls extends EventDispatcher {
  constructor (camera) {
    super()

    this.camera = camera
    this.domElement = document.body
    this.isLocked = false

    this.HALF_PI = Math.PI / 2
    this.vector = new Vector3()

    this.onMouseMove = this.onMouseMove.bind(this)
    this.onPointerLockChange = this.onPointerLockChange.bind(this)
    this.onPointerLockError = this.onPointerLockError.bind(this)

    this.mouseLocation = {
      x: 0,
      y: 0
    }
  }

  onMouseMove (event) {
    if (!this.isLocked) {
      const mouseMovementX = event.movementX || 0
      const mouseMovementY = event.movementY || 0
      const euler = new Euler(0, 0, 0, 'YXZ')
      euler.setFromQuaternion(this.camera.quaternion)
      euler.y -= mouseMovementX * 0.005
      euler.x -= mouseMovementY * 0.005
      euler.x = Math.max(-this.HALF_PI, Math.min(this.HALF_PI, euler.x))
      this.camera.quaternion.setFromEuler(euler)
      this.mouseLocation = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      }
      this.dispatchEvent({ type: 'change' })
    }
  }

  onPointerLockChange () {
    if (document.pointerLockElement === this.domElement) {
      this.dispatchEvent({ type: 'lock' })
    } else {
      this.dispatchEvent({ type: 'unlock' })
      this.isLocked = false
    }
  }

  onPointerLockError () {
    console.error('PointerLock API Error')
  }

  connect () {
    document.addEventListener('mousemove', this.onMouseMove, false)
    document.addEventListener('pointerlockchange', this.onPointerLockChange, false)
    document.addEventListener('pointerlockerror', this.onPointerLockChange, false)
  }

  disconnect () {
    document.removeEventListener('mousemove', this.onMouseMove, false)
    document.removeEventListener('pointerlockchange', this.onPointerLockChange, false)
    document.removeEventListener('pointerlockerror', this.onPointerLockError, false)
  }

  getMouseLocation () {
    return new Vector2(this.mouseLocation.x, this.mouseLocation.y)
  }

  getObject () {
    return this.camera
  }

  getDirection () {
    const direction = new Vector3(0, 0, -1)
    return (vector) => {
      return vector.copy(direction).applyQuaternion(this.camera.quaternion)
    }
  }

  moveForward (distance) {
    this.vector.setFromMatrixColumn(this.camera.matrix, 0)
    this.vector.crossVectors(this.camera.up, this.vector)
    this.camera.position.addScaledVector(this.vector, distance)
  }

  moveRight (distance) {
    this.vector.setFromMatrixColumn(this.camera.matrix, 0)
    this.camera.position.addScaledVector(this.vector, distance)
  }

  lock () {
    this.domElement.requestPointerLock()
  }

  unlock () {
    document.exitPointerLock()
  }
}

export default PointerLockControls
