// export function createPlatform(x, y, w = 100, h = 20) {
//   return {
//     x,
//     y,
//     w,
//     h,
//     draw() {
//       fill("green");
//       stroke("black");
//       rect(this.x, this.y, this.w, this.h);
//     },
//   };
// }

export default class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    push();
    fill("green");
    stroke("black");
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}

// export let platforms = [
//   createPlatform(50, 300),
//   createPlatform(200, 200),
//   createPlatform(100, 100),
// ];
