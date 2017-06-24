function Faction() {
    this.hostility = Math.random() * 255;
    this.productivityModifier = Math.random() * 0.25;
    this.consumptionRate = 1 + Math.random();
    this.colour = {
        red: this.hostility,
        green: 255 - this.hostility,
        blue: Math.random() * 200
    };
}