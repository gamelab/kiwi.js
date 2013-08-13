/// <reference path="../../src/Kiwi.ts" />
/*
class group extends Kiwi.State {

    constructor() {
        super('overlaps');
    }

    preload() {
        this.addImage('shiny', 'assets/shinyball.png', false);
        this.addImage('spartan', 'assets/spartan.png', false);
    }

    balls: Kiwi.Group;
    spartan: custom;

    create() {

        this.balls = new Kiwi.Group();
        this.spartan = new custom('spartan', this.cache, 400, 100);

        this.addChild(this.spartan);

    }

    update() {
        super.update();

        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.LEFT)) {
            this.spartan.transform.x -= 5;
        } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.RIGHT)) {
            this.spartan.transform.x += 5;
        }

        //this.spartan.phy.overlaps(this.zombie, true);
    }

}

class custom extends Kiwi.GameObjects.Sprite {

    constructor(cacheID, cache, x, y) {
        super(cacheID, cache, x, y);

        this.phy = this.components.add(new Kiwi.Components.ArcadePhysics(this));
    }

    public phy: Kiwi.Components.ArcadePhysics;

    update() {
        super.update();
        this.phy.update();
    }

}*/