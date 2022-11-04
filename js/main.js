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

// Project - Hoverboard

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
