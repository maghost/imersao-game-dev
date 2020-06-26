class Enemy extends SpriteAnimation {
  constructor({ moveVelocity = 15, delay = 0, ...rest }) {
    super(rest);

    this.moveVelocity = moveVelocity;
    this.delay = delay;
  }

  move() {
    this.positionX = this.positionX - this.moveVelocity;

    if (this.positionX < (-this.spriteWidthDest - this.delay)) {
      this.positionX = width;
    }
  }
}