var population;
var lifespan = 250;
var count = 0;
var target;
var maxforce = 0.3;
const NB_OBSTACLES = 10;

class Obstacle {
  constructor() {
    this.rx = random(0, width);
    this.ry = random(height * 0.2, height * 0.9);
    this.rw = random(40, 120);
    this.rh = 10;
    this.c = color(random(255), random(255), random(255));
  }

  hitRocket(rocket) {
    return (
      rocket.pos.x > this.rx &&
      rocket.pos.x < this.rx + this.rw &&
      rocket.pos.y > this.ry &&
      rocket.pos.y < this.ry + this.rh
    );
  }
  draw() {
    noStroke();
    fill(this.c);
    rect(this.rx, this.ry, this.rw, this.rh);
  }
}

var obstacles = [];

function setup() {
  createCanvas(500, 600);
  population = new Population();
  target = createVector(width / 2, 50);
  for (let i = 0; i < NB_OBSTACLES; i++) {
    obstacles.push(new Obstacle());
  }
}

function draw() {
  background(0);
  population.run();
  count++;
  obstacles.forEach((o) => {
    o.draw();
  });
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
  }
  drawTarget();
}

function drawTarget() {
  fill(255);
  ellipse(target.x, target.y, 16, 16);
}
