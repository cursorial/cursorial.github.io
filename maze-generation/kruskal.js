var randomisedKruskalSketch = function(p) {
    p.setup = function() {
        p.createCanvas(200, 200);
    }

    p.draw = function() {
        p.background(85);
    }
}

new p5(randomisedKruskalSketch, document.getElementById('randomised-kruskal-sketch'));