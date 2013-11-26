/**
* This script is a demonstration of timer events in Kiwi.
**/
var SetNumber = new Kiwi.State('SetNumber');

SetNumber.preload = function () {
    this.game.stage.resize(800, 250);
    this.addSpriteSheet('german', 'assets/war/characters/german-bayonet.png', 150, 117);
    this.addSpriteSheet('tank', 'assets/war/characters/wwII-german-tank.png', 150, 117);
}

SetNumber.create = function () {
    
    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Watch german troops move across the screen!', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

    //create the animations.
    this.textures.german.sequences.push(new Kiwi.Animations.Sequence('walk', [1, 2, 3, 4, 5, 6], 0.2, true));
    this.textures.tank.sequences.push(new Kiwi.Animations.Sequence('move', [1, 2, 3, 4, 5, 6], 0.2, true));

    this.germans = [];

    /**
    * Set the value of a clock unit.
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
    this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_COUNT, this.spawnTroop, this);
    this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_STOP, this.spawnTank, this);

    this.timer.start();
}

SetNumber.spawnTroop = function () {
    if (this.timer.currentCount() !== 0) {
        var g = new Kiwi.GameObjects.Sprite(this, this.textures.german, -150, 30);
        g.animation.play('walk');
        this.addChild(g);
        this.germans.push(g);
    }
}

SetNumber.spawnTank = function () {
    var t = new Kiwi.GameObjects.Sprite(this, this.textures.tank, -150, 30);
    t.animation.play('move');
    this.addChild(t);
    this.germans.push(t);
}

SetNumber.update = function () {
    Kiwi.State.prototype.update.call(this);

    for (var i = 0; i < this.germans.length; i++) {
        this.germans[i].x += 3;

        if (this.germans[i].x > this.game.stage.width) {
            this.germans[i].destroy();
            this.germans.splice(i, 1);
            i--;
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
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', SetNumber,  gameOptions);