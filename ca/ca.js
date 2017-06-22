var grid = new Grid(6, 6, 30);

var endTurnButton;
var startOverButton;

var increaseFoodButton, increaseGrowthButton, reduceDeathButton, damageReductionsButton;

var balanceAllButton;

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
    increaseFoodButton.position(430, 140);
    increaseFoodButton.mousePressed(() => {
        if(firstCellClicked.data.playerOwned) {
            if(firstCellClicked.data.food < 255 && 
            firstCellClicked.data.population - firstCellClicked.data.increaseFoodCost > 0) {
                firstCellClicked.data.food += 1;
                firstCellClicked.data.population -= firstCellClicked.data.increaseFoodCost;
                firstCellClicked.data.increaseFoodCost *= 1.05;
            } else {
                increaseFoodButton.hide();
                text('Can\'t increase further', 430, 140);
            }
        } else {
            alert('You can only upgrade your own cells!');
        }
    });
    increaseGrowthButton = createButton("Increase Population Growth");
    increaseGrowthButton.position(430, 190);
    increaseGrowthButton.mousePressed(() => {
        if(firstCellClicked.data.playerOwned) {
            if(firstCellClicked.data.populationGrowthRate < 1.3 &&
            firstCellClicked.data.population - firstCellClicked.data.increaseGrowthCost > 0) {
                firstCellClicked.data.populationGrowthRate += 0.01;
                firstCellClicked.data.population -= firstCellClicked.data.increaseGrowthCost;
                firstCellClicked.data.increaseGrowthCost *= 2;
            } else {
                increaseGrowthButton.hide();
                text('Can\'t increase further', 430, 190);
            }
        } else {
            alert('You can only upgrade your own cells!');
        }
    });
    reduceDeathButton = createButton("Reduce Population Decline Rate");
    reduceDeathButton.position(430, 240);
    reduceDeathButton.mousePressed(() => {
        if(firstCellClicked.data.playerOwned) {
            if(firstCellClicked.data.populationDeclineRate < 0.99 &&
            firstCellClicked.data.population - firstCellClicked.data.reduceDeathCost > 0) {
                firstCellClicked.data.populationDeclineRate += 0.01;
                firstCellClicked.data.population -= firstCellClicked.data.reduceDeathCost;
                firstCellClicked.data.reduceDeathCost *= 3;
            } else {
                reduceDeathButton.hide();
                text('Can\'t reduce further', 430, 240);
            }
        } else {
            alert('You can only upgrade your own cells!');
        }
    });
    damageReductionsButton = createButton("Increase Fortifications");
    damageReductionsButton.position(430, 290);
    damageReductionsButton.mousePressed(() => {
        if(firstCellClicked.data.playerOwned) {
            if(firstCellClicked.data.damageReductions < 1 &&
               firstCellClicked.data.population - firstCellClicked.data.damageReductionsCost > 0) {
                firstCellClicked.data.damageReductions += 0.025;
                firstCellClicked.data.population -= firstCellClicked.data.damageReductionsCost;
                firstCellClicked.data.damageReductionsCost *= 1.1;
            } else {
                damageReductionsButton.hide();
                text('Can\'t reduce further', 430, 270);
            }
        } else {
            alert('You can only upgrade your own cells!');
        }
    });
    balanceAllButton = createButton("Balance Population");
    balanceAllButton.position(430, 350);
    balanceAllButton.mouseClicked(() => {
        var totalPlayerPopulation = 0;
        var numberOfPlayerCells = 0;
        for(var x = 0; x < grid.data.length; x++) {
            for(var y = 0; y < grid.data[x].length; y++) {
                if(grid.data[x][y].data.playerOwned) {
                    totalPlayerPopulation += grid.data[x][y].data.population;
                    numberOfPlayerCells++;
                }
            }
        }
        var averagePopulation = totalPlayerPopulation /= numberOfPlayerCells;
        for(var x = 0; x < grid.data.length; x++) {
            for(var y = 0; y < grid.data[x].length; y++) {
                if(grid.data[x][y].data.playerOwned) {
                    grid.data[x][y].data.population = averagePopulation;
                }
            }
        }
    })
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
        damageReductionsButton.hide();
    } else {
        text(
            'Cell at: ' + firstCellClicked.gridX + ', ' + firstCellClicked.gridY + ' selected\n' +
            'Fortifications: ' + firstCellClicked.data.damageReductions.toFixed(3) + '\n' + 
            'Food: ' + Math.round(firstCellClicked.data.food) + '\n' +
            'Population Growth Rate: ' + firstCellClicked.data.populationGrowthRate.toFixed(2) + '\n' +
            'Population Decline Rate: ' + firstCellClicked.data.populationDeclineRate.toFixed(2), 430, 50);
            if(firstCellClicked.data.population < firstCellClicked.data.food) {
                fill(120, 255, 120);
                text('Population is GROWING', 430, 120);
            } else {
                fill(255, 120, 120);
                text('Population is DECLINING', 430, 120);
            }
                if(firstCellClicked.data.peacefulness() == 2) {
                    fill(255, 120, 120);
                    text('This faction is hostile and aggressive', 430, 130);
                }
                if(firstCellClicked.data.peacefulness() == 3) {
                    fill(120, 255, 120);
                    text('This faction is peaceful and passive', 430, 130);
                }
        if(firstCellClicked.data.population - firstCellClicked.data.increaseFoodCost > 0) {
            fill(120, 255, 120);
        } else {
            fill(255, 120, 120);
        }
        text("Cost: " + firstCellClicked.data.increaseFoodCost.toFixed(2) + " population", 430, 170);
        if(firstCellClicked.data.population - firstCellClicked.data.increaseGrowthCost > 0) {
            fill(120, 255, 120);
        } else {
            fill(255, 120, 120);
        }
        text("Cost: " + firstCellClicked.data.increaseGrowthCost.toFixed(2) + " population", 430, 220);
        if(firstCellClicked.data.population - firstCellClicked.data.reduceDeathCost > 0) {
            fill(120, 255, 120);
        } else {
            fill(255, 120, 120);
        }
        text("Cost: " + firstCellClicked.data.reduceDeathCost.toFixed(2) + " population", 430, 270);
        if(firstCellClicked.data.population - firstCellClicked.data.damageReductions > 0) {
            fill(120, 255, 120);
        } else {
            fill(255, 120, 120);
        }
        text("Cost: " + firstCellClicked.data.damageReductionsCost.toFixed(2) + " population", 430, 320);
        increaseFoodButton.show();
        increaseGrowthButton.show();
        reduceDeathButton.show();
        damageReductionsButton.show();
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