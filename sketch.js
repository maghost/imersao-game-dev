function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(40);
  gameSound.loop();

  currentScene = 'homescreen';
  homescreen = new Homescreen();
  game = new Game();
  game.setup();

  scenes = {
    homescreen,
    game
  };

  managerButton = new ManagerButton('Iniciar', width / 2, height / 2);
}

function keyPressed() {
  game.keyPressed(key);
}

function draw() {
  scenes[currentScene].draw();
}
