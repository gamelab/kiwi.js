/// <reference path="../../src/kiwi.ts" />
/**
* Creating a sprite
**/
class mouseButton extends Kiwi.State {

    constructor() {
        super('mouseButton');

    }

    //mouse
    myMouse: Kiwi.Input.Mouse;

    //Sprite
    mySprite: Kiwi.GameObjects.Sprite;
    spriteVisible: Kiwi.GameObjects.Sprite;

    preload() {
        ///////////////////////////////////////
        //Adding Image for Sprite to Cache
        this.addImage('mySprite', '../assets/sprite.png');
    }


    create() {
        ///////////////////////////////////////
        //Creating Sprite
        this.mySprite = new Kiwi.GameObjects.Sprite('mySprite', this.game.cache, 50, 50);
        this.spriteVisible = new Kiwi.GameObjects.Sprite('mySprite', this.game.cache, 200, 50);

        ////////////////////////////////////////
        //Creating Mouse 
        this.myMouse = this.game.input.mouse;
        this.myMouse.start();

        ////////////////////////////////////////
        //Adding to Stage
        this.addChild(this.mySprite);
        this.addChild(this.spriteVisible);

    }

    update() {
        super.update();

        if (this.myMouse.justPressed()) {

            
            if (this.mySprite.bounds.getRect().containsPoint(this.myMouse.point)) {

                console.log("inside the method - zach"  + this.spriteVisible.alpha.alpha());
                //other sprite alpha  === 100 or 0

                if (this.spriteVisible.alpha.alpha() === 1) {
                    this.spriteVisible.alpha.alpha(0);


                }
                else
                    this.spriteVisible.alpha.alpha(1);
            }



            this.myMouse.reset();





        }

    }
}