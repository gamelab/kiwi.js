/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can add callbacks to the input component.
**/

class InputComponent extends Kiwi.State {

    constructor() {
        super('InputComponent');
    }

    preload() {
        this.addImage('ninja', 'assets/static/ninja.png');
        this.addImage('bullet', 'assets/static/bullet-normal.png');
    }

    public ninja: Kiwi.GameObjects.Sprite;
    public bullets: Kiwi.GameObjects.StaticImage[];

    create() {

        //create the ninja. Enable the input component by passing true.
        this.ninja = new Kiwi.GameObjects.Sprite(this, this.textures.ninja, 10, 10, true);
        this.addChild(this.ninja);
        
        /**
        * Add a callback to the onUp event.
        * Other events are:
        * onDown
        * onEntered
        * onLeft
        **/
        this.ninja.input.onUp.add(this.shoot, this);
        
        //create a new array to hold the bullets
        this.bullets = [];
    }

    //the modern day ninja shoots
    shoot() {
        //create a new bullet. StaticImage will do here since we don't want to do any collision or animation that involves spritesheets.
        var bullet = new Kiwi.GameObjects.StaticImage(this, this.textures.bullet, this.ninja.x + this.ninja.width, this.ninja.y + this.ninja.height / 2);
        this.addChild(bullet);
        this.bullets.push(bullet);
    }

    update() {
        
        super.update();

        //loop through all of the bullets in the array and move them by 10 pixels everyframe
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].x += 10;
        }
        
    }

}