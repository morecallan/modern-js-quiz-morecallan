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
    DOM.showBattledome(robotPlayer1, robotPlayer1);
    console.log("robotPlayer1", robotPlayer1);
    console.log("robotPlayer2", robotPlayer2);
    $("#robot1BattleHolder").html(robotPlayer1.img);
    $("#robot2BattleHolder").html(robotPlayer2.img);
    attackSequence(robotPlayer1, robotPlayer2);
}



// Each round of battle should determine the amount of damage each robot will do with its weapon.
//Battle round counter
var battleRounds = 0;




// That damage should then be adjusted based on the modifications that it has, and what its opponent has.
function calculateAttackDamage(player) {
    console.log("player", player);
    //Player's health, strength and intelligence are averaged.
    var playerCurrentStat = ((player.health + player.strength + player.intelligence)/3);
    //Player's minimum and maximum attack damage is calculated then it picks a random number between the 2 and returns it
    var maximumAttackDamage = player.weapon.maximumAttackDamage * (playerCurrentStat/100);
    var minimumAttackDamage = player.weapon.minimumAttackDamage;
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

    function attackAction(attacker, opponent) {
        console.log("attacker", attacker);
        console.log("opponent", opponent);
        //Combatant's attack score is caluclated
        var damageToOpponentHealth = calculateAttackDamage(attacker);
        //Opponent's health is reduced by attack score
        opponent.health = opponent.health - damageToOpponentHealth;
        // Display attack score - DOM output("Attacker" attacks "opponent" with "weapon" and does {x} damage.)
        let attackMessage = '<p class="attackOutput">' + attacker.playerName +' the ' + attacker.model.id + ' attacks ' + opponent.playerName + ' the ' + opponent.model.id + ' with ' + attacker.weapon.weaponName + ' and does ' + damageToOpponentHealth + ' damage. <p class="opponentHealth">' + opponent.playerName + ' health: ' + opponent.health + '</p></p>';
        $("#battleOutputText").append(attackMessage);
    }

    //robotPlayer1 Attacks
    function robotPlayer1Attacks(){
        attackAction(robotPlayer1, robotPlayer2);
        checkHealthToSeeIfOneOfTheseBitchesDied(robotPlayer1, robotPlayer2);
        robotPlayer2Attacks();
    }
    
    //robotPlayer2 Attacks
    function robotPlayer2Attacks(){
        attackAction(robotPlayer2, robotPlayer1);
        checkHealthToSeeIfOneOfTheseBitchesDied(robotPlayer1, robotPlayer2);
    }

    robotPlayer1Attacks();


    //Show attack button
    battleRounds++;
}

function checkHealthToSeeIfOneOfTheseBitchesDied(robotPlayer1, robotPlayer2) {
    if (robotPlayer1.health <= 0) {
            //move to "lose" page
            alert("p1 loses");
    } else if (robotPlayer2.health <= 0) {
            //move to "win" page
            alert("p2 loses");
    } else {
       // attackSequence(robotPlayer1, robotPlayer2); 
    }
}



// Rounds continue until one of the robots has 0, or less than 0, health.


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