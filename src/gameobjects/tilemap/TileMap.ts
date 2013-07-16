

module Kiwi.GameObjects {

    export class TileMap extends Kiwi.Entity {

        
        constructor() {//tileMapDataKey: string, tileMapDataCache: Kiwi.Cache, tileMapImageKey: string, tileMapImageCache: Kiwi.Cache, game: Game,format:number) {


            console.log('TileMap Constructor');
            super(true, false, false);
        }

        public createFromData(tileMapData: any, tileMapImageKey: string, tileMapImageCache: Kiwi.Cache, game: Game, format: number) {
            var data;

            if (tileMapImageCache.checkImageCacheID(tileMapImageKey, tileMapImageCache) == false) {
                console.log('Missing tilemap image data', tileMapImageKey);
                return;
            }

            this._tileMapImageKey = tileMapImageKey;
            this._tileMapImageCache = tileMapImageCache;
            this.tiles = [];
            this.layers = [];

            this._game = game;

            this.mapFormat = format;

            if (typeof tileMapData === "string") {
                data = data.trim();
                data = JSON.parse(tileMapData);
                this.parseTiledJSON(data);
            } else {
                this.parseTiledJSON(tileMapData);
            }
            console.log('Created TileMap Game Object');
           // console.log(this.tiles);
           // console.log(this.layers);
        }

        public createFromCache(tileMapDataKey: string, tileMapDataCache: Kiwi.Cache, tileMapImageKey: string, tileMapImageCache: Kiwi.Cache, game: Game, format: number) {
      
            if (tileMapDataCache.checkDataCacheID(tileMapDataKey, tileMapDataCache) == false) {
                console.log('Missing json data', tileMapDataKey);
                return;
            }

            if (tileMapImageCache.checkImageCacheID(tileMapImageKey, tileMapImageCache) == false) {
                console.log('Missing tilemap image data', tileMapImageKey);
                return;
            }

            this._tileMapDataKey = tileMapDataKey;
            this._tileMapDataCache = tileMapDataCache;
            this._tileMapImageKey = tileMapImageKey;
            this._tileMapImageCache = tileMapImageCache;

            this.tiles = [];
            this.layers = [];

            this._game = game;

            this.mapFormat = format;

            switch (format) {
                case TileMap.FORMAT_CSV:
                    //this.parseCSV(game.cache.getText(mapData), key, tileWidth, tileHeight);
                    break;

                case TileMap.FORMAT_TILED_JSON:
                    var obj = JSON.parse(tileMapDataCache.data.getFile(tileMapDataKey).data);

                    this.parseTiledJSON(obj);
                    
                    break;
            }



            console.log('Created TileMap Game Object');
           // console.log(this.tiles);
          //  console.log(this.layers);
        }



        public objType() {
            return "TileMap";
        }

        private _tileMapDataKey: string;
        private _tileMapDataCache: Kiwi.Cache;

        private _tileMapImageKey: string;
        private _tileMapImageCache: Kiwi.Cache;


        private _game: Game;

        public static FORMAT_CSV: number = 0;
        public static FORMAT_TILED_JSON: number = 1;

        public tiles: Tile[];
        public layers: TileMapLayer[];
        public currentLayer: TileMapLayer;
        public mapFormat: number;

        public update() {
        }
        

        public render(camera: Kiwi.Camera) {
            
            for (var i = 0; i < this.layers.length; i++) {
                this.layers[i].render(camera);
            }
            

        }



        private parseTiledJSON(data:any) {
            console.log("parsing tiled json");

            //  Trim any rogue whitespace from the data
           // data = data.trim();

            var mapObj = data;
            //console.log(JSON.stringify(data,undefined,2));
            for (var i = 0; i < mapObj.layers.length; i++) {
                var layer: TileMapLayer = new TileMapLayer(this._game, this,this._tileMapImageCache,this._tileMapImageKey, TileMap.FORMAT_TILED_JSON, mapObj.layers[i].name, mapObj.tilewidth, mapObj.tileheight);
               
                layer.alpha = mapObj.layers[i].opacity;
                layer.visible = mapObj.layers[i].visible;
                layer.tileMargin = mapObj.tilesets[0].margin;
                layer.tileSpacing = mapObj.tilesets[0].spacing;

                var c = 0;
                var row;

                for (var t = 0; t < mapObj.layers[i].data.length; t++) {
                    if (c == 0) {
                        row = [];
                    }

                    row.push(mapObj.layers[i].data[t]);

                    c++;

                    if (c == mapObj.layers[i].width) {
                        layer.addColumn(row);
                        c = 0;
                    }
                }

                layer.updateBounds();


                var tileQuantity = layer.parseTileOffsets();

                this.currentLayer = layer;
          //      this.collisionLayer = layer;

                this.layers.push(layer);

            }

            this.generateTiles(tileQuantity);

        }

        private generateTiles(qty: number) {
            console.log("generate tiles" + qty);
            for (var i = 0; i < qty; i++) {
                this.tiles.push(new Tile(this._game, this, i, this.currentLayer.tileWidth, this.currentLayer.tileHeight));
            }

        }
        /*
        public get widthInPixels(): number {
            return this.currentLayer.widthInPixels;
        }

        public get heightInPixels(): number {
            return this.currentLayer.heightInPixels;
        }
        */
        //  Tile Management

        public getTileByIndex(value: number): Tile {

            if (this.tiles[value]) {
                return this.tiles[value];
            }

            return null;

        }

        public getTile(x: number, y: number, layer: number = 0): Tile {

            return this.tiles[this.layers[layer].getTileIndex(x, y)];

        }

        public getTileFromWorldXY(x: number, y: number, layer: number = 0): Tile {

            return null; //this.tiles[this.layers[layer].getTileFromWorldXY(x, y)];

        }
        /*
        public getTileFromInputXY(layer?: number = 0): Tile {

            return this.tiles[this.layers[layer].getTileFromWorldXY(this._game.input.worldX, this._game.input.worldY)];

        }
        /*
        public getTileOverlaps(object: GameObject) {

            return this.currentLayer.getTileOverlaps(object);

        }*/

        public putTile(x: number, y: number, index: number, layer: number = 0) {

            this.layers[layer].putTile(x, y, index);

        }

        

    }

}