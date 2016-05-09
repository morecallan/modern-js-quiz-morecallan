"use strict";

/********************************************
**          Browserify Dependencies        **
********************************************/
var $ = require("jquery"),
    DOM = require("./DOMAppend.js"),
    utils = require("./utils.js");


/********************************************
**   LOGIC REQ 5: Define 6 Modifications   **
*****             - Speed               *****
*****             - Shield Breaker      *****
*****             - Battleship Armor    *****
*****             - Stealth Technology  *****
*****             - Failsafe            *****
*****             - Raised Well         *****
********************************************/


/********************************************
**        HOLDS ALL ASSETS FOR TYPES       **
********************************************/
let RobotModifications;


//Creates a new Map(object with value keys that do NOT have to be strings). This will contain the BASE function of Modification and then 6 mods within it's prototype chain.
let _modifications = new Map();

//Loads data from weapons.json
let modificationsXHR = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "json/modifications.json"
    }).done(function(data) {
      resolve(data);
    }).then(function(data){
        DOM.getModificationsInfoFromJSON(data); //Populates the DOM with Modifications Names
        parseModificationXHRIntoPrototype(data); //Fills out the modifications map
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
}();

let parseModificationXHRIntoPrototype = function(data) {
    data.modifications.forEach(($modification) => {
        //If the prototype key is null, this means that it is the BASE function. When it sees this, it creates an empty object. If the item HAS a prototype listed, it's prototype is assigned as a key within the object created.
        let prototypeForObject = ($modification.prototype === null) ? {} : _modifications.get($modification.prototype);
        
        //Creates an object for each JSON weapon cycled through. If the object has a prototype listed that is NOT null, the object is initiated with a key-value pair of the object's listed prototype
        let newModification = Object.create(prototypeForObject);

        // Add all properties from JSON to new object
        Object.keys($modification).filter((prop) => prop !== "prototype").forEach((property) => {
          utils.defineProperty(newModification, property, $modification[property]);
        });

        // Add new modification to the Map
        _modifications.set($modification.id, newModification);
    });
};

//Passes the weapons map into the RobotWeapons const after it has been built. 
RobotModifications = _modifications;


/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
  RobotModifications
};
