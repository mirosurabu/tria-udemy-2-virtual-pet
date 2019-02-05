class PetGame extends Phaser.Game {
  constructor(width, height) {
    super(width, height, Phaser.AUTO);

    this.state.add( 'BootState',    BootState    );
    this.state.add( 'PreloadState', PreloadState );
    this.state.add( 'HomeState',    HomeState    );
    this.state.add( 'PlayState',    PlayState    );
    this.state.start('BootState');
  }
}

PetGame.create = function(width, height) {
  return new PetGame(width, height);
}
