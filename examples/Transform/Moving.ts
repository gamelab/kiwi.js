/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can moving a entity in Kiwi. 
* This can be any entity! 
* Meaning it could be a static image or a sprite.  
**/

class Moving extends Kiwi.State {

    constructor() {
        super('Moving');
    }

    preload() { 
        this.addSpriteSheet('snake', 'assets/spritesheets/snake.png', 150, 117);
    }
     
    snakeA: Kiwi.GameObjects.Sprite; 
    snakeB: Kiwi.GameObjects.StaticImage;

    create() {

        /**
        * When you want to scale an entity down you can access the transform property that is located on every entity. 
        * Note: Some entities have the scaleX/scaleY aliased for ease of use.
        **/

        //to see information about animations look at the animation component section
        this.textures.snake.sequences.push(new Kiwi.Animations.Sequence('slither', [1, 2, 3, 4, 5, 6], 0.1, true));

        this.snakeA = new Kiwi.GameObjects.Sprite(this, this.textures.snake);                  //create the snake
        this.addChild(this.snakeA);
        this.snakeA.transform.x = 400;
        this.snakeA.transform.y = 300;

        this.snakeB = new Kiwi.GameObjects.StaticImage(this, this.textures.snake, 400, 200);
        this.addChild(this.snakeB);
        this.snakeB.transform.x = 100;
        this.snakeB.y = 50;             //shorthand
    }
    
}