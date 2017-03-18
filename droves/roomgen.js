function generateRoom(mapWidth, mapHeight) {
    var locationX = randRange(10, mapWidth - 10);
    var locationY =  randRange(10, mapHeight - 10);

    var width =  randRange(3, 4);
    var height = randRange(3, 4);

    var outcropsX = []
    for(var i = 0; i < width; i++) {
        var outcropLength = randRange(0, 3);
        outcropsX.push(outcropLength);
    }

    var outcropsY = []
    for(var i = 0; i < height; i++) {
        var outcropLength = randRange(0, 3);
        outcropsY.push(outcropLength);
    }

    return {
        "x": locationX,
        "y": locationY,
        "width": width,
        "height": height,
        "outcrops": {
            "x": outcropsX,
            "y": outcropsY
        }
    }
}