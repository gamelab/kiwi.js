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

            super(true, true, false);
            
            if (cache.checkImageCacheID(cacheID, cache) == false)
            {
                console.log('Missing texture', cacheID);
                return;
            }

            //  Properties

            this.position = this.components.add(new Kiwi.Components.Position(x, y));
            this.texture = this.components.add(new Kiwi.Components.Texture(cacheID, cache));
            this.size = this.components.add(new Kiwi.Components.Size(this.texture.file.data.width, this.texture.file.data.height));
            this.bounds = this.components.add(new Kiwi.Components.Bounds(x, y, this.size.width(), this.size.height()));

            //  Signals

            this.onAddedToLayer.add(this._onAddedToLayer, this);

            this.position.updated.add(this._updatePosition, this);
            this.texture.updatedRepeat.add(this._updateRepeat, this);
            this.texture.updated.add(this._updateTexture, this);
            this.texture.position.updated.add(this._updateTexturePosition, this);
            this.size.updated.add(this._updateSize, this);

            klog.info('Created StaticImage Game Object');

        }

        public objType() {
            return "StaticImage";
        }

        /** 
	     * The Position component that controls the location of this Game Object within the game world
	     * @property position
	     * @type Kiwi.Components.Position
	     **/
        public position: Kiwi.Components.Position;

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
	     * @property _transformCSS
	     * @type String
         * @private
	     **/
        private _transformCSS: string;

         /** 
	     * 
	     * @method _updatePosition
         * @param {Number} x
         * @param {Number} y 
	     * @param {Number} z
	     **/
        private _updatePosition(x: number, y: number, z: number) {

            if (this.type === Kiwi.TYPE_DOM)
            {
                this.position.addStyleUpdates(this);
            }

            this.bounds.setTo(x, y, this.size.width(), this.size.height());

        }

        /** 
	     * 
	     * @method _updateSize
         * @param {Number} width
         * @param {Number} height
	     **/
        private _updateSize(width: number, height: number) {

            if (this.type === Kiwi.TYPE_DOM)
            {
                this.size.addStyleUpdates(this);
            }

            this.bounds.setTo(this.position.x(), this.position.y(), width, height);

        }

        /** 
	     * 
	     * @method _updateTexturePosition
         * @param {Number} x
         * @param {Number} y
	     **/
        private _updateTexturePosition(x: number, y: number) {

            if (this.type === Kiwi.TYPE_DOM)
            {
                this.addStyleUpdate('backgroundPositionX', x + 'px');
                this.addStyleUpdate('backgroundPositionY', y + 'px');
            }

        }

        /**
        *
        * @method _updateTexture
        * @param {String} value
        **/
        private _updateTexture(value: string) {
            if (this.type === Kiwi.TYPE_DOM)
            {
                this.domElement.element.style.backgroundImage = 'url("' + value + '")';
            }
            this.size.setTo(this.texture.image.width, this.texture.image.height);
        }

        /** 
	     * 
	     * @method _updateRepeat
         * @param {String} value
	     **/
        private _updateRepeat(value:string) {

            if (this.type === Kiwi.TYPE_DOM)
            {
                this.addStyleUpdate('backgroundRepeat', value);
            }

        }

	    /**
	     * Called when this Game Object is added to a Layer, usually as a result of an addChild() call or being in a Group that was added.
	     * @method _addedToLayer
	     * @param {Kiwi.Layer} layer - The Layer onto which this Game Object was added
	     * @return {Boolean} true if the Game Object was successfully added, otherwise false
	     * @private
	     **/
        private _onAddedToLayer(layer: Kiwi.Layer): bool {

            klog.info('StaticImage added to Layer: ' + layer.name + ' type: ' + this.type);

            if (this.type === Kiwi.TYPE_DOM)
            {
                this.domElement.element.style.backgroundImage = 'url("' + this.texture.getURL() + '")';
                this.domElement.element.style.backgroundRepeat = this.texture.repeat();
                this.domElement.element.style.backgroundSize = '100%';
                this.size.addStyleImmediately(this);
                this.position.addStyleImmediately(this);
                klog.info('StaticImage DOM set');
            }

            return true;

        }

        /**
	     * Called by the Layer to which this Game Object is attached
	     * @method render
	     **/
        public render(camera: Kiwi.Camera) {

            super.render(camera);

            if (this.type === Kiwi.TYPE_CANVAS && this.willRender() === true)
            {
                if (this.bounds.showDebug === true)
                {
                    this.bounds.drawCanvasDebugOutline(this.layer);
                }

                this.layer.canvas.context.drawImage(this.texture.image, this.position.x(), this.position.y(), this.size.width(), this.size.height());

            }

        }


    }

}