/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can create a basic spritesheet animation.
**/

class Creation extends Kiwi.State {

    constructor() {
        super('Introduction');
    }

    preload() { 
        this.game.stage.resize(800, 250);
        this.addSpriteSheet('zombie', 'assets/spritesheets/zombie.png', 150, 117);
    }

    /**
    * A few different sprites that we will have.
    * Note that each one will be based off a different cell in the spritesheet.
    * Also when using a spritesheet you can use either the static image or sprite gameobjects BUT only the sprite will support have the animation component.
    **/
    zombie: Kiwi.GameObjects.Sprite;

    create() {
         
        //create our zombie
        this.zombie = new Kiwi.GameObjects.Sprite(this, this.textures.zombie, 100, 10);
        //add them all to the stage
        this.addChild(this.zombie); 
        
        /**
        * Now in order to animate the zombie we need firstly set up the animation.
        * 
        * This is accomplised through the animation component.
        * Method add.
        * - Parameter One - Name of the animation.
        * - Parameter Two - Cell animation order.
        * - Parameter Three - Time that the animation will take in seconds.
        * - Paramter Four - If the animation should loop or not.
        **/
        this.zombie.animation.add('walking', [1, 2, 3, 4, 5, 6], 0.1, true);

        //Play the animation that we just set-up.
        this.zombie.animation.play('walking');

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

var game = new Kiwi.Game('game', 'KiwiExample', Creation, gameOptions );