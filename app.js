// DOM access
const gameContainer = document.querySelector(".game");
const time = document.querySelector(".game-infos .time");
const bestScore = document.querySelector(".best-score");
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
const easyBtn = document.getElementById("chiquito");
const mediumBtn = document.getElementById("valiente");
const hardBtn = document.getElementById("luchador");

// --- event listeners ---
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
// difficulty buttons
[easyBtn, mediumBtn, hardBtn].forEach((btn) => {
  btn.addEventListener("click", () => {
    currentDifficulty = btn.id;

    console.log(`Selected difficulty: ${currentDifficulty}`);
  });
});

// difficulty levels
const difficultyLevels = {
  chiquito: { objectCount: 3, appearanceTime: 2000 }, // Easy
  valiente: { objectCount: 5, appearanceTime: 1500 }, // Intermediate
  luchador: { objectCount: 7, appearanceTime: 1000 }, // Difficult
};
// difficulty buttons
let currentDifficulty = "chiquito"; // Default to ¡Chiquito! difficulty
let intervalIdObject;

[easyBtn, mediumBtn, hardBtn].forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(btn);

    currentDifficulty = btn.id.split("-")[0];
    console.log(`Selected difficulty: ${currentDifficulty}`);
  });
});

// --- event listeners ---
startButton.addEventListener("click", () => {
  console.log("startButton clicked!");
  startGame();
});

// Score and timing
let score = 0;
let tempsRestant = 60;
let intervalId;

function startGame() {
  clearInterval(intervalId);
  clearInterval(intervalIdObject);
  let difficulty = difficultyLevels[currentDifficulty];
  if (!difficulty) {
    console.error("error", difficulty);
    return;
  }
  const { appearanceTime } = difficulty;
  console.log(difficulty);

  intervalId = setInterval(updateTemps, 1000);
  spawnObjects();
  intervalIdObject = setInterval(spawnObjects, appearanceTime);
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
    clearInterval(intervalIdObject);
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

  setTimeout(() => {
    const i = objects.indexOf(object);
    if (i > -1) {
      objects.splice(i, 1);
    }
  }, 3000);
}

// generate objects based on the current difficulty level
function createObjects() {
  const { objectCount } = difficultyLevels[currentDifficulty];
  objects.length = 0;
  for (let i = 0; i < objectCount; i++) {
    createObject();
  }
}

function drawObject(object) {
  object.img.onload = () => {
    ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
  };
}

function spawnObjects() {
  const { objectCount } = difficultyLevels[currentDifficulty];
  objects.length = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < objectCount; i++) {
    createObject();
  }
}
