/// <reference path="../../src/Kiwi.ts" />

/**
* Creating a sprite
**/
class AddingSprite extends Kiwi.State {

    constructor() {
        super('AddingSprite');

    }

    //Sprite
    public mySprite: Kiwi.GameObjects.Sprite;

    init() {
    }

    preload() {
        ///////////////////////////////////////
        //Adding Image for Sprite to Cache
        this.addImage('mySprite', 'assets/sprite.png');
    }


    create() {
        ///////////////////////////////////////
        //Creating Sprite
        this.mySprite = new Kiwi.GameObjects.Sprite(this,this.textures.mySprite, 50, 50);

        ////////////////////////////////////////
        //Adding to Stage
        this.addChild(this.mySprite);
       // this.mySprite.position.setTo(50, 50);

    }

    update() {
        super.update();

    }
}