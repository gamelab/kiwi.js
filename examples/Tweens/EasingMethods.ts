/// <reference path="../../src/Kiwi.ts" />

class EasingMethods extends Kiwi.State {

    constructor() {
        super('EasingMethods');
    }

    preload() {
        this.addImage('ufo', 'assets/sprites/ufo.png');
    }

    create() {

        var easing = new Array();
        easing.push(Kiwi.Animation.Tweens.Easing.Linear.None);
        easing.push(Kiwi.Animation.Tweens.Easing.Bounce.In);
        easing.push(Kiwi.Animation.Tweens.Easing.Elastic.In);
        easing.push(Kiwi.Animation.Tweens.Easing.Sinusoidal.In);
        easing.push(Kiwi.Animation.Tweens.Easing.Circular.In);
        easing.push(Kiwi.Animation.Tweens.Easing.Quartic.In);

        for (var i = 0; i < easing.length; i++) {
            var ufo = new Kiwi.GameObjects.Sprite(this,this.textures.ufo, 50, 40 * i + 25);
            this.addChild(ufo);

            //Creation Method A
            var tween = this.game.tweens.create(ufo.transform); //eventually will be just this.cat when x/y are atlased to it...
            tween.delay(1000);
            tween.to({ x: 750 }, 4000, easing[i], true);

        }
    }


}