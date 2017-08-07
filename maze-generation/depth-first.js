function DepthFirstCell(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.starting = false;
    this.backtracked = false;
    this.walls = ['left', 'right', 'up', 'down'];

    this.draw = function(p) {
        if(this.visited) {
            p.fill(100, 220, 0);
            p.ellipse((x * 20 + 10), (y * 20) + 10, 10);
        }
        if(this.starting) {
            p.fill(220, 0, 100);
            p.ellipse((x * 20) + 10, (y * 20) + 10, 5);
        }
        if(this.walls.includes('left')) {
            p.line((x * 20), (y * 20), (x * 20), (y * 20) + 19);
        }
        if(this.walls.includes('right')) {
            p.line((x * 20) + 19, (y * 20), (x * 20) + 19, (y * 20) + 19);
        }
        if(this.walls.includes('up')) {
            p.line((x * 20), (y * 20), (x * 20) + 19, (y * 20));
        }
        if(this.walls.includes('down')) {
            p.line((x * 20), (y * 20) + 19, (x * 20) + 19, (y * 20) + 19);
        }
        if(this.backtracked) {
            p.fill(220, 100, 0);
            p.ellipse((x * 20) + 10, (y * 20) + 10, 5);
        }
    }
}

var depthFirstSketch = function(p) {
    var grid = [];
    var stack = [];
    var currentCell;
    p.setup = function() {
        p.createCanvas(400, 400);
        for(var x = 0; x < 20; x++) {
            grid[x] = [];
            for(var y = 0; y < 20; y++) {
                grid[x][y] = new DepthFirstCell(x, y);
            }
        }
        var startX = randRange(0, grid.length - 1);
        var startY = randRange(0, grid.length - 1);
        currentCell = grid[startX][startY];
        currentCell.visited = true;
        currentCell.starting = true;
    }

    p.draw = function() {
        p.background(85);
        for(var x = 0; x < grid.length; x++) {
            for(var y = 0; y < grid[x].length; y++) {
                grid[x][y].draw(p);
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
                var neighbourCell = unvisitedNeighbours[randRange(0, unvisitedNeighbours.length)];
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
                if(currentCell && unvisitedNeighbours.length == 0) {
                    var unvisitedNeighbours = [];
                    currentCell = stack.pop();
                    if(currentCell) {
                        currentCell.backtracked = true;
                        for(var neighbour of findNeighboursSquareGrid(grid, currentCell.x, currentCell.y)) {
                            if(!neighbour.visited) {
                                unvisitedNeighbours.push(neighbour);
                            }
                        }
                    }
                }
            }
        } else {
            p.setup();
        }
    }
}

new p5(depthFirstSketch, document.getElementById('depth-first-sketch'));