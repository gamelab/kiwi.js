/// <reference path="../../src/Kiwi.ts" />

class SpeedAnimation extends Kiwi.State {

    constructor() {
        super('SpeedAnimation');
    }

    preload() {
        this.addSpriteSheet('explosion', 'assets/explosion.png', 64, 64);
    }

    public explosionA: Kiwi.GameObjects.Sprite;
    public explosionB: Kiwi.GameObjects.Sprite;
    public tweenA: Kiwi.Tween;

    create() {

        //this.textures.explosion.sequences.push(new Kiwi.Sequence('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 0.03, false));
        this.textures.explosion.sequences[0].speed = 0.03;
        this.textures.explosion.sequences[0].loop = false;
        this.textures.explosion.sequences.push(new Kiwi.Sequence('stop', [24], 0, false));

        this.explosionA = new Kiwi.GameObjects.Sprite(this.textures.explosion, 200, 100);
        this.explosionB = new Kiwi.GameObjects.Sprite(this.textures.explosion, 400, 100);

        this.explosionA.animation.play('stop');
        this.explosionB.animation.play('stop');
        
        this.addChild(this.explosionA);
        this.addChild(this.explosionB);

        //slow down the first animation over a period of time.
        this.tweenA = this.game.tweens.create(this.explosionA.animation.getAnimation('default'));
        this.tweenA.to({ speed: 0.075 }, 2000, Kiwi.Tweens.Easing.Linear.None, false);

        this.tweenA.delay(1000);
        this.tweenA.onStart(this.beingAnimating, this);

        //start the animations and the tween
        this.tweenA.start();
    }

    beingAnimating() {
        this.explosionA.animation.play('default');
        this.explosionB.animation.play('default');
    }

}