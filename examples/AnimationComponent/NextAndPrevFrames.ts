/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can go to the next/previous frame in an animation.
**/

class NextAndPrevFrames extends Kiwi.State {

    constructor() {
        super('NextAndPrevFrames');
    }

    preload() {
        this.game.stage.resize(800, 250);
        this.addSpriteSheet('characters', 'assets/spritesheets/characters.png', 150, 117);
    }

    changer: Kiwi.GameObjects.Sprite;

    create() {

        //add to stage
        this.changer = new Kiwi.GameObjects.Sprite(this, this.textures.characters, 300, 100);
        this.addChild(this.changer);

        //add click event to whole stage.
        this.game.input.onUp.add(this.released, this);
    }

    /**
    * This is the callback for when the gameworld gets clicked.
    * If the mouse's x was on the left side of the screen then it will go to the previous frame in the animation.
    * If the mouse's x was on the right side of the screen then it will go to the next frame in the animation.
    **/
    released(x) {
        if (x > this.game.stage.width / 2) {
            this.changer.animation.nextFrame();
        } else {
            this.changer.animation.prevFrame();
        }
    }

}


//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if (typeof gameOptions  == "undefined") var gameOptions  = {};

var game = new Kiwi.Game('game', 'KiwiExample', NextAndPrevFrames, gameOptions );