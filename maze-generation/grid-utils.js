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
    var cell = grid[x][y];
    if(cell.x % 2 != 0) {
        return [
            cell.x > 0 && cell.y > 0 ? grid[cell.x - 1][cell.y - 1] : null, 
            cell.x > 0 ? grid[cell.x - 1][cell.y] : null,
            cell.y > 0 ? grid[cell.x][cell.y - 1] : null,
            cell.y < grid[0].length - 1 ? grid[cell.x][cell.y + 1] : null,
            cell.x < grid.length - 1 && cell.y > 0 ? grid[cell.x + 1][cell.y - 1] : null,
            cell.x < grid.length - 1 ? grid[cell.x + 1][cell.y] : null
        ];
    } else {
        return [
            cell.x > 0 ? grid[cell.x - 1][cell.y] : null,
            cell.x > 0 && cell.y < grid[0].length - 1 ? grid[cell.x - 1][cell.y + 1] : null,
            cell.y > 0 ? grid[cell.x][cell.y - 1] : null,
            cell.y < grid[0].length - 1 ? grid[cell.x][cell.y + 1] : null,
            cell.x < grid.length - 1 ? grid[cell.x + 1][cell.y] : null,
            cell.x < grid.length - 1 && cell.y < grid[0].length - 1 ? grid[cell.x + 1][cell.y + 1] : null
        ];
    }
}

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}