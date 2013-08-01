/// <reference path="../../src/Kiwi.ts" /> 

class randomise extends Kiwi.State {

    constructor() {
        super('randomise');
    }

    init() {

    }

    public tileMap: Kiwi.GameObjects.TileMap;

    preload() {
        this.addSpriteSheet('desert', 'assets/tiles/tmw_desert_spacing.png', 33, 33, false);
        this.addJSON('desertTiles', 'assets/tilemaps/desert.json', false);
    }

    create() {
        this.tileMap = new Kiwi.GameObjects.TileMap();
        this.tileMap.createFromCache('desertTiles', this.cache, 'desert', this.cache, this.game, Kiwi.GameObjects.TileMap.FORMAT_TILED_JSON);

        this.addChild(this.tileMap);
        
        this.game.input.mouse.mouseUp.add(this.random, this);
    }

    random() {
        //To put more favour into one tile than another add more of it into the array.
        var random = [30, 30,30,30,30,31,31,31,40,40, 40, 38, 48, 39, 46, 32, 47];
        this.tileMap.currentLayer.randomiseTiles(random);
    }


}