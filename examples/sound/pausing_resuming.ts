/// <reference path="../../src/Kiwi.ts" />

class pausing_resuming extends Kiwi.State {

    constructor() {
        super('pausing_resuming');
    }

    preload() {
        this.addAudio('boden', 'assets/sound/mp3/bodenstaendig_2000_in_rock_4bit.mp3', false);
    }
    
    public sound: Kiwi.Sound.Audio;

    create() {
        this.sound = this.game.audio.add('boden', this.cache, 1, true);
        this.game.input.mouse.mouseUp.add(this.play, this);
        this.sound.play();
    }

    play() {
        
        if (this.sound.paused) {
            console.log('Resume');
            this.sound.resume();
        } else {
            console.log('Pause');
            this.sound.pause();
        }

    }

}