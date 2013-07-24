/// <reference path="../../src/Kiwi.ts" />

class InputComponent extends Kiwi.State {

    constructor() {

        super('InputComponent');
    }

    zombie: Kiwi.GameObjects.Sprite;

    preload() {

        this.addImage('zombie', 'assets/zombie.png');
    }

    create() {

        this.zombie = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 400, 40);

        this.zombie.input.enableDrag(false, 1);

        this.addChild(this.zombie);
    }
    
    update() {

        super.update();

    }


}

