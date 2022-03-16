console.log("Hangman Game");

// global variables for each of the screens
const preGameView = document.querySelector("#preGame");
const inGameView = document.querySelector("#inGame");
const postGameView = document.querySelector("#postGame");

// global variables for each of the buttons
const startGameBtn = document.querySelector("#startGameButton");
const restartGameBtn = document.querySelector("#restartGameButton");
const returnToStartBtn = document.querySelector("#returnToStartButton");
const wrongGuessBtn = document.querySelector("#wrongGuessButton");

//global variables for handled elements
let inGameTimeSpan = document.querySelector("#inGameTime");

//global variables for parameters used in multiple functions
let timeLeft;
let gameTimer;

// function to load the preGame screen (used for initial load, and future renders of preGame screen)
function init() {
  preGameView.setAttribute("class", "visible");
  inGameView.setAttribute("class", "hidden");
  postGameView.setAttribute("class", "hidden");
}

// function to display the inGame screen
function displayInGame() {
  console.log("game started");
  preGameView.setAttribute("class", "hidden");
  inGameView.setAttribute("class", "visible");
  postGameView.setAttribute("class", "hidden");
}

// function to display the postGame screen
function endGame() {
  preGameView.setAttribute("class", "hidden");
  inGameView.setAttribute("class", "hidden");
  postGameView.setAttribute("class", "visible");
}

// function to start the game timer.  This function reinitilizes the timer and displays it on the screen.  It does this prior to the setInterval firing, because it would otherwise wait one second before displaying / executing once.  It ends when the time is <=0.
function startTimer() {
  console.log("timer started");
  timeLeft = 10;
  inGameTimeSpan.textContent = timeLeft;
  gameTimer = setInterval(function () {
    console.log(timeLeft);
    timeLeft--;
    inGameTimeSpan.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(gameTimer);
      endGame();
    }
  }, 1000);
}

// this function reduces the time left by 5 seconds.  It also displays the new timeLeft on the screen.  This has immediate feedback, outside of the setInterval
function reduceTime() {
  timeLeft -= 5;
  inGameTimeSpan.textContent = timeLeft;
}

// adds event listeners to buttons
// startGame changes the display to the inGame screen and runs the startTimer function
startGameBtn.addEventListener("click", function () {
  displayInGame();
  startTimer();
});

// startGame changes the display to the inGame screen and runs the startTimer function
restartGameBtn.addEventListener("click", function () {
  displayInGame();
  startTimer();
});

// startGame changes the display to the preGame screen
returnToStartBtn.addEventListener("click", function () {
  init();
});

// runs the reduceTime function, and then checks to see if the time is <=0.  if it is it ends the game timer outside fo the setInterval, and runs the endGame function
wrongGuessBtn.addEventListener("click", function () {
  reduceTime();
  if (timeLeft <= 0) {
    clearInterval(gameTimer);
    endGame();
  }
});

// initializes the application
init();
