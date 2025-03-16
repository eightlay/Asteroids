var stars = [];

function starField() {
  while (stars.length < 500) {
    stars.push(new Star());
  }
  push();
  noStroke();
  fill(255, 10);
  for (let i = stars.length - 1; i >= 0; i--) {
    let star = stars[i];
    if (star.update()) stars.splice(i, 1);
    star.display();
  }
  pop();
}

class Star {
  constructor() {
    this.r = 5;
    this.x = random(0, width);
    this.y = random(0, height);
    this.z = random(width);
  }

  update() {
    this.z--;
    this.z = constrain(this.z, 1, width);

    if (this.z == 1) return true;
    return false;
  }

  display() {
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    ellipse(sx, sy, this.r, this.r);
  }

}