import platform from "platform";
import { Character } from "./character";

function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

// Obstacle / Spike / Death
function drawObstacle() {
    push();
    fill("red");
    triangle(180, 300, 210, 240, 240, 300);
    pop();
}

let canvasWidth = 400;
let canvasHeight = 400;
let floor = 300;
const gravity = 1.5; 
let platforms = []; 
let character = new Character(50, 50, 50, 50);

function draw() {
    background(100, 100, 100);

    character.draw();
    platform.draw();

    platform.y += 5;
    if (platform.y > canvasHeight) {
        platform.y = -platform.h;
    }

    if (
        character.y + character.h < 300 &&
        !character.isColliding(character, platform)
    ) {
        character.y += 10;
    }

    // Floor
    line(0, floor, canvasWidth, floor);
}

function keyPressed() {
    if (character.y + character.h === floor || character.isColliding(character, platform)) {
        character.y -= 120;
    }
}
