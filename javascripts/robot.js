"use strict";

/********************************************
**          Browserify Dependencies        **
********************************************/
let $ = require("jquery"),
    modifications = require("./modifications.js"),
    types = require("./types.js"),
    weapons = require("./weapons.js");



/********************************************
**        HOLDS ALL ASSETS FOR ROBOTS      **
********************************************/
let Robots = {};



/********************************************
**        LOGIC REQ 1: Base Robot Func     **
********************************************/
Robots.Player  = function() {
  this.playerName = "";
  this.img = null;

  //IS A:
  this.type = null;
  this.model = null;

  //HAS A:
  this.modification = null;
  this.weapon = null;

  this.health = 100;

  this.strength = 100;

  this.intelligence = 100;

  this.evasion = 0;
};


/********************************************
**   SETTER FUNC FOR PLAYER CONSTRUSTOR    **
********************************************/
Robots.Player.prototype.setName = function (newName) {
  this.playerName = newName;
};

Robots.Player.prototype.setImage = function (newImage) {
  this.img = newImage;
};

Robots.Player.prototype.setType = function (newType) {
  this.type = types.RobotTypes.get(newType);
};

Robots.Player.prototype.healthModification = function(healthBonus) {
  this.health += healthBonus;
};

Robots.Player.prototype.strengthModification = function(strengthBonus) {
  this.strength += strengthBonus;
};

Robots.Player.prototype.evasionModification = function(evasionBonus) {
  this.evasion += evasionBonus;
};

Robots.Player.prototype.intelligenceModification = function(intelligenceBonus) {
  this.intelligence += intelligenceBonus;
};

Robots.Player.prototype.setModel = function (newModel) {
  this.model = types.RobotTypes.get(newModel);

  let maxHealth = this.model.healthMin + this.model.healthRange;
  let healthGenerator = getRandomInt(this.model.healthMin, maxHealth) + this.model.healthModifier;

  this.healthModification(healthGenerator);
  this.strengthModification(this.model.strengthModifier + this.type.strengthModifier);
  this.intelligenceModification(this.model.intelligenceModifier + this.type.intelligenceModifier);
};

Robots.Player.prototype.setModifcation = function (newModification){
  this.modification = modifications.RobotModifications.get(newModification);
};

Robots.Player.prototype.setWeapon = function(newWeapon) {
  this.weapon = weapons.RobotWeapons.get(newWeapon);
};



/////******   Helper Functions   ******/////
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
  Robots
};
