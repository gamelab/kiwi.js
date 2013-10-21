/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can generate a tile map in Kiwi as well as how the tilemap can move..
**/

class Generation extends Kiwi.State {

    constructor() {
        super('Generation');
    }

    preload() {
        this.addSpriteSheet('desertImage', 'assets/war/tiles/tile-spritesheet.png', 48, 48);
        this.addJSON('desertJson', 'assets/war/json/desert.json');
    }

    tilemap: Kiwi.GameObjects.Tilemap.TileMap;
    initX: number;
    initY: number;
    
    create() {

        this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this);
        this.tilemap.createFromFileStore('desertJson', this.textures.desertImage, Kiwi.GameObjects.Tilemap.TileMap.FORMAT_TILED_JSON);
        this.addChild(this.tilemap);
        
        this.game.input.onDown.add(this.pressed, this);
        this.game.input.onUp.add(this.released, this);
    }
    
    pressed(x, y) {
        this.initX = x;
        this.initY = y;
    }

    released(x, y) {
        
        var nx = Math.floor(this.initX / 48);
        var ny = Math.floor(this.initY / 48);

        var w = Math.ceil((x - this.initX ) / 48);
        var h = Math.ceil((y - this.initY) / 48);

        this.tilemap.currentLayer.replaceTiles(-1, 1, nx, ny, w, h); 

    }

    update() {

        super.update();

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


}