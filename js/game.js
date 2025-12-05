import { Character } from "./character.js";
import { Platform } from "./platform.js";

let canvasWidth = 400;
let canvasHeight = 600;
let player;
let platform1;
let platform2;
let platforms = [];
let gameState = "start";

player = new Character(200, 500, 50, 50);
platform1 = new Platform(50, 300, 100, 20);
platform2 = new Platform(200, 200, 100, 20);

function generateInitialPlatforms() {
  let initialCount = 10;
  let spacing = canvasHeight / initialCount;
  platforms = [];

  for (let i = 0; i < initialCount; i++) {
    let y = canvasHeight - (i * spacing);
    let x = Math.floor(random(50, canvasWidth - 150));

    if (i === 0) {
      y = canvasHeight - 20;
    }

    platforms.push(new Platform(x, Math.floor(y), 100, 20));
  }
}


function setup() {
  // Optional: add more platforms dynamically if needed
  createCanvas(canvasWidth, canvasHeight);

  generateInitialPlatforms();
}

console.log(platforms);

function draw() {
  background(135, 206, 235); // sky blue

  // Apply gravity
  player.applyGravity(1);
  player.y += player.vy;

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
  
  for (let p of platforms) {
  p.draw();

  if (
    player.vy > 0 &&
    player.x + player.w > p.x &&
    player.x < p.x + p.w &&
    player.y + player.h > p.y &&
    player.y + player.h < p.y + player.vy
  ) {
    player.vy = -20;
  }
}

  if (player.y < 200) {
  let scrollSpeed = 200 - player.y;
    player.y = 200;

    let tempHighestY =Infinity;
    for (let p of platforms) {
      if (p.y < tempHighestY) {
        tempHighestY = p.y;
      }
    }

    for (let p of platforms) {
      p.y += scrollSpeed;

      if (p.y > canvasHeight) {
        p.y = tempHighestY - 100;
        p.x = Math.floor(random(50, canvasWidth - 150));
      }
    }
  }
  
  // Draw player
  player.draw();
} 
  