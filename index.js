var gamePattern=[];
var userClickedPattern=[];
var level=1;
var started=false;
var buttonColor=["green","red","yellow","blue"];

function noise(name){
    setTimeout(function (){
        var noice= new Audio("sounds/"+name+".mp3");
        noice.play();
    },100);
}

function pressAni(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColor).removeClass("pressed");
    },100);   
}

function nextSequence(){
    $("#level-title").text("Level "+level);
    userClickedPattern=[];
    var randomNumber=Math.floor(4*Math.random());
    var randomChosenColor=buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    noise(randomChosenColor);
    handler();
    
}


$(".btn").click(function (){
    var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    noise(userChosenColor);
    pressAni(userChosenColor);
    checker(userClickedPattern.length-1);
});


function gameOver() {
    $("#level-title").text("Game over, Press to restart.");
    $("body").addClass("game-over");
    setTimeout(function (){
        $("body").removeClass("game-over");
    },1000);
}

function checker(curentLevel){
    if(gamePattern[curentLevel]===userClickedPattern[curentLevel]){
        if (gamePattern.length===userClickedPattern.length) {
            level++;
            setTimeout(nextSequence,1000);
        }
    }
    else{
            gamePattern=[];
            level=1;
            started=false;
            gameOver();
        }
}

$("#level-title").click(function (){
    if (!started) {
        started=true;
        nextSequence();
    }
});
