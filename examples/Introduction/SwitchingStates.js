/**
* This script is a demonstration of how you can switch between states in Kiwi.
**/
var SwitchingBetween = new Kiwi.State('SwitchingBetween');

SwitchingBetween.init = function () {
    this.game.states.addState(NightTime, false);
    this.game.stage.resize(768, 512);
}

SwitchingBetween.preload = function () {
    this.addSpriteSheet('desert', 'assets/spritesheets/desert.png', 768, 512, true);
    this.addSpriteSheet('mujahadeen', 'assets/war/characters/mujahadeen.png', 150, 117, true);
}

SwitchingBetween.create = function (dir) {
    var x = 400;
    if (dir == null)
        x = 400; else {
        if (dir === 'left')
            x = 700; else
            x = 0;
    }

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.desert, 0, 0);
    this.addChild(this.background);
    this.background.cellIndex = 1;

    this.player = new Player(this, this.textures.mujahadeen, x, 370);
    this.player.animation.add('moving', [1, 2, 3, 4, 5, 6], 0.1, true, false);
    this.player.animation.switchTo('moving', true);
    this.player.animation.stop();
    this.addChild(this.player);
    
    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Move using the left/right arrow keys!', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);
}

SwitchingBetween.update = function () {
    if (this.player.x + this.player.width < 0) {
        this.game.states.switchState('NightTime', NightTime, [], ['left']);
    } else if (this.player.x > this.game.stage.width) {
        this.game.states.switchState('NightTime', NightTime, [], ['right']);
    }

    Kiwi.State.prototype.update.call(this);
}


var Player = function(state, atlas, x, y) {
    Kiwi.GameObjects.Sprite.call(this, state, atlas, x, y);
}

Kiwi.extend(Player, Kiwi.GameObjects.Sprite);

Player.prototype.update = function () {
    if (Kiwi.DEVICE.touch == false) {
        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.A) || this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.LEFT)) {
            this.x -= 3;
            this.scaleX = -1;

            if (this.animation.isPlaying == false)
                this.animation.resume();
        } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.D) || this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.RIGHT)) {
            this.x += 3;
            this.scaleX = 1;

            if (this.animation.isPlaying == false)
                this.animation.resume();
        } else {
            if (this.animation.isPlaying == true)
                this.animation.pause();
        }
    }

    Kiwi.GameObjects.Sprite.prototype.update.call(this);
}


var NightTime = new Kiwi.State('NightTime');

NightTime.create = function (dir) {
    var x = 400;
    if (dir == null)
        x = 400; else {
        if (dir === 'left')
            x = 700; else
            x = 0;
    }

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.desert, 0, 0);
    this.addChild(this.background);

    this.player = new Player(this, this.textures.mujahadeen, x, 370);
    this.player.animation.add('moving', [1, 2, 3, 4, 5, 6], 0.1, true, false);
    this.player.animation.switchTo('moving', true);
    this.player.animation.stop();
    this.addChild(this.player);
    
    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Move using the left/right arrow keys!', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

}

NightTime.update = function () {
    if (this.player.x + this.player.width < 0) {
        this.game.states.switchState('SwitchingBetween', SwitchingBetween, [], ['left']);
    } else if (this.player.x > this.game.stage.width) {
        this.game.states.switchState('SwitchingBetween', SwitchingBetween, [], ['right']);
    }

    Kiwi.State.prototype.update.call(this);
}



//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', SwitchingBetween,  gameOptions);