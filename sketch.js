let shotHistory = [];
let attempts = 0;
let makes = 0;
let maxShots = 10;
let lastShot = "None";

let score = 0;

let layupBtn;
let midBtn;
let threeBtn;
let restartBtn;

let choosingShot = true;
let meterRunning = false;

let currentShot = "";
let currentPoints = 0;
let meterX = 150;
let meterSpeed = 5;
let meterDirection = 1;

function setup() {
  createCanvas(800, 500);

  layupBtn = {x: 120, y: 390, w: 150, h: 50, label: "Layup"};
  midBtn = {x: 325, y: 390, w: 150, h: 50, label: "Midrange"};
  threeBtn = {x: 530, y: 390, w: 150, h: 50, label: "3PT"};
  restartBtn = {x: 300, y: 420, w: 200, h: 45, label: "Restart"};
}

function draw() {
  background(230, 240, 255);

  drawCourt();
  drawStats();

  if (attempts >= maxShots) {
    drawEndScreen();
  } else if (choosingShot) {
    drawShotButtons();
  } else if (meterRunning) {
    drawMeter();
    moveMeter();
  }
}

function drawCourt() {
  fill(255);
  rect(250, 45, 300, 220);

  fill(180);
  rect(360, 75, 80, 50);

  fill(255, 90, 0);
  rect(350, 125, 100, 8);

  noFill();
  stroke(255, 90, 0);
  strokeWeight(3);
  ellipse(400, 135, 90, 25);
  noStroke();

  fill(255, 170, 0);
  circle(400, 270, 40);

  stroke(0);
  line(380, 270, 420, 270);
  line(400, 250, 400, 290);
  noStroke();

  fill(50, 100, 200);
  textAlign(CENTER);
  textSize(30);
  text("Basketball Shot Meter", width / 2, 30);
}

function drawStats() {
  fill(0);
  textAlign(LEFT);
  textSize(19);
  text("Score: " + score, 60, 110);
  text("Attempts: " + attempts + " / " + maxShots, 60, 145);
  text("Makes: " + makes, 60, 180);
  text("Shooting %: " + getPercent() + "%", 60, 215);
  text("Last Shot: " + lastShot, 60, 250);
}

function drawShotButtons() {
  fill(0);
  textSize(18);
  textAlign(CENTER);
  text("Choose your shot", width / 2, 350);

  drawButton(layupBtn);
  drawButton(midBtn);
  drawButton(threeBtn);
}

function drawButton(btn) {
  fill(255);
  stroke(0);
  rect(btn.x, btn.y, btn.w, btn.h, 10);

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function drawMeter() {
  fill(0);
  textAlign(CENTER);
  textSize(18);
  text("Click when the marker is in the green zone!", width / 2, 330);
  text("Shot: " + currentShot, width / 2, 355);

  fill(220);
  rect(150, 390, 500, 30);

  fill(255, 70, 70);
  rect(150, 390, 500, 30);

  fill(255, 220, 80);
  rect(320, 390, 160, 30);

  fill(80, 220, 80);
  rect(370, 390, 60, 30);

  fill(0);
  rect(meterX, 382, 8, 46);
}

function moveMeter() {
  meterX = meterX + meterSpeed * meterDirection;

  if (meterX > 650 || meterX < 150) {
    meterDirection = meterDirection * -1;
  }
}

function mousePressed() {
  if (attempts >= maxShots) {
    if (isClicked(restartBtn)) {
      restartGame();
    }
    return;
  }

  if (choosingShot) {
    if (isClicked(layupBtn)) {
      startShot("Layup", 2, 4);
    } else if (isClicked(midBtn)) {
      startShot("Midrange", 2, 6);
    } else if (isClicked(threeBtn)) {
      startShot("3PT", 3, 8);
    }
  } else if (meterRunning) {
    finishShot();
  }
}

function isClicked(btn) {
  let xOverlap = mouseX > btn.x && mouseX < btn.x + btn.w;
  let yOverlap = mouseY > btn.y && mouseY < btn.y + btn.h;
  return xOverlap && yOverlap;
}

function startShot(type, points, speed) {
  currentShot = type;
  currentPoints = points;
  meterSpeed = speed;
  meterX = 150;
  meterDirection = 1;
  choosingShot = false;
  meterRunning = true;
}

function finishShot() {
  attempts++;

  let made = false;

  if (meterX >= 370 && meterX <= 430) {
    made = true;
  } else if (meterX >= 320 && meterX <= 480) {
    if (random(1) < 0.6) {
      made = true;
    }
  } else {
    if (random(1) < 0.2) {
      made = true;
    }
  }

  if (made) {
    score = score + currentPoints;
    makes++;
    shotHistory.push(currentPoints);
    lastShot = currentShot + " Make";
  } else {
    shotHistory.push(0);
    lastShot = currentShot + " Miss";
  }

  choosingShot = true;
  meterRunning = false;
}

function getPercent() {
  if (attempts === 0) {
    return 0;
  }
  return round((makes / attempts) * 100);
}

function drawEndScreen() {
  fill(0);
  textAlign(CENTER);
  textSize(28);
  text("Round Over", width / 2, 335);

  textSize(20);
  text(getMessage(), width / 2, 370);

  drawButton(restartBtn);
}

function getMessage() {
  if (getPercent() >= 70) {
    return "You were on fire!";
  } else if (getPercent() >= 50) {
    return "Solid shooting!";
  } else {
    return "Keep practicing!";
  }
}

function restartGame() {
  shotHistory = [];
  attempts = 0;
  makes = 0;
  score = 0;
  lastShot = "None";
  choosingShot = true;
  meterRunning = false;
}
