"use strict";

/********************************************
**          Browserify Dependencies        **
********************************************/
let $ = require("jquery");



/********************************************
**        HOLDS ALL ASSETS FOR TYPES       **
********************************************/
const RobotModifications = {};



/********************************************
**   LOGIC REQ 5: Define 6 Modifications   **
*****             - Speed               *****
*****             - Shield Breaker      *****
*****             - Battleship Armor    *****
*****             - Stealth Technology  *****
*****             - Failsafe            *****
*****             - Raised Well         *****
********************************************/
RobotModifications.Modification = function() {
    this.name = 'base name';
    this.protection = null;
    this.increaseWeaponDamage = null;
    this.evasion = null;
};



RobotModifications.Speedy = ()  => {
// Each modification should provide some combination of the following benefits - increased protection, increased damage, or evasion capability (ability to avoid some attacks).
    this.protection = 10;
    this.increaseWeaponDamage = 0;
    this.evasion = 50;
};
RobotModifications.Speedy.prototype = new RobotModifications.Modification();

RobotModifications.ShieldBreaker = ()  => {
// Each modification should provide some combination of the following benefits - increased protection, increased damage, or evasion capability (ability to avoid some attacks).
    this.protection = 0;
    this.increaseWeaponDamage = 90;
    this.evasion = 0;
};
RobotModifications.ShieldBreaker.prototype = new RobotModifications.Modification();

RobotModifications.BattleshipArmor = ()  => {
// Each modification should provide some combination of the following benefits - increased protection, increased damage, or evasion capability (ability to avoid some attacks).
    this.protection = 90;
    this.increaseWeaponDamage = 0;
    this.evasion = 10;
};
RobotModifications.BattleshipArmor.prototype = new RobotModifications.Modification();

RobotModifications.StealthTechnology = ()  => {
// Each modification should provide some combination of the following benefits - increased protection, increased damage, or evasion capability (ability to avoid some attacks).
    this.protection = 50;
    this.increaseWeaponDamage = 0;
    this.evasion = 50;
};
RobotModifications.StealthTechnology.prototype = new RobotModifications.Modification();

RobotModifications.Failsafe = ()  => {
// Each modification should provide some combination of the following benefits - increased protection, increased damage, or evasion capability (ability to avoid some attacks).
    this.protection = 0;
    this.increaseWeaponDamage = 0;
    this.evasion = 120;
};
RobotModifications.Failsafe.prototype = new RobotModifications.Modification();

RobotModifications.RaisedWell = ()  => {
// Each modification should provide some combination of the following benefits - increased protection, increased damage, or evasion capability (ability to avoid some attacks).
    this.protection = 70;
    this.increaseWeaponDamage = -10;
    this.evasion = 70;
};
RobotModifications.RaisedWell.prototype = new RobotModifications.Modification();




/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
  RobotModifications
};
