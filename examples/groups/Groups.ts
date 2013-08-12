/// <reference path="../../src/Kiwi.ts" />

class Groups extends Kiwi.State {

    constructor() {
        super('Groups');
    }

    preload() {
        this.addImage('zombie', 'assets/zombie.png', false);
    }

    public group: Kiwi.Group;
    public zombieA: Kiwi.GameObjects.Sprite;
    public zombieB: Kiwi.GameObjects.Sprite;

    create() {

        this.zombieA = new Kiwi.GameObjects.Sprite('zombie', this.cache, 100, 100);
        this.zombieB = new Kiwi.GameObjects.Sprite('zombie', this.cache, 300, 100);
        this.group = new Kiwi.Group('testing');
        
        this.group.addChild(this.zombieA);

        this.addChild(this.group);

        this.group.addChild(this.zombieB);


        
        this.game.input.mouse.mouseUp.add(this.check, this);
    }

    check() {
        console.log(this.zombieA.game, this.zombieB.game);
        
    }

}