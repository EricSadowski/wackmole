
// declaring intial score, hiding moles in holes and revealing start button
// hiding high score until it is hit
var count = 0;
var highscore = 0;
$(".mole").hide();
$('#hiScoreWordDisplay').hide();
$('#hiScoreDisplay').hide();


//lil bug control/timeoutkiller section
var wackTimeout;
var hiTimeout;
var byeTimeout;

//timer varibles and declarations
$("#timerBox").hide();
var timer; 
var timeLeft = 10; // seconds


$("#central-board").append('<button id="startGame">Start Game</button>');
$("#scoreboard").append('<h1 id="playAgain">Play Again?</h1>');
$("#playAgain").hide();
var startButton = document.getElementById('startGame');
startButton.addEventListener('click', beginGame);


/* initialize mole variables by ids */
var mole1 = document.getElementById('mole1');
var mole2 = document.getElementById('mole2');
var mole3 = document.getElementById('mole3');
var mole4 = document.getElementById('mole4');
var mole5 = document.getElementById('mole5');
var mole6 = document.getElementById('mole6');
var mole7 = document.getElementById('mole7');
var mole8 = document.getElementById('mole8');
var mole9 = document.getElementById('mole9');

var moles = document.querySelectorAll('.mole');

/* add event listeners to each mole and begin game */
for (let i = 0; i < moles.length; i++) {
    moles[i].addEventListener('click', function() {
        var eventTarget = moles[i].id;
        wack(eventTarget);
    });
}


/**
 * begins to randomize the moles by sending all target ids to a "wack" function
 */
function beginGame() {
  if(highscore>10){
    $('#hiScoreWordDisplay').show();
    $('#hiScoreDisplay').show();
  }

    $('#moleDisplay').html("Mole Score is: ");
    $("#startGame").hide();
    $("#playAgain").hide();
    $("#newHighAlert").html("");
    $(".mole").show();
    $("#timerBox").show();
    startTimer();
    count = count-9;

    for (let i = 0; i < moles.length; i++) {
        
        var eventTarget = moles[i].id;
        wack(eventTarget);
        
    }
}

/*
// an event listener on each mole that takes the target id of the button clicked and sends it to a function
mole1.addEventListener('click', function(e){
    var eventTarget = e.target.id;
    wack(eventTarget);
    });
*/


var disp = document.getElementById("display");

/**
 *  first function that starts the madness, recieves id data from button clicked
   adds points then hides button and calls reappear function after timer up
 * @param {*} dataId the id of a button
 */
function wack(dataId){
    count++;
    disp.innerHTML = count;
    document.getElementById(dataId).style.visibility = "hidden";
    document.getElementById(dataId).disabled = true;
    wackTimeout = setTimeout(ohHiMole, (1000 + randomInt()),dataId);
    
    
}
/**
 *  reappear function (mole comes back) that if not pressed quickly dissapears
 * @param {*} dataId the id of a button
 */
function ohHiMole(dataId){
    clearTimeout(wackTimeout);
    document.getElementById(dataId).style.visibility = "visible";
    document.getElementById(dataId).disabled = false;
    hiTimeout = setTimeout(ohByeMole, (200 + randomSpazz()),dataId);
}

/**
 * last stop on the infinite loop train, a function that causes button to dissapear then reappear
 * @param {*} dataId the id of a button
 */
function ohByeMole(dataId){
    
    document.getElementById(dataId).style.visibility = "hidden";
    document.getElementById(dataId).disabled = true;
    byeTimeout = setTimeout(ohHiMole, (1000 + randomInt()),dataId);
}

// random number various generators
function randomInt() { 
    return Math.floor(Math.random() * (1000 - 1 + 1) + 1)
  }

  function randomSpazz() { 
    return Math.floor(Math.random() * (2000 - 1 + 1) + 1)
  }




//  TIMER SECTION //

/**
 * What to do when the timer runs out
 */
function displayWinMessage(){
  var winMessage = $("<div></div>").text("Congratulations!");
      winMessage.css({
        fontSize: "48px",
        textAlign: "center",
        marginTop: "200px"
      });
      $("body").append(winMessage);
}

function gameOver() {
  // This cancels the setInterval, so the updateTimer stops getting called

  if(count>highscore){
    highscore = count;
    $("#scoreboard").append('<h1 id="newHighAlert">New High Score '+ highscore +'!!!</h1>');
    $("#hiScoreDisplay").html(highscore);
  }
  clearInterval(timer);
  $('#moleDisplay').html("Game Over! Final Score: ");
  $("#playAgain").show();
  $(".mole").hide();
  $("#timerBox").hide();
  restart();

  
}

/**
 * takes a second (1000ms) off the time left, updates the html to reflect that. ends game when goes below 0
 */
function updateTimer() {
  timeLeft = timeLeft - 1;
  if(timeLeft >= 0)
    $('#timer').html(timeLeft);
  else {
    gameOver();
  }
}

/**
 * starts timer then calls update timer every second to take a second off the count
 */
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  updateTimer();
  
}

/**
 * restarts the game, called from game over.
 */
function restart(){
  timeLeft = 10
  count = 0;
  $("#startGame").show();
}