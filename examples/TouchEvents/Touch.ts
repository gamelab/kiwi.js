/// <reference path="../../src/Kiwi.ts" />

class Touch extends Kiwi.State {

    constructor() {
        super('Touch');
    }

    preload() {
        this.addSpriteSheet('coin', 'assets/coin.png', 32, 32);
    }

    create() {
         
        this.game.input.onUp.add(this.newCoin, this);
         
    }

    newCoin(x, y) {
        var coin = new Kiwi.GameObjects.Sprite(this.textures.coin, x-10, y-10);
        this.addChild(coin);
        coin.animation.play('default');
    }

}