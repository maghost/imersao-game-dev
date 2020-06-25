class Enemy extends SpriteAnimation {
  constructor({ moveVelocity = 15, ...rest }) {
    super(rest);

    this.moveVelocity = moveVelocity;
  }

  move() {
    this.positionX = this.positionX - this.moveVelocity;

    if (this.positionX < -this.spriteWidthDest) {
      this.positionX = width;
    }
  }
}