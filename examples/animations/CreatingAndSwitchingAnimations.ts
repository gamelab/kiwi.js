/// <reference path="../../src/Kiwi.ts" />

class CreatingAndSwitchingAnimations extends Kiwi.State { 

    constructor() {
        super("Creating_SwitchingAnimations");
        
    }

    sprite: Kiwi.GameObjects.Sprite;

    //mouse
    myMouse: Kiwi.Input.Mouse;

    preload() {

        this.addSpriteSheet('coin', 'assets/coin.png', 32, 32);

    }

    create() {

        this.sprite = new Kiwi.GameObjects.Sprite('coin', this.game.cache, 100, 100);

        this.sprite.animation.add('rotateLeft', 0.1, [0, 1, 2, 3, 4, 5], Kiwi.Anims.PLAY_LOOP);
        this.sprite.animation.add('rotateRight', 0.1, [5, 4, 3, 2, 1, 0], Kiwi.Anims.PLAY_LOOP);

        this.sprite.animation.play('rotateLeft');

        this.addChild(this.sprite);

        

        ////////////////////////////////////////
        //Creating Mouse 
        this.myMouse = this.game.input.mouse;
        this.myMouse.start();
    }

    update() {
        super.update();



        if (this.myMouse.justPressed()) {

            this.sprite.animation.switchTo('rotateRight');

            this.myMouse.reset();
        }

    }

}

