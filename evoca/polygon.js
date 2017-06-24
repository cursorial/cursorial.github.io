function Polygon(x, y, radius, points) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.points = points;
    
    this.draw = function(cameraLocation, disabled) {
        var angle = TWO_PI / this.points;
        beginShape();
        for(var a = 0; a < TWO_PI; a += angle) {
            var sx = cameraLocation.x + (this.x + cos(a) * this.radius);
            var sy = cameraLocation.y + (this.y + sin(a) * this.radius);
            vertex(sx, sy);
        }
        endShape(CLOSE);
        if(disabled) {
            stroke(0);
            line(cameraLocation.x + this.x - 35, cameraLocation.y + this.y - 20, 
                 cameraLocation.x + this.x + 35, cameraLocation.y + this.y + 20);
        }
    }    
}