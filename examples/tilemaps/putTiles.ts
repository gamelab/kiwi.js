/// <reference path="../../src/Kiwi.ts" /> 

class putTiles extends Kiwi.State {

    constructor() {
        super('putTiles');
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
        
        this.game.input.mouse.mouseUp.add(this.putTile, this);
    }

    putTile() {
        
        this.tileMap.putTile(this.game.input.mouse.x() + this.tileMap.currentLayer.position.x(), this.game.input.mouse.y() + this.tileMap.currentLayer.position.y(), 31);

    }

}