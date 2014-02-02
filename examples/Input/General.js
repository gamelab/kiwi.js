/**
* This script is a demonstration of general input events in Kiwi.
*
* The input manager is always there and will dispatch onUp/onDown events regardless of if it was a touch or mouse cursor that was used.
* This way you can create 'events' where it won't matter which one you use.
*
**/
var General = new Kiwi.State('General');

General.preload = function () {
    this.game.stage.resize(800, 350);
    this.addImage('ninja', 'assets/static/ninja.png');
}

General.create = function () {
    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Click anywhere to make a ninja appear!', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

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
General.showNinja = function (x, y) {

    //create the ninja. Enable the input component by passing true.
    var ninja = new Kiwi.GameObjects.Sprite(this, this.textures.ninja, x, y, true);
    this.addChild(ninja);
}


//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', General,  gameOptions);