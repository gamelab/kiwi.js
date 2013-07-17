/// <reference path="../../src/Kiwi.ts" />

/**
* Creating a sprite
**/
class addingSprite extends Kiwi.State {

    constructor() {
        super('addingSprite');

    }

    //Sprite
    public mySprite: Kiwi.GameObjects.Sprite;

    init() {
        this.game.stage.size.setTo(800, 600);
    
    }

    preload() {
        ///////////////////////////////////////
        //Adding Image for Sprite to Cache
        this.addImage('mySprite', 'assets/sprite.png');
    }


    create() {
        ///////////////////////////////////////
        //Creating Sprite
        this.mySprite = new Kiwi.GameObjects.Sprite('mySprite', this.game.cache, 50, 50);

        ////////////////////////////////////////
        //Adding to Stage
        this.addChild(this.mySprite);
        this.mySprite.position.setTo(50, 50);

    }

    update() {
        super.update();

    }
}

var game = new Kiwi.Game();

game.states.addState(addingSprite);
game.states.switchState("addingSprite");
