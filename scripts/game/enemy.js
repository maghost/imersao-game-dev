class Enemy extends SpriteAnimation {
  constructor(props) {
    super(props);

    this.positionX = props.positionX;
    this.velocity = props.velocity || 10;
  }

  move() {
    this.positionX = this.positionX - this.velocity;
  }
}