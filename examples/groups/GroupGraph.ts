/// <reference path="../../src/Kiwi.ts" />
/// <reference path="../../plugins/DevTools/src/SceneGraphViewer.ts" />




class GroupGraph extends Kiwi.State {

    constructor() {
        super("myState");
    }



    preload() {

        for (var i = 0; i < 3; i++) {
            this.addImage('bug' + i, 'assets/sprites/planetcute/Enemy Bug.png');
        }
        for (var i = 0; i < 3; i++) {
            this.addImage('star' + i, 'assets/sprites/planetcute/Star.png');
        }
        

    }

    public subGroup: Kiwi.Group;

    create() {
        this.game.stage.frameRate(5);
        //Create the group
    /*    for (var i = 0; i < 3; i++) {
            this.addChild(new Kiwi.GameObjects.Sprite('bug' + i, this.game.cache, Math.random() * 100, Math.random()  * 100));
        }
*/


        this.subGroup = new Kiwi.Group();
        for (var i = 0; i < 3; i++) {
            this.subGroup.addChild(new Kiwi.GameObjects.Sprite('star' + i, this.game.cache, Math.random() * 100, Math.random() * 100));
        }

        this.addChild(this.subGroup);
    
    }

    public aaa: number = 0;
    public bbb: number = 0;
    
    update() {
        super.update();

        this.subGroup.transform.x(this.aaa++);
        this.subGroup.transform.rotation(this.bbb);
        this.bbb += 0.01;

    }


}