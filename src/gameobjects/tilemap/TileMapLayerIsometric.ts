/**
* 
* @module GameObjects
* @submodule Tilemap
* 
*/

module Kiwi.GameObjects.Tilemap {


	/**
    * Contains the code for managing and rendering Isometric types of TileMaps. 
    * This class should not be directly created, but instead should be created via methods on the TileMap class.
    *
	* 
	* @class TileMapLayerIsometric
	* @extends Kiwi.GameObjects.Tilemap.TileMapLayer
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
    export class TileMapLayerIsometric extends TileMapLayer {

        constructor(tilemap: Kiwi.GameObjects.Tilemap.TileMap, name: string, atlas: Kiwi.Textures.TextureAtlas, data: number[], tw: number, th: number, x: number = 0, y: number = 0, w: number = 0, h: number = 0) {

            super(tilemap, name, atlas, data, tw, th, x, y, w, h);

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
		* The orientation of the of tilemap. 
		* TileMaps can be either 'orthogonal' (normal) or 'isometric'.
		* @property orientation
		* @type String
		* @default 'isometric'
		* @public
		*/
        public orientation: string = ISOMETRIC;

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
            
            //Not within the bounds?
            var halfWidth = this.widthInPixels * 0.5;

            if (x > this.x + halfWidth || x < this.x - halfWidth) return -1;
            if (y > this.y + this.heightInPixels || y < this.y) return -1;



            var point = this.screenToChart({ x: x, y: y });

            return this.getIndexFromXY(point.x, point.y);

        }


		/** 
		* ChartToScreen maps a point in the game tile coordinates into screen pixel
		* coordinates that indicate where the tile should be drawn.
		*
		* @method chartToScreen
		* @param chartPt {any} A Object containing x/y properties of the tile.
		* @param [tileW] {Number} The width of the tile
		* @param [tileH] {Number} The height of the tile
		* @return {Object} With x/y properties of the location of the map onscreen.
		* @public
		*/
        public chartToScreen(chartPt: any, tileW: number = this.tileWidth, tileH: number = this.tileHeight): any {

            return {
                x: (chartPt.x - chartPt.y) * tileW * 0.5,
                y: (chartPt.x + chartPt.y) * tileH * 0.5
            };

        }

		/**
		* ScreenToChart maps a point in screen coordinates into the game tile chart
		* coordinates for the tile on which the screen point falls on.
		*
		* @method screenToChart
		* @param scrPt {any} An object containing x/y coordinates of the point on the screen you want to convert to tile coordinates.
		* @param [tileW] {Number} The width of a single tile.
		* @param [tileH] {Number} The height of a single tile.
		* @return {Object} With x/y properties of the location of tile on the screen.
		* @public
		*/
        public screenToChart(scrPt: any, tileW: number=this.tileWidth, tileH: number=this.tileHeight): any {
            var column = Math.floor( scrPt.x / (tileW * 0.5) );
            var row = Math.floor( ( scrPt.y - column * ( tileH / 2 ) ) / tileH);
            return {
                x: column + row,
                y: row
            };
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

            ctx.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);

            this._calculateBoundaries(camera, m);

            for (var y = this._startY; y < this._maxY; y++) {
                for (var x = this._startX; x < this._maxX; x++) {

                    if ((this._temptype = this.getTileFromXY(x, y)) && this._temptype.cellIndex !== -1) {

                        var cell = this.atlas.cells[this._temptype.cellIndex];

                        var offsetX = this._temptype.offset.x;
                        var offsetY = this._temptype.offset.y;
                        var w = this.tileWidth * (this.width * 2 - 1);
                        var h = this.tileHeight * this.height;

                        // We want <0,0>'s horizontal center point to be in the screen center, hence the -tileWidth/2.
                        var shiftX = this.tileWidth / 2;

                        var screenPos = this.chartToScreen(
                            { x: x, y: y },
                            this.tileWidth,
                            this.tileHeight);

                        var drawX: number = screenPos.x + this._temptype.offset.x - shiftX;
                        var drawY: number = screenPos.y - (cell.h - this.tileHeight) + this._temptype.offset.y;


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

            //Transform/Matrix
            var t: Kiwi.Geom.Transform = this.transform;
            var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix(); 


            //Find which ones we need to render.
            this._calculateBoundaries(camera, m);

            //Loop through the tiles.
            for (var y = this._startY; y < this._maxY; y++) {
                for (var x = this._startX; x < this._maxX; x++) {
					

                    //Get the tile type
                    this._temptype = this.getTileFromXY(x, y);


                    //Skip tiletypes that don't use a cellIndex.
                    if (this._temptype.cellIndex == -1) continue;

					
                    //Get the cell index
                    var cell = this.atlas.cells[this._temptype.cellIndex];

                    // Isometric maps
                    var offsetX = this._temptype.offset.x;
                    var offsetY = this._temptype.offset.y;
                    var w = this.tileWidth * (this.width * 2 - 1);
                    var h = this.tileHeight * this.height;
						
                    // We want <0,0>'s horizontal center point to be in the screen center, hence the -tileWidth/2.
                    var shiftX = this.tileWidth / 2;

                    var screenPos = this.chartToScreen(
                        { x: x, y: y },
                        this.tileWidth,
                        this.tileHeight);

                    var tx = screenPos.x + this._temptype.offset.x - shiftX;
                    var ty = screenPos.y + this._temptype.offset.y;


                    //Set up the points
                    this._corner1.setTo(tx - t.rotPointX, ty - t.rotPointY - (cell.h - this.tileHeight));
                    this._corner2.setTo(tx + cell.w - t.rotPointX, ty - t.rotPointY - (cell.h - this.tileHeight));
                    this._corner3.setTo(tx + cell.w - t.rotPointX, ty + cell.h - t.rotPointY - (cell.h - this.tileHeight));
                    this._corner4.setTo(tx - t.rotPointX, ty + cell.h - t.rotPointY - (cell.h - this.tileHeight));


                    //Add on the matrix to the points
                    m.transformPoint(this._corner1);
                    m.transformPoint(this._corner2);
                    m.transformPoint(this._corner3);
                    m.transformPoint(this._corner4);


                    //Append to the xyuv array
                    vertexItems.push(
                        this._corner1.x + t.rotPointX, this._corner1.y + t.rotPointY, cell.x, cell.y, this.alpha,                   //Top Left Point
                        this._corner2.x + t.rotPointX, this._corner2.y + t.rotPointY, cell.x + cell.w, cell.y, this.alpha,          //Top Right Point
                        this._corner3.x + t.rotPointX, this._corner3.y + t.rotPointY, cell.x + cell.w, cell.y + cell.h, this.alpha, //Bottom Right Point
                        this._corner4.x + t.rotPointX, this._corner4.y + t.rotPointY, cell.x, cell.y + cell.h, this.alpha           //Bottom Left Point
                        );
                }
            }

            //Concat points to the Renderer.
            (<Kiwi.Renderers.TextureAtlasRenderer>this.glRenderer).concatBatch(vertexItems);
        }

    }
}

