let shotHistory = [];
let attempts = 0;
let makes = 0;
let lastShot = "None";
let maxShots = 10;

let ballX = 400;
let ballY = 320;
let targetX = 400;
let targetY = 125;
let ballMoving = false;
let shotResult = "";

let layupBtn;
let midBtn;
let threeBtn;
let restartBtn;

function setup() {
  createCanvas(800, 500);

  layupBtn = {x: 120, y: 380, w: 150, h: 50, label: "Layup"};
  midBtn = {x: 325, y: 380, w: 150, h: 50, label: "Midrange"};
  threeBtn = {x: 530, y: 380, w: 150, h: 50, label: "3PT"};
  restartBtn = {x: 300, y: 430, w: 200, h: 45, label: "Restart Game"};
}

function draw() {
  background(230, 240, 255);

  drawCourt();
  animateBall();
  drawBall();
  drawStats();

  if (attempts < maxShots) {
    drawButton(layupBtn);
    drawButton(midBtn);
    drawButton(threeBtn);

    fill(0);
    textSize(18);
    textAlign(CENTER);
    text("Choose a shot type", width / 2, 350);
  } else {
    fill(0);
    textSize(28);
    textAlign(CENTER);
    text("Round Over", width / 2, 340);

    textSize(20);
    text(getMessage(), width / 2, 375);

    drawButton(restartBtn);
  }
}

function drawCourt() {
  fill(255);
  rect(250, 45, 300, 230);

  fill(180);
  rect(360, 70, 80, 50);

  fill(255, 80, 0);
  rect(350, 120, 100, 8);

  stroke(255, 80, 0);
  strokeWeight(3);
  noFill();
  ellipse(400, 130, 90, 25);
  noStroke();

  fill(255);
  rect(0, 300, width, 10);

  fill(50, 100, 200);
  textAlign(CENTER);
  textSize(30);
  text("Basketball Shot Simulator", width / 2, 30);
}

function drawBall() {
  fill(255, 140, 0);
  circle(ballX, ballY, 32);

  stroke(0);
  line(ballX - 16, ballY, ballX + 16, ballY);
  line(ballX, ballY - 16, ballX, ballY + 16);
  noStroke();
}

function animateBall() {
  if (ballMoving) {
    ballX = lerp(ballX, targetX, 0.08);
    ballY = lerp(ballY, targetY, 0.08);

    if (dist(ballX, ballY, targetX, targetY) < 5) {
      ballMoving = false;
      lastShot = shotResult;
    }
  }
}

function drawStats() {
  fill(0);
  textAlign(LEFT);
  textSize(20);
  text("Score: " + calculateScore(), 60, 120);
  text("Attempts: " + attempts + " / " + maxShots, 60, 160);
  text("Makes: " + makes, 60, 200);
  text("Shooting %: " + getPercent() + "%", 60, 240);
  text("Last Shot: " + lastShot, 60, 280);
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

function mousePressed() {
  if (ballMoving) {
    return;
  }

  if (attempts < maxShots) {
    if (isClicked(layupBtn)) {
      takeShot("layup");
    } else if (isClicked(midBtn)) {
      takeShot("midrange");
    } else if (isClicked(threeBtn)) {
      takeShot("three");
    }
  } else {
    if (isClicked(restartBtn)) {
      restartGame();
    }
  }
}

function isClicked(btn) {
  let xOverlap = mouseX > btn.x && mouseX < btn.x + btn.w;
  let yOverlap = mouseY > btn.y && mouseY < btn.y + btn.h;
  return xOverlap && yOverlap;
}

function takeShot(type) {
  let chance;
  let points;

  if (type === "layup") {
    chance = 0.8;
    points = 2;
  } else if (type === "midrange") {
    chance = 0.6;
    points = 2;
  } else {
    chance = 0.4;
    points = 3;
  }

  attempts++;

  ballX = 400;
  ballY = 320;
  ballMoving = true;

  if (random(1) < chance) {
    shotHistory.push(points);
    makes++;
    shotResult = "Make";
  } else {
    shotHistory.push(0);
    shotResult = "Miss";
  }
}

function calculateScore() {
  let total = 0;

  for (let i = 0; i < shotHistory.length; i++) {
    total = total + shotHistory[i];
  }

  return total;
}

function getPercent() {
  if (attempts === 0) {
    return 0;
  }

  return round((makes / attempts) * 100);
}

function getMessage() {
  let percent = getPercent();

  if (percent >= 70) {
    return "You were on fire!";
  } else if (percent >= 50) {
    return "Solid shooting!";
  } else {
    return "Keep practicing!";
  }
}

function restartGame() {
  shotHistory = [];
  attempts = 0;
  makes = 0;
  lastShot = "None";
  ballX = 400;
  ballY = 320;
  ballMoving = false;
  shotResult = "";
}
