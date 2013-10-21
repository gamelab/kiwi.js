/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of some of the easing methods. Note: These are only a small section of the easing methods that there are.  
*
* Note: A tween is the transition of values between A - B, and thus in Kiwi the tweem manager handles the transition of those values.
* As such you a tween can be added to property/method as long as the value can be changed constantly.
* So think big with tweening as lots of stuff can be tweened.
*
**/

class EasingMethods extends Kiwi.State {

    constructor() {
        super('EasingMethods');
    }

    preload() {
        this.addImage('bullet', 'assets/static/bullet-rocket.png');
    }

    tweens: Kiwi.Animations.Tween[];

    create() {

        this.tweens = [];

        var easing = new Array();
        easing.push(Kiwi.Animations.Tweens.Easing.Linear.None);
        easing.push(Kiwi.Animations.Tweens.Easing.Bounce.In);
        easing.push(Kiwi.Animations.Tweens.Easing.Elastic.In);
        easing.push(Kiwi.Animations.Tweens.Easing.Sinusoidal.In);
        easing.push(Kiwi.Animations.Tweens.Easing.Circular.In);
        easing.push(Kiwi.Animations.Tweens.Easing.Quartic.In);

        for (var i = 0; i < easing.length; i++) {
            var bullet = new Kiwi.GameObjects.Sprite(this, this.textures.bullet, 50, 40 * i + 25);
            this.addChild(bullet);

            var tween = this.game.tweens.create(bullet);  
            tween.delay(0);
            tween.to({ x: 700 }, 4000, easing[i]);
            this.tweens.push(tween);
            
            if (i !== 0) {
                this.tweens[i-1].chain(this.tweens[i]);
            }
        }

        this.game.input.onUp.addOnce(this.play, this);
    }

    play() {
        this.tweens[0].start();
    }

}