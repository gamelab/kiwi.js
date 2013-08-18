/// <reference path="../../src/Kiwi.ts" />

class Dragging extends Kiwi.State {

    constructor() {
        super('Dragging');
    }

    preload() {
        this.addImage('xenon', 'assets/sprites/xenon2_ship.png');
    }

    public ship: Kiwi.GameObjects.Sprite;

    create() {

        this.ship = new Kiwi.GameObjects.Sprite(this.textures.xenon, 100, 100);
        this.ship.input.enableDrag();


        this.addChild(this.ship);
    }

}