"use strict";


/********************************************
**          Browserify Dependencies        **
********************************************/
var $ = require("jquery");

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

    //See below for steps 6 and 7. They need to happen when DOM(Models) is dynamically populated.
    //See below for steps 8 and 9. They need to happen when DOM(Weapons) is dynamically populated.
    //See below for steps 10 and 11. They need to happen when DOM(Modifications) is dynamically populated.
}

function playerModelClickEvents() {
    //Step 6: When User Selects a Type, Show Arrow
    $(".playerModel").click(function(e){
        $(".playerModel").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        $("#p1ModelNextArrow").show(); 
    });

    //Step 7: When User Hits Arrow, Display Next Card
    $("#p1ModelNextArrow").click(function(){
        p1stats.model = $("div.playerModel.selected")[0].id;
        populateWeapons();
        $("#player1NameAndTypeLeft").hide();
        $("#player1ModelRight").hide();
        $("#player1Weapons").show();
        $("#player1Weapons").addClass("animated bounceInDown");
        $("#p1WeaponsNextArrow").hide();
    });
}


function playerWeaponsClickEvents(){
    //Step 8: When User Selects a Weapon, Show Arrow
    $(".playerWeapon").click(function(e){
        $(".playerWeapon").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        $("#p1WeaponsNextArrow").show(); 
    });

    //Step 9: When User Hits Arrow, Display Next Card
    $("#p1WeaponsNextArrow").click(function(){
        p1stats.weapon = $("div.playerWeapon.selected")[0].id;
        populateModifications();
        $("#player1Modifications").show();
        $("#player1Modifications").addClass("animated rotateInUpLeft");
        $("#p1ModificationsNextArrow").hide();
        $("#player1Weapons").removeClass("animated slideInDown");
        $("#player1Weapons").addClass("disabled");
    });
}


function playerModificationsClickEvents(){
    //Step 10: When User Selects a Modifictaion, Show Arrow
    $(".playerModification").click(function(e){
        $(".playerModification").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        $("#p1ModificationsNextArrow").show(); 
    });

    //Step 11: When User Hits Arrow, Display P2 Setup
    $("#p1ModificationsNextArrow").click(function(){
        p1stats.modifications = $("div.playerModification.selected")[0].id;
        console.log("p1stats", p1stats);
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
var weaponsDataFromJSON = null;
var modificationsDataFromJSON = null;
var healthMinForAllModels = [];
var strengthBonusForAllModels = [];
var intelligenceBonusForAllModels = [];

//Populating Model Card
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
        buildModelDOM += `<div class="playerModel" id=${$model.id}>
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
    playerModelClickEvents();
}

//Populating Weapons Card
function getWeaponsInfoFromJSON(typeDataFromAJAX) {
    weaponsDataFromJSON = typeDataFromAJAX;
}

function decideWhichWeaponInfoToPassToPopulateWeapons(){
    let dataToPassToPopulateWeapons = [];
    weaponsDataFromJSON.weapons.forEach(($weapon) => {
        if ($weapon.prototype !== null) {
            dataToPassToPopulateWeapons.push($weapon);
        }
    });
    return dataToPassToPopulateWeapons;
}

function populateWeapons() {
    var weapons = decideWhichWeaponInfoToPassToPopulateWeapons();
    var boxCounter = 0;
    var buildWeaponDOM = `<div class="col-md-6">`;
    weapons.forEach(($weapon) => {
        buildWeaponDOM += `<div class="playerWeapon" id=${$weapon.id}>${$weapon.weaponName}</div>`;
        if (boxCounter === 2) {
            buildWeaponDOM += `</div><div class="col-md-6">`;
        }
        boxCounter++;
    });
    buildWeaponDOM += `</div>`;
    $("#weaponsHolder").html(buildWeaponDOM);
    playerWeaponsClickEvents();
}

//Populating Modifications Card
function getModificationsInfoFromJSON(typeDataFromAJAX) {
    modificationsDataFromJSON = typeDataFromAJAX;
}

function decideWhichModInfoToPassToPopulateModifications(){
    let dataToPassToPopulateModifications = [];
    modificationsDataFromJSON.modifications.forEach(($modification) => {
        if ($modification.prototype !== null) {
            dataToPassToPopulateModifications.push($modification);
        }
    });
    console.log("dataToPassToPopulateModifications", dataToPassToPopulateModifications);
    return dataToPassToPopulateModifications;
}

function populateModifications() {
    var modifications = decideWhichModInfoToPassToPopulateModifications();
    var boxCounter = 0;
    var buildModDOM = `<div class="col-md-6">`;
    modifications.forEach(($modification) => {
        buildModDOM += `<div class="playerModification" id=${$modification.id}>${$modification.modName}</div>`;
        if (boxCounter === 2) {
            buildModDOM += `</div><div class="col-md-6">`;
        }
        boxCounter++;
    });
    buildModDOM += `</div>`;
    $("#modificationsHolder").html(buildModDOM);
    playerModificationsClickEvents();
}

/////******   Helper Functions   ******/////
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function calculateHealthBonusPercent(healthMinOfSpecificModel) {
    var highestHealthMinOfAllModels = getMaxOfArray(healthMinForAllModels);
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
  getTypeInfoFromJSON,
  getWeaponsInfoFromJSON,
  getModificationsInfoFromJSON,
  p1stats,
  p2stats
};