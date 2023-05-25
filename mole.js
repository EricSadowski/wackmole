
// declaring intial score, hiding moles in holes and revealing start button
var count = 0;
$(".mole").hide();

//timer varibles and declarations
$("#timerBox").hide();
var timer; 
var timeLeft = 5; // seconds


$("#central-board").append('<button id="startGame">Start Game</button>');
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

/* begins to randomize the moles by sending all target ids to a "wack" function */
function beginGame() {
    $("#startGame").hide();
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
    setTimeout(ohHiMole, (1000 + randomInt()),dataId);
    
}
/**
 *  reappear function that if not pressed quickly dissapears
 * @param {*} dataId the id of a button
 */
function ohHiMole(dataId){
    document.getElementById(dataId).style.visibility = "visible";
    document.getElementById(dataId).disabled = false;
    setTimeout(ohByeMole, (200 + randomSpazz()),dataId);
}

/**
 * last stop on the infinite loop train, a function that causes button to dissapear then reappear
 * @param {*} dataId the id of a button
 */
function ohByeMole(dataId){
    document.getElementById(dataId).style.visibility = "hidden";
    document.getElementById(dataId).disabled = true;
    setTimeout(ohHiMole, (1000 + randomInt()),dataId);
}

// random number various generators
function randomInt() { 
    return Math.floor(Math.random() * (1000 - 1 + 1) + 1)
  }

  function randomSpazz() { 
    return Math.floor(Math.random() * (700 - 1 + 1) + 1)
  }





// What to do when the timer runs out
function gameOver() {
  // This cancels the setInterval, so the updateTimer stops getting called
  clearInterval(timer);
  console.log("over")
  $(".mole").hide();
  $("#timerBox").hide();
  restart();

  
}

// takes a second (1000ms) off the time left, updates the html to reflect that. ends game when goes below 0
function updateTimer() {
  timeLeft = timeLeft - 1;
  if(timeLeft >= 0)
    $('#timer').html(timeLeft);
  else {
    gameOver();
  }
}

function startTimer() {
  // calls update timer every second to take a second off the count
  timer = setInterval(updateTimer, 1000);
  //call update timer to get it going before the intercal
  updateTimer();
  
}

function restart(){
  timeLeft = 5
  $("#startGame").show();
}