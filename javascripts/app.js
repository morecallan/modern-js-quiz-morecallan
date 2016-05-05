"use strict";


//BROWSERIFY ENTRY FILE: Requirements (es6 notation)
//Now everytime we need to call a function or variable in these JS files, we will need to reference it as <varName>.monster, etc
var $ = require("jquery"),
    DOM = require("./DOMAppend.js"),
    battle = require("./battle.js"),
    robot = require("./robot.js"),
    modifications = require("./modifications.js"),
    types = require("./types.js"),
    weapons = require("./weapons.js");


//Code to generate a human player and an orc player
var robotP1 = new robot.Robots.Player();
var robotP2 = new robot.Robots.Player();


DOM.displayPlayer1SetUp();



module.exports = {
    robotP1,
    robotP2
};