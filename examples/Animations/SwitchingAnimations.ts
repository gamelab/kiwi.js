/// <reference path="../../src/Kiwi.ts" />

class SwitchingAnimations extends Kiwi.State {

    constructor() {
        super('SwitchingAnimations');
    }

    preload() {
        this.addSpriteSheet('coin', 'assets/coin.png', 32, 32);
    }

    public coin: Kiwi.GameObjects.Sprite;
    public currentAnimation: string;

    create() {

        this.coin = new Kiwi.GameObjects.Sprite(this,this.textures.coin, 10, 10);
        this.addChild(this.coin);
        
        this.coin.animation.add('rotateleft', [0, 1, 2, 3, 4, 5], 0.1, true);
        this.coin.animation.add('rotateright', [5, 4, 3, 2, 1], 0.1, true);

        this.currentAnimation = 'rotateright';

        this.coin.animation.play(this.currentAnimation);

        this.game.input.mouse.mouseUp.add(this.released, this);
    }

    released() {
        if (this.currentAnimation == 'rotateright') this.currentAnimation = 'rotateleft';
        else this.currentAnimation = 'rotateright';

        this.coin.animation.switchTo(this.currentAnimation, true);
    }

}