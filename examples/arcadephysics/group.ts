/// <reference path="../../src/Kiwi.ts" />

class group extends Kiwi.State {

    constructor() {
        super('overlaps');
    }

    preload() {
        this.addImage('shiny', 'assets/shinyball.png', false);
        this.addImage('spartan', 'assets/spartan.png', false);
    }

    balls: Kiwi.Group;
    spartan: customB;
    numBalls: number = 3;

    create() {

        this.balls = new Kiwi.Group(this);
        this.addChild(this.balls);

        this.spartan = new customB(this, this.textures.spartan, 400, 100);
        this.spartan.phy.immovable = true;

        for (var i = 0; i < this.numBalls; i++) {
            var ball = new customB(this,this.textures.shiny, Math.random() * this.game.stage.width , this.game.stage.height * Math.random());
            
            this.balls.addChild(ball);
        }

        this.addChild(this.spartan);
        
    }

    update() {
        super.update();
        
        for (var i = 0; i < this.balls.members.length; i++) {

            
            if (this.balls.members[i].childType() == Kiwi.ENTITY) {
                
                var b = <Kiwi.Entity> this.balls.members[i];
                b.x-= 5;

                if (b.x + b.width < 0) {
                    b.x = this.game.stage.width;
                    b.y = this.game.stage.height * Math.random();
                }
            }
        }

        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.LEFT)) {
            this.spartan.transform.x -= 5;
        } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.RIGHT)) {
            this.spartan.transform.x += 5;
        }

        this.spartan.phy.overlapsGroup(this.balls, true);
    }

}

class customB extends Kiwi.GameObjects.Sprite {

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