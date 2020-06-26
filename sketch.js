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
  const enemyWidth = (enemyImage.width / enemyHorizontalSpriteSize) * enemyRatio;
  const enemy = new Enemy({
    moveVelocity: 10,
    delay: 200,
    spriteRatio: enemyRatio,
    imageSprite: enemyImage,
    positionX: width - enemyWidth,
    variationY: 25,
    horizontalSpriteSize: enemyHorizontalSpriteSize,
    verticalSpriteSize: enemyVerticalSpriteSize
  });

  const flyingEnemySpriteSize = 16;
  const flyingEnemyHorizontalSpriteSize = 3;
  const flyingEnemyVerticalSpriteSize = 6;
  const flyingEnemyRatio = 0.9;
  const flyingEnemy = new Enemy({
    moveVelocity: 10,
    delay: 1500,
    spriteRatio: flyingEnemyRatio,
    imageSprite: flyingEnemyImage,
    positionX: width * 3,
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
    moveVelocity: 10,
    delay: 2500,
    spriteRatio: bigEnemyRatio,
    imageSprite: bigEnemyImage,
    positionX: width * 4,
    variationY: -15,
    horizontalSpriteSize: bigEnemyHorizontalSpriteSize,
    verticalSpriteSize: bigEnemyVerticalSpriteSize,
    customSpriteSize: bigEnemySpriteSize
  });

  enemies.push(enemy);
  enemies.push(flyingEnemy);
  enemies.push(bigEnemy);
}

function draw() {
  scenario.show();
  scenario.move();

  score.show();
  score.addPoints();

  character.show();
  character.applyGravity();

  enemies.forEach(enemy => {
    enemy.show();
    enemy.move();

    if (character.isColleded(enemy)) {
      noLoop();
      image(gameOverImage, (width - gameOverImage.width) / 2, (height - gameOverImage.height) / 2);
    }
  });
}
