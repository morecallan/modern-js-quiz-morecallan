"use strict";

let config = {  
    writable: true,
    enumerable: true,
    configurable: true
};

let defineProperty = function(obj, name, value) {  
    config.value = value;
    Object.defineProperty(obj, name, config);
};


/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
    config,
    defineProperty
};