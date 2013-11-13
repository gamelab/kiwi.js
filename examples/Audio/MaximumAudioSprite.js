/**
* This script is a demonstration of how you can create and play audio using Kiwi.
**/
var MaximumAudioSprite = new Kiwi.State('MaximumAudioSprite');

MaximumAudioSprite.preload = function () {
    this.addAudio('audio0', 'assets/audio/death.mp3');
    this.addAudio('audio1', 'assets/audio/enemy_damage2.mp3');
    this.addAudio('audio2', 'assets/audio/pistol.mp3');
    this.addAudio('audio3', 'assets/audio/rocket_explode.mp3');
    this.addAudio('audio4', 'assets/audio/rocket_fire.mp3');
}

MaximumAudioSprite.create = function () {

    var text = new Kiwi.GameObjects.Textfield(this, 'Click/Touch to add a new piece of audio and to play the current sounds', this.game.stage.width / 2, 20, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

    this.textAmount = new Kiwi.GameObjects.Textfield(this, 'Current Amount: 0', this.game.stage.width / 2, 50, '#000', 14);
    this.addChild(this.textAmount);

    this.currentCount = 0;
    this.max = 5;
    this.audioItems = [];

    this.game.input.onUp.add(this.play, this);
}

MaximumAudioSprite.play = function() {

    this.audioItems.push(new Kiwi.Sound.Audio('audio'+Math.floor( Math.random() * this.max ), 1, false) ); 

    this.textAmount.text = 'Sound Items: '+ this.audioItems.length;
    this.currentCount = 0;
} 

MaximumAudioSprite.update = function() {

    Kiwi.State.prototype.update.call(this);

    if(this.currentCount < this.audioItems.length) {
        this.audioItems[this.currentCount].play('default', true);
        this.currentCount++;
    }
    
}


//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof options == "undefined") options = {};

var game = new Kiwi.Game('game', 'KiwiExample', MaximumAudioSprite, options);