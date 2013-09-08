/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can drag a sprite using the input component.
**/

class Dragging extends Kiwi.State {

    constructor() {
        super('Dragging');
    }

    preload() {
        this.addImage('ninja', 'assets/static/ninja.png');
        this.addImage('pirate', 'assets/static/pirate.png');
    }

    public ninja: Kiwi.GameObjects.Sprite;
    public pirate: Kiwi.GameObjects.Sprite;

    create() {

        //create the ninja. Enable the input component by passing true.
        this.ninja = new Kiwi.GameObjects.Sprite(this, this.textures.ninja, 10, 10, true);
        this.addChild(this.ninja);

        //create the pirate. 
        this.pirate = new Kiwi.GameObjects.Sprite(this, this.textures.pirate, 400, 300, true);
        this.addChild(this.pirate);

        /**
        * When you want a sprite to be draggable you have to enable the drag on that element.
        **/
        this.ninja.input.enableDrag();

        /**
        * Parameter One - OPTIONAL - Snap the sprite to the center. - Default to false
        * Parameter Two - OPTIONAL - Distance between gridpoints in which the sprite should snap to.
        **/
        this.pirate.input.enableDrag(true, 25);
         
    }
     
}