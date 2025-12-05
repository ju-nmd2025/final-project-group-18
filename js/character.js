export default class Character {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vy = 0;
    this.vx = 0; // vertical speed
    //score
  }

  draw() {
  fill("yellow");
  stroke("orange");
  strokeWeight(20);
  circle(this.x, this.y, 100);
  }

  applyGravity(gravity) {
    this.vy += gravity;
    this.y += this.vy;
  }

  checkCollision(platform) {
    if (
      this.vy > 0 &&
      this.x + this.w > platform.x &&
      this.x < platform.x + platform.w &&
      this.y + this.h >= platform.y &&
      this.y + this.h <= platform.y + this.vy
    ) {
      this.y = platform.y - this.h; // land on top
      this.vy = -15; // bounce
      return true;
    }
    return false;
  }
}
