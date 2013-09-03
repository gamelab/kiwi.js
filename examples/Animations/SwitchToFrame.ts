/// <reference path="../../src/Kiwi.ts" />

class SwitchToFrame extends Kiwi.State {

    constructor() {
        super('SwitchToFrame');
    }

    preload() {
        this.addSpriteSheet('zombie', 'assets/zombieSprite.png', 150, 117);
    }

    public zombie: Kiwi.GameObjects.Sprite;

    create() {

        this.zombie = new Kiwi.GameObjects.Sprite(this.textures.zombie, 100, 10); 
        this.addChild(this.zombie);

        this.zombie.input.onUp.add(this.released, this);
    }


    released() {
        if (this.zombie.animation.frameIndex == 12) {
            this.zombie.animation.switchTo(1, true);
        } else {
            this.zombie.animation.switchTo(12, false);
        }    
    }

}