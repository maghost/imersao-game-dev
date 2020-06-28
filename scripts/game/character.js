class Character extends SpriteAnimation {
  constructor({ jumpSound, gravity = 5, jumpHeight = 50, ...rest }) {
    super(rest);

    this.jumpSound = jumpSound;
    this.gravity = gravity;
    this.jumpHeight = jumpHeight;
    this.jumpVelocity = 0;
    this.jumps = 0;
    this.maxJumps = 2;
    this.isInvencible = false;

    this.actionsByKey = {
      'ArrowUp': () => this.jump()
    };

    this.collision.coordinates = [
      { x: 51, y: 2 },
      { x: 81, y: 3 },
      { x: 95, y: 13 },
      { x: 97, y: 24 },
      { x: 94, y: 41 },
      { x: 87, y: 47 },
      { x: 65, y: 47 },
      { x: 66, y: 54 },
      { x: 61, y: 65 },
      { x: 73, y: 77 },
      { x: 86, y: 83 },
      { x: 91, y: 90 },
      { x: 64, y: 94 },
      { x: 58, y: 79 },
      { x: 44, y: 71 },
      { x: 20, y: 80 },
      { x: 5, y: 91 },
      { x: 0, y: 85 },
      { x: 9, y: 65 },
      { x: 8, y: 56 },
      { x: 27, y: 46 },
      { x: 38, y: 42 },
      { x: 36, y: 28 },
      { x: 43, y: 19 },
      { x: 41, y: 4 },
    ];
  }

  temporarilyInvincible() {
    this.isInvencible = true;

    setTimeout(() => this.isInvencible = false, 1500);
  }

  jump() {
    if (this.jumps >= this.maxJumps) return;

    this.jumps++;
    this.jumpVelocity = -this.jumpHeight;
    this.jumpSound.play();
  }

  applyGravity() {
    this.positionY = this.positionY + this.jumpVelocity;
    this.jumpVelocity = this.jumpVelocity + this.gravity;

    if (this.positionY > this.initialY) {
      this.positionY = this.initialY;
      this.jumps = 0;
    }
  }

  isCollided(enemy) {
    this._renderCollision(enemy);

    if (this.isInvencible) return false;

    const characterWidthCollision = this.spriteWidthDest * this.collision.precision;
    const characterHeightCollision = this.spriteHeightDest * this.collision.precision;
    const enemyWidthCollision = enemy.spriteWidthDest * enemy.collision.precision;
    const enemyHeightCollision = enemy.spriteHeightDest * enemy.collision.precision;

    return collideRectRect(
      this.positionX + (this.spriteWidthDest - characterWidthCollision) / 2,
      this.positionY + (this.spriteHeightDest - characterHeightCollision) / 2,
      characterWidthCollision,
      characterHeightCollision,
      enemy.positionX + (enemy.spriteWidthDest - enemyWidthCollision) / 2,
      enemy.positionY + (enemy.spriteHeightDest - enemyHeightCollision) / 2,
      enemyWidthCollision,
      enemyHeightCollision
    );
  }

  _renderCollision(enemy) {
    noFill();
    stroke(color(this.isInvencible ? "red" : "black"));

    const characterWidthCollision = this.spriteWidthDest * this.collision.precision;
    const characterHeightCollision = this.spriteHeightDest * this.collision.precision;
    rect(
      this.positionX + (this.spriteWidthDest - characterWidthCollision) / 2,
      this.positionY + (this.spriteHeightDest - characterHeightCollision) / 2,
      this.spriteWidthDest * this.collision.precision,
      this.spriteHeightDest * this.collision.precision
    );

    if (this.collision.precision !== 0) {
      stroke(color("blue"));
      rect(
        enemy.positionX,
        enemy.positionY,
        enemy.spriteWidthDest,
        enemy.spriteHeightDest
      );
    }

    beginShape();
    for(let i = 0; i < this.collision.coordinates.length; i++) {
      vertex(
        this.positionX + (this.spriteWidthDest * (this.collision.coordinates[i].x / 100)),
        this.positionY + (this.spriteHeightDest * (this.collision.coordinates[i].y / 100))
      );
    }
    endShape(CLOSE);

    stroke(color(this.isInvencible ? "red" : "black"));
    const enemyWidthCollision = enemy.spriteWidthDest * enemy.collision.precision;
    const enemyHeightCollision = enemy.spriteHeightDest * enemy.collision.precision;
    rect(
      enemy.positionX + (enemy.spriteWidthDest - enemyWidthCollision) / 2,
      enemy.positionY + (enemy.spriteHeightDest - enemyHeightCollision) / 2,
      enemy.spriteWidthDest * enemy.collision.precision,
      enemy.spriteHeightDest * enemy.collision.precision
    );

    if (enemy.collision.precision !== 0) {
      stroke(color("yellow"));
      rect(
        enemy.positionX,
        enemy.positionY,
        enemy.spriteWidthDest,
        enemy.spriteHeightDest
      );
    }
  }
}
