/**
* This script is a demonstration of how you can drag a sprite using the input component.
**/
var Dragging = new Kiwi.State('Dragging');

Dragging.preload = function () {
    this.game.stage.resize(800, 350);
    this.addImage('ninja', 'assets/static/ninja.png');
    this.addImage('pirate', 'assets/static/pirate.png');
}

Dragging.create = function () {
    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Drag the pirate and ninja around the stage!', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

    //Create the ninja. Enable the input component by passing true.
    this.ninja = new Kiwi.GameObjects.Sprite(this, this.textures.ninja, 10, 10, true);
    this.addChild(this.ninja);

    //Create the pirate.
    this.pirate = new Kiwi.GameObjects.Sprite(this, this.textures.pirate, 400, 120, true);
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



//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', Dragging,  gameOptions);