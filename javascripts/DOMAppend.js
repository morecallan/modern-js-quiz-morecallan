"use strict";


/********************************************
**          Browserify Dependencies        **
********************************************/
var $ = require("jquery"),
    modifications = require("./modifications.js"),
    types = require("./types.js"),
    weapons = require("./weapons.js");

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
}

/********************************************
**       PLAYER 1 SETUP - Populate Dom     **
********************************************/
function populatePlayer1SetUp() {
    
}

/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
  displayPlayer1SetUp
};