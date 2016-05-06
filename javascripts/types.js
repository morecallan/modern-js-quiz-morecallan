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
const RobotTypes = {};



/********************************************
**     LOGIC REQ 2: Define 3 type func     **
**     LOGIC REQ 3: Define 2 type func     **
********************************************/
RobotTypes.PlayerTypes = function() {
    this.allowedTypes = ["Drone", "Bipedal", "ATV"];
};



/********************************************
**               ROBOT TYPES               **
*****             - Drone               *****
*****             - Bipedal             *****
*****             - Cyborg              *****
********************************************/

let _types = new Map();

let typesXHR = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "json/types.json"
    }).done(function(data) {
      resolve(data);
    }).then(function(data){
        DOM.getTypeInfoFromJSON(data);
        parseXHRIntoPrototype(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
}();

let parseXHRIntoPrototype = function(data) {
    data.types.forEach(($type) => {
        //Define prototype for each robot model
        let prototypeForObject = ($type.prototype === null) ? {} : _types.get($type.prototype);
        
        let ModelType = Object.create(prototypeForObject);

      // Add all properties from JSON to new object
          Object.keys($type).filter((prop) => prop !== "prototype").forEach((property) => {
            utils.defineProperty(ModelType, property, $type[property]);
          });

          // Add new model to the type Map
          _types.set($type.id, ModelType);
    });
};


/****************** DRONES *****************/
/*******   Drone Type Base Object  *********/
RobotTypes.Drone = function () {
    this.name = "Drone";
    this.robotType = "Drone";
    this.healthMax = 150;
    
    this.allowedModels = ["DJPhantom", "Bebop"];

    this.img = "../img/drone0.jpg";
};
RobotTypes.Drone.prototype = new RobotTypes.PlayerTypes();


/***   Drone Models: DJ PHANTOM, Bebop   ***/
RobotTypes.DJPhantom = function() {
// LR4: Give each robot model a different range of health
    this.originalHealth = Math.floor(Math.random() * 40 + 110);
    this.health = this.originalHealth;
    
    this.name = "DJ Phantom";
    this.img = "../img/drone1.jpg";
};
RobotTypes.DJPhantom.prototype = new RobotTypes.Drone();

RobotTypes.Bebop = function() {
// LR4: Give each robot model a different range of health
    this.originalHealth = Math.floor(Math.random() * 50 + 100);
    this.health = this.originalHealth;

    this.name = "Bebop";
    this.img = "../img/drone2.jpg";
};
RobotTypes.Bebop.prototype = new RobotTypes.Drone();
/*******************************************/



/***************** BIPEDAL *****************/
/******   Bipedal Type Base Object  ********/
RobotTypes.Bipedal = function (){
    this.name = "Bipedal";
    this.robotType = "Bipedal";
    this.healthMax = 110;
    this.allowedModels = ["ChickenWalker", "HUBO"];

    this.img = "../img/bipedal0.jpg";
};
RobotTypes.Bipedal.prototype = new RobotTypes.PlayerTypes();


/**  Bipedal Models: Chicken Walker, HUBO **/
RobotTypes.ChickenWalker = function() {
// LR4: Give each robot model a different range of health
    this.originalHealth = Math.floor(Math.random() * 20 + 90);
    this.health = this.originalHealth;

    this.img = "../img/bipedal1.jpg";
};
RobotTypes.ChickenWalker.prototype = new RobotTypes.Bipedal();

RobotTypes.HUBO = function() {
// LR4: Give each robot model a different range of health
    this.originalHealth = Math.floor(Math.random() * 30 + 80);
    this.health = this.originalHealth;

    this.img = "../img/bipedal.jpg";
};
RobotTypes.HUBO.prototype = new RobotTypes.Bipedal();
/*******************************************/



/****************** CYBORG *****************/
/*******   Cyborg Type Base Object  ********/
RobotTypes.Cyborg = function (){
// LR4: Give each robot model a different range of health
    this.name = "Cyborg";
    this.robotType = "Cyborg";
    this.healthMax = 100;
    this.allowedModels = ["InspectorGadget", "BionicWoman"];

    this.img = "../img/cyborg0.jpg";
};
RobotTypes.Cyborg.prototype = new RobotTypes.PlayerTypes();

/** Cyborg Models: InspectorGadget, BionicWoman **/
RobotTypes.InspectorGadget = function() {
// LR4: Give each robot model a different range of health
    this.originalHealth = Math.floor(Math.random() * 50 + 50);
    this.health = this.originalHealth;

    this.img = "../img/cyborg1.jpg";
};
RobotTypes.InspectorGadget.prototype = new RobotTypes.Cyborg();

RobotTypes.BionicWoman = function() {
// LR4: Give each robot model a different range of health
    this.originalHealth = Math.floor(Math.random() * 60 + 40);
    this.health = this.originalHealth;
    this.moodSwings = true;

    this.img = "../img/cyborg2.jpg";
};
RobotTypes.BionicWoman.prototype = new RobotTypes.Cyborg();
/*******************************************/




/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
  RobotTypes,
  _types
};
