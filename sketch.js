function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(40);

  gameSound.loop();

  game = new Game();
  game.setup();
}

function keyPressed() {
  game.keyPressed(key);
}

function draw() {
  game.draw();
}
