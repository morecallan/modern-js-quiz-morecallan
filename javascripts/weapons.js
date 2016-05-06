"use strict";

/********************************************
**          Browserify Dependencies        **
********************************************/
var $ = require("jquery"),
    DOM = require("./DOMAppend.js"),
    utils = require("./utils.js");



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

let _weapons = new Map();

let weaponsXHR = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "json/weapons.json"
    }).done(function(data) {
      resolve(data);
    }).then(function(data){
        DOM.getWeaponsInfoFromJSON(data);
        // parseXHRIntoPrototype(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
}();

let parseXHRIntoPrototype = function(data) {
    data.weapons.forEach(($weapon) => {
        //Define prototype for each robot weapon
        let prototypeForObject = ($weapon.prototype === null) ? {} : _weapons.get($weapon.prototype);
        
        let Weapon = Object.create(prototypeForObject);

      // Add all properties from JSON to new object
          Object.keys($weapon).filter((prop) => prop !== "prototype").forEach((property) => {
            utils.defineProperty(Weapon, property, $weapon[property]);
          });

          // Add new weapon to the Map
          _weapons.set($weapon.id, Weapon);
    });
};










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

RobotWeapons.Emotions = ()  => {
// Define the range of damage that each weapon can do.
    this.name = "Emotions";
    this.minDamage = 0;
    this.maxDamage = 45;
};
RobotWeapons.Emotions.prototype = new RobotWeapons.Weapon();

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
