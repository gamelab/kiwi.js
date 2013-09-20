/**
* Kiwi - GameObjects - TileMapLayer
* @module GameObjects
* @submodule Tilemap
* 
*/

module Kiwi.GameObjects.Tilemap {

    /**
    *
    * @class TileMapLayer
    * @extends Entity
    * @constructor
    * @param state {State} The state that this tilemap belongs to. 
    * @param parent {TileMap} The TileMap on which this TileMapLayer is a part of.
    * @param atlas {SpriteSheet} The spritesheet that is being used to render the tiles.
    * @param name {string} The name of this tilemap.
    * @param tileWidth {number} The width of a single tile.
    * @param tileHeight {number} The height of a single tile
    * @return {TileMapLayer} 
    * 
    */
    export class TileMapLayer extends Kiwi.Entity {
         
        constructor(state:Kiwi.State, parent: Kiwi.GameObjects.Tilemap.TileMap, atlas: Kiwi.Textures.SpriteSheet, name: string, tileWidth: number, tileHeight: number) {
            
            super(state,0,0);

            this.tileParent = parent;

            this.name = name;
            this.tileWidth = tileWidth;
            this.tileHeight = tileHeight;

            this.mapData = [];
            this._tempTileBlock = [];
            this._atlas = atlas;
           
        }

        /**
        * The TileMap that this TileMapLayer is a child of.
        * @property tileParent
        * @type TileMap
        * @public
        */
        public tileParent: Kiwi.GameObjects.Tilemap.TileMap;

        /**
        * The spritesheet that is being used to render information on.
        * @property _atlas
        * @type SpriteSheet
        * @private
        */
        private _atlas: Kiwi.Textures.SpriteSheet;

        /**
        * The starting tile on the x axis (the row) that needs to rendered. 
        * This is calculated based upon where the tiles are in relation to the camera.
        * This is updated each frame.
        * @property _startX
        * @type number
        * @private
        */
        private _startX: number = 0;
        
        /**
        * The starting tile on the y axis (the column) that needs to rendered. 
        * This is calculated based upon where the tiles are in relation to the camera.
        * This is updated each frame.
        * @property _startY
        * @type number
        * @private
        */
        private _startY: number = 0;

        /**
        * The maximum number of tiles that can fit on the camera. On the x axis. From this we can calculate the last tile we need to render.
        * @property _maxX
        * @type number
        * @private
        */
        private _maxX: number = 0;

        /**
        * The maximum number of tiles that can fit on the camera. On the y axis. From this we can calculate the last tile we need to render.
        * @property _maxY
        * @type number
        * @private
        */
        private _maxY: number = 0;

        /**
        * Temporarily holds the information for a single column on tiles.
        * @property _columnData
        * @type Object
        * @private
        */
        private _columnData;

        /**
        * Holds a set of tile information that is temporarily used when manipulating tiles. 
        * @property _tempTileBlock
        * @type Any
        * @private
        */
        private _tempTileBlock;

        /**
        * Holds the starting index of a tile on the x-axis that are to be retrieved. 
        * Use with the other _tempTile properties.
        * @property _tempTileX
        * @type number
        * @private
        */
        private _tempTileX: number;

        /**
        * Holds the starting index of a tile on the y-axis that are to be retrieved.
        * Use with the other _tempTile properties.
        * @property _tempTileY
        * @type number
        * @private
        */
        private _tempTileY: number;

        /**
        * Holds the number of tiles in the x-axis that are to be retrieved.
        * Use with the other _tempTile properties.
        * @property _tempTileW
        * @type number
        * @private
        */
        private _tempTileW: number;

        /**
        * Holds the number of tiles in the y-axis that are to be retrieved.
        * Use with the other _tempTile properties.
        * @property _tempTileH
        * @type number
        * @private
        */
        private _tempTileH: number;

        /**
        * The name of the layer. This is never used so it can just be for niceties.
        * @property name
        * @type string
        * @public
        */
        public name: string;

        /**
        * Holds all of the information about the tile map data.
        * @property mapData
        * @type Array
        * @public
        */
        public mapData;

        /**
        * The width of a single tile. This is the same across tiles.
        * @property tileWidth
        * @type number
        * @public
        */
        public tileWidth: number;
        
        /**
        * The height of a single tile. This is the same across tiles.
        * @property tileHeight
        * @type number
        * @public
        */
        public tileHeight: number;

        /**
        * The number of tiles on the x-axis for this TileMapLayer.
        * @property widthInTiles
        * @type number
        * @public
        */
        public widthInTiles: number = 0;
        
        /**
        * The number of tile on the y-axis for the TileMapLayer.
        * @property heightInTiles
        * @type number
        * @public
        */
        public heightInTiles: number = 0;

        /**
        * The width of the whole TileMapLayer in pixels.
        * @property widthInPixels
        * @type number
        * @public
        */
        public widthInPixels: number = 0;
        
        /**
        * The height of the while TileMapLayer in pixels.
        * @property heightInPixels
        * @type number
        * @public
        */
        public heightInPixels: number = 0;

        /**
        * Adds a single tile to the map at the given boundaries. This could be used to override a currently existing map tile.
        *
        * @method putTile
        * @param x {number} The x coordinate of the tile.
        * @param y {number} The y coordinate of the tile.
        * @param tileType {TileType} The type of tile that you are adding.
        * @public
        */
        public putTile(x: number, y: number, tileType: Kiwi.GameObjects.Tilemap.TileType) {

            x = Kiwi.Utils.GameMath.snapToFloor(x, this.tileWidth) / this.tileWidth;
            y = Kiwi.Utils.GameMath.snapToFloor(y, this.tileHeight) / this.tileHeight;

            if (y >= 0 && y < this.mapData.length) {
                if (x >= 0 && x < this.mapData[y].length) {
                    this.mapData[y][x].tileUpdate(tileType);
                }
            }

        }

        /**
        * Replaces a section of tiles on the map with a particular tile. [NEEDS UPDATING]
        * 
        * @method fillTile
        * @param index {number} The type of tile that you are using.
        * @param [x=0] {number} The starting coordinate of the tile on the x-axis. 
        * @param [y=0] {number} The starting coordinate of the tile on the y-axis.
        * @param [width] {number} The width of the area you want to replace. Defaults to the whole maps width.
        * @param [height] {number} The height of the area you want to replace. Defaults to the whole maps height.
        * @public
        */
        public fillTiles(index: number, x: number = 0, y: number = 0, width: number = this.widthInTiles, height: number = this.heightInTiles) {

            this.getTempBlock(x, y, width, height); 

            for (var r = 0; r < this._tempTileBlock.length; r++) {
                this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this.tileParent.tiles[index]);
            }

        }

        /**
        * Randomises a section of tiles on the map based on the tiles you want there.
        *
        * @method randomiseTiles
        * @param tiles {number[]} An array consisting of the TileTypes that you want.
        * @param [x=0] {number} The starting coordinate of the tile on the x-axis. 
        * @param [y=0] {number} The starting coordinate of the tile on the y-axis.
        * @param [width] {number} The width of the area you want to replace. Defaults to the whole maps width.
        * @param [height] {number} The height of the area you want to replace. Defaults to the whole maps height.
        * @public
        */
        public randomiseTiles(tiles: number[], x: number= 0, y: number = 0, width: number= this.widthInTiles, height: number= this.heightInTiles) {
            
            this.getTempBlock(x, y, width, height);

            for (var r = 0; r < this._tempTileBlock.length; r++) {
                this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this.tileParent.tiles[this.game.rnd.pick(tiles)]);
            }
        } 

        /**
        * Swaps all of the tiles of indexA with tiles of indexB and the same alternatively.
        * 
        * @method swapTiles
        * @param indexA {number} The first type of tile you want to swapped with indexB.
        * @param indexB {number} The second type of tile that is to be swapped with indexA.
        * @param [x=0] {number} The starting coordinate of the tile on the x-axis. 
        * @param [y=0] {number} The starting coordinate of the tile on the y-axis.
        * @param [width] {number} The width of the area you want to replace. Defaults to the whole maps width.
        * @param [height] {number} The height of the area you want to replace. Defaults to the whole maps height.
        * @public
        */
        public swapTiles(indexA: number, indexB: number, x: number = 0, y: number = 0, width: number= this.widthInTiles, height: number= this.heightInTiles) {

            this.getTempBlock(x, y, width, height);

            for (var r = 0; r < this._tempTileBlock.length; r++) {

                if (this._tempTileBlock[r].tileType.index === indexA) {
                    this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this.tileParent.tiles[indexB]);

                } else if (this._tempTileBlock[r].tileType.index === indexB) {
                    this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this.tileParent.tiles[indexA]);
                }

            }

        }

        /**
        * Replaces all of the tiles of indexA with the tiles of indexB. This only happen's one way.
        *
        * @method replaceTiles
        * @param indexA {number} The tile type that you want to be replaced.
        * @param indexB {number} The tile type that you want to replace it with. 
        * @param [x=0] {number} The starting coordinate of the tile on the x-axis. 
        * @param [y=0] {number} The starting coordinate of the tile on the y-axis.
        * @param [width] {number} The width of the area you want to replace. Defaults to the whole maps width.
        * @param [height] {number} The height of the area you want to replace. Defaults to the whole maps height.
        * @public
        */ 
        public replaceTiles(indexA: number, indexB: number, x: number = 0, y: number = 0, width: number = this.widthInTiles, height: number= this.heightInTiles) {
            this.getTempBlock(x, y, width, height);

            for (var r = 0; r < this._tempTileBlock.length; r++) {

                if (this._tempTileBlock[r].tileType.index === indexA) {
                    this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this.tileParent.tiles[indexB]);
                }

            }
        }

        /**
        * Gets a single tile from the x and y provided.
        * 
        * @method getTileFromWorldXY
        * @param x {number} The coordinate of the tile on the x axis.
        * @param y {number} The coordinate of the tile on the y axis.
        * @return {Tile} The tile that is at the coordinates if there was one.
        * @public
        */
        public getTileFromXY(x: number, y: number): Kiwi.GameObjects.Tilemap.Tile {

            x = Kiwi.Utils.GameMath.snapToFloor(((x - this.transform.worldX )), this.tileWidth) / this.tileWidth;
            y = Kiwi.Utils.GameMath.snapToFloor(((y - this.transform.worldY )), this.tileHeight) / this.tileHeight;

            return this.getTile(x, y);

        }

        /**
        * Gets all of the tiles by the index number you pass. 
        *
        * @method getTilesByIndex
        * @param {number} The index of the types of tiles you want to retrieve.
        * @return {Tile[]}
        * @public
        */
        public getTilesByIndex(index: number):Tile[] {
            var tiles = [];
            for (var ty = 0; ty < this.mapData.length; ty++) {
                for (var tx = 0; tx < this.mapData[ty].length; tx++) {

                    if (this.mapData[ty][tx].tileType.index === index) {
                        tiles.push(this.mapData[ty][tx]);
                    }

                }
            }
            return tiles;
        }

        /**
        * Creates a set of temporary tile blocks based on the current map data.
        * Perhaps add another param which is by a certain tile index?
        * 
        * @method getTempBlock
        * @param x {number} The x first tile in the row you want to use. (In tiles).
        * @param y {number} The y first tile in the column you want to use. (In tiles).
        * @param width {number} The number of tiles wide.
        * @param height {number} The number of tiles high.
        * @param [collisionOnly=false] {boolean} Get only the tiles that can have collisions.
        * @private
        */ 
        private getTempBlock(x: number, y: number, width: number, height: number, collisionOnly: boolean = false) {

            if (x < 0) x = 0;
            if (y < 0) y = 0;

            if (x + width > this.widthInTiles) width = this.widthInTiles - x + 1;     
            if (y + height > this.heightInTiles) height = this.heightInTiles - y + 1; 

            this._tempTileBlock = [];

            for (var ty = y; ty < y + height; ty++) {
                for (var tx = x; tx < x + width; tx++) {
                    if (this.mapData[ty] && this.mapData[ty][tx] && this.mapData[ty][tx].cellIndex !== -1) {
                        if (collisionOnly) {
                            //  We only want to consider the tile for checking if you can actually collide with it
                            if (this.mapData[ty][tx].tileType.allowCollisions != Kiwi.Components.ArcadePhysics.NONE) {
                                this._tempTileBlock.push(this.mapData[ty][tx]);
                            }
                        } else {
                            
                            this._tempTileBlock.push(this.mapData[ty][tx]);
                            
                        }
                    }
                }
            }

        }

        /**
        * Returns all of the tiles that overlap a given entity. 
        * Returns an array with each index containing the tiles
        *
        * @method getTileOverlaps
        * @param object {Entity} The entity that you are checking.
        * @return {Array}
        * @public
        */
        public getTileOverlaps(object: Kiwi.Entity):Array {
            
            //if the object is within the bounds at all.?
            
            var objPos = object.transform;

            if (objPos.worldX > this.transform.worldX + this.widthInPixels || objPos.worldX + object.width < this.transform.worldX || objPos.worldY > this.transform.worldY + this.heightInPixels || objPos.worldY + object.height < this.transform.worldY) {
                return;
            }

            this._tempTileX = Kiwi.Utils.GameMath.snapToFloor(objPos.worldX - this.transform.worldX, this.tileWidth) / this.tileWidth;
            this._tempTileY = Kiwi.Utils.GameMath.snapToFloor(objPos.worldY - this.transform.worldY, this.tileHeight) / this.tileHeight;
            
            this._tempTileW = Kiwi.Utils.GameMath.snapToCeil(object.width, this.tileWidth) / this.tileWidth;
            this._tempTileH = Kiwi.Utils.GameMath.snapToCeil(object.height, this.tileHeight) / this.tileHeight;

            this.getTempBlock(this._tempTileX, this._tempTileY, this._tempTileW + 1, this._tempTileH + 1, true);
            
            return this._tempTileBlock;

        }

        /**
        * Gets a tile's index based on the indexs provided.
        * 
        * @method getTileIndex
        * @param x {number}
        * @param y {number}
        * @return {number}
        * @public
        */
        public getTileIndex(x: number, y: number): number {

            if (y >= 0 && y < this.mapData.length) {        //if it is with the bounds
                if (x >= 0 && x < this.mapData[y].length) {
                    return this.mapData[y][x].tileType.index;              //return
                }
            }

            return null; 
        }

        /**
        * Gets a tile based on the given position it would be in the tile map.
        * 
        * @method getTileIndex
        * @param x {number}
        * @param y {number}
        * @return {Tile}
        * @public
        */
        public getTile(x: number, y: number): Kiwi.GameObjects.Tilemap.Tile {
            if (y >= 0 && y < this.mapData.length) {        //if it is with the bounds
                if (x >= 0 && x < this.mapData[y].length) {
                    return this.mapData[y][x];              //return
                }
            }

            return null;
        }

        /**
        * Adds a row of tiles to the tilemap.
        *
        * @method addRow
        * @param row {Array} 
        * @public
        */
        public addRow(row:Array) {

            var data = [];
            
            for (var c = 0; c < row.length; c++) {
                data[c] = new Kiwi.GameObjects.Tilemap.Tile(this.state, this, row[c], this.tileWidth, this.tileHeight, c * this.tileWidth, this.heightInPixels);
                data[c].transform.parent = this.transform;
                data[c].ty = this.heightInTiles;
                data[c].tx = c;
            }

            if (this.widthInTiles == 0) {
                this.widthInTiles = data.length;
                this.widthInPixels = this.widthInTiles * this.tileWidth;
            }

            this.mapData.push(data);

            this.heightInTiles++;
            this.heightInPixels += this.tileHeight;

        }

        /**
        * Renders the tileMap to the stage. It also updates the position component of all of the tiles that appear. [NEED TO UPDATE]
        *
        * @method render
        * @param camera {Camera}
        * @public
        */ 
        public render(camera: Kiwi.Camera) { 
            
            if (this.visiblity === false || this.alpha < 0.1 || this.exists === false) {
                return;
            }
            
            var ctx = this.game.stage.ctx;
            ctx.save();

            if (this.alpha > 0 && this.alpha <= 1) {
                ctx.globalAlpha = this.alpha;
            }

            var t: Kiwi.Geom.Transform = this.transform;
            var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
            
            ctx.setTransform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX, m.ty + t.rotPointY);

            //  Work out how many tiles we can fit into our camera and round it up for the edges
            this._maxX = Math.min(Math.ceil(camera.width / this.tileWidth) + 1,this.widthInTiles);
            this._maxY = Math.min(Math.ceil(camera.height / this.tileHeight) + 1,this.heightInTiles);
            
            //  And now work out where in the tilemap the camera actually is
            this._startX = Math.floor((camera.transform.x - t.x) / this.tileWidth);
            this._startY = Math.floor((camera.transform.y - t.y) / this.tileHeight);
            
            //boundaries check 
            if (this._startX < 0) {
                this._startX = 0;    
            }    
            if (this._startY < 0) {
                this._startY = 0;
            }

            if (this._maxX > this.widthInTiles) this._maxX = this.widthInTiles;
            if (this._maxY > this.heightInTiles) this._maxY = this.heightInTiles;

            if (this._startX + this._maxX > this.widthInTiles) {
                this._maxX = this.widthInTiles - this._startX;
            }    
            if (this._startY + this._maxY > this.heightInTiles) {
                this._maxY = this.heightInTiles - this._startY;
            }
            
            for (var column = this._startY; column < this._startY + this._maxY; column++) {
                this._columnData = this.mapData[column]; //get the column data
                //careful here.
                for (var tile = this._startX; tile < this._startX + this._maxX; tile++) {
                    
                    if (this._columnData[tile].tileType.cellIndex !== -1) {
                        
                        ctx.drawImage(
                            this._atlas.image,
                            this._columnData[tile].tileType.cellIndex.x,
                            this._columnData[tile].tileType.cellIndex.y,
                            this._columnData[tile].tileType.cellIndex.w,
                            this._columnData[tile].tileType.cellIndex.h,
                            this._columnData[tile].x,
                            this._columnData[tile].y,
                            this.tileWidth,
                            this.tileHeight
                            );
                        
                        this._columnData[tile].physics.update();
                    }


                }
                
            }

            ctx.restore();
            return true;
        
        }
        

    }
}
