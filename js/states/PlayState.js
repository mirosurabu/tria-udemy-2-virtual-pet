class PlayState extends Phaser.State {

  create() {
    // Create background
    this.bg = new Phaser.Sprite(this.game, 0, 0, 'backyard');
    this.bg.inputEnabled = true;
    this.bg.events.onInputDown.add(this.onBackground, this);

    // Create pet
    this.pet = new Pet(this.game, 100, 400);

    // Create apple button
    this.btnApple = new Phaser.Sprite(this.game, 72, 570, 'apple');
    this.btnApple.anchor.setTo(0.5);
    this.btnApple.inputEnabled = true;
    this.btnApple.events.onInputDown.add(this.onButton, this);
    this.btnApple.customParams = {health: +10, fun: 0};

    // Create candy button
    this.btnCandy = new Phaser.Sprite(this.game, 144, 570, 'candy');
    this.btnCandy.anchor.setTo(0.5);
    this.btnCandy.inputEnabled = true;
    this.btnCandy.events.onInputDown.add(this.onButton, this);
    this.btnCandy.customParams = {health: -10, fun: +10};

    // Create toy button
    this.btnToy = new Phaser.Sprite(this.game, 216, 570, 'toy');
    this.btnToy.anchor.setTo(0.5);
    this.btnToy.inputEnabled = true;
    this.btnToy.events.onInputDown.add(this.onButton, this);
    this.btnToy.customParams = {health: 0, fun: +20};

    // Create rotate button
    this.btnRotate = new Phaser.Sprite(this.game, 288, 570, 'rotate');
    this.btnRotate.anchor.setTo(0.5);
    this.btnRotate.inputEnabled = true;
    this.btnRotate.events.onInputDown.add(this.onButton, this);

    // Create text fields
    var textStyle = {font: '20px Arial', fill: '#fff'};
    this.txtHealthCaption = new Phaser.Text(this.game,  10, 10, 'Health:', textStyle);
    this.txtHealth        = new Phaser.Text(this.game,  80, 10, '',        textStyle);
    this.txtFunCaption    = new Phaser.Text(this.game, 140, 10, 'Fun:',    textStyle);
    this.txtFun           = new Phaser.Text(this.game, 185, 10, '',        textStyle);
    this.updateText();

    // Create buttons array
    this.buttons = [this.btnApple, this.btnCandy, this.btnToy, this.btnRotate];

    // Selected item is initially set to nothing
    this.setSelectedButton(null);

    // UI is initially set to not blocked
    this.uiBlocked = false;

    // Create every-five-seconds event handler (for simulation)
    this.game.time.events.loop(5000, this.everyFiveSeconds, this);

    // Add game objects to the world
    this.world.addChild(this.bg);
    this.world.addChild(this.pet);
    this.world.addChild(this.btnApple);
    this.world.addChild(this.btnCandy);
    this.world.addChild(this.btnToy);
    this.world.addChild(this.btnRotate);
    this.world.addChild(this.txtHealthCaption);
    this.world.addChild(this.txtHealth);
    this.world.addChild(this.txtFunCaption);
    this.world.addChild(this.txtFun);
  }

  onButton(button, event) {
    if (this.uiBlocked) {
      return;
    }

    this.setSelectedButton(button);

    if (button == this.btnRotate) {
      this.onRotate();
    }
  }

  onRotate() {
    // The UI is set to blocked
    this.uiBlocked = true;

    // Rotate the pet
    var petRotation = this.game.add.tween(this.pet);
    petRotation.to({angle: +720}, 1000);
    petRotation.onComplete.add(() => {
      if (this.pet.isDead()) {
        return;
      }

      this.uiBlocked = false;
      this.setSelectedButton(null);
      this.pet.addFun(10);
      this.updateText();

      this.checkDeath();
    });
    petRotation.start();
  }

  onBackground(bg, event) {
    // If nothing is selected, nothing happens
    if (this.selectedButton == null) {
      return;
    }

    // If rotate button is selected, nothing happens
    if (this.selectedButton == this.btnRotate) {
      return;
    }

    // If UI is blocked, nothing happens
    if (this.uiBlocked) {
      return;
    }

    // Get x and y coordinates of mouse position
    var x = event.position.x;
    var y = event.position.y;

    // Spawn new item at mouse position
    var newItem = this.game.add.sprite(x, y, this.selectedButton.key);
    newItem.anchor.setTo(0.5);
    newItem.customParams = this.selectedButton.customParams;

    // Move the pet towards the spawned item
    var petMovement = this.game.add.tween(this.pet);
    petMovement.to({x: x, y: y}, 700, Phaser.Easing.Cubic.Out);
    petMovement.onComplete.add(() => {
      newItem.destroy();
      this.uiBlocked = false;

      this.pet.play('funnyfaces');

      this.pet.addFun(newItem.customParams.fun);
      this.pet.addHealth(newItem.customParams.health);
      this.updateText();

      this.checkDeath();
    });
    petMovement.start();

    this.uiBlocked = true;
  }

  everyFiveSeconds() {
    if (this.pet.isDead()) {
      return;
    }

    this.pet.addFun(-10);
    this.pet.addHealth(-15);
    this.updateText();

    this.checkDeath();
  }

  checkDeath() {
    if (!this.pet.isDead()) {
      return;
    }

    this.pet.animations.stop();
    this.pet.frame = 4;
    this.pet.inputEnabled = false;
    this.uiBlocked = true;

    this.game.time.events.add(2000, () => {
      this.game.state.start('HomeState', true, false, 'GAME OVER!');
    });
  }

  setSelectedButton(selectedItem) {
    this.selectedButton = selectedItem;
    for (let button of this.buttons) {
      button.alpha = button == this.selectedButton ? 0.4 : 1;
    }
  }

  updateText() {
    this.txtHealth.setText(this.pet.health);
    this.txtFun.setText(this.pet.fun);
  }
}
