var grid = new Grid(6, 6, 30);

var endTurnButton;
var startOverButton;

var increaseFoodButton, increaseGrowthButton, reduceDeathButton;

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
    increaseFoodButton = createButton("Increase Food Cap");
    increaseFoodButton.position(430, 120);
    increaseGrowthButton = createButton("Increase Population Growth");
    increaseGrowthButton.position(430, 170);
    reduceDeathButton = createButton("Reduce Population Decline Rate");
    reduceDeathButton.position(430, 220);
}

function draw() {
    background(81);
    for(var x = 0; x < grid.data.length; x++) {
        for(var y = 0; y < grid.data[x].length; y++) {
            fill(255);
            grid.data[x][y].draw();
        }
    }
    fill(22);
    rect(420, 30, 350, 350);
    fill(255);
    if(firstCellClicked == null) {
        text('No cell selected', 430, 50);
        increaseFoodButton.hide();
        increaseGrowthButton.hide();
        reduceDeathButton.hide();

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
        text("Cost: " + firstCellClicked.data.increaseFoodCost + " population", 430, 150);
        text("Cost: " + firstCellClicked.data.increaseGrowthCost + " population", 430, 200);
        text("Cost: " + firstCellClicked.data.reduceDeathCost + " population", 430, 250);
    
        increaseFoodButton.show();
        increaseFoodButton.mousePressed(() => {
            if(firstCellClicked.data.playerOwned) {
                if(firstCellClicked.data.food < 255 && 
                firstCellClicked.data.population - firstCellClicked.data.increaseFoodCost > 0) {
                    firstCellClicked.data.food += 1;
                    firstCellClicked.data.population -= firstCellClicked.data.increaseFoodCost;
                    firstCellClicked.data.increaseFoodCost += 1;
                } else {
                    increaseFoodButton.hide();
                    text('Can\'t increase further');
                }
            } else {
                alert('You can only upgrade your own cells!');
            }
        });
        
        increaseGrowthButton.show();
        increaseGrowthButton.mousePressed(() => {
            if(firstCellClicked.data.playerOwned) {
                if(firstCellClicked.data.populationGrowthRate < 1.3 &&
                firstCellClicked.data.population - firstCellClicked.data.increaseGrowthCost > 0) {
                    firstCellClicked.data.populationGrowthRate += 0.01;
                    firstCellClicked.data.population -= firstCellClicked.data.increaseGrowthCost;
                    firstCellClicked.data.increaseGrowthCost += 1;
                } else {
                    increaseGrowthButton.hide();
                    text('Can\'t increase further', 430, 170);
                }
            } else {
                alert('You can only upgrade your own cells!');
            }
        });
        
        reduceDeathButton.show();
        reduceDeathButton.mousePressed(() => {
            if(firstCellClicked.data.playerOwned) {
                if(firstCellClicked.data.populationDeclineRate < 1 &&
                firstCellClicked.data.population - firstCellClicked.data.reduceDeathCost > 0) {
                    firstCellClicked.data.populationDeclineRate += 0.01;
                    firstCellClicked.data.population -= firstCellClicked.data.reduceDeathCost;
                    firstCellClicked.data.reduceDeathCost += 1;
                } else {
                    reduceDeathButton.hide();
                    text('Can\'t reduce further', 430, 220);
                }
            } else {
                alert('You can only upgrade your own cells!');
            }
        });
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