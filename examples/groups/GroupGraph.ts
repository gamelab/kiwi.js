/// <reference path="../../src/Kiwi.ts" />
/// <reference path="../../plugins/DevTools/src/SceneGraphViewer.ts" />




class GroupGraph extends Kiwi.State {

    constructor() {
        super("myState");
    }



    preload() {

        for (var i = 0; i < 10; i++) {
            this.addImage('bug' + i, 'assets/sprites/planetcute/Enemy Bug.png');
        }
        for (var i = 0; i < 10; i++) {
            this.addImage('star' + i, 'assets/sprites/planetcute/Star.png');
        }
        for (var i = 0; i < 10; i++) {
            this.addImage('rock' + i, 'assets/sprites/planetcute/Rock.png');
        }

    }

    create() {

        //Create the group
        for (var i = 0; i < 10; i++) {
            this.addChild(this.addChild(new Kiwi.GameObjects.Sprite('bug' + i, this.game.cache, Math.random() * 400 + 100, Math.random() * 400 + 100)));
        }

        var subGroup: Kiwi.Group = new Kiwi.Group();
        for (var i = 0; i < 10; i++) {
            subGroup.addChild(this.addChild(new Kiwi.GameObjects.Sprite('star' + i, this.game.cache, Math.random() * 400 + 100, Math.random() * 400 + 100)));
        }

        this.addChild(subGroup);

        var subsubGroup: Kiwi.Group = new Kiwi.Group();
        for (var i = 0; i < 10; i++) {
            subsubGroup.addChild(this.addChild(new Kiwi.GameObjects.Sprite('rock' + i, this.game.cache, Math.random() * 400 + 100, Math.random() * 400 + 100)));
        }

        this.addChild(subsubGroup);

        var sgc: Kiwi.DevTools.SceneGraphViewer = new Kiwi.DevTools.SceneGraphViewer(this, null);
    }

    update() {
        super.update();

    }


}