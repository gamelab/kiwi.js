/// <reference path="../../src/Kiwi.ts" />

class Dragging extends Kiwi.State {

    constructor() {
        super('Dragging');
    }

    preload() {
        this.addImage('bunny', 'assets/bunny.png');
    }

    bunny: Kiwi.GameObjects.Sprite;

    create() {

        this.bunny = new Kiwi.GameObjects.Sprite(this,this.textures.bunny, 200, 200, true);
        this.addChild(this.bunny);

        this.bunny.input.enableDrag();

    }

}