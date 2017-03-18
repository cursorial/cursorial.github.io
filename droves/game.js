var WIDTH = 800
var HEIGHT = 600
var TILESIZE = 20

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', 
    { 
        preload: preload, 
        create: create, 
        update: update 
    });

function preload() {
    game.load.image('room', 'assets/room.png');
    game.load.image('wall', 'assets/wall.png');
}

function create() {
    var room = generateRoom(WIDTH / TILESIZE, HEIGHT / TILESIZE);
    for(var x = room['x']; x < room['x'] + room['width']; x++) {
        for(var y = room['y']; y < room['y'] + room['height']; y ++) {
            game.add.sprite(x * TILESIZE, y * TILESIZE, 'wall');
        }
    }
    for(var x = 0; x < room['outcrops']['x'].length; x++) {
        var outcropsLength = room['outcrops']['x'][x];
        for(var o = 1; o <= outcropsLength; o++) {
            game.add.sprite((room['x'] + x) * TILESIZE, (room['y'] - o) * TILESIZE, 'wall');
            game.add.sprite((room['x'] + room['width'] - x - 1) * TILESIZE, (room['y'] + room['height'] + o - 1) * TILESIZE, 'wall');
        }
    }
    for(var x = 0; x < room['outcrops']['y'].length; x++) {
        var outcropsLength = room['outcrops']['y'][x];
        for(var o = 1; o <= outcropsLength; o++) {
            game.add.sprite((room['x'] - o) * TILESIZE, (room['y'] + x) * TILESIZE, 'wall');
            game.add.sprite((room['x'] + room['width'] + o - 1) * TILESIZE, (room['y'] + room['height'] - x - 1) * TILESIZE, 'wall');
        }
    }
}

function update() {

} 