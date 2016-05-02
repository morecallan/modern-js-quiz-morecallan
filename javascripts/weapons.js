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
    this.minDamage = 0;
    this.maxDamage = 0;
    this.damage = 0;
};
RobotWeapons.Tazer.prototype = new RobotWeapons.Weapon();

RobotWeapons.Screwdriver = ()  => {
// Define the range of damage that each weapon can do.
    this.name = "Screwdriver";
    this.minDamage = 0;
    this.maxDamage = 0;
    this.damage = 0;
};
RobotWeapons.Screwdriver.prototype = new RobotWeapons.Weapon();

RobotWeapons.BottleRocket = ()  => {
// Define the range of damage that each weapon can do.
    this.name = "Bottle Rocket";
    this.minDamage = 0;
    this.maxDamage = 0;
    this.damage = 0;
};
RobotWeapons.BottleRocket.prototype = new RobotWeapons.Weapon();

RobotWeapons.HumanEmotions = ()  => {
// Define the range of damage that each weapon can do.
    this.name = "Human Emotions";
    this.minDamage = 0;
    this.maxDamage = 0;
    this.damage = 0;
};
RobotWeapons.HumanEmotions.prototype = new RobotWeapons.Weapon();

RobotWeapons.Gun = ()  => {
// Define the range of damage that each weapon can do.
    this.name = "Gun";
    this.minDamage = 0;
    this.maxDamage = 0;
    this.damage = 0;
};
RobotWeapons.Tazer.prototype = new RobotWeapons.Weapon();

RobotWeapons.RainCloud = ()  => {
// Define the range of damage that each weapon can do.
    this.name = "Rain Cloud";
    this.minDamage = 0;
    this.maxDamage = 0;
    this.damage = 0;
};
RobotWeapons.RainCloud.prototype = new RobotWeapons.Weapon();




/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
  RobotWeapons
};
