/// <reference path="../../src/Kiwi.ts" />

class getTile extends Kiwi.State {
    
    constructor() {
        super('basictiles');
    }

    preload() {
        this.addJSON('desert', 'assets/tilemaps/desert.json', false);
        this.addSpriteSheet('tiles', 'assets/tiles/tmw_desert_spacing.png', 32, 32, false, 6 * 8, 6, 8, 1, 1, 1, 1);
    }

    create() {

        this.tileMap = new Kiwi.GameObjects.Tilemap.TileMap();
        this.addChild(this.tileMap); //has to be added to the stage first
        this.tileMap.createFromFileStore('desert', this.textures.tiles, this.game, Kiwi.GameObjects.Tilemap.TileMap.FORMAT_TILED_JSON);
        
        this.textfield = new Kiwi.GameObjects.Textfield('', 400, 10, '#000', 12);
        this.textfield.textAlign = 'center';
        this.addChild(this.textfield);

        this.game.input.mouse.mouseUp.add(this.check, this);
    }

    check() {
        
        var tile = this.tileMap.getTileFromInputXY();

        this.textfield.text = tile.tileType.toString();
        
    }

    public tileMap: Kiwi.GameObjects.Tilemap.TileMap;
    public textfield: Kiwi.GameObjects.Textfield;

}