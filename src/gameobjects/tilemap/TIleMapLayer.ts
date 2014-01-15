/**
* 
* @module GameObjects
* @submodule Tilemap
* 
*/

module Kiwi.GameObjects.Tilemap {


    //Not to be directly instantated.
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

        }

        public tilemap: Kiwi.GameObjects.Tilemap.TileMap;

        public properties: any = {};

        public width: number;

        public height: number;

        public tileWidth: number;

        public tileHeight: number;

        public atlas: Kiwi.Textures.TextureAtlas;

        public get widthInPixels(): number {
            return this.width * this.tilemap.tileWidth;
        }

        public get heightInPixels(): number {
            return this.height * this.tilemap.tileHeight;
        }


        private _data: number[];

        public getIndexFromXY(x: number, y: number):number {
            return x + y * this.width;
        }

        //Update loop.
        public update() {

        }

        private _maxX: number;
        private _maxY: number;
        private _startX: number;
        private _startY: number;

        //Render loop.
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

            //Transform
            var t: Kiwi.Geom.Transform = this.transform;
            var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();

            ctx.transform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX - camera.transform.rotPointX, m.ty + t.rotPointY - camera.transform.rotPointY);
            
            //  Work out how many tiles we can fit into our camera and round it up for the edges
            this._maxX = Math.min(Math.ceil(camera.width / this.tileWidth) + 1, this.width);
            this._maxY = Math.min(Math.ceil(camera.height / this.tileHeight) + 1, this.height);

            //  And now work out where in the tilemap the camera actually is
            this._startX = Math.floor((-camera.transform.x - t.x) / this.tileWidth);
            this._startY = Math.floor((-camera.transform.y - t.y) / this.tileHeight);

            //boundaries check 
            if (this._startX < 0) this._startX = 0;
            if (this._startY < 0) this._startY = 0;

            if (this._maxX > this.width) this._maxX = this.width;
            if (this._maxY > this.height) this._maxY = this.height;

            if (this._startX + this._maxX > this.width) this._maxX = this.width - this._startX;
            if (this._startY + this._maxY > this.height) this._maxY = this.height - this._startY;
            

            for (var y = this._startY; y < this._startY + this._maxY; y++) {
                
                for (var x = this._startX; x < this._startX + this._maxX; x++) {

                    var index = this.getIndexFromXY(x, y);
                    var type = this._data[index];

                    if (type !== undefined && this.tilemap.tileTypes[type].cellIndex !== -1 ) {

                        var cell = this.atlas.cells[this.tilemap.tileTypes[type].cellIndex];

                        ctx.drawImage(
                            this.atlas.image,
                            cell.x,
                            cell.y,
                            cell.w,
                            cell.h,
                            x * this.tileWidth,
                            y * this.tileHeight,
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
