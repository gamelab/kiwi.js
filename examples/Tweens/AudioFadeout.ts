/// <reference path="../../src/Kiwi.ts" />

class AudioFadeout extends Kiwi.State {

    constructor() {
        super('AudioFadeout');
    }

    preload() {
        this.addAudio('musics', 'assets/sound/mp3/oedipus_ark_pandora.mp3', false);
    }

    public tween: Kiwi.Tween;
    public audio: Kiwi.Sound.Audio;

    create() {

        this.audio = this.game.audio.add('musics', this.cache, 1, false);
        this.audio.play();

        this.tween = this.game.tweens.create(this.audio);
        this.tween.to({ volume: 0 }, 2000, Kiwi.Tweens.Easing.Linear.None, false); //fade the audio out over 2 seconds
        this.tween.delay(5000); //fade the audio out after 5 seconds

        this.tween.start();
    }



}