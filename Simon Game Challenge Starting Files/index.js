var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = []

var started = false;
var level = 0;
$(document).keypress(function(){
    if (!started){
        $('#level-title').text('Level '+ level);
        nextSequence();
        started = true;
    }
});
// 

$('.btn').click(function(){
    // Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr('id');
    // Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


// Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
        
        }
        else{
            playSound('sounds/wrong.mp3');
            $('body').addClass('game-over');
            $('h1').text('Game Over, Press Any Key to Restart');
            setTimeout(function(){
                $('body').removeClass('game-over');
            }, 200);
            
            startOver();

        }
    

}

// Inside index.js create a new function called nextSequence()
function nextSequence(){
    userClickedPattern = [];
    level++;
    $('#level-title').text('Level '+ level);
    //  Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
    var randomNumber = Math.random();
    var random_0_3 = Math.floor(randomNumber*4);
    // Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
    var randomChosenColour = buttonColors[random_0_3];
    gamePattern.push(randomChosenColour);



    // using jquery for changing colors and sounds
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    

}

// Create a new function called playSound() that takes a single input parameter called name.
function playSound(name){
    // Take the code we used to play sound in the nextSequence() function and move it to playSound().
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}



// Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour){
    //  Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $('#'+currentColour).addClass('pressed');
    // remove the pressed class after a 100 milliseconds.
    setTimeout(function(){
        $('#'+currentColour).removeClass('pressed');
    }, 100);
}


// new function for restart the game
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}