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
};

let mouseX = 0;
let mouseY = 0;

function drawPlayer(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const angle = Math.atan2(mouseX - player.x, -(mouseY - player.y));

  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(angle);
  ctx.fillStyle = player.color;
  ctx.fillRect(
    -player.width / 2,
    -player.height / 2,
    player.width,
    player.height
  );
  ctx.restore();
}

function updateMousePosition(e) {
  mouseX = e.pageX - canvas.getBoundingClientRect().left;
  mouseY = e.pageY - canvas.getBoundingClientRect().top;
}

function updatePlayerPosition() {
  if (player.up && player.y > player.height / 2) player.y -= player.speed;
  if (player.down && player.y + player.height / 2 < canvas.height)
    player.y += player.speed;
  if (player.left && player.x > player.width / 2) player.x -= player.speed;
  if (player.right && player.x + player.width / 2 < canvas.width)
    player.x += player.speed;
}

export { player, drawPlayer, updateMousePosition, updatePlayerPosition };
