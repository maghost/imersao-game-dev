let scenarioImage;
let characterImage;
let enemyImage;
let scenario;
let character;
let enemy;
let gameSound;

function preload() {
  scenarioImage = loadImage('images/scenario/forest.png');
  characterImage = loadImage('images/character/ninja-running.png');
  enemyImage = loadImage('images/enemies/droplet.png');
  gameSound = loadSound('sounds/soundtrack.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(40);

  scenario = new Scenario(scenarioImage, 3);

  character = new Character(characterImage);
  character.animate();

  const enemyWidth = 50;
  const enemyHeight = 50;

  enemy = new Enemy({
    imageSprite: enemyImage,
    positionX: 0,
    positionY: width - enemyWidth,
    spriteWidth: enemyWidth,
    spriteHeight: enemyHeight,
    totalHorizontalSprite: 4,
    totalVerticalSprite: 7
  });

  gameSound.loop();
}

function draw() {
  scenario.show();
  scenario.move();

  character.show();
}
