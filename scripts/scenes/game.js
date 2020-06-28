class Game {
  constructor() {
    this.scenario;
    this.score;
    this.life;
    this.timelineMap = gameConfig.timelineMap;
    this.indexTimelineMap = 0;
    this.itemTimelineMap;
    this.character;
    this.enemies = [];
    this.currentEnemy;
  }

  setup() {
    collideDebug(true);

    this.scenario = this.generateScenario();
    this.score = new Score();
    this.life = new Life();
    this.character = this.generateCharacter();
    this.enemies = this.generateEnemies();
  }

  draw() {
    this.scenario.show();
    this.scenario.move();
  
    this.score.show();
    this.score.addPoints();
 
    this.life.draw();

    this.character.show();
    this.character.applyGravity();

    this.itemTimelineMap = this.timelineMap[this.indexTimelineMap];
  
    this.currentEnemy = this.enemies[this.itemTimelineMap.enemy];
    this.currentEnemy.moveVelocity = this.itemTimelineMap.velocity;

    this.currentEnemy.show();
    this.currentEnemy.move();

    // if (this.life.currentLife === 0) {
    //   this.gameOver();
    // }

    if (this.character.isCollided(this.currentEnemy)) {
      this.life.removeLife();
      this.character.temporarilyInvincible();
    }

    if (!this.currentEnemy.isVisible) {
      this.currentEnemy.reinitiate();

      this.indexTimelineMap++;
      if (this.indexTimelineMap >= this.timelineMap.length) {
        this.indexTimelineMap = 0;
      }
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
      spriteRatio: 0.4,
      imageSprite: characterImage,
      variationY: 25,
      horizontalSpriteSize: 5,
      verticalSpriteSize: 2,
      collision: {
        precision: 1
      }
    });
  }

  generateEnemies() {
    const enemies = [];

    const enemy = new Enemy({
      spriteRatio: 0.9,
      imageSprite: enemyImage,
      positionX: width,
      variationY: 25,
      horizontalSpriteSize: 4,
      verticalSpriteSize: 7,
      collision: {
        precision: 0.7
      }
    });

    const flyingEnemy = new Enemy({
      spriteRatio: 0.9,
      imageSprite: flyingEnemyImage,
      positionX: width,
      variationY: height / 2,
      horizontalSpriteSize: 3,
      verticalSpriteSize: 6,
      customSpriteSize: 16,
      collision: {
        precision: 0.7
      }
    });

    const bigEnemy = new Enemy({
      spriteRatio: 0.8,
      imageSprite: bigEnemyImage,
      positionX: width,
      variationY: -15,
      horizontalSpriteSize: 5,
      verticalSpriteSize: 6,
      customSpriteSize: 28,
      collision: {
        precision: 0.7
      }
    });

    enemies.push(enemy);
    enemies.push(flyingEnemy);
    enemies.push(bigEnemy);

    return enemies;
  }

  gameOver() {
    noLoop();
    image(gameOverImage, (width - gameOverImage.width) / 2, (height - gameOverImage.height) / 2);
  }
}
