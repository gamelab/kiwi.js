/// <reference path="../components/Position.ts" />
/// <reference path="../components/Color.ts" />

/**
 *	Kiwi - GameObjects - Pixel
 *				
 *	@desc		An extremely light weight game object consisting of just a single pixel with position and color components.
 *
 *	@version	1.1 - 1st March 2013
 *
 *	@author 	Richard Davey
 *
 *	@url		http://www.kiwijs.org
 *
 **/

module Kiwi.GameObjects {

    export class Pixel extends Kiwi.Entity {

        /**
	     * Creates an extremely light weight Game Object consisting of just a single pixel with position and color components.
	     * @param {Number} x - The new x coordinate from the Position component
	     * @param {Number} y - The new y coordinate from the Position component
	     * @param {Number} color - The color of the pixel in 0xAARRGGBB format. Default is 0xFF000000 (black).
	     * @param {Number} size - Yes we know pixels don't really have a size, but on large monitors you need to pump them up a bit! (defaults to 1)
	     * @return {Kiwi.GameObjects.Pixel} This Game Object.
	     **/
        constructor(x: number = 0, y: number = 0, color: number = 0xFF000000, size: number = 1) {

            super(true, true, false);

            this.position = this.components.add(new Kiwi.Components.Position(x, y));
            this.bounds = this.components.add(new Kiwi.Components.Bounds(x, y, size, size));
            this.color = this.components.add(new Kiwi.Components.Color());
            this.color.setColor(color);

            this._pixelSize = size;

            this.onAddedToLayer.add(this._onAddedToLayer, this);
            this.position.updated.add(this._updatePosition, this);
            this.color.updated.add(this._updateColor, this);

            klog.info('Created Pixel Game Object');

        }

        public objType() {
            return "Pixel";
        }

        /** 
	     * The Position component that controls the location of this Game Object within the game world
	     * @property position
	     * @type Kiwi.Components.Position
	     **/
        public position: Kiwi.Components.Position;

        /** 
	     * The Color component that controls the color of this pixel
	     * @property color
	     * @type Kiwi.Components.Color
	     **/
        public color: Kiwi.Components.Color;

        /** 
	     * The Boounds component that controls the bounding box around this Game Object
	     * @property bounds
	     * @type Kiwi.Components.Bounds
	     **/
        public bounds: Kiwi.Components.Bounds;

        /**
	     * Called when this Game Object is added to a Layer, usually as a result of an addChild() call or being in a Group that was added.
	     * @method _onAddedToLayer
	     * @param {Kiwi.Layer} layer - The Layer onto which this Game Object was added
	     * @return {Boolean} true if the Game Object was successfully added, otherwise false
	     * @private
	     **/
        private _onAddedToLayer(layer: Kiwi.Layer): bool {

            klog.info('Pixel added to Layer ' + layer.name);

            if (this.type === Kiwi.TYPE_DOM)
            {
                this.domElement.element.style.width = this._pixelSize + 'px';
                this.domElement.element.style.height = this._pixelSize + 'px';

                this.position.addStyleImmediately(this);
                this.color.addStyleImmediately(this);
            }

            return true;

        }

        /** 
	     * Because sometimes 1 just isn't enough
	     * @property _pixelSize
	     * @type Number
	     * @private
	     **/
        private _pixelSize: number;

        /**
	     * Called when this Game Object receives a Signal from the Position component
	     * @method _updatePosition
	     * @param {Number} x - The new x coordinate from the Position component
	     * @param {Number} y - The new y coordinate from the Position component
	     * @param {Number} z - The new z coordinate from the Position component
	     * @param {String} cssTranslate3d - The updated translate3d CSS style
	     * @param {String} cssLeft - The updated left CSS style
	     * @param {String} cssTop - The updated top CSS style
	     * @private
	     **/
        private _updatePosition(x: number, y: number, z: number, cssTranslate3d: string, cssLeft: string, cssTop: string) {

            if (this.type === Kiwi.TYPE_DOM)
            {
                this.position.addStyleUpdates(this);
            }

            this.bounds.setTo(x, y, this._pixelSize, this._pixelSize);

        }

        /**
	     * Called when this Game Object receives a Signal from the Color component
	     * @method _updatePosition
	     * @private
	     **/
        private _updateColor() {

            if (this.type === Kiwi.TYPE_DOM)
            {
                this.color.addStyleUpdates(this);
            }

        }

        /**
	     * Called by the State to which this Game Object is attached
	     * @method update
	     **/
        public update() {
            //  Nothing to do for this Game Object, it's all handled by the signals
        }

        /**
	     * Called by the Layer to which this Game Object is attached
	     * @method render
	     **/
        public render(camera: Kiwi.Camera) {

            super.render(camera);

            if (this.type === Kiwi.TYPE_CANVAS && this.willRender() === true)
            {
                this.layer.canvas.context.fillStyle = this.color.cssColorRGB;
                this.layer.canvas.context.fillRect(this.position.x(), this.position.y(), this._pixelSize, this._pixelSize);
            }

        }

    }

}