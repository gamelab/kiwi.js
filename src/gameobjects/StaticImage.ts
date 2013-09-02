/// <reference path="../core/Game.ts" />
/// <reference path="../core/Entity.ts" />
/// <reference path="../core/State.ts" />

/*
 *	Kiwi - GameObjects - StaticImage
 *				
 *	@desc		An extremely light-weight entity consisting of just a single image with position
 *
 *	@version	1.1 - 5th March 2013
 *
 *	@author 	Richard Davey
 *
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.GameObjects {

    export class StaticImage extends Kiwi.Entity {

        /**
        * 
        * @constructor
        * @param {Kiwi.Textures.TextureAtlas} atlas
        * @param {Number} x
        * @param {Number} y
        * @return {StaticImage}
        */
        constructor(atlas: Kiwi.Textures.TextureAtlas, x: number = 0, y: number = 0) {

            super();
            
            //Set coordinates and texture
            this.atlas = atlas;
            this.cellIndex = this.atlas.cellIndex;
            this.transform.x = x;
            this.transform.y = y;
            this.width = atlas.cells[0].w;
            this.height = atlas.cells[0].h;
            this.transform.rotPointX = this.width / 2;
            this.transform.rotPointY = this.height / 2;
            
            this.box = this.components.add(new Kiwi.Components.Box(x, y, this.width, this.height));
           
        }

        /*
        * Returns the type of object that this is.
        * @method objType
        * @return {string}
        */
        public objType(): string {
            return "Sprite";
        }

        /** 
         * The Bounds component that controls the bounding box around this Game Object
         * @property bounds
         * @type Kiwi.Components.Bounds
         **/
        public box: Kiwi.Components.Box;

	  

        /**
	     * Called by the Layer to which this Game Object is attached
	     * @method render
	     **/
        public render(camera: Kiwi.Camera) {
            
            super.render(camera);

            //if it is would even be visible.
            if (this.alpha > 0 && this.visiblity) {

                var ctx: CanvasRenderingContext2D = this.game.stage.ctx;
                ctx.save();

                if (this.alpha > 0 && this.alpha <= 1) {
                    ctx.globalAlpha = this.alpha;
                }

                //get entity/view matrix
                var t: Kiwi.Geom.Transform = this.transform;
                var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
                
                ctx.setTransform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX, m.ty + t.rotPointY);

                //ctx.fillStyle = "green";
                //ctx.fillRect(-2, -2, 5, 5);

                var cell = this.atlas.cells[this.cellIndex];
                ctx.drawImage(this.atlas.image, cell.x, cell.y, cell.w, cell.h, -t.rotPointX, -t.rotPointY, cell.w, cell.h);
                ctx.restore();
            
            }
        }


    }

}