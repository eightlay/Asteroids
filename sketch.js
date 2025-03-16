//Timur Dzhalalov
//Asteroids game
//timurdzhalalov@yahoo.com
//26.07.2019

var ship;
var asteroids, dust, lasers;
var hp, maxHp, score;
var canvas;
var dead;
var shipCrash, laserShot, asterCrash, back;
var HARD = 200;
var SUPAcounter, SUPA, SUPAfinis, slowTime;
var wP;
var music, sounds, pause;

function preload() {
  shipCrash = loadSound('audio/ship_crash.mp3');
  laserShot = loadSound('audio/laser_shot.wav');
  asterCrash = loadSound('audio/aster_crash.wav');
  back = loadSound('back.mp3');
}

function setup() {
  back.play();
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  noCursor();
  wP = width / 100;
  slowTime = false;
  
  SUPA = false;
  SUPAfinish = 500;
  SUPAcounter = 0;
  asteroids = [];
  lasers = [];
  dust = [];
  ship = new Ship();
  hp = ship.r * 50;
  maxHp = ship.r * 50;
  score = 0;
  dead = false;
  pause = false;
  music = true;
  sounds = true;

  noFill();
  stroke(205, 0, 105);
  strokeWeight(2);
}

function draw() {
  if (pause) {
    pauseHUD();
    return 0;
  }
  
  playground();
  ship.handle();
  
  handlePowers();
  
  for (let i = asteroids.length - 1; i >= 0; i--) {
    let aster = asteroids[i];
    aster.display();
    if (aster.collide(ship) && !dead) 
      if (aster.r > ship.r) {
        dead = true;
        die();
        hp = 0;
      } else {
        hp -= aster.r;
        if (!slowTime) SUPAcounter += aster.r;
        asteroids.splice(i, 1);
      }
    if (!slowTime) {
      if (aster.update()) asteroids.splice(i, 1);
    } else if (frameCount % 5 == 0) {
      if (aster.update()) asteroids.splice(i, 1);
    }
  }
  
  for (let i = lasers.length - 1; i >= 0; i--) {
    let laser = lasers[i];
    laser.display();
    if (laser.update()) {
      lasers.splice(i, 1);
      break;
    }
    let col = laser.collide();
    if (col) lasers.splice(i, 1);
  }
  
  for (let i = dust.length - 1; i >= 0; i--) {
    dust[i].update();
    dust[i].display();
    if (dust[i].transparency <= 51) dust.splice(i, 1);
  }
  
  if (frameCount % HARD == 0 && !dead) newAsteroid();
  
  if (dead) {
    hp += ship.r/5;
    if (hp > maxHp) {
      hp = maxHp;
      newGame();
    }
  }
}