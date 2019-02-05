class HomeState extends Phaser.State {

  init(message) {
    if (!message) {
      this.message = '';
      return;
    }

    this.message = message;
  }

  create() {
    // Create background
    this.bg = new Phaser.Sprite(this.game, 0, 0, 'backyard');
    this.bg.inputEnabled = true;
    this.bg.events.onInputDown.add(() => {
      this.state.start('PlayState');
    });

    var textStyle = {font: '35px Arial', fill: '#fff'};
    this.txtStart   = new Phaser.Text(this.game, 30, this.world.centerY + 200, 'TOUCH TO START', textStyle);
    this.txtMessage = new Phaser.Text(this.game, 60, this.world.centerY - 200, this.message,     textStyle);

    // Add game objects to the world
    this.world.addChild(this.bg);
    this.world.addChild(this.txtStart);
    this.world.addChild(this.txtMessage);
  }
}
