class Character extends SpriteAnimation {
  constructor({ jumpSound, gravity = 5, jumpHeight = 50, ...rest }) {
    super(rest);

    this.jumpSound = jumpSound;
    this.gravity = gravity;
    this.jumpHeight = jumpHeight;
    this.jumpVelocity = 0;
    this.jumps = 0;
    this.maxJumps = 2;

    this.actionsByKey = {
      'ArrowUp': () => this.jump()
    };
  }

  jump() {
    if (this.jumps >= this.maxJumps) return;

    this.jumps++;
    this.jumpVelocity = -this.jumpHeight;
    this.jumpSound.play();
  }

  applyGravity() {
    this.positionY = this.positionY + this.jumpVelocity;
    this.jumpVelocity = this.jumpVelocity + this.gravity;

    if (this.positionY > this.initialY) {
      this.positionY = this.initialY;
      this.jumps = 0;
    }
  }

  isColleded(enemy) {
    const collisionPrecision = 0.7;

    this.renderCollision(enemy, collisionPrecision);

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

  renderCollision(enemy, collisionPrecision) {
    noFill();
    rect(
      this.positionX,
      this.positionY,
      this.spriteWidthDest * collisionPrecision,
      this.spriteHeightDest * collisionPrecision
    );
    rect(
      enemy.positionX,
      enemy.positionY,
      enemy.spriteWidthDest * collisionPrecision,
      enemy.spriteHeightDest * collisionPrecision
    );
  }
}
