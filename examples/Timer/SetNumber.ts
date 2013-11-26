/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of timer events in Kiwi.
**/

class SetNumber extends Kiwi.State {

    constructor() {
        super('SetNumber');
    }

    preload() {
         this.game.stage.resize(800, 250);
        this.addSpriteSheet('german', 'assets/war/characters/german-bayonet.png', 150, 117);
        this.addSpriteSheet('tank', 'assets/war/characters/wwII-german-tank.png', 150, 117);
    }
    
    germans: Kiwi.GameObjects.Sprite[];  
    timer: Kiwi.Time.Timer; 

    create() {
        
        //create the animations.
        this.textures.german.sequences.push(new Kiwi.Animations.Sequence('walk', [1, 2, 3, 4, 5, 6], 0.2, true));
        this.textures.tank.sequences.push(new Kiwi.Animations.Sequence('move', [1, 2, 3, 4, 5, 6], 0.2, true));

        this.germans = [];

        /**
        * set the value of a clock unit. 
        **/
        this.game.time.clock.units = 400;

        /**
        * Create a new timer event on the master clock and save it in timerEvent
        * - Parameter One - name of the timer.
        * - Parameter Two - delay on the timer in clock units.
        * - Parameter Three - number of times to repeat - -1 means infinite/never expires
        **/
        this.timer = this.game.time.clock.createTimer('spawn', 2, 20, false);  
        this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_START, this.spawnTank, this);
        this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_COUNT, this.spawnTroop, this);  //create a new timer event on that timer.
        this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_STOP, this.spawnTank, this);

        this.timer.start();
    }

    spawnTroop() {
        //if its not the first german spawning
        if (this.timer.currentCount() !== 0) {

            var g = new Kiwi.GameObjects.Sprite(this, this.textures.german, -150, 200);
            g.animation.play('walk');
            this.addChild(g);
            this.germans.push(g);

        }
    }

    spawnTank() {
        var t = new Kiwi.GameObjects.Sprite(this, this.textures.tank, -150, 200);
        t.animation.play('move');
        this.addChild(t);
        this.germans.push(t);
    }

    update() {

        super.update();

        //loop through the bullets and shoot!
        for (var i = 0; i < this.germans.length; i++) {
            this.germans[i].x += 3;

            //destroy it if the german is not on screen any more
            if (this.germans[i].x > this.game.stage.width) {

                this.germans[i].destroy();
                this.germans.splice(i, 1);
                i--;

            }
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
if (typeof gameOptions  == "undefined") var gameOptions  = {};

var game = new Kiwi.Game('game', 'KiwiExample', SetNumber, gameOptions );