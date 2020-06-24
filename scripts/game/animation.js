class SpriteAnimation {
  constructor({
    reduceRatio = 1,
    imageSprite,
    positionX = 0,
    positionY,
    spriteWidth,
    spriteHeight,
    totalHorizontalSprite,
    totalVerticalSprite
  }) {
    this.reduceRatio = reduceRatio;
    this.imageSprite = imageSprite;
    this.positionX = positionX;
    this.positionY = positionY;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;

    this.currentFrame = 0;
    this.spritePositions = this.getSpritePositions(totalHorizontalSprite, totalVerticalSprite);
  }

  show() {
    image(
      this.imageSprite,
      this.positionX,
      this.positionY, //height - (this.spriteHeight / this.reduceRatio),
      this.spriteWidth / this.reduceRatio,
      this.spriteHeight / this.reduceRatio,
      this.spritePositions[this.currentFrame][0],
      this.spritePositions[this.currentFrame][1],
      this.spriteWidth,
      this.spriteHeight
    );

    this.animate();
  }

  animate() {
    this.currentFrame++;

    if (this.currentFrame >= this.spritePositions.length - 1) {
      this.currentFrame = 0;
    }
  }

  getSpritePositions(totalHorizontalSprite, totalVerticalSprite) {
    const sprites = new Array(totalHorizontalSprite * totalVerticalSprite);

    return sprites.fill().map((_, index) => {
      const xPosition = (index % totalHorizontalSprite) * this.spriteWidth;
      const yPosition = parseInt(index / totalHorizontalSprite) * this.spriteHeight;

      return [ xPosition, yPosition ];
    });
  }
}