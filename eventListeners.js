import { player } from "./player.js";

function keyPressed(e) {
  switch (e.key) {
    case "ArrowUp":
      player.up = true;
      break;
    case "ArrowDown":
      player.down = true;
      break;
    case "ArrowLeft":
      player.left = true;
      break;
    case "ArrowRight":
      player.right = true;
      break;
  }
}
function keyReleased(e) {
  switch (e.key) {
    case "ArrowUp":
      player.up = false;
      break;
    case "ArrowDown":
      player.down = false;
      break;
    case "ArrowLeft":
      player.left = false;
      break;
    case "ArrowRight":
      player.right = false;
      break;
  }
}

export { keyPressed, keyReleased };
