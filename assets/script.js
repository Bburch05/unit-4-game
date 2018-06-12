//Setting Jquery div target vars
var charSel = $(".charselect")
var charDiv = ".character"
var heroDiv = $(".hero");
var enemyDiv = $('.enemy');
var defendDiv = $('.defender');
var defeatDiv = $('.defeated');
var logDiv = $('.log')

//Char Objects
var luke = {
    name: "Luke Skywalker",
    atkBase : 10,
    atk : 10,
    hp : 100,
    hpBase : 100,
    cAtk : 10,
    hpdiv : $("#lukehp"),
    loc : $(".lukeC")
}

var obi = {
    name: "Obi Wan Kenobi",
    atkBase : 5,
    atk : 5,
    hp : 125,
    hpBase : 125,
    cAtk : 15,
    hpdiv : $("#obihp"),
    loc : $(".obiC")
}

var darthmaul = {
    name: "Darth Maul",
    atkBase : 20,
    atk : 20,
    hp : 80,
    hpBase : 80,
    cAtk : 20,
    hpdiv : $("#maulhp"),
    loc : $(".maulC")
}

var palpatine = {
    name: "Palpatine",
    atkBase : 15,
    atk : 15,
    hp : 50,
    hpBase : 50,
    cAtk : 25,
    hpdiv : $("#palpahp"),
    loc : $(".palpaC")
}

//Array of Character objects
var chars = [luke,obi,palpatine,darthmaul];

//Game Logic Variables
var foes = 0;
var heroChoice;
var enemy = null;

//Functions
    //Reset Game
function initialize(){
    foes = 0;
    heroChoice = null;
    enemy = null;
    $(charSel).append($(charDiv));  

    for (i = 0; i < chars.length; i++){
        chars[i].hp = chars[i].hpBase;
        $(chars[i].hpdiv).text(chars[i].hp);
    }
    $(".rowChar").removeClass("vanish")
    $(".rowFoe, .rowHeroDef, .rowDefeat").addClass("vanish")
    $("#attack").removeClass("ready")
    $(charDiv).removeClass("col-md-6")
}




initialize();
$(document).ready(function(){
//On Click Events
$(charSel).on("click",charDiv,function(){
    heroChoice = chars[parseInt(this.id)];
    console.log(this);
    $(heroDiv).append(this);
    $(this).addClass("col-md-6")
    $(".rowChar").addClass("vanish")
    $(".rowFoe, .rowHeroDef, .rowDefeat").removeClass("vanish")
    $(".character").each(function(){
        if ( chars[parseInt(this.id)] === heroChoice ) {
            return false;
        }
    $(enemyDiv).append(this)
    foes++
    console.log(foes);
    })
})


$(enemyDiv).on("click",charDiv,function(){
    if (enemy === null){
    enemy = chars[parseInt(this.id)];
    $(defendDiv).append(this)
    $(this).addClass("col-md-6")
    $("#attack").addClass("ready")
    }
})


$("#attack").on("click", function(){
    enemy.hp = enemy.hp - heroChoice.atk;
    $(logDiv).prepend(
        "<p>" + heroChoice.name + " dealt <span id='damage'>" + heroChoice.atk + "</span> damage to " + enemy.name + "</p>"
    );
    heroChoice.atk = heroChoice.atk + heroChoice.atkBase;
    $(enemy.hpdiv).text(enemy.hp);
    if (enemy.hp <= 0){
        $(defeatDiv).append(enemy.loc)
        $(enemy.loc).removeClass("col-md-6")
        $(enemy.hpdiv).text("0")
        $("#attack").removeClass("ready")
        enemy = null;
        foes--
    }

    else {
        heroChoice.hp = heroChoice.hp - enemy.cAtk;
        $(heroChoice.hpdiv).text(heroChoice.hp);
        $(logDiv).prepend(
            enemy.name + " dealt <span id='damage'>" + enemy.cAtk + "</span> damage to " + heroChoice.name
        );
    }

    if (heroChoice.hp <= 0){
        heroChoice.atk = heroChoice.atkBase;
        initialize();
        $(".winloss").text("You Lost!")
    }

    if (foes === 0) {
        heroChoice.atk = heroChoice.atkBase;
        initialize();
        $(".winloss").text("You Won!")
    }



})

$("#clearLog").on("click", function(){
    $(".log").empty()
})

});