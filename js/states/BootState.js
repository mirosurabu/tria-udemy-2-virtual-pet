class BootState extends Phaser.State {

  init() {
    this.scale.scaleMode             = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically   = true;
  }

  preload() {
    this.load.path = 'assets/images/';
    this.load.image('preloaderBar', 'bar.png' );
    this.load.image('logo',         'logo.png');
  }

  create() {
    this.state.start('PreloadState');
  }

}
