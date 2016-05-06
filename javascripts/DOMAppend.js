"use strict";


/********************************************
**          Browserify Dependencies        **
********************************************/
var $ = require("jquery"),
    modifications = require("./modifications.js"),
    weapons = require("./weapons.js");

/********************************************
** Empty Player Objects for collecting data**
********************************************/
var p1stats = {};
var p2stats = {};

/********************************************
**          PLAYER 1 SETUP - Cards         **
********************************************/
function displayPlayer1SetUp() {
    //Step 1: Display Only Player 1 SetUp Name
    $(".playSetUpCard").hide();
    $("#player1Name").show();
    $("#p1NameNextArrow").hide();

    //Step 2: When User Starts Typing Name, Show Arrow
    $("#p1NameInput").keyup(function(){
        if($("#p1NameInput").val() !== "") {
           $("#p1NameNextArrow").show(); 
        }
    });

    //Step 3: When User Hits Arrow, Display Next Card
    $("#p1NameNextArrow").click(function(){
        p1stats.playerName = $("#p1NameInput").val();
        $("#player1Type").show();
        $("#player1Type").addClass("animated slideInDown");
        $("#p1TypeNextArrow").hide();
        $("#player1Name").addClass("disabled");
    });

    //Step 4: When User Selects a Type, Show Arrow
    $(".playerType").click(function(e){
        $(".playerType").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        $("#p1TypeNextArrow").show(); 
    });

    //Step 5: When User Hits Arrow, Display Next Card
    $("#p1TypeNextArrow").click(function(){
        p1stats.type = $("div.playerType.selected")[0].id;
        populateModels(p1stats.type);
        $("#player1Model").show();
        $("#player1Model").addClass("animated rotateInUpLeft");
        $("#p1ModelNextArrow").hide();
        $("#player1Type").removeClass("animated slideInDown");
        $("#player1Type").addClass("disabled");
    });

    //Step 6: When User Selects a Type, Show Arrow
    $(".playerModel").click(function(e){
        $(".playerModel").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        $("#p1ModelNextArrow").show(); 
    });

    //Step 7: When User Hits Arrow, Display Next Card
    $("#p1ModelNextArrow").click(function(){
        // p1stats.model = $("div.playerModel.selected").id();
        // populateWeapons();
        $("#player1NameAndTypeLeft").hide();
        $("#player1ModelRight").hide();
        $("#player1Weapons").show();
        $("#player1Weapons").addClass("animated bounceInDown");
        $("#p1WeaponsNextArrow").hide();
    });

    //Step 8: When User Selects a Weapon, Show Arrow
    $(".playerWeapon").click(function(e){
        $(".playerWeapon").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        $("#p1WeaponsNextArrow").show(); 
    });

    //Step 9: When User Hits Arrow, Display Next Card
    $("#p1WeaponsNextArrow").click(function(){
        // p1stats.weapon = $("div.playerWeapon.selected").id();
        $("#player1Modifications").show();
        $("#player1Modifications").addClass("animated rotateInUpLeft");
        $("#p1ModificationsNextArrow").hide();
        $("#player1Weapons").removeClass("animated slideInDown");
        $("#player1Weapons").addClass("disabled");
    });

    //Step 8: When User Selects a Modifictaion, Show Arrow
    $(".playerModification").click(function(e){
        $(".playerModification").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        $("#p1ModificationsNextArrow").show(); 
    });

    //Step 10: When User Hits Arrow, Display P2 Setup
    $("#p1ModificationsNextArrow").click(function(){
        // p1stats.modifications = $("div.playerModification.selected").id();
        $("#player1Modifications").show();
        $("#player1Modifications").addClass("animated rotateInUpLeft");
        $("#p1ModificationsNextArrow").hide();
        $("#player1Weapons").removeClass("animated slideInDown");
        $("#player1Weapons").addClass("disabled");
    });
}

/********************************************
**       PLAYER 1 SETUP - Populate Dom     **
********************************************/
var modelDataFromJSON = null;
var healthMinForAllModels = [];
var strengthBonusForAllModels = [];
var intelligenceBonusForAllModels = [];


function getTypeInfoFromJSON(typeDataFromAJAX) {
    modelDataFromJSON = typeDataFromAJAX;
}

function decideWhichTypeInfoToPassToPopulateModels(robotType){
    let dataToPassToPopulateModels = [];
    modelDataFromJSON.types.forEach(($type) => {
        if ($type.prototype !== null){
            healthMinForAllModels.push($type.healthMin);
            strengthBonusForAllModels.push($type.strengthModifier);
            intelligenceBonusForAllModels.push($type.intelligenceModifier);
        }
        if ($type.prototype === robotType) {
            dataToPassToPopulateModels.push($type);
        }
    });
    return dataToPassToPopulateModels;
}

function populateModels(robotType) {
    var models = decideWhichTypeInfoToPassToPopulateModels(robotType);
    var buildModelDOM = "";
    models.forEach(($model) => {
        var healthBonusPercent = calculateHealthBonusPercent($model.healthMin);
        var strengthBonusPercent = calculateStrengthBonusPercent($model.strengthModifier);
        var intellegenceBonusPercent = calculateIntelligenceBonusPercent($model.intelligenceModifier);
        buildModelDOM += `<div class="playerModel">
                            <img src=${$model.image}><div class="modelDetailsContainer">
                            <h3>${$model.id} Bonuses</h3><div class="modelStat">
                            <h3>HEALTH:</h3><div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"
                            style="width: ${healthBonusPercent}"><span class="sr-only">20% Complete</span></div></div></div><div class="modelStat">
                            <h3>STRENGTH:</h3><div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" 
                            style="width: ${strengthBonusPercent}"><span class="sr-only">20% Complete</span></div></div></div><div class="modelStat">
                            <h3>EVASION:</h3><div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" 
                            style="width:  ${intellegenceBonusPercent}"><span class="sr-only">20% Complete</span></div></div></div></div></div>`;
    });
    $("#modelHolder").html(buildModelDOM);
}



/////******   Helper Functions   ******/////
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function calculateHealthBonusPercent(healthMinOfSpecificModel) {
    console.log("healthMinOfSpecificModel", healthMinOfSpecificModel);
    var highestHealthMinOfAllModels = getMaxOfArray(healthMinForAllModels);
    console.log("highestHealthMinOfAllModels", highestHealthMinOfAllModels);
    var healthMinPercent = (healthMinOfSpecificModel / highestHealthMinOfAllModels) * 100 + "%";
    return healthMinPercent;
}

function calculateStrengthBonusPercent(strengthBonusofSpecificModel){
    var highestStrengthOfAllModels = getMaxOfArray(strengthBonusForAllModels);
    var strengthBonusPercent = (strengthBonusofSpecificModel / highestStrengthOfAllModels) * 100 + "%";
    return strengthBonusPercent;
}

function calculateIntelligenceBonusPercent(intelligenceBonusofSpecificModel){
    var highestIntelligenceOfAllModels = getMaxOfArray(intelligenceBonusForAllModels);
    var intelligenceBonusPercent = (intelligenceBonusofSpecificModel / highestIntelligenceOfAllModels) * 100 + "%";
    return intelligenceBonusPercent;
}

/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
  displayPlayer1SetUp,
  getTypeInfoFromJSON
};