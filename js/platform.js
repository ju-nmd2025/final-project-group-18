export default class Platform {
  constructor(
    x,
    y,
    w,
    h,
    isMoving = false,
    maxMoveX = 100,
    speed = 1.5,
    isBreakable = false
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.isMoving = isMoving; // Boolean flag to enable/disable movement
    this.initialX = x; // Store the starting position
    this.maxMoveX = maxMoveX; // Max distance to move left/right from initialX
    this.speed = speed; // Speed of movement
    this.direction = Math.random() < 0.5 ? -1 : 1; // Random startingdirection

    this.isBreakable = isBreakable;
    this.isBroken = false;
  }

  draw() {
    push();
    if (this.isBroken) {
      pop();
      return;
    }

    if (this.isBreakable) {
      fill(255, 0, 0);
    } else if (this.isMoving) {
      fill(255, 165, 0);
    } else {
      fill("green");
    }

    stroke("black");
    rect(this.x, this.y, this.w, this.h);
    pop();
  }

  update() {
    // Only move if not broken
    if (this.isMoving && !this.isBroken) {
      this.x += this.speed * this.direction;
      let currentDisplacement = this.x - this.initialX;

      if (currentDisplacement > this.maxMoveX) {
        this.direction = -1;
      } else if (currentDisplacement < -this.maxMoveX) {
        this.direction = 1;
      }
    }
  }

  break() {
    if (this.isBreakable) {
      this.isBroken = true;
    }
  }
}

export { Platform };
