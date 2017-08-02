function Cell(x, y, size, gridX, gridY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.gridX = gridX;
    this.gridY = gridY;
    this.selected = false;
    this.data = new CellData();
    this.polygon = new Polygon(this.x, this.y, this.size, 6);
    this.disabled = false;

    this.translate = function(tx, ty) {
        this.polygon = new Polygon(this.x + tx, this.y + ty, this.size, 6);
    }

    this.draw = function(cameraLocation) {
        var colour = this.data.faction.colour;
        var alpha = 120;
        strokeWeight(2);
        if(this.selected) {
            strokeWeight(6);
            alpha = 255;
        }
        if(mouseX > (this.polygon.x + cameraLocation.x) - this.size && 
           mouseX < (this.polygon.x + cameraLocation.x) + this.size &&
           mouseY > (this.polygon.y + cameraLocation.y) - this.size && 
           mouseY < (this.polygon.y + cameraLocation.y) + this.size) {
            strokeWeight(4);
            alpha = 200;
            dispatchEvent(new CustomEvent('hovered', {detail: this}));
        }
        stroke(colour.red * 2, colour.green * 2, colour.blue * 2, alpha);
        fill(colour.red / 2, colour.green / 2, colour.blue / 2, this.data.foodCap);
        if(this.disabled) {
            stroke(0);
            strokeWeight(2);
            fill(81);
        }
        this.polygon.draw(cameraLocation, this.disabled);
    }

    this.update = function() {}
}