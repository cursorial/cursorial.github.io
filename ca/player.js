function Player() {
    this.ownedCells = [[Math.round(Math.random() * (grid.data.width - 1)), 
                        Math.round(Math.random() * (grid.data.height - 1))]];
}