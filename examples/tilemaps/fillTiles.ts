/// <reference path="../../src/Kiwi.ts" /> 

class fillTiles extends Kiwi.State {

    constructor() {
        super('fillTiles');
    }

    init() {

    }

    public tileMap: Kiwi.GameObjects.TileMap;

    private ix: number;
    private iy: number;

    private ex: number;
    private ey: number;

    preload() {
        this.addSpriteSheet('desert', 'assets/tiles/tmw_desert_spacing.png', 33, 33, false);
        this.addJSON('desertTiles', 'assets/tilemaps/desert.json', false);
    }

    create() {
        this.tileMap = new Kiwi.GameObjects.TileMap();
        this.tileMap.createFromCache('desertTiles', this.cache, 'desert', this.cache, this.game, Kiwi.GameObjects.TileMap.FORMAT_TILED_JSON);

        this.addChild(this.tileMap);

        this.game.input.mouse.mouseDown.add(this.getStart, this);
        this.game.input.mouse.mouseUp.add(this.fillTile, this);
    }

    getStart() {
        this.ix = Kiwi.Utils.GameMath.snapToFloor(this.game.input.mouse.x(), this.tileMap.currentLayer.tileWidth) / this.tileMap.currentLayer.tileWidth;
        this.iy = Kiwi.Utils.GameMath.snapToFloor(this.game.input.mouse.y(), this.tileMap.currentLayer.tileHeight) / this.tileMap.currentLayer.tileHeight;
        console.log('Was Down');
    }

    fillTile() {

        this.ex = Kiwi.Utils.GameMath.snapToCeil(this.game.input.mouse.x(), this.tileMap.currentLayer.tileWidth) / this.tileMap.currentLayer.tileWidth;
        this.ey = Kiwi.Utils.GameMath.snapToCeil(this.game.input.mouse.y(), this.tileMap.currentLayer.tileHeight) / this.tileMap.currentLayer.tileHeight;
        
        var w = this.ex - this.ix;
        var h = this.ey - this.iy; 

        this.tileMap.currentLayer.fillTiles(30, this.ix, this.iy, w, h);

        console.log('Is Up');
        console.log(this.ix, this.iy, this.ex, this.ey, w, h);
    }

}