/// <reference path="../../src/Kiwi.ts" />

export class Buttons extends Kiwi.State {

    constructor() {
        super('Buttons');
    }
    
    public button: Kiwi.HUD.Widget.Button;
    public buttonState: string;

    init() {
        this.buttonState = 'chestclosed';
    }

    create() {
        this.button = new Kiwi.HUD.Widget.Button(this.game, 100,100, 10, 10);
        this.button.container.style.backgroundColor = 'red';
        this.button.text('Open');

        this.game.huds.defaultHUD.addWidget(this.button);

        this.button.input.inputOnRelease.add(this.change, this);

    }

    change() {
        if (this.buttonState === 'chestclosed') {
            this.buttonState = 'chestopen';
            this.button.text('Close');
        } else {
            this.buttonState = 'chestclosed';
            this.button.text('Open');
        }

    }

}