/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can scale a entity in Kiwi. 
* This can be any entity! 
* Meaning it could be a static image or a sprite.  
**/

class Scaling extends Kiwi.State {

    constructor() {
        super('Scaling');
    }
    
    preload() { 
        this.game.stage.resize(800, 250);
        this.addSpriteSheet('snake', 'assets/spritesheets/snake.png', 150, 117);
    }
     
    snakeA: Kiwi.GameObjects.Sprite; 
    snakeB: Kiwi.GameObjects.StaticImage;
    snakeC: Kiwi.GameObjects.Sprite;

    create() {
        
        /**
        * When you want to scale an entity down you can access the transform property that is located on every entity. 
        * Note: Some entities have the scaleX/scaleY aliased for ease of use.
        **/
        
        //to see information about animations look at the animation component section
        this.textures.snake.sequences.push(new Kiwi.Animations.Sequence('slither', [1, 2, 3, 4, 5, 6], 0.1, true));

        this.snakeA = new Kiwi.GameObjects.Sprite(this, this.textures.snake, 10, 300);                  //create the snake
        this.addChild(this.snakeA);
        this.snakeA.transform.scale = 0.5; 
        this.snakeA.animation.play('slither');

        this.snakeB = new Kiwi.GameObjects.StaticImage(this, this.textures.snake, 400, 200);
        this.addChild(this.snakeB);
        this.snakeB.transform.scaleY = 1.5;

        this.snakeC = new Kiwi.GameObjects.Sprite(this, this.textures.snake, 250, 10);
        this.addChild(this.snakeC);
        this.snakeC.scaleX = 0.5;       //shortcut/shorthand way
        this.snakeC.animation.play('slither');
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

var game = new Kiwi.Game('game', 'KiwiExample', Scaling, gameOptions );