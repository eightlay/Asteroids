class Asteroid {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.figure = [];
    if (r) this.r = r;
    else this.r = random(15, 50);
    this.angles = random(10, 36);

    for (let i = 0; i < this.angles; i++) {
      if (random() > 0.5) {
        let xoff = random(-5, 5);
        let yoff = random(-5, 5);

        let angle = map(i, 0, this.angles, 0, TWO_PI);
        let x = (this.r + xoff) * cos(angle);
        let y = (this.r + yoff) * sin(angle);

        let v = createVector(x, y);
        this.figure.push(v);
      }
    }
    
    if (this.figure.length < 3) {
      this.figure = [];
      for (let i = 0; i < this.angles; i++) {
        let angle = map(i, 0, this.angles, 0, TWO_PI);
        let x = (this.r) * cos(angle);
        let y = (this.r) * sin(angle);
        let v = createVector(x, y);
        this.figure.push(v);
    }
    }

    this.vel = p5.Vector.random2D()
    this.vel.setMag(random(1, 2));
    this.ang = 0;
    this.angVel = random(-0.01, 0.01);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.ang);
    beginShape();
    for (let i = 0; i < this.figure.length; i++)
      vertex(this.figure[i].x, this.figure[i].y);
    endShape(CLOSE);
    pop();
  }

  update() {
    this.pos.add(this.vel);
    this.ang += this.angVel;

    if (this.pos.x > width + 100 || this.pos.x < -100) return true;
    if (this.pos.y > height + 100 || this.pos.y < -100) return true;

    return false;
  }
  
  collide(obj) {
    let d = dist(this.pos.x, this.pos.y, obj.pos.x, obj.pos.y);
    if (d < this.r + obj.r) {
      return true;
    }
    return false;
  }
}