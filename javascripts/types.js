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
let RobotTypes = {};



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



RobotTypes = _types;



/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
  RobotTypes,
  _types
};
