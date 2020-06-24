class SpriteAnimation {
  constructor({
    spriteRatio = 1,
    imageSprite,
    positionX = 0,
    positionY,
    horizontalSpriteSize,
    verticalSpriteSize,
    velocity = 10,
    direction = 'left'
  }) {
    this.spriteRatio = spriteRatio;
    this.imageSprite = imageSprite;
    this.positionX = positionX;
    this.positionY = positionY;
    this.velocity = velocity;
    this.direction = direction;

    this.spriteWidth = imageSprite.width / horizontalSpriteSize;
    this.spriteHeight = imageSprite.height / verticalSpriteSize;
    this.currentFrame = 0;
    this.spritePositions = this.getSpritePositions(horizontalSpriteSize, verticalSpriteSize);
  }

  show() {
    image(
      this.imageSprite,
      this.positionX,
      this.positionY,
      this.spriteWidth * this.spriteRatio,
      this.spriteHeight * this.spriteRatio,
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

  move() {
    if (!this.velocity || !this.direction) {
      console.error('Tentando mover um personagem sem velocidade ou direção informada.');
    }

    switch (this.direction) {
      case 'left':
        this.positionX = this.positionX - this.velocity;
        break;

      case 'right':
        this.positionX = this.positionX + this.velocity;
        break;

      case 'top':
        this.positionY = this.positionY - this.velocity;
        break;

      case 'bottom':
        this.positionY = this.positionY + this.velocity;
        break;
    
      default:
        this.positionX = this.positionX - this.velocity;
        break;
    }
  }
}