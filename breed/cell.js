function Cell(x, y){
    this.x = x;
    this.y = y;

    this.init = function() {
        this.climate.temperature = -Math.pow(Math.abs(this.y - 7.5), 1.4) + 12.5;
        this.climate.moisture = 100 + Math.random() * 412;

        this.resources.food = 0;
        this.resources.water = this.climate.moisture / 2;
        this.resources.minerals = Math.random() * 200;

        for(var x = 0; x < 2; x++) {
            var person = new Person();
            person.race = new Race();
            person.race.preferredClimate = {
                temperature: {
                    max: this.climate.temperature + 10,
                    min: this.climate.temperature - 10
                },
                moisture: {
                    max: this.climate.moisture + 50,
                    min: this.climate.moisture - 50
                }
            }

            person.race.resourceRequirements = {
                food: Math.ceil(Math.random() * 2),
                water: Math.ceil(Math.random() * 2),
                minerals: 0
            };

            person.location = {
                x: this.x,
                y: this.y
            }
            this.population.push(person);
            this.bachelors.push(person);
        }
    }

    this.relations = {
        allies: [],
        neutral: [],
        enemies: []
    };

    this.climate = {
        temperature: 0,
        moisture: 0
    };

    this.resources = {
        food: 0,
        water: 0,
        minerals: 0
    };

    this.population = [];
    this.bachelors = [];

    this.defenses = [];
    this.farms = [];
    this.houses = [];

    this.racialDistribution = function() {
        var races = [];
        for(var p of this.population) {
            if(!races.includes(p.race)) { 
                races.push(p.race);
            }
        }

        var raceCounters = [];
        for(var x = 0; x < races.length; x++) {
            raceCounters[x] = 0;
            for(var p of this.population) { 
                if(p.race == races[x].length) { 
                    raceCounters[x]++; 
                }
            }
        }

        return {
            races: races,
            raceCounters: raceCounters
        };
    }

    this.update = function(cells) {
        this.climate.temperature += (Math.random() * 1) - 0.5;
        this.climate.moisture += (Math.random() * 10) - 5;
        this.resources.water += (Math.random() * 10) - 5;
        this.resources.minerals += (Math.random() * 0.01) - 0.005;
                
        if(this.climate.temperature > -30) {
           this.resources.food = 2 * (Math.abs(20 - this.climate.temperature) - (12 * Math.sqrt(Math.abs(20 - this.climate.temperature))) + 36);
        }

        for(var x = 0; x < this.population.length; x++) {
            var person = this.population[x];
            person.age++;
            
            this.food -= person.race.resourceRequirements.food;
            if(person.partner == null) {
                if(this.bachelors.length > 1) {
                    this.bachelors.splice(this.bachelors.indexOf(person), 1);
                    var bachelorsIndex = Math.floor(Math.random() * this.bachelors.length);
                    person.partner = this.bachelors[bachelorsIndex];
                    this.bachelors.splice(bachelorsIndex, 1);
                }
            }
            if(this.resources.food > 2 && person.partner != null) {
                var parent1 = person;
                var parent2 = person.partner;
                if(parent1.age > 20 && parent2.age > 20 && Math.random() > 0.8) {
                    var baby = new Person();

                    baby.location = parent1.location;
                    baby.generation = parent1.generation + 1;

                    baby.race = parent1.race;
                    baby.race.preferredClimate = {
                        temperature: {
                            max: (parent1.race.preferredClimate.temperature.max + parent2.race.preferredClimate.temperature.min) / 2,
                            min: (parent1.race.preferredClimate.temperature.min + parent2.race.preferredClimate.temperature.min) / 2
                        },
                        moisture: {
                            max: (parent1.race.preferredClimate.moisture.max + parent2.race.preferredClimate.temperature.min) / 2,
                            min: (parent1.race.preferredClimate.moisture.max + parent2.race.preferredClimate.temperature.min) / 2
                        }
                    }

                    baby.race.resourceRequirements = {
                        food: (parent1.race.resourceRequirements.food + parent2.race.resourceRequirements.food) / 2,
                        water: (parent1.race.resourceRequirements.water + parent2.race.resourceRequirements.water) / 2
                    };

                    parent1.children.push(baby);
                    parent2.children.push(baby);
                    this.population.push(baby);
                    this.bachelors.push(baby);
                }
            }
            if(person.age > person.race.lifeSpan) {
                if(Math.random() > person.race.hardiness) {
                    if(person.partner != null) {
                        person.partner.partner = null;
                        this.bachelors.push(person.partner);
                    }
                    this.population.splice(this.population.indexOf(person), 1);
                }
            }
            if(this.resources.food < this.population.length) {
                if(person.partner != null) {
                    person.partner.partner = null;
                    this.bachelors.push(person.partner);
                }
                this.population.splice(this.population.indexOf(person), 1);
            }

            var happiestCell = this;
            for(var n of this.neighbours(cells)) {
                if(n != null) {
                    if(n.getHappinessIndex(person, cells) > happiestCell.getHappinessIndex(person, cells)) {
                        happiestCell = n;
                    }
                }
            }

            if(person.partner == null && happiestCell != this) {
                this.population.splice(this.population.indexOf(person), 1);
                this.bachelors.splice(this.bachelors.indexOf(person), 1);
                happiestCell.population.push(person);
                happiestCell.bachelors.push(person);
            }
        }

        if(this.climate.moisture < 0) {
            this.climate.moisture = 1;
        }
        if(this.resources.water < 0) {
            this.resources.water = 1;
        }
        if(this.resources.food < 0) {
            this.resources.food = 1;
        }
        if(this.resources.food > 500) {
            this.resources.food = 500;
        }
        if(this.resources.minerals < 0) {
            this.resources.minerals = 1;
        }
    }

    this.getHappinessIndex = function(person, cells) {
        var happinessIndex = 0;
        if(this.temperature > person.race.preferredClimate.temperature.min && this.temperature < person.race.preferredClimate.temperature.max) {
            happinessIndex += 1;
        }
        if(this.moisture > person.race.preferredClimate.moisture.min && this.moisture < person.race.preferredClimate.moisture.max) {
            happinessIndex += 1;
        }
        if(this.resources.food > cells[person.location.x][person.location.y].resources.food) {
            happinessIndex += 1;
        }
        if(this.resources.water > cells[person.location.x][person.location.y].resources.water) {
            happinessIndex += 1;
        }
        return happinessIndex;
    }

    this.neighbours = function(cells) {
        return [
            this.x > 0 ? cells[x - 1][y] : null,
            this.x < cells.length - 1 ? cells[x + 1][y] : null,
            this.y > 0 ? cells[x][y - 1] : null,
            this.y < cells[0].length - 1 ? cells[x][y + 1] : null,
            this.x > 0 && this.y > 0 ? cells[x - 1][y - 1] : null,
            this.x < cells.length - 1 && this.y < cells[0].length - 1 ? cells[x + 1][y + 1] : null,
            this.x > 0 && this.y < cells[0].length - 1 ? cells[x - 1][y + 1] : null,
            this.x < cells.length - 1 && this.y > 0 ? cells[x + 1][y - 1] : null
        ];
    }
}