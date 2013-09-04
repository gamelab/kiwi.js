/// <reference path="../../src/Kiwi.ts" />

class Finger extends Kiwi.State {

    constructor() {
        super('Finger');
    }

    preload() {
        this.addImage('bunny', 'assets/bunny.png');
    }

    finger: Kiwi.Input.Finger = null;
    bunny: Kiwi.GameObjects.Sprite;

    create() {
        
        this.bunny = new Kiwi.GameObjects.Sprite(this,this.textures.bunny, 0, 0);
        this.addChild(this.bunny);
        this.bunny.alpha = 0;

        this.game.input.onDown.add(this.pressed, this);
        this.game.input.onUp.add(this.released, this);
        
    }

    pressed(x, y, timeDown, timeUp, duration, finger) {
        if (this.finger == null) { 
            this.finger = finger;
            this.bunny.alpha = 1;
            this.bunny.x = finger.x;
            this.bunny.y = finger.y;
        }
    }

    released(x, y, timeDown, timeUp, duration, finger) {
        if (this.finger.id  == finger.id) { 
            this.bunny.alpha = 0;
            this.finger = null;
        }
    }
     
    update() {
        super.update();

        if (this.finger !== null && this.finger.active) {
            
            this.bunny.x = this.finger.x;
            this.bunny.y = this.finger.y;

        }

    }

}