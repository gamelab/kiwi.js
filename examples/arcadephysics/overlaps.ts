/// <reference path="../../src/Kiwi.ts" />

class overlaps extends Kiwi.State {

    constructor() {
        super('overlaps');
    }

    preload() {
        this.addImage('zombie', 'assets/zombie.png', false);
        this.addImage('spartan', 'assets/spartan.png', false);
    }

    zombie: custom;
    spartan: custom;

    create() {
        
        this.zombie = new custom(this,this.textures.zombie, 100, 100);
        this.spartan = new custom(this,this.textures.spartan, 400, 100);

        this.addChild(this.zombie);
        this.addChild(this.spartan);

    }


    update() {
        super.update();
        
        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.LEFT)) {
            this.zombie.transform.x -= 5;
        } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.RIGHT)) {
            this.zombie.transform.x += 5;
        }

        this.spartan.phy.overlaps(this.zombie, true);
    }

}

class custom extends Kiwi.GameObjects.Sprite {

    constructor(state,atlas, x, y) {
        super(state,atlas, x, y);
        
        this.phy = this.components.add(new Kiwi.Components.ArcadePhysics(this));
    }

    public phy: Kiwi.Components.ArcadePhysics;

    update() {
        super.update();
        this.phy.update();
    }

}
