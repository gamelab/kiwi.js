/// <reference path="../../src/Kiwi.ts" />

class PausingAndResuming extends Kiwi.State {

    constructor() {
        super('PausingAndResuming');
    }

    preload() {
        this.addSpriteSheet('coin', 'assets/coin.png', 32, 32);
    }

    public coin: Kiwi.GameObjects.Sprite;

    create() {

        this.coin = new Kiwi.GameObjects.Sprite(this, this.textures.coin, 10, 10);

        this.coin.animation.add('rotateleft', [0, 1, 2, 3, 4, 5], 0.1, true);

        this.addChild(this.coin);

        this.coin.animation.add('rotateright', [5, 4, 3, 2, 1], 0.1, true, true);

        this.game.input.mouse.mouseUp.add(this.released, this);
    }

    released() {
        if (this.coin.animation.isPlaying)
            this.coin.animation.pause();
        else this.coin.animation.resume();
    }

}