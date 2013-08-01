

module Kiwi.GameObjects {

    export class TileMap extends Kiwi.Entity {

        constructor() {
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
        }

        public createFromCache(tileMapDataKey: string, tileMapDataCache: Kiwi.Cache, tileMapImageKey: string, tileMapImageCache: Kiwi.Cache, game: Game, format: number) {
            //get the json
            if (tileMapDataCache.checkDataCacheID(tileMapDataKey, tileMapDataCache) == false) {
                console.log('Missing json data', tileMapDataKey);
                return;
            }
            //get the sprite sheet
            if (tileMapImageCache.checkImageCacheID(tileMapImageKey, tileMapImageCache) == false) {
                console.log('Missing tilemap image data', tileMapImageKey);
                return;
            }
            //save the data information
            this._tileMapDataKey = tileMapDataKey;
            this._tileMapDataCache = tileMapDataCache;
            this._tileMapImageKey = tileMapImageKey;
            this._tileMapImageCache = tileMapImageCache;

            //create the tiles
            this.tiles = [];
            this.layers = [];

            //save the game
            this._game = game;

            //save the format
            this.mapFormat = format;

            switch (format) {
                case TileMap.FORMAT_CSV:
                    //this.parseCSV(game.cache.getText(mapData), key, tileWidth, tileHeight);
                    break;

                //load the json map
                case TileMap.FORMAT_TILED_JSON:
                    var obj = JSON.parse(tileMapDataCache.data.getFile(tileMapDataKey).data);

                    this.parseTiledJSON(obj);
                    
                    break;
            }

            console.log('Created TileMap Game Object');
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

        /*
        * Contains an array of all of the tile types.
        */
        public tiles: TileType[];
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

            var mapObj = data;

            for (var i = 0; i < mapObj.layers.length; i++) {
                var layer: TileMapLayer = new TileMapLayer(this._game, this,this._tileMapImageCache,this._tileMapImageKey, TileMap.FORMAT_TILED_JSON, mapObj.layers[i].name, mapObj.tilewidth, mapObj.tileheight);
                
                layer.position.setTo(mapObj.layers[i].x, mapObj.layers[i].y);
                layer.alpha.alpha(parseInt(mapObj.layers[i].opacity));
                layer.visible.visible(mapObj.layers[i].visible);
                layer.tileMargin = mapObj.tilesets[0].margin;
                layer.tileSpacing = mapObj.tilesets[0].spacing;

                var c = 0;
                var row;

                var tileQuantity = layer.parseTileOffsets();
                this.generateTiles(layer, tileQuantity);

                for (var t = 0; t < mapObj.layers[i].data.length; t++) {
                    if (c == 0) {
                        row = [];
                    }

                    row.push(this.tiles[parseInt(mapObj.layers[i].data[t])]);
                    c++;

                    if (c == mapObj.layers[i].width) { 
                        layer.addRow(row);
                        c = 0;
                    }
                }

                layer.updateBounds();

                this.currentLayer = layer;

                this.layers.push(layer);
            }


        }

        /*
        * This method generates a number of tile objects based on the quantity passed. These tiles are based of the current layer.
        *
        * @method generateTiles
        * @param {number} qty - number of tiles
        */
        private generateTiles(layer: Kiwi.GameObjects.TileMapLayer, qty: number) {
            console.log("Generate Tiles",qty);
            for (var i = 0; i < qty; i++) {
                this.tiles.push(new TileType(this._game, this, i, layer.tileWidth, layer.tileHeight));
            }

        }
        
        /*
        * Gets the currentLayers width in pixels
        * @method widthInPixels
        * @returns {number}
        */
        public widthInPixels(): number {
            return this.currentLayer.widthInPixels;
        }

        /*
        * Gets the currentLayers height in pixels
        * @method heightInPixels
        * @returns {number}
        */
        public heightInPixels(): number {
            return this.currentLayer.heightInPixels;
        }
        
        //  Tile Management

        /*
        * Gets a tiletype by a index provided.
        * 
        * @method getTileByIndex
        * @param {number} value
        * @return {Tile}
        */
        public getTileTypeByIndex(value: number): TileType {

            if (this.tiles[value]) {
                return this.tiles[value];
            }

            return null;
        }

        /*
        * Gets a single tile either off the tile layer passed otherwise off the currentLayer if no layer number passed.
        *
        * @method getTile
        * @param {number} x 
        * @param {number} y 
        * @param {number} layer 
        */
        public getTile(x: number, y: number, layer?: number): Tile {   

            if (layer === undefined) {
                var usedLayer:TileMapLayer = this.currentLayer;
            } else {
                var usedLayer:TileMapLayer = this.layers[layer];
            }

            return usedLayer.getTile(x, y);
        }

        /*
        * Gets a tile based on the passed X and Y. 
        * Caution! If the tilemap has moved make sure you put that into account.
        * 
        * @method getTileFromWorldXY
        * @param {number} x
        * @param {number} y
        * @param {number} layer
        * @return {Kiwi.GameObjects.Tile}
        */
        public getTileFromWorldXY(x: number, y: number, layer?: number): Tile {
            if (layer === undefined) {
                var usedLayer: TileMapLayer = this.currentLayer;
            } else {
                var usedLayer: TileMapLayer = this.layers[layer];
            }

            return usedLayer.getTileFromWorldXY(x, y);
        }

        /*
        * Gets a tile based on the mouse's current X and Y coordinates.
        * 
        * @method getTileFromInputXY
        * @param {number} layer
        * @return {Kiwi.GameObjects.Tile}
        */
        public getTileFromInputXY(layer?: number): Tile {
            if (layer === undefined) {
                var usedLayer: TileMapLayer = this.currentLayer;
            } else {
                var usedLayer: TileMapLayer = this.layers[layer];
            }

            return usedLayer.getTileFromWorldXY(this._game.input.mouse.x() - usedLayer.position.x(), this._game.input.mouse.y() - usedLayer.position.y());
        }
        /*
        public getTileOverlaps(object: GameObject) {

            return this.currentLayer.getTileOverlaps(object);

        }*/

        /*
        * Adds/Reassign's a tile on the point in the map.
        *
        * @method putTile
        * @param {number} x
        * @param {number} y
        * @param {number} index
        * @param {number} layer
        */
        public putTile(x: number, y: number, index: number, layer?: number) {
            if (layer === undefined) {
                var usedLayer: TileMapLayer = this.currentLayer;
            } else {
                var usedLayer: TileMapLayer = this.layers[layer];
            }

            usedLayer.putTile(x, y, this.tiles[index]);
        }

        //collision stuff

        /*
        * Sets the collision of a range of tiletypes.
        *
        * @method setCollisionRange
        * @params {number} start
        * @params {number} end
        * @params {number} collision
        * @params {bool} seperate
        */
        public setCollisionRange(start: number, end: number, collision: number = Kiwi.Components.ArcadePhysics.ANY, seperate: bool = true) {

            for (var i = start; i <= end; i++) {
                this.setCollisionByIndex(i, collision, seperate);
            }

        }

        /*
        * Sets the collision of a single tiletype by the index.
        *
        * @method setCollisionIndex
        * @params {number} index
        * @params {number} collision
        * @params {bool} seperate
        */
        public setCollisionByIndex(index: number, collision: number = Kiwi.Components.ArcadePhysics.ANY, seperate: bool = true) {
            this.tiles[index].seperate = seperate;
            this.tiles[index].allowCollisions = collision;
            console.log('Collision Set:',index);
            var tiles = this.currentLayer.getTilesByIndex(index);

            for (var t = 0; t < tiles.length; t++) {
                tiles[t].physics.seperate = seperate;
                tiles[t].physics.allowCollisions = collision;
            }
        }

        /*
        * Checks to see if an object is currently colliding with the given game objects
        */
        public collideSingle(object: Kiwi.Entity) {
            
            if (object.exists() === false || !object.components.hasComponent('ArcadePhysics')) return;

            var tiles = this.currentLayer.getTileOverlaps(object);

            if (tiles !== undefined) {
                for (var i = 0; i < tiles.length; i++) {
                    object.components.getComponent('ArcadePhysics').overlaps(tiles[i], tiles[i].tileType.seperate);
                }
            }
        }

    }

}