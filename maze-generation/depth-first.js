

function DepthFirstCell(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.starting = false;
    this.backtracked = false;
    this.walls = ["left", "right", "up", "down"];

    this.removeWall = function(wall) {
        this.walls.splice(this.walls.indexOf(wall), 1);
    }

    this.draw = function(p) {
        if (this.visited) {
            p.fill(100, 220, 0);
            p.ellipse(x * 20 + 10, y * 20 + 10, 10);
        }
        if (this.starting) {
            p.fill(220, 0, 100);
            p.ellipse(x * 20 + 10, y * 20 + 10, 5);
        }
        if (this.walls.includes("left")) {
            p.line(x * 20, y * 20, x * 20, y * 20 + 19);
        }
        if (this.walls.includes("right")) {
            p.line(x * 20 + 19, y * 20, x * 20 + 19, y * 20 + 19);
        }
        if (this.walls.includes("up")) {
            p.line(x * 20, y * 20, x * 20 + 19, y * 20);
        }
        if (this.walls.includes("down")) {
            p.line(x * 20, y * 20 + 19, x * 20 + 19, y * 20 + 19);
        }
        if (this.backtracked) {
            p.fill(220, 100, 0);
            p.ellipse(x * 20 + 10, y * 20 + 10, 5);
        }
    };
}

function DepthFirstGrid(width, height) {
    this.data = [];
    for(var x = 0; x < width; x++) {
        this.data[x] = [];
        for(var y = 0; y < height; y++) {
            this.data[x][y] = new DepthFirstCell(x, y);
        }
    }

    this.findUnvisitedNeighbours = function(cell) {
        return [
            cell.x > 0 ? this.data[cell.x - 1][cell.y] : null,
            cell.y > 0 ? this.data[cell.x][cell.y - 1] : null,
            cell.x < this.data.length - 1 ? this.data[cell.x + 1][cell.y] : null,
            cell.y < this.data[0].length - 1 ? this.data[cell.x][cell.y + 1] : null
        ].filter(function(item) { return item != null && !item.visited; });
    }
}

var depthFirstSketch = function(p) {
    var grid;
    var stack = [];
    var currentCell;
    p.setup = function() {
        p.createCanvas(400, 400);
        grid = new DepthFirstGrid(20, 20);
        var startX = randRange(0, grid.data.length - 1);
        var startY = randRange(0, grid.data.length - 1);
        currentCell = grid.data[startX][startY];
        currentCell.visited = true;
        currentCell.starting = true;
    };

    p.draw = function() {
        p.background(85);
        for (var x = 0; x < grid.data.length; x++) {
            for (var y = 0; y < grid.data[x].length; y++) {
                grid.data[x][y].draw(p);
            }
        }

        if (currentCell) {
            var unvisitedNeighbours = grid.findUnvisitedNeighbours(currentCell);
            if (unvisitedNeighbours.length > 0) {
                var neighbourCell =
                    unvisitedNeighbours[
                        randRange(0, unvisitedNeighbours.length)
                    ];
                var dx = currentCell.x - neighbourCell.x;
                var dy = currentCell.y - neighbourCell.y;
                if (dx == 1) {
                    currentCell.removeWall('left');
                    neighbourCell.removeWall('right');
                }
                if (dx == -1) {
                    currentCell.removeWall('right');
                    neighbourCell.removeWall('left');
                }
                if (dy == 1) {
                    currentCell.removeWall('up');
                    neighbourCell.removeWall('down');
                }
                if (dy == -1) {
                    currentCell.removeWall('down');
                    neighbourCell.removeWall('up');
                }
                stack.push(neighbourCell);
                currentCell = neighbourCell;
                currentCell.visited = true;
            } else {
                currentCell = stack.pop();
                if (currentCell) {
                    currentCell.backtracked = true;
                }
            }
        } else {
            p.setup();
        }
    };
};

new p5(depthFirstSketch, document.getElementById("depth-first-sketch"));
