/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can apply transforms to a group and how it affects the gameobjects inside of it.  
**/

class GroupTransform extends Kiwi.State {

    constructor() {
        super('GroupTransform');
    }

    preload() {
        this.addSpriteSheet('snake', 'assets/spritesheets/snake.png', 150, 117);
    }
    
    snakes: Kiwi.Group;
    numSnakes: number = 50;         //number of snakes to spawn
    direction: string = 'right';    //the direction the group is facing

    create() {
          
        //to see information about animations look at the animation component section
        this.textures.snake.sequences.push(new Kiwi.Animation.Sequence('slither', [1, 2, 3, 4, 5, 6], 0.1, true));
        
        //create a new group and add it to the stage
        this.snakes = new Kiwi.Group(this);
        this.addChild(this.snakes);

        /**
        * Create some new snakes and add them all to the snakes group.
        **/
        for (var i = 0; i < this.numSnakes; i++) {

            var s = new Kiwi.GameObjects.Sprite(this, this.textures.snake, Math.random() * this.game.stage.width, Math.random() * this.game.stage.height - 117 );
            this.snakes.addChild(s);
            s.animation.play('slither');

        }
    

    }

    update() {
        super.update();

        /**
        * Move the entire group in the 'right' or 'left' direction. 
        **/
        if (this.direction == 'right') {

            this.snakes.scaleX = 1;
            this.snakes.x += 3;

            if (this.snakes.x > this.game.stage.width) {
                this.direction = 'left';
                this.snakes.x *= 2;
            }

        } else {

            this.snakes.scaleX = -1;
            this.snakes.x -= 3;

            if (this.snakes.x < -150) {
                this.direction = 'right';
                this.snakes.x -= this.game.stage.width;
            }

        }
    }

}