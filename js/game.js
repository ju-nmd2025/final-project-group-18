import { Character } from "./character.js";
import { Platform } from "./platform.js";

let canvasWidth = 400;
let canvasHeight = 600;
let player;
let platform1;
let platform2;
let platforms = [];

player = new Character(200, 50, 50, 50);
platform1 = new Platform(50, 300, 100, 20);
platform2 = new Platform(200, 200, 100, 20);

function setup() {
  // Optional: add more platforms dynamically if needed
  createCanvas(canvasWidth, canvasHeight);
}

if (platforms.length === 0) {
  platforms.push(platform1);
  platforms.push(platform2);
}

console.log(platforms);

function draw() {
  background(135, 206, 235); // sky blue

  // Apply gravity
  player.applyGravity(1);

  // Draw and scroll platforms, check collisions
  for (let p of platforms) {
    p.draw();
    p.y -= 2; // scroll upward

    // Reset platform if it moves off the top
    if (p.y + p.h < 0) {
      p.y = canvasHeight;
    }

    // Check collision
    player.checkCollision(p);
  }

  // Floor check
  if (player.y + player.h >= canvasHeight) {
    player.y = canvasHeight - player.h;
    player.vy = 0;
  }

  if (keyIsDown(LEFT_ARROW)) {
    player.x -= 10; //////move left
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.x += 10; /////move right 
  }

  // Draw player
  player.draw();

} //////end draw function

  // Jump when key pressed
  function keyPressed() {
    // Jump from floor
    if (player.y + player.h >= canvasHeight) {
      player.vy = -15;
    }

    // Jump from platform (allow small tolerance)
    for (let p of platforms) {
      if (Math.abs(player.y + player.h - p.y) < 5) {
        player.vy = -15;
      }
    }
  }

