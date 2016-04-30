"use strict";


//BROWSERIFY ENTRY FILE: Requirements (es6 notation)
//Now everytime we need to call a function or variable in these JS files, we will need to reference it as <varName>.monster, etc
var $ = require("jquery"),
    battle = require("./battle.js"),
    robot = require("./robot.js"),
    models = require("./models.js"),
    modifications = require("./modifications.js"),
    types = require("./types.js"),
    weapons = require("./weapons.js");


//Code to generate a human player and an orc player
var robotP1; // = new enemies.Orc()

var robotP2; // = new player.Combatants.Human()




module.exports = {
    robotP1,
    robotP2
};