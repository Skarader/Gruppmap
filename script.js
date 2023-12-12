// prettier-ignore
import { drawPlayer, updatePlayerPosition, updateMousePosition, drawBullet, updateBullets, } from "./player.js";
import {
  keyPressed,
  keyReleased,
  mousePressed,
  mouseReleased,
} from "./eventListeners.js";
//prettier-ignore
import { createEnemy, drawEnemy, enemyMovement, checkCollision, } from "./enemy.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let lastTime;

document.addEventListener("mousedown", mousePressed);
document.addEventListener("mouseup", mouseReleased);
document.addEventListener("mousemove", updateMousePosition);
document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);

function gameLoop() {
  let now = Date.now();
  let deltaTime = (now - lastTime) / 1000;
  lastTime = now;

  updatePlayerPosition(ctx);
  drawPlayer(ctx);
  drawEnemy(ctx);
  enemyMovement(deltaTime);
  checkCollision();
  updateBullets();
  drawBullet(ctx);
  requestAnimationFrame(gameLoop);
}

gameLoop();
createEnemy(5);
