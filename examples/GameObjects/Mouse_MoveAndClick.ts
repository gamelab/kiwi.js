/// <reference path="../../src/Kiwi.ts" />


/**
* Moving a sprite with keys
**/
class myState extends Kiwi.State {

    constructor() {
        super('myState');

    }

    //keys
    myMouse: Kiwi.Input.Mouse;

    //Sprite
    mySprite: Kiwi.GameObjects.Sprite;
    
    preload() {
        ///////////////////////////////////////
        //Adding Image for Sprite to Cache
        this.addImage('mySprite', 'assets/sprite.png');
    }


    create() {
        ///////////////////////////////////////
        //Creating Sprite
        this.mySprite = new Kiwi.GameObjects.Sprite('mySprite', game.cache, 50, 50);

        ///////////////////////////////////////
        //Creating mouse
        this.myMouse = this.game.input.mouse;
        this.myMouse.start();

        ////////////////////////////////////////
        //Adding to Stage
        this.addChild(this.mySprite);

    }

    update() {
        super.update();

        ///////////////////////////////////////////
        ///Moves sprite to mouse position
        this.mySprite.position.x(this.myMouse.x() - 25);
        this.mySprite.position.y(this.myMouse.y() - 25);



        //////////////////////////////////////////
        //Detects mouse clicks
        if (this.myMouse.justPressed()) {
                if (this.mySprite.alpha.alpha() === 1) {
                    this.mySprite.alpha.alpha(0);
                }
                else
                    this.mySprite.alpha.alpha(1);

            this.myMouse.reset();

        }





    }
}

var game = new Kiwi.Game();

game.states.addState(myState);
game.states.switchState("myState");