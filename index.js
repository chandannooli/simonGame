var buttonClr=["red","blue","green","yellow"];
var gamePattern=[];
var randomChosenClr="";
var userClickPattern=[];
var level=0;
var start=false;

$(document).keypress(function(){
    if(!start){
        nextSequence();
        start=true;
    }
})


$(".btn").click(function(){
    var userChosenClr= $(this).attr('id'); 
    animatePress(userChosenClr);
    soundPlay(userChosenClr);
    if(start){
        userClickPattern.push(userChosenClr);
        checkAnswer(userClickPattern.length-1);
    }
    
})


function nextSequence(){
    level++;
    $('#level-title').text("Level "+level);
    randomChosenClr=buttonClr[(Math.floor(Math.random()*4))];
    gamePattern.push(randomChosenClr);
    $("#"+randomChosenClr).fadeOut(150).fadeIn(150);
    soundPlay(randomChosenClr);
    userClickPattern=[];
}

function soundPlay(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(_currentClr){
    $('#'+_currentClr).addClass("pressed");
    setTimeout(function(){
        $('#'+_currentClr).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickPattern[currentLevel]){
        console.log("Success");
        if(gamePattern.length===currentLevel+1){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }else{
        $('#level-title').text("Wrong Answer");
        $(document.body).addClass("game-over");
        soundPlay("wrong");
        setTimeout(() => {
            location.reload();
        }, 1000);
}
}

function startOver(){
    gamePattern=[];
    level=0;
    start=false;
}
    


