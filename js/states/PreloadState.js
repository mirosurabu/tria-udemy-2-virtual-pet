class PreloadState extends Phaser.State {

  init() {
    this.game.stage.backgroundColor = '#fff';

    this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);

    this.progressBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloaderBar');
    this.progressBar.anchor.setTo(0.5);
  }

  preload() {
    // Images and spritesheets path
    this.load.path = 'assets/images/';

    // Load images
    this.load.image( 'backyard', 'backyard.png'    );
    this.load.image( 'arrow',    'arrow.png'       );
    this.load.image( 'apple',    'apple.png'       );
    this.load.image( 'candy',    'candy.png'       );
    this.load.image( 'rotate',   'rotate.png'      );
    this.load.image( 'toy',      'rubber_duck.png' );

    // Load spritesheets
    this.load.spritesheet( 'pet', 'pet.png', 97, 83, 5, 1, 1 );
    
    this.load.setPreloadSprite(this.progressBar);
  }

  create() {
    this.state.start('HomeState');
  }
}
