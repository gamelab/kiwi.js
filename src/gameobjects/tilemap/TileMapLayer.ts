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

            //Request the Shared Texture Atlas renderer.
            if (this.game.renderOption === Kiwi.RENDERER_WEBGL) {
                this.glRenderer = this.game.renderer.requestSharedRenderer("TextureAtlasRenderer");
            }

            this.name = name;
            this.atlas = atlas;
            this.tilemap = tilemap;
            this._data = data;
            this.tileWidth = tw;
            this.tileHeight = th;
            this.width = w;
            this.height = h;
            this.cellIndex = null; //Cell Index doesn't matter for a TileMapLayer itself.

            this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, null));
            this.physics.immovable = true;
        }

        /*
        * The physics component contained on the Tilemap. Use for basic collisions between People and Tiles.
        * Note: That tilemap layers a immovable and collisions with tiles are set on the individual TileTypes that are contained on the TileMap. 
        * @property physics
        * @type ArcadePhysics
        * @public
        */
        public physics: Kiwi.Components.ArcadePhysics;

        /**
        * Returns the type of child that this is. 
        * @type Number
        * @return {Number} returns the type of child that the entity is
        * @public
        */
        public childType(): number {
            return Kiwi.TILE_LAYER;
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
        * The orientation of the of tilemap. 
        * TileMaps can be either 'orthogonal' (normal) or 'isometric'.
        * @property orientation
        * @type String
        * @default 'orthogonal'
        * @public
        */
        public orientation: string = ORTHOGONAL;


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
        * Returns the TileType for a tile that is at a particular set of coordinates passed. 
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
        * Returns the index of the tile based on the x and y pixel coordinates that are passed. 
        * If no tile is a the coordinates given then -1 is returned instead.
        * Coordinates are in pixels not tiles and use the world coordinates of the tilemap.
        * Note: Currently only working for ORTHOGONAL TileMaps.
        *
        * @method getIndexFromCoords
        * @param x {Number} The x coordinate of the Tile you would like to retrieve. 
        * @param y {Number} The y coordinate of the Tile you would like to retrieve.
        * @return {Number} Either the index of the tile retrieved or -1 if none was found.
        * @public
        */
        public getIndexFromCoords(x: number, y: number): number {

            //Not with the bounds?
            if (x > this.transform.worldX + this.widthInPixels || y > this.transform.worldY + this.heightInPixels || x < this.transform.worldX || y < this.transform.worldY)
                return -1;

            //Is so get the tile
            var tx = Kiwi.Utils.GameMath.snapToFloor(x - this.transform.worldX, this.tileWidth) / this.tileWidth;
            var ty = Kiwi.Utils.GameMath.snapToFloor(y - this.transform.worldY, this.tileHeight) / this.tileHeight;

            return this.getIndexFromXY(tx, ty);

        }
        
        /**
        * Returns the TileType for a tile that is at a particular coordinate passed. 
        * If no tile is found the null is returned instead.
        * Coordinates passed are in pixels and use the world coordinates of the tilemap.
        * Note: Currently only working for ORTHOGONAL TileMaps.
        * 
        * @method getTileFromCoords
        * @param x {Number}
        * @param y {Number}
        * @return {Number} The tile
        * @public
        */
        public getTileFromCoords(x: number, y: number): TileType {
            var t = this.getIndexFromCoords(x, y);
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
                    if (tile !== -1) this._data[tile ] = type;

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
        *-----------------------
        * Get Tiles By Collision Methods
        *-----------------------
        */

        /**
        * Returns the tiles which overlap with a provided entities hitbox component. 
        * Only collidable tiles on ANY side will be returned unless you pass a particular side.
        * Note: Only designed to work with ORTHOGONAL types of tilemaps, results maybe unexpected for other types of tilemaps.
        * 
        * @method getOverlappingTiles
        * @param entity {Entity} The entity you would like to check for the overlap.
        * @param [collisionType=ANY] {Number} The particular type of collidable tiles which you would like to check for.
        * @return {Object[]} Returns an Array of Objects containing information about the tiles which were found. Index/X/Y information is contained within each Object. 
        * @public
        */
        public getOverlappingTiles(entity: Kiwi.Entity, collisionType: number= Kiwi.Components.ArcadePhysics.ANY): any {

            //Do they have a box?
            if (entity.components.hasComponent("Box") == false)
                return [];

            //Get the box off them
            var b: Kiwi.Geom.Rectangle = entity.components.getComponent('Box').worldHitbox;

            //Is the person within the map's bounds?    
            if (b.left > this.transform.worldX + this.widthInPixels || b.right < this.transform.worldX || b.bottom < this.transform.worldY || b.top > this.transform.worldY + this.heightInPixels)
                return [];

            var nx = b.x - this.transform.worldX;
            var ny = b.y - this.transform.worldY;

            //Get starting location and now many tiles from there we will check. 
            var x = Kiwi.Utils.GameMath.snapToFloor(nx, this.tileWidth) / this.tileWidth;
            var y = Kiwi.Utils.GameMath.snapToFloor(ny, this.tileHeight) / this.tileHeight;
            var w = Kiwi.Utils.GameMath.snapToCeil(b.width, this.tileWidth) / this.tileWidth;
            var h = Kiwi.Utils.GameMath.snapToCeil(b.height, this.tileHeight) / this.tileHeight;

            //Add one, because we want to include the very end tile.
            var tiles = this.getCollidableTiles(x, y, w + 1, h + 1, collisionType);

            //Loop through the tiles and make sure they are actually overlapping with the Entity.
            for (var i = 0; i < tiles.length; i++) {
                var t = tiles[i];

                if (t.x > b.right || t.x + this.tileWidth < b.left || t.y > b.bottom || t.y + this.tileHeight < t.top) {
                    tiles.splice(i, 1);
                    i--;
                } 
            }

            return tiles;

        }


        /**
        * Returns the tiles which can collide with other objects (on ANY side unless otherwise specified) within an area provided.
        * By default the area is the whole tilemap.
        * 
        * @method getCollidableTiles
        * @param [x=0] {Number} The x coordinate of the first tile to check.
        * @param [y=0] {Number} The y coordinate of the first tile to check.
        * @param [width=widthOfMap] {Number} The width from the x coordinate.
        * @param [height=heightOfmap] {Number} The height from the y coordinate.
        * @param [collisionType=ANY] {Number} The type of collidable tiles that should be return. By default ANY type of collidable tiles will be returned. 
        * @return {Object[]} Returns an Array of Objects containing information about the tiles which were found. Index/X/Y information is contained within each Object. 
        * @public
        */
        public getCollidableTiles(x: number= 0, y: number= 0, width: number= this.width, height: number = this.height, collisionType: number= Kiwi.Components.ArcadePhysics.ANY): any {

            var tiles = [];

            //Make sure its within the map.
            if (x > this.width || y > this.height) return; 

            if (x < 0) x = 0;
            if (y < 0) y = 0;

            if (x + width > this.width) width = this.width - x;
            if (y + height > this.height) height = this.height - y;

            //Loop through and of the tiles.
            for (var j = y; j < y + height; j++) {
                for (var i = x; i < x + width; i++) {

                    //Get the tile index.
                    var index = this.getIndexFromXY(i, j);

                    //Does that index exist? Should do but just in case.
                    if (index === -1) continue;

                    var type = this.tileData[index];

                    //If the collision type matches the one passed. 
                    if ((this.tilemap.tileTypes[type].allowCollisions & collisionType) !== Kiwi.Components.ArcadePhysics.NONE) {

                        tiles.push({
                            index: index,
                            type: type,
                            x: i * this.tileWidth,
                            y: j * this.tileHeight
                        });


                    }

                }
            }

            return tiles;
        }


        /**
        * The update loop that is executed when this TileMapLayer is add to the Stage.
        * @method update
        * @public 
        */
        public update() {
            super.update();

            this.physics.update();
        }
        
        /**
        *-----------------------
        * Temp Properties used During Rendering
        *-----------------------
        */

        /**
        * Used whilst rendering to calculate the number of tiles to be rendered on the X axis.
        * Is updated each frame, via the _calculateBoundaries method.
        * @property _maxX
        * @type number
        * @private
        */
        private _maxX: number;
        
        /**
        * Used whilst rendering to calculate the number of tiles to be rendered on the Y axis.
        * Is updated each frame, via the _calculateBoundaries method.
        * @property _maxY
        * @type number
        * @private
        */
        private _maxY: number;

        /**
        * Used whilst rendering to calculate which is the first tile to be rendered on the X axis.
        * Is updated each frame, via the _calculateBoundaries method.
        * @property _startX
        * @type number
        * @private
        */
        private _startX: number;

        /**
        * Used whilst rendering to calculate which is the first tile to be rendered on the Y axis.
        * Is updated each frame, via the _calculateBoundaries method.
        * @property _startY
        * @type number
        * @private
        */
        private _startY: number;

        /**
        * Temporary property that holds the tileType of the current tile being rendered.
        * @property _temptype
        * @type TileType
        * @private
        */
        private _temptype: TileType;

        /**
        * Used to calculate the position of the tilemap on the stage as well as how many tiles can fit on the screen. 
        * All coordinates calculated are stored as temporary properties (maxX/Y, startX/Y).
        *
        * @method _calculateBoundaries
        * @param camera {Camera}
        * @param matrix {Matrix} 
        * @private
        */
        private _calculateBoundaries(camera: Kiwi.Camera, matrix: Kiwi.Geom.Matrix) {

            //If we are calculating the coordinates for 'regular' then we can do that rather easy
            if (this.orientation == ORTHOGONAL) {
                // Translation Stuff
                var sx = 1 / this.scaleX;
                var sy = 1 / this.scaleY;

                // Work out how many tiles we can fit into our camera and round it up for the edges
                this._maxX = Math.min(Math.ceil(camera.width / this.tileWidth) + 1, this.width) * sx;
                this._maxY = Math.min(Math.ceil(camera.height / this.tileHeight) + 1, this.height) * sy;

                // And now work out where in the tilemap the camera actually is
                this._startX = Math.floor((-camera.transform.x - this.transform.worldX) / this.tileWidth * sx);
                this._startY = Math.floor((-camera.transform.y - this.transform.worldY) / this.tileHeight * sy);

                // Boundaries check for the start 
                if (this._startX < 0) this._startX = 0;
                if (this._startY < 0) this._startY = 0;

                // Check for the Maximum
                if (this._maxX > this.width) this._maxX = this.width;
                if (this._maxY > this.height) this._maxY = this.height;

                // Width/Height
                if (this._startX + this._maxX > this.width) this._maxX = this.width - this._startX;
                if (this._startY + this._maxY > this.height) this._maxY = this.height - this._startY;

                return;
            } 

            //Otherwise we can't *just yet* so render the whole lot
            if (this.orientation == ISOMETRIC) {
                this._startX = 0;
                this._startY = 0;
                this._maxX = this.width;
                this._maxY = this.height;
            }
        }

        /** 
        * ChartToScreen maps a point in the game tile coordinates into screen pixel
        * coordinates that indicate where the tile should be drawn.
        * Note: This is for use in ISOMETRIC Tilemaps.
        *
        * @method chartToScreen
        * @param chartPt {any} A Object containing x/y properties of the tile.
        * @param tileW {Number} The width of the tile
        * @param tileH {Number} The height of the tile
        * @return {Object} With x/y properties of the location of the map onscreen.
        * @public
        */ 
        public chartToScreen(chartPt:any, tileW:number, tileH:number):any {
            return { x:chartPt.x * tileW - chartPt.y * tileW, 
                y:chartPt.x * tileH / 2 + chartPt.y * tileH / 2 };
        }

        /**
        * ScreenToChart maps a point in screen coordinates into the game tile chart
        * coordinates for the tile on which the screen point falls on.
        * This is for use in ISOMETRIC Tilemaps.
        *
        * @method screenToChart
        * @param scrPt {any} An object containing x/y coordinates of the point on the screen you want to convert to tile coordinates.
        * @param tileW {number} The width of a single tile.
        * @param tileH {number} The height of a single tile.
        * @return {Object} With x/y properties of the location of tile on the screen.
        * @public
        */
        public screenToChart(scrPt:any, tileW:number, tileH:number):any {
            var column = Math.floor(scrPt.x / tileW);
            var row = Math.floor((scrPt.y - column * (tileH / 2)) / tileH);
            return { x:column + row, y:row };
        }
        
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

            this._calculateBoundaries(camera, m);
            
            for (var y = this._startY; y < this._startY + this._maxY; y++) {
                for (var x = this._startX; x < this._startX + this._maxX; x++) {

                    if ( (this._temptype = this.getTileFromXY(x, y)) && this._temptype.cellIndex !== -1 ) {

                        var cell = this.atlas.cells[this._temptype.cellIndex];
                        
                        var drawX:number;
                        var drawY:number;
                        
                        if (this.orientation == ISOMETRIC) {

                            // Isometric maps
                            
                            var offsetX = this._temptype.offset.x;
                            var offsetY = this._temptype.offset.y;
                            var w = this.tileWidth * (this.width * 2 - 1 );
                            var h = this.tileHeight * this.height;

                            // We want <0,0>'s horizontal center point to be in the screen center, hence the -tileWidth/2.
                            var shiftX = this.tileWidth / 2;

                            var screenPos = this.chartToScreen( 
                                { x:x , y:y }, 
                                this.tileWidth/2, 
                                this.tileHeight);

                            drawX = screenPos.x + this._temptype.offset.x - shiftX;
                            drawY = screenPos.y - (cell.h - this.tileHeight) + this._temptype.offset.y;

                        } else {
                            
                            // 'Normal' maps

                            drawX = x * this.tileWidth + this._temptype.offset.x;
                            drawY = y * this.tileHeight - (cell.h - this.tileHeight) + this._temptype.offset.y;

                        }
                        
                        ctx.drawImage(
                            this.atlas.image,
                            cell.x,
                            cell.y,
                            cell.w,
                            cell.h,
                            drawX,
                            drawY,
                            cell.w,
                            cell.h
                            );

                    }


                }
            }


            ctx.restore();
            return true;
        }

        public renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params: any = null) {

            //Setup
            var vertexItems = [];
            
            //Create the point objects.
            var pt1 = new Kiwi.Geom.Point();
            var pt2 = new Kiwi.Geom.Point();
            var pt3 = new Kiwi.Geom.Point();
            var pt4 = new Kiwi.Geom.Point();

            //Transform/Matrix
            var t: Kiwi.Geom.Transform = this.transform;
            var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix(); 


            //Find which ones we need to render. Needs to be updated for Rotation.
            this._calculateBoundaries(camera, m);

            //Loop through the tiles.
            for (var y = this._startY; y < this._startY + this._maxY; y++) {
                for (var x = this._startX; x < this._startX + this._maxX; x++) {
                    

                    //Get the tile type
                    this._temptype = this.getTileFromXY(x, y);


                    //Skip tiletypes that don't use a cellIndex.
                    if (this._temptype.cellIndex == -1) continue;

                    
                    //Get the cell index
                    var cell = this.atlas.cells[this._temptype.cellIndex];
                    
                    var tx;
                    var ty;

                    if (this.orientation == ISOMETRIC) {

                        // Isometric maps
                        var offsetX = this._temptype.offset.x;
                        var offsetY = this._temptype.offset.y;
                        var w = this.tileWidth * (this.width * 2 - 1);
                        var h = this.tileHeight * this.height;
                        
                        // We want <0,0>'s horizontal center point to be in the screen center, hence the -tileWidth/2.
                        var shiftX = this.tileWidth / 2;

                        var screenPos = this.chartToScreen( 
                            { x:x , y:y }, 
                            this.tileWidth / 2, 
                            this.tileHeight);

                        tx = screenPos.x + this._temptype.offset.x - shiftX;
                        ty = screenPos.y + this._temptype.offset.y;

                    } else {

                        // 'normal' maps
                        tx = x * this.tileWidth + this._temptype.offset.x;
                        ty = y * this.tileHeight + this._temptype.offset.y;

                    }

                    //Set up the points
                    pt1.setTo(tx - t.rotPointX, ty - t.rotPointY - (cell.h - this.tileHeight));
                    pt2.setTo(tx + cell.w - t.rotPointX, ty - t.rotPointY - (cell.h - this.tileHeight));
                    pt3.setTo(tx + cell.w - t.rotPointX, ty + cell.h - t.rotPointY - (cell.h - this.tileHeight));
                    pt4.setTo(tx - t.rotPointX, ty + cell.h - t.rotPointY - (cell.h - this.tileHeight));


                    //Add on the matrix to the points
                    pt1 = m.transformPoint(pt1);
                    pt2 = m.transformPoint(pt2);
                    pt3 = m.transformPoint(pt3);
                    pt4 = m.transformPoint(pt4);


                    //Append to the xyuv array
                    vertexItems.push(
                        pt1.x + t.rotPointX, pt1.y + t.rotPointY, cell.x, cell.y, this.alpha,                   //Top Left Point
                        pt2.x + t.rotPointX, pt2.y + t.rotPointY, cell.x + cell.w, cell.y, this.alpha,          //Top Right Point
                        pt3.x + t.rotPointX, pt3.y + t.rotPointY, cell.x + cell.w, cell.y + cell.h, this.alpha, //Bottom Right Point
                        pt4.x + t.rotPointX, pt4.y + t.rotPointY, cell.x, cell.y + cell.h, this.alpha           //Bottom Left Point
                        );
                    

                    
                }
            }
               
            //Concat points to the Renderer.
            (<Kiwi.Renderers.TextureAtlasRenderer>this.glRenderer).concatBatch(vertexItems);
        }

    }
}
