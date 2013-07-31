/// <reference path="../../src/Kiwi.ts" /> 

class swappingTiles extends Kiwi.State {

    constructor() {
        super('swappingTiles');
    }

    init() {
        this.indexA = 31;
        this.indexB = 30;
    }

    public tileMap: Kiwi.GameObjects.TileMap;
    
    public indexA: number;
    public indexB: number;

    preload() {
        this.addSpriteSheet('desert', 'assets/tiles/tmw_desert_spacing.png', 33, 33, false);
        this.addJSON('desertTiles', 'assets/tilemaps/desert.json', false);
    }

    create() {
        this.tileMap = new Kiwi.GameObjects.TileMap();
        this.tileMap.createFromCache('desertTiles', this.cache, 'desert', this.cache, this.game, Kiwi.GameObjects.TileMap.FORMAT_TILED_JSON);

        this.addChild(this.tileMap);
        
        this.game.input.mouse.mouseUp.add(this.swap, this);
    }

    swap() {
        this.tileMap.currentLayer.swapTiles(this.indexA, this.indexB);
    }

}