function preload() {
  homescreenImage = loadImage('assets/images/homescreen.png');
  scenarioImage = loadImage('assets/images/scenario/forest.png');
  gameOverImage = loadImage('assets/images/game-over.png');
  characterImage = loadImage('assets/images/character/witch-running.png');
  enemyImage = loadImage('assets/images/enemies/droplet.png');
  bigEnemyImage = loadImage('assets/images/enemies/troll.png');
  flyingEnemyImage = loadImage('assets/images/enemies/droplet-flying.png');

  homescreenFont = loadFont('assets/fonts/homescreen-font.otf');

  gameSound = loadSound('assets/sounds/soundtrack.mp3');
  jumpSound = loadSound('assets/sounds/jump.mp3');
}
