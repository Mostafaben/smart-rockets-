class Rocket {
  constructor(dna = new DNA()) {
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    this.dna = dna;
    this.fitness = 0;
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
  }

  applyForce(force) {
    this.acc.add(force);
  }

  calcFitness() {
    let distance = this.pos.dist(target);
    this.fitness = map(distance, 0, width, width, 0);
    if (this.completed) {
      this.fitness *= 10;
    }
    if (this.crashed) {
      this.fitness /= 20;
    }
  }

  hitObstacle() {
    let hit = false;
    obstacles.forEach((o) => {
      if (o.hitRocket(this)) hit = true;
    });
    return hit;
  }
  hitEdges() {
    return (
      this.pos.x > width ||
      this.pos.x < 0 ||
      this.pos.y > height ||
      this.pos.y < 0
    );
  }

  update() {
    let distance = this.pos.dist(target);
    if (distance < 10) {
      this.completed = true;
      this.pos = target.copy();
    } else if (this.hitObstacle() || this.hitEdges()) {
      this.crashed = true;
    }

    this.applyForce(this.dna.genes[count]);

    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }

  show() {
    push();
    noStroke();
    fill(this.color);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }
}
