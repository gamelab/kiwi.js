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
        
        this.rocket = new Kiwi.GameObjects.Sprite(this, this.textures.rocket, 400, 200);
        this.addChild(this.rocket);

        this.rocket.rotation -= Math.PI / 2;

        this.game.input.mouse.onWheel.add(this.move, this);
        
    }

    move(deltaX, deltaY) {

        this.rocket.y -= deltaY / 4;

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

var game = new Kiwi.Game('game', 'KiwiExample', MouseManager, gameOptions );