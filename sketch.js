let scenarioImage;
let characterImage;
let enemyImage;
let scenario;
let character;
let enemy;
let gameSound;

function preload() {
  scenarioImage = loadImage('images/scenario/forest.png');
  characterImage = loadImage('images/character/witch-running.png');
  enemyImage = loadImage('images/enemies/droplet.png');
  gameSound = loadSound('sounds/soundtrack.mp3');
}

function keyPressed() {
  if (key === 'ArrowUp') {
    character.jump();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(40);

  scenario = new Scenario(scenarioImage, 3);

  const characterHorizontalSpriteSize = 4;
  const characterVerticalSpriteSize = 4;
  const characterRatio = 0.8;
  character = new Character({
    spriteRatio: characterRatio,
    imageSprite: characterImage,
    horizontalSpriteSize: characterHorizontalSpriteSize,
    verticalSpriteSize: characterVerticalSpriteSize
  });

  const enemyHorizontalSpriteSize = 4;
  const enemyVerticalSpriteSize = 7;
  const enemyRatio = 0.9;
  const enemyWidth = (enemyImage.width / enemyHorizontalSpriteSize) * enemyRatio;
  const enemyHeight = (enemyImage.height / enemyVerticalSpriteSize) * enemyRatio;
  enemy = new Enemy({
    spriteRatio: enemyRatio,
    imageSprite: enemyImage,
    positionX: width - enemyWidth,
    positionY: height - enemyHeight,
    horizontalSpriteSize: enemyHorizontalSpriteSize,
    verticalSpriteSize: enemyVerticalSpriteSize
  });

  gameSound.loop();
}

function draw() {
  scenario.show();
  scenario.move();

  character.show();
  character.applyGravity();

  enemy.show();
  enemy.move();
}
