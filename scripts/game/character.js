class Character {
  constructor(image) {
    this.image = image;
    this.reduceImageBy = 2.5;
    this.characterWidth = 363;
    this.characterHeight = 458;
    this.totalHorizontalSprite = 5;
    this.totalVerticalSprite = 2;
    this.spritePositions = this.getSpritePositions();
    this.currentFrame = 0;
  }

  getSpritePositions() {
    const sprites = new Array(this.totalHorizontalSprite * this.totalVerticalSprite);

    return sprites.fill().map((_, index) => {
      const xPosition = (index % this.totalHorizontalSprite) * this.characterWidth;
      const yPosition = parseInt(index / this.totalHorizontalSprite) * this.characterHeight;

      return [ xPosition, yPosition ];
    });
  }

  show() {
    image(
      this.image,
      0,
      height - (this.characterHeight / this.reduceImageBy),
      this.characterWidth / this.reduceImageBy,
      this.characterHeight / this.reduceImageBy,
      this.spritePositions[this.currentFrame][0],
      this.spritePositions[this.currentFrame][1],
      this.characterWidth,
      this.characterHeight
    );

    this.animate();
  }

  animate() {
    this.currentFrame++;

    if (this.currentFrame >= this.spritePositions.length - 1) {
      this.currentFrame = 0;
    }
  }
}
