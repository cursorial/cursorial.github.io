function Building(x, y, height) {
    this.geometry = new THREE.BoxGeometry(1, height, 1);
    this.material = new THREE.MeshLambertMaterial({ color: 0x888888 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.x = x;
    this.mesh.position.y = height / 2;
    this.mesh.position.z = y;

    this.width = 1;
    this.height = height;
    this.depth = 1;
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
    for(var x = 0; x <= 24; x++) {
        cityChunk.grid[x] = [];
        for(var y = 0; y <= 24; y++) {
            if(x % 4 == 0 || y % 4 == 0) {
                cityChunk.grid[x][y] = new Road(x, y);
            } else {
                Math.random() > 0.5 ? cityChunk.grid[x][y] = new Building(x, y, Math.ceil(Math.random() * 3)) : cityChunk.grid[x][y] = new Grass(x, y);
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

