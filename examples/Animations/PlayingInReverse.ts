/// <reference path="../../src/Kiwi.ts" />

class PlayingInReverse extends Kiwi.State {

    constructor() {
        super('PlayingInReverse');
    }

    preload() {
        this.addSpriteSheet('zombie', 'assets/zombieSprite.png', 150, 117);
    }

    public zombie: Kiwi.GameObjects.Sprite;

    create() {

        this.zombie = new Kiwi.GameObjects.Sprite(this.textures.zombie, 100, 10);
        this.zombie.animation.add('walkright', [1, 2, 3, 4, 5, 6], 0.1, true);
        
        this.zombie.animation.play('walkright');

        this.addChild(this.zombie);

        this.game.input.mouse.mouseUp.add(this.released, this);
    }


    released() {
        if (this.zombie.animation.getAnimation('walkright').reverse) {
            this.zombie.animation.getAnimation('walkright').reverse = false;
        } else {
            this.zombie.animation.getAnimation('walkright').reverse = true;
        }
    }

}