/**
* This script is a demonstration of a cat (aka griffon) going back and forward.
*
* Note: A tween is the transition of numeric values between A - B, and thus in Kiwi the tweem manager handles the transition of those values.
* As such you a tween can be added to property/method as long as the value can be changed constantly.
* So think big with tweening as lots of stuff can be tweened.
*
**/
var Looping = new Kiwi.State('Looping');

Looping.init = function() {
    this.game.stage.resize(800, 250);
    this.playing = false;
    this.direction = 'right';
}

Looping.preload = function () {
    this.addSpriteSheet('cat', 'assets/spritesheets/griffon.png', 150, 117);
}

Looping.create = function () {

    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Click on the griffon to make him move.', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

    //Create our cat
    this.cat = new Kiwi.GameObjects.Sprite(this, this.textures.cat, 100, 30);

    //See animation component section about animations
    this.cat.animation.add('moving', [1, 2, 3, 4, 5, 6], 0.1, true);
    this.cat.animation.add('stop', [0], 0, false);

    this.addChild(this.cat);
    this.cat.animation.play('stop');

    //When the cat has been clicked.
    //Note: onRelease is the same as onUp. Aka onRelease is an alias for onUp.
    this.cat.input.onRelease.add(this.moveKitty, this);
}

Looping.stop = function () {
    this.cat.animation.play('stop');
    this.playing = false;
}

Looping.moveKitty = function () {
    if (!this.playing) {
        /**
        * To create a tween you need to create the tween via the manager.
        * When you create the tween you pass in the object that the tween is taking affect on.
        **/
        this.tween = this.game.tweens.create(this.cat);

        if (this.direction == 'left') {
            this.direction = 'right';
            this.cat.scaleX = -1;
            this.tween.to({ x: 100 }, 800, Kiwi.Animations.Tweens.Easing.Linear.None, true);
        } else {
            this.direction = 'left';
            this.cat.scaleX = 1;
            this.tween.to({ x: 600 }, 800, Kiwi.Animations.Tweens.Easing.Linear.None, true);
        }

        //Adding a callback to the tween.
        this.tween.onComplete(this.stop, this);

        //Start the animation. We are now playing.
        this.playing = true;
        this.cat.animation.play('moving');
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

var game = new Kiwi.Game('game', 'KiwiExample', Looping,  gameOptions);