/// <reference path="../../src/Kiwi.ts" />

class ScaleComponent extends Kiwi.State {

    constructor() {

        super('ScaleComponent');
    }

    zombie: Kiwi.GameObjects.Sprite;
    zombie2: Kiwi.GameObjects.Sprite;
    zombie3: Kiwi.GameObjects.Sprite;

    preload() {

        this.addImage('zombie', 'assets/zombie.png');
    }

    create() {

        this.zombie = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 33, 40);
        this.zombie2 = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 50, 200);
        this.zombie3 = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 400, 100);

        this.zombie2.scale.setXY(0.5, 0.5);

        this.addChild(this.zombie);
        this.addChild(this.zombie2);
        this.addChild(this.zombie3);
    }

    update() {

        super.update();

        if (this.zombie3.scale.getScaleAsPoint().x > 2)
            this.zombie3.scale.setXY(.5, .5);
        else
            this.zombie3.scale.setXY(this.zombie3.scale.getScaleAsPoint().x + 0.01, this.zombie3.scale.getScaleAsPoint().y + 0.01);

    }


}

