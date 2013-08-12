/// <reference path="../../src/Kiwi.ts" />

class StaticImages extends Kiwi.State {

    constructor() {
        super('StaticImages');
    }

    preload() {
        this.addImage('zombie', 'assets/zombie.png', false);
    }

    public zom: Kiwi.GameObjects.StaticImage;

    create() {
        this.zom = new Kiwi.GameObjects.StaticImage('zombie', this.cache, 100, 100);

        this.addChild(this.zom);
    }

}