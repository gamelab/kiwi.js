/// <reference path="../../kiwi/kiwi.ts" />
/**
* Creating a sprite
**/
class addingSpriteState extends Kiwi.State {

    constructor() {
        super('addingSpriteState');

    }

    //Sprite
    mySprite: Kiwi.GameObjects.Sprite;

    preload() {
        ///////////////////////////////////////
        //Adding Image for Sprite to Cache
        this.addImage('mySprite', '../assets/sprite.png');
    }


    create() {
        ///////////////////////////////////////
        //Creating Sprite
        this.mySprite = new Kiwi.GameObjects.Sprite('mySprite', game.cache, 50, 50);

        ////////////////////////////////////////
        //Adding to Stage
        this.addChild(this.mySprite);

    }

    update() {
        super.update();

    }
}

var game = new Kiwi.Game();

game.states.addState(addingSpriteState);
game.states.switchState("addingSpriteState");