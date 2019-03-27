const { generateReport } = require('./helpers');
class Floor {
    constructor(corridors = [], subCorridors = []) {
        this.corridors = corridors;
        this.subCorridors = subCorridors;
    }
    checkPowerConsumption() {
        this.powerConsumption = 0;
        for (let corridor of this.corridors) {
            corridor.equipments['AC'].on ? this.powerConsumption += 10 : '';
            corridor.equipments['light'].on ? this.powerConsumption += 5 : '';
        }
        for (let sub_corridor of this.subCorridors) {
            sub_corridor.equipments['AC'].on ? this.powerConsumption += 10 : '';
            sub_corridor.equipments['light'].on ? this.powerConsumption += 5 : '';
        }
        if (this.powerConsumption > this.allowedPowerConsumption) {
            for (let sub_corridor of this.subCorridors) {
                sub_corridor.equipments['AC'].on = false;
            }
            console.log("Power Consumption exceeded.");
            this.checkPowerConsumption();
        }
    }
}
const defaulEquipments = {
    AC: {
        on: true
    },
    light: {
        on: true
    }
}
class Corridor {
    constructor(type = 'main', equipments = null) {
        this._id = Math.floor(Math.random() * 10000);
        this.type = type;
        this.lastMovement = new Date().getTime();
        this.equipments = equipments || defaulEquipments;
        this.type == 'sub' && this._checkForMovement();
    }
    _checkForMovement() {
        const TIME = 60000;
        setInterval(() => {
            if (new Date().getTime() - this.lastMovement > TIME) {
                this.equipments['AC'].on = true;
                this.equipments['light'].on = false;
                this.lastMovement = new Date().getTime();
                console.log("No movement for 1 minutes.");
                generateReport();
            }
        }, 1000);
    }
}
module.exports = { Floor, Corridor };