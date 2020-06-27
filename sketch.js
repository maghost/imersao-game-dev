let scenarioImage;
let characterImage;
let enemyImage;
let bigEnemyImage;
let flyingEnemyImage;
let scenario;
let character;
let gameSound;
let jumpSound;
let score;

const enemies = [];
let currentEnemy;

function preload() {
  scenarioImage = loadImage('images/scenario/forest.png');
  gameOverImage = loadImage('images/assets/game-over.png');
  characterImage = loadImage('images/character/witch-running.png');
  enemyImage = loadImage('images/enemies/droplet.png');
  bigEnemyImage = loadImage('images/enemies/troll.png');
  flyingEnemyImage = loadImage('images/enemies/droplet-flying.png');
  gameSound = loadSound('sounds/soundtrack.mp3');
  jumpSound = loadSound('sounds/jump.mp3');
}

function keyPressed() {
  const action = character.actionsByKey[key];

  action && action();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(40);

  scenario = new Scenario(scenarioImage, 3);
  score = new Score();

  gameSound.loop();

  const characterHorizontalSpriteSize = 4;
  const characterVerticalSpriteSize = 4;
  const characterRatio = 0.8;
  character = new Character({
    jumpSound: jumpSound,
    spriteRatio: characterRatio,
    imageSprite: characterImage,
    variationY: 30,
    horizontalSpriteSize: characterHorizontalSpriteSize,
    verticalSpriteSize: characterVerticalSpriteSize
  });

  const enemyHorizontalSpriteSize = 4;
  const enemyVerticalSpriteSize = 7;
  const enemyRatio = 0.9;
  const enemy = new Enemy({
    delay: 100,
    spriteRatio: enemyRatio,
    imageSprite: enemyImage,
    positionX: width,
    variationY: 25,
    horizontalSpriteSize: enemyHorizontalSpriteSize,
    verticalSpriteSize: enemyVerticalSpriteSize
  });

  const flyingEnemySpriteSize = 16;
  const flyingEnemyHorizontalSpriteSize = 3;
  const flyingEnemyVerticalSpriteSize = 6;
  const flyingEnemyRatio = 0.9;
  const flyingEnemy = new Enemy({
    delay: 150,
    spriteRatio: flyingEnemyRatio,
    imageSprite: flyingEnemyImage,
    positionX: width,
    variationY: height / 2,
    horizontalSpriteSize: flyingEnemyHorizontalSpriteSize,
    verticalSpriteSize: flyingEnemyVerticalSpriteSize,
    customSpriteSize: flyingEnemySpriteSize
  });

  const bigEnemySpriteSize = 28;
  const bigEnemyHorizontalSpriteSize = 5;
  const bigEnemyVerticalSpriteSize = 6;
  const bigEnemyRatio = 0.8;
  const bigEnemy = new Enemy({
    delay: 200,
    spriteRatio: bigEnemyRatio,
    imageSprite: bigEnemyImage,
    positionX: width,
    variationY: -15,
    horizontalSpriteSize: bigEnemyHorizontalSpriteSize,
    verticalSpriteSize: bigEnemyVerticalSpriteSize,
    customSpriteSize: bigEnemySpriteSize
  });

  enemies.push(enemy);
  enemies.push(flyingEnemy);
  enemies.push(bigEnemy);

  currentEnemy = getRandomEnemy(enemies);
}

function draw() {
  scenario.show();
  scenario.move();

  score.show();
  score.addPoints();

  character.show();
  character.applyGravity();

  currentEnemy.show();
  currentEnemy.move();

  if (character.isColleded(currentEnemy)) {
    noLoop();
    image(gameOverImage, (width - gameOverImage.width) / 2, (height - gameOverImage.height) / 2);
  }

  if (!currentEnemy.isVisible) {
    currentEnemy = getRandomEnemy(enemies);
    currentEnemy.reinitiate();
  }
}

function getRandomEnemy(enemies) {
  const min = 0;
  const max = enemies.length;
  const index = Math.floor(Math.random() * (max - min)) + min;
  const enemy = enemies[index];

  return enemy;
}
