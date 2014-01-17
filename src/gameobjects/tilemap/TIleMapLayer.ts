/**
* 
* @module GameObjects
* @submodule Tilemap
* 
*/

module Kiwi.GameObjects.Tilemap {


    /**
    * Is GameObject that contains the information held for a single Layer of Tiles, along with methods to handle the rendering of those Tiles. 
    * A TileMapLayer should not be directly created, but instead should be created through a TileMap object instead.
    * 
    * @class TileMapLayer
    * @extends Entity
    * @namespace Kiwi.GameObjects.Tilemap
    * @constructor
    * @param tilemap {TileMap} The TileMap that this layer belongs to.
    * @param name {String} The name of this TileMapLayer.
    * @param atlas {TextureAtlas} The texture atlas that should be used when rendering this TileMapLayer onscreen.
    * @param data {Number[]} The information about the tiles.
    * @param tw {Number} The width of a single tile in pixels. Usually the same as the TileMap unless told otherwise.
    * @param th {Number} The height of a single tile in pixels. Usually the same as the TileMap unless told otherwise.
    * @param [x=0] {Number} The x coordinate of the tilemap in pixels.
    * @param [y=0] {Number} The y coordinate of the tilemap in pixels.
    * @param [w=0] {Number} The width of the whole tilemap in tiles. Usually the same as the TileMap unless told otherwise.
    * @param [h=0] {Number} The height of the whole tilemap in tiles. Usually the same as the TileMap unless told otherwise.
    * @return {TileMapLayer}
    */
    export class TileMapLayer extends Kiwi.Entity {

        constructor(tilemap: Kiwi.GameObjects.Tilemap.TileMap, name: string, atlas: Kiwi.Textures.TextureAtlas, data: number[], tw: number, th: number, x: number= 0, y: number= 0, w:number=0, h:number=0) {
            super(tilemap.state, x, y);

            this.name = name;
            this.atlas = atlas;
            this.tilemap = tilemap;
            this._data = data;
            this.tileWidth = tw;
            this.tileHeight = th;
            this.width = w;
            this.height = h;
            this.cellIndex = null; //Cell Index doesn't matter for a TileMapLayer itself.
        }

        /**
        * The type of object that it is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "TileMapLayer";
        }

        /**
        * The tilemap that this TileMapLayer is a part of.
        * @property tilemap
        * @type TileMap
        * @public
        */
        public tilemap: Kiwi.GameObjects.Tilemap.TileMap;

        /**
        * Properties about that this TileMapLayer has when it was created from a JSON file.
        * @property properties
        * @type Object
        * @public
        */
        public properties: any = {};
        
        /**
        * The width of this TileMap in tiles.
        * @property width
        * @type Number
        * @public
        */
        public width: number;
        
        /**
        * The height of this TileMap in tiles.
        * @property height
        * @type Number
        * @public
        */
        public height: number;
        
        /**
        * The width of a single tile.
        * @property tileWidth
        * @type Number
        * @public
        */
        public tileWidth: number;
        
        /**
        * The height of a single tile.
        * @property tileHeight
        * @type Number
        * @public
        */
        public tileHeight: number;
        
        /**
        * The texture atlas that should be used when rendering.
        * @property atlas
        * @type TextureAtlas
        * @public
        */
        public atlas: Kiwi.Textures.TextureAtlas;
        
        /**
        * The width of the layer in pixels. This property is READ ONLY.
        * @property widthInPixels
        * @type number
        * @public
        */
        public get widthInPixels(): number {
            return this.width * this.tilemap.tileWidth;
        }
        
        /**
        * The height of the layer in pixels. This property is READ ONLY.
        * @property heightInPixels
        * @type number
        * @public
        */
        public get heightInPixels(): number {
            return this.height * this.tilemap.tileHeight;
        }

        /**
        * A list containing all the types of tiles found on this TileMapLayer.
        * @property _data
        * @type number[]
        * @private
        */
        private _data: number[];

        /**
        * Returns the total number of tiles. Either for a particular type if passed, otherwise of any type if not passed.
        * @method countTiles
        * @param [type] {Number} The type of tile you want to count.
        * @return {Number} The number of tiles on this layer.
        * @public
        */
        public countTiles(type?:number):number {

            var cnt = 0;

            for (var i = 0; i < this._data.length; i++) {
                if (type == undefined && this._data[i] !== 0) cnt++;
                else if (type === this._data[i]) cnt++; 
            }

            return cnt;
        }


        /**
        *-----------------------
        * Getting Tiles
        *-----------------------
        */


        /**
        * A list containing all of the types of tiles found on this TileMapLayer. This is READ ONLY.
        * @property tileData
        * @type number[]
        * @public
        */
        public get tileData(): number[] {
            return this._data;
        }
        
        /**
        * Returns the index of the tile based on the x and y coordinates of the tile passed. 
        * If no tile is a the coordinates given then -1 is returned instead.
        * Coordinates are in tiles not pixels.
        * @method getIndexFromXY
        * @param x {Number} The x coordinate of the Tile you would like to retrieve. 
        * @param y {Number} The y coordinate of the Tile you would like to retrieve.
        * @return {Number} Either the index of the tile retrieved or -1 if none was found.
        * @public
        */
        public getIndexFromXY(x: number, y: number): number {
            var num = x + y * this.width;

            //Does the index exist?
            if (num < 0 || num >= this._data.length) return -1;
            else return num;
        }

        /**
        * Returns the TileType for a tile that is at a particular coordinate passed. 
        * If no tile is found the null is returned instead.
        * Coordinates passed are in tiles.
        * @method getTileFromXY
        * @param x {Number}
        * @param y {Number}
        * @return {Number} The tile
        * @public
        */
        public getTileFromXY(x: number, y: number): TileType {
            var t = this.getIndexFromXY(x, y);
            return (t !== -1) ? this.tilemap.tileTypes[ this._data[t] ] : null;
        }

        /**
        * Returns the indexes of every tile of a type you pass.
        * @method getIndexsByType
        * @param type {Number}
        * @return {Number[]}
        * @public
        */
        public getIndexesByType(type:number):number[] {
            var tiles = [];
            for (var i = 0; i < this._data.length; i++) {
                if (this._data[i] == type) tiles.push(i);
            }
            return tiles;
        }


        /**
        *-----------------------
        * Tiles Manipulation
        *-----------------------
        */

        /**
        * Sets the tile to be used at the coordinates provided. 
        * Can be used to override a tile that may already exist at the location.
        * @method setTile
        * @param x {number} The coordinate of the tile on the x axis. 
        * @param y {number} The coordinate of the tile on the y axis.
        * @param tileType {number} The type of tile that should be now used.
        * @return {boolean} If a tile was changed or not.
        * @public
        */
        public setTile(x: number, y: number, tileType:number):boolean {
            var x = this.getIndexFromXY(x, y);

            if (x !== -1) {
                this._data[x] = tileType;
                return true;
            } 

            return false;
        }

        /**
        * Sets the tile to be used at the index provided.
        * Can be used to override a tile that may already exist at the location.
        * @method setTileByIndex
        * @param index {number} The index of the tile that you want to change.
        * @param tileType {number} The new tile type to be used at that position.
        * @public
        */
        public setTileByIndex(index: number, tileType: number) {
            this._data[index] = tileType;
        }

        /**
        * Randomizes the types of tiles used in an area of the layer. You can choose which types of tiles to use, and the area.
        * Default tile types used are everyone avaiable. 
        * @method randomizeTiles
        * @param [types] {number[]} A list of TileTypes that can be used. Default is every tiletype on the TileMap.
        * @param [x=0] {number} The starting tile on the x axis to fill. 
        * @param [y=0] {number} The starting tile on the y axis to fill.
        * @param [width=this.width] {number} How far across you want to go.
        * @param [height=this.height] {number} How far down you want to go.
        * @public
        */
        public randomizeTiles(types?: number[], x: number= 0, y: number= 0, width: number= this.width, height: number= this.height) {

            if (types == undefined) {
                types = [];
                var i = 0;
                while (i++ < this.tilemap.tileTypes.length) {
                    types.push(i);
                }
            }

            for (var j = y; j < y + height; j++) {
                for (var i = x; i < x + width; i++) {

                    var tile = this.getIndexFromXY(i, j);
                    if (tile !== -1) this._data[tile] = this.game.rnd.pick(types);

                }
            }

        }

        /**
        * Makes all of the tiles in the area specified a single type that is passed.
        * @method fill
        * @param type {number} The type of tile you want to fill in the area with.
        * @param [x=0] {number} The starting tile on the x axis to fill. 
        * @param [y=0] {number} The starting tile on the y axis to fill.
        * @param [width=this.width] {number} How far across you want to go.
        * @param [height=this.height] {number} How far down you want to go.
        * @public
        */
        public fill(type: number, x: number= 0, y: number= 0, width: number= this.width, height: number= this.height) {

            for (var j = y; j < y + height; j++) {
                for (var i = x; i < x + width; i++) {

                    var tile = this.getIndexFromXY(i, j);
                    if (tile !== -1) this._data[tile] = type;

                }
            }

        }

        /**
        * Replaces all tiles of typeA to typeB in the area specified. If no area is specified then it is on the whole layer.
        * @method replaceTiles
        * @param typeA {number} The type of tile you want to be replaced.
        * @param typeB {number} The type of tile you want to be used instead.
        * @param [x=0] {number} The starting tile on the x axis to fill. 
        * @param [y=0] {number} The starting tile on the y axis to fill.
        * @param [width=this.width] {number} How far across you want to go.
        * @param [height=this.height] {number} How far down you want to go.
        * @public
        */
        public replaceTiles(typeA: number, typeB: number, x:number=0, y:number=0, width:number=this.width,height:number=this.height) {

            for (var j = y; j < y + height; j++) {
                for (var i = x; i < x + width; i++) {

                    var tile = this.getIndexFromXY(i, j);
                    if (tile !== -1 && this._data[tile] == typeA) this._data[tile] = typeB; 

                }
            }

        }

        /**
        * Swaps all the tiles that are typeA -> typeB and typeB -> typeA inside the area specified. If no area is specified then it is on the whole layer.
        * @method swapTiles
        * @param typeA {number} The type of tile you want to be replaced with typeB.
        * @param typeB {number} The type of tile you want to be replaced with typeA.
        * @param [x=0] {number} The starting tile on the x axis to fill. 
        * @param [y=0] {number} The starting tile on the y axis to fill.
        * @param [width=this.width] {number} How far across you want to go.
        * @param [height=this.height] {number} How far down you want to go.
        * @public
        */
        public swapTiles(typeA: number, typeB: number, x: number= 0, y: number= 0, width: number= this.width, height: number= this.height) {

            for (var j = y; j < y + height; j++) {
                for (var i = x; i < x + width; i++) {
                    var tile = this.getIndexFromXY(i, j);

                    if (tile !== -1) {
                        if (this._data[tile] == typeA) this._data[tile] = typeB;
                        else if (this._data[tile] == typeB) this._data[tile] = typeA;
                    } 
                }
            }

        }

        /**
        * The update loop that is executed when this TileMapLayer is add to the Stage.
        * @method update
        * @public 
        */
        public update() {
            super.update();

        }
        
        /**
        *-----------------------
        * Temp Properties used During Rendering
        *-----------------------
        */

        private _maxX: number;
        private _maxY: number;
        private _startX: number;
        private _startY: number;
        private _temptype: TileType;

        /** 
        * The render loop which is used when using the Canvas renderer.
        * @method render
        * @param camera {Camera}
        * @public
        */
        public render(camera: Kiwi.Camera) {

            //When not to render the map.
            if (this.visible === false || this.alpha < 0.1 || this.exists === false) {
                return;
            }

            //Get the context.
            var ctx = this.game.stage.ctx;
            ctx.save();

            //Make the map alphed out.
            if (this.alpha > 0 && this.alpha <= 1) {
                ctx.globalAlpha = this.alpha;
            }

            // Transform
            var t: Kiwi.Geom.Transform = this.transform;
            var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();

            ctx.transform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX - camera.transform.rotPointX, m.ty + t.rotPointY - camera.transform.rotPointY);
            
            // Work out how many tiles we can fit into our camera and round it up for the edges
            this._maxX = Math.min(Math.ceil(camera.width / this.tileWidth) + 1, this.width);
            this._maxY = Math.min(Math.ceil(camera.height / this.tileHeight) + 1, this.height);

            // And now work out where in the tilemap the camera actually is
            this._startX = Math.floor((-camera.transform.x - t.x) / this.tileWidth);
            this._startY = Math.floor((-camera.transform.y - t.y) / this.tileHeight);

            // Boundaries check for the start 
            if (this._startX < 0) this._startX = 0;
            if (this._startY < 0) this._startY = 0;

            // Check for the Maximum
            if (this._maxX > this.width) this._maxX = this.width;
            if (this._maxY > this.height) this._maxY = this.height;

            if (this._startX + this._maxX > this.width) this._maxX = this.width - this._startX;
            if (this._startY + this._maxY > this.height) this._maxY = this.height - this._startY;
            
            for (var y = this._startY; y < this._startY + this._maxY; y++) {
                for (var x = this._startX; x < this._startX + this._maxX; x++) {

                    if ( (this._temptype = this.getTileFromXY(x, y)) && this._temptype.cellIndex !== -1 ) {

                        var cell = this.atlas.cells[this._temptype.cellIndex];

                        ctx.drawImage(
                            this.atlas.image,
                            cell.x,
                            cell.y,
                            cell.w,
                            cell.h,
                            x * this.tileWidth ,
                            y * this.tileHeight - (cell.h - this.tileHeight),
                            cell.w,
                            cell.h
                            );

                    }


                }
            }


            ctx.restore();
            return true;
        }
    }
}
