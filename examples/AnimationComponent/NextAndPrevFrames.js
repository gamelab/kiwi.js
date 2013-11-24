/**
* This script is a demonstration of how you can go to the next/previous frame in an animation.
**/
var NextAndPrevFrames = new Kiwi.State('NextAndPrevFrames');

NextAndPrevFrames.preload = function () {
    //Resize
    this.game.stage.resize(800, 250);

    this.addSpriteSheet('characters', 'assets/spritesheets/characters.png', 150, 117);
}

NextAndPrevFrames.create = function () {
    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Click/Touch behind or front of the character to go to the next or previous frame.', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

    //Add to stage
    this.changer = new Kiwi.GameObjects.Sprite(this, this.textures.characters, 300, 30);
    this.addChild(this.changer);

    //Add click event to whole stage.
    this.game.input.onUp.add(this.released, this);
}

/**
* This is the callback for when the gameworld gets clicked.
* If the mouse's x was on the left side of the screen then it will go to the previous frame in the animation.
* If the mouse's x was on the right side of the screen then it will go to the next frame in the animation.
**/
NextAndPrevFrames.released = function (x) {
    if (x > this.game.stage.width / 2) {
        this.changer.animation.nextFrame();
    } else {
        this.changer.animation.prevFrame();
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

var game = new Kiwi.Game('game', 'KiwiExample', NextAndPrevFrames,  gameOptions);