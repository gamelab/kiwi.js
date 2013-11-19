/**
* This script is a demonstration of creating a repeating timer events in Kiwi.
**/
var Repeating = new Kiwi.State('Repeating');

Repeating.preload = function () {
    this.game.stage.resize(800, 250);
    this.addSpriteSheet('mujahadeen', 'assets/war/characters/mujahadeen-ak47.png', 150, 117);
    this.addImage('bullet', 'assets/static/bullet-normal.png');
}

Repeating.create = function () {

    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Watch the mujahadeen fire his AK47!', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

    this.bullets = [];
    this.mujahadeen = new Kiwi.GameObjects.Sprite(this, this.textures.mujahadeen, 100, 30);
    this.addChild(this.mujahadeen);

    /**
    * set the value of a clock unit.
    **/
    this.game.time.clock.units = 250;

    /**
    * Create a new timer event on the master clock and save it in timerEvent
    * - Parameter One - name of the timer.
    * - Parameter Two - delay on the timer in clock units.
    * - Parameter Three - number of times to repeat - -1 means infinite/never expires
    * - Parameter Four - should the timer start? - defaults to true
    **/
    this.timer = this.game.time.clock.createTimer('shoot', 2, -1, false);
    this.timerEvent = this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_COUNT, this.shoot, this);
    this.timer.start();
}

Repeating.shoot = function () {
    var bullet = new Kiwi.GameObjects.StaticImage(this, this.textures.bullet, this.mujahadeen.x + this.mujahadeen.width, (this.mujahadeen.y + this.mujahadeen.height / 2) + 10);
    this.bullets.push(bullet);
    this.addChild(bullet);
}

Repeating.update = function () {
    Kiwi.State.prototype.update.call(this);

    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].x += 10;

        if (this.bullets[i].x > this.game.stage.width) {
            this.bullets[i].destroy();
            this.bullets.splice(i, 1);
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

var game = new Kiwi.Game('game', 'KiwiExample', Repeating,  gameOptions);