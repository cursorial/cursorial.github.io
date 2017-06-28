function Race() {
    this.allies = [];
    this.neutral = [];
    this.enemies = [];

    this.preferredClimate = {
        temperature: {
            max: 0,
            min: 0
        },
        moisture: {
            max: 0,
            min: 0
        }
    };

    this.resourceRequirements = {
        food: 0,
        water: 0
    };

    this.birthRate = 2;
    this.hardiness = 0.1;
    this.lifeSpan = Math.random() * 100;

    this.desires = [];

    this.specialAbility = null;
}