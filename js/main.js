// HEADER

// Show/Hide on Scroll
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

// PROJECTS

// GUESS THE NUMBER

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

// Assign UI Min and Max
minNum.textContent = min;
maxNum.textContent = max;

// Event Listener - Play Again
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Event Listener - Guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);
  // Validate <-- THIS ISN'T WORKING, FIX!!
  // if (isNaN(guess) || guess < min || guess > max) {
  //   setMessage(`Enter a number between ${min} and ${max}!`, "#f1592c");
  // }
  // Check for Win Condition
  if (guess === winningNum) {
    // Game Over - Win
    gameOver(true, `WINNER! ${winningNum} is correct!`);
  } else {
    // Wrong Number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game Over - Loss
      gameOver(false, `GAME OVER! It was ${winningNum}!`);
    } else {
      // Game Continues - Wrong Number
      // Change Border Color
      guessInput.style.borderColor = "#f1592c";
      // Clear Input
      guessInput.value = "";
      // Message
      setMessage(`OOPS! ${guessesLeft} of 3 guesses left!`, "#f1592c");
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
  // Set Text Color
  message.style.color = color;
  // Set Message
  setMessage(msg);
  // Play Again?
  guessBtn.value = "Again!";
  guessBtn.className += "play-again";
}

// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// HOVER BOARD

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

// NASA APOD

const url = "https://api.nasa.gov/planetary/apod?api_key=";
const api_key = "CNOb6SdeTtzvRxM5yySNjWSNgcGUatPkmMPZagnB";

const fetchNASAData = async () => {
  try {
    const response = await fetch(`${url}${api_key}`);
    const data = await response.json();
    console.log("NASA APOD data", data);
    displayData(data);
  } catch (error) {
    console.log(error);
  }
};

const displayData = (data) => {
  document.getElementById("apod-title").textContent = data.title;
  document.getElementById("apod-date").textContent = data.date;
  document.getElementById("apod-picture").src = data.hdurl;
  document.getElementById("apod-explanation").textContent = data.explanation;
};

fetchNASAData();

// BOOK LIST

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td class="hidden">${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
    `;
    list.appendChild(row);
  }
  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container-book-list");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function (book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event Listener - Add Book
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();
  console.log(ui);

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("All fields required!", "error");
  } else {
    ui.addBookToList(book);
    Store.addBook(book);
    ui.showAlert("Book Added!", "success");
    ui.clearFields();
  }
  e.preventDefault();
});

// Event Listener for Delete
document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert("Book Removed!", "success");
  e.preventDefault();
});
