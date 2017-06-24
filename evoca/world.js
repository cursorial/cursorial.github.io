function Cell(location) {
    this.location = location;

    this.temperature = Math.random();
    this.moisture = Math.random();

    this.population = Math.random() * 100;

    this.draw = function(lens) {
        noStroke();
        if(lens.includes('temperature')) {
            fill(150 - this.temperature, this.temperature, 0);
        } else if(lens.includes('population')) {
            fill(20, 20, 20, this.population);
        } else {
            fill(255);
            stroke(0);
        }
        rect(location.x, location.y, 10, 10);
    }
    this.update = function() {
        this.temperature *= 1 + ((Math.random() * 0.04) - 0.02);
    }
}

function World(width, height) {
    var c = [];
    for(var x = 0; x < width; x++) {
        c[x] = [];
        for(var y = 0; y < height; y++) {
            c[x][y] = new Cell({
                x: x * 10,
                y: y * 10
            });
            c[x][y].temperature = Math.abs(150 - (y * 5));
            c[x][y].moisture = Math.random() * x;
        }
    }

    this.cells = c;
}
