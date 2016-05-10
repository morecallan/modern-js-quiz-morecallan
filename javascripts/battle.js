"use strict";

/********************************************
**          Browserify Dependencies        **
********************************************/
var $ = require("jquery"),
    DOM = require("./DOMAppend.js");



/********************************************
**              BATTLE SEQUENCE            **
********************************************/

function initiateBattle (robotPlayer1, robotPlayer2) {
    console.log("robots", robotPlayer1, robotPlayer2);
    DOM.showBattledome(robotPlayer1, robotPlayer1);
    $("#robot1BattleHolder").html(robotPlayer1.img);
    $("#robot2BattleHolder").html(robotPlayer2.img);
    attackSequence(robotPlayer1, robotPlayer2);
}



// Each round of battle should determine the amount of damage each robot will do with its weapon.
//Battle round counter
var battleRounds = 1;




// That damage should then be adjusted based on the modifications that it has, and what its opponent has.
function calculateAttackDamage(player) {
    //Player's health, strength and intelligence are averaged.
    var playerCurrentStat = ((player.health + player.strength + player.intelligence)/3);
    //Player's minimum and maximum attack damage is calculated then it picks a random number between the 2 and returns it
    var maximumAttackDamage = player.weapon.maxDamage * (playerCurrentStat/100);
    var minimumAttackDamage = player.weapon.minDamage;
    var attackDamage = 0;
    if (minimumAttackDamage >= maximumAttackDamage) {
        attackDamage = Math.floor(maximumAttackDamage);
    } else {
        attackDamage = Math.floor(getRandomInt(minimumAttackDamage, maximumAttackDamage));
    }
    return attackDamage;
}


//This is what happens if attack button is pressed
function attackSequence(robotPlayer1, robotPlayer2) {

    var attackAction = function(attacker, opponent) {
        console.log("battleRounds", battleRounds);
        let battleRoundEvenOrOdd;
        if (battleRounds%2 === 0) {
            battleRoundEvenOrOdd = 1;
        } else {
            battleRoundEvenOrOdd = 225;
        }
        //Combatant's attack score is caluclated
        var damageToOpponentHealth = calculateAttackDamage(attacker);
        //Opponent's health is reduced by attack score
        opponent.health = opponent.health - damageToOpponentHealth;
        // Display attack score - DOM output("Attacker" attacks "opponent" with "weapon" and does {x} damage.)
        let attackMessage = `<p class="attackOutput attackOutput${battleRoundEvenOrOdd}"> ${attacker.playerName} the ${attacker.model.id} attacks ${opponent.playerName} the ${opponent.model.id} with ${attacker.weapon.weaponName} and does ${damageToOpponentHealth} damage. </p>`;
        attackMessage += `<p class="opponentHealth opponentHealth${battleRoundEvenOrOdd}"> ${opponent.playerName} health: ${opponent.health}</p>`;
        $("#battleOutputText").append(attackMessage);
        battleRounds++;
    };

    setTimeout(function(){
        attackAction(robotPlayer1, robotPlayer2);
        attackAction(robotPlayer2, robotPlayer1);
        checkHealthToSeeIfOneOfTheseBitchesDied(robotPlayer1, robotPlayer2);
    }, 1000);
    
}

// Rounds continue until one of the robots has 0, or less than 0, health.
function checkHealthToSeeIfOneOfTheseBitchesDied(robotPlayer1, robotPlayer2) {
    let battleWonMessage = "";
    if (robotPlayer1.health <= 0) {
            //move to "lose" page
            battleWonMessage = '<h2 class="battleWon">' + robotPlayer1.playerName +' the ' + robotPlayer1.model.id + ' defeated ' + robotPlayer2.playerName + ' the ' + robotPlayer2.model.id + ' with the ' + robotPlayer1.weapon.weaponName + '</h2>';
        $("#battleOutputText").html(battleWonMessage);
    } else if (robotPlayer2.health <= 0) {
            //move to "win" page
            battleWonMessage = '<h2 class="battleWon">' + robotPlayer2.playerName +' the ' + robotPlayer2.model.id + ' defeated ' + robotPlayer1.playerName + ' the ' + robotPlayer1.model.id + ' with the ' + robotPlayer2.weapon.weaponName + '</h2>';
        $("#battleOutputText").html(battleWonMessage);
    } else {
       attackSequence(robotPlayer1, robotPlayer2); 
    }
}





// When the battle is over display the outcome to the user. For example...
// The Viper Drone defeated the Behemoth ATV with its flamethrower.




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