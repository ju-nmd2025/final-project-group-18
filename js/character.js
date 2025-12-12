export default class Character {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vy = 0;
    this.vx = 0; // vertical speed
    //score
   // this.vx = 0; // vertical speed
  }

  draw() {
    fill("yellow");
    stroke("orange");
    strokeWeight(10);
    circle(this.x, this.y, 80);
  }

  applyGravity(gravity) {
    this.vy += gravity;
  }

  checkCollision(platform) {

    if (platform.isBroken) {
      return false;
    }
    
    if (
      this.vy > 0 && // Moving downwards 
      this.x + this.w > platform.x &&
      this.x < platform.x + platform.w &&
      this.y + this.h >= platform.y &&
      this.y + this.h <= platform.y + this.vy // Small tolerance for landing 
    ) 
    {
      this.y = platform.y - this.h; // land on top
      this.vy = -25; // bounce

      if (platform.isMoving) {
        this.x += platform.speed * platform.direction; 
      }

      if (platform.isBreakable) {
        platform.break();
      }

      return true; // Collision occurred
    }
    return false; // No collision occurred 
  }
}

  

