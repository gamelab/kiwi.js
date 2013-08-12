/// <reference path="../core/Game.ts" />
/// <reference path="../core/Entity.ts" />
/// <reference path="../core/State.ts" />
/// <reference path="../components/Position.ts" />
/// <reference path="../components/Texture.ts" />

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
        * @param {String} cacheID
        * @param {Kiwi.Cache} cache
        * @param {Number} x
        * @param {Number} y
        * @return {StaticImage}
        */
        constructor(cacheID: string, cache: Kiwi.Cache, x: number = 0, y: number = 0) {

            super();
            
            if (cache.checkImageCacheID(cacheID, cache) == false)
            {
                console.log('Missing texture', cacheID);
                return;
            }

            //  Properties

            this.transform.x = x;
            this.transform.y = y;
            this.texture = this.components.add(new Kiwi.Components.Texture(cacheID, cache));
            this.size = this.components.add(new Kiwi.Components.Size(this.texture.file.data.width, this.texture.file.data.height));
            this.bounds = this.components.add(new Kiwi.Components.Bounds(x, y, this.size.width(), this.size.height()));

            //  Signals

            this.onAddedToLayer.add(this._onAddedToLayer, this);

            this.texture.updated.add(this._updateTexture, this);
            this.size.updated.add(this._updateSize, this);

            klog.info('Created StaticImage Game Object');

        }

        public objType() {
            return "StaticImage";
        }

        /** 
	     * The Boounds component that controls the bounding box around this Game Object
	     * @property bounds
	     * @type Kiwi.Components.Bounds
	     **/
        public bounds: Kiwi.Components.Bounds;

        /** 
	     * 
	     * @property texture
	     * @type Kiwi.Components.Texture
	     **/
        public texture: Kiwi.Components.Texture;

        /** 
	     * 
	     * @property size
	     * @type Kiwi.Componenets.Size
	     **/
        public size: Kiwi.Components.Size;

        /** 
	     * 
	     * @method _updateSize
         * @param {Number} width
         * @param {Number} height
	     **/
        private _updateSize(width: number, height: number) {

            this.bounds.setTo(this.transform.x, this.transform.y, width, height);

        }

        /**
        *
        * @method _updateTexture
        * @param {String} value
        **/
        private _updateTexture(value: string) {
           
            this.size.setTo(this.texture.image.width, this.texture.image.height);
        }

	    /**
	     * Called when this Game Object is added to a Layer, usually as a result of an addChild() call or being in a Group that was added.
	     * @method _addedToLayer
	     * @param {Kiwi.Layer} layer - The Layer onto which this Game Object was added
	     * @return {Boolean} true if the Game Object was successfully added, otherwise false
	     * @private
	     **/
        private _onAddedToLayer(layer: Kiwi.Layer): bool {

            klog.info('StaticImage added to Layer: ' + layer.name);

            return true;

        }

        /**
	     * Called by the Layer to which this Game Object is attached
	     * @method render
	     **/
        public render(camera: Kiwi.Camera) {
            
            if (this.visiblity && this.alpha > 0) {
                var ctx: CanvasRenderingContext2D = this.game.stage.ctx;
                ctx.save();

                if (this.alpha > 0 && this.alpha <= 1) {
                    ctx.globalAlpha = this.alpha;
                }

                var m: Kiwi.Geom.Matrix = this.transform.getConcatenatedMatrix();
                ctx.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);

                ctx.drawImage(this.texture.image, 0, 0, this.size.width(), this.size.height());
                ctx.restore();
            }
        }


    }

}