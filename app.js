// DOM access
const gameContainer = document.querySelector(".game");
// const score = document.querySelector(".game_infos .score");
const time = document.querySelector(".game_infos .time");
// Canva
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const objects = [];
const objectTypes = [
  { name: "pinata", point: 1, img: "/images/pinata.svg" },
  { name: "calavera", point: 5, img: "/images/pinata.svg" },
  { name: "cactus", point: -2, img: "/images/pinata.svg" },
];

// buttons
const startButton = document.getElementById("start");
const closeWelcomeModalBtn = document.getElementById(
  "btn_close_start_game_modal"
);

// event listeners
startButton.addEventListener("click", () => {
  console.log("startButton clicked!");
});
// close modal
closeWelcomeModalBtn.addEventListener("click", () => {
  document.getElementById("start_game_modal").style.display = "none";
});

// Score and timming

let score = 0;
let tempsRestant = 60;
let intervalId;

function startGame() {
  intervalId = setInterval(updateTemps, 1000);
}
function updateScore(point) {
  score += point;
  document.getElementById("score").textContent = score;
}

function updateTemps() {
  tempsRestant--;
  document.getElementById("temps").textContent = tempsRestant;

  if (tempsRestant == 0) {
    clearInterval(intervalId);
    //Fin de partie
  }
}

function randomPosition(max) {
  return Math.floor(Math.random() * max);
}
function createObject() {
  const typeRandom =
    objectTypes[Math.floor(Math.random() * objectTypes.length)];
  const w = "50px";
  const h = "50px";
  const object = {
    x: randomPosition(canvas.width - w),
    y: randomPosition(canvas.height - h),
    type: typeRandom,
    width: w,
    height: h,
    img: new Image(),
  };
  object.img.src = typeRandom.img;
  objects.push(object);
  console.log(object);
  drawObject(object);
}
// drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

function drawObject(object) {
  object.img.onload = () => {
    ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
  };
}
createObject();
