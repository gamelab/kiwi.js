/**
* Kiwi - GameObjects
* @module Kiwi
* @submodule GameObjects 
* 
*/ 

module Kiwi.GameObjects {

    /**
    * A light weight game object for displaying static images (such as backgrounds) that would have little or no interaction with other game objects.
    *
    * @class StaticImage
    * @extends Entity
    * @constructor
    * @param state {State} The state that this static image belongs to 
    * @param atlas {TextureAtlas} The texture atlas to use as the image.
    * @param [x=0] {Number} Its coordinates on the x axis
    * @param [y=0] {Number} The coordinates on the y axis
    * @return {StaticImage}
    */
    export class StaticImage extends Kiwi.Entity {

        constructor(state: Kiwi.State, atlas: Kiwi.Textures.TextureAtlas, x: number = 0, y: number = 0) {

            super(state,x,y);
            
            //Set coordinates and texture
            this.atlas = atlas;
            this.cellIndex = this.atlas.cellIndex;
            this.width = atlas.cells[0].w;
            this.height = atlas.cells[0].h;
            this.transform.rotPointX = this.width / 2;
            this.transform.rotPointY = this.height / 2;
            
            this.box = this.components.add(new Kiwi.Components.Box(this, x, y, this.width, this.height));
           
        }

        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType(): string {
            return "Sprite";
        }

        /** 
        * The Bounds component that controls the bounding box around this Game Object
        * @property bounds
        * @type Bounds
        * @public
        */
        public box: Kiwi.Components.Box;

        /**
	    * Called by the Layer to which this Game Object is attached
	    * @method render
        * @param {Camara} camera
        * @public
	    */
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