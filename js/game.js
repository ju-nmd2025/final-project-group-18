import { Character } from "./character.js";
import { Platform } from "./platform.js";

let canvasWidth = 400;
let canvasHeight = 600;
let player;
let platforms = [];
let gameState = "start";

player = new Character(200, 500, 50, 50);

function generateInitialPlatforms() {
  let initialCount = 10;
  let spacing = canvasHeight / initialCount;
  platforms = [];

  for (let i = 0; i < initialCount; i++) {
    let y = canvasHeight - i * spacing;
    let w = Math.floor(random(60, 120));
    let x = Math.floor(random(20, canvasWidth - w - 20));

    let shouldMove = random() < 0.2;
    let maxDistance = random(80, 150);

    let isBreakable = false; // Reset for every new platform
    let chance = random();
    if (i > 0 && chance < 0.15) {
      // i > 0 ensures the starting platform isn't breakable
      // 0.15 (15%) is your current chance for breakable platforms
      isBreakable = true;
    }

    if (i === 0) {
      y = canvasHeight - 20;
      w = 400;
      x = canvasWidth / 2 - w / 2;
      shouldMove = false;
      isBreakable = false;
    }

    platforms.push(
      new Platform(
        x,
        Math.floor(y),
        w,
        20,
        shouldMove,
        maxDistance,
        undefined,
        isBreakable
      )
    );
  }
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  generateInitialPlatforms();
  //frameRate();
}

window.setup = setup;

function showStartScreen() {
  background(255, 105, 180);
  textAlign(CENTER, CENTER);
  textSize(40);
  fill(255);
  fill(255, 255, 0);
  text("Sun Jump", canvasWidth / 2, 200);
  text("START!", canvasWidth / 2, 300);
}

function mousePressed() {
  if (gameState === "start" || gameState === "gameOver") {
    resetGame();
    gameState = "game";
  }
}

function showGameOverScreen() {
  background(255, 165, 0);
  textAlign(CENTER, CENTER);
  textSize(40);
  fill(255, 0, 0);
  text("GAME OVER", canvasWidth / 2, 250);

  textSize(20);
  fill(255);
  text("Click to restart", canvasWidth / 2, 300);
}

function resetGame() {
  player.x = 200;
  player.y = canvasHeight - 70;
  player.vy = 0;

  generateInitialPlatforms();
}

function draw() {
  if (gameState === "start") {
    //draw startscreen
    showStartScreen();
    return;
  }

  if (gameState === "gameOver") {
    showGameOverScreen();
    console.log(player.vy);
    return;
  }

  background(135, 206, 235); // sky blue

  // Apply gravity
  player.applyGravity(2);
  player.y += player.vy;

  // // // Check collision
  for (let p of platforms) {
    p.update();
    player.checkCollision(p);
    p.draw();
  }

  if (keyIsDown(LEFT_ARROW)) {
    player.x -= 10; //////move left
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.x += 10; /////move right
  }

  if (player.x + player.w < 0) {
    player.x = canvasWidth;
  } else if (player.x > canvasWidth) {
    player.x = -player.w;
  }

  if (player.y < 200) {
    let scrollSpeed = 200 - player.y;
    player.y = 200;

    platforms = platforms.filter((p) => !p.isBroken);
    // This removes them from the array completely.

    let tempHighestY = Infinity;
    for (let p of platforms) {
      p.y += scrollSpeed;
      if (p.y < tempHighestY) {
        tempHighestY = p.y;
      }
    }

    for (let p of platforms) {
      if (p.y > canvasHeight) {
        let newGap = random(80, 120);
        p.y = tempHighestY - newGap;

        let w = Math.floor(random(60, 120));
        p.w = w;

        let shouldMove = random() < 0.2;
        let maxDistance = random(80, 150);
        let newIsBreakable = random() < 0.15;

        p.x = Math.floor(random(20, canvasWidth - w - 20));
        p.isMoving = shouldMove;
        p.initialX = p.x; // Set the anchor point for the new x-position
        p.maxMoveX = maxDistance;
        p.direction = Math.random() < 0.5 ? -1 : 1;
        p.isBreakable = newIsBreakable;
        p.isBroken = false;

        tempHighestY = p.y;
      }
    }
  }

  if (player.y > canvasHeight) {
    gameState = "gameOver";
  }

  for (let p of platforms) {
    p.draw();
  }

  // Draw player
  player.draw();
}
window.draw = draw;

window.addEventListener("click", function (event) {
  mousePressed();
});
