var lens = ['Temperature', 'Food', 'None', 'Population'];

var cells = [];

function setup() {
    createCanvas(1024, 602);
    for(var x = 0; x < 20; x++) {
        cells[x] = [];
        for(var y = 0; y < 15; y++) {
            cells[x][y] = new Cell(x, y);
            cells[x][y].init();
        }
    }
    frameRate(12);
}

function draw() {
    background(180);
    for(var x = 0; x < 20; x++) {
        for(var y = 0; y < 15; y++) {
            var f = [];
            for(var i = 0; i < lens.length; i++) {
                if(lens[i] == 'None') {
                    if(i == 3) {
                        f.push(255);
                    } else {
                        noStroke();
                        f.push(0);
                    }
                }
                if(lens[i] == 'Population') {
                    f.push(cells[x][y].population.length * 5);
                }
                if(lens[i] == 'Temperature') {
                    f.push(cells[x][y].climate.temperature * 5);
                }
                if(lens[i] == 'Moisture') {
                    f.push(cells[x][y].climate.moisture / 2);
                }
                if(lens[i] == 'Food') {
                    f.push(cells[x][y].resources.food * 5);
                }
                if(lens[i] == 'Water') {
                    f.push(cells[x][y].resources.water);
                }
                if(lens[i] == 'Minerals') {
                    f.push(cells[x][y].resources.minerals);
                }
            }
            fill(f[0], f[1], f[2], f[3]);     
            rect(x * 40, y * 40, 40, 40);
            cells[x][y].update(cells);
        }
    }

    var scaledMouseX = Math.floor(mouseX / 40);
    var scaledMouseY = Math.floor(mouseY / 40);

    if(scaledMouseX >= 0 && scaledMouseX < 20 && scaledMouseY >= 0 && scaledMouseY < 15) {
        var currentCell = cells[scaledMouseX][scaledMouseY];
        fill(255);
        text('Temperature: ' + Math.round(currentCell.climate.temperature), 810, 20);
        text('Moisture: ' + Math.round(currentCell.climate.moisture), 810, 30);
        text('Food (surplus): ' + Math.round(currentCell.resources.food), 810, 40);
        text('Water: ' + Math.round(currentCell.resources.water), 810, 50);
        text('Minerals: ' + Math.round(currentCell.resources.minerals), 810, 60);
        text('Population: ' + Math.round(currentCell.population.length), 810, 70);

        if(currentCell.population.length > 0) {
            var person = currentCell.population[0];
            text('Person: ', 810, 80)
            text('Age: ' + person.age, 820, 90);
            text('Generation: ' + person.generation, 820, 100);
            text('Children: ' + person.children.length, 820, 110);
            if(person.partner != null) {
                text('Partner: ', 820, 120);
                text('Age: ' + person.partner.age, 830, 130);
                text('Generation: ' + person.partner.generation, 830, 140);
            }
        }

        text('Bachelors: ' + currentCell.bachelors.length, 810, 150);
        text('Number of Races: ' + currentCell.racialDistribution().races.length, 810, 160);
    }
    
}