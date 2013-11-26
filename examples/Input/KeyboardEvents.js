/**
* This script is a demonstration of how you can listen for keyboard events.
**/
var KeyboardEvents = new Kiwi.State('KeyboardEvents');

KeyboardEvents.preload = function () {
    this.game.stage.resize(800, 350);
    this.addSpriteSheet('choppa', 'assets/war/characters/choppa.png', 150, 117);
}

KeyboardEvents.create = function () {
    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Use the WASD keys to move the Choppa.', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);
  
    this.left = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
    this.right = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);
    this.up = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.W);
    this.down = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S);

    this.choppa = new Kiwi.GameObjects.Sprite(this, this.textures.choppa, 200, 200);
    this.addChild(this.choppa);

    this.choppaAnimation = this.choppa.animation.add('moving', [1, 2, 3, 4, 5, 6], 0.05, true, true);

    if (Kiwi.DEVICE.touch) {
        var text = new Kiwi.GameObjects.Textfield(this, 'In order to properly use this example you need a keyboard :(', this.game.stage.width / 2, this.game.stage.height / 3, '#000', 16);
        text.textAlign = 'center';
        this.addChild(text);
    } 
    
}

//Update loop
KeyboardEvents.update = function () {
    Kiwi.State.prototype.update.call(this);

    if (Kiwi.DEVICE.touch == false) {
        var x = 0;
        var y = 0;
        var update = false;

        if (this.left.isDown) {
            x -= 3;
            update = true;
            this.choppa.rotation = -(Math.PI / 12);
        }
        if (this.right.isDown) {
            x += 3;
            this.choppa.rotation = Math.PI / 12;
            update = true;
        }
        if (this.down.isDown) {
            y += 3;
            update = true;
            this.choppaAnimation.speed = 0.15;
        } else if (this.up.isDown) {
            y -= 3;
            this.choppaAnimation.speed = 0.05;
            update = true;
        }

        if (!update) {
            this.choppaAnimation.speed = 0.1;
            this.choppa.rotation = 0;
        }

        this.choppa.x += x;
        this.choppa.y += y;
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

var game = new Kiwi.Game('game', 'KiwiExample', KeyboardEvents,  gameOptions);