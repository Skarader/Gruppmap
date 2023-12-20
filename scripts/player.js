const player = {
  x: 475,
  y: 375,
  width: 40,
  height: 40,
  left: false,
  right: false,
  up: false,
  down: false,
  speed: 500,
  hp: 10,
  scoreValue: 0,
  bullets: [],
  shot: false,
  rotation: 0,
  gunOffsetX: 25,
  gunOffsetY: 6,
};
let playerImg;

let mouseX = 0;
let mouseY = 0;

function drawPlayer(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  playerImg = new Image();
  playerImg.src = "./pictures/Playerimg.png";

  const angle = Math.atan2(mouseY - player.y, mouseX - player.x);
  player.rotation = angle;

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

  {
    let x = player.x + player.width / 2;
    let y = player.y + player.height / 2;

    const offsetX = player.gunOffsetX;
    const offsetY = player.gunOffsetY;

    const rotatedOffsetX =
      offsetX * Math.cos(player.rotation) - offsetY * Math.sin(player.rotation);
    const rotatedOffsetY =
      offsetX * Math.sin(player.rotation) + offsetY * Math.cos(player.rotation);

    const bulletX = x + rotatedOffsetX;
    const bulletY = y + rotatedOffsetY;
    ctx.font = "30px serif";

    ctx.beginPath();

    ctx.fill();
    ctx.closePath();
  }
}

function updateMousePosition(e) {
  mouseX = e.pageX - canvas.getBoundingClientRect().left;
  mouseY = e.pageY - canvas.getBoundingClientRect().top;
}

function updatePlayerPosition(deltaTime) {
  if (player.up && player.y > player.height / 2 - 20)
    player.y -= player.speed * deltaTime;
  if (player.down && player.y + player.height / 2 + 20 < canvas.height)
    player.y += player.speed * deltaTime;
  if (player.left && player.x > player.width / 2 - 20)
    player.x -= player.speed * deltaTime;
  if (player.right && player.x + player.width / 2 + 20 < canvas.width)
    player.x += player.speed * deltaTime;
}

function drawBullet(ctx, deltaTime) {
  player.bullets.forEach((bullet) => {
    const directionX = mouseX - player.x;
    const directionY = mouseY - player.y;
    const distance = Math.sqrt(
      directionX * directionX + directionY * directionY
    );

    const normalizedDirectionX = directionX / distance;
    const normalizedDirectionY = directionY / distance;

    bullet.x += normalizedDirectionX * bullet.speed * deltaTime;
    bullet.y += normalizedDirectionY * bullet.speed * deltaTime;

    ctx.fillStyle = "red";
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
}

function shootbullet() {
  const bulletSpeed = 5;
  const bulletSize = 5;

  let x = player.x + player.width / 2;
  let y = player.y + player.height / 2;

  const offsetX = player.gunOffsetX;
  const offsetY = player.gunOffsetY;

  const rotatedOffsetX =
    offsetX * Math.cos(player.rotation) - offsetY * Math.sin(player.rotation);
  const rotatedOffsetY =
    offsetX * Math.sin(player.rotation) + offsetY * Math.cos(player.rotation);

  const bulletX = x + rotatedOffsetX;
  const bulletY = y + rotatedOffsetY;

  const newBullet = {
    x: bulletX,
    y: bulletY,

    direction: player.rotation,
    speed: bulletSpeed,
    color: "black",
    width: bulletSize,
    height: bulletSize,
  };

  player.bullets.push(newBullet);
}

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
