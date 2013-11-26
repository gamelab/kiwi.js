/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of a cat (aka griffon) going back and forward.  
*
* Note: A tween is the transition of values between A - B, and thus in Kiwi the tweem manager handles the transition of those values.
* As such you a tween can be added to property/method as long as the value can be changed constantly.
* So think big with tweening as lots of stuff can be tweened.
*
**/

class Looping extends Kiwi.State {

    constructor() {
        super('Looping');
    }

    preload() {
    this.game.stage.resize(800, 250);
        this.addSpriteSheet('cat', 'assets/spritesheets/griffon.png', 150, 117);
    }

    cat: Kiwi.GameObjects.Sprite;
    tween: Kiwi.Animations.Tween;
    playing: boolean = false;
    direction: string = 'right';

    create() {

        //create our cat
        this.cat = new Kiwi.GameObjects.Sprite(this, this.textures.cat, 100, 200);

        //see animation component section about animations
        this.cat.animation.add('moving', [1,2,3,4,5,6], 0.1, true);
        this.cat.animation.add('stop', [0], 0, false);

        this.addChild(this.cat);
        this.cat.animation.play('stop');
        
        //When the cat has been clicked. 
        //Note: onRelease is the same as onUp. Aka onRelease is an alias for onUp.
        this.cat.input.onRelease.add(this.moveKitty, this);
    }

    stop() {
        this.cat.animation.play('stop');
        this.playing = false;
    }

    moveKitty() {
        if (!this.playing) {
            /**
            * To create a tween you need to create the tween via the manager.
            * When you create the tween you pass in the object that the tween is taking affect on.
            **/
            this.tween = this.game.tweens.create(this.cat);

            //move the cat to the right
            if (this.direction == 'left') {
                this.direction = 'right';
                this.cat.scaleX = -1;
                this.tween.to({ x: 100 }, 800, Kiwi.Animations.Tweens.Easing.Linear.None, true);

            //move the cat to the left
            } else {
                this.direction = 'left';
                this.cat.scaleX = 1;
                this.tween.to({ x: 600 }, 800, Kiwi.Animations.Tweens.Easing.Linear.None, true);
            }

            
            //adding a callback to the tween.
            this.tween.onComplete(this.stop, this);

            //start the animation. We are now playing.
            this.playing = true;
            this.cat.animation.play('moving');
        }    
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

var game = new Kiwi.Game('game', 'KiwiExample', Looping, gameOptions );