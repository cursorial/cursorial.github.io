var recursiveBacktrackerSketch = function(p) {
    p.setup = function() {
        p.createCanvas(200, 200);
    }

    p.draw = function() {
        p.background(85);
    }
}

new p5(recursiveBacktrackerSketch, document.getElementById('recursive-backtracker-sketch'));