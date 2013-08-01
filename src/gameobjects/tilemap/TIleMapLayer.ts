module Kiwi.GameObjects {

    export class TileMapLayer {

        constructor(game: Kiwi.Game, parent: Kiwi.GameObjects.TileMap, imageCache: Kiwi.Cache, imageKey: string, mapFormat: number, name: string, tileWidth: number, tileHeight: number) {
            this._game = game;
            this._parent = parent;

            this.name = name;
            this.mapFormat = mapFormat;
            this.tileWidth = tileWidth;
            this.tileHeight = tileHeight;
            this.boundsInTiles = new Kiwi.Geom.Rectangle();

            this.mapData = [];
            this._tempTileBlock = [];
            this._texture = imageCache.images.getFile(imageKey).data;

            this.components = new Kiwi.ComponentManager(Kiwi.TILE_LAYER, this);
            this.position = this.components.add(new Kiwi.Components.Position(0, 0, 0));
            this.position.updated.add(this._updatePosition, this);
            this.alpha = this.components.add(new Kiwi.Components.Alpha(1));
            this.visible = this.components.add(new Kiwi.Components.Visible(true));

        }

        private _game: Game;
        private _parent: Kiwi.GameObjects.TileMap;
        private _texture;
        private components: Kiwi.ComponentManager;

        /*
        * The component position.
        */
        public position: Kiwi.Components.Position;

        /*
        * The alpha component.
        */
        public alpha: Kiwi.Components.Alpha;

        /*
        * Visibility component.
        */
        public visible: Kiwi.Components.Visible;

        /*
        * Holds the coordinates for each tile on the sprite sheet.
        * @type {Array}
        */
        private _tileOffsets;

        /*
        * The starting tile that needs to be rendered
        */
        private _startX: number = 0;
        private _startY: number = 0;

        /*
        * Number of tiles that needs to be rendered
        */
        private _maxX: number = 0;
        private _maxY: number = 0;

        /*
        * Used while rendering as a reference to the coordinates the current tiles.
        */
        private _tx: number = 0;
        private _ty: number = 0;

        /*
        * The starting position in pixels
        */
        private _dx: number = 0;
        private _dy: number = 0;

        /*
        * Temporarily holds the information for a single column on tiles.
        */
        private _columnData;

        /*
        * Not used yet
        */
        private _oldCameraX: number = 0;
        private _oldCameraY: number = 0;

        /*
        * Holds a set of tile information that is used when manipulating tiles. 
        * @private
        */
        private _tempTileBlock;
        private _tempTileX: number;
        private _tempTileY: number;
        private _tempTileW: number;
        private _tempTileH: number;

        public name: string;
        public exists: bool = true;
        public orientation: string;
        public properties: {};

        /*
        * Holds all of the map's tile information.
        */
        public mapData;
        public mapFormat: number;
        public boundsInTiles: Kiwi.Geom.Rectangle;

        /*
        * The width/height of a single tile.
        */
        public tileWidth: number;
        public tileHeight: number;

        /*
        * The width and height of map in tiles.
        */
        public widthInTiles: number = 0;
        public heightInTiles: number = 0;

        /*
        * The width and height of the map in pixels.
        */
        public widthInPixels: number = 0;
        public heightInPixels: number = 0;

        /*
        * The spacing between each tile.
        */
        public tileMargin: number = 0;
        public tileSpacing: number = 0;

        /*
        * Adds a single tile to the map within the given boundaries. This could be used to override a currently existing map tile.
        *
        * @method putTile
        * @param {number} x
        * @param {number} y
        * @param {number} tileType
        */
        public putTile(x: number, y: number, tileType: Kiwi.GameObjects.TileType) {

            x = Kiwi.Utils.GameMath.snapToFloor(x, this.tileWidth) / this.tileWidth;
            y = Kiwi.Utils.GameMath.snapToFloor(y, this.tileHeight) / this.tileHeight;

            if (y >= 0 && y < this.mapData.length) {
                if (x >= 0 && x < this.mapData[y].length) {
                    this.mapData[y][x].tileUpdate(tileType);
                }
            }

        }

        /*
        * Replaces a section of tiles on the map with a particular tile.
        * 
        * @method fillTile
        * @param {number} index
        * @param {number} x
        * @param {number} y
        * @param {number} width - In tiles
        * @param {number} height - In tiles
        */
        public fillTiles(index: number, x: number = 0, y: number = 0, width: number = this.widthInTiles, height: number = this.heightInTiles) {

            this.getTempBlock(x, y, width, height); 

            for (var r = 0; r < this._tempTileBlock.length; r++) {
                this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this._parent.tiles[index]);
            }

        }

        /*
        * Swaps all of the tiles of indexA with tiles of indexB and the same alternatively.
        * 
        * @method swapTiles
        * @param {number} indexA
        * @param {number} indexB
        * @param {number} x
        * @param {number} y
        * @param {number} width
        * @param {number} height
        */
        public swapTiles(indexA: number, indexB: number, x: number = 0, y: number = 0, width: number= this.widthInTiles, height: number= this.heightInTiles) {

            this.getTempBlock(x, y, width, height);

            for (var r = 0; r < this._tempTileBlock.length; r++) {

                if (this._tempTileBlock[r].tile.tileType.index === indexA) {
                    this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this._parent.tiles[indexB]);

                } else if (this._tempTileBlock[r].tile.tileType.index === indexB) {
                    this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this._parent.tiles[indexA]);
                }

            }

        }

        /*
        * Replaces all of the tiles of indexA with the tiles of indexB.
        *
        * @method replaceTiles
        * @param {number} indexA
        * @param {number} indexB
        * @param {number} x
        * @param {number} y
        * @param {number} width
        * @param {number} height
        */ 
        public replaceTiles(indexA: number, indexB: number, x: number = 0, y: number = 0, width: number = this.widthInTiles, height: number= this.heightInTiles) {
            this.getTempBlock(x, y, width, height);

            for (var r = 0; r < this._tempTileBlock.length; r++) {

                if (this._tempTileBlock[r].tile.tileType.index === indexA) {
                    this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this._parent.tiles[indexB]);
                }

            }
        }

        /*
        * Gets a single tile from the x and y provided.
        * 
        * @method getTileFromWorldXY
        * @param {number} x
        * @param {number} y
        * @return {number}
        */
        public getTileFromWorldXY(x: number, y: number): Kiwi.GameObjects.Tile {

            x = Kiwi.Utils.GameMath.snapToFloor(x, this.tileWidth) / this.tileWidth;
            y = Kiwi.Utils.GameMath.snapToFloor(y, this.tileHeight) / this.tileHeight;

            return this.getTile(x, y);

        }

        /*
        * Gets all of the tiles by the index number you pass. 
        *
        * @method getTilesByIndex
        * @param {number} index
        * @returns {Array}
        */
        public getTilesByIndex(index: number) {
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

        /*
        * Creates a set of temporary tile blocks based on the current map data.
        * Perhaps add another param which is by a certain tile index?
        * 
        * @method getTempBlock
        * @param {number} x
        * @param {number} y
        * @param {number} width - In Tiles.
        * @param {number} height - In Tiles.
        * @param {bool} collisionOnly - Get only the tiles that can have collisions.
        */ 
        private getTempBlock(x: number, y: number, width: number, height: number, collisionOnly: bool = false) {

            if (x < 0) x = 0;
            if (y < 0) y = 0;

            if (x + width > this.widthInTiles) width = this.widthInTiles - x + 1;     
            if (y + height > this.heightInTiles) height = this.heightInTiles - y + 1; 

            this._tempTileBlock = [];

            for (var ty = y; ty < y + height; ty++) {
                for (var tx = x; tx < x + width; tx++) {
                    if (collisionOnly) {
                        //  We only want to consider the tile for checking if you can actually collide with it
                        if (this.mapData[ty] && this.mapData[ty][tx] && this.mapData[ty][tx].tileType.allowCollisions != Kiwi.Components.ArcadePhysics.NONE) {
                            this._tempTileBlock.push( this.mapData[ty][tx] );
                        }
                    } else {
                        if (this.mapData[ty] && this.mapData[ty][tx]) {
                            this._tempTileBlock.push(this.mapData[ty][tx] );
                        }
                    }
                }
            }

        }

        /*
        * Returns all of the tiles that overlap a given entity. 
        * Returns an array with each index containing the tiles
        *
        * @method getTileOverlaps
        * @param {Kiwi.Entity} object
        * @return {Array}
        */
        public getTileOverlaps(object: Kiwi.Entity) {
            
            //if the object is within the bounds at all.?
            if (!object.components.hasComponent("Size") || !object.components.hasComponent("Position")) {
                return;
            }

            var objPos = object.components.getComponent('Position');
            var objSize = object.components.getComponent('Size');

            if (objPos.x() > this.position.x() + this.widthInPixels || objPos.x() + objSize.width() < this.position.x() || objPos.y() > this.position.y() + this.heightInPixels || objPos.y() + objSize.height() < this.position.y()) {
                return;
            }

            //get the starting... quadtree hererere
            this._tempTileX = Kiwi.Utils.GameMath.snapToFloor(objPos.x() - this.position.x(), this.tileWidth) / this.tileWidth;
            this._tempTileY = Kiwi.Utils.GameMath.snapToFloor(objPos.y() - this.position.y(), this.tileHeight) / this.tileHeight;
            
            this._tempTileW = Kiwi.Utils.GameMath.snapToCeil(objSize.width(), this.tileWidth) / this.tileWidth;
            this._tempTileH = Kiwi.Utils.GameMath.snapToCeil(objSize.height(), this.tileHeight) / this.tileHeight;

            this.getTempBlock(this._tempTileX, this._tempTileY, this._tempTileW + 1, this._tempTileH + 1, true);
            
            return this._tempTileBlock;

        }

        /*
        * Gets a tile's index based on the indexs provided
        * 
        * @method getTileIndex
        * @param {number} x
        * @param {number} y
        * @return {number}
        */
        public getTileIndex(x: number, y: number): number {

            if (y >= 0 && y < this.mapData.length) {        //if it is with the bounds
                if (x >= 0 && x < this.mapData[y].length) {
                    return this.mapData[y][x].tileType.index;              //return
                }
            }

            return null;

        }

        /*
        * Gets a tile based on the given positions.
        * 
        * @method getTileIndex
        * @param {number} x
        * @param {number} y
        * @return {number}
        */
        public getTile(x: number, y: number): Kiwi.GameObjects.Tile {
            if (y >= 0 && y < this.mapData.length) {        //if it is with the bounds
                if (x >= 0 && x < this.mapData[y].length) {
                    return this.mapData[y][x];              //return
                }
            }

            return null;
        }

        /*
        * Adds a row of tiles to the tilemap
        *
        * @method addRow
        * @param {Array} row
        */
        public addRow(row:Array) {

            var data = [];
            
            for (var c = 0; c < row.length; c++) {
                data[c] = new Kiwi.GameObjects.Tile(this, row[c], this.tileWidth, this.tileHeight, c * this.tileWidth + this.position.x(), this.heightInPixels + this.position.y());
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

        /*
        * Updates the boundsInTiles rectangle.
        * 
        * @method updateBounds
        */
        public updateBounds() {

            this.boundsInTiles.setTo(0, 0, this.widthInTiles, this.heightInTiles);

        }

        /*
        * Loops through the texture that was given and assign's each sprite to the _tileOffset, with its coordinates.
        */
        public parseTileOffsets(): number {

            this._tileOffsets = [];

            var i = 0;

            if (this.mapFormat == TileMap.FORMAT_TILED_JSON) {
                //  For some reason Tiled counts from 1 not 0 - perhaps 0 means no tile but exists?
                this._tileOffsets[0] = null;
                i = 1;
            }

            for (var ty = this.tileMargin; ty < this._texture.height; ty += (this.tileHeight + this.tileSpacing)) {
                for (var tx = this.tileMargin; tx < this._texture.width; tx += (this.tileWidth + this.tileSpacing)) {
                    this._tileOffsets[i] = { x: tx, y: ty };
                    i++;
                }
              
            }

            return this._tileOffsets.length;

        }

        //callback when the position is updated - lags the game out...
        private _updatePosition() {
            for (var x = 0; x < this.mapData.length; x++) {
                for (var y = 0; y < this.mapData.length; y++) {
                    this.mapData[y][x].updatePos(this.position.x(), this.position.y());
                }
            }
        }

        public render( camera: Kiwi.Camera): bool {
            //if it is not there...
            if (this.visible.visible() === false || this.alpha.alpha() < 0.1 || this.exists === false) {
                return;
            }
            
            var ctx = this._parent.layer.canvas.context;
            
            if (this.alpha.alpha() > 0 && this.alpha.alpha() <= 1) {
                ctx.save();
                this.alpha.setContext(this._parent.layer.canvas);
            }

            //  Work out how many tiles we can fit into our camera and round it up for the edges
            this._maxX = Math.min(Math.ceil(camera.size.width() / this.tileWidth) + 1,this.widthInTiles);
            this._maxY = Math.min(Math.ceil(camera.size.height() / this.tileHeight) + 1,this.heightInTiles);
            
            //  And now work out where in the tilemap the camera actually is
            this._startX = Math.floor((camera.position.x() - this.position.x()) / this.tileWidth);
            this._startY = Math.floor((camera.position.y() - this.position.y()) / this.tileHeight);
            
            //boundaries check
            if (this._startX < 0) this._startX = 0;
            if (this._startY < 0) this._startY = 0;

            if (this._maxX > this.widthInTiles) this._maxX = this.widthInTiles;
            if (this._maxY > this.heightInTiles) this._maxY = this.heightInTiles;

            if (this._startX + this._maxX > this.widthInTiles) this._startX = this.widthInTiles - this._maxX;
            if (this._startY + this._maxY > this.heightInTiles) this._startY = this.heightInTiles - this._maxY;

            //stop the rendering of 'canvas' when parts of it are off screen. To Do.
            
            //use dx and tx

            for (var column = this._startY; column < this._startY + this._maxY; column++) {
                this._columnData = this.mapData[column]; //get the column data
                //careful here.
                for (var tile = this._startX; tile < this._startX + this._maxX; tile++) {
                    
                    if (this._tileOffsets[this._columnData[tile].tileType.index]) {        //if the tile exists
                        ctx.drawImage(
                            this._texture,	                                               //  Source Image
                            this._tileOffsets[this._columnData[tile].tileType.index].x,    //  Source X (location within the source image)
                            this._tileOffsets[this._columnData[tile].tileType.index].y,    //  Source Y
                            this.tileWidth, 	                                           //	Source Width
                            this.tileHeight, 	                                           //	Source Height
                            this._columnData[tile].position.x(), 	   //	Destination X (where on the canvas it'll be drawn)
                            this._columnData[tile].position.y(),	   //	Destination Y
                            this.tileWidth, 	                            //	Destination Width (always same as Source Width unless scaled)
                            this.tileHeight	                                //	Destination Height (always same as Source Height unless scaled)
                            );

                    }

                    //update the position here as well
                    this._columnData[tile].physics.update();
                }

                

            }

            if (this.alpha.alpha() > 0 && this.alpha.alpha() <= 1) {
                ctx.restore();
            }

            return true;

        }
    

    }
}
