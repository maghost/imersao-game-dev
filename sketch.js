function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(40);

  gameSound.loop();

  homepage = new Homepage();
  game = new Game();

  scenes = {
    homepage,
    game
  };

  currentScene = 'game';

  game.setup();
}

function keyPressed() {
  game.keyPressed(key);
}

function draw() {
  scenes[currentScene].draw();
}
