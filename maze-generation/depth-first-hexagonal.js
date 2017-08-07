function DepthFirstHexagonalCell(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.visited = false;
    this.starting = false;
    this.backtracked = false;
    this.walls = ['top', 'bottom', 'top-left', 'bottom-left', 'top-right', 'bottom-right'];

    this.getPoint = function(p, theta) {
        var angle = p.TWO_PI / 6;
        var sx = (this.x * this.radius) + p.cos(angle * theta) * this.radius;
        var sy = (this.y * this.radius) + p.sin(angle * theta) * this.radius;
        return {
            x: sx + (this.x * 9) + 15,
            y: sy + (this.y * 10) + (this.x % 2 == 0 ? 12.5 : 0) + 15
        };
    };

    this.draw = function(p) {
        if(this.visited) {
            p.fill(100, 220, 0);
            p.ellipse(this.getPoint(p, 0).x - 14, this.getPoint(p, 0).y, 10);
        }
        
        if(this.backtracked) {
            p.fill(220, 100, 0);
            p.ellipse(this.getPoint(p, 0).x - 14, this.getPoint(p, 0).y, 5);
        }

        if(this.starting) {
            p.fill(220, 0, 100);
            p.ellipse(this.getPoint(p, 0).x - 14, this.getPoint(p, 0).y, 5);
        }

        if(this.walls.includes('top')) {
            var p0 = this.getPoint(p, 4);
            var p1 = this.getPoint(p, 5);   
            p.line(p0.x, p0.y, p1.x, p1.y);
        }
        if(this.walls.includes('bottom')) {
            var p0 = this.getPoint(p, 1);
            var p1 = this.getPoint(p, 2);
            p.line(p0.x, p0.y, p1.x, p1.y);
        }
        if(this.walls.includes('top-left')) {
            var p0 = this.getPoint(p, 3);
            var p1 = this.getPoint(p, 4);
            p.line(p0.x, p0.y, p1.x, p1.y);
        }
        if(this.walls.includes('bottom-left')) {
            var p0 = this.getPoint(p, 2);
            var p1 = this.getPoint(p, 3);
            p.line(p0.x, p0.y, p1.x, p1.y);
        }
        if(this.walls.includes('top-right')) {
            var p0 = this.getPoint(p, 5);
            var p1 = this.getPoint(p, 0);
            p.line(p0.x, p0.y, p1.x, p1.y);
        }
        if(this.walls.includes('bottom-right')) {
            var p0 = this.getPoint(p, 0);
            var p1 = this.getPoint(p, 1);
            p.line(p0.x, p0.y, p1.x, p1.y);
        }
    };
}

var depthFirstHexagonalSketch = function(p) {
    var grid = [];
    var stack = [];
    var currentCell;
    p.setup = function() {
        p.createCanvas(490, 520);
        for(var x = 0; x < 20; x++) {
            grid[x] = [];
            for(var y = 0; y < 20; y++) {
                grid[x][y] = new DepthFirstHexagonalCell(x, y);
            }
        }
        var startX = randRange(0, grid.length - 1);
        var startY = randRange(0, grid.length - 1);
        currentCell = grid[startX][startY];
        currentCell.starting = true;
        currentCell.visited = true;
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
            for(var neighbour of findNeighboursHexGrid(grid, currentCell.x, currentCell.y)) {
                if(neighbour && !neighbour.visited) {
                    unvisitedNeighbours.push(neighbour);
                }
            }
            if(unvisitedNeighbours.length > 0) {
                var neighbourCell = unvisitedNeighbours[randRange(0, unvisitedNeighbours.length)];
                var dx = neighbourCell.x - currentCell.x;
                var dy = neighbourCell.y - currentCell.y;
                if(currentCell.x % 2 == 0) {
                    if(dx == 1 && dy == 0) {
                        currentCell.walls.splice(currentCell.walls.indexOf('top-right'), 1);
                        neighbourCell.walls.splice(neighbourCell.walls.indexOf('bottom-left'), 1);
                    }
                    if(dx == 1 && dy == 1) {
                        currentCell.walls.splice(currentCell.walls.indexOf('bottom-right'), 1);
                        neighbourCell.walls.splice(neighbourCell.walls.indexOf('top-left'), 1);
                    }
                    if(dx == -1 && dy == 0) {
                        currentCell.walls.splice(currentCell.walls.indexOf('top-left'), 1);
                        neighbourCell.walls.splice(neighbourCell.walls.indexOf('bottom-right'), 1);
                    }
                    if(dx == -1 && dy == 1) {
                        currentCell.walls.splice(currentCell.walls.indexOf('bottom-left'), 1);
                        neighbourCell.walls.splice(neighbourCell.walls.indexOf('top-right'), 1);
                    }
                } else {
                    if(dx == 1 && dy == -1) {
                        currentCell.walls.splice(currentCell.walls.indexOf('top-right'), 1);
                        neighbourCell.walls.splice(neighbourCell.walls.indexOf('bottom-left'), 1);
                    }
                    if(dx == 1 && dy == 0) {
                        currentCell.walls.splice(currentCell.walls.indexOf('bottom-right'), 1);
                        neighbourCell.walls.splice(neighbourCell.walls.indexOf('top-left'), 1);
                    }
                    if(dx == -1 && dy == -1) {
                        currentCell.walls.splice(currentCell.walls.indexOf('top-left'), 1);
                        neighbourCell.walls.splice(neighbourCell.walls.indexOf('bottom-right'), 1);
                    }
                    if(dx == -1 && dy == 0) {
                        currentCell.walls.splice(currentCell.walls.indexOf('bottom-left'), 1);
                        neighbourCell.walls.splice(neighbourCell.walls.indexOf('top-right'), 1);
                    }
                }
                if(dx == 0 && dy == -1) {
                    currentCell.walls.splice(currentCell.walls.indexOf('top'), 1);
                    neighbourCell.walls.splice(neighbourCell.walls.indexOf('bottom'), 1);
                }
                if(dx == 0 && dy == 1) {
                    currentCell.walls.splice(currentCell.walls.indexOf('bottom'), 1);
                    neighbourCell.walls.splice(neighbourCell.walls.indexOf('top'), 1);
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
                        for(var neighbour of findNeighboursHexGrid(grid, currentCell.x, currentCell.y)) {
                            if(neighbour && !neighbour.visited) {
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

new p5(depthFirstHexagonalSketch, document.getElementById('depth-first-sketch-hexagonal'));