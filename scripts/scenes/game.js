class Game {
  constructor() {
    this.scenario;
    this.character;
    this.score;
    this.currentEnemy;

    this.map = [];
    this.enemies = [];
  }

  setup() {
    this.scenario = this.generateScenario();
    this.score = new Score();
    this.life = new Life();
    this.character = this.generateCharacter();
    this.enemies = this.generateEnemies();
    this.map = this.generateMap();

    this.currentEnemy = this.getRandomEnemy();
  }

  draw() {
    this.scenario.show();
    this.scenario.move();
  
    this.score.show();
    this.score.addPoints();
 
    this.life.draw();

    this.character.show();
    this.character.applyGravity();
  
    this.currentEnemy.show();
    this.currentEnemy.move();

    if (this.life.currentLife === 0) {
      this.gameOver();
    }
  
    if (this.character.isColleded(this.currentEnemy)) {
      this.life.removeLife();
      this.character.temporarilyInvincible();
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

  generateScenario() {
    return new Scenario({
      image: scenarioImage,
      velocity: 3
    });
  }

  generateCharacter() {
    return new Character({
      jumpSound,
      spriteRatio: 0.8,
      imageSprite: characterImage,
      variationY: 25,
      horizontalSpriteSize: 4,
      verticalSpriteSize: 4
    });
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

  generateMap() {
    return [
      {
        enemy: this.enemies[0],
        velocity: 10
      },
      {
        enemy: this.enemies[2],
        velocity: 30
      },
      {
        enemy: this.enemies[2],
        velocity: 15
      },
      {
        enemy: this.enemies[1],
        velocity: 40
      }
    ];
  }

  getRandomEnemy() {
    const min = 0;
    const max = this.enemies.length;
    const index = Math.floor(Math.random() * (max - min)) + min;
    const enemy = this.enemies[index];
  
    return enemy;
  }

  gameOver() {
    noLoop();
    image(gameOverImage, (width - gameOverImage.width) / 2, (height - gameOverImage.height) / 2);
  }
}
