/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can add callbacks to animation items.
**/

class AddingCallbacks extends Kiwi.State {

    constructor() {
        super('AddingCallbacks');
    }

    preload() {
        this.game.stage.resize(800, 250);
        this.addSpriteSheet('zombie', 'assets/spritesheets/zombie.png', 150, 117);
    }

    zombie: Kiwi.GameObjects.Sprite;
    currentAnimation: string;       //for us to keep track of which animation is currently playing

    create() {

        //create our sprite
        this.zombie = new Kiwi.GameObjects.Sprite(this,this.textures.zombie, 100, 10);

        //add some animations to the zombag and keep a reference to the animations
        var ex = this.zombie.animation.add('explode', [1, 11, 12, 13, 14, 15], 0.1, false);
        var re = this.zombie.animation.add('rebuild', [15, 14, 13, 12, 11, 1], 0.1, false);

        /**
        * Using the animation references, add a callback to each one when they stop.
        *
        * Note: 'onStop' is a signal event that gets fired when an animation stops playing. 
        * There are also:
        * - onPlay
        * - onUpdate
        * - onLoop
        **/
        ex.onStop.add(this.switchAnim, this);
        re.onStop.add(this.switchAnim, this);
        
        //add zombag to screen
        this.addChild(this.zombie);
        
        //play the animation
        this.zombie.animation.play('explode');
        this.currentAnimation = 'explode';
    }

    /**
    * This is the method that should be called When one of the animations stops. All it does is switch to the next one.
    **/
    switchAnim() {

        if (this.currentAnimation == 'rebuild') {
            this.currentAnimation = 'explode';
            this.zombie.animation.play('explode');

        } else {
            this.currentAnimation = 'rebuild';
            this.zombie.animation.play('rebuild');

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

var game = new Kiwi.Game('game', 'KiwiExample', AddingCallbacks, gameOptions );