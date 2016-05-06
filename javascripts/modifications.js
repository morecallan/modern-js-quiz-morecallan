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

let _modifications = new Map();

let modificationsXHR = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "json/modifications.json"
    }).done(function(data) {
      resolve(data);
    }).then(function(data){
        DOM.getModificationsInfoFromJSON(data);
        // parseXHRIntoPrototype(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
}();

let parseXHRIntoPrototype = function(data) {
    data.modifications.forEach(($modification) => {
        //Define prototype for each robot weapon
        let prototypeForObject = ($modification.prototype === null) ? {} : _modifications.get($modification.prototype);
        
        let Modification = Object.create(prototypeForObject);

      // Add all properties from JSON to new object
          Object.keys($modification).filter((prop) => prop !== "prototype").forEach((property) => {
            utils.defineProperty(Modification, property, $modification[property]);
          });

          // Add new weapon to the Map
          _modifications.set($modification.id, Modification);
    });
};

















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

RobotModifications.ShieldSmash = ()  => {
// Each modification should provide some combination of the following benefits - increased protection, increased damage, or evasion capability (ability to avoid some attacks).
    this.protection = 0;
    this.increaseWeaponDamage = 90;
    this.evasion = 0;
};
RobotModifications.ShieldSmash.prototype = new RobotModifications.Modification();

RobotModifications.Armor = ()  => {
// Each modification should provide some combination of the following benefits - increased protection, increased damage, or evasion capability (ability to avoid some attacks).
    this.protection = 90;
    this.increaseWeaponDamage = 0;
    this.evasion = 10;
};
RobotModifications.Armor.prototype = new RobotModifications.Modification();

RobotModifications.StealthTech = ()  => {
// Each modification should provide some combination of the following benefits - increased protection, increased damage, or evasion capability (ability to avoid some attacks).
    this.protection = 50;
    this.increaseWeaponDamage = 0;
    this.evasion = 50;
};
RobotModifications.StealthTech.prototype = new RobotModifications.Modification();

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
