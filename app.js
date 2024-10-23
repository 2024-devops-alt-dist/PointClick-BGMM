// DOM access
const gameContainer = document.querySelector(".game");
// const score = document.querySelector(".game_infos .score");
const time = document.querySelector(".game_infos .time");
// Canva
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const objects = [];
const objectTypes = [
  {
    name: "pinata",
    point: 1,
    img: "./images/pinata.png",
    musique: "/musiques/gun.mp3",
  },
  {
    name: "calavera",
    point: 5,
    img: "./images/calavera.png",
    musique: "/musiques/gun.mp3",
  },
  {
    name: "cactus",
    point: -2,
    img: "./images/cactus.png",
    musique: "/musiques/ouch.mp3",
  },
];
// Musica
let audio = new Audio("musiques/Jarabes.mp3");

// buttons
const startButton = document.getElementById("start");
const closeWelcomeModalBtn = document.getElementById(
  "btn_close_start_game_modal"
);

// event listeners
startButton.addEventListener("click", () => {
  console.log("startButton clicked!");
  audio.play();
  startGame();
});
// close modal
closeWelcomeModalBtn.addEventListener("click", () => {
  document.getElementById("start_game_modal").style.display = "none";
});

canvas.addEventListener("click", (e) => {
  console.log(e);

  const rect = canvas.getBoundingClientRect();
  const clientX = e.clientX - rect.left;
  const clientY = e.clientY - rect.top;

  objects.forEach((obj, i) => {
    if (
      clientX >= obj.x &&
      clientX <= obj.x + obj.width &&
      clientY >= obj.y &&
      clientY <= obj.y + obj.height
    ) {
      let soundEffect = new Audio(obj.type.musique);
      soundEffect.play();
      updateScore(obj.type.point);
      objects.splice(i, 1);
      ctx.clearRect(obj.x, obj.y, obj.width, obj.height);
    }
  });
});

// Score and timming

let score = 0;
let tempsRestant = 60;
let intervalId;

function startGame() {
  intervalId = setInterval(updateTemps, 1000);
  spawnObjects(5);
}
function updateScore(point) {
  score += point;
  document.querySelector(".score").textContent = score;
}

function updateTemps() {
  tempsRestant--;
  document.querySelector(".time").textContent = tempsRestant;

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
  const w = 50;
  const h = 50;
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
  drawObject(object);
}
// drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

function drawObject(object) {
  object.img.onload = () => {
    ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
  };
}
function spawnObjects(number) {
  objects.length = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < number; i++) {
    createObject();
  }
}
