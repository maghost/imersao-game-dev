function preload() {
  gameConfig = loadJSON('game-config.json');

  homescreenImage = loadImage('assets/images/homescreen.png');
  scenarioImage = loadImage('assets/images/scenario/forest.png');
  gameOverImage = loadImage('assets/images/game-over.png');
  lifeImage = loadImage('assets/images/life.png');
  characterImage = loadImage('assets/images/character/ninja-running.png');
  enemyImage = loadImage('assets/images/enemies/droplet.png');
  bigEnemyImage = loadImage('assets/images/enemies/troll.png');
  flyingEnemyImage = loadImage('assets/images/enemies/droplet-flying.png');

  homescreenFont = loadFont('assets/fonts/homescreen-font.otf');

  gameSound = loadSound('assets/sounds/soundtrack.mp3');
  jumpSound = loadSound('assets/sounds/jump.mp3');
}
