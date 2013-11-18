/**
* An area of the GameObjects section which deals specifically with the use of TileMap or items related with TileMaps.
* 
* @module GameObjects
* @submodule Tilemap
* @main Tilemap
*/

module Kiwi.GameObjects.Tilemap { //namespace needs to be changed...
    
    /**
    * A GameObject that can be used when wanting to generate and use TileMaps in a game and the job of it is to handle the creation and management of TileMapLayers/Tiles on the whole map. Each TileMap (once created) will contain at least one TileMapLayer, which will hold the information about the map generated, but more TileMapLayers can be generated on a single TileMap. 
    * 
    * @class TileMap
    * @extends Entity
    * @constructor 
    * @param state {State} The state that this Tilemap is on.
    * @return {TileMap}
    */
    export class TileMap extends Kiwi.Entity {
 
        constructor(state: Kiwi.State) {
            super(state,0,0);
        }

        /**
        * Creates a tile map from some data you already have.
        * 
        * @method createFromData
        * @param tileMapData {any} The map information. 
        * @param atlas {SpriteSheet} The image that is being used. 
        * @param game {Game} The game that this tilemap belongs to.
        * @param format {number} The format that this information was saved as.
        * @public
        */
        public createFromData(tileMapData: any, atlas: Kiwi.Textures.SpriteSheet, format: number) {
            var data;

            this._atlas = atlas;
            this.tiles = [];
            this.layers = [];
             
            this.mapFormat = format;

            if (typeof tileMapData === "string") {
                data = data.trim();
                data = JSON.parse(tileMapData);
                this.parseTiledJSON(data);
            } else {
                this.parseTiledJSON(tileMapData);
            }
        }

        /**
        * Creates the tilemap from the file store. This tilemap is based on a data file and texture atlas that is in the main fileStore.
        * 
        * @method createFromFileStore
        * @param tileMapDataKey {string} The key of the data file.
        * @param atlas {SpriteSheet} The texture atlas that is to be used.
        * @param format {Number} The format that the data was saved in.
        * @public
        */
        public createFromFileStore(tileMapDataKey: string, atlas: Kiwi.Textures.SpriteSheet, format: number) {
            //get the json
            if (this.game.fileStore.exists(tileMapDataKey) == false) {
                return;
            }
            
            //save the data information
            this._tileMapDataKey = tileMapDataKey;
            this._atlas = atlas;

            //create the tiles
            this.tiles = [];
            this.layers = [];

            //save the format
            this.mapFormat = format;

            switch (format) {
                
                //load the json map
                case TileMap.FORMAT_TILED_JSON:
                    var obj = JSON.parse(this.game.fileStore.getFile(tileMapDataKey).data);
                    this.parseTiledJSON(obj);
                    break;
            }

        }

        /**
        * The type of object that it is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "TileMap";
        }

        /**
        * The tilemap data information.
        * @property _tileMapDataKey
        * @type string
        * @private
        */
        private _tileMapDataKey: string;
    

        /**
        * The SpriteSheet that this tilemap is using for the tiles.
        * @property _atlas
        * @type SpriteSheet
        * @private
        */
        private _atlas: Kiwi.Textures.SpriteSheet;

        /**
        * A STATIC property containing the number associated with CSV format.
        * @property FORMAT_CSV
        * @type number
        * @static
        * @final
        * @default 0
        */
        public static FORMAT_CSV: number = 0;
        
        /**
        * A STATIC property containing the number associated with the JSON format.
        * @property FORMAT_TILED_JSON
        * @type number
        * @static
        * @final
        * @default 1
        */
        public static FORMAT_TILED_JSON: number = 1;

        /**
        * Contains an array of all of the tile types that are avaiable.
        * @property tiles
        * @type TileType[]
        * @public
        */
        public tiles: Kiwi.GameObjects.Tilemap.TileType[];
        
        /**
        * An array holding all of the tile map layers that exist on this tilemap.
        * @property layers
        * @type TileMapLayer[]
        * @public
        */
        public layers: Kiwi.GameObjects.Tilemap.TileMapLayer[];

        /**
        * A reference to the current TileMapLayer that is being used.
        * @property currentLayer
        * @type TileMapLayer
        * @public
        */
        public currentLayer: Kiwi.GameObjects.Tilemap.TileMapLayer;

        /**
        * The format that the tilemap was loaded with.
        * @property mapFormat
        * @type number
        * @public
        */
        public mapFormat: number;

        /**
        * Tilemap collision callback method.
        * @property _collisionCallback
        * @type Function
        * @default null
        * @private
        */
        private _collisionCallback = null;
        
        /**
        * Context for the collision callback.
        * @property _collisionCallbackContext
        * @type Any
        * @default null
        * @private
        */
        private _collisionCallbackContext;

        /**
        * The render loop. 
        * @method render
        * @param camera {Camera}
        * @public
        */
        public render(camera: Kiwi.Camera) {
            
            for (var i = 0; i < this.layers.length; i++) {
                this.layers[i].render(camera);
            }
            
        }

        /**
        * Creates the tilemap based of some json data that gets parsed.
        *
        * @method parseTiledJSON
        * @param data {any} The JSON data to create the map based off.
        * @private
        */
        private parseTiledJSON(data:any) {

            var mapObj = data;
            this.generateTiles();

            for (var i = 0; i < mapObj.layers.length; i++)
            {
                //perhaps should change width/height to spritesheet width/height
                var layer: TileMapLayer = new TileMapLayer(this.state, this, this._atlas, mapObj.layers[i].name, mapObj.tilewidth, mapObj.tileheight);
                
                layer.transform.parent = this.transform;
                layer.transform.setPosition(mapObj.layers[i].x, mapObj.layers[i].y);
                layer.alpha = parseInt(mapObj.layers[i].opacity);
                layer.visibility = mapObj.layers[i].visible;

                var c = 0;
                var row;

                //var tileQuantity = layer.parseTileOffsets(layer);

                for (var t = 0; t < mapObj.layers[i].data.length; t++) {
                    if (c == 0) {
                        row = [];
                    }

                    row.push( this.tiles[parseInt(mapObj.layers[i].data[t])] );
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

        /**
        * Generates the new TileTypes and add them to the tiles array based upon the SpriteSheet that is parsed.
        * @method generateTiles
        * @param layer {TileMapLayer} The TileMapLayer that these TileTypes are based on.
        * @param qty {Number} THe number of TileTypes to create.
        * @private
        */
        private generateTiles() {

            if (this.tiles[-1] == undefined) {
                this.tiles[-1] = new TileType(this.game, this, -1, -1); //perhaps create a custom class.
                this.tiles[-1].allowCollisions = Kiwi.Components.ArcadePhysics.NONE;
            }

            for (var i = 0; i < this._atlas.cells.length; i++) {
                this.tiles.push(new TileType(this.game, this, this._atlas.cells[i], i));
            }
            
        }
        
        /**
        * Gets the current TileMapLayer's width in pixels.
        * @property widthInPixels
        * @type number
        * @public
        */
        public get widthInPixels(): number {
            return this.currentLayer.widthInPixels;
        }

        /**
        * Gets the current TileMapLayers height in pixels.
        * @property heightInPixels
        * @type number
        * @public
        */
        public heightInPixels(): number {
            return this.currentLayer.heightInPixels;
        }
         
        /**
        * Gets a tiletype by a index provided.
        * 
        * @method getTileTypeByIndex
        * @param value {number} The index of the tile type you are getting
        * @return {TileType}
        * @public
        */
        public getTileTypeByIndex(value: number): TileType {

            if (this.tiles[value]) {
                return this.tiles[value];
            }

            return null;
        }

        /**
        * Gets a single tile either off the tile layer passed otherwise off the currentLayer if no layer is specified.
        *
        * @method getTile
        * @param x {number} The x coordinate of the tile you would like to get.
        * @param y {number} The y cooridnate of the tile you would like to get.
        * @param [layer] {number} The layer that you want to get the tile on. If not passed then it uses the current layer.
        * @return {Tile}
        * @public
        */
        public getTile(x: number, y: number, layer?: number): Tile {   

            if (layer === undefined) {
                return this.currentLayer.getTile(x, y);;
            } else {
                return this.layers[layer].getTile(x, y);;
            }

        }

        /**
        * Gets an array of tiles based on a TileType index.
        *
        * @method getTilesByType
        * @param index {number} The index of the TileType you would like to get.
        * @param layer {number} The layer that you would like to get them on. If not passed then this is based on the current layer.
        * @return {Tile }
        * @public
        */
        public getTilesByType(index: number, layer?: number):Tile[] {

            if (layer === undefined) {
                return this.currentLayer.getTilesByIndex(index);
            } else {
                return this.layers[layer].getTilesByIndex(index);
            }

        }

        /**
        * Gets a tile based on the passed X and Y. 
        * Caution! If the tilemap has moved make sure you put that into account.
        * 
        * @method getTileFromWorldXY
        * @param {number} x
        * @param {number} y
        * @param {number} layer
        * @return {Tile}
        * @public
        */
        public getTileFromXY(x: number, y: number, layer?: number): Tile {
            if (layer === undefined) {
                return this.currentLayer.getTileFromXY(x, y);
            } else {
                return this.layers[layer].getTileFromXY(x, y);
            }

        }

        /**
        * Checks to see if an entity overlaps with any colliable tiles on the current layer. Returns the tiles that it overlaps with.
        *
        * @method getTileOverlaps
        * @param object {Entity}
        * @returns {Array}
        * @public
        */
        public getTileOverlaps(object: Kiwi.Entity) {

            return this.currentLayer.getTileOverlaps(object);

        }

        /**
        * Adds/Reassign's a tile on the point in the map you specify.
        *
        * @method putTile
        * @param {number} x
        * @param {number} y
        * @param {number} index
        * @param {number} layer
        * @public
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

        /**
        * Set the callback to be called when the tilemap collides.
        *
        * @method setCollisionCallback
        * @param {function} Callback function
        * @param {any} Callback will be called with this context
        * @public
        */
        public setCollisionCallback(callback, context) {

            this._collisionCallback = callback;
            this._collisionCallbackContext = context;

        }

        /**
        * Sets the collision of a range of tiletypes.
        *
        * @method setCollisionRange
        * @param {number} start
        * @param {number} end
        * @param {number} [collision=ArcadePhysics.ANY]
        * @param {boolean} [seperate=true]
        * @public
        */
        public setCollisionRange(start: number, end: number, collision: number = Kiwi.Components.ArcadePhysics.ANY, seperate: boolean = true) {

            for (var i = start; i <= end; i++) {
                this.setCollisionByIndex(i, collision, seperate);
            }

        }

        /**
        * Sets the collision of a single tiletype by the index.
        *
        * @method setCollisionIndex
        * @param {number} index
        * @param {number} [collision=ArcadePhysics.ANY]
        * @param {boolean} [seperate=true]
        * @public
        */
        public setCollisionByIndex(index: number, collision: number = Kiwi.Components.ArcadePhysics.ANY, seperate: boolean = true) {
            this.tiles[index].seperate = seperate;
            this.tiles[index].allowCollisions = collision;

            var tiles = this.currentLayer.getTilesByIndex(index);

            for (var t = 0; t < tiles.length; t++) {
                tiles[t].physics.seperate = seperate;
                tiles[t].physics.allowCollisions = collision;
            }
        }

        /**
        * Checks to see if a single object is colliding with any colliable tiles.
        *
        * @method collideSingle
        * @param {Entity} object
        * @return {boolean}
        * @public
        */
        public collideSingle(object: Kiwi.Entity):boolean {
            
            if (object.exists === false || !object.components.hasComponent('ArcadePhysics')) return false;

            var tiles:any[] = this.currentLayer.getTileOverlaps(object);

            if (tiles !== undefined) {
                var col = false;
                for (var i = 0; i < tiles.length; i++) {
                    if (object.components.getComponent('ArcadePhysics').overlaps(tiles[i], tiles[i].tileType.seperate)) {
                        col = true;
                        
                        if (this._collisionCallback !== null) {
                            this._collisionCallback.call(this._collisionCallbackContext, object, tiles[i]);
                        }
                    }
                }
                return col;
            }
            return false;
        }

        /**
        * Tests to see if a group of entities are colliding with any tiles. 
        * 
        * @method collideGroup
        * @param group {Group}
        * @public
        */
        public collideGroup(group: Kiwi.Group) {

            for (var i = 0; i < group.members.length; i++) {
                //this.collideSingle(group.members[i]);
            }

        }

        /**
        * Destroys everything.
        * @method destroy
        * @param [immediate=false] {Boolean} If the tilemap should be removed right away or if it should be removed next time the update loop executes?
        * @public
        */
        public destroy(immediate:boolean =false) {
            
            super.destroy(immediate);

            if (immediate === true) {
                delete this.tiles;
                if (this.layers) {
                    for (var i = 0; i < this.layers.length; i++) {
                        this.layers[i].destroy();
                        delete this.layers[i];
                    }
                }
                if (this.tiles) {
                    for (var i = 0; i < this.tiles.length; i++) {
                        this.tiles[i].destroy();
                        delete this.tiles[i];
                    }
                }
                delete this.tiles;
                delete this.layers;
                delete this._tileMapDataKey;
                delete this._atlas;
            }
        }

    }

}