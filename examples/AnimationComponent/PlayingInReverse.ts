/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can go to the reverse an animation.
**/

class PlayingInReverse extends Kiwi.State {

    constructor() {
        super('PlayingInReverse');
    }

    preload() {
        this.addSpriteSheet('zombie', 'assets/spritesheets/zombie.png', 150, 117);
    }

    zombie: Kiwi.GameObjects.Sprite;
    walkAnim: Kiwi.Animations.Animation;

    create() {

        //add to stage
        this.zombie = new Kiwi.GameObjects.Sprite(this, this.textures.zombie, 300, 100);
        this.addChild(this.zombie);

        //add the animation and make sure save the animation that we just added.
        this.walkAnim = this.zombie.animation.add('forwards', [1, 2, 3, 4, 5, 6], 0.2, true); 
        this.zombie.animation.play('forwards');

        //when the animation gets clicked reverse it.
        this.zombie.input.onUp.add(this.reverse, this);
    }

    //reverse the animation.  If the animation is currently not playing is reverse then reverse. If it is then play in reverse.
    reverse() {
        this.walkAnim.reverse = !this.walkAnim.reverse;
    }
     
}