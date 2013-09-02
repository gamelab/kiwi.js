/// <reference path="../../src/Kiwi.ts" />

class looping extends Kiwi.State {
    
    constructor() {
        super('looping');
    }

    preload() {
        this.addAudio('meow', 'assets/sound/mp3/SoundEffects/meow2.mp3', false);
        this.addSpriteSheet('baddie', 'assets/sprites/baddie_cat_1.png', 16, 16, false);
    }

    public meow: Kiwi.Sound.Audio;
    public cat: Kiwi.GameObjects.Sprite;

    create() {

        this.meow = this.game.audio.add('meow', 1, true);

        this.game.input.mouse.mouseUp.add(this.meowing, this);

        this.cat = new Kiwi.GameObjects.Sprite(this.textures.baddie, 200, 200, true);
        this.cat.animation.add('right', [2, 3], 0.2);
        this.cat.animation.add('left', [0, 1], 0.2); 
        this.addChild(this.cat);
        this.cat.animation.play('left');
    }

    meowing() {
        if (this.meow.isPlaying) {
            this.meow.stop();
            this.cat.animation.play('left');
        } else {
            this.meow.play();
            this.cat.animation.play('right');
        }

    }
    
}