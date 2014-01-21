/**
* This script is a demonstration of how you can use a basic spritesheet. This covers loading of spritesheets and changing the cell gameobjects will use.
**/
var Spritesheets = new Kiwi.State('Spritesheets');

Spritesheets.preload = function () {
    //Just making the stage smaller
    this.game.stage.resize(800, 250);
    // Load our spritesheet we want to use.
    /**
    * When loading spritesheets you have to pass slightly more information.
    * - Parameter One - Name of the spritesheet for your reference.
    * - Parameter Two - The URL to the spritesheet.
    * - Parameter Three - The width of each cell
    * - Parameter Four - The height of each cell
    **/
    this.addSpriteSheet('characters', 'assets/spritesheets/characters.png', 150, 117);
}

Spritesheets.create = function () {
    /**
    * To change which cell the sprite is using we can change the CELL INDEX which is on both the sprite and static image objects.
    **/
    this.skele = new Kiwi.GameObjects.Sprite(this, this.textures.characters, 10, 30);
    this.skele.cellIndex = 2;

    this.robot = new Kiwi.GameObjects.Sprite(this, this.textures.characters, 210, 30);
    this.robot.cellIndex = 8;

    this.spartan = new Kiwi.GameObjects.Sprite(this, this.textures.characters, 410, 30);
    this.spartan.cellIndex = 5;

    //add them all to the stage
    this.addChild(this.skele);
    this.addChild(this.robot);
    this.addChild(this.spartan);
}



//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', Spritesheets,  gameOptions);