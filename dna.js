class DNA {
  constructor(genes) {
    if (genes) {
      this.genes = genes;
    } else {
      this.genes = [];
      for (let i = 0; i < lifespan; i++) {
        this.genes[i] = p5.Vector.random2D().setMag(maxforce);
      }
    }
  }

  crossover(partner) {
    let newgenes = [];
    const { length } = this.genes;
    let mid = floor(random(length));
    for (let i = 0; i < length; i++) {
      if (i > mid) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }

  mutation() {
    const { length } = this.genes;
    for (let i = 0; i < length; i++) {
      if (random(1) < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }
}
