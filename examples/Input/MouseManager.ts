/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of some unique mouse input events in Kiwi.
*
* The input manager is always there and will dispatch onUp/onDown events regardless of if it was a touch or mouse cursor that was used.
* This way you can create 'events' where it won't matter which one you use.
* 
**/

class MouseManager extends Kiwi.State {

    constructor() {
        super('MouseManager');
    }

    preload() {
        this.addImage('rocket', 'assets/static/bullet-rocket.png');
    }

    rocket: Kiwi.GameObjects.Sprite;

    create() {
        if (Kiwi.DEVICE.touch == false) {
            
            this.rocket = new Kiwi.GameObjects.Sprite(this, this.textures.rocket, 400, 200);
            this.addChild(this.rocket);

            this.rocket.rotation -= Math.PI / 2;

            this.game.input.mouse.mouseWheel.add(this.move, this);

        }
    }
    
    move(deltaX, deltaY) {

        this.rocket.y -= deltaY / 4;

    }

}