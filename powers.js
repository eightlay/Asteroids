function handlePowers() {
  if (SUPAcounter >= SUPAfinish) SUPA = true;
  else SUPA = false;
  if (slowTime) {
    SUPAcounter -= 0.5;
    SUPAcounter = constrain(SUPAcounter, 0, SUPAfinish + 1)
  }
  if (SUPAcounter <= 0) {
    slowTime = false;
  }
}