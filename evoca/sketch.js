var world;
var lens;

function setup() {
    createCanvas(800, 600);
    world = new World(80, 60);
    lens = ['temperature'];
}
function draw() {
    background(255);
    for(var x = 0; x < world.cells.length; x++) {
        for(var y = 0; y < world.cells[x].length; y++) {
            world.cells[x][y].draw(lens);
            world.cells[x][y].update();
        }
    }

}