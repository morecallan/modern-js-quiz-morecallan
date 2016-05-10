"use strict";


/********************************************
**          Browserify Dependencies        **
**           BROWSERIFY ENTRY FILE         **
********************************************/
let $ = require("jquery"),
    DOM = require("./DOMAppend.js"),
    battle = require("./battle.js"),
    robot = require("./robot.js"),
    modifications = require("./modifications.js"),
    types = require("./types.js"),
    weapons = require("./weapons.js");



/********************************************
**   Imports User selections from setup    **
********************************************/
let robot1stats = null;
let robot2stats = null;

function loadPlayerSelections() {
    robot1stats = DOM.p1stats;
    robot2stats = DOM.p2stats;
}



/********************************************
**      When Player Setup is complete,     **
**   create new P instances w/ selections  **
********************************************/
$("#battleNow").click(() => {
    loadPlayerSelections();

    //Code to generate 2 instances of robot players
    let robotP1 = new robot.Robots.Player();
    let robotP2 = new robot.Robots.Player();

    // Passing player selections into Player/Robot objects.
    robotP1.setName(robot1stats.playerName);
    robotP1.setImage(robot1stats.image);
    robotP1.setType(robot1stats.type);
    robotP1.setModel(robot1stats.model);
    robotP1.setWeapon(robot1stats.weapon);
    robotP1.setModifcation(robot1stats.modification);

    robotP2.setName(robot2stats.playerName);
    robotP2.setImage(robot2stats.image);
    robotP2.setType(robot2stats.type);
    robotP2.setModel(robot2stats.model);
    robotP2.setWeapon(robot2stats.weapon);
    robotP2.setModifcation(robot2stats.modification);

    //Initiating battle between 2 robots
    battle.initiateBattle(robotP1, robotP2);
});



/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
};