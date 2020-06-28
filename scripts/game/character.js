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

    return collideRectRect(
      this.positionX,
      this.positionY,
      this.spriteWidthDest * this.collision.precision,
      this.spriteHeightDest * this.collision.precision,
      enemy.positionX,
      enemy.positionY,
      enemy.spriteWidthDest * enemy.collision.precision,
      enemy.spriteHeightDest * enemy.collision.precision
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
