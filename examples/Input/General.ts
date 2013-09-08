/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of general input events in Kiwi.
*
* The input manager is always there and will dispatch onUp/onDown events regardless of if it was a touch or mouse cursor that was used.
* This way you can create 'events' where it won't matter which one you use.
*
**/

class General extends Kiwi.State {

    constructor() {
        super('General');
    }

    preload() {
        this.addImage('ninja', 'assets/static/ninja.png'); 
    }
    
    create() {
        /**
        * To access general input events you can access the input manager.
        * The input manager is who managers the dispatching of input events.
        * We are adding an onUp event to be listened to.
        **/
        this.game.input.onUp.add(this.showNinja, this);
    }

    /**
    * When the input manager fires the event he send information as well.
    * Parameter one - x coordinate of click.
    * Parameter two - y coordinate of click.
    **/
    showNinja(x, y) {
        //create the ninja. Enable the input component by passing true.
        var ninja = new Kiwi.GameObjects.Sprite(this, this.textures.ninja, x, y, true);
        this.addChild(ninja);
         
    }
   
}