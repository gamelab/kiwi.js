/// <reference path="../../src/Kiwi.ts" />



class GroupGraph extends Kiwi.State {

    constructor() {
        super("myState");
    }



    preload() {

        for (var i = 0; i < 10; i++) {
            this.addImage('ball' + i, 'assets/sprites/Enemy Bug.png');
        }

    }

    create() {

        //Create the group
        for (var i = 0; i < 10; i++) {
            this.addChild(this.addChild(new Kiwi.GameObjects.Sprite('ball' + i, this.game.cache, Math.random() * 400 + 100, Math.random() * 400 + 100)));
        }

    }

    update() {
        super.update();

    }


}