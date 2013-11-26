/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of.  
*
* Note: A tween is the transition of values between A - B, and thus in Kiwi the tweem manager handles the transition of those values.
* As such you a tween can be added to property/method as long as the value can be changed constantly.
* So think big with tweening as lots of stuff can be tweened.
*
**/

class Chaining extends Kiwi.State {

    constructor() {
        super('Chaining');
    }

    preload() {
    this.game.stage.resize(800, 250);
        this.addImage('bullet', 'assets/static/bullet-rocket.png');
    }

    public bullet: Kiwi.GameObjects.Sprite;

    public tweenA: Kiwi.Animations.Tween;
    public tweenB: Kiwi.Animations.Tween;
    public tweenC: Kiwi.Animations.Tween;

    create() {

        this.bullet = new Kiwi.GameObjects.Sprite(this, this.textures.bullet, 100, 200);
        this.addChild(this.bullet);

        //only apply the callback once.
        this.bullet.input.onRelease.addOnce(this.tweenIt, this);
         
        //create the tweens
        this.tweenA = this.game.tweens.create(this.bullet);  
        this.tweenB = this.game.tweens.create(this.bullet); 
        this.tweenC = this.game.tweens.create(this.bullet);
        
        //set the tweens up
        this.tweenA.to({ x: 400 }, 1200, Kiwi.Animations.Tweens.Easing.Linear.None, false);
        this.tweenB.to({ rotation: Kiwi.Utils.GameMath.degreesToRadians(45) }, 750, Kiwi.Animations.Tweens.Easing.Circular.InOut, false);
        this.tweenC.to({ x: 600, y: 400 }, 1200, Kiwi.Animations.Tweens.Easing.Linear.None, false);

        //set the order that they will execute one after the other in.
        this.tweenA.chain(this.tweenB);
        this.tweenB.chain(this.tweenC);

    }

    // when clicked start the animation
    tweenIt() {
        this.tweenA.start();
    }

}


//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if (typeof gameOptions == "undefined") var gameOptions  = {};

var game = new Kiwi.Game('game', 'KiwiExample', Chaining, gameOptions );