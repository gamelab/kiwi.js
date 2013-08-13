/// <reference path="../../src/Kiwi.ts" />

class RemovingWidgets extends Kiwi.State {

    constructor() {
        super('RemovingWidgets');
    }

    private score1: Kiwi.HUD.BasicScore;
    private score2: Kiwi.HUD.BasicScore;

    private showingScore: Boolean;
    private catGirl: Kiwi.GameObjects.Sprite;

    init() {
        this.score1 = new Kiwi.HUD.BasicScore(10, 10);
        this.score2 = new Kiwi.HUD.BasicScore(10, 300);

        this.score1.counter.increment(20);
        this.score2.counter.increment(999);

        this.score1.container.style.color = 'green';
        this.score2.container.style.color = 'blue';

        this.showingScore = false;

        this.game.huds.defaultHUD().addWidget(this.score1);
    }

    preload() {
        this.addImage('ca-girl', 'assets/sprites/planetcute/Character Cat Girl.png', false);
    }

    create() {
        this.catGirl = new Kiwi.GameObjects.Sprite(this.textures.catgirl, 200, 200);
        this.addChild(this.catGirl);
        this.catGirl.input.inputOnRelease.add(this.change, this);
    }

    change() {

        if (this.showingScore === false) {
            this.game.huds.defaultHUD().removeWidget(this.score1);
            this.game.huds.defaultHUD().addWidget(this.score2);
            this.showingScore = true;
        } else {
            this.game.huds.defaultHUD().removeWidget(this.score2);
            this.game.huds.defaultHUD().addWidget(this.score1);
            this.showingScore = false;
        }
        
    }

}