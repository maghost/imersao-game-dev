class Game {
  constructor() {
    this.scenario;
    this.character;
    this.score;
    this.currentEnemy;

    this.enemies = [];
  }

  setup() {
    this.scenario = new Scenario(scenarioImage, 3);
    this.score = new Score();

    this.character = this.generateCharacter();
    this.enemies = this.generateEnemies();
    this.currentEnemy = this.getRandomEnemy();
  }

  draw() {
    this.scenario.show();
    this.scenario.move();
  
    this.score.show();
    this.score.addPoints();
 
    this.character.show();
    this.character.applyGravity();
  
    this.currentEnemy.show();
    this.currentEnemy.move();
  
    if (this.character.isColleded(this.currentEnemy)) {
      noLoop();
      this.gameOver();
    }
  
    if (!this.currentEnemy.isVisible) {
      this.currentEnemy = this.getRandomEnemy();
      this.currentEnemy.reinitiate();
    }
  }

  keyPressed(key) {
    const characterAction = this.character.actionsByKey[key];
  
    characterAction && characterAction();
  }

  generateCharacter() {
    const character = new Character({
      jumpSound,
      spriteRatio: 0.8,
      imageSprite: characterImage,
      variationY: 25,
      horizontalSpriteSize: 4,
      verticalSpriteSize: 4
    });

    return character;
  }

  generateEnemies() {
    const enemies = [];

    const enemy = new Enemy({
      delay: 100,
      spriteRatio: 0.9,
      imageSprite: enemyImage,
      positionX: width,
      variationY: 25,
      horizontalSpriteSize: 4,
      verticalSpriteSize: 7
    });

    const flyingEnemy = new Enemy({
      delay: 150,
      spriteRatio: 0.9,
      imageSprite: flyingEnemyImage,
      positionX: width,
      variationY: height / 2,
      horizontalSpriteSize: 3,
      verticalSpriteSize: 6,
      customSpriteSize: 16
    });

    const bigEnemy = new Enemy({
      delay: 200,
      spriteRatio: 0.8,
      imageSprite: bigEnemyImage,
      positionX: width,
      variationY: -15,
      horizontalSpriteSize: 5,
      verticalSpriteSize: 6,
      customSpriteSize: 28
    });

    enemies.push(enemy);
    enemies.push(flyingEnemy);
    enemies.push(bigEnemy);

    return enemies;
  }

  getRandomEnemy() {
    const min = 0;
    const max = this.enemies.length;
    const index = Math.floor(Math.random() * (max - min)) + min;
    const enemy = this.enemies[index];
  
    return enemy;
  }

  gameOver() {
    image(gameOverImage, (width - gameOverImage.width) / 2, (height - gameOverImage.height) / 2);
  }
}
