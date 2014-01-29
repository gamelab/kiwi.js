/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can swap out a whole set of tile types in an area for another set.
*
**/

class SwappingTiles extends Kiwi.State {

    constructor() {
        super('SwappingTiles');
    }

    preload() {
        //Load in the TileMap
        this.addJSON('desertTilemap', 'assets/war/json/desert-blank.json');

        //Load in our Tilemap Spritesheet. We will be using this for our tile assets.
        this.addSpriteSheet('desertSpritesheet', 'assets/war/tiles/tile-spritesheet.png', 48, 48);

        //Make the stage a bit smaller for now.
        this.game.stage.resize(800, 250);
    }

    tilemap: Kiwi.GameObjects.Tilemap.TileMap;
    tilemaplayer: Kiwi.GameObjects.Tilemap.TileMapLayer;

    create() {

        //Create the Tilemap. 
        this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'desertTilemap', this.textures.desertSpritesheet);

        //Get the TilemapLayer
        this.tilemaplayer = this.tilemap.layers[0];

        //Add to the stage.
        this.addChild(this.tilemaplayer);

        //On click event
        this.game.input.onUp.add(this.replace, this);
    }

    replace(x, y) {

        //Replace all of the barbed wire with tank stoppers and the other way around
        this.tilemaplayer.swapTiles(36, 33)

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

var game = new Kiwi.Game('game', 'KiwiExample', SwappingTiles, gameOptions);