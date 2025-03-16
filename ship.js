class Ship {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 16;
    this.ang = 0;
    this.angVel = 0;
    this.angAcc = 0;
    this.acc = 0;
    this.vel = createVector(0, 0);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.ang + PI / 2);
    triangle(-this.r, this.r, 0, -this.r * 1.3, this.r, this.r);
    pop();
  }

  update() {
    //ROTATION
    this.angVel += this.angAcc / 500;
    this.angVel *= 0.99;
    this.ang += this.angVel;
    this.ang = this.ang % TWO_PI;

    //MOVING
    let dir = p5.Vector.fromAngle(this.ang);
    dir.mult(this.acc * 0.05);
    this.vel.add(dir);
    this.vel.mult(0.99);
    this.pos.add(this.vel);
  }

  edges() {
    if (this.pos.x > width + this.r) this.pos.x = -this.r * 1.3;
    if (this.pos.x < -this.r * 1.3) this.pos.x = width + this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r * 1.3;
    if (this.pos.y < -this.r * 1.3) this.pos.y = height + this.r;
  }

  handle() {
    if (!dead) {
      this.update();
      this.edges();
      this.display();
    }
  }
}