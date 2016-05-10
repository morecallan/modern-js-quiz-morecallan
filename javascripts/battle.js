"use strict";


/********************************************
**          Browserify Dependencies        **
********************************************/
let $ = require("jquery"),
    DOM = require("./DOMAppend.js");



/********************************************
**              BATTLE SEQUENCE            **
********************************************/
//   FR7:   Once the modification for Player 2 is chosen, the battle begins.
function initiateBattle (robotPlayer1, robotPlayer2) {
    DOM.showBattledome(robotPlayer1, robotPlayer1);
    $("#robot1BattleHolder").html(robotPlayer1.img);
    $("#robot2BattleHolder").html(robotPlayer2.img);
    attackSequence(robotPlayer1, robotPlayer2);
}


/********************************************
**         BATTLE ROUNDS COUNTER           **
********************************************/
//   FR8:   Each round of battle should determine the amount of damage each robot will do with its weapon.
let battleRounds = 1;


/********************************************
**        DAMAGE CALC FOR EACH ATTACK      **
********************************************/
//   FR9:   That damage should then be adjusted based on the modifications that it has, and what its opponent has.
function calculateAttackDamage(player) {
    //Player's health, strength and intelligence are averaged.
    let playerCurrentStat = ((player.health + player.strength + player.intelligence)/3);
    //Player's minimum and maximum attack damage is calculated then it picks a random number between the 2 and returns it
    let maximumAttackDamage = player.weapon.maxDamage * (playerCurrentStat/100);
    let minimumAttackDamage = player.weapon.minDamage;
    let attackDamage = 0;
    if (minimumAttackDamage >= maximumAttackDamage) {
        attackDamage = Math.floor(maximumAttackDamage);
    } else {
        attackDamage = Math.floor(getRandomInt(minimumAttackDamage, maximumAttackDamage));
    }
    return attackDamage;
}


/********************************************
**        EACH ROUND OF THE ATTACK...      **
********************************************/
function attackSequence(robotPlayer1, robotPlayer2) {

    let attackAction = function(attacker, opponent) {
        let battleRoundEvenOrOdd;
        if (battleRounds%2 === 0) {
            battleRoundEvenOrOdd = 1;
        } else {
            battleRoundEvenOrOdd = 2;
        }
        //Combatant's attack score is caluclated
        let damageToOpponentHealth = calculateAttackDamage(attacker);
        //Opponent's health is reduced by attack score
        opponent.health = opponent.health - damageToOpponentHealth;
        // Display attack score on DOM
        let attackMessage = `<p class="attackOutput attackOutput${battleRoundEvenOrOdd}"> ${attacker.playerName} the ${attacker.model.id} attacks ${opponent.playerName} the ${opponent.model.id} with ${attacker.weapon.weaponName} and does ${damageToOpponentHealth} damage. </p>`;
        attackMessage += `<p class="opponentHealth opponentHealth${battleRoundEvenOrOdd}"> ${opponent.playerName} health: ${opponent.health}</p>`;
        $("#battleOutputText").append(attackMessage);
        battleRounds++;
    };

    setTimeout(()=>{
        attackAction(robotPlayer1, robotPlayer2);
        attackAction(robotPlayer2, robotPlayer1);
        checkHealthToSeeIfOneOfTheseBitchesDied(robotPlayer1, robotPlayer2);
    }, 1000);
    
}

//   FR10:   Rounds continue until one of the robots has 0, or less than 0, health.
//   FR11:   When the battle is over display the outcome to the user.
function checkHealthToSeeIfOneOfTheseBitchesDied(robotPlayer1, robotPlayer2) {
    let battleWonMessage = "";
    if (robotPlayer1.health <= 0) {
        battleWonMessage = `<h2 class="battleWon">${robotPlayer1.playerName} the ${robotPlayer1.model.id} defeated ${robotPlayer2.playerName} the ${robotPlayer2.model.id} with the ${robotPlayer1.weapon.weaponName}</h2>`;
        $("#battleOutputText").html(battleWonMessage);
    } else if (robotPlayer2.health <= 0) {
        battleWonMessage = `<h2 class="battleWon">${robotPlayer2.playerName} the ${robotPlayer2.model.id} defeated ${robotPlayer1.playerName} the ${robotPlayer1.model.id} with the ${robotPlayer2.weapon.weaponName}</h2>`;
        $("#battleOutputText").html(battleWonMessage);
    } else {
       attackSequence(robotPlayer1, robotPlayer2); 
    }
}



/////******   Helper Functions   ******/////
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
    initiateBattle
};