/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can go to the pause and resume an animation.
**/

class PausingAndResuming extends Kiwi.State {

    constructor() {
        super('PausingAndResuming');
    }

    preload() {
        this.game.stage.resize(800, 250);
        this.addSpriteSheet('zombie', 'assets/spritesheets/zombie.png', 150, 117);
    }

    public zombie: Kiwi.GameObjects.Sprite;

    create() {

        //create
        this.zombie = new Kiwi.GameObjects.Sprite(this, this.textures.zombie, 10, 10);
        this.addChild(this.zombie);

        this.zombie.animation.add('running!', [0, 1, 2, 3, 4, 5, 6], 0.1, true);
        this.zombie.animation.play('running!');

        //when someone clicks on the screen then either pause or resume the animation based off what the animation was doing. 
        this.game.input.onUp.add(this.released, this);
    }

    //callback for when someone clicks on the screen.
    released() {
        if (this.zombie.animation.isPlaying) {
            this.zombie.animation.pause();
        } else {
            this.zombie.animation.resume();
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
if (typeof gameOptions == "undefined") var gameOptions  = {};

var game = new Kiwi.Game('game', 'KiwiExample', PausingAndResuming, gameOptions );