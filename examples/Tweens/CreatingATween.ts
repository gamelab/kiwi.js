/// <reference path="../../src/Kiwi.ts" />

class CreatingATween extends Kiwi.State {

    constructor() {
        super('CreatingATween');
    }

    preload() {
        this.addSpriteSheet('cat', 'assets/sprites/baddie_cat_1.png', 16, 16);
    }

    public cat: Kiwi.GameObjects.Sprite;
    public tween: Kiwi.Tween;

    create() {

        this.cat = new Kiwi.GameObjects.Sprite(this.textures.cat, 100, 200);
        this.cat.animation.add('left', [0, 1], 0.1, true);
        this.cat.animation.add('right', [2, 3], 0.1, true);
        this.cat.animation.add('leftstop', [1], 0, false);
        this.cat.animation.add('rightstop', [2], 0, false);

        this.addChild(this.cat);
        this.cat.animation.play('leftstop');
        
        this.cat.input.onRelease.add(this.tweenIt, this);

        this.tween = this.game.tweens.create(this.cat.transform);//eventually will be just this.cat when x/y are atlased to it...
        this.tween.to({ x: 400 }, 1000, Kiwi.Tweens.Easing.Linear.None, false);
        this.tween.onComplete(this.stop, this);

    }

    stop() {
        this.cat.animation.play('rightstop');
    }

    tweenIt() {
        this.cat.animation.play('right');
        this.tween.start();
    }



}