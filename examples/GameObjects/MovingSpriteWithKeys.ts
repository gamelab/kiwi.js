/// <reference path="../../src/Kiwi.ts" />

/**
* Moving a sprite with keys
**/
class MovingSpriteWithKeys extends Kiwi.State {

    constructor() {
        super('movingSpriteWithKeys');

    }

    //keys
    leftKey: Kiwi.Input.Key;
    rightKey: Kiwi.Input.Key;
    downKey: Kiwi.Input.Key;
    upKey: Kiwi.Input.Key;

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
        this.mySprite = new Kiwi.GameObjects.Sprite('mySprite', this.game.cache, 50, 50);

        ///////////////////////////////////////
        //Creating keys
        this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.RIGHT);
        this.upKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.UP);
        this.downKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.DOWN);

        ////////////////////////////////////////
        //Adding to Stage
        this.addChild(this.mySprite);

    }

    update() {
        super.update();

        ///////////////////////////////////////////
        ///Checks if any of the arrow keys are down

        if (this.leftKey.isDown)
            this.mySprite.transform.x -= 2;
        else if (this.rightKey.isDown)
            this.mySprite.transform.x += 2;
        else if (this.upKey.isDown)
            this.mySprite.transform.y -= 2;
        else if (this.downKey.isDown)
            this.mySprite.transform.y += 2;

    }
}