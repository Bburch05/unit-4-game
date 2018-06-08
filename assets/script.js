//Setting Jquery div target vars
var charSel = $(".charselect")
var charDiv = ".character"
var heroDiv = $(".hero");
var enemyDiv = $('.enemy');
var defendDiv = $('.defender');
var defeatDiv = $('.defeated');

//Char Objects
var luke = {
    atkBase : 10,
    atk : 10,
    hp : 100,
    hpBase : 100,
    cAtk : 15,
    hpdiv : $("#lukehp"),
    loc : $(".lukeC")
}

var obi = {
    atkBase : 10,
    atk : 10,
    hp : 100,
    hpBase : 100,
    cAtk : 15,
    hpdiv : $("#obihp"),
    loc : $(".obiC")
}

var darthmaul = {
    atkBase : 10,
    atk : 10,
    hp : 100,
    hpBase : 100,
    cAtk : 15,
    hpdiv : $("#maulhp"),
    loc : $(".maulC")
}

var palpatine = {
    atkBase : 10,
    atk : 10,
    hp : 100,
    hpBase : 100,
    cAtk : 15,
    hpdiv : $("#palpahp"),
    loc : $(".palpaC")
}

//Array of Character objects
var chars = [luke,obi,palpatine,darthmaul];

//Game Logic Variables
var foes = 0;
var heroChoice;
var enemy = null;

//
function initialize(){
    heroChoice = null;
    enemy = null;
    $(charSel).append($(charDiv));  

    for (i = 0; i < chars.length; i++){
        chars[i].hp = chars[i].hpBase;
        $(chars[i].hpdiv).text(chars[i].hp);
    }
    $(".rowChar").css("display","flex")
    $(".rowFoe, .rowHeroDef").css("display","none")
    $("#attack").removeClass("ready")
    $(charDiv).removeClass("col-md-6")
}

//On Click Events
$(charSel).on("click",charDiv,function(){
    heroChoice = chars[parseInt(this.id)];
    console.log(this);
    $(heroDiv).append(this);
    $(this).addClass("col-md-6")
    $(".rowChar").css("display","none")
    $(".rowFoe, .rowHeroDef").css("display","flex")
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
    heroChoice.atk = heroChoice.atk + heroChoice.atkBase;
    $(enemy.hpdiv).text(enemy.hp);
    if (enemy.hp <= 0){
        $(defeatDiv).append(enemy.loc)
        $(enemy.loc).removeClass("col-md-6")
        $("#attack").removeClass("ready")
        enemy = null;
        foes--
    }

    else {
        heroChoice.hp = heroChoice.hp - enemy.cAtk;
        $(heroChoice.hpdiv).text(heroChoice.hp);
    }

    if (heroChoice.hp <= 0){
        initialize();
        $(".winloss").text("You Lost!")
    }

    if (foes === 0) {
        initialize();
        $(".winloss").text("You Won!")
    }



})