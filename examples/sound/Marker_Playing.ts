/// <reference path="../../src/Kiwi.ts" />

class Marker_Playing extends Kiwi.State {

    constructor() {
        super('Marker_Playing');
    }

    preload() {

        this.addAudio('random', 'assets/sound/mp3/oedipus_ark_pandora.mp3', false);

        this.addImage('boy', 'assets/sprites/planetcute/Character Boy.png', false);
        this.addImage('horn', 'assets/sprites/planetcute/Character Horn Girl.png', false);
        this.addImage('prin', 'assets/sprites/planetcute/Character Princess Girl.png', false);
    }

    public boy: Kiwi.GameObjects.Sprite;
    public horn: Kiwi.GameObjects.Sprite;
    public prin: Kiwi.GameObjects.Sprite;
    
    public random: Kiwi.Sound.Audio;

    create() {

        this.random = this.game.audio.add('random', this.cache, 1, true);

        this.random.addMarker('boy', 0, 28, true);
        this.random.addMarker('horn', 63, 80, true);
        this.random.addMarker('prin', 85, 96, false);

        this.random.play('boy');
        
        this.boy = new Kiwi.GameObjects.Sprite(this.textures.boy, 100, 100);
        this.horn = new Kiwi.GameObjects.Sprite(this.textures.horn, 300, 100);
        this.prin = new Kiwi.GameObjects.Sprite(this.textures.prin, 500, 100);
        
        this.addChild(this.boy);
        this.addChild(this.horn);
        this.addChild(this.prin); 

        this.boy.input.inputOnRelease.add(this.playBoy, this);
        this.horn.input.inputOnRelease.add(this.playHorn, this);
        this.prin.input.inputOnRelease.add(this.playPrin, this);
    }

    playBoy() { this.random.stop(); this.random.play('boy'); }

    playHorn() { this.random.stop();  this.random.play('horn'); }

    playPrin() { this.random.stop();  this.random.play('prin'); }

}