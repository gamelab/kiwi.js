
/**
* This script is a demonstration of how you can create a TileMap and its layers programmatically (through the code) without having a JSON file define it for you.
*
**/

var ChangingTileData = new Kiwi.State('ChangingTileData');

ChangingTileData.preload = function () {
    //Load in the TileMap
    this.addJSON('desertTilemap', 'assets/war/json/desert-blank.json');

    //Load in our Tilemap Spritesheet. We will be using this for our tile assets.
    this.addSpriteSheet('desertSpritesheet', 'assets/war/tiles/tile-spritesheet.png', 48, 48);

    //Load in the tileoutline
    this.addImage('tileoutline', 'assets/misc/tileoutline.png');

    //Make the stage a bit smaller for now.
    this.game.stage.resize(800, 250);
}

ChangingTileData.create = function () {

    //Create the Tilemap. 
    this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'desertTilemap', this.textures.desertSpritesheet);

    //Get the TilemapLayer
    this.tilemaplayer = this.tilemap.layers[0];

    //Add to the stage.
    this.addChild( this.tilemaplayer );

    //tileoutline 
    this.tileoutline = new Kiwi.GameObjects.StaticImage(this, this.textures.tileoutline, -48, -48);
    this.addChild(this.tileoutline);

    //On click event
    this.game.input.onUp.add(this.replace, this);
}


ChangingTileData.replace = function(x, y) {

    //Figure out where the tile was 
    var index = this.tilemaplayer.getIndexFromCoords(x, y);

    this.tilemaplayer.setTileByIndex(index, 36);
}

ChangingTileData.update = function() {

    Kiwi.State.prototype.update.call(this);


    //Snap the tileoutline to the tiles on the map.
    this.tileoutline.x = Kiwi.Utils.GameMath.snapToFloor(this.game.input.mouse.x, this.tilemap.tileWidth);
    this.tileoutline.y = Kiwi.Utils.GameMath.snapToFloor(this.game.input.mouse.y, this.tilemap.tileHeight);
}


//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', ChangingTileData,  gameOptions);