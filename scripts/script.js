// prettier-ignore
import { player, drawPlayer, updatePlayerPosition, updateMousePosition, updateBullets, drawBullet } from "./player.js";
// prettier-ignore
import {keyPressed, keyReleased, mousePressed, mouseReleased } from "./movement.js";
// prettier-ignore
import { enemies,createEnemy, drawEnemy, enemyMovement, checkCollision } from "./enemy.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const Startmenu = document.getElementById("Startmenu");
const startKnapp = document.getElementById("startKnapp");

const gameOver = document.getElementById("game-over");
const restartBtn = document.getElementById("restart-btn");
const newGameBtn = document.getElementById("new-game-btn");

const normalButton = document.querySelector("#normal");
const hardButton = document.querySelector("#hard");
const extremeButton = document.querySelector("#extreme");
const playerNameField = document.querySelector("#player-name");

let normalLevel = false;
let hardLevel = false;
let extremeLevel = false;

normalButton.addEventListener("click", () => {
  if (normalLevel == false) {
    normalButton.classList.add("normal-level");
    hardButton.classList.remove("hard-level");
    extremeButton.classList.remove("extreme-level");
    normalLevel = true;
    hardLevel = false;
    extremeLevel = false;
  } else if (normalLevel) {
    normalButton.classList.remove("normal-level");
    normalLevel = false;
  }

  hardLevel = false;
  extremeLevel = false;
});

hardButton.addEventListener("click", () => {
  if (hardLevel == false) {
    normalButton.classList.remove("normal-level");
    hardButton.classList.add("hard-level");
    extremeButton.classList.remove("extreme-level");
    hardLevel = true;
    normalLevel = false;
    extremeLevel = false;
  } else if (hardLevel) {
    hardButton.classList.remove("hard-level");
    hardLevel = false;
  }

  normalLevel = false;
  extremeLevel = false;
});

extremeButton.addEventListener("click", () => {
  if (extremeLevel == false) {
    normalButton.classList.remove("normal-level");
    hardButton.classList.remove("hard-level");
    extremeButton.classList.add("extreme-level");
    extremeLevel = true;
    normalLevel = false;
    hardLevel = false;
  } else if (extremeLevel) {
    extremeButton.classList.remove("extreme-level");
    extremeLevel = false;
  }

  normalLevel = false;
  hardLevel = false;
});

let lastTime;

function startingScreen() {
  ctx.fillStyle = "green";
  ctx.font = "50px sans-serif";
  ctx.fillText("¡Zombie Hunter!", canvas.width / 3 - 15, 150);
  ctx.font = "28px times-new-roman";
  ctx.fillText(
    "Use arrows or wasd to move your character, use the mouse to aim and shoot zombies",
    25,
    250
  );

  startKnapp.addEventListener("click", () => {
    let playerName = playerNameField.value;

    if (playerName === "") {
      alert("You must choose a name!");
      return;
    } else {
      if (normalLevel == false && hardLevel == false && extremeLevel == false) {
        alert("Your must choose a difficulty");
        return;
      }
    }

    document.addEventListener("mousedown", mousePressed);
    document.addEventListener("mouseup", mouseReleased);
    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);

    Startmenu.style.display = "none";
    canvas.style.display = "block";

    if (normalLevel) {
      player.hp = 100;
    }
    if (hardLevel) {
      player.hp = 50;
    }
    if (extremeLevel) {
      player.hp = 10;
    }

    initGame();
    createEnemy(5);
  });
}

function gameOverMenu() {
  let playerName = playerNameField.value;
  document.removeEventListener("mousemove", updateMousePosition);
  document.removeEventListener("keydown", keyPressed);
  document.removeEventListener("keyup", keyReleased);
  document.removeEventListener("mousedown", mousePressed);
  document.removeEventListener("mouseup", mouseReleased);

  player.x = 475;
  player.y = 375;
  player.up = false;
  player.down = false;
  player.left = false;
  player.right = false;

  ctx.fillStyle = "green";

  ctx.fillText(
    "Game Over " + playerName + "!",
    canvas.width / 3,
    canvas.height / 3 - 130
  );
  ctx.fillText(
    "Your final score is: " + player.scoreValue + ".",
    canvas.width / 3,
    canvas.height / 3 - 100
  );
  ctx.fillText(
    "Press Restart Game to play again as " + playerName + ".",
    canvas.width / 3,
    canvas.height / 3 - 70
  );
  ctx.fillText(
    "Press New Game to start a new game",
    canvas.width / 3,
    canvas.height / 3 - 40
  );

  enemies.length = 0;
  player.bullets = [];
  gameOver.style.display = "flex";
  restartBtn.addEventListener("click", function () {
    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    document.addEventListener("mousedown", mousePressed);
    document.addEventListener("mouseup", mouseReleased);

    gameOver.style.display = "none";

    if (normalLevel) {
      player.hp = 100;
    }
    if (hardLevel) {
      player.hp = 50;
    }
    if (extremeLevel) {
      player.hp = 10;
    }
    player.scoreValue = 0;

    enemies.length = 0;

    createEnemy(5);
  });

  newGameBtn.addEventListener("click", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameOver.style.display = "none";

    Startmenu.style.display = "flex";

    if (normalLevel) {
      player.hp = 100;
    }
    if (hardLevel) {
      player.hp = 50;
    }
    if (extremeLevel) {
      player.hp = 10;
    }

    player.scoreValue = 0;
    playerNameField.value = "";
    enemies.length = 0;
    normalButton.classList.remove("normal-level");
    hardButton.classList.remove("hard-level");
    extremeButton.classList.remove("extreme-level");

    normalLevel = false;
    hardLevel = false;
    extremeLevel = false;

    startingScreen();
  });
}

function checkPoints() {
  for (const enemy of enemies) {
    if (player.scoreValue >= 5 && player.scoreValue < 10) {
      enemy.speed = 100;
    } else if (player.scoreValue >= 10 && player.scoreValue < 20) {
      enemy.speed = 200;
    } else if (player.scoreValue >= 20 && player.scoreValue < 30) {
      enemy.speed = 300;
    } else if (player.scoreValue >= 30 && player.scoreValue < 40) {
      enemy.speed = 350;
    } else if (player.scoreValue >= 40 && player.scoreValue < 50) {
      enemy.speed = 400;
    } else if (player.scoreValue >= 50 && player.scoreValue < 60) {
      enemy.speed = 450;
    } else if (player.scoreValue >= 60) {
      enemy.speed = 500;
    }
  }
}

function initGame() {
  let now = Date.now();
  let deltaTime = (now - lastTime) / 1000;
  lastTime = now;

  updatePlayerPosition(deltaTime);
  drawPlayer(ctx);
  drawEnemy(ctx);
  enemyMovement(deltaTime, ctx);
  checkCollision();
  checkPoints();
  drawBullet(ctx, deltaTime);
  updateBullets();

  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  initGame();
  if (player.hp === 0) {
    gameOverMenu();
    return;
  }
}
startingScreen();
