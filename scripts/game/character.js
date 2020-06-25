class Character extends SpriteAnimation {
  constructor({ gravity = 5, jumpHeight = 50, ...rest }) {
    super(rest);

    this.initialY = height - this.spriteHeightDest;
    this.positionY = this.initialY;

    this.gravity = gravity;
    this.jumpHeight = jumpHeight;
    this.jumpVelocity = 0;
  }

  jump() {
    this.jumpVelocity = -this.jumpHeight;
  }

  applyGravity() {
    this.positionY = this.positionY + this.jumpVelocity;
    this.jumpVelocity = this.jumpVelocity + this.gravity;

    if (this.positionY > this.initialY) {
      this.positionY = this.initialY;
    }
  }
}
