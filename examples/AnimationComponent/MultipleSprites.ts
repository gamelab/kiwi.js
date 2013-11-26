/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can add the same animation to multiple sprites.
* Also shows how you have multiple sprites using different animations.
**/

class MultipleSprites extends Kiwi.State {

    constructor() {
        super('MultipleSprites');
    }

    preload() {
        this.game.stage.resize(800, 250);
        this.addSpriteSheet('zombie', 'assets/spritesheets/zombie.png', 150, 117);
    }

    /**
    * All of the zombies that we are going to have on screen.
    **/
    public zombieA: Kiwi.GameObjects.Sprite;
    public zombieB: Kiwi.GameObjects.Sprite;
    public zombieC: Kiwi.GameObjects.Sprite;
    
    create() {

        /**
        * This is another way we can add a animation. This way adds a sequence to the texture.
        * So when the sprite is created it automatically adds the sequence to the animation component. 
        * This way we dont have to recreate each animation for each one if we didnt want to.
        **/
        this.textures.zombie.sequences.push(new Kiwi.Animations.Sequence('walkright', [1, 2, 3, 4, 5, 6], 0.1, true));
        this.textures.zombie.sequences.push(new Kiwi.Animations.Sequence('liedown', [0, 7, 8], 0.15, false));
        this.textures.zombie.sequences.push(new Kiwi.Animations.Sequence('explode', [11, 12, 13, 14, 15], 0.05, false));

        //create the zombies
        this.zombieA = new Kiwi.GameObjects.Sprite(this,this.textures.zombie, 100, 10);
        this.zombieB = new Kiwi.GameObjects.Sprite(this,this.textures.zombie, 300, 10);
        this.zombieC = new Kiwi.GameObjects.Sprite(this,this.textures.zombie, 500, 10);
        
        //add the zombies
        this.addChild(this.zombieA);
        this.addChild(this.zombieB);
        this.addChild(this.zombieC); 

        //when each one gets click play the animation. 
        //For information about the input component see the examples about it.
        this.zombieA.input.onRelease.addOnce(this.walk, this); 
        this.zombieB.input.onRelease.addOnce(this.liedown, this);
        this.zombieC.input.onRelease.addOnce(this.explode, this);
    }

    //plays the walking cycle on the first zombie
    walk() {
        this.zombieA.animation.play('walkright');
    }

    //plays the lie down.
    liedown() {
        this.zombieB.animation.play('liedown');
    }

    //BOOM 
    explode() {
        this.zombieC.animation.play('explode');
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

var game = new Kiwi.Game('game', 'KiwiExample', MultipleSprites, gameOptions );