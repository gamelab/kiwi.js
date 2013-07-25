/// <reference path="../../src/Kiwi.ts" />

export class Icons extends Kiwi.State {

    constructor() {
        super('icons');
    }

    public icon: Kiwi.HUD.Icon;
    public boy: Kiwi.GameObjects.Sprite;
    public icons: Array;
    public currentIcon: number;

    init() {
        this.currentIcon = 0;
        this.icons = ['BlueGem', 'GreenGem', 'OrangeGem'];
    }

    preload() {
        this.addImage('BlueGem', 'assets/sprites/planetcute/Gem Blue.png', false);
        this.addImage('GreenGem', 'assets/sprites/planetcute/Gem Green.png', false);
        this.addImage('OrangeGem', 'assets/sprites/planetcute/Gem Orange.png', false);
        this.addImage('boy', 'assets/sprites/planetcute/Character Boy.png', false);
    }

    create() {
        this.icon = new Kiwi.HUD.Icon(this.icons[this.currentIcon], this.cache, 10,10);
        
        this.game.huds.defaultHUD().addWidget(this.icon);

        this.boy = new Kiwi.GameObjects.Sprite('boy', this.cache, 100, 100);
        this.addChild(this.boy);

        this.boy.input.inputOnRelease.add(this.changeIcon, this);
    }

    changeIcon() {

        this.currentIcon++;
        if (this.currentIcon >= this.icons.length) this.currentIcon = 0;

        this.icon.texture.changeTexture( this.icons[this.currentIcon], this.cache );

    }

}