/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can modify the tiledata of a tilemap layer after it has been created to fill an area with a random amount of tiles.
*
**/

class RandomArea extends Kiwi.State {

    constructor() {
        super('RandomArea');
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

    pressedLocationX: number = 0;
    pressedLocationY: number = 0;
    isDown: boolean = false;

    create() {

        //Create the Tilemap. 
        this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'desertTilemap', this.textures.desertSpritesheet);

        //Get the TilemapLayer
        this.tilemaplayer = this.tilemap.layers[0];

        //Add to the stage.
        this.addChild(this.tilemaplayer);

        //tileoutline - to outline the tile/tiles we are currently hovering over
        this.tileoutline = new Kiwi.GameObjects.StaticImage(this, this.textures.tileoutline, -48, -48);
        this.tileoutline.transform.rotPointX = 0;
        this.tileoutline.transform.rotPointY = 0;
        this.addChild(this.tileoutline);

        //On click event
        this.game.input.onDown.add(this.press, this);
        this.game.input.onUp.add(this.replace, this);
    }

    press(x, y) {
        this.isDown = true;
        //snap the pressed locations X/Y positions
        this.pressedLocationX = Kiwi.Utils.GameMath.snapToFloor(x, this.tilemaplayer.tileWidth);
        this.pressedLocationY = Kiwi.Utils.GameMath.snapToFloor(y, this.tilemaplayer.tileHeight);
    }

    replace(x, y) {

        //Calculate the x/y/width/height of the area we are going to fill in tiles and if they selected it backwards or not
        if (x > this.pressedLocationX) {
            var tx = Math.floor(this.pressedLocationX / this.tilemaplayer.tileWidth);
            var w = Math.ceil((x - this.pressedLocationX) / this.tilemaplayer.tileWidth);
        } else {
            var tx = Math.floor(x / this.tilemaplayer.tileWidth);
            var w = Math.ceil((this.pressedLocationX - x) / this.tilemaplayer.tileWidth);
        }

        if (y > this.pressedLocationY) {
            var ty = Math.floor(this.pressedLocationY / this.tilemaplayer.tileHeight);
            var h = Math.ceil((y - this.pressedLocationY) / this.tilemaplayer.tileHeight);
        } else {
            var ty = Math.floor(y / this.tilemaplayer.tileHeight);
            var h = Math.ceil((this.pressedLocationY - y) / this.tilemaplayer.tileHeight);
        }

        //Fill in that area of the map with a random set of tile types we pass.
        this.tilemaplayer.randomizeTiles([33, 34, 36], tx, ty, w, h);

        //Reset the tileoutline properties
        this.isDown = false;
        this.tileoutline.scaleX = 1;
        this.tileoutline.scaleY = 1;
    }

    update() {
        super.update();

        //Should the tileoutline follow the cursor or is the user pressing the mouse down.
        if (this.isDown == false) {
            //Snap the tileoutline to the tiles on the map so we know which tile would be replaced
            this.tileoutline.x = Kiwi.Utils.GameMath.snapToFloor(this.game.input.mouse.x, this.tilemap.tileWidth);
            this.tileoutline.y = Kiwi.Utils.GameMath.snapToFloor(this.game.input.mouse.y, this.tilemap.tileHeight);

        } else {

            this.tileoutline.x = Kiwi.Utils.GameMath.snapToFloor(this.pressedLocationX, this.tilemap.tileWidth);
            this.tileoutline.y = Kiwi.Utils.GameMath.snapToFloor(this.pressedLocationY, this.tilemap.tileHeight);

            //Scale the Tileoutline to fit
            this.tileoutline.scaleX = Math.ceil((this.game.input.mouse.x - this.pressedLocationX) / this.tilemap.tileWidth);
            this.tileoutline.scaleY = Math.ceil((this.game.input.mouse.y - this.pressedLocationY) / this.tilemap.tileHeight);

            //Increase Scale if the scale is negative
            if (this.tileoutline.scaleX <= 0) this.tileoutline.scaleX -= 1;
            if (this.tileoutline.scaleY <= 0) this.tileoutline.scaleY -= 1; 
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
if (typeof gameOptions == "undefined") var gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', RandomArea, gameOptions); 