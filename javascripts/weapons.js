"use strict";

/********************************************
**          Browserify Dependencies        **
********************************************/
let $ = require("jquery");



/********************************************
**        HOLDS ALL ASSETS FOR TYPES       **
********************************************/
const RobotWeapons = {};



/********************************************
**      LOGIC REQ 5: Define 6 Weapons      **
*****             - Tazer               *****
*****             - Screwdriver         *****
*****             - Bottle Rocket       *****
*****             - Human Emotions      *****
*****             - Gun                 *****
*****             - RainCloud           *****
********************************************/
RobotWeapons.Weapon = function() {
    this.name = 'base name';
    this.damage = null;
};



RobotWeapons.Tazer = ()  => {
// Define the range of damage that each weapon can do.
    this.name = "Tazer";
    this.minDamage = 10;
    this.maxDamage = 30;
};
RobotWeapons.Tazer.prototype = new RobotWeapons.Weapon();

RobotWeapons.Screwdriver = ()  => {
// Define the range of damage that each weapon can do.
    this.name = "Screwdriver";
    this.minDamage = 4;
    this.maxDamage = 40;
};
RobotWeapons.Screwdriver.prototype = new RobotWeapons.Weapon();

RobotWeapons.BottleRocket = ()  => {
// Define the range of damage that each weapon can do.
    this.name = "Bottle Rocket";
    this.minDamage = 20;
    this.maxDamage = 35;
};
RobotWeapons.BottleRocket.prototype = new RobotWeapons.Weapon();

RobotWeapons.HumanEmotions = ()  => {
// Define the range of damage that each weapon can do.
    this.name = "Human Emotions";
    this.minDamage = 0;
    this.maxDamage = 45;
};
RobotWeapons.HumanEmotions.prototype = new RobotWeapons.Weapon();

RobotWeapons.Gun = ()  => {
// Define the range of damage that each weapon can do.
    this.name = "Gun";
    this.minDamage = 15;
    this.maxDamage = 30;
};
RobotWeapons.Tazer.prototype = new RobotWeapons.Weapon();

RobotWeapons.RainCloud = ()  => {
// Define the range of damage that each weapon can do.
    this.name = "Rain Cloud";
    this.minDamage = 11;
    this.maxDamage = 33;
};
RobotWeapons.RainCloud.prototype = new RobotWeapons.Weapon();




/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
  RobotWeapons
};
