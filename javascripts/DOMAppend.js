"use strict";


/********************************************
**          Browserify Dependencies        **
********************************************/
let $ = require("jquery");



/********************************************
** Empty Player Objects for collecting data**
********************************************/
let p1stats = {};
let p2stats = {};

displayPlayerSetUp(p1stats, 1);



/********************************************
**           PLAYER SETUP - Cards          **
********************************************/
function displayPlayerSetUp(playerTitle, player) {

    //Step 1: Display Only Player SetUp Name
    //   FR1:   When your user interface first loads, provide the user with buttons so that one specific robot model can be chosen as Player 1.
    $("#playerViews").hide();
    $("#battleDome").hide();
    $(".playSetUpCard").hide();
    $("#player" + player + "Name").show();
    $(".logoBar").hide();
    $("#logoBar" + player).show();
    $("#p" + player + "NameNextArrow").hide();

    // Step 1b: When Player Setup Page first loads, draw attention to logo subtitle by having it flash neon.
    let logoFlashNeon = () => {
        setTimeout(() => { 
            $(".logoSub").addClass("logoSwitch");
        }, 400);
        setTimeout(() => { 
          $(".logoSub").removeClass("logoSwitch");        
        }, 2200);
    };

    logoFlashNeon();

    //Step 2: When User Starts Typing Name, Show Arrow
    $("#p" + player + "NameInput").keyup(() => {
        if($("#p" + player + "NameInput").val() !== "") {
           $("#p" + player + "NameNextArrow").show(); 
        }
    });

    //Step 3: When User Hits Arrow, Display Next Card
    $("#p" + player + "NameNextArrow").click(() => {
        playerTitle.playerName = $("#p" + player + "NameInput").val();
        $("#player" + player + "Type").show();
        $("#player" + player + "Type").addClass("animated slideInDown");
        $("#p" + player + "TypeNextArrow").hide();
        $("#player" + player + "Name").addClass("disabled");
    });

    //Step 4: When User Selects a Type, Show Arrow
    $(".playerType").click((e) => {
        $(".playerType").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        $("#p" + player + "TypeNextArrow").show(); 
    });

    //Step 5: When User Hits Arrow, Display Next Card
    $("#p" + player + "TypeNextArrow").click(() => {
        playerTitle.type = $("div.playerType.selected")[0].id;
        populateModels(playerTitle.type, playerTitle, player);
        $("#player" + player + "Model").show();
        $("#player" + player + "Model").addClass("animated rotateInUpLeft");
        $("#p" + player + "ModelNextArrow").hide();
        $("#player" + player + "Type").removeClass("animated slideInDown");
        $("#player" + player + "Type").addClass("disabled");
    });

    //See below for steps 6 and 7. They need to happen when DOM(Models) is dynamically populated.
    //See below for steps 8 and 9. They need to happen when DOM(Weapons) is dynamically populated.
    //See below for steps 10 and 11. They need to happen when DOM(Modifications) is dynamically populated.
}

function playerModelClickEvents(playerTitle, player) {
    //Step 6: When User Selects a Type, Show Arrow
    $(".playerModel").click((e) => {
        $(".playerModel").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        $("#p"+ player + "ModelNextArrow").show(); 
    });

    //Step 7: When User Hits Arrow, Display Next Card
    $("#p"+ player + "ModelNextArrow").click(() => {
        playerTitle.model = $("div.playerModel.selected")[0].id;
        playerTitle.image = $("div.playerModel.selected")[0].firstElementChild.outerHTML;
        populateWeapons(playerTitle, player);
        $("#player"+ player + "NameAndTypeLeft").hide();
        $("#player"+ player + "ModelRight").hide();
        $("#player"+ player + "Weapons").show();
        $("#player"+ player + "Weapons").addClass("animated bounceInDown");
        $("#p"+ player + "WeaponsNextArrow").hide();
    });
}


function playerWeaponsClickEvents(playerTitle, player){
    //Step 8: When User Selects a Weapon, Show Arrow
    $(".playerWeapon").click((e) => {
        $(".playerWeapon").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        $("#p"+ player + "WeaponsNextArrow").show(); 
    });

    //Step 9: When User Hits Arrow, Display Next Card
    $("#p"+ player + "WeaponsNextArrow").click(() => {
        playerTitle.weapon = $("div.playerWeapon.selected")[0].id;
        populateModifications(playerTitle, player);
        $("#player"+ player + "Modifications").show();
        $("#player"+ player + "Modifications").addClass("animated rotateInUpLeft");
        $("#p"+ player + "ModificationsNextArrow").hide();
        $("#player"+ player + "Weapons").removeClass("animated slideInDown");
        $("#player"+ player + "Weapons").addClass("disabled");
    });
}


function playerModificationsClickEvents(playerTitle, player){
    //Step 10: When User Selects a Modifictaion, Show Arrow
    $(".playerModification").click((e) => {
        $(".playerModification").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        $("#p"+ player + "ModificationsNextArrow").show(); 
    });

    //Step 11: When User Hits Arrow, Display P2 Setup
    $("#p"+ player + "ModificationsNextArrow").click(() => {
        $(".playSetUpCard").hide();
        playerTitle.modification = $("div.playerModification.selected")[0].id;
        player++;
        if(player < 3) {
            displayPlayerSetUp(p2stats, player);
        } else {
            $("#p"+ player - 1 + "setup").hide();
            populatePlayerDisplay();
            $("#playerViews").show();
            $(".logoBar").hide();
            $("#logoBarReview").show();
        }
    });
}


/********************************************
**        PLAYER SETUP - Populate Dom      **
********************************************/
let modelDataFromJSON = null;
let weaponsDataFromJSON = null;
let modificationsDataFromJSON = null;
let healthMinForAllModels = [];
let strengthBonusForAllModels = [];
let intelligenceBonusForAllModels = [];



/////************        Populate Models Card        ************/////
///////////////////////////////////////////////////////////////////////
//   FR1: When your user interface first loads, provide the user with buttons so that one specific robot model can be chosen as Player 1.
//   FR4: Once Player 1 has a modification, provide the user with buttons so that one specific robot model can be chosen as Player 2.
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

function populateModels(robotType, playerTitle, player) {
    let models = decideWhichTypeInfoToPassToPopulateModels(robotType);
    let buildModelDOM = "";
    models.forEach(($model) => {
        let healthBonusPercent = calculateHealthBonusPercent($model.healthMin);
        let strengthBonusPercent = calculateStrengthBonusPercent($model.strengthModifier);
        let intellegenceBonusPercent = calculateIntelligenceBonusPercent($model.intelligenceModifier);
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
    $("#modelHolder" + player).html(buildModelDOM);
    playerModelClickEvents(playerTitle, player);
}


/////************        Populate Weapons Card        ************/////
///////////////////////////////////////////////////////////////////////
//   FR2:   Once the user selects a robot model for Player 1, show a button for each weapon that can be added to the robot.
//   FR5:   Once the user selects a robot model for Player 2, show a button for each weapon that can be added to the robot.
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

function populateWeapons(playerTitle, player) {
    let weapons = decideWhichWeaponInfoToPassToPopulateWeapons();
    let boxCounter = 0;
    let buildWeaponDOM = `<div class="col-md-6">`;
    weapons.forEach(($weapon) => {
        buildWeaponDOM += `<div class="playerWeapon" id=${$weapon.id}>${$weapon.weaponName}</div>`;
        if (boxCounter === 2) {
            buildWeaponDOM += `</div><div class="col-md-6">`;
        }
        boxCounter++;
    });
    buildWeaponDOM += `</div>`;
    $("#weaponsHolder" + player).html(buildWeaponDOM);
    playerWeaponsClickEvents(playerTitle, player);
}


/////************     Populate Modifications Card     ************/////
///////////////////////////////////////////////////////////////////////
//   FR3:   Once the user selects a weapon for Player 1, show a button for each modification that can be added to the robot.
//   FR6:   Once the user selects a weapon for Player 2, show a button for each modification that can be added to the robot.
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
    return dataToPassToPopulateModifications;
}

function populateModifications(playerTitle, player) {
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
    $("#modificationsHolder"  + player).html(buildModDOM);
    playerModificationsClickEvents(playerTitle, player);
}


/********************************************
**        Battledome - populate/show       **
********************************************/
function showBattledome() {
    $(".page").hide();
    $("#battleDome").show();
    $("#logoBattle").show();
}



/////******   Helper Functions   ******/////
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function calculateHealthBonusPercent(healthMinOfSpecificModel) {
    let highestHealthMinOfAllModels = getMaxOfArray(healthMinForAllModels);
    let healthMinPercent = (healthMinOfSpecificModel / highestHealthMinOfAllModels) * 100 + "%";
    return healthMinPercent;
}

function calculateStrengthBonusPercent(strengthBonusofSpecificModel){
    let highestStrengthOfAllModels = getMaxOfArray(strengthBonusForAllModels);
    let strengthBonusPercent = (strengthBonusofSpecificModel / highestStrengthOfAllModels) * 100 + "%";
    return strengthBonusPercent;
}

function calculateIntelligenceBonusPercent(intelligenceBonusofSpecificModel){
    let highestIntelligenceOfAllModels = getMaxOfArray(intelligenceBonusForAllModels);
    let intelligenceBonusPercent = (intelligenceBonusofSpecificModel / highestIntelligenceOfAllModels) * 100 + "%";
    return intelligenceBonusPercent;
}


/********************************************
**       PLAYER DISPLAY - Populate Dom     **
********************************************/

function populatePlayerDisplay(){
    let robot1String = "";
    let robot2String = "";
    
    robot1String += `<div class="playerDisplay">${p1stats.image}<p class="imageLabel">${p1stats.playerName}</p><p>TYPE: ${p1stats.type} </p><p>MODEL: ${p1stats.model}</p><p>WEAPON: ${p1stats.weapon}</p><p>MODIFICATION: ${p1stats.modification}</p></div>`;
    robot2String += `<div class="playerDisplay">${p2stats.image}<p class="imageLabel">${p2stats.playerName}</p><p>TYPE: ${p2stats.type} </p><p>MODEL: ${p2stats.model}</p><p>WEAPON: ${p2stats.weapon}</p><p>MODIFICATION: ${p2stats.modification}</p></div>`;


    $("#p1Holder").html(robot1String);
    $("#p2Holder").html(robot2String);
}



/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
  displayPlayerSetUp,
  getTypeInfoFromJSON,
  getWeaponsInfoFromJSON,
  getModificationsInfoFromJSON,
  showBattledome,
  p1stats,
  p2stats
};