class Life {
  constructor(maxLife = 5, initialLife = 3) {
    this.maxLife = maxLife;
    this.currentLife = initialLife;

    this.margin = 10;
    this.width = 32;
    this.height = 32;
    this.positionY = 20;
  }

  draw() {
    for (let i = 0; i < this.currentLife; i++) {
      const positionX = this.margin + (i * this.width) + (i * this.margin);

      image(lifeImage, positionX, this.positionY, this.width, this.height);
    }
  }

  addLife() {
    if (this.currentLife > this.maxLife) return;

    this.currentLife++;
  }

  removeLife() {
    this.currentLife--;
  }
}
