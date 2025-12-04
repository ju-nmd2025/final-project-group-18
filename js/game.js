import { Character } from "./character.js";
import { Platform } from "./platform.js";

let canvasWidth = 400;
let canvasHeight = 600;
let player;
let platform1;
let platform2;
let platforms = [];
let gameState = "start"; 

player = new Character(200, 50, 50, 50);
platform1 = new Platform(50, 300, 100, 20);
platform2 = new Platform(200, 200, 100, 20);

function spawnNewPlatform(){
  let x = Math.floor(Math.random() * (canvasWidth - 100)); // random x 
  let y = Math.floor(Math.random() * canvasHeight); // random y 
  let w = 100; 
  let h = 20; 

  let newPlatform = new Platform(x, y, w, h); 
  platforms.push(newPlatform); 
}

function setup() {
  // Optional: add more platforms dynamically if needed
  createCanvas(canvasWidth, canvasHeight);

  for (let i = 0; i < 10; i++) {
    spawnNewPlatform(); 
  }
}

if (platforms.length === 0) {
  platforms.push(platform1);
  platforms.push(platform2);
}

console.log(platforms);

function showStartScreen(){
  background(255, 105, 180); 
  textAlign(CENTER, CENTER); 
  textSize(40); 
  fill(255); 
  
  fill(255, 255, 0); 
  text("Sun Jump", canvasWidth / 2, 200); 
  text("START!", canvasWidth / 2, 300); 
  }

  function mousePressed(){
    if (gameState === "start") {
      gameState = "game"; 
    }
  }


function draw() {

  if(gameState === "start"){
    //draw startscreen 
   showStartScreen(); 
   return;   
  }

  background(135, 206, 235); // sky blue

  // Apply gravity
  player.applyGravity(1);

  // Draw and scroll platforms, check collisions
  for (let p of platforms) {
    p.draw();
    p.y += 2; // scroll upward

    // Reset platform if it moves off the top
    if (p.y > canvasHeight) {
      p.y = -20; 
      p.x = Math.floor(Math.random() * (canvasWidth - p.w)); 
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

