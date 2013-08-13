/// <reference path="../../src/Kiwi.ts" />

class Basics extends Kiwi.State {
    
    constructor() {
        super('Basics');
    }

    public score: Kiwi.HUD.BasicScore;
    public player: Kiwi.GameObjects.Sprite;

    init() {
        
        this.score = new Kiwi.HUD.BasicScore(10, 10);
        this.game.huds.defaultHUD().addWidget(this.score);

        this.score.container.style.width = '100px';
        this.score.container.style.height = '40px';
        this.score.container.style.color = 'red';
        this.score.container.style.textAlign = 'center';

    }

    preload() {
        this.addImage('horngirl', 'assets/sprites/planetcute/Character Horn Girl.png', false);
    }

    create() {
        this.player = new Kiwi.GameObjects.Sprite(this.textures.horngirl, 100, 200);

        this.addChild(this.player);
    }

    update() {
        super.update();
        this.score.counter.increment(1);
    }

}