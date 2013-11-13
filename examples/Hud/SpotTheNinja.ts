/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of some of the basic HUD Widgets
**/

class SpotTheNinja extends Kiwi.State {

    constructor() {
        super('SpotTheNinja');
    }

    preload() {
        this.addImage('ninja', 'assets/static/ninja.png');
    }

    ninja: Kiwi.GameObjects.Sprite;
    score: Kiwi.HUD.Widget.BasicScore;
    time: Kiwi.HUD.Widget.Time;
    btn: Kiwi.HUD.Widget.Button;

    create() {

        this.ninja = new Kiwi.GameObjects.Sprite(this, this.textures.ninja, 0, 0, true);
        this.addChild(this.ninja);
        this.changeNinjaCoords();

        if (this.game.huds.supported) {
            this.score = new Kiwi.HUD.Widget.BasicScore(this.game, 10, 10);
            this.score.suffix = ' Ninjas Killed';
            this.score.style.backgroundColor = '#09c';
            this.score.style.padding = '8px 9px';
            this.score.style.fontSize = '1.1em';
            this.score.style.fontWeight = 'bold';
            this.game.huds.defaultHUD.addWidget(this.score);

            this.time = new Kiwi.HUD.Widget.Time(this.game, 'mm:ss:ms', 500, 10);
            this.time.prefix = 'Time Elapsed ';
            this.time.style.backgroundColor = '#09c';
            this.time.style.padding = '8px 9px';
            this.time.style.fontSize = '1.1em';
            this.time.style.fontWeight = 'bold';
            this.game.huds.defaultHUD.addWidget(this.time);
            this.time.start();

            this.btn = new Kiwi.HUD.Widget.Button(this.game, 'Pause', 10, 550);
            this.btn.style.backgroundColor = '#09c';
            this.btn.style.padding = '8px 9px';
            this.btn.style.fontSize = '1.1em';
            this.game.huds.defaultHUD.addWidget(this.btn);
            this.btn.input.onUp.add(this.timerCheck, this);
        }

        this.ninja.input.onUp.add(this.scoreIncrease, this);
    }

    timerCheck() {
        if (this.time.time.isRunning) {
            this.time.pause();
            this.btn.text = 'Resume';
        } else {
            this.time.resume();
            this.btn.text = 'Pause';
        }
    }

    changeNinjaCoords() {
        this.ninja.x = Math.random() * (this.game.stage.width - this.ninja.width);
        this.ninja.y = Math.random() * (this.game.stage.height - this.ninja.height);
    
    }

    scoreIncrease() {
        if (this.game.huds.supported) this.score.counter.increase();
        this.changeNinjaCoords();
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

var game = new Kiwi.Game('game', 'KiwiExample', SpotTheNinja, gameOptions );