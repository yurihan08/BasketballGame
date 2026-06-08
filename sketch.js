let shotHistory = [];
let attempts = 0;
let makes = 0;
let lastShot = "None";
let maxShots = 10; 

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
  rect(250, 40, 300, 220);

  stroke(0);
  strokeWeight(4);
  line(350, 90, 450, 90);

  noFill();
  arc(400, 90, 120, 120, 0, PI);

  noStroke();
  fill(255, 100, 0);
  rect(320, 60, 160, 10);

  fill(0);
  textAlign(CENTER);
  textSize(30);
  text("Basketball Shot Simulator", width / 2, 30);
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
  } else if (type === "three") {
    chance = 0.4;
    points = 3;
  }
  attempts++;

  if (random(1) < chance) {
    shotHistory.push(points);
    makes++;
    lastShot = "Make";
  } else {
    shotHistory.push(0);
    lastShot = "Miss";
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
}