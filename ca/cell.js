function CellData() {
    this.playerOwned = false;
    this.food = Math.random() * 150;
    this.population = this.food * 0.5;
    this.populationGrowthRate = 1.01;
    this.populationDeclineRate = 0.95;
    this.increaseFoodCost = 1;
    this.increaseGrowthCost = 25;
    this.reduceDeathCost = 1;
}

function Cell(x, y, size, gridX, gridY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.data = new CellData();
    this.gridX = gridX;
    this.gridY = gridY;
    
    this.polygon = function(x, y, radius, npoints) {
        var angle = TWO_PI / npoints;
        beginShape();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = x + cos(a) * radius;
            var sy = y + sin(a) * radius;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }
    
    this.playerOwnedCells = function() {
        var playerOwnedCells = [];
        for(var x = 0; x < grid.data.length; x++) {
            for(var y = 0; y < grid.data[x].length; y++) {
                if(grid.data[x][y].data.playerOwned) {
                    playerOwnedCells.push(grid.data[x][y]);
                }
            }
        }
        return playerOwnedCells;
    }

    this.draw = function() {
        smooth();
        fill(255, 255, 255, this.data.population);
        strokeWeight(10);
        if(this.mouseOver()) {
            if(this.data.playerOwned) {
                fill(120, 120, 255, this.population);
            }

            for(var p of this.playerOwnedCells()) {
                if(this.neighbours().includes(p)) {
                    if(this.data.population > p.data.population) {
                        fill(255, 120, 120, this.population);
                    } else {
                        fill(120, 255, 120, this.population);
                    }
                } else {
                    fill(120, 120, 255, this.population);
                }
            }
        }
        if(this.data.playerOwned) {
            stroke(120, 120, 255, 150);
        } else {
            stroke(0);
        }
        this.polygon(this.x, this.y, this.size, 6);
        fill(0);
        stroke(0);
        strokeWeight(1);
        textSize(10);
        text(Math.round(this.data.population), this.x - 6, this.y + 3);

        if(this.playerOwnedCells().length == 0) {
            push();
            stroke(0);
            fill(81);
            rect(50, 50, 300, 300);
            stroke(230);
            fill(230);
            textSize(30);
            text("Game Over", 125, 150);
            text("Click Start Over", 90, 250);
            pop();
        }
        if(this.playerOwnedCells().length == grid.data.length * grid.data[0].length) {
            push();
            stroke(0);
            fill(81);
            rect(50, 50, 300, 300);
            stroke(230);
            fill(230);
            textSize(30);
            text("Game Won", 125, 150);
            text("Click Start Over", 90, 250);
            pop();
        }
    }
    
    this.update = function() {
        if(!this.data.playerOwned) {
            var neighbours = this.neighbours();
            if(neighbours != null) {
                for(var neighbour of neighbours) {
                    if(neighbour != null) {
                        if(neighbour.data.population < this.data.population / 3) {
                            this.data.population = this.data.population - (neighbour.data.population * Math.random());
                            neighbour.data.population = this.data.population / 2;
                            neighbour.data.playerOwned = false;
                        }
                    }
                }
            }
        }
        if(this.data.population < this.data.food && this.data.population > 0) {
            this.data.population *= this.data.populationGrowthRate;
        } else {
            this.data.population *= this.data.populationDeclineRate;
        }
        if(this.data.population < 0) {
            this.data.population = 2;
        }
    }
    
    this.neighbours = function() {
        if(this.gridX % 2 == 0) {
            return [
                this.gridX > 0 && this.gridY > 0 ? grid.data[this.gridX - 1][this.gridY - 1] : null, 
                this.gridX > 0 ? grid.data[this.gridX - 1][this.gridY] : null,
                this.gridY > 0 ? grid.data[this.gridX][this.gridY - 1] : null,
                this.gridY < grid.height - 1 ? grid.data[this.gridX][this.gridY + 1] : null,
                this.gridX < grid.width - 1 && this.gridY > 0 ? grid.data[this.gridX + 1][this.gridY - 1] : null,
                this.gridX < grid.width - 1 ? grid.data[this.gridX + 1][this.gridY] : null
            ];
        } else {
            return [
                this.gridX > 0 ? grid.data[this.gridX - 1][this.gridY] : null,
                this.gridX > 0 && this.gridY < grid.height - 1 ? grid.data[this.gridX - 1][this.gridY + 1] : null,
                this.gridY > 0 ? grid.data[this.gridX][this.gridY - 1] : null,
                this.gridY < grid.height - 1 ? grid.data[this.gridX][this.gridY + 1] : null,
                this.gridX < grid.width - 1 ? grid.data[this.gridX + 1][this.gridY] : null,
                this.gridX < grid.width - 1 && this.gridY < grid.height - 1 ? grid.data[this.gridX + 1][this.gridY + 1] : null
            ];
        }          
    }

    this.clicked = function() {
        if(this.mouseOver()) {
            if(firstCellClicked == null) {
                firstCellClicked = this;
            } else if(secondCellClicked == null) {
                secondCellClicked = this;
            }
            
            if(firstCellClicked != null && secondCellClicked != null) {
                if(firstCellClicked == secondCellClicked) {
                    firstCellClicked = null;
                    secondCellClicked = null;
                } else if(firstCellClicked.neighbours().includes(secondCellClicked)) {
                    if(firstCellClicked != null && secondCellClicked != null) {
                        if(firstCellClicked.data.playerOwned && secondCellClicked.data.playerOwned) {
                            var average = (firstCellClicked.data.population + secondCellClicked.data.population) / 2;
                            firstCellClicked.data.population = average;
                            secondCellClicked.data.population = average;
                        } else if(firstCellClicked.data.playerOwned && !secondCellClicked.data.playerOwned) {
                            if(firstCellClicked.data.population - secondCellClicked.data.population < 0) {
                                firstCellClicked.data.population /= 2;
                                secondCellClicked.data.population -= firstCellClicked.data.population;
                            } else {
                                firstCellClicked.data.population -= secondCellClicked.data.population * Math.random();
                                firstCellClicked.data.population /= 2;
                                secondCellClicked.data.population = firstCellClicked.data.population;
                                secondCellClicked.data.playerOwned = true;
                            }
                        } else {
                            alert("Invalid Move! You can only control your own cells.");
                        }
                    }
                }
                firstCellClicked = secondCellClicked;
                secondCellClicked = null;
            }
        }
    }

    this.mouseOver = function() {
        return (mouseX > this.x - this.size && mouseX < this.x + this.size &&
                mouseY > this.y - this.size && mouseY < this.y + this.size);
    }
}
