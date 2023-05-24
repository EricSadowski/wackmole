
mole1.addEventListener("click", wack);
var count = 0;
var disp = document.getElementById("display");


function wack(){
    count++;
    disp.innerHTML = count;
    document.getElementById("mole1").style.display = "none";
    document.getElementById("mole1").disabled = true;
    setTimeout(ohHiMole, (1000 + randomInt()));
    
}

function ohHiMole(){
    document.getElementById("mole1").style.display = "block";
    document.getElementById("mole1").disabled = false;
    setTimeout(ohByeMole, (200 + randomSpazz()));
}

function ohByeMole(){
    document.getElementById("mole1").style.display = "none";
    document.getElementById("mole1").disabled = true;
    setTimeout(ohHiMole, (1000 + randomInt()));
}


function randomInt() { 
    return Math.floor(Math.random() * (1000 - 1 + 1) + 1)
  }

  function randomSpazz() { 
    return Math.floor(Math.random() * (700 - 1 + 1) + 1)
  }