/// <reference path="../../src/kiwi.ts" />

export class BasicTime extends Kiwi.State {

    constructor() {
        super('basictime');
    }

    public time: Kiwi.HUD.Time;
    public key: Kiwi.GameObjects.Sprite;

    init() {

        this.time = new Kiwi.HUD.Time('hh:mm:ss', 10, 10);
        this.time.setTime(1000, 2, 34);
        this.time.time.countingDown = true;

        this.game.huds.defaultHUD().addWidget(this.time);

    }

    preload() {
        this.addImage('key', 'assets/sprites/planetcute/Key.png', false);
    }

    create() {

        this.key = new Kiwi.GameObjects.Sprite(this.textures.key, 50, 50);

        this.addChild(this.key);
    }
    
}