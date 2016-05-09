// "use strict";

// /********************************************
// **          Browserify Dependencies        **
// ********************************************/
// var $ = require("jquery");



// /********************************************
// **              BATTLE SEQUENCE            **
// ********************************************/

// // Each round of battle should determine the amount of damage each robot will do with its weapon.
// //Battle round counter
// let battleRounds = 0;




// // That damage should then be adjusted based on the modifications that it has, and what its opponent has.

// function calculateAttackDamage(player) {
//     //Player's health, strength and intelligence are averaged.
//     var playerCurrentStat = ((player.health + player.strength + player.intelligence)/3);
//     //Player's minimum and maximum attack damage is calculated then it picks a random number between the 2 and returns it
//     var maximumAttackDamage = player.weapon.damage;
//     var minimumAttackDamage = (playerCurrentStat * maximumAttackDamage)/100;
//     var attackDamage = 0;
//     if (minimumAttackDamage >= maximumAttackDamage) {
//         attackDamage = Math.floor(maximumAttackDamage);
//     } else {
//         attackDamage = Math.floor(getRandomInt(minimumAttackDamage, maximumAttackDamage));
//     }
//     return attackDamage;
// }



// // Rounds continue until one of the robots has 0, or less than 0, health.


// // When the battle is over display the outcome to the user. For example...
// // The Viper Drone defeated the Behemoth ATV with its flamethrower.






// /********************************************
// **             Browserify Exports          **
// ********************************************/
// module.exports = {

// };