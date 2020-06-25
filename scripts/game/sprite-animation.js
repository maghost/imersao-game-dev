class SpriteAnimation {
  constructor({
    spriteRatio = 1,
    imageSprite,
    positionX = 0,
    variationY = 0,
    horizontalSpriteSize,
    verticalSpriteSize
  }) {
    this.imageSprite = imageSprite;
    this.spriteRatio = spriteRatio;
    this.spriteWidth = this.imageSprite.width / horizontalSpriteSize;
    this.spriteHeight = this.imageSprite.height / verticalSpriteSize;
    this.spriteWidthDest = this.spriteWidth * this.spriteRatio;
    this.spriteHeightDest = this.spriteHeight * this.spriteRatio;

    this.positionX = positionX;
    this.variationY = variationY;
    this.spriteZeroY = height - this.spriteHeightDest;
    this.initialY = this.spriteZeroY - this.variationY;
    this.positionY = this.initialY;

    this.currentFrame = 0;
    this.spritePositions = this.getSpritePositions(horizontalSpriteSize, verticalSpriteSize);
  }

  show() {
    image(
      this.imageSprite,
      this.positionX,
      this.positionY,
      this.spriteWidthDest,
      this.spriteHeightDest,
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

  getSpritePositions(horizontalSpriteSize, verticalSpriteSize) {
    const sprites = new Array(horizontalSpriteSize * verticalSpriteSize);

    const spritePositions = sprites.fill().map((_, index) => {
      const xPosition = (index % horizontalSpriteSize) * this.spriteWidth;
      const yPosition = parseInt(index / horizontalSpriteSize) * this.spriteHeight;

      return [ xPosition, yPosition ];
    });

    return spritePositions;
  }
}