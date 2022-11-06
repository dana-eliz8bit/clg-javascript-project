// Header Show/Hide on Scroll
const body = document.body;

let lastScroll = 0;

window.addEventListener("scroll", () => {
  // console.log(window.pageYOffset);
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    body.classList.remove("scroll-up");
  }
  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
  }
  if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }
  lastScroll = currentScroll;
});

// PROJECT - NUMBER GUESSER

// Game Values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI Min & Max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for Guess
guessBtn.addEventListener("click", function () {
  // console.log(guessInput.value);
  let guess = parseInt(guessInput.value);
  console.log(guess);
  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }
  // Check Guess Result
  if (guess === winningNum) {
    // Game Over, Won
    // // Disable Input
    // guessInput.disabled = true;
    // // Change Border Color
    // guessInput.style.borderColor = "green";
    // // Set Win Message
    // setMessage(`${winningNum} is correct, YOU WIN!`, "green");
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // Wrong Number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game Over, Lost
      // // Disable Input
      // guessInput.disabled = true;
      // // Change Border Color
      // guessInput.style.borderColor = "red";
      // // Set Win Message
      // setMessage(
      //   `Game Over, you lost. The correct answer was ${winningNum}.`,
      //   "red"
      // );
      gameOver(false, `GAME OVER! The winner was ${winningNum}.`);
    } else {
      // Game Continues
      // Change Border Color
      guessInput.style.borderColor = "#2da5ff";
      // Clear Input
      guessInput.value = "";
      setMessage(`WRONG! ${guessesLeft} out of 3 guesses left!`);
    }
  }
});

// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "#4cb272") : (color = "#f1592c");
  // Disable Input
  guessInput.disabled = true;
  // Change Border Color
  guessInput.style.borderColor = color;
  // Change Text Color
  message.style.color = color;
  // Set Win Message
  setMessage(msg);
  // Play Again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Get Winning Number
function getRandomNum(min, max) {
  // console.log(Math.floor(Math.random() * (max - min + 1) + min));
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// PROJECT - HOVERBOARD

const container = document.getElementById("container-hoverboard");
const colors = ["#2da5ff", "#10e595", "#fcdc00", "#ec008c", "#000"];
const SQUARES = 100;

for (let i = 0; i < SQUARES; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.addEventListener("mouseover", () => setColor(square));
  square.addEventListener("mouseout", () => removeColor(square));
  container.appendChild(square);
}

function setColor(element) {
  // console.log(element);
  const color = getRandomColor();
  // console.log(color);
  element.style.background = color;
}

function removeColor(element) {
  // console.log("remove");
  element.style.background = "#fff";
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
