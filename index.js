var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(".btn").click(function(){
  var userChoosenColor=$(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length-1);
})
$(document).keypress(function(){
  if(!started){
  $("#level-title").text("Level "+level);
  nextSequence();
  started=true;
}
});
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      var audio1=new Audio("sounds/wrong.mp3");
      audio1.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChoosenColor=buttonColors[randomNumber]
  gamePattern.push(randomChoosenColor);
$("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChoosenColor);

}
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
setTimeout(function(){
  $("#"+currentColor).removeClass("pressed");
},100);
}
