"use strict";


//BROWSERIFY ENTRY FILE: Requirements (es6 notation)
//Now everytime we need to call a function or variable in these JS files, we will need to reference it as <varName>.monster, etc
let $ = require("jquery"),
    DOM = require("./DOMAppend.js"),
    battle = require("./battle.js"),
    robot = require("./robot.js"),
    modifications = require("./modifications.js"),
    types = require("./types.js"),
    weapons = require("./weapons.js");


let robot1stats = null;
let robot2stats = null;

function loadPlayerSelections() {
    robot1stats = DOM.p1stats;
    robot2stats = DOM.p2stats;
}


//When Player Setup is complete, build Player Protoypes out of selection.
$("#battleNow").click(function(){
    loadPlayerSelections();

    console.log("robot1stats", robot1stats);
    console.log("robot2stats", robot2stats);

    //Code to generate 2 robot players
    var robotP1 = new robot.Robots.Player();
    var robotP2 = new robot.Robots.Player();

    

    console.log("robotP1", robotP1);
    console.log("robotP2", robotP2);
});



module.exports = {
};