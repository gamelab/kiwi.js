/// <reference path="../../src/Kiwi.ts" />

class basictiles extends Kiwi.State {

    constructor() {
        super('basictiles');
    }

    preload() {
        this.addJSON('desert', 'assets/tilemaps/desert.json', false);
        this.addSpriteSheet('tiles', 'assets/tiles/tmw_desert_spacing.png', 32, 32, false);
    }

    create() {

        this.tileMap = new Kiwi.GameObjects.TileMap();
        this.tileMap.createFromCache('desert', this.cache, 'tiles', this.cache, this.game, Kiwi.GameObjects.TileMap.FORMAT_TILED_JSON);

        this.addChild(this.tileMap);
        console.log('basics loaded');
    }

    public tileMap: Kiwi.GameObjects.TileMap;

}