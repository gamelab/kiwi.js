/// <reference path="../../src/Kiwi.ts" />

class getTile extends Kiwi.State {
    
    constructor() {
        super('basictiles');
    }

    preload() {
        this.addJSON('desert', 'assets/tilemaps/desert.json', false);
        this.addSpriteSheet('tiles', 'assets/tiles/tmw_desert_spacing.png', 32, 32, false);
    }

    create() {

        this.textfield = new Kiwi.GameObjects.Textfield('', 10, 10, '#000', 12);
        this.textfield.textAlign = 'center';
        this.addChild(this.textfield);

        this.tileMap = new Kiwi.GameObjects.TileMap();
        this.addChild(this.tileMap); //has to be added to the stage first
        this.tileMap.createFromCache('desert', this.cache, 'tiles', this.cache, this.game, Kiwi.GameObjects.TileMap.FORMAT_TILED_JSON);
        
        this.game.input.mouse.mouseUp.add(this.check, this);
    }

    check() {
        
        var tile = this.tileMap.getTileFromInputXY();

        this.textfield.text = tile.tileType.toString();
        
        console.log(tile); //doesnt show the text for some weird reason....
    }

    public tileMap: Kiwi.GameObjects.TileMap;
    public textfield: Kiwi.GameObjects.Textfield;

}