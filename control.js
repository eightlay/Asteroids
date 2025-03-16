function keyPressed() {
  //MUSIC AND PAUSE
  if (keyCode == 69) pause = !pause;
  if (keyCode == 78) sounds = !sounds;
  if (keyCode == 77) {
    music = !music;
    back.stop();
  }
  
  if (pause) return 0;
  
  //ROTATION
  if (keyCode == 68) ship.angAcc = 1;
  if (keyCode == 65) ship.angAcc = -1;

  //MOVING
  if (keyCode == 87) ship.acc = 1;
  if (keyCode == 83) ship.acc = -1;

  //SHOOTING
  if ((keyCode == 80) && !dead) {
    lasers.push(new Laser());
    if (sounds) laserShot.play();
  }

  // SUPA
  if ((keyCode == 81) && SUPA && HARD > 50 && !dead) {
    for (let i = 0; i < TWO_PI; i += PI / 180) {
      ship.ang += i;
      ship.ang = ship.ang % TWO_PI;
      lasers.push(new Laser(true));
    }
    if (sounds) laserShot.play();
    SUPA = false;
    SUPAcounter = 0;
  }

  // SLOW TIME
  if ((keyCode == 32) && !dead) slowTime = true;

  // HANDLE HARDNESS
  if (keyCode == UP_ARROW) HARD -= 10;
  if (keyCode == DOWN_ARROW) HARD += 10;
  HARD = constrain(HARD, 10, 200);
  HARD = int(HARD);
}

function keyReleased() {
  //ROTATION
  if (keyCode == 68) ship.angAcc = 0;
  if (keyCode == 65) ship.angAcc = 0;
  if (keyCode == 68 && keyIsDown(65)) ship.angAcc = -1;
  if (keyCode == 65 && keyIsDown(68)) ship.angAcc = 1;

  //MOVING
  if (keyCode == 87) ship.acc = 0;
  if (keyCode == 83) ship.acc = 0;
  if (keyCode == 87 && keyIsDown(83)) ship.acc = -1;
  if (keyCode == 83 && keyIsDown(87)) ship.acc = 1;
  
  //POWERS
  if (keyCode == 32) 
    slowTime = false;
}