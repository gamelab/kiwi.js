/**
* This script is a demonstration of how you can create static image game objects in Kiwi.
*
* A static image is designed to be a light weight game object that is used for backgrounds/areas of the game in which little (or no) interaction would happen.
* Because of that, a static image does not have as much components as a sprite.
*
**/
var StaticImage = new Kiwi.State('StaticImage');

StaticImage.init = function () {
    this.game.stage.resize(768, 512);
}

StaticImage.preload = function () {
    // Load out saloon background and ninja
    this.addImage('background', 'assets/static/saloon-bg.png');
}

StaticImage.create = function () {
    /**
    * Kiwi.GameObjects.StaticImage.
    * - Parameter One - State that this gameobject belongs to.
    * - Parameter Two - Texture that this static image is to have.
    * - Parameter Three - OPTIONAL - X coordinate - Defaults to 0
    * - Parameter FOUR - OPTIONAL - Y coordinate - Defaults to 0
    **/
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.background, 0, 0);
    this.addChild(this.background);
}



//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', StaticImage,  gameOptions);