function KruskalCellEdge(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
}

function KruskalCell(x, y, set) {
    this.x = x;
    this.y = y;
    this.edges = [
        //left wall
        new KruskalCellEdge(x, y, 0), 
        //top wall
        new KruskalCellEdge(x, y, 1), 
        //right wall
        new KruskalCellEdge(x, y, 2), 
        //bottom wall
        new KruskalCellEdge(x, y, 3)
    ];
    this.set = set;

    this.draw = function(p) {
        for(var edge of this.edges) {
            p.strokeWeight(2);
            p.stroke(0, 0, 0, 255);
            if(edge.id == 0) {
                p.line(this.x * 20, this.y * 20, (this.x * 20), (this.y * 20) + 20);
            }
            if(edge.id == 1) {
                p.line(this.x * 20, this.y * 20, (this.x * 20) + 20, this.y * 20);
            }
            if(edge.id == 2) {
                p.line((this.x * 20) + 20, this.y * 20, (this.x * 20) + 20, (this.y * 20) + 20);
            } 
            if(edge.id == 3) {
                p.line(this.x * 20, (this.y * 20) + 20, (this.x * 20) + 20, (this.y * 20) + 20);
            }
            p.fill(this.set);
            p.noStroke();
            p.rect((this.x * 20), (this.y * 20), 20, 20);
        }
    }
}

var randomisedKruskalSketch = function(p) {
    var grid = [];

    var edges = [];
    var paths = [];
    p.setup = function() {
        p.createCanvas(400, 400);
        for(var x = 0; x < 20; x++) {
            grid[x] = [];
            for(var y = 0; y < 20; y++) {
                grid[x][y] = new KruskalCell(x, y, (x * 20) + y);
                for(var edge of grid[x][y].edges) {
                    edges.push(edge);
                } 
            }
        }
    }

    p.draw = function() {
        p.background(85);
        for(var x = 0; x < 20; x++) {
            for(var y = 0; y < 20; y++) {
                grid[x][y].draw(p);
            }
        }

        var edge = edges[randRange(0, edges.length - 1)];
        if(edge.id == 0 && edge.x > 0 && grid[edge.x][edge.y].set != grid[edge.x - 1][edge.y].set) {
            edges.splice(edges.indexOf(edge), 1);
            edges.splice(edges.indexOf(grid[edge.x - 1][edge.y].edges[2]), 1);
            grid[edge.x][edge.y].edges.splice(0, 1);
            grid[edge.x - 1][edge.y].edges.splice(2, 1);
            grid[edge.x - 1][edge.y].set = grid[edge.x][edge.y].set;
        }
        if(edge.id == 1 && edge.y > 0 && grid[edge.x][edge.y].set != grid[edge.x][edge.y - 1].set) {
            edges.splice(edges.indexOf(edge), 1);
            edges.splice(edges.indexOf(grid[edge.x][edge.y - 1].edges[3]), 1);
            grid[edge.x][edge.y].edges.splice(1, 1);
            grid[edge.x][edge.y - 1].edges.splice(3, 1);
            grid[edge.x][edge.y - 1].set = grid[edge.x][edge.y].set;
        }
        if(edge.id == 2 && edge.x < grid.length - 1 && grid[edge.x][edge.y].set != grid[edge.x + 1][edge.y].set) {
            edges.splice(edges.indexOf(edge), 1);
            edges.splice(edges.indexOf(grid[edge.x + 1][edge.y].edges[0]), 1);
            grid[edge.x][edge.y].edges.splice(2, 1);
            grid[edge.x + 1][edge.y].edges.splice(0, 1);
            grid[edge.x + 1][edge.y].set = grid[edge.x][edge.y].set;
        }
        if(edge.id == 3 && edge.y < grid[0].length - 1 && grid[edge.x][edge.y].set != grid[edge.x][edge.y + 1].set) {
            edges.splice(edges.indexOf(edge), 1);
            edges.splice(edges.indexOf(grid[edge.x][edge.y + 1].edges[1]), 1);
            grid[edge.x][edge.y].edges.splice(3, 1);
            grid[edge.x][edge.y + 1].edges.splice(1, 1);
            grid[edge.x][edge.y + 1].set = grid[edge.x][edge.y].set;
        }
    }
}

new p5(randomisedKruskalSketch, document.getElementById('randomised-kruskal-sketch'));