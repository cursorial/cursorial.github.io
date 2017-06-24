function CellData() {
    this.faction = new Faction();
    this.foodCap = Math.random() * 200;
    this.population = this.food * Math.random();
    this.production = 1 + ((Math.random() * 0.5) - 0.25);
}