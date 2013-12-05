/**
* This script is a demonstration of how you can generate a tilemap with multiple layers in Kiwi and how you can move each layer individually.
**/
var Paralax = new Kiwi.State('Paralax');

Paralax.preload = function () {
    this.addSpriteSheet('desertImage', 'assets/war/tiles/tile-spritesheet.png', 48, 48);
    this.addJSON('desertJson', 'assets/war/json/desert-paralax.json');
}

Paralax.create = function () {
    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Move the map with the arrow keys!', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

    //Tilemap
    this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this);
    this.tilemap.createFromFileStore('desertJson', this.textures.desertImage, Kiwi.GameObjects.Tilemap.TileMap.FORMAT_TILED_JSON);
    this.addChild(this.tilemap);
}

Paralax.update = function () {
    Kiwi.State.prototype.update.call(this);

    if (Kiwi.DEVICE.touch == false) {
        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.LEFT)) {
            this.tilemap.layers[0].x += 5;
            this.tilemap.layers[1].x += 3;
        } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.RIGHT)) {
            this.tilemap.layers[0].x -= 5;
            this.tilemap.layers[1].x -= 3;
        }

        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.UP)) {
            this.tilemap.layers[0].y += 5;
            this.tilemap.layers[1].y += 3;
        
        } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.DOWN)) {
            this.tilemap.layers[0].y -= 5;
            this.tilemap.layers[1].y -= 3;

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

var game = new Kiwi.Game('game', 'KiwiExample', Paralax,  gameOptions);