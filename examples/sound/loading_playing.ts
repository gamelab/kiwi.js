/// <reference path="../../src/Kiwi.ts" />

class loading_playing extends Kiwi.State {

    constructor() {
        super('basics');
    }

    init() {

    }

    public button: Kiwi.GameObjects.Sprite;
    public sound: Kiwi.Sound.Audio;

    preload() {
        this.addImage('star', 'assets/sprites/planetcute/Star.png', false);
        this.addAudio('boden', 'assets/sound/mp3/bodenstaendig_2000_in_rock_4bit.mp3', false);
    }

    create() {

        this.button = new Kiwi.GameObjects.Sprite(this.textures.star, 150, 150, true);
        this.addChild(this.button);

        this.button.input.onRelease.add(this.play, this);

        this.sound = this.game.audio.add( 'boden');
    }

    play() {
        this.sound.play();

    }

}