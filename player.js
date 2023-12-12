import { enemies } from "./enemy.js";

const player = {
  x: 475,
  y: 375,
  width: 50,
  height: 50,
  left: false,
  right: false,
  up: false,
  down: false,
  speed: 5,
  color: "blue",
  bullets: [],
  shot: false,
  rotation: 0,
  gunOffsetX: 25,
  gunOffsetY: -20,
};
let playerImg;

let mouseX = 0;
let mouseY = 0;

function drawPlayer(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //player Img
  playerImg = new Image();
  playerImg.src = "./pictures/Playerimg.png";

  const angle = Math.atan2(mouseY - player.y, mouseX - player.x);

  ctx.save();
  ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
  ctx.rotate(angle + 1.5 * Math.PI);
  ctx.drawImage(
    playerImg,
    -player.width / 2,
    -player.height / 2,
    player.width,
    player.height
  );
  ctx.restore();

  drawBullet(ctx);
}

function updateMousePosition(e) {
  mouseX = e.pageX - canvas.getBoundingClientRect().left;
  mouseY = e.pageY - canvas.getBoundingClientRect().top;
}

function updatePlayerPosition() {
  if (player.up && player.y > player.height / 2 - 25) player.y -= player.speed;
  if (player.down && player.y + player.height / 2 + 25 < canvas.height)
    player.y += player.speed;
  if (player.left && player.x > player.width / 2 - 25) player.x -= player.speed;
  if (player.right && player.x + player.width / 2 + 25 < canvas.width)
    player.x += player.speed;
}

function drawBullet(ctx) {
  player.bullets.forEach((bullet) => {
    // Justera varje kulas ritningsposition baserat på spelarobjektets rotation
    const rotatedBulletX =
      bullet.x * Math.cos(player.rotation) -
      bullet.y * Math.sin(player.rotation);
    const rotatedBulletY =
      bullet.x * Math.sin(player.rotation) +
      bullet.y * Math.cos(player.rotation);

    ctx.fillStyle = bullet.color;
    ctx.fillRect(rotatedBulletX, rotatedBulletY, bullet.width, bullet.height);
  });
}

/*
function drawBullet(ctx) {
  player.bullets.forEach((bullet) => {
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
}
*/

function shootbullet() {
  const bulletSpeed = 5;
  const bulletSize = 10;

  const offsetX = player.gunOffsetX;
  const offsetY = player.gunOffsetY;

  // Beräkna roterade offset-värden
  const rotatedOffsetX =
    offsetX * Math.cos(player.rotation) + offsetY * Math.sin(player.rotation);
  const rotatedOffsetY =
    offsetX * Math.sin(player.rotation) - offsetY * Math.cos(player.rotation);

  const bulletX = player.x + rotatedOffsetX;
  const bulletY = player.y + rotatedOffsetY;

  const newBullet = {
    x: bulletX,
    y: bulletY,
    direction: Math.atan2(mouseY - player.y, mouseX - player.x),
    speed: bulletSpeed,
    color: "green",
    width: bulletSize,
    height: bulletSize,
  };

  player.bullets.push(newBullet);
}

/*
function shootbullet() {
  const bulletSpeed = 5;
  const bulletSize = 10;

  const offsetX = 25;
  const offsetY = -20;

  const rotatedOffsetX =
    offsetX * Math.cos(player.rotation) - offsetY * Math.sin(player.rotation);
  const rotatedOffsetY =
    offsetX * Math.sin(player.rotation) + offsetY * Math.cos(player.rotation);

  const bulletX = player.x + rotatedOffsetX;
  const bulletY = player.y + rotatedOffsetY;

  const newBullet = {
    x: bulletX,
    y: bulletY,
    direction: Math.atan2(mouseY - player.y, mouseX - player.x),
    speed: bulletSpeed,
    color: "green",
    width: bulletSize,
    height: bulletSize,
  };

  player.bullets.push(newBullet);
}

*/

function updateBullets() {
  player.bullets.forEach((bullet) => {
    bullet.x += bullet.speed * Math.cos(bullet.direction);
    bullet.y += bullet.speed * Math.sin(bullet.direction);
  });

  player.bullets = player.bullets.filter(
    (bullet) =>
      bullet.x >= 0 &&
      bullet.x <= canvas.width &&
      bullet.y >= -25 &&
      bullet.y <= canvas.height
  );
}

export {
  player,
  drawPlayer,
  updateMousePosition,
  updatePlayerPosition,
  drawBullet,
  updateBullets,
  shootbullet,
};

/*
// I player.js eller liknande där du har din spelarinformation
const player = {
  x: 100,
  y: 200,
  width: 50,
  height: 50,
  gunOffsetX: 40, // Justera detta värde beroende på vapnets position och storlek
  gunOffsetY: 10, // Justera detta värde beroende på vapnets position och storlek
  gunDirection: "right", // Anta att spelaren börjar med vapnet riktat åt höger
};

// I bullet.js eller där du hanterar kulläget
function createBullet() {
  // Beräkna startpositionen baserat på vapnets riktning och offset
  let bulletX = player.x + player.gunOffsetX;
  let bulletY = player.y + player.gunOffsetY;

  // Skapa din kula med startpositionen
  const bullet = {
    x: bulletX,
    y: bulletY,
    // Övriga egenskaper för kulan...
  };

  // Lägg till kulan till din kullsarray eller hantera den på annat sätt
  bullets.push(bullet);
}*/
