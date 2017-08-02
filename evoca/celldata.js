function CellData() {
    this.faction = new Faction();
    this.foodCap = Math.random() * 512;
    this.population = this.foodCap * Math.random();
    this.production = 1 + ((Math.random() * 0.5) - 0.25);
    this.foodCapUpgradeCost = 10;
    this.productionUpgradeCost = 10;
}