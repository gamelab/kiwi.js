/// <reference path="../../src/Kiwi.ts" />

export class Buttons extends Kiwi.State {

    constructor() {
        super('Buttons');
    }
    
    public button: Kiwi.HUD.Button;
    public buttonState: string;
    public chest: Kiwi.GameObjects.Sprite;

    init() {
        this.buttonState = 'chestclosed';
    }

    preload() {
        this.addImage('chestclosed', 'assets/sprites/planetcute/Chest Closed.png', false);
        this.addImage('chestopen', 'assets/sprites/planetcute/Chest Open.png', false);
    }

    create() {
        this.button = new Kiwi.HUD.Button(this.game, 100,100, 10, 10);
        this.button.container.style.backgroundColor = 'red';
        this.button.text('Open');

        this.game.huds.defaultHUD().addWidget(this.button);

        this.button.input.inputOnRelease.add(this.change, this);

        this.chest = new Kiwi.GameObjects.Sprite(this.buttonState, this.cache, 100, 100);
        this.addChild(this.chest);
    }

    change() {
        if (this.buttonState === 'chestclosed') {
            this.buttonState = 'chestopen';
            this.button.text('Close');
        } else {
            this.buttonState = 'chestclosed';
            this.button.text('Open');
        }

        this.chest.texture.changeTexture(this.buttonState, this.cache);
    }

}