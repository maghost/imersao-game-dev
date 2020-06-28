class Homescreen {
  draw() {
    console.log('Draw Homescreen');
    this._drawBackgroundImage();
    this._drawText();
    this._drawButton();
  }

  _drawBackgroundImage() {
    image(homescreenImage, 0, 0, width, height);
  }

  _drawText() {
    textFont(homescreenFont);
    textAlign(CENTER);

    textSize(50);
    text('As aventuras de', width / 2, height / 3);

    textSize(150);
    text('Hipsta', width / 2, (height / 5) * 3);
  }

  _drawButton() {
    managerButton.positionY = height / 7 * 5;
    managerButton.draw();
  }
}
