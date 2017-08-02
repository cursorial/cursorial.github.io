function UI() {
    var viewedCell;
    var selectedCell;
    var secondaryCell;

    addEventListener('hovered', function(e) {
        viewedCell = e.detail;
    });

    addEventListener('clicked', function(e) {
        if(selectedCell) {
            if(e.detail.disabled) {
                selectedCell = null;
                secondaryCell = null;
            }
            if(selectedCell == e.detail) {
                selectedCell = null;
            }
            secondaryCell = e.detail;
        } else {
            selectedCell = e.detail;
        }
    });

    this.draw = function() {
        fill(80);
        rect(824, 0, 200, 668);
        rect(0, 668, 1024, 100);

        if(viewedCell) {
            noStroke();
            fill(255);
            text("Cell: " + viewedCell.gridX + ', ' + viewedCell.gridY, 845, 30);
            text("Faction: ", 845, 50);
            text("Hostility (0 - 255): " + viewedCell.data.faction.hostility.toFixed(0), 855, 70);
            text("Productivity (0 - 64): " + (viewedCell.data.faction.productivityModifier * 100).toFixed(0) + "%", 855, 90);
            text("Consumption (0 - 100): " + ((viewedCell.data.faction.consumptionRate - 1) * 100).toFixed(1) + "%", 855, 110);
            text("Food Capacity: " + viewedCell.data.foodCap.toFixed(0), 845, 130);
            text("Population: " + viewedCell.data.population.toFixed(0), 845, 150);
            text("Production: " + (viewedCell.data.production * 100).toFixed(2) + "%", 845, 170);
        }
        
        if(selectedCell) {
            //upgrade faction productivity button
            stroke(0);
            fill(255);
            rect(15, 683, 115, 70);
            noStroke();
            fill(0);
            text("Increase Faction\nProductivity", 25, 700);
            fill(0, 220, 0);
            text((viewedCell.data.faction.productivityModifier * 100).toFixed(2) + "% -> " + (viewedCell.data.faction.productivityModifier * 100 * 1.1).toFixed(2) + "%", 25, 730);
            text("Cost: " + viewedCell.data.faction.productivityUpgradeCost.toFixed(2), 25, 745);

            stroke(0);
            fill(255);
            rect(135, 683, 130, 70);
            noStroke();
            fill(0);
            text("Reduce Faction\nConsumption", 145, 700);
            fill(0, 220, 0);
            text(((viewedCell.data.faction.consumptionRate - 1) * 100).toFixed(2) + "% -> " + ((viewedCell.data.faction.consumptionRate - 1) * 100 * 0.99).toFixed(2) + "%", 145, 730);
            text("Cost: " + viewedCell.data.faction.consumptionUpgradeCost.toFixed(2), 145, 745);

            stroke(0);
            fill(255);
            rect(270, 683, 115, 70);
            noStroke();
            fill(0);
            text("Increase Food\nCapacity", 280, 700);
            fill(0, 220, 0);
            text(viewedCell.data.foodCap.toFixed(2) + " -> " + (viewedCell.data.foodCap * 1.01).toFixed(2), 280, 730);
            text("Cost: " + viewedCell.data.foodCapUpgradeCost.toFixed(2), 280, 745);

            stroke(0);
            fill(255);
            rect(390, 683, 115, 70);
            noStroke();
            fill(0);
            text("Increase Cell\nProduction", 400, 700);
            fill(0, 220, 0);
            text((viewedCell.data.production * 100).toFixed(2) + "% -> " + (viewedCell.data.production * 100 * 1.01).toFixed(2), 400, 730);
            text("Cost: " + viewedCell.data.productionUpgradeCost.toFixed(2), 400, 745);
        }     
    }
}