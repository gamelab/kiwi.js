
/**
* This script is a demonstration of how you can create a TileMap and its layers programmatically (through the code) without having a JSON file define it for you.
*
**/

var IsometricTileMaps = new Kiwi.State('IsometricTileMaps');

IsometricTileMaps.preload = function () {

    //Load in the TileMap
    this.addJSON('mapjson', 'assets/isometric/isometric-tilemap.json');

    //Load in our Tilemap Spritesheet. We will be using this for our tile assets.
    this.addSpriteSheet('blocks', 'assets/isometric/blocks.png', 64, 64);

}

IsometricTileMaps.create = function () {

    //Create the Tilemap. 
    this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'mapjson', this.textures.blocks);

    for(var i = 0; i < this.tilemap.layers.length; i++) {
        this.addChild(this.tilemap.layers[i]);
    }

}



//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', IsometricTileMaps,  gameOptions);