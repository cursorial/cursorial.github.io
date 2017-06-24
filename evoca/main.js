var grid = new Grid(8, 8, 55);
var ui = new UI();

var multiplier = 110;
var directionalGrids = [];
var cameraLocation = {
    x: 0,
    y: 0
};

function setup() {
    createCanvas(1024, 768);
    grid.createGrid();
    for(var i = 0; i < 8; i++) {
        directionalGrids.push(new Grid(grid.width, grid.height, 55));
        directionalGrids[i].createGrid();
        for(var x = 0; x < directionalGrids[i].width; x++) {
            for(var y = 0; y < directionalGrids[i].height; y++) {
                directionalGrids[i].cells[x][y] = $.extend(true, {}, grid.cells[x][y]);
            }
        }
    }
    

    directionalGrids[0].translate(0, -grid.height * multiplier);
    directionalGrids[1].translate(0, grid.height * multiplier);
    directionalGrids[2].translate(-grid.width * multiplier, 0);
    directionalGrids[3].translate(grid.width * multiplier, 0);
    directionalGrids[4].translate(-grid.width * multiplier, -grid.height * multiplier);
    directionalGrids[5].translate(-grid.width * multiplier, grid.height * multiplier);
    directionalGrids[6].translate(grid.width * multiplier, -grid.height * multiplier);
    directionalGrids[7].translate(grid.width * multiplier, grid.height * multiplier);
    frameRate(60);
}

function draw() {
    background(255);
    grid.draw(cameraLocation);
    for(var i = 0; i < 8; i++) {
        directionalGrids[i].draw(cameraLocation);
    }
    if(mouseX < 0) {
        cameraLocation.x -= 0.1 * mouseX;
    }
    if(mouseY < 0) {
        cameraLocation.y -= 0.1 * mouseY;
    }
    if(mouseX > width) {
        cameraLocation.x -= 0.1 * (mouseX - width);
    }
    if(mouseY > height) {
        cameraLocation.y -= 0.1 * (mouseY - height);
    }

    if(cameraLocation.x <= -grid.width * multiplier) {
        cameraLocation.x += grid.width * multiplier;
    }
    if(cameraLocation.x >= grid.width * multiplier) {
        cameraLocation.x -= grid.width * multiplier;
    }
    if(cameraLocation.y >= grid.height * multiplier) {
        cameraLocation.y -= grid.height * multiplier;
    }
    if(cameraLocation.y <= -grid.height * multiplier) {
        cameraLocation.y += grid.height * multiplier;
    }

    if(keyIsDown(LEFT_ARROW)) {
        cameraLocation.x += 30;
    }
    if(keyIsDown(RIGHT_ARROW)) {
        cameraLocation.x -= 30;
    }
    if(keyIsDown(UP_ARROW)) {
        cameraLocation.y += 30;
    }
    if(keyIsDown(DOWN_ARROW)) {
        cameraLocation.y -= 30;
    }
    ui.draw();
}

function mouseClicked() {
    
}

