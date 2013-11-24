/**
* This script is a demonstration of how you can create and play audio using Kiwi.
**/
var FiringOfRockets = new Kiwi.State('FiringOfRockets');
    
FiringOfRockets.preload = function () {
    this.game.stage.resize(800, 250);
    this.addAudio('explode', 'assets/audio/death.mp3');
    this.addSpriteSheet('rpg', 'assets/war/characters/vietcong-sheet-rpg.png', 150, 117);
    this.addImage('rocket', 'assets/static/bullet-rocket.png');
}

FiringOfRockets.create = function () {
    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Listen to the Vietcong shoot his RPG!', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

    //create sprite
    this.vc = new Kiwi.GameObjects.Sprite(this, this.textures.rpg, 100, 30);
    this.addChild(this.vc);

    //create rocket
    this.rocket = new Kiwi.GameObjects.StaticImage(this, this.textures.rocket, 1000, 1000);
    this.addChild(this.rocket);

    //create a new timer plus timerevent
    this.timer = this.game.time.clock.createTimer('fireRocket', 2, -1, false);
    this.timerEvent = this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_COUNT, this.pew, this);

    //create audio/start timer
    this.audio = new Kiwi.Sound.Audio(this.game, 'explode', 1, false);
    this.timer.start();
}

FiringOfRockets.update = function () {
    Kiwi.State.prototype.update.call(this);

    if (this.rocket.x < this.game.stage.width) {
        this.rocket.x += 10;
    } else if (this.wasMoving) {
        this.wasMoving = false;
        this.audio.play('default', true);
    }
}

FiringOfRockets.pew = function () {
    //Move rocket
    this.rocket.x = this.vc.x + this.vc.width - 30;
    this.rocket.y = this.vc.y + this.vc.height / 2 - 30;
    this.wasMoving = true;
}


//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', FiringOfRockets,  gameOptions);