/// <reference path="../../src/Kiwi.ts" />

class AddingChildren extends Kiwi.State {

    constructor() {
        super('AddingChildren');
    }

    preload() {
        this.addSpriteSheet('zombie', 'assets/zombieSprite.png', 150, 117);
    }
    
    create() {
          

        var group = new Kiwi.Group(this);
        group.x -= 50;
        var group2:Kiwi.Group = new Kiwi.Group(this);
        group2.y += 100;
        var group3 = new Kiwi.Group(this);
        group3.x += 100;
        var group4 = new Kiwi.Group(this);
        group4.x += 100;
        var group5 = new Kiwi.Group(this);
        group5.x += 100;

        var zom = new Kiwi.GameObjects.Sprite(this, this.textures.zombie, 0, 0);
        group.addChild(group2);
        group5.addChild(zom);
        this.addChild(group);   
        group2.addChild(group3);
        group4.addChild(group5);
        group3.addChild(group4);

        console.log(this);
    }

}