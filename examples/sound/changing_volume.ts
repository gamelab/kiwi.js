/// <reference path="../../src/Kiwi.ts" />

class changing_volume extends Kiwi.State {

    constructor() {
        super('volume');
    }

    preload() {
        this.addAudio('tommy', 'assets/sound/mp3/tommy_in_goa.mp3', false);
        this.addImage('pepper', 'assets/sprites/pepper.png', false);
        this.addImage('tomato', 'assets/sprites/tomato.png', false);
        this.addImage('player', 'assets/sprites/player.png', false);
    }

    public tomato: Kiwi.GameObjects.Sprite;
    public pepper: Kiwi.GameObjects.Sprite;
    public player: Kiwi.GameObjects.Sprite;
    public tommy: Kiwi.Sound.Audio;

    create() {

        this.tomato = new Kiwi.GameObjects.Sprite('tomato', this.cache, 100, 100);
        this.pepper = new Kiwi.GameObjects.Sprite('pepper', this.cache, 400, 100);
        this.player = new Kiwi.GameObjects.Sprite('player', this.cache, 250, 100);

        this.addChild(this.tomato);
        this.addChild(this.pepper);
        this.addChild(this.player);
        
        this.player.input.enableDrag();

        this.tommy = this.game.audio.add('tommy', this.cache, 0.5, true);
        this.tommy.play();
    }

    update() {

        this.tommy.volume((this.player.position.x() - this.tomato.position.x()) / (this.pepper.position.x() - this.tomato.position.x()));

        super.update();
    }

}