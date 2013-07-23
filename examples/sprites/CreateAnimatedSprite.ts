/// <reference path="../../src/Kiwi.ts" />

class CreateAnimatedSprite extends Kiwi.State {

    constructor() {
        super("CreatingAnimatedSprites");
    }

    public sprite:Kiwi.GameObjects.Sprite;

    preload() {

        this.addSpriteSheet('coin', 'assets/coin.png', 32, 32);
    }

    create() {

        this.sprite = new Kiwi.GameObjects.Sprite('coin', this.game.cache, 100, 100);
        this.sprite.animation.add('anim1', 0.1);
        
    }

    update() {


    }

}

