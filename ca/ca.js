var grid = new Grid(6, 6, 30);
var player = new Player();

var endTurnButton;
var startOverButton;

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
    fill(255);
    textSize(15);
    text("How to play:", 400, 20);
    fill(180);
    text("-You have control of the cell with a blue border.", 400, 40);
    fill(220);
    text("-If you hover over an adjacent cell that is green\nyou can click it to take it over.", 400, 60);
    fill(180);
    text("-If the cell is red you cannot take it over.", 400, 100);
    fill(220);
    text("-When you expand your new cell will also have a\nblue border.", 400, 120);
    fill(180);
    text("-The number in a cell represent's that cell's population", 400, 160);
    fill(220);
    text("-Beware of other cells with higher numbers,\nthey may take your territory if your population is too low.", 400, 180)
    fill(180);
    text("-Be careful when you expand, your population will drop\nsignificantly in order to take new territories.", 400, 220);
    fill(200, 200, 120);
    text("Keyboard shortcuts\nSpace - End Turn", 400, 300);
    text("You can start over by refreshing the page", 400, 340);
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