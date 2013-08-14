/// <reference path="../../src/Kiwi.ts" />

class Chaining extends Kiwi.State {

    constructor() {
        super('Chaining');
    }

    preload() {
        this.addImage('ufo', 'assets/sprites/ufo.png');
    }

    public ufo: Kiwi.GameObjects.Sprite;
    public tweenA: Kiwi.Tween;
    public tweenB: Kiwi.Tween;

    create() {

        this.ufo = new Kiwi.GameObjects.Sprite(this.textures.ufo, 100, 200);
        this.addChild(this.ufo);

        //only apply the callback once.
        this.ufo.input.inputOnRelease.addOnce(this.tweenIt, this);

        //Creation Method A
        this.tweenA = this.game.tweens.create(this.ufo.transform); //eventually will be just this.cat when x/y are atlased to it...

        //Creation Method B
        this.tweenB = new Kiwi.Tween(this.ufo.transform, this.game);
        this.game.tweens.add(this.tweenB);                  //alternatively you can combine the two lines into one

        this.tweenA.to({ x: 400 }, 1000, Kiwi.Tweens.Easing.Linear.None, false);
        this.tweenB.to({ y: 400 }, 1000, Kiwi.Tweens.Easing.Linear.None, false);

        this.tweenA.chain(this.tweenB);

    }

    tweenIt() {
        this.tweenA.start();
    }

}