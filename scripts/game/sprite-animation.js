class SpriteAnimation {
  constructor({
    spriteRatio = 1,
    imageSprite,
    positionX = 0,
    variationY = 0,
    horizontalSpriteSize,
    verticalSpriteSize,
    customSpriteSize = horizontalSpriteSize * verticalSpriteSize,
    collision = {
      precision: 1
    }
  }) {
    this.imageSprite = imageSprite;
    this.spriteRatio = spriteRatio;
    this.spriteWidth = this.imageSprite.width / horizontalSpriteSize;
    this.spriteHeight = this.imageSprite.height / verticalSpriteSize;
    this.spriteWidthDest = parseInt(this.spriteWidth * this.spriteRatio);
    this.spriteHeightDest = parseInt(this.spriteHeight * this.spriteRatio);

    this.collision = collision;

    this.positionX = positionX;
    this.variationY = variationY;
    this.spriteZeroY = height - this.spriteHeightDest;
    this.initialY = this.spriteZeroY - this.variationY;
    this.positionY = this.initialY;

    this.currentFrame = 0;

    this.spritePositions = this.getSpritePositions(horizontalSpriteSize, verticalSpriteSize, customSpriteSize);
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

  getSpritePositions(horizontalSpriteSize, verticalSpriteSize, customSpriteSize) {
    const sprites = new Array(customSpriteSize || horizontalSpriteSize * verticalSpriteSize).fill();

    const spritePositions = sprites.map((_, index) => {
      const xPosition = (index % horizontalSpriteSize) * this.spriteWidth;
      const yPosition = parseInt(index / horizontalSpriteSize) * this.spriteHeight;

      return [ xPosition, yPosition ];
    });

    return spritePositions;
  }
}