import { player } from "./player.js";

let enemies = [];

function createEnemy(amount) {
  for (let i = 0; i < amount; i++) {
    let xPosition;
    if (Math.random() < 0.5) {
      // Random x outside the canvas horizontally
      xPosition = Math.random() < 0.5 ? -50 : 1050;
    } else {
      // Random x inside the canvas horizontally
      xPosition = Math.random() * canvas.width;
    }

    // Generate random y position
    let yPosition;
    if (xPosition > -50 && xPosition < 1050) {
      // Random y outside the canvas vertically
      yPosition = Math.random() < 0.5 ? -50 : 850;
    } else {
      // Random y inside the canvas vertically
      yPosition = Math.random() * (canvas.height - 50);
    }

    const newEnemy = {
      x: xPosition,
      y: yPosition,
      width: 30,
      height: 30,
      speed: 400,
      color: "red",
    };
    enemies.push(newEnemy);
  }
}

function drawEnemy(ctx) {
  for (const enemy of enemies) {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  }
}

function enemyMovement(deltaTime) {
  for (const enemy of enemies) {
    let directionX = player.x - enemy.x;
    let directionY = player.y - enemy.y;
    let distance = Math.sqrt(directionX * directionX + directionY * directionY);

    if (distance <= 30) {
      directionX /= distance;
      directionY /= distance;

      enemy.x += directionX * enemy.speed * deltaTime;
      enemy.y += directionY * enemy.speed * deltaTime;
    }
  }
}

function checkCollision() {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];

    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      enemies.splice(i, 1);

      createEnemy(1);
    }

    for (let j = 0; j < enemies.length; j++) {
      const enemy2 = enemies[j];

      if (
        enemy.x < enemy2.x + enemy2.width &&
        enemy.x + enemy.width > enemy2.x &&
        enemy.y < enemy2.y + enemy2.height &&
        enemy.y + enemy.height > enemy2.y
      ) {
        resolveEnemyOverlap(enemy, enemy2);
      }
    }
  }
}

function resolveEnemyOverlap(enemy, enemy2) {
  const overlapX = Math.max(
    0,
    Math.min(enemy.x + enemy.width, enemy2.x + enemy2.width) -
      Math.max(enemy.x, enemy2.x)
  );
  const overlapY = Math.max(
    0,
    Math.min(enemy.y + enemy.height, enemy2.y + enemy2.height) -
      Math.max(enemy.y, enemy2.y)
  );

  if (overlapX < overlapY) {
    const moveBy = overlapX / 2;
    enemy.x -= moveBy;
    enemy2.x += moveBy;
  } else {
    const moveBy = overlapY / 2;
    enemy.y -= moveBy;
    enemy2.y += moveBy;
  }
}

export {
  createEnemy,
  drawEnemy,
  enemyMovement,
  checkCollision,
  resolveEnemyOverlap,
};
