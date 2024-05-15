let submitButton = document.querySelector("#subt");
let userInput = document.querySelector("#guessField");
let startOver = document.querySelector(".resultParas");
let guessSlot = document.querySelector(".guesses");
let lowOrHi = document.querySelector(".lowOrHi");
let remaningSlots = document.querySelector(".lastResult");
let alertError = document.querySelector(".alert");

let randomNumber = parseInt(Math.random() * 100 + 1);
console.log(randomNumber);
let p = document.createElement('p');

let isPlayable = true;
let numberGuess = 1;
let prevNumbers = [];

if(isPlayable){
  submitButton.addEventListener("click", function(e){
    e.preventDefault();
    let guess = parseInt(userInput.value);
    console.log(guess)
    validateNumber(guess);
  })
}

function validateNumber(guess){
  if( isNaN(guess) ){
    alertError.innerHTML = "Please enter valid number";
    alertError.style.display = "block";
  }else if( guess < 1 || guess > 100 ){
    alertError.innerHTML = "Please enter valid number between 1 - 100";
    alertError.style.display = "block";
  }else {
    alertError.innerHTML = "";
    alertError.style.display = "none";

    prevNumbers.push(guess);
    if( numberGuess === 11 || numberGuess === 0 ){
      displayGuess(guess);
      displayMessage(`Game Over. Randome number was ${randomNumber}`);
      endGame();
    }else{
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess){
  if( guess === randomNumber ){
    displayMessage(`WINNER WINNER CHICKEN DINNER. Number: ${randomNumber}`);
    endGame();
  }else if( guess < randomNumber ){
    displayMessage(`Number is TOOOO Low`);
  }else if( guess > randomNumber ){
    displayMessage(`Number is TOOOO High`);
  }
}

function displayGuess(guess){
  userInput.value = "";
  guessSlot.innerHTML = `${prevNumbers} `;
  numberGuess++;
  remaningSlots.innerHTML = `${ 11 - numberGuess }`;
}

function displayMessage(message){
  lowOrHi.innerHTML = `<h3>${message}</h3>`;
}

function endGame(){
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
  startOver.appendChild(p);
  isPlayable = false;
  startNewGame();
}

function startNewGame(){
  let startGame = document.querySelector("#newGame");
  startGame.addEventListener("click", function(e){
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevNumbers = [];
    numberGuess = 1;
    guessSlot.innerHTML = "";
    remaningSlots.innerHTML =  `${11 - numberGuess} `;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    isPlayable = true;
  })
}