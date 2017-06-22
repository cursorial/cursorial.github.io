var grid = new Grid(6, 6, 30);

var endTurnButton;
var startOverButton;

var firstCellClicked = null;
var secondCellClicked = null;

function update() {
   for(var x = 0; x < grid.data.length; x++) {
       for(var y = 0; y < grid.data[x].length; y++) {
           grid.data[x][y].update();
       }
   } 
}

function setup() {
    createCanvas(800, 420);
    grid.init();
    frameRate(60);
    endTurnButton = createButton('End Turn');
    endTurnButton.position(10, 400);
    endTurnButton.mousePressed(update);
    startOverButton = createButton('Start Over');
    startOverButton.position(100, 400);
    startOverButton.mousePressed(() => {location.reload()});
}
function draw() {
    background(81);
    for(var x = 0; x < grid.data.length; x++) {
        for(var y = 0; y < grid.data[x].length; y++) {
            fill(255);
            grid.data[x][y].draw();
        }
    }
    //ui
    fill(22);
    rect(420, 30, 350, 350);
    fill(255);
    if(firstCellClicked == null) {
        text('No cell selected', 430, 50);
    } else {
        text(
            'Cell at: ' + firstCellClicked.gridX + ', ' + firstCellClicked.gridY + ' selected\n' + 
            'Food: ' + Math.round(firstCellClicked.data.food) + '\n' +
            'Population Growth Rate: ' + firstCellClicked.data.populationGrowthRate + '\n' +
            'Population Decline Rate: ' + firstCellClicked.data.populationDeclineRate, 430, 50);
            if(firstCellClicked.data.population < firstCellClicked.data.food) {
                fill(120, 255, 120);
                text('Population is GROWING', 430, 100);
            } else {
                fill(255, 120, 120);
                text('Population is DECLINING', 430, 100);
            }

        var increaseFoodButton, increaseGrowthButton, reduceDeathButton;
        increaseFoodButton = createButton("Increase Food Cap");
        increaseFoodButton.position(430, 120);
        increaseFoodButton.mousePressed(() => {
            firstCellClicked.data.food += 1;
            firstCellClicked.data.population -= 3;
        });
        text("Cost: 3 population", 430, 150);

        increaseGrowthButton = createButton("Increase Population Growth");
        increaseGrowthButton.position(430, 170);
        increaseGrowthButton.mousePressed(() => {
            firstCellClicked.data.populationGrowthRate += 0.01;
            firstCellClicked.data.population -= 5;
        });
        text("Cost: 5 population", 430, 200);

        reduceDeathButton = createButton("Reduce Population Decline Rate");
        reduceDeathButton.position(430, 220);
        reduceDeathButton.mousePressed(() => {
            firstCellClicked.data.populationDeclineRate += 0.02;
            firstCellClicked.data.population -= 5;
        });
        text("Cost: 5 population", 430, 250);
    }
}

function keyPressed() {
    if(key == ' ') {
        update();
        return false;
    }
}

function mouseClicked() {
    for(var x = 0; x < grid.data.length; x++) {
        for(var y = 0; y < grid.data[x].length; y++) {
            grid.data[x][y].clicked();
        }
    }
}