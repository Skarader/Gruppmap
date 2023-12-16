// prettier-ignore
import { player, drawPlayer, updatePlayerPosition, updateMousePosition, updateBullets, } from "./player.js";
// prettier-ignore
import {keyPressed, keyReleased, mousePressed, mouseReleased,} from "./eventListeners.js";
//prettier-ignore
import { enemies,createEnemy, drawEnemy, enemyMovement, checkCollision} from "./enemy.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gameOver = document.getElementById("game-over");
const restartBtn = document.getElementById("restart-btn");

let lastTime;

function startingscreen() {
  ctx.fillStyle = "green";
  ctx.font = "50px sans-serif";
  ctx.fillText("¡Zombie Hunter!", canvas.width / 3 - 15, 150);
  ctx.font = "28px times-new-roman";
  ctx.fillText(
    "Use arrows or wasd to move your character, use the mouse to aim and shoot zombies",
    25,
    250
  );

  document.addEventListener("DOMContentLoaded", function () {
    const Startmenu = document.getElementById("Startmenu");
    const startKnapp = document.getElementById("startKnapp");
    startKnapp.addEventListener("click", () => {
      document.addEventListener("mousedown", mousePressed);
      document.addEventListener("mouseup", mouseReleased);
      document.addEventListener("mousemove", updateMousePosition);
      document.addEventListener("keydown", keyPressed);
      document.addEventListener("keyup", keyReleased);

      Startmenu.style.display = "none";
      canvas.style.display = "block";
      gameLoop();
      createEnemy(5);
    });
  });
}

function gameOverMenu() {
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

  ctx.fillText(
    "Game Over! You scored " +
      player.scoreValue +
      " points! Press Restart to play again!",
    canvas.width / 4 - 110,
    canvas.height / 2 - 50
  );

  enemies.length = 0;
  gameOver.style.display = "flex";
  restartBtn.addEventListener("click", function () {
    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    document.addEventListener("mousedown", mousePressed);
    document.addEventListener("mouseup", mouseReleased);

    gameOver.style.display = "none";

    player.hp = 100;
    player.scoreValue = 0;

    enemies.length = 0;
    createEnemy(5);
  });
}

function gameLoop() {
  let now = Date.now();
  let deltaTime = (now - lastTime) / 1000;
  lastTime = now;
  updatePlayerPosition(ctx);
  drawPlayer(ctx);
  drawEnemy(ctx);
  enemyMovement(deltaTime, ctx);
  checkCollision();
  updateBullets();

  if (player.hp === 0) {
    gameOverMenu();
  }

  requestAnimationFrame(gameLoop);
}
startingscreen();
