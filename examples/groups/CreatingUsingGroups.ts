/// <reference path="../../src/Kiwi.ts" />

/*
 * In this example we will look at creating and using groups
*/

class CreatingUsingGroups extends Kiwi.State {

    constructor() {
        super("myState");
    }

    public left: Kiwi.Input.Key;
    public right: Kiwi.Input.Key;
    public down: Kiwi.Input.Key;
    public up: Kiwi.Input.Key;
    public space: Kiwi.Input.Key;

    //Declare a new group
    public group: Kiwi.Group;

    preload() {

        this.addImage('ball', 'assets/shinyball.png');

    }

    create() {

        //Create the group
        this.group = new Kiwi.Group(this);
        this.group.addChild(this.addChild(new Kiwi.GameObjects.Sprite(this,this.textures.ball, Math.random() * 400 + 100, Math.random() * 400 + 100)));

        this.left = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.LEFT);
        this.right = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.RIGHT);
        this.down = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.DOWN);
        this.up = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.UP);
        this.space = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.SPACEBAR);

    }

    update() {
        super.update();
        var m = this.group.members;

        if (this.left.isDown) {
            for (var i: number = 0; i < m.length; i++) {
                var b = <Kiwi.Entity>m[i];
                b.components.getComponent("Position").x(b.components.getComponent("Position").x() - 1);
            }
        }
        if (this.right.isDown) {
            for (var i: number = 0; i < m.length; i++) {
                var b = <Kiwi.Entity> m[i];
                b.components.getComponent("Position").x(b.components.getComponent("Position").x() + 1);
            }
        }
        if (this.up.isDown) {
            for (var i: number = 0; i < m.length; i++) {
                var b = <Kiwi.Entity>m[i];
                b.components.getComponent("Position").y(b.components.getComponent("Position").y() - 1);
            }
        }
        if (this.down.isDown) {
            for (var i: number = 0; i < m.length; i++) {
                var b = <Kiwi.Entity>m[i];
                b.components.getComponent("Position").y(b.components.getComponent("Position").y() + 1);
            }
        }
        if (this.space.isDown) {
            this.group.addChild(this.addChild(new Kiwi.GameObjects.Sprite(this,this.textures.ball, Math.random() * 400 + 100, Math.random() * 400 + 100)));
        }

    }


}