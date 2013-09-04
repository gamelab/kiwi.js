/// <reference path="../../src/Kiwi.ts" />

class NextFrames extends Kiwi.State {

    constructor() {
        super('SwitchToFrame');
    }

    preload() {
        this.addSpriteSheet('zombie', 'assets/zombieSprite.png', 150, 117);
    }

    public zombie: Kiwi.GameObjects.Sprite;

    create() {

        this.zombie = new Kiwi.GameObjects.Sprite(this,this.textures.zombie, 100, 10);
        this.addChild(this.zombie);

        this.game.input.onUp.add(this.released, this);
    }


    released(x) {
        if (x > this.game.stage.width / 2) {
            this.zombie.animation.nextFrame();
        } else {
            this.zombie.animation.prevFrame();
        }
    }

}