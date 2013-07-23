/// <reference path="../../src/Kiwi.ts" />

export class Buttons extends Kiwi.State {

    constructor() {
        super('Buttons');
    }
    
    public button: Kiwi.HUD.Button;
    public buttonState: string;

    init() {
        this.buttonState = 'chestclosed';
    }

    preload() {
        this.addImage('chestclosed', 'assets/sprites/planetcute/Chest Closed.png', false);
        this.addImage('chestopen', 'assets/sprites/planetcute/Chest Open.png', false);
    }

    create() {
        this.button = new Kiwi.HUD.Button(this.game, this.buttonState, this.cache, 50, 50);
        
        this.game.huds.defaultHUD().addWidget(this.button);

        this.button.input.inputOnRelease.add(this.change, this);
    }

    change() {
        if (this.buttonState === 'chestclosed') this.buttonState = 'chestopen';
        else this.buttonState = 'chestclosed';

        this.button.changeIcon(this.buttonState);
    }

}