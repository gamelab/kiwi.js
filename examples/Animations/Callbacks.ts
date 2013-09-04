/// <reference path="../../src/Kiwi.ts" />

class Callbacks extends Kiwi.State {

    constructor() {
        super('Callbacks');
    }

    preload() {
        this.addSpriteSheet('zombie', 'assets/zombieSprite.png', 150, 117);
    }

    public zombie: Kiwi.GameObjects.Sprite;
    public currentAnimation: string;

    create() {

        this.zombie = new Kiwi.GameObjects.Sprite(this,this.textures.zombie, 100, 10);
        var ex = this.zombie.animation.add('explode', [1, 11, 12, 13, 14, 15], 0.1, false);
        var re = this.zombie.animation.add('rebuild', [15, 14, 13, 12, 11, 1], 0.1, false);

        ex.onStop.add(this.switchAnim, this);
        re.onStop.add(this.switchAnim, this);
        
        this.addChild(this.zombie);
        
        this.zombie.animation.play('explode');
        this.currentAnimation = 'explode';
    }


    switchAnim() {

        if (this.currentAnimation == 'rebuild') {
            this.currentAnimation = 'explode';
            this.zombie.animation.play('explode');

        } else {
            this.currentAnimation = 'rebuild';
            this.zombie.animation.play('rebuild');

        }
    }

}