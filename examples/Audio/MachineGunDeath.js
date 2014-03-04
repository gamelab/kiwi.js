/**
* This script is a demonstration of how you can create and play audio using Kiwi.
**/
var MachineGunDeath = new Kiwi.State('MachineGunDeath');

MachineGunDeath.preload = function () {
    this.game.stage.resize(800, 250);
    this.addAudio('death', 'assets/audio/death.mp3');
    this.addAudio('damage', 'assets/audio/enemy_damage2.mp3');
    this.addAudio('pistol', 'assets/audio/pistol.mp3');
    this.addImage('bullet', 'assets/static/bullet-normal.png');
    this.addSpriteSheet('tank', 'assets/war/characters/wwII-british-tank.png', 150, 117);
    this.addSpriteSheet('troop', 'assets/war/characters/wwII-german.png', 150, 117);
}

MachineGunDeath.create = function () {

    var text = new Kiwi.GameObjects.Textfield(this, 'Click anywhere to fire!', this.game.stage.width - 10, 10, '#000', 12);
    text.textAlign = 'right';
    this.addChild(text);

    var text = new Kiwi.GameObjects.Textfield(this, '', 10, 10, 'rgba(0,0,0,0.5)', 10);
    this.addChild(text);

    if (this.game.audio.usingAudioTag) {
        text.text = 'You are using Audio Tags, so your audio is of pretty average quality.';
    } else if (this.game.audio.usingWebAudio) {
        text.text = 'You are using the Web Audio API, so your audio is amazing!';
    } else {
        text.text = 'You have NO audio support.';
    }

    this.textures.troop.sequences.push(new Kiwi.Animations.Sequence('walk', [1, 2, 3, 4, 5, 6], 0.1, true));
    this.textures.troop.sequences.push(new Kiwi.Animations.Sequence('death', [11, 12, 13, 14, 15], 0.1, false));

    this.tank = new Custom(this, this.textures.tank, 100, 30);
    this.addChild(this.tank);

    this.troops = [];
    this.bullets = [];

    //create a new timer plus timerevent
    this.timer = this.game.time.clock.createTimer('spawnTroop', 2, -1, false);
    this.timerEvent = this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_COUNT, this.spawn, this);

    this.bang = new Kiwi.Sound.Audio(this.game, 'pistol', 1, false);
    this.oww = new Kiwi.Sound.Audio(this.game, 'damage', 1, false);
    this.dead = new Kiwi.Sound.Audio(this.game, 'death', 1, false);

    this.game.input.onUp.add(this.pew, this);
    this.timer.start();
}

MachineGunDeath.pew = function () {
    var b = new Custom(this, this.textures.bullet, this.tank.x + this.tank.width, this.tank.y + this.tank.height / 2 - 30);
    this.addChild(b);
    this.bullets.push(b);
    this.bang.play('default', true);

}

MachineGunDeath.spawn = function () {
    var t = new Custom(this, this.textures.troop, this.game.stage.width + 50, 30);
    t.animation.play('walk');
    t.scaleX = -1;
    this.addChild(t);
    this.troops.push(t);
}

MachineGunDeath.update = function () {
    Kiwi.State.prototype.update.call(this);

    for (var i = 0; i < this.troops.length; i++) {
        if (this.troops[i].health > 0) {
            this.troops[i].x -= 4;
        } else {
            if (this.troops[i].cellIndex == 15) {
                this.removeChild(this.troops[i], true);
                this.troops.splice(i, 1);
                i--;
            }
        }
    }

    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].x += 10;
        var collide = false;

        for (var t = 0; t < this.troops.length; t++) {
            if (this.troops[t].health != 0 && this.troops[t].physics.overlaps(this.bullets[i], false)) {
                this.troops[t].health--;
                this.oww.play('default', true);

                if (this.troops[t].health <= 0) {
                    this.dead.play('default', true);
                    this.troops[t].animation.play('death');
                }

                collide = true;
                break;
            }
        }

        if (collide == true || this.bullets[i].x > this.game.stage.width) {
            this.removeChild(this.bullets[i], true);
            this.bullets.splice(i, 1);
            i--;
        }
    }
}

var Custom = function(state,texture,x,y) {
    Kiwi.GameObjects.Sprite.call(this,state,texture,x,y);

    this.health = 2;
    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
}

Kiwi.extend(Custom, Kiwi.GameObjects.Sprite);



//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', MachineGunDeath,  gameOptions);