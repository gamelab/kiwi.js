/// <reference path="../../src/Kiwi.ts" />

export class IconCounter extends Kiwi.State {

    constructor() {
        super('iconcounter');
    }

    public balls: Kiwi.HUD.IconCounter;
    public spartan: Kiwi.GameObjects.Sprite;

    init() {

    }

    preload() {
        this.addImage('spartan', 'assets/spartan.png', false);
        this.addImage('shinyball', 'assets/shinyball.png', false);
    }

    create() {


        this.spartan = new Kiwi.GameObjects.Sprite(this.textures.spartan, 100, 100);
        this.addChild(this.spartan);
        
        this.spartan.input.inputOnRelease.add(this.increase, this);
        this.spartan.input.inputLeft.add(this.removal, this);

        this.balls = new Kiwi.HUD.IconCounter('shinyball', this.cache, 1, 5, 10, 10);
        this.game.huds.defaultHUD().addWidget(this.balls);
    }

    increase() {
        this.balls.range.increase();
    }

    removal() {
        this.balls.range.current = 1;
    }

}