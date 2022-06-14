let myRand;
let liv;

window.addEventListener("load", sidenVises);
function sidenVises() {
  console.log("sidenVises");
  document.querySelector("#start_knap").addEventListener("click", startSpil);

  document
    .querySelector("#spil_igen_knap")
    .addEventListener("click", startSpil);
}

function startSpil() {
  console.log("startSpil");
  document.querySelector("#start_screen").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#game").classList.remove("hide");
  points = 0;
  document.querySelector("#score").textContent = points;

  liv = 3;
  document.querySelector("#liv1").classList.remove("gray");
  document.querySelector("#liv2").classList.remove("gray");
  document.querySelector("#liv3").classList.remove("gray");

  //Starter de to timer-animationer sky1 & sky2)
  document.querySelector("#timer_inside").classList.add("timer");

  // når timeranimationen(erne) er færdige kaldes funktionen stopSpillet()
  document
    .querySelector("#timer_inside")
    .addEventListener("animationend", stopSpillet);

  //Det giver et random tal mellem 1-3 - skyerne kommer ned forskudt//
  myRand = Math.floor(Math.random() * 3) + 1;

  //Tilføj klasses til sky1 og Eventlistener
  document.querySelector("#sky1_container").classList.add("delay" + myRand);
  document.querySelector("#sky1_container").classList.add("fald_animation");
  document
    .querySelector("#sky1_container")
    .addEventListener("mousedown", forsvindEgg1);

  //Det giver et random tal mellem 1-3 - Skyerne kommer ned forskudt//
  myRand = Math.floor(Math.random() * 3) + 1;

  //Tilføj klasses til sky1 og Eventlistener
  document.querySelector("#sky2_container").classList.add("delay" + myRand);
  document.querySelector("#sky2_container").classList.add("fald2_animation");
  document
    .querySelector("#sky2_container")
    .addEventListener("mousedown", forsvindEgg2);
}

// sky1 fryser der hvor man fanger den og derefter forsvinder//
function forsvindEgg1() {
  //Log funktion
  console.log("clickEgg1");

  //Tilføj frys og forsvind til egg1
  document.querySelector("#sky1_container").classList.add("frys");
  document.querySelector("#sky1_sprite").classList.add("forsvind");

  //Tilføj listener til animationen er slut og reset skal starte.
  document
    .querySelector("#sky1_container")
    .addEventListener("animationend", resetEgg1);

  points++;
  document.querySelector("#score").textContent = points;

  //Afspil lyd ved klik
  document.querySelector("#sky1_container").addEventListener("click", goodlyd);
}

// egg1 reset
function resetEgg1() {
  //Log funktion
  console.log("resetEgg1");

  //Fjerner alle klasser fra egg1_container + sprite
  document.querySelector("#sky1_container").classList = "";
  document.querySelector("#sky1_sprite").classList = "";
  document.querySelector("#sky1_container").offsetLeft;

  //Definerer ny myRand
  myRand = Math.floor(Math.random() * 3) + 1;
  document.querySelector("#sky1_container").classList.add("delay" + myRand);
  document.querySelector("#sky1_container").classList.add("fald_animation");
}

function forsvindEgg2() {
  //Log funktion
  console.log("forsvindEgg2");

  //Tilføj frys og forsvind til sky2
  document.querySelector("#sky2_container").classList.add("frys");
  document.querySelector("#sky2_sprite").classList.add("forsvind");

  console.log(liv);
  document.querySelector("#liv" + liv).classList.add("gray");
  liv--;

  //Tilføj listener til animationen er slut og reset skal starte.
  document
    .querySelector("#sky2_container")
    .addEventListener("animationend", resetEgg2);

  //Afspil lyd ved klik
  document.querySelector("#sky2_container").addEventListener("click", badlyd);

  points--;
  document.querySelector("#score").textContent = points;

  if (liv <= 0) {
    stopSpillet();
  }
}

// Egg2 reset
function resetEgg2() {
  //Log funktion
  console.log("resetEgg2");

  //Fjerner alle klasser fra egg1_container + sprite
  document.querySelector("#sky2_container").classList = "";
  document.querySelector("#sky2_sprite").classList = "";
  document.querySelector("#sky2_container").offsetLeft;

  //Definerer ny myRand
  myRand = Math.floor(Math.random() * 3) + 1;
  document.querySelector("#sky2_container").classList.add("delay" + myRand);
  document.querySelector("#sky2_container").classList.add("fald_animation");
}

function stopSpillet() {
  console.log("stopSpillet");
  document.querySelector("#sky1_container").classList = "";
  document.querySelector("#sky1_sprite").classList = "";
  document.querySelector("#sky2_sprite").classList = "";
  document.querySelector("#sky2_container").classList = "";
  document.querySelector("#timer_inside").classList = "";

  if (points > 3) {
    spilVundet();
  } else {
    spilTabt();
  }
  document.querySelector("#game").classList.add("hide");
}

function spilVundet() {
  document.querySelector("#game_over").classList = "spil_vundet";
}

function spilTabt() {
  document.querySelector("#game_over").classList = "spil_tabt";
}

function goodlyd() {
  var audio = document.getElementById("goodSound");
  audio.play();
}

function badlyd() {
  var audio = document.getElementById("badSound");
  audio.play();
}
