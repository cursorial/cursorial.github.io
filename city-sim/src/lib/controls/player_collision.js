export const handlePlayerCollision = (grid, camera, lastPosition) => {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y].collides) {
        if (camera.position.x >= x - 0.7 && camera.position.z >= y - 0.7 && camera.position.x <= x + 0.7 && camera.position.z <= y + 0.7 && camera.position.y < 10) {
          camera.position.x = lastPosition.x
          camera.position.z = lastPosition.z
        }
      }
    }
  }
}
