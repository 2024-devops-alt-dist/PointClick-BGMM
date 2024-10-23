// DOM access
const gameContainer = document.querySelector(".game");
// const score = document.querySelector(".game-infos .score");
const time = document.querySelector(".game-infos .time");
// Canva
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const objects = [];
const objectTypes = [
	{ name: "pinata", point: 1, img: "./images/pinata.png" },
	{ name: "calavera", point: 5, img: "./images/calavera.png" },
	{ name: "cactus", point: -2, img: "./images/cactus.png" },
];

// buttons
const startButton = document.getElementById("start");
const closeWelcomeModalBtn = document.getElementById(
	"btn_close_start_game_modal"
);
const easyBtn = document.getElementById("easy-btn");
const mediumBtn = document.getElementById("medium-btn");
const hardBtn = document.getElementById("hard-btn");

// --- event listeners ---
startButton.addEventListener("click", () => {
	console.log("startButton clicked!");
	spawnObjects(5);
	startGame();
});
// close modal
closeWelcomeModalBtn.addEventListener("click", () => {
	document.getElementById("start_game_modal").style.display = "none";
});
// difficulty buttons
[easyBtn, mediumBtn, hardBtn].forEach((btn) => {
	btn.addEventListener("click", () => {
		currentDifficulty = btn.id.split("-")[0];
		console.log(`Selected difficulty: ${currentDifficulty}`);
	});
});

// difficulty levels
const difficultyLevels = {
	chiquito: { objectCount: 3, appearanceTime: 2000 }, // Easy
	valiente: { objectCount: 5, appearanceTime: 1500 }, // Intermediate
	luchador: { objectCount: 7, appearanceTime: 1000 }, // Difficult
};

let currentDifficulty = "chiquito"; // Default to ¡Chiquito! difficulty

// Score and timing
let score = 0;
let tempsRestant = 60;
let intervalId;
let objectIntervalId; // Interval for spawning objects

// Boris's
function startGame() {
	score = 0; // Reset score
	tempsRestant = 60; // Reset timer
	document.querySelector(".score").textContent = score;
	document.querySelector(".time").textContent = tempsRestant;

	objects.length = 0;
	createObjects();

	intervalId = setInterval(() => {
		// Remove existing objects
		objects.forEach((object, index) => {
			ctx.clearRect(object.x, object.y, object.width, object.height);
			objects.splice(index, 1);
		});

		// Create new objects
		createObjects();
	}, difficultyLevels[currentDifficulty].appearanceTime);
}

function endGame() {
	clearInterval(intervalId);
}

// Mounir's
function startGame() {
	// intervalId = setInterval(updateTemps, 1000);
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

// generate objects based on the current difficulty level
function createObjects() {
	const { objectCount } = difficultyLevels[currentDifficulty];
	for (let i = 0; i < objectCount; i++) {
		createObject();
	}
}

function drawObject(object) {
	object.img.onload = () => {
		ctx.drawImage(
			object.img,
			object.x,
			object.y,
			object.width,
			object.height
		);
	};
}
function spawnObjects(number) {
	objects.length = 0;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < number; i++) {
		createObject();
	}
}
