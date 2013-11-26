/**
* This script is a demonstration of how you can go to the pause and resume an animation.
**/
var PausingAndResuming = new Kiwi.State('PausingAndResuming');

PausingAndResuming.preload = function () {

    //Resize
    this.game.stage.resize(800, 250);

    this.addSpriteSheet('zombie', 'assets/spritesheets/zombie.png', 150, 117);
}

PausingAndResuming.create = function () {
    //The text
    var text = new Kiwi.GameObjects.Textfield(this, 'Click anywhere to start or stop the zombie!', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

    //Create the zombag
    this.zombie = new Kiwi.GameObjects.Sprite(this, this.textures.zombie, 300, 30);
    this.addChild(this.zombie);

    //Run zombag RUN!
    this.zombie.animation.add('running!', [0, 1, 2, 3, 4, 5, 6], 0.1, true);
    this.zombie.animation.play('running!');

    //When someone clicks on the screen then either pause or resume the animation based off what the animation was doing.
    this.game.input.onUp.add(this.released, this);
}

//Callback for when someone clicks on the screen.
PausingAndResuming.released = function () {
    if (this.zombie.animation.isPlaying) {
        this.zombie.animation.pause();
    } else {
        this.zombie.animation.resume();
    }
}


//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', PausingAndResuming,  gameOptions);