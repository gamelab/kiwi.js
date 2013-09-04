/// <reference path="../../src/Kiwi.ts" />

class basictiles extends Kiwi.State {

    constructor() {
        super('basictiles');
    }

    preload() {
        this.addJSON('desert', 'assets/tilemaps/desert.json', false);
        this.addSpriteSheet('tiles', 'assets/tiles/tmw_desert_spacing.png', 32, 32, false, 6 * 8, 6, 8, 1, 1, 1, 1);
    }

    create() {

        this.tileMap = new Kiwi.GameObjects.Tilemap.TileMap(this);
        this.addChild(this.tileMap); //has to be added to the stage first
        this.tileMap.createFromFileStore('desert',this.textures.tiles, this.game, Kiwi.GameObjects.Tilemap.TileMap.FORMAT_TILED_JSON);

    }

    public tileMap: Kiwi.GameObjects.Tilemap.TileMap;

}