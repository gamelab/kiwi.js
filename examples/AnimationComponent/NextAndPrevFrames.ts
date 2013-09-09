/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can go to the next/previous frame in an animation.
**/

class NextAndPrevFrames extends Kiwi.State {

    constructor() {
        super('NextAndPrevFrames');
    }

    preload() {
        this.addSpriteSheet('characters', 'assets/spritesheets/characters.png', 150, 117);
    }

    changer: Kiwi.GameObjects.Sprite;

    create() {

        //add to stage
        this.changer = new Kiwi.GameObjects.Sprite(this, this.textures.characters, 300, 100);
        this.addChild(this.changer);

        //add click event to whole stage.
        this.game.input.onUp.add(this.released, this);
    }

    /**
    * This is the callback for when the gameworld gets clicked.
    * If the mouse's x was on the left side of the screen then it will go to the previous frame in the animation.
    * If the mouse's x was on the right side of the screen then it will go to the next frame in the animation.
    **/
    released(x) {
        if (x > this.game.stage.width / 2) {
            this.changer.animation.nextFrame();
        } else {
            this.changer.animation.prevFrame();
        }
    }

}