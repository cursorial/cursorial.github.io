function UI() {
    addEventListener('hovered', function(e) {
        console.log(e.detail);
    });

    this.draw = function() {
        fill(80);
        rect(824, 0, 200, 668);
        rect(0, 668, 1024, 100);
    }
}