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

        if (Kiwi.DEVICE.touch) {
            this.bunny = new Kiwi.GameObjects.Sprite(this.textures.bunny, 0, 0);
            this.addChild(this.bunny);
            this.bunny.alpha = 0;

            this.game.input.touch.fingerDown.add(this.pressed, this);
            this.game.input.touch.fingerUp.add(this.released, this);
        
        }

    }

    pressed(finger) {
        if (this.finger == null) {
            console.log('Pressed');
            this.finger = finger;
            this.bunny.alpha = 1;
            this.bunny.x = finger.x;
            this.bunny.y = finger.y;
        }
    }

    released(finger) {
        if (this.finger.identifier == finger.identifier) {
            console.log('Released');
            this.bunny.alpha = 0;
            this.finger = null;
        }
    }

    moved(finger) {
        if (this.finger !== null && this.finger.identifier == finger.identifier) {
            console.log('Moved');
            this.bunny.x = finger.x;
            this.bunny.y = finger.y;
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