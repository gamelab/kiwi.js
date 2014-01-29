/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can create a Tilemap from a JSON File that is generated through the Tool Tiled.
*
* When creating a Tilemap in Kiwi through Tiled make sure you have access to the following files.
*
* 1- Created your Tilemap in Tiled and saved it in a JSON format. 
* 2- Have a copy of the image you used for the Tileset in the Tiled map.
*
**/

class Generation extends Kiwi.State {

    constructor() {
        super('Generation');
    }

    preload() {

        // Load in the tile map JSON which was created using Tiled.
        this.addJSON('desertTilemap', 'assets/war/json/desert-single.json');

        // Load the SpriteSheet that our Tilemap uses for the Tiles.
        this.addSpriteSheet('desertSpritesheet', 'assets/war/tiles/tile-spritesheet.png', 48, 48);

        //Make it a little smaller
        this.game.stage.resize(800, 250);
    }

    public tilemap: Kiwi.GameObjects.Tilemap.TileMap;
    
    create() {

        /**
        * Create the Tilemap GameObject. 
        * 
        * 1 - The State we are creating it on.
        * 2 - Optional - The JSON file we want to load in.
        * 3 - Optional - The spritesheet we want to use.
        */
        this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'desertTilemap', this.textures.desertSpritesheet);

        /**
        * A Tilemap isn't actually a GameObject. It functions more as a Manager to create TilemapLayers and TileTypes.
        * So to have a Tilemap rendering you need to add a Tilemaps layers to the state.
        */
        this.addChild( this.tilemap.layers[0] );

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

var game = new Kiwi.Game('game', 'KiwiExample', Generation, gameOptions );