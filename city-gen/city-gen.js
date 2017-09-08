function Building(x, y, width, height, depth) {
    this.geometry = new THREE.BoxGeometry(width, height, depth);
    this.material = new THREE.MeshLambertMaterial({ color: 0x888888 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.x = x;
    this.mesh.position.y = height / 2;
    this.mesh.position.z = y;

    this.width = width;
    this.height = height;
    this.depth = depth;
}

function Road(x, y) {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({ color: 0x333333 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.x = x;
    this.mesh.position.y = 0;
    this.mesh.position.z = y;
}

function Grass(x, y) {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({ color: 0x22FF32 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.x = x;
    this.mesh.position.y = 0;
    this.mesh.position.z = y;
}

function CityChunk(x, y) {
    this.x = x;
    this.y = y;
    
    this.grid = [];
}

function generateCityChunk(x, y) {
    var cityChunk = new CityChunk(x, y);
    for(var x = 0; x <= 12; x++) {
        cityChunk.grid[x] = [];
        for(var y = 0; y <= 12; y++) {
            if(x % 6 == 3 || y % 6 == 3) {
                cityChunk.grid[x][y] = new Road(x, y);
            } else {
                Math.random() > 0.5 ? cityChunk.grid[x][y] = new Building(x, y, 1 , Math.ceil(Math.random() * 3), 1) : cityChunk.grid[x][y] = new Grass(x, y);
            }
        }
    }
    
    return cityChunk;
}

function expandCityChunk(chunk) {
    var building = generateBuilding(0, 0);
    for(var x = 0; x < building.width; x++) {
        for(var y = 0; y < building.depth; y++) {
            
        }
    }
}

function updateCityChunk(chunk) {}

