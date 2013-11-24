/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can drag a sprite using the input component.
**/

class Dragging extends Kiwi.State {

    constructor() {
        super('Dragging');
    }

    preload() {
    this.game.stage.resize(800, 350);
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


//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if (typeof gameOptions  == "undefined") var gameOptions  = {};

var game = new Kiwi.Game('game', 'KiwiExample', Dragging, gameOptions );