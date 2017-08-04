function KruskalCellEdge(x, y, id) {
    this.x = 0;
    this.y = 0;
    this.id = id;
}

function KruskalCell(x, y) {
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
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var randomisedKruskalSketch = function(p) {
    var grid = [];
    var sets = [];

    var edges = [];
    p.setup = function() {
        p.createCanvas(200, 200);
        for(var x = 0; x < 10; x++) {
            grid[x] = [];
            for(var y = 0; y < 10; y++) {
                grid[x][y] = new KruskalCell();
                for(var edge of grid[x][y].edges) {
                    edges.push(edge);
                    sets.push(grid[x][y]);
                }
            }
        }
        edges = shuffle(edges);
    }

    p.draw = function() {
        p.background(85);
        for(var edge of edges) {
            if(edge.id == 0) {
                edges.splice(edges.indexOf(edge), 1);
                edges.splice(edges.indexOf(grid[edge.x - 1][edge.y].edges[2]), 1);
                grid[edge.x][edge.y].edges.splice(0, 1);
                grid[edge.x - 1][edge.y].edges.splice(2, 1);
            }
            if(edge.id == 1) {

            }
            if(edge.id == 2) {

            }
            if(edge.id == 3) {

            }
        }
    }
}

new p5(randomisedKruskalSketch, document.getElementById('randomised-kruskal-sketch'));