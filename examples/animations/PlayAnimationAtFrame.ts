/// <reference path="../../src/Kiwi.ts" />

class PlayAnimationAtFrame extends Kiwi.State {

    constructor() {
        super("PlayAnimationAtFrame");
    }

    sprite: Kiwi.GameObjects.Sprite;
    animation: string;

    preload() {

        this.addSpriteSheet('coin', 'assets/coin.png', 32, 32);

    }

    create() {

        this.sprite = new Kiwi.GameObjects.Sprite('coin', this.game.cache, 100, 100);

        this.sprite.animation.add('rotateLeft', 0.1, [0, 1, 2, 3, 4, 5], Kiwi.Anims.PLAY_LOOP);
        this.sprite.animation.add('rotateRight', 0.1, [5, 4, 3, 2, 1, 0], Kiwi.Anims.PLAY_LOOP);

        this.sprite.animation.play('rotateLeft');
        this.animation = 'rotateLeft';
        this.addChild(this.sprite);

        ////////////////////////////////////////
        //Creating Mouse 
        this.game.input.mouse.mouseUp.add(this.swap, this);
    }

    swap() {
        
        if (this.animation == 'rotateLeft') {
            this.animation = 'rotateRight';
        } else {
            this.animation = 'rotateLeft';
        }

        var point = (6 - this.sprite.animation.getFrame().position) - 1;
        
        this.sprite.animation.switchTo(this.animation);
        this.sprite.animation.playAt(point, this.animation);

    }

}

