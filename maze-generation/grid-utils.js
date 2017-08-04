function findNeighboursSquareGrid(grid, x, y) {
    var neighbours = [];
    if(x > 0) {
        neighbours.push(grid[x - 1][y]);
    }
    if(x < grid.length - 1) {
        neighbours.push(grid[x + 1][y]);
    }
    if(y > 0) {
        neighbours.push(grid[x][y - 1]);
    }
    if(y < grid[0].length - 1) {
        neighbours.push(grid[x][y + 1]);
    }
    return neighbours;
}

function findNeighboursHexGrid(grid, x, y) {
    var neighbours = [];
    
    return neighbours;
}

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}