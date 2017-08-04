function DepthFirstCell(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.walls = ['left', 'right', 'up', 'down'];
}

var grid = [];
var stack = [];

var depthFirstSketch = function(p) {
    var currentCell;
    var backtracking = false;
    p.setup = function() {
        p.createCanvas(200, 200);
        for(var x = 0; x < 10; x++) {
            grid[x] = [];
            for(var y = 0; y < 10; y++) {
                grid[x][y] = new DepthFirstCell(x, y);
            }
        }
        var startX = randRange(0, grid.length - 1);
        var startY = randRange(0, grid.length - 1);
        currentCell = grid[startX][startY];
        currentCell.visited = true;
        p.frameRate(20);
    }

    p.draw = function() {
        p.background(85);
        for(var x = 0; x < grid.length; x++) {
            for(var y = 0; y < grid[x].length; y++) {
                var cell = grid[x][y];
                p.stroke(0, 0, 0);
                if(cell.walls.includes('left')) {
                    p.line((x * 20), (y * 20), (x * 20), (y * 20) + 19);
                }
                if(cell.walls.includes('right')) {
                    p.line((x * 20) + 19, (y * 20), (x * 20) + 19, (y * 20) + 19);
                }
                if(cell.walls.includes('up')) {
                    p.line((x * 20), (y * 20), (x * 20) + 19, (y * 20));
                }
                if(cell.walls.includes('down')) {
                    p.line((x * 20), (y * 20) + 19, (x * 20) + 19, (y * 20) + 19);
                }
            }
        }
        
        var unvisitedNeighbours = [];
        if(currentCell) {
            for(var neighbour of findNeighboursSquareGrid(grid, currentCell.x, currentCell.y)) {
                if(!neighbour.visited) {
                    unvisitedNeighbours.push(neighbour);
                }
            }
            if(unvisitedNeighbours.length > 0) {
                var neighbourCell = unvisitedNeighbours[randRange(0, unvisitedNeighbours.length), randRange(0, unvisitedNeighbours.length)];
                var dx = currentCell.x - neighbourCell.x;
                var dy = currentCell.y - neighbourCell.y;
                if(dx == 1) {
                    currentCell.walls.splice(currentCell.walls.indexOf('left'), 1);
                    neighbourCell.walls.splice(neighbourCell.walls.indexOf('right'), 1);
                }
                if(dx == -1) {
                    currentCell.walls.splice(currentCell.walls.indexOf('right'), 1);
                    neighbourCell.walls.splice(neighbourCell.walls.indexOf('left'), 1);
                }
                if(dy == 1) {
                    currentCell.walls.splice(currentCell.walls.indexOf('up'), 1);
                    neighbourCell.walls.splice(neighbourCell.walls.indexOf('bottom'), 1);
                }
                if(dy == -1) {
                    currentCell.walls.splice(currentCell.walls.indexOf('bottom'), 1);
                    neighbourCell.walls.splice(neighbourCell.walls.indexOf('up'), 1);
                }
                stack.push(neighbourCell);
                currentCell = neighbourCell;
                currentCell.visited = true;
            } else {
                while(currentCell && unvisitedNeighbours.length == 0) {
                    p.fill(0, 120, 120);
                    p.rect(currentCell.x * 20, currentCell.y * 20, 20, 20);
                    var unvisitedNeighbours = [];
                    currentCell = stack.pop();
                    if(currentCell) {
                        for(var neighbour of findNeighboursSquareGrid(grid, currentCell.x, currentCell.y)) {
                            if(!neighbour.visited) {
                                unvisitedNeighbours.push(neighbour);
                            }
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    }
}

new p5(depthFirstSketch, document.getElementById('depth-first-sketch'));