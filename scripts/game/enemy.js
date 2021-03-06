class Enemy extends SpriteAnimation {
  constructor({ moveVelocity = 10, ...rest }) {
    super(rest);

    this.isVisible = true;
    this.moveVelocity = moveVelocity;
  }

  move() {
    if (!this.isVisible) {
      return;
    }

    this.positionX = this.positionX - this.moveVelocity;

    if (this.positionX < -this.spriteWidthDest) {
      this.isVisible = false;
    }
  }

  getInitialPosition() {
    return width;
  }

  getRandomVelocity(min = 10, max = 30) {
    return parseInt(random(min, max));
  }

  reinitiate() {
    this.isVisible = true;
    this.positionX = this.getInitialPosition();
  }
}