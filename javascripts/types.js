"use strict";

/********************************************
**          Browserify Dependencies        **
********************************************/
let $ = require("jquery"),
    DOM = require("./DOMAppend.js"),
    utils = require("./utils.js");



/********************************************
**        HOLDS ALL ASSETS FOR TYPES       **
********************************************/
let RobotTypes = {};



/********************************************
**     LOGIC REQ 2: Define 3 type func     **
**     LOGIC REQ 3: Define 2 model func    **
********************************************/


/********************************************
**           ROBOT TYPES : MODELS          **
***** - Drone: DJPhantom, Bebop         *****
***** - Bipedal: ChickenWalker, HUBO    *****
***** - Cyborg: InspGadget, BionicWoman *****
********************************************/


/********************************************
**      GRABS INFO FROM JSON => MAP        **
********************************************/
//Creates a new Map(object with value keys that do NOT have to be strings). This will contain the BASE function of Modification and then 6 mods within it's prototype chain.
let _types = new Map();

//Loads data from types.json
let typesXHR = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "json/types.json"
    }).done(function(data) {
      resolve(data);
    }).then(function(data){
        DOM.getTypeInfoFromJSON(data); //Populates the DOM with Model Names
        parseXHRIntoPrototype(data); //Fills out the types map
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
}();


let parseXHRIntoPrototype = function(data) {
    data.types.forEach(($type) => {
        //If the prototype key is null, this means that it is the BASE function. When it sees this, it creates an empty object. If the item HAS a prototype listed, it's prototype is assigned as a key within the object created.
        let prototypeForObject = ($type.prototype === null) ? {} : _types.get($type.prototype);
        
        //Creates an object for each JSON weapon cycled through. If the object has a prototype listed that is NOT null, the object is initiated with a key-value pair of the object's listed prototype
        let ModelType = Object.create(prototypeForObject);

        // Add all properties from JSON to new object
        Object.keys($type).filter((prop) => prop !== "prototype").forEach((property) => {
          utils.defineProperty(ModelType, property, $type[property]);
        });

        // Add new types to the Map
        _types.set($type.id, ModelType);
    });
};


//Passes the types map into the RobotTypes obj after it has been built. 
RobotTypes = _types;



/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
  RobotTypes
};
