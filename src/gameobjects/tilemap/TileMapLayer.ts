/**
* 
* @module GameObjects
* @submodule Tilemap
* 
*/

module Kiwi.GameObjects.Tilemap {


	/**
	* GameObject containing the core functionality for every type of tilemap layer that can be generated. 
    * This class should not be directly used. Classes extending this should be used instead.
	* 
	* @class TileMapLayer
	* @extends Kiwi.Entity
	* @namespace Kiwi.GameObjects.Tilemap
    * @since 1.3.0
	* @constructor
	* @param tilemap {Kiwi.GameObjects.Tilemap.TileMap} The TileMap that this layer belongs to.
	* @param name {String} The name of this TileMapLayer.
	* @param atlas {Kiwi.Textures.TextureAtlas} The texture atlas that should be used when rendering this TileMapLayer onscreen.
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

            if (Kiwi.Utils.Common.isString(atlas)) {
                atlas = this.state.textures[<any>atlas];
            }

			this.name = name;
			this.atlas = atlas;
			this.tilemap = tilemap;
			this._data = data;
			this.tileWidth = tw;
			this.tileHeight = th;
			this.width = w;
			this.height = h;

			this._corner1 = new Kiwi.Geom.Point(0,0);
			this._corner2 = new Kiwi.Geom.Point(0,0);
			this._corner3 = new Kiwi.Geom.Point(0,0);
			this._corner4 = new Kiwi.Geom.Point(0,0);

            this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, null));
            this.physics.immovable = true;
        }

		/**
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
		* @return {String} "TileMapLayer"
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
		* @type Kiwi.Textures.TextureAtlas
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
		* Override function to prevent unwanted inherited behaviour. Do not call.
		* Because TileMapLayer extends Entity, it has a cellIndex parameter. 
        * However, it does not use a single atlas index, so this parameter is meaningless. It has deliberately been set to do nothing.
		*
        * @property cellIndex
		* @type number
		* @public
		* @deprecated Not functional on this object.
		* @since 1.1.0
		*/
		public get cellIndex():number {
			return null;
		}
        public set cellIndex(val: number) { }

        /**
        * Scales the tilemap to the value passed.
        * @method scaleToWidth 
        * @param value {Number}
        * @public
        */
		public scaleToWidth(value: number) {
			this.scale = value / this.widthInPixels;
        }

        /**
        * Scales the tilemaps to the value passed.
        * @method scaleToHeight
        * @param value {Number}
        * @public
        */
		public scaleToHeight(value: number) {
			this.scale = value / this.heightInPixels;
        }

        /**
        * Centers the anchor point to the middle of the width/height of the tilemap.
        * @method centerAnchorPoint
        * @public
        */
		public centerAnchorPoint() {
			this.anchorPointX = this.widthInPixels * 0.5;
			this.anchorPointY = this.heightInPixels * 0.5;
		}

		/**
		* A list containing all the types of tiles found on this TileMapLayer.
		* @property _data
		* @type Array
		* @protected
		*/
        protected _data: number[];

        /**
        * READ ONLY: Returns the raw data for this tilemap.
        * @property data
        * @type Array
        * @readOnly
        * @public
        * @since 1.3.0
        */      
        public get data(): number[] {
            return this._data;
        }


		/**
		* READ ONLY: A list containing all of the types of tiles found on this TileMapLayer. 
        * Same as the `data` property.
        *
		* @property tileData
		* @type Array
        * @readOnly
		* @public
		*/
        public get tileData(): number[] {
            return this._data;
        }

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
		* @public
		*/
		public orientation: string = null;


		/**
		*-----------------------
		* Getting Tiles
		*-----------------------
		*/


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
		* @return {Kiwi.GameObjects.Tilemap.TileType}
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
        public getIndexesByType(type: number): number[] {
            var tiles = [];
            for (var i = 0; i < this._data.length; i++) {
                if (this._data[i] == type) tiles.push(i);
            }
            return tiles;
        }

        /**
        * Returns the TileType of a tile by an index passed.
        * Thanks to @rydairegames 
        * 
        * @method getTileFromIndex
        * @param index {Number}
        * @return {Kiwi.GameObjects.Tilemap.TileType} 
        * @public
        */
        public getTileFromIndex(index: number): TileType {
            return (index !== -1) ? this.tilemap.tileTypes[this._data[index]] : null;
        }

		/**
		* Returns the index of the tile based on the x and y pixel coordinates that are passed. 
		* If no tile is a the coordinates given then -1 is returned instead.
		* Coordinates are in pixels not tiles and use the world coordinates of the tilemap.
        *
        * Functionality needs to be added by classes extending this class.
		*
		* @method getIndexFromCoords
		* @param x {Number} The x coordinate of the Tile you would like to retrieve. 
		* @param y {Number} The y coordinate of the Tile you would like to retrieve.
		* @return {Number} Either the index of the tile retrieved or -1 if none was found.
		* @public
		*/
        public getIndexFromCoords(x: number, y: number): number {
            return -1;
        }
        
		/**
		* Returns the TileType for a tile that is at a particular coordinate passed. 
		* If no tile is found then null is returned instead.
		* Coordinates passed are in pixels and use the world coordinates of the tilemap.
        * 
		* @method getTileFromCoords
		* @param x {Number}
		* @param y {Number}
		* @return {Kiwi.GameObjects.Tilemap.TileType} 
		* @public
		*/
        public getTileFromCoords(x: number, y: number): TileType {

            var t = this.getIndexFromCoords(x, y);
            return (t !== -1) ? this.tilemap.tileTypes[this.data[t]] : null;

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
		* @param x {Number} The coordinate of the tile on the x axis. 
		* @param y {Number} The coordinate of the tile on the y axis.
		* @param tileType {Number} The type of tile that should be now used.
		* @return {Boolean} If a tile was changed or not.
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
		* @param index {Number} The index of the tile that you want to change.
		* @param tileType {Number} The new tile type to be used at that position.
		* @public
		*/
		public setTileByIndex(index: number, tileType: number) {
			this._data[index] = tileType;
		}

		/**
		* Randomizes the types of tiles used in an area of the layer. You can choose which types of tiles to use, and the area.
		* Default tile types used are everyone avaiable. 
		* @method randomizeTiles
		* @param [types] {Number[]} A list of TileTypes that can be used. Default is every tiletype on the TileMap.
		* @param [x=0] {Number} The starting tile on the x axis to fill. 
		* @param [y=0] {Number} The starting tile on the y axis to fill.
		* @param [width=this.width] {Number} How far across you want to go.
		* @param [height=this.height] {Number} How far down you want to go.
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
		* @param type {Number} The type of tile you want to fill in the area with.
		* @param [x=0] {Number} The starting tile on the x axis to fill. 
		* @param [y=0] {Number} The starting tile on the y axis to fill.
		* @param [width=this.width] {Number} How far across you want to go.
		* @param [height=this.height] {Number} How far down you want to go.
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
		* @param typeA {Number} The type of tile you want to be replaced.
		* @param typeB {Number} The type of tile you want to be used instead.
		* @param [x=0] {Number} The starting tile on the x axis to fill. 
		* @param [y=0] {Number} The starting tile on the y axis to fill.
		* @param [width=this.width] {Number} How far across you want to go.
		* @param [height=this.height] {Number} How far down you want to go.
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
		* Note: Classes extending this class need to 
		* 
		* @method getOverlappingTiles
		* @param entity {Kiwi.Entity} The entity you would like to check for the overlap.
		* @param [collisionType=ANY] {Number} The particular type of collidable tiles which you would like to check for.
		* @return {Object[]} Returns an Array of Objects containing information about the tiles which were found. Index/X/Y information is contained within each Object. 
		* @public
		*/
		public getOverlappingTiles(entity: Kiwi.Entity, collisionType: number= Kiwi.Components.ArcadePhysics.ANY): any {
			return [];
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
		* @protected
		*/
        protected _maxX: number;

		/**
		* Used whilst rendering to calculate the number of tiles to be rendered on the Y axis.
		* Is updated each frame, via the _calculateBoundaries method.
		* @property _maxY
		* @type number
		* @protected
		*/
        protected _maxY: number;

		/**
		* Used whilst rendering to calculate which is the first tile to be rendered on the X axis.
		* Is updated each frame, via the _calculateBoundaries method.
		* @property _startX
		* @type number
		* @protected
		*/
        protected _startX: number;

		/**
		* Used whilst rendering to calculate which is the first tile to be rendered on the Y axis.
		* Is updated each frame, via the _calculateBoundaries method.
		* @property _startY
		* @type number
		* @protected
		*/
        protected _startY: number;

		/**
		* Temporary property that holds the tileType of the current tile being rendered.
		* @property _temptype
		* @type TileType
		* @protected
		*/
        protected _temptype: TileType;

		/**
		* Corner values used internally.
		* @property corner1
		* @type {Kiwi.Geom.Point}
		* @protected
		* @since 1.1.0
		*/
        protected _corner1: Kiwi.Geom.Point;
		/**
		* Corner values used internally.
		* @property corner2
		* @type {Kiwi.Geom.Point}
		* @protected
		* @since 1.1.0
		*/
        protected _corner2: Kiwi.Geom.Point;

		/**
		* Corner values used internally.
		* @property corner3
		* @type {Kiwi.Geom.Point}
		* @protected
		* @since 1.1.0
		*/
        protected _corner3: Kiwi.Geom.Point;

		/**
		* Corner values used internally.
		* @property corner4
		* @type {Kiwi.Geom.Point}
		* @protected
		* @since 1.1.0
		*/
        protected _corner4: Kiwi.Geom.Point;

		/**
		* Used to calculate the position of the tilemap on the stage as well as how many tiles can fit on the screen. 
		* All coordinates calculated are stored as temporary properties (maxX/Y, startX/Y).
		*
		* @method _calculateBoundaries
		* @param camera {Camera}
		* @param matrix {Matrix} 
		* @protected
		*/
		protected _calculateBoundaries(camera: Kiwi.Camera, matrix: Kiwi.Geom.Matrix) {

			this._startX = 0;
			this._startY = 0;
			this._maxX = this.width;
			this._maxY = this.height;

		}

		/** 
		* The render loop which is used when using the Canvas renderer.
		* @method render
		* @param camera {Camera}
		* @public
		*/
		public render(camera: Kiwi.Camera) {

		}

		public renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params: any = null) {

        }


		/** 
        * Deprecated on the TileMapLayer class since it is for 'Isometric' maps only.
		*
		* @method chartToScreen
		* @param chartPt {any} A Object containing x/y properties of the tile.
		* @param [tileW] {Number} The width of the tile
		* @param [tileH] {Number} The height of the tile
		* @return {Object} With x/y properties of the location of the map onscreen.
        * @deprecated
        * @since 1.3.0
		* @public
		*/
        public chartToScreen(chartPt: any, tileW: number = this.tileWidth / 2, tileH: number = this.tileHeight): any {
            return {
                x: chartPt.x * tileW - chartPt.y * tileW,
                y: chartPt.x * tileH / 2 + chartPt.y * tileH / 2
            };
        }

		/**
        * Deprecated on the TileMapLayer class since it is for 'Isometric' maps only.
		*
		* @method screenToChart
		* @param scrPt {any} An object containing x/y coordinates of the point on the screen you want to convert to tile coordinates.
		* @param [tileW] {Number} The width of a single tile.
		* @param [tileH] {Number} The height of a single tile.
		* @return {Object} With x/y properties of the location of tile on the screen.
        * @deprecated
        * @since 1.3.0
		* @public
		*/
        public screenToChart(scrPt: any, tileW: number = this.tileWidth / 2, tileH: number = this.tileHeight): any {
            var column = Math.floor(scrPt.x / tileW);
            var row = Math.floor((scrPt.y - column * (tileH / 2)) / tileH);
            return { x: column + row, y: row };
        } 


	}
}
