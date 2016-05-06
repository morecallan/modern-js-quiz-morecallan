"use strict";

/********************************************
**          Browserify Dependencies        **
********************************************/
var $ = require("jquery"),
    modifications = require("./modifications.js"),
    types = require("./types.js"),
    weapons = require("./weapons.js");



/********************************************
**        HOLDS ALL ASSETS FOR ROBOTS      **
********************************************/
var Robots = {};



/********************************************
**        LOGIC REQ 1: Base Robot Func     **
********************************************/
Robots.Player  = function() {
  this.playerName = null;
  this.img = null;

  //IS A:
  this.type = null;
  this.model = null;

  //HAS A:
  this.modification = null;
  this.weapon = null;

  this.originalHealth = 0;
  this.health = 0;

  this.strength = 0;

  this.evasion = 0;

  this.intelligence = 0;
};

Robots.Player.prototype.setName = (newName)  => {
  this.playerName = newName;
};

Robots.Player.prototype.setModel = (newModel)  => {
  this.model = new types.RobotTypes[newModel]();
};


Robots.Player.prototype.healthModification = (healthBonus) => {
  this.health += healthBonus;
};

Robots.Player.prototype.strengthModification = (strengthBonus) => {
  this.strength += strengthBonus;
};

Robots.Player.prototype.evasionModification = (evasionBonus) => {
  this.evasion += evasionBonus;
};

Robots.Player.prototype.intelligenceModification = (intelligenceBonus) => {
  this.intelligence += intelligenceBonus;
};

Robots.Player.prototype.setType = (newType)  => {
  console.log("newType", newType);
  this.type = new types.RobotTypes[newType]();

  this.healthModification(newType.healthModifier);
  this.strengthModification(newType.strengthModifier);
  this.evasionModification(newType.evasionModifier);
  this.intelligenceModification(newType.intelligenceModifier);
};


Robots.Player.prototype.setModifcation = (newModification)  => {
  this.modification = new modifications.RobotModifications[newModification]();
};

Robots.Player.prototype.setWeapon = (newWeapon)  => {
  this.weapon = new weapons.RobotWeapons[newWeapon]();
};



/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
  Robots
};
