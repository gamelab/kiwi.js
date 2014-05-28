/**
* This script is a demonstration of how you can create sprite game objects in Kiwi.
*
* A sprite is a regular/general purpose game object that you would have in Kiwi. With a sprite you can do:
* - Animation using a spritesheet
* - Listen for click/touch events
* - Scale/Rotate
**/
var Sprite = new Kiwi.State('Sprite');

Sprite.preload = function () {
    this.game.stage.resize(800, 250);
    // Load out saloon background and ninja
    this.addImage('pirate', 'assets/static/pirate.png');

}

Sprite.create = function () {
    /**
    * Kiwi.GameObjects.Sprite.
    * - Parameter One - State that this gameobject belongs to.
    * - Parameter Two - Texture that this static image is to have.
    * - Parameter Three - OPTIONAL - X coordinate - Defaults to 0
    * - Parameter FOUR - OPTIONAL - Y coordinate - Defaults to 0
    * - Parameter FIVE - OPTIONAL - Enable input component - Defaults to false
    *
    * Note: Don't worry if you have told a sprite that you don't want to use the input. It can always be created later.
    **/
    this.pirate = new Kiwi.GameObjects.Sprite(this, this.textures.pirate, 300, 30);
    this.addChild(this.pirate);
      
}

//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if (typeof gameOptions == "undefined") {
    gameOptions = {};
} 
var game = new Kiwi.Game('game', 'KiwiExample', Sprite, gameOptions);

