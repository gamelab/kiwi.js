/// <reference path="../../src/Kiwi.ts" />

class arrays extends Kiwi.State {

    preload() {
        this.addImage('horngirl', 'assets/sprites/planetcute/Character Horn Girl.png');
        this.addImage('heart', 'assets/sprites/planetcute/Heart.png');
    }

    hearts: Custom[];
    dump: Custom[];
    horngirl: Custom;

    create() {
        this.horngirl = new Custom(this.textures.horngirl, this.game.stage.width / 2, 50);
        this.horngirl.physics.immovable = true;
        this.addChild(this.horngirl);

        this.horngirl.physics.setCallback(this.removeHeart, this);

        this.dump = [];
        this.hearts = [];

        this.game.input.onUp.add(this.createHeart, this);
        
        this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
        this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);
    }

    createHeart() {
        var h = new Custom(this.textures.heart, Math.random() * (this.game.stage.width - this.textures.heart.cells[0].w), this.game.stage.height);
        this.addChild(h);
        this.hearts.push(h);

    }

    removeHeart(horn, heart) {
        
        if (this.hearts.indexOf(heart) !== -1) {
            this.dump.push(heart);
        }

    }

    update() {
        super.update();

        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.A)) {
            this.horngirl.x -= 4;
        }

        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.D)) {
            this.horngirl.x += 4;
        }

        for (var i = 0; i < this.hearts.length; i++) {

            this.hearts[i].y -= 2;

            if (this.hearts[i].y + this.hearts[i].height < 0) {
                this.dump.push(this.hearts[i]);
            }
        }

        this.horngirl.physics.overlapsGroup(this.hearts, true);
        
        for (var i = this.dump.length - 1; i >= 0; i--) {
            if (this.hearts.indexOf(this.dump[i]) !== -1) {
                this.removeChild(this.dump[i]);
                this.hearts.splice(this.hearts.indexOf(this.dump[i]), 1);
            }    
        }

        this.dump = [];

    }

}

class Custom extends Kiwi.GameObjects.Sprite {

    constructor(atlas, x, y) {
        super(atlas, x, y, false);

        this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this));
    }

    public physics: Kiwi.Components.ArcadePhysics;

}
