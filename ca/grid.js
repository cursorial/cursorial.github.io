function Grid(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.data = [];
    
    this.init = function() {
        var playerX = Math.round(Math.random() * (this.width - 1));
        var playerY = Math.round(Math.random() * (this.height - 1));
        console.log(playerX, playerY);
        for(var x = 0; x < width; x++) {
            this.data.push([]);
            for(var y = 0; y < height; y++) {
                var xOffset = 20;
                var yOffset = 0;
                if(x % 2 == 0) {
                    yOffset = 25;
                }
                this.data[x][y] = new Cell(60 + (x * cellSize * 2) - xOffset, 60 + (y * cellSize * 2) - yOffset, cellSize, x, y);
                if(x == playerX && y == playerY) {
                    this.data[x][y].data.playerOwned = true;
                    this.data[x][y].data.population = 170;
                }      
            }
        }
    }
}