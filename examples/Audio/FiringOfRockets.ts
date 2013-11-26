/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can create and play audio using Kiwi.
**/

class FiringOfRockets extends Kiwi.State {

    constructor() {
        super('FiringOfRockets');
    }

    preload() {
        this.game.stage.resize(800, 250);
        this.addAudio('explode', 'assets/audio/death.mp3');
        this.addSpriteSheet('rpg', 'assets/war/characters/vietcong-sheet-rpg.png', 150, 117);
        this.addImage('rocket', 'assets/static/bullet-rocket.png');
    }

    rocket: Kiwi.GameObjects.StaticImage;
    audio: Kiwi.Sound.Audio;
    vc: Kiwi.GameObjects.Sprite;

    timer: Kiwi.Time.Timer;
    timerEvent: Kiwi.Time.TimerEvent;
    wasMoving: boolean;

    create() {

        //create sprite
        this.vc = new Kiwi.GameObjects.Sprite(this, this.textures.rpg, 100, 300);
        this.addChild(this.vc);

        //create rocket
        this.rocket = new Kiwi.GameObjects.StaticImage(this, this.textures.rocket, 1000, 1000);
        this.addChild(this.rocket);
        
        //create a new timer plus timerevent
        this.timer = this.game.time.clock.createTimer('fireRocket', 2 , -1, false);
        this.timerEvent = this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_COUNT, this.pew, this); 
        
        //create audio/start timer
        this.audio = new Kiwi.Sound.Audio(this.game, 'explode', 1, false);
        this.timer.start();
    }

    update() {
        super.update();

        //should we move the rocket?
        if (this.rocket.x < this.game.stage.width) {
            this.rocket.x += 10; 

        //do we need to play the audio?
        } else if (this.wasMoving) {
            this.wasMoving = false;
            this.audio.play('default', true);
        }

    }

    pew() {
        //move rocket
        this.rocket.x = this.vc.x + this.vc.width - 30;
        this.rocket.y = this.vc.y + this.vc.height / 2 - 30;
        this.wasMoving = true;
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

var game = new Kiwi.Game('game', 'KiwiExample', FiringOfRockets, gameOptions );