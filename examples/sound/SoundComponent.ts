/// <reference path="../../src/Kiwi.ts" />
/*
class SoundComponent extends Kiwi.State {

    constructor() {
        super('SoundComponent');
    }

    preload() {
        this.addAudio('explode', 'assets/sound/mp3/SoundEffects/explode1.wav', false);
        this.addAudio('lazer', 'assets/sound/mp3/SoundEffects/lazer.wav', false);

        this.addImage('xenon', 'assets/sprites/xenon2_ship.png', false);
    }

    public xenon: SoundSprite;

    create() {

        this.xenon = new SoundSprite('xenon', this.cache, 200, 100, this.game);
        this.addChild(this.xenon);

        this.xenon.sound.addSound('ex', 'explode', this.cache, 1, false);
        this.xenon.sound.addSound('pew', 'lazer', this.cache, 1, false);

        this.xenon.input.inputOnRelease.add(this.pew, this);
    }


    pew() {
        this.xenon.sound.play('pew');
        //this.xenon.sound.play('ex');
    }

}

class SoundSprite extends Kiwi.GameObjects.Sprite {

    constructor(cacheID, cache, x, y, game) {
        
        super(cacheID, cache, x, y);
        
        this.sound = this.components.add(new Kiwi.Components.Sound(game));
    }

    public sound: Kiwi.Components.Sound;

}
*/