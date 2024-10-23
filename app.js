// DOM access
const gameContainer = document.querySelector(".game");
const time = document.querySelector(".game-infos .time");
const bestScore = document.querySelector(".best-score");
const endGameModal = document.getElementById("end_game_modal");

let currentBestScore = localStorage.getItem("best_score") || 0;

// Canvas
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

// buttons
const startButton = document.getElementById("start");
const easyBtn = document.getElementById("chiquito");
const mediumBtn = document.getElementById("valiente");
const hardBtn = document.getElementById("luchador");
const playAgainBtn = document.getElementById("play_again_btn");

// --- event listeners ---
startButton.addEventListener("click", () => {
	document.querySelector(".score").textContent = "Score : 0";
	console.log("startButton clicked!");
	startGame();
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
			// Confettis animation
			confetti({
				particleCount: 250,
				spread: 1000,
				origin: {
					x: e.clientX / window.innerWidth,
					y: e.clientY / window.innerHeight,
				},
			});

			// Sound effect
			let soundEffect = new Audio(obj.type.musique);
			soundEffect.play();
			updateScore(obj.type.point);

			// Suppression object
			objects.splice(i, 1);
			ctx.clearRect(obj.x, obj.y, obj.width, obj.height);
		}
	});
});

// close modal and play again
playAgainBtn.addEventListener("click", () => {
	// Reset game state
	score = 0;
	tempsRestant = 60;
	updateScore(score);
	updateTemps();

	// Hide the end game modal
	endGameModal.style.display = "none";

	// Re-enable game interactions
	// canvas.style.pointerEvents = "auto";

	// Start a new game
	startGame();
});

// difficulty levels
const difficultyLevels = {
	chiquito: {
		objectCount: 3,
		appearanceTime: 2000,
		musique: "musiques/Guadalajara.mp3",
	}, // Easy
	valiente: {
		objectCount: 5,
		appearanceTime: 1500,
		musique: "musiques/BandaEspuelaDeOro.mp3",
	}, // Intermediate
	luchador: {
		objectCount: 7,
		appearanceTime: 1000,
		musique: "musiques/Jarabes.mp3",
	}, // Difficult
};
// difficulty buttons
let currentDifficulty = "chiquito"; // Default to ¡Chiquito! difficulty
let intervalIdObject;

[easyBtn, mediumBtn, hardBtn].forEach((btn) => {
	btn.addEventListener("click", () => {
		currentDifficulty = btn.id;
		console.log(`Selected difficulty: ${currentDifficulty}`);
	});
});

// Score and timing
let score = 0;
let tempsRestant;
let intervalId;

function startGame() {
	tempsRestant = 60;
	clearInterval(intervalId);
	clearInterval(intervalIdObject);
	const { appearanceTime } = difficultyLevels[currentDifficulty];

	// Musica
	let audio = new Audio(difficultyLevels[currentDifficulty].musique);
	audio.play();
	audio.loop = true;

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
	document.querySelector(".time").textContent =
		"Temps : " + tempsRestant;

	if (tempsRestant === 0) {
		clearInterval(intervalId);
		clearInterval(intervalIdObject);

		if (
			currentBestScore === null ||
			parseInt(currentBestScore) < score
		) {
			currentBestScore = score;
			localStorage.setItem("best_score", currentBestScore);
		}

		bestScore.textContent = "Best score : " + currentBestScore;
		console.log(bestScore, score);

		endGame();
		score = 0; // Reset the score after showing the modal
		//Fin de partie
	}
}

function randomPosition(max, size) {
	return Math.floor(Math.random() * (max - size));
}

function createObject() {
	const typeRandom =
		objectTypes[Math.floor(Math.random() * objectTypes.length)];
	const w = 50;
	const h = 50;
	const object = {
		x: randomPosition(canvas.width - w, w),
		y: randomPosition(canvas.height - h, w),
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
			ctx.clearRect(object.x, object.y, object.width, object.height);
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
		ctx.drawImage(
			object.img,
			object.x,
			object.y,
			object.width,
			object.height
		);
	};
}

function spawnObjects() {
	const { objectCount } = difficultyLevels[currentDifficulty];
	for (let i = 0; i < objectCount; i++) {
		createObject();
	}
}

function endGame() {
	// Show the end game modal
	endGameModal.style.display = "flex";
	document.getElementById("final-score").textContent = score;
	document.getElementById("best-score-modal").textContent =
		currentBestScore;

	// Disable game interactions
	// canvas.style.pointerEvents = "none";
}
