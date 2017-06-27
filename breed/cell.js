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
        for(var p of population) {
            if(!races.includes(p.race)) { 
                races.push(p.race);
            }
        }

        var raceCounters = [];
        for(var x = 0; x < races.length; x++) {
            raceCounters[x] = 0;
            for(var p of population) { 
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

    this.update = function() {
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
                if(this.bachelors.length > 0) {
                    this.bachelors.splice(this.bachelors.indexOf(person), 1);
                    var bachelorsIndex = Math.floor(Math.random() * this.bachelors.length);
                    person.partner = this.bachelors[bachelorsIndex];
                    this.bachelors.splice(bachelorsIndex);
                }
            }
            if(this.resources.food > 2 && person.partner != null) {
                var parent1Race = person.race;
                var parent2Race = person.partner.race;
                for(var i = 0; i < person.race.birthRate; i++) {
                    var newPerson = new Person();
                    newPerson.parents.push(person);
                    newPerson.parents.push(person.partner);
                    newPerson.generation = newPerson.parents[0].generation + 1;
                    newPerson.id = newPerson.parents[0].id + newPerson.parents[1].id;
                    var blendedRace = new Race();

                    blendedRace.preferredClimate = {
                        temperature: {
                            max: (parent1Race.preferredClimate.temperature.max + parent2Race.preferredClimate.temperature.max) / 2,
                            min: (parent1Race.preferredClimate.temperature.min + parent2Race.preferredClimate.temperature.min) / 2
                        },
                        moisture: {
                            max: (parent1Race.preferredClimate.moisture.max + parent2Race.preferredClimate.moisture.max) / 2,
                            min: (parent1Race.preferredClimate.moisture.min + parent2Race.preferredClimate.moisture.min) / 2
                        }
                    }

                    blendedRace.resourceRequirements = {
                        food: (parent1Race.resourceRequirements.food + parent2Race.resourceRequirements.food) / 2,
                        water: (parent1Race.resourceRequirements.water + parent2Race.resourceRequirements.water) / 2,
                        minerals: (parent1Race.resourceRequirements.food + parent2Race.resourceRequirements.minerals) / 2
                    }

                    newPerson.race = blendedRace;

                    person.partner.children.push(newPerson);
                    person.children.push(newPerson);
                    
                    this.population.push(newPerson);
                    this.bachelors.push(newPerson);
                    this.resources.food -= person.race.resourceRequirements.food;
                }
            }
            if(person.age > person.race.lifeSpan) {
                if(Math.random() > 0.2) {
                    this.population.splice(this.population.indexOf(person), 1);
                }
            }
            if(this.resources.food < this.population.length) {
                this.population.splice(2, this.population.length - this.resources.food);
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
}