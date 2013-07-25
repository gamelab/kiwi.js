/// <reference path="../../src/Kiwi.ts" />

class PlayOnceAndLoop extends Kiwi.State {

    constructor() {
        super("PlayOnce_Loop");
        
    }

    spriteLoop: Kiwi.GameObjects.Sprite;
    spriteOnce: Kiwi.GameObjects.Sprite;


    preload() {

        this.addSpriteSheet('coin', 'assets/coin.png', 32, 32);

    }

    create() {

        this.spriteLoop = new Kiwi.GameObjects.Sprite('coin', this.game.cache, 100, 100);
       this.spriteOnce = new Kiwi.GameObjects.Sprite('coin', this.game.cache, 200, 100);


        this.spriteLoop.animation.add('rotateLeft', 0.1, [0, 1, 2, 3, 4, 5], Kiwi.Anims.PLAY_LOOP);
        this.spriteOnce.animation.add('rotateRight', 0.1, [5, 4, 3, 2, 1, 0], Kiwi.Anims.PLAY_ONCE);

        this.spriteLoop.animation.play('rotateLeft');
        this.spriteOnce.animation.play('rotateRight');

        this.addChild(this.spriteLoop);
        this.addChild(this.spriteOnce);

        

    }

    update() {
        super.update();


    }

}

