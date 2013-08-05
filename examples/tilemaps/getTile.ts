/// <reference path="../../src/Kiwi.ts" /> 

class getTile extends Kiwi.State {

    constructor() {
        super('basics');
    }

    init() {

    }

    public tileMap: Kiwi.GameObjects.TileMap;
    public textfield: Kiwi.GameObjects.Textfield;

    preload() {
        this.addSpriteSheet('desert', 'assets/tiles/tmw_desert_spacing.png', 33, 33, false);
        this.addJSON('desertTiles', 'assets/tilemaps/desert.json', false);
    }

    create() {
        this.tileMap = new Kiwi.GameObjects.TileMap();
        this.tileMap.createFromCache('desertTiles', this.cache, 'desert', this.cache, this.game, Kiwi.GameObjects.TileMap.FORMAT_TILED_JSON);

        this.textfield = new Kiwi.GameObjects.Textfield('', 0, 0, this.game.stage.size.width(), this.game.stage.size.height(), '#000', 14);
        this.textfield.textAlign('center');

        this.addChild(this.tileMap);
        this.addChild(this.textfield);
        this.game.input.mouse.mouseUp.add(this.getTile, this);
    }

    getTile() {
        
        this.textfield.setText(this.tileMap.getTileFromWorldXY(this.game.input.mouse.x(), this.game.input.mouse.y()).tileType.toString() );

    }

}