/// <reference path="../../src/Kiwi.ts" />

class muting extends Kiwi.State {

    constructor() {
        super('muting');
    }

    preload() {
        this.addAudio('tommy', 'assets/sound/mp3/tommy_in_goa.mp3', false);
        this.addImage('pepper', 'assets/sprites/pepper.png', false);
        this.addImage('tomato', 'assets/sprites/tomato.png', false);
    }

    public tomato: Kiwi.GameObjects.Sprite;
    public pepper: Kiwi.GameObjects.Sprite;
    public tommy: Kiwi.Sound.Audio;

    create() {

        this.tomato = new Kiwi.GameObjects.Sprite('tomato', this.cache, 100, 100);
        this.pepper = new Kiwi.GameObjects.Sprite('pepper', this.cache, 400, 100);

        this.tomato.input.inputOnRelease.add(this.mute, this);
        this.pepper.input.inputOnRelease.add(this.unmute, this);

        this.addChild(this.tomato);
        this.addChild(this.pepper);

        this.tommy = this.game.audio.add('tommy', this.cache, 1, true);
        this.tommy.play();
    }

    mute() {
        this.tommy.mute = true;
    }

    unmute() {
        this.tommy.mute = false;
    }
    

}