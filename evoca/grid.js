function Grid(width, height, cellSize, offset) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;

    this.cells = [];
    
    this.createGrid = function() {
        for(var x = 0; x < this.width; x++) {
            this.cells[x] = [];
            for(var y = 0; y < this.height; y++) {
                var xOffset = 20;
                var yOffset = 0;
                if(x % 2 == 0) {
                    yOffset = this.cellSize;
                }
                this.cells[x][y] = new Cell(
                    100 + (x * cellSize * 2) - xOffset, 
                    100 + (y * cellSize * 2) - yOffset, 
                    cellSize, x, y);
            }
        }

        for(var i = 0; i < (this.width * this.height) / 20; i++) {
            this.cells[Math.round(Math.random() * (this.width - 1))][Math.round(Math.random() * (this.height - 1))].disabled = true;
        }
    }

    this.translate = function(tx, ty) {
        for(var x = 0; x < width; x++) {
            for(var y = 0; y < height; y++) {
                this.cells[x][y].translate(tx, ty);
            }
        }
    }

    this.draw = function(cameraLocation) {
        for(var x = 0; x < this.width; x++) {
            for(var y = 0; y < this.height; y++) {
                this.cells[x][y].draw(cameraLocation);
            }
        }
    }

    this.findFactionOwnedCells = function(faction) {
        var factionOwnedCells = [];
        for(var x = 0; x < this.width; x++) {
            for(var y = 0; y < this.height; y++) {
                if(this.cells[x][y].data.faction == faction) {
                    factionOwnedCells.push(this.cells[x][y]);
                }
            }
        }
        return factionOwnedCells;
    }

    this.findNeighbours = function(cell) {
        if(cell.gridX % 2 == 0) {
            return [
                cell.gridX > 0 && cell.gridY > 0 ? this.cells[cell.gridX - 1][cell.gridY - 1] : null, 
                cell.gridX > 0 ? this.cells[cell.gridX - 1][cell.gridY] : null,
                cell.gridY > 0 ? this.cells[cell.gridX][cell.gridY - 1] : null,
                cell.gridY < this.height - 1 ? this.cells[cell.gridX][cell.gridY + 1] : null,
                cell.gridX < this.width - 1 && cell.gridY > 0 ? this.cells[cell.gridX + 1][cell.gridY - 1] : null,
                cell.gridX < this.width - 1 ? this.cells[cell.gridX + 1][cell.gridY] : null
            ];
        } else {
            return [
                cell.gridX > 0 ? this.cells[cell.gridX - 1][cell.gridY] : null,
                cell.gridX > 0 && cell.gridY < this.height - 1 ? this.cells[cell.gridX - 1][cell.gridY + 1] : null,
                cell.gridY > 0 ? this.cells[cell.gridX][cell.gridY - 1] : null,
                cell.gridY < this.height - 1 ? this.cells[cell.gridX][cell.gridY + 1] : null,
                cell.gridX < this.width - 1 ? this.cells[cell.gridX + 1][cell.gridY] : null,
                cell.gridX < this.width - 1 && cell.gridY < this.height - 1 ? this.cells[cell.gridX + 1][cell.gridY + 1] : null
            ];
        } 
    }
}