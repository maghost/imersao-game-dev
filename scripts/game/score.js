class Score {
  constructor() {
    this.points = 0;
  }

  show() {
    textAlign(RIGHT);
    fill('#fff');
    textSize(50);
    text(parseInt(this.points), width - 30, 50);
  }

  addPoints() {
    this.points = this.points + 0.2;
  }
}
