/**
* 
* @module GameObjects
* @submodule Tilemap
* @main Tilemap
*/

module Kiwi.GameObjects.Tilemap { 

	/**
	* A TileMap handles the creation of TileMapLayers and the TileTypes that they use.
	* Since a TileMap isn't a Entity itself you cannot add it to the Stage inorder to render that it manages, 
	* Instead you have to add each layer lies within it. This way you can have other GameObjects behind/in-front of layers.
	* 
	* @class TileMap
	* @namespace Kiwi.GameObjects.Tilemap
	* @constructor 
	* @param state {Kiwi.State} The state that this Tilemap is on.
	* @param [tileMapDataKey] {String} The Data key for the JSON you would like to use.
	* @param [atlas] {Kiwi.Textures.TextureAtlas} The texture atlas that you would like the tilemap layers to use.
	* @param [startingCell=0] {number} The number for the initial cell that the first TileType should use. See 'createFromFileStore' for more information.
	* @param [substitution=false] {boolean} Whether to create a buffered substitution for these tiles, to accelerate rendering on some devices.
	* @return {TileMap}
	*/
	export class TileMap {

		constructor(
			state: Kiwi.State,
			tileMapData?: any,
			atlas?: Kiwi.Textures.TextureAtlas,
			startingCell: number = 0,
			substitution: boolean = false ) {

			this.tileTypes = [];
			this.createTileType(-1);
			this.layers = [];

			this.state = state;
			this.game = state.game;

			if (tileMapData !== undefined && atlas !== undefined) {
				this.createFromFileStore(
					tileMapData, atlas, startingCell, substitution);
			} else if (tileMapData !== undefined || atlas !== undefined) {
				Kiwi.Log.warn('You must pass BOTH the TileMapDataKey and TextureAtlas inorder to create a TileMap from the File Store.', '#tilemap');
			}

		}

		/**
		* The orientation of the tilemap. 
		* Note: This value does not affect the individual layers. 
		* 
		* @property orientation
		* @type String
		* @public
		*/
		public orientation: string;

		/**
		* Is an Array containing all of the TileTypes that are available on the TileMap.
		* @property tileTypes
		* @type TileType[]
		* @public
		*/
		public tileTypes: TileType[];

		/**
		* A list of all of the TileMapLayers that exist on the TileMap.
		* @property layers
		* @type TileMapLayerBase
		* @public
		*/
        public layers: TileMapLayer[];

		/**
		* The state that this TileMap exists on.
		* @property state
		* @type Kiwi.State
		* @public
		*/
		public state: Kiwi.State;

		/**
		* The game that this TileMap is a part of.
		* @property game
		* @type Kiwi.Game
		* @public
		*/
		public game: Kiwi.Game;

		/**
		* The default width of a single tile that a TileMapLayer is told to have upon its creation. 
		* @property tileWidth
		* @type Number
		* @default 0
		* @public
		*/
		public tileWidth: number = 0;

		/**
		* The default height of a single tile that a TileMapLayer is told to have upon its creation.
		* @property tileHeight
		* @type Number
		* @default 0
		* @public
		*/
		public tileHeight: number = 0;

		/**
		* The default width of all TileMapLayers when they are created. 
		* This value is in Tiles.
		* @property width
		* @type Number
		* @default 0
		* @public
		*/
		public width: number = 0;

		/**
		* The default height of all TileMapLayers when they are created. 
		* This value is in Tiles.
		* @property height
		* @type Number
		* @default 0
		* @public
		*/
		public height: number = 0;

		/**
		* The width of the tilemap in pixels. This value is READ ONLY.
		* @property widthInPixels
		* @type Number
		* @public
		*/
		public get widthInPixels(): number {
			return this.width * this.tileWidth;
		}

		/**
		* The height of the tilemap in pixels. This value is READ ONLY.
		* @property heightInPixels
		* @type Number
		* @public
		*/
		public get heightInPixels(): number {
			return this.height * this.tileHeight;
		}

		/**
		* Any properties that were found in the JSON during creation.
		* @property properties
		* @type Object
		* @public
		*/
		public properties: any = {};

		/** 
		* Creates new tilemap layers from a JSON file that you pass (has to be in the Tiled Format).
		* The texture atlas you pass is that one that each TileMapLayer found in the JSON will use, You can change the TextureAtlas afterwards.
		* New TileTypes will automatically be created. The number is based on the Tileset parameter of the JSON. 
		* The cell used for new TileTypes will begin at 0 and increment each time a new TileType is created (and a cell exists). Otherwise new TileTypes will start will a cell of -1 (none).
		* @method createFromFileStore
		* @param tileMapData {Any} This can either 
		* @param atlas {Kiwi.Textures.TextureAtlas} The texture atlas that you would like the tilemap layers to use.
		* @param [startingCell=0] {number} The number for the initial cell that the first TileType should use. If you pass -1 then no new TileTypes will be created.
		* @public
		*/
		public createFromFileStore(
			tileMapData: any,
			atlas: Kiwi.Textures.TextureAtlas,
			startingCell:number = 0,
			substitution: boolean = false ) {

            var json = null;

            if (Kiwi.Utils.Common.isString(atlas)) {
                atlas = this.state.textures[<any>atlas];
            }

			//Does the JSON exist?
			switch (typeof tileMapData) {
				case 'string':
					if (this.game.fileStore.exists(tileMapData) == false) {
						Kiwi.Log.error('The JSON file you have told to use for a TileMap does not exist.', '#tilemap', '#json');
						return false;
					}   

					json = JSON.parse( this.game.fileStore.getFile(tileMapData).data );
					break;

                case 'object':
                    
                    //Is it a KiwiJS file?
                    if (tileMapData.isData && tileMapData.dataType === Kiwi.Files.File.JSON) {

                        if ( Kiwi.Utils.Common.isString(tileMapData.parse) ) {
                            json = JSON.parse(tileMapData.data);
                        } else {
                            json = tileMapData.data;
                        }

                    } else {
                        json = tileMapData;
                    }

					break;

				default:
					Kiwi.Log.error('The type of TileMapData passed could not be idenified. Please either pass a name of JSON file to use OR an object to be used.', '#tilemap');
			}

			//Get the map information
			this.orientation = (json.orientation == undefined) ? ORTHOGONAL : json.orientation;
			this.tileWidth = (json.tilewidth == undefined) ? 32 : json.tilewidth;
			this.tileHeight = (json.tileheight == undefined) ? 32 : json.tileheight;
			this.width = json.width;
			this.height = json.height;


			//Add the properties
			for (var prop in json.properties) {
				this.properties[prop] = json.properties[prop];
			}


			//Generate the Tiles needed.
			if (json.tilesets !== "undefined" && startingCell !== -1) 
				this._generateTypesFromTileset(json.tilesets, atlas, startingCell);

			//Generate the layers we need
			for (var i = 0; i < json.layers.length; i++) {
				var layerData = json.layers[i];

				//Check what type it is.
				switch (json.layers[i].type) {
					case "tilelayer":
						var w = (layerData.width !== undefined) ? layerData.width : this.width;
						var h = (layerData.height !== undefined) ? layerData.height : this.height;

						var layer = this.createNewLayer(layerData.name, atlas, layerData.data, w, h, layerData.x * this.tileWidth, layerData.y * this.tileHeight );
						
						//Add the extra data...
						layer.visible = (layerData.visible == undefined) ? true : layerData.visible;
						layer.alpha = (layerData.opacity == undefined) ? 1 : layerData.opacity;
						if (layerData.properties !== undefined)layer.properties = layerData.properties;

						// Substitution
						if ( substitution ) {
							this.createSubstitute( layer );
						}

						break;

					case "objectgroup":
						this.createNewObjectLayer();
						break;

					case "imagelayer":
						this.createNewImageLayer();
						break;
				}


			}

		}

		/**
		* Generates new TileTypes based upon the Tileset information that lies inside the Tiled JSON.
		* This is an INTERNAL method, which is used when the createFromFileStore method is executed.
		* @method _generateTypesFromTileset
		* @param tilesetData {Array} The tileset part of the JSON.
		* @param atlas {Kiwi.Textures.TextureAtlas} The Texture atlas which contains the cells that the new TileTypes will use.
		* @param startingCell {Number} The first cell number that would be used.
		* @private
		*/
		private _generateTypesFromTileset( tilesetData:any[], atlas:Kiwi.Textures.TextureAtlas, startingCell:number ) {

			//Loop through the tilesets
			for (var i = 0; i < tilesetData.length; i++) {

				var tileset = tilesetData[i];

				//Tileset Information
				var m = tileset.margin;
				var s = tileset.spacing; 
				var tw = tileset.tilewidth;
				var th = tileset.tileheight;
				var iw = tileset.imagewidth - m;
				var ih = tileset.imageheight - m;

				//Drawing offsets
				var offset = (tileset.tileoffset == undefined) ? { x: 0, y: 0 } : tileset.tileoffset;

				//Calculate how many tiles there are in this tileset and thus how many different tile type there can be.
				for (var y = m; y < ih; y += th) {
					for (var x = m; x < iw; x += tw) {

						//Does the cell exist? Then use that.
						var cell = (atlas.cells[startingCell] == undefined) ? -1 : startingCell ;  

						var tileType = this.createTileType(cell);
						tileType.offset.x = offset.x;
						tileType.offset.y = offset.y;

						startingCell++; //Increase the cell to use by one.
					}
				}

				//Add tile properties
				for (var tp in tileset.tileproperties) {
					var tileType = this.tileTypes[(parseInt(tileset.firstgid) + parseInt(tp))];
					tileType.properties = tileset.tileproperties[tp];
				}

			}

		}

		/**
		* Method to set the default TileMap properties. Useful when wanting to create tilemaps programmatically.
		* @method setTo
		* @param tileWidth {Number} The width of a single tile.
		* @param tileHeight {Number} The height of a single tile.
		* @param width {Number} The width of the whole map.
		* @param height {Number} The height of the whole map.
		* @public
		*/
		public setTo(tileWidth: number, tileHeight: number, width: number, height: number) {
			this.tileWidth = tileWidth;
			this.tileHeight = tileHeight;
			this.width = width;
			this.height = height;
		}

		/**
		*-----------------------
		* Creation of Tile Types
		*-----------------------
		**/

		/**
		* Generates a single new TileType. Returns the TileType that was generated.
		* @method createTileType
		* @param [cell=-1] {Number} The cell that is to be used. Default is -1 (which means none)
		* @return {TileType} The TileType generated.
		* @public
		*/
		public createTileType(cell:number = -1):TileType {
			var tileType = new TileType(this, this.tileTypes.length, cell);
			this.tileTypes.push(tileType);

			return tileType;
		}
		
		/**
		* Creates a new TileType for each cell that you pass.
		* @method createTileTypes
		* @param cells {Number[]} The cells that you want a new TileType created for.
		* @return {TileTypes[]} The TileTypes generated.
		* @public
		*/
		public createTileTypes(cells:number[]):TileType[] {
			var types = [];
			for (var i = 0; i < cells.length; i++) {

				types.push( this.createTileType( cells[i] ) );

			}
			return types;
		}

		/**
		* Used to create a number of TileTypes based starting cell number and how many you want from there.
		* @method createTileTypesByRange
		* @param cellStart {Number} The starting number of the cell.
		* @param range {Number} How many cells (from the starting cell) should be created.
		* @return {TileTypes[]} The TileTypes generated.
		*/
		public createTileTypesByRange(cellStart: number, range: number): TileType[]{
			var types = [];
			for (var i = cellStart; i <= cellStart + range; i++) {

				types.push( this.createTileType( i ) );

			}
			return types;
		}


		/**
		*-----------------------
		* Cell Modifications
		*-----------------------
		**/

		/** 
		* Changes a single cellIndex that a TileType is to use when it is rendered.
		* @method setCell
		* @param type {number} The number of the TileType that is to change.
		* @param cell {number} The new cellIndex it should have.
		* @public
		*/
		public setCell(type: number, cell: number) {
			this.tileTypes[type].cellIndex = cell;
		}

		/** 
		* Changes a range of cellIndexs for Tiles the same range of TileTypes. 
		* @method setCellsByRange
		* @param typeStart {number} The starting TileType that is to be modified.
		* @param cellStart {number} The starting cellIndex that the first TileType should have.
		* @param range {number} How many times it should run.
		* @public
		*/
        public setCellsByRange(typeStart: number, cellStart: number, range: number) {

            for (var i = typeStart; i < typeStart + range; i++) {
                this.tileTypes[i].cellIndex = cellStart;
                cellStart++;
            }

        }

		/**
		*-----------------------
		* Creation of Tilemap Layers
		*-----------------------
		**/

		/** 
		* Creates a new TileMapLayer with the details that are provided. 
		* If no width/height/tileWidth/tileHeight parameters are passed then the values will be what this TileMap has.
		* If no 'data' is provided then the map will be automatically filled with empty Types of Tiles.
		* Returns the new TileMapLayer that was created.
		* @method createNewLayer
		* @param name {String} Name of the TileMap.
		* @param atlas {Kiwi.Textures.TextureAtlas} The TextureAtlas that this layer should use.
		* @param data {Number[]} The tile information. 
		* @param [w=this.width] {Number} The width of the whole tile map. In Tiles.
		* @param [h=this.height] {Number} The height of the whole tile map. In Tiles.
		* @param [x=0] {Number} The position of the tilemap on the x axis. In pixels.
		* @param [y=0] {Number} The position of the tilemap on the y axis. In pixels.
		* @param [tw=this.tileWidth] {Number} The width of a single tile.
		* @param [th=this.tileHeight] {Number} The height of a single tile.
        * @param [orientation] {String} The orientation of the tilemap. Defaults to the same as this TileMap.
		* @return {TileMapLayer} The TileMapLayer that was created.
		* @public
		*/
        public createNewLayer(name: string, atlas: Kiwi.Textures.TextureAtlas, data: number[] = [], w: number = this.width, h: number = this.height, x: number = 0, y: number = 0, tw: number = this.tileWidth, th: number = this.tileHeight, orientation: string=this.orientation): TileMapLayer {

			//Did the user provide enough data?
			if (data.length < w * h) {

				//No... So push empty cells instead
				var i = data.length - 1;
				while (++i < w * h) {
					data.push(0);
				}
			}

			//Create the new layer
            var layer: TileMapLayer;

            if (orientation == ISOMETRIC) {
                layer = new Kiwi.GameObjects.Tilemap.TileMapLayerIsometric(this, name, atlas, data, tw, th, x, y, w, h);
            } else {
                layer = new Kiwi.GameObjects.Tilemap.TileMapLayerOrthogonal(this, name, atlas, data, tw, th, x, y, w, h);
            }

			//Add the new layer to the array
			this.layers.push(layer);

			return layer;
		}

		createSubstitute ( tileLayer ) {
			/**
			Create a substitute buffer to accelerate rendering tiles.

			@method createSubstitute
			@param tileLayer {TileMapLayer} Layer to substitute
			**/

			var state = tileLayer.state;

			// Define resolution.
			var stepX = state.game.stage.width;
			var stepY = state.game.stage.height;

			// Assert buffering system.
			var buffers;
			if ( !state.buffers ) {
				state.buffers = new Kiwi.Buffers.Bufferer( {
					state: state,
				} );
			}
			buffers = state.buffers;

			// Create substitute host.
			var substitute = new Kiwi.Group(
				state, tileLayer.name + "-substitute" );
			( <any>substitute ).tileSampleGrid = [];
			tileLayer.parent.addChildAfter( substitute, tileLayer );

			// Create capture mechanism.
			var captureBuffer = buffers.createGroupBuffer( {
				width: stepX,
				height: stepY,
			} );

			// Create sampling grid.
			var sample;
			var textureKey;
			var x;
			var y;
			var xLimit = tileLayer.widthInPixels;
			var yLimit = tileLayer.heightInPixels;
			for ( x = 0; x * stepX < xLimit; x++ ) {
				( <any>substitute ).tileSampleGrid[ x ] = [];
				for ( y = 0; y * stepY < yLimit; y++ ) {
					captureBuffer.camera.transform.x = -x * stepX;
					captureBuffer.camera.transform.y = -y * stepY;
					textureKey = tileLayer.name + "-x" + x + "-y" + y;
					captureBuffer.drawCopy( tileLayer );
					captureBuffer.exportImage( textureKey );

					// Generate substitute.
					sample = new Kiwi.GameObjects.StaticImage(
						state,
						state.textures[ textureKey ],
						x * stepX, y * stepY );
					substitute.addChild( sample );
					( <any>substitute ).tileSampleGrid[ x ][ y ] = sample;
				}
			}

			// Disable rendering on original tiles.
			tileLayer.visible = false;

			// Set up AABB visibility acceleration on substitute host.
			var component = new Kiwi.Component(
				substitute, "Visibility Control" );
			substitute.components.add( component );
			component.update = function visibilityControlUpdate () {
				var minX, minY, maxX, maxY, x, y, sample;
				var game = this.game;
				var camera = game.cameras.defaultCamera;
				var stage = game.stage;
				var corner1 = new Kiwi.Geom.Point( 0, 0 );
				var corner2 = new Kiwi.Geom.Point( 0, stage.height );
				var corner3 = new Kiwi.Geom.Point( stage.width, 0 );
				var corner4 = new Kiwi.Geom.Point( stage.width, stage.height );
				var grid = this.owner.tileSampleGrid;
				var gridX = grid.length;
				var gridY = grid[ 0 ].length;

				// Project bounds of game camera.
				corner1 = camera.transformPoint( corner1 );
				corner2 = camera.transformPoint( corner2 );
				corner3 = camera.transformPoint( corner3 );
				corner4 = camera.transformPoint( corner4 );

				// Identify upper and lower bounds.
				minX = Math.min( corner1.x, corner2.x, corner3.x, corner4.x );
				maxX = Math.max( corner1.x, corner2.x, corner3.x, corner4.x );
				minY = Math.min( corner1.y, corner2.y, corner3.y, corner4.y );
				maxY = Math.max( corner1.y, corner2.y, corner3.y, corner4.y );

				// Hide all.
				for ( x = 0; x < gridX; x++ ) {
					for ( y = 0; y < gridY; y++ ) {
						grid[ x ][ y ].visible = false;
					}
				}

				// Reveal AABB slot.
				sample = grid[ 0 ][ 0 ];
				for (
					x = Math.floor( minX / sample.width );
					x < Math.min( gridX, Math.floor( maxX / sample.width ) + 1 );
					x++ ) {

					for (
						y = Math.floor( minY / sample.height );
						y < Math.min( gridY, Math.floor( maxY / sample.height ) + 1 );
						y++ ) {

						grid[ x ][ y ].visible = true;
					}
				}
			};
		}


		/**
		* Eventually will create a new object layer. Currently does nothing.
		* @method createNewObjectLayer
		* @public
		*/
		public createNewObjectLayer() {
			Kiwi.Log.log("OBJECT GROUP layers are currently not supported.", '#tilemap');
		}


		/**
		* Eventually will create a new image layer. Currently does nothing.
		* @method createNewObjectLayer
		* @public
		*/
		public createNewImageLayer() {
			Kiwi.Log.log("IMAGE layers are currently not supported.", '#tilemap');
		}

		/**
		*-----------------------
		* TileMapLayer Management Functions
		*-----------------------
		**/

		/**
		* Get a layer by the name that it was given upon creation.
		* Returns null if no layer with that name was found.
		* @method getLayerByName
		* @param name {String} Name of the layer you would like to select.
		* @return {TileMapLayer} Either the layer with the name passed, or null if no Layer with that name was found.
		* @public
		*/
        public getLayerByName(name: string): TileMapLayer {
			for (var i = 0; i < this.layers.length; i++) {
				if (this.layers[i].name == name) {
					return this.layers[i];
				}
			}
			return null;
		}

		/**
		* Returns the layer with the number associated with it in the layers array.
		* @method getLayer
		* @param num {Number} Number of the Layer you would like to get.
		* @return {TileMapLayer}
		* @public
		*/
        public getLayer(num: number): TileMapLayer {
			return (this.layers[num] !== undefined) ? this.layers[num] : null;
		}


		/**
		* The type of object that it is.
		* @method objType
		* @return {String} "TileMap"
		* @public
		*/
		public objType() {
			return "TileMap";
		}

	}

	export var ISOMETRIC: string = "isometric";

	export var ORTHOGONAL: string = "orthogonal";

}
