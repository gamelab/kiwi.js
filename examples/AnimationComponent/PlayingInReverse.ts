/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can go to the reverse an animation.
**/

class PlayingInReverse extends Kiwi.State {

    constructor() {
        super('PlayingInReverse');
    }

    preload() {
        this.game.stage.resize(800, 250);
        this.addSpriteSheet('zombie', 'assets/spritesheets/zombie.png', 150, 117);
    }

    zombie: Kiwi.GameObjects.Sprite;
    walkAnim: Kiwi.Animations.Animation;

    create() {

        //add to stage
        this.zombie = new Kiwi.GameObjects.Sprite(this, this.textures.zombie, 300, 100);
        this.addChild(this.zombie);

        //add the animation and make sure save the animation that we just added.
        this.walkAnim = this.zombie.animation.add('forwards', [1, 2, 3, 4, 5, 6], 0.2, true); 
        this.zombie.animation.play('forwards');

        //when the animation gets clicked reverse it.
        this.zombie.input.onUp.add(this.reverse, this);
    }

    //reverse the animation.  If the animation is currently not playing is reverse then reverse. If it is then play in reverse.
    reverse() {
        this.walkAnim.reverse = !this.walkAnim.reverse;
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

var game = new Kiwi.Game('game', 'KiwiExample', PlayingInReverse, gameOptions );