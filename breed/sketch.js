var lens = ['RaceX', 'RaceX', 'RaceX', 'None'];
var selR, selG, selB, selA;

var cells = [];

function setup() {
    createCanvas(1024, 602);
    for(var x = 0; x < 40; x++) {
        cells[x] = [];
        for(var y = 0; y < 30; y++) {
            cells[x][y] = new Cell(x, y);
            cells[x][y].init();
        }
    }
    frameRate(60);

    selR = createSelect();
    selR.position(10, 610);
    selR.option('Population');
    selR.option('Temperature');
    selR.option('Moisture');
    selR.option('Food');
    selR.option('Water');
    selR.option('Minerals');
    selR.option('RaceX');
    selR.option('RaceY');
    selR.option('None');
    selR.changed(()=>{
        lens[0] = selR.value();
    });

    selG = createSelect();
    selG.position(150, 610);
    selG.option('Population');
    selG.option('Temperature');
    selG.option('Moisture');
    selG.option('Food');
    selG.option('Water');
    selG.option('Minerals');
    selG.option('RaceX');
    selG.option('RaceY');
    selG.option('None');
    selG.changed(()=>{
        lens[1] = selG.value();
    });

    selB = createSelect();
    selB.position(290, 610);
    selB.option('Population');
    selB.option('Temperature');
    selB.option('Moisture');
    selB.option('Food');
    selB.option('Water');
    selB.option('Minerals');
    selB.option('RaceX');
    selB.option('RaceY');
    selB.option('None');
    selB.changed(()=>{
        lens[2] = selB.value();
    });

    selA = createSelect();
    selA.position(430, 610);
    selA.option('Population');
    selA.option('Temperature');
    selA.option('Moisture');
    selA.option('Food');
    selA.option('Water');
    selA.option('Minerals');
    selA.option('RaceX');
    selA.option('RaceY');
    selA.option('None');
    selA.changed(()=>{
        lens[3] = selA.value();
    });
}

function draw() {
    text('Lens: ', 20, 610);
    background(180);
    var worldPopulation = 0;
    noStroke();
    for(var x = 0; x < 40; x++) {
        for(var y = 0; y < 30; y++) {
            var f = [];
            for(var i = 0; i < lens.length; i++) {
                if(lens[i] == 'None') {
                    if(i == 3) {
                        f.push(255);
                    } else {
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
                if(lens[i] == 'RaceX') {
                    var xStack = 0;
                    for(var p of cells[x][y].population) {
                        xStack += p.race.origin.x + 1;
                    }
                    xStack /= (cells[x][y].population.length + 1);
                    f.push(xStack * 4);
                }
                if(lens[i] == 'RaceY') {
                    var yStack = 0;
                    for(var p of cells[x][y].population) {
                        yStack += p.race.origin.y + 1;
                    }
                    yStack /= (cells[x][y].population.length + 1);
                    f.push(yStack * 4);
                }
            }
            fill(f[0], f[1], f[2], f[3]);     
            worldPopulation += cells[x][y].population.length;
            rect(x * 20, y * 20, 20, 20);
            cells[x][y].update(cells);
        }
    }

    var scaledMouseX = Math.floor(mouseX / 20);
    var scaledMouseY = Math.floor(mouseY / 20);

    fill(255);
    text('World Population: ' + worldPopulation, 810, 500);

    if(scaledMouseX >= 0 && scaledMouseX < 40 && scaledMouseY >= 0 && scaledMouseY < 30) {
        var currentCell = cells[scaledMouseX][scaledMouseY];
        text('Location: ' + currentCell.x + ', ' + currentCell.y, 810, 10);
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
            text('Race Origin: ' + person.race.origin.x + ', ' + person.race.origin.y, 820, 120);
            if(person.partner != null) {
                text('Partner: ', 820, 130);
                text('Age: ' + person.partner.age, 830, 140);
                text('Generation: ' + person.partner.generation, 830, 150);
                text('Race Origin: ' + person.partner.race.origin.x + ', ' + person.partner.race.origin.y, 830, 160);
            }
        }

        text('Bachelors: ' + currentCell.bachelors.length, 810, 170);
        text('Number of Races: ' + currentCell.racialDistribution().races.length, 810, 180);
    }
    
}