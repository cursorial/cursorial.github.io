export const initInput = (keysDown) => {
  document.body.addEventListener('keypress', (e) => {
    if (e.keyCode >= 97 && e.keyCode <= 122) {
      keysDown[e.keyCode - 32] = true
    } else {
      keysDown[e.keyCode] = true
    }
  })

  document.body.addEventListener('keyup', (e) => {
    keysDown[e.keyCode] = false
  })
}

export const handleInput = (controls, keysDown, currentAction, camera) => {
  const MOVE_SPEED = 0.15

  if (keysDown[87]) {
    controls.moveForward(MOVE_SPEED)
  }
  if (keysDown[83]) {
    controls.moveForward(-MOVE_SPEED / 2)
  }
  if (keysDown[65]) {
    controls.moveRight(-MOVE_SPEED / 2)
  }
  if (keysDown[68]) {
    controls.moveRight(MOVE_SPEED / 2)
  }
  if (keysDown[32]) {
    camera.position.y += 0.5
  }
  if (keysDown[70]) {
    currentAction()
  }
  if (keysDown[192]) {

  }
}
