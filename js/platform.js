
export default class Platform {
  constructor(x, y, w, h, isMoving = false, maxMoveX = 100, speed = 1.5) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  

  this.isMoving = isMoving; // Boolean flag to enable/disable movement 
  this.initialX = x; // Store the starting position 
  this.maxMoveX = maxMoveX; // Max distance to move left/right from initialX
  this.speed = speed; // Speed of movement 
  this.direction = (Math.random() < 0.5) ? -1 : 1; // Random startingdirection 

  }

  draw() {
    push();
    if (this.isMoving) {
      fill(255, 165, 0); 
    } else {
    fill("green");
    }
    stroke("black");
    rect(this.x, this.y, this.w, this.h);
    pop();
  }


update() {
  if (this.isMoving) {
    this.x += this.speed * this.direction; // Move the platform horizontally 
    let currentDisplacement = this.x - this.initialX; // Check boundaries based on the inital position 
    
    if (currentDisplacement > this.maxMoveX) { // Platform moved too far right (beyond initalX + maxMoveX) 
      this.direction = -1; // Reverse to move left 
    } else if (currentDisplacement < -this.maxMoveX) { // Platform moved too far left (beyond initalX - maxMoveX) 
      this.direction = 1; // Reverse to move right 
    }
  }
} 
}