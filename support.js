function playground() {
  if (slowTime) background(51, 75);
  else background(51);
  rect(0, 0, width, height);
  starField();
  document.getElementById("paragraph").innerHTML = `Score = ${int(score)} | HP = ${int(map(hp, 0, maxHp, 0, 100))} | Difficulty = ${int(map(HARD, 10, 200, 200, 10))} of 200`;
  stroke(205, 0, 105);
  if (!back.isPlaying() && music) back.play();

  push();
  fill(255, 100);
  noStroke();
  textSize(20);
  text('WASD to control\nP to shoot\nQ to use SUPA\nSpace to slow time\nUP to difficulty++\nDOWN to difficulty--', 87 * wP, 70);
  text(`E for pause\nM to turn ${isMusic()} music\nN to turn ${isSound()} sounds\n`, wP, 70);
  pop();

  push();
  rectMode(CORNERS);
  stroke(255, 0, 105, 100);
  rect(30 * wP, 10, width - 30 * wP, 35);
  noStroke();
  let xoff = map(SUPAcounter, 0, SUPAfinish, 30 * wP, width - 30 * wP);
  xoff = constrain(xoff, 30 * wP, width - 30 * wP);
  if (SUPA) fill(255, 105, 0);
  else fill(255, 0, 105);
  rect(30 * wP, 10, xoff, 35);
  fill(255);
  noStroke();
  textSize(18);
  textAlign(CENTER);
  text(usingSUPA(), width / 2, 29);
  
  text('github.com/eightlay', 94 * wP, height - 15);
  pop();
}

function usingSUPA() {
  if (HARD > 50 && SUPA) return 'USE YOUR SUPA, CAP';
  else if (HARD > 50) return '';
  return 'You can\'t use SUPA';
}

function pauseHUD() {
  background(51, 10);
  push();
  textAlign(CENTER, CENTER);
  noStroke();
  fill(255);
  textSize(96);
  text("PAUSE", width / 2, height / 2);
  pop();

  push();
  rectMode(CORNERS);
  stroke(255, 0, 105, 100);
  rect(30 * wP, 10, width - 30 * wP, 35);
  noStroke();
  let xoff = map(SUPAcounter, 0, SUPAfinish, 30 * wP, width - 30 * wP);
  xoff = constrain(xoff, 30 * wP, width - 30 * wP);
  if (SUPA) fill(255, 105, 0);
  else fill(255, 0, 105);
  rect(30 * wP, 10, xoff, 35);
  fill(255);
  noStroke();
  textSize(18);
  textAlign(CENTER);
  text(usingSUPA(), width / 2, 29);
  text('github.com/eightlay', 94 * wP, height - 15);
  pop();
}

function isMusic() {
  if (music) return 'off';
  return 'on';
}

function isSound() {
  if (sounds) return 'off';
  return 'on';
}

function newAsteroid() {
  let x = random(-100, 0);
  let y = random(0, height);
  asteroids.push(new Asteroid(x, y));

  x = random(width, width + 100);
  y = random(0, height);
  asteroids.push(new Asteroid(x, y));

  x = random(0, width);
  y = random(height, height + 100);
  asteroids.push(new Asteroid(x, y));

  x = random(0, width);
  y = random(-100, 0);
  asteroids.push(new Asteroid(x, y));
}

function die() {
  addDust(ship.pos, ship.vel, 250);
  shipCrash.play();
}

function newGame() {
  asteroids = [];
  lasers = [];
  ship = new Ship();
  hp = ship.r * 50;
  maxHp = ship.r * 50;
  score = 0;
  dead = false;
  SUPA = 0;
  SUPAcounter = 0;
  slowTime = false;

  noFill();
  stroke(205, 0, 105);
  strokeWeight(2);
}

function Dust(pos, vel) {
  this.pos = pos.copy();
  this.vel = vel.copy();
  this.vel.add(p5.Vector.random2D().mult(random(0.5, 1.5)));
  this.transparency = random(200, 255);

  this.update = function() {
    this.pos.add(this.vel);
    this.transparency -= 2;
  }

  this.display = function() {
    if (this.transparency > 0) {
      stroke(this.transparency);
      point(this.pos.x, this.pos.y);
    }
  }
}

function addDust(pos, vel, n) {
  for (var i = 0; i < n; i++) {
    dust.push(new Dust(pos, vel));
  }
}