class Laser {
  constructor(sup) {
    this.pos = ship.pos.copy();
    this.angle = ship.ang;
    this.vel = p5.Vector.fromAngle(this.angle);
    this.vel.setMag(ship.r * 1.3);
    this.pos.add(this.vel);
    this.r = 6;
    this.vel.setMag(this.r);
    this.sup = sup;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0, this.r, this.r);
    pop();
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x > width || this.pos.x < 0) return true;
    if (this.pos.y > height || this.pos.y < 0) return true;

    return false;
  }

  collide() {
    for (let i = asteroids.length - 1; i >= 0; i--) {
      let aster = asteroids[i];
      let d = dist(this.pos.x, this.pos.y, aster.pos.x, aster.pos.y);
      if (d < aster.r) {
        asteroids.splice(i, 1);
        score += aster.r;
        if (aster.r / 2 > 6) {
          asteroids.push(new Asteroid(aster.pos.x, aster.pos.y, aster.r / 2));
          asteroids.push(new Asteroid(aster.pos.x, aster.pos.y, aster.r / 2));
          if (sounds) asterCrash.play();
        } else {
          addDust(aster.pos, aster.vel, 6);
          if (sounds) asterCrash.play();
        }
        if (!this.sup && !slowTime) SUPAcounter += aster.r
        return true;
      }
    }
    return false;
  }
}