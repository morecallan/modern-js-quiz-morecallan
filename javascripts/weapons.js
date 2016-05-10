"use strict";

/********************************************
**          Browserify Dependencies        **
********************************************/
let $ = require("jquery"),
    DOM = require("./DOMAppend.js"),
    utils = require("./utils.js");



/********************************************
**      LOGIC REQ 5: Define 6 Weapons      **
*****             - Tazer               *****
*****             - Screwdriver         *****
*****             - Bottle Rocket       *****
*****             - Human Emotions      *****
*****             - Gun                 *****
*****             - RainCloud           *****
********************************************/


/********************************************
**        HOLDS ALL ASSETS FOR TYPES       **
********************************************/
let RobotWeapons;


/********************************************
**      GRABS INFO FROM JSON => MAP        **
********************************************/
//Creates a new Map(object with value keys that do NOT have to be strings). This will contain the BASE function of Weapon and then 6 weapons within it's prototype chain.
let _weapons = new Map();

//Loads data from weapons.json
let weaponsXHR = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "json/weapons.json"
    }).done(function(data) {
      resolve(data);
    }).then(function(data){
        DOM.getWeaponsInfoFromJSON(data); //Populates the DOM with Weapon Names
        parseWeaponXHRIntoPrototype(data); //Fills out the weapons map
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
}();

let parseWeaponXHRIntoPrototype = function(data) {
    data.weapons.forEach(($weapon) => {
        //If the prototype key is null, this means that it is the BASE function. When it sees this, it creates an empty object. If the item HAS a prototype listed, it's prototype is assigned as a key within the object created.
        let prototypeForObject = ($weapon.prototype === null) ? {} : _weapons.get($weapon.prototype);
        
        //Creates an object for each JSON weapon cycled through. If the object has a prototype listed that is NOT null, the object is initiated with a key-value pair of the object's listed prototype
        let newWeapon = Object.create(prototypeForObject);

        // Add all properties from JSON to new object
        Object.keys($weapon).filter((prop) => prop !== "prototype").forEach((property) => {
          utils.defineProperty(newWeapon, property, $weapon[property]);
        });

        // Add new weapon to the Map
        _weapons.set($weapon.id, newWeapon);
    });
};

//Passes the weapons map into the RobotWeapons obj after it has been built. 
RobotWeapons = _weapons;



/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
  RobotWeapons
};
