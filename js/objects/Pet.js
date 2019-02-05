class Pet extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'pet');

    // Pet statistics
    this.health = 100;
    this.fun    = 100;

    // Set the anchor to the center of the sprite
    this.anchor.setTo(0.5);

    // Add animations
    this.animations.add('funnyfaces', [1, 2, 3, 2, 1], 7, false);
    
    // Enable input and make the sprite draggable
    this.inputEnabled = true;
    this.input.enableDrag();
  }

  isDead() {
    return this.health == 0 || this.fun == 0;
  }

  addHealth(health) {
    this.health += health;
    this.health  = Math.max(this.health, 0);
  }

  addFun(fun) {
    this.fun += fun;
    this.fun  = Math.max(this.fun, 0);
  }
}
