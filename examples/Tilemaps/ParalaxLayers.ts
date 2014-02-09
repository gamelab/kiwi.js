/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can generate a tilemap which contains multiple layers which can move independantly.
*
* The tilemaps in this example are all generated using Tiled and both use a single spritesheet / Tileset
**/

class Paralax extends Kiwi.State {

    constructor() {
        super('Paralax');
    }

    preload() {
        //Load in our Tilemap JSON
        this.addJSON('desertTilemap', 'assets/war/json/desert-paralax.json');

        //Load in our Tilemap Spritesheet
        this.addSpriteSheet('desertSpritesheet', 'assets/war/tiles/tile-spritesheet.png', 48, 48);

        //Make the stage a bit smaller for now.
        this.game.stage.resize(800, 250);
    }

    tilemap: Kiwi.GameObjects.Tilemap.TileMap;
    foreground: Kiwi.GameObjects.Tilemap.TileMapLayer;
    background: Kiwi.GameObjects.Tilemap.TileMapLayer;

    create() {

        //Create the Tilemap from the JSON file.
        this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'desertTilemap', this.textures.desertSpritesheet);

        //Get the layers. I named then 'foreground' and 'background' when I created then in Tiled and so they will have those names in Kiwi and we can grab them through those.
        this.foreground = this.tilemap.getLayerByName('Foreground');
        this.background = this.tilemap.getLayerByName('Background');

        //Add them to the stage.
        this.addChild(this.background);
        this.addChild(this.foreground);

    }

    update() {

        super.update();

        //If the user pressed the left or A key
        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.A) || this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.LEFT)) {

            //And the foreground wouldn't be moved off screen.
            if (this.foreground.x < 0) {
                this.foreground.x += 5; 
                this.background.x += 3;
            }

        //If the user pressed the RIGHT or D key.
        } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.D) || this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.RIGHT)) {

            //And the foreground wouldn't be moved off screen. 
            if (this.foreground.x > -(this.foreground.widthInPixels - this.game.stage.width)) {
                this.foreground.x -= 5;
                this.background.x -= 3;
            }

        }

    }


}


//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if (typeof gameOptions  == "undefined") var gameOptions  = {};

var game = new Kiwi.Game('game', 'KiwiExample', Paralax, gameOptions );