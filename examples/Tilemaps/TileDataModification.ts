/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can modify the tiledata of a tilemap layer after it has been created.
*
**/

class ChangingTileData extends Kiwi.State {

    constructor() {
        super('ChangingTileData');
    }

    preload() {
        //Load in the TileMap
        this.addJSON('desertTilemap', 'assets/war/json/desert-blank.json');

        //Load in our Tilemap Spritesheet. We will be using this for our tile assets.
        this.addSpriteSheet('desertSpritesheet', 'assets/war/tiles/tile-spritesheet.png', 48, 48);

        //Load in the tileoutline - Just so to make it easier to see which tile we will be changing
        this.addImage('tileoutline', 'assets/misc/tileoutline.png');

        //Make the stage a bit smaller for now.
        this.game.stage.resize(800, 250);
    }

    tilemap: Kiwi.GameObjects.Tilemap.TileMap;
    tilemaplayer: Kiwi.GameObjects.Tilemap.TileMapLayer;
    tileoutline: Kiwi.GameObjects.StaticImage;

    create() {

        //Create the Tilemap. 
        this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'desertTilemap', this.textures.desertSpritesheet);

        //Get the TilemapLayer
        this.tilemaplayer = this.tilemap.layers[0];

        //Add to the stage.
        this.addChild( this.tilemaplayer );

        //tileoutline - to outline the tile we are currently hovering over
        this.tileoutline = new Kiwi.GameObjects.StaticImage(this, this.textures.tileoutline, -48, -48);
        this.addChild(this.tileoutline);
        

        //On click event
        this.game.input.onUp.add(this.replace, this);
    }

    replace(x, y) {

        //Figure out where the tile was 
        var index = this.tilemaplayer.getIndexFromCoords(x, y);

        //Fill in the Tile at that point with barbed wire.
        this.tilemaplayer.setTileByIndex(index, 36);
    }

    update() {
        super.update();

        //Snap the tileoutline to the tiles on the map so we know which tile would be replaced
        this.tileoutline.x = Kiwi.Utils.GameMath.snapToFloor(this.game.input.mouse.x, this.tilemap.tileWidth);
        this.tileoutline.y = Kiwi.Utils.GameMath.snapToFloor(this.game.input.mouse.y, this.tilemap.tileHeight);
    }

}


//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if (typeof gameOptions == "undefined") var gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', ChangingTileData, gameOptions);