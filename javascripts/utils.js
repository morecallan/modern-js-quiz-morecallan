"use strict";

var config = {  
  writable: true,
  enumerable: true,
  configurable: true
};

var defineProperty = function(obj, name, value) {  
  config.value = value;
  Object.defineProperty(obj, name, config);
};


/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
  defineProperty
};