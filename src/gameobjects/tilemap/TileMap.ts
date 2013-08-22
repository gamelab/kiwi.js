

module Kiwi.GameObjects {

    export class TileMap extends Kiwi.Entity {

        constructor() {
            super();
        }

        /*
        * Creates a tile map from some information you already have.
        * 
        * @method createFromData
        * @param {any} tileMapData
        * @param {Kiwi.Textures.TextureAtlas} 
        * @param {Kiwi.Game} game
        * @param {number} format
        */
        public createFromData(tileMapData: any, atlas: Kiwi.Textures.SpriteSheet, game: Game, format: number) {
            var data;

            this._atlas = atlas;
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
        }

        /*
        * Creates the tilemap from the cache.
        * 
        * @method createFromCache
        * @param {string} tileMapDataKey - The key of the data file.
        * @param {Kiwi.Cache} tileMapDataCache - The cache that the data file is saved in.
        * @param {Kiwi.Textures.TextureAtlas} atlas
        */
        public createFromCache(tileMapDataKey: string, tileMapDataCache: Kiwi.Cache, atlas: Kiwi.Textures.SpriteSheet, game: Game, format: number) {
            //get the json
            if (tileMapDataCache.checkDataCacheID(tileMapDataKey, tileMapDataCache) == false) {
                console.log('Missing json data', tileMapDataKey);
                return;
            }
            

            //save the data information
            this._tileMapDataKey = tileMapDataKey;
            this._tileMapDataCache = tileMapDataCache;
            this._atlas = atlas;

            //create the tiles
            this.tiles = [];
            this.layers = [];

            //save the game
            this._game = game;

            //save the format
            this.mapFormat = format;

            switch (format) {
                
                //load the json map
                case TileMap.FORMAT_TILED_JSON:
                    var obj = JSON.parse(tileMapDataCache.data.getFile(tileMapDataKey).data);
                    this.parseTiledJSON(obj);
                    break;
            }

        }

        /*
        * The type of object that it is.
        */
        public objType() {
            return "TileMap";
        }

        /*
        * The data information
        */
        private _tileMapDataKey: string;
        private _tileMapDataCache: Kiwi.Cache;

        /*
        * The image information
        */
        private _atlas: Kiwi.Textures.SpriteSheet;

        /*
        * The game
        */
        private _game: Game;

        /*
        * The formats that are supported
        */
        public static FORMAT_CSV: number = 0;
        public static FORMAT_TILED_JSON: number = 1;

        /*
        * Contains an array of all of the tile types.
        */
        public tiles: TileType[];
        
        /*
        * An array holding all of the tile map layers.
        */
        public layers: TileMapLayer[];

        /*
        * A reference to the currentLayer
        */
        public currentLayer: TileMapLayer;

        /*
        * The format that the tilemap was loaded with.
        */
        public mapFormat: number;

        /*
        * Tilemap collision callback method
        * @type {function}
        */
        private _collisionCallback = null;
        
        /*
        * Context for the collision callback.
        */
        private _collisionCallbackContext;

        /*
        * The render loop. Should not be called I think
        */
        public render(camera: Kiwi.Camera) {
            
            for (var i = 0; i < this.layers.length; i++) {
                this.layers[i].render(camera);
            }
            
        }

        /*
        * Creates the tilemap based of some json data that gets parsed.
        *
        * @method parseTiledJSON
        * @param {any} data
        */
        private parseTiledJSON(data:any) {

            var mapObj = data;

            for (var i = 0; i < mapObj.layers.length; i++) {
                var layer: TileMapLayer = new TileMapLayer(this._game, this, this._atlas, mapObj.layers[i].name, mapObj.tilewidth, mapObj.tileheight);
                
                layer.transform.setPosition(mapObj.layers[i].x, mapObj.layers[i].y);
                layer.alpha = parseInt(mapObj.layers[i].opacity);
                layer.visiblity = mapObj.layers[i].visible;
                layer.tileMargin = mapObj.tilesets[0].margin;
                layer.tileSpacing = mapObj.tilesets[0].spacing;
                layer.name = mapObj.tilesets[0].name;
                layer.game = this.game;

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
        * @return {Kiwi.GameObjects.Tile}
        */
        public getTile(x: number, y: number, layer?: number): Tile {   

            if (layer === undefined) {
                return this.currentLayer.getTile(x, y);;
            } else {
                return this.layers[layer].getTile(x, y);;
            }

        }

        /*
        * Gets an array of tiles that consist of 
        *
        * @method getTilesByType
        * @param {number} index
        * @param {number} layer
        * @return {Array}
        */
        public getTilesByType(index: number, layer?: number) {

            if (layer === undefined) {
                return this.currentLayer.getTilesByIndex(index);
            } else {
                return this.layers[layer].getTilesByIndex(index);
            }

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
                return this.currentLayer.getTileFromWorldXY(x, y);
            } else {
                return this.layers[layer].getTileFromWorldXY(x, y);
            }

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
                return this.currentLayer.getTileFromWorldXY(this._game.input.mouse.x - this.currentLayer.transform.x, this._game.input.mouse.y - this.currentLayer.transform.y);;
            } else {
                return this.layers[layer].getTileFromWorldXY(this._game.input.mouse.x - this.layers[layer].transform.x, this._game.input.mouse.y - this.layers[layer].transform.y);;
            }

        }
        
        /*
        * Checks to see if an entity overlaps with any colliable tiles on the current layer. Returns the tiles that it overlaps with.
        *
        * @method getTileOverlaps
        * @param {Kiwi.Entity} object
        * @returns {Array}
        */
        public getTileOverlaps(object: Kiwi.Entity) {

            return this.currentLayer.getTileOverlaps(object);

        }

        /*
        * Adds/Reassign's a tile on the point in the map you specify.
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
        * Set the callback to be called when the tilemap collides.
        *
        * @method setCollisionCallback
        * @param {function} Callback function
        * @param {object} Callback will be called with this context
        */
        public setCollisionCallback(callback, context) {

            this._collisionCallback = callback;
            this._collisionCallbackContext = context;

        }

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

            var tiles = this.currentLayer.getTilesByIndex(index);
            for (var t = 0; t < tiles.length; t++) {
                tiles[t].physics.seperate = seperate;
                tiles[t].physics.allowCollisions = collision;
            }
        }

        /*
        * Checks to see if a single object is colliding with any colliable tiles.
        *
        * @method collideSingle
        * @param {Kiwi.Entity}
        * @return {boolean}
        */
        public collideSingle(object: Kiwi.Entity):boolean {
            
            if (object.exists === false || !object.components.hasComponent('ArcadePhysics')) return false;

            var tiles = this.currentLayer.getTileOverlaps(object);

            if (tiles !== undefined) {
                for (var i = 0; i < tiles.length; i++) {
                    if (object.components.getComponent('ArcadePhysics').overlaps(tiles[i], tiles[i].tileType.seperate)) {
                        
                        if (this._collisionCallback !== null) {
                            this._collisionCallback.call(this._collisionCallbackContext, object, tiles[i]);
                        }
                    }
                }
                return true;
            }
            return false;
        }

        /*
        * Tests to see if a group of entities are colliding with any tiles.
        * 
        * @method collideGroup
        * @param {Kiwi.Group}
        */
        public collideGroup(group: Kiwi.Group) {

            for (var i = 0; i < group.members.length; i++) {
                //this.collideSingle(group.members[i]);
            }

        }

        /*
        * Destroys everything.
        * 
        * @method destroy
        */
        public destroy() {
            this.tiles = null;
            for (var i = 0; i < this.layers.length; i++) {
                this.layers[i].destroy();
            }
            this.layers = null;
            this._tileMapDataKey = null;
            this._tileMapDataCache = null;
            this._atlas = null;
        }

    }

}