/**
* This script is a demonstration of how you can generate a tile map in Kiwi as well as how the tilemap can move..
**/
var Generation = new Kiwi.State('Generation');

Generation.preload = function () {
    this.addSpriteSheet('desertImage', 'assets/war/tiles/tile-spritesheet.png', 48, 48);
    this.addJSON('desertJson', 'assets/war/json/desert.json');
}

Generation.create = function () {
    this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this);
    this.tilemap.createFromFileStore('desertJson', this.textures.desertImage, Kiwi.GameObjects.Tilemap.TileMap.FORMAT_TILED_JSON);
    this.addChild(this.tilemap);

    this.game.input.onDown.add(this.pressed, this);
    this.game.input.onUp.add(this.released, this);
}

Generation.pressed = function (x, y) {
    this.initX = x;
    this.initY = y;
}

Generation.released = function (x, y) {
    var nx = Math.floor(this.initX / 48);
    var ny = Math.floor(this.initY / 48);

    var w = Math.ceil((x - this.initX) / 48);
    var h = Math.ceil((y - this.initY) / 48);

    this.tilemap.currentLayer.replaceTiles(-1, 1, nx, ny, w, h);
}

Generation.update = function () {
    Kiwi.State.prototype.update.call(this);

    if (Kiwi.DEVICE.touch == false) {
        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.LEFT)) {
            this.tilemap.x += 5;
        } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.RIGHT)) {
            this.tilemap.x -= 5;
        }

        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.UP)) {
            this.tilemap.y += 5;
        } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.DOWN)) {
            this.tilemap.y -= 5;
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
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', Generation,  gameOptions);
