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
Robots.Player  = ()  => {
  this.playerName = null;

  //IS A:
  this.type = null;
  this.model = null;

  //HAS A:
  this.modification = null;
  this.weapon = null;

  this.originalHealth = null;
  this.health = null;
};

Robots.Player.prototype.setName = (newName)  => {
  this.playerName = newName;
};

Robots.Player.prototype.setType = (newType)  => {
  this.class = new types.RobotTypes[newType]();
};

Robots.Player.prototype.setModel = (newModel)  => {
  this.model = new types.RobotTypes[newModel]();
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
