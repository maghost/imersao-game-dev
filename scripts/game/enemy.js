class Enemy extends SpriteAnimation {
  constructor({ moveVelocity = 10, ...rest }) {
    super(rest);

    this.moveVelocity = moveVelocity;
  }

  move() {
    this.positionX = this.positionX - this.moveVelocity;
  }
}