class Character extends SpriteAnimation {
  constructor({ jumpSound, gravity = 5, jumpHeight = 50, ...rest }) {
    super(rest);

    this.initialY = height - this.spriteHeightDest;
    this.positionY = this.initialY;

    this.jumpSound = jumpSound;
    this.gravity = gravity;
    this.jumpHeight = jumpHeight;
    this.jumpVelocity = 0;

    this.actionsByKey = {
      'ArrowUp': () => this.jump()
    };
  }

  jump() {
    this.jumpVelocity = -this.jumpHeight;
    this.jumpSound.play();
  }

  applyGravity() {
    this.positionY = this.positionY + this.jumpVelocity;
    this.jumpVelocity = this.jumpVelocity + this.gravity;

    if (this.positionY > this.initialY) {
      this.positionY = this.initialY;
    }
  }

  isColleded(enemy) {
    const collisionPrecision = 0.7;

    return collideRectRect(
      this.positionX,
      this.positionY,
      this.spriteWidthDest * collisionPrecision,
      this.spriteHeightDest * collisionPrecision,
      enemy.positionX,
      enemy.positionY,
      enemy.spriteWidthDest * collisionPrecision,
      enemy.spriteHeightDest * collisionPrecision
    );
  }
}
