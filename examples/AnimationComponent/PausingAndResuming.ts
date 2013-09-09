/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can go to the pause and resume an animation.
**/

class PausingAndResuming extends Kiwi.State {

    constructor() {
        super('PausingAndResuming');
    }

    preload() {
        this.addSpriteSheet('zombie', 'assets/spritesheets/zombie.png', 150, 117);
    }

    public zombie: Kiwi.GameObjects.Sprite;

    create() {

        //create
        this.zombie = new Kiwi.GameObjects.Sprite(this, this.textures.zombie, 10, 10);
        this.addChild(this.zombie);

        this.zombie.animation.add('running!', [0, 1, 2, 3, 4, 5, 6], 0.1, true);
        this.zombie.animation.play('running!');

        //when someone clicks on the screen then either pause or resume the animation based off what the animation was doing. 
        this.game.input.onUp.add(this.released, this);
    }

    //callback for when someone clicks on the screen.
    released() {
        if (this.zombie.animation.isPlaying) {
            this.zombie.animation.pause();
        } else {
            this.zombie.animation.resume();
        }    
    }

}