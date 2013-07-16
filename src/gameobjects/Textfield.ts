/// <reference path="../components/Position.ts" />

/**
 *	Kiwi - GameObjects - Textfield
 *				
 *	@desc		
 *
 *	@version	1.1 - 1st March 2013
 *
 *	@author 	Richard Davey
 *
 *	@url		http://www.kiwijs.org
 *
 **/

module Kiwi.GameObjects {

    export class Textfield extends Kiwi.Entity {

        /**
	     * 
	     * @param {Number} x - The new x coordinate from the Position component
	     * @param {Number} y - The new y coordinate from the Position component
	     * @param {Number} color - The color of the pixel in 0xAARRGGBB format. Default is 0xFF000000 (black).
	     * @param {Number} size - Yes we know pixels don't really have a size, but on large monitors you need to pump them up a bit! (defaults to 1)
	     * @return {Kiwi.GameObjects.Pixel} This Game Object.
	     **/
        constructor(text: string, x: number = 0, y: number = 0, color: string = '#ffffff', size: string = '32px', weight:string = 'none') {

            super(true, true, false);

            this.position = this.components.add(new Kiwi.Components.Position(x, y));
            //this.bounds = this.components.add(new Kiwi.Components.Bounds(x, y, size, size));
            this.alpha = this.components.add(new Kiwi.Components.Alpha(1));

            this._text = text;
            this._fontWeight = weight;
            this._fontSize = size;
            this._fontColor = color;
            this._fontFamily = 'Arial';

            //  Signals

            this.alpha.updated.add(this._updateAlpha, this);
            this.onAddedToLayer.add(this._onAddedToLayer, this);
            this.position.updated.add(this._updatePosition, this);

            klog.info('Created Textfield Game Object');

        }

        public objType() {
            return "Textfield";
        }

        /** 
	     * The Alpha component that controls the opacity of this Game Object
	     * @property alpha
	     * @type Kiwi.Components.Alpha
	     **/
        public alpha: Kiwi.Components.Alpha;

        private _text: string;
        private _fontWeight: string;
        private _fontSize: string;
        private _fontColor: string;
        private _fontFamily: string;

        public setText(value: string) {

            this._text = value;

            if (this.type === Kiwi.TYPE_DOM)
            {
                this.domElement.element.innerHTML = this._text;
            }

        }

         /** 
	     * 
	     * @method _updateAlpha
         * @param {Number} value
	     **/
        private _updateAlpha(value: number) {

            if (this.type === Kiwi.TYPE_DOM)
            {
                this.alpha.addStyleUpdates(this);
            }

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
	     * Called when this Game Object is added to a Layer, usually as a result of an addChild() call or being in a Group that was added.
	     * @method _onAddedToLayer
	     * @param {Kiwi.Layer} layer - The Layer onto which this Game Object was added
	     * @return {Boolean} true if the Game Object was successfully added, otherwise false
	     * @private
	     **/
        private _onAddedToLayer(layer: Kiwi.Layer): bool {

            klog.info('Textfield added to Layer ' + layer.name);

            if (this.type === Kiwi.TYPE_DOM)
            {
                this.domElement.element.style.fontFamily = this._fontFamily;
                this.domElement.element.style.fontSize = this._fontSize;
                this.domElement.element.style.fontWeight = this._fontWeight;
                this.domElement.element.style.color = this._fontColor;
                this.domElement.element.innerHTML = this._text;

                this.position.addStyleImmediately(this);
                this.alpha.addStyleImmediately(this);
            }

            return true;

        }

        private _updatePosition(x: number, y: number, z: number, cssTranslate3d: string, cssLeft: string, cssTop: string) {

            if (this.type === Kiwi.TYPE_DOM)
            {
                this.position.addStyleUpdates(this);
            }

            //this.bounds.setTo(x, y, this._pixelSize, this._pixelSize);

        }

        /**
	     * Called by the Layer to which this Game Object is attached
	     * @method render
	     **/
        public render(camera:Kiwi.Camera) {

            super.render(camera);

            if (this.type === Kiwi.TYPE_CANVAS && this.willRender() === true)
            {
                          if (this.alpha.alpha() > 0 && this.alpha.alpha() <= 1)

                {
                    this.layer.canvas.context.save();
                    this.alpha.setContext(this.layer.canvas);
                }

                this.layer.canvas.context.font = this._fontWeight + ' ' + this._fontSize + ' ' + this._fontFamily;
                this.layer.canvas.context.textAlign = 'left'
                this.layer.canvas.context.textBaseline = 'top'
                this.layer.canvas.context.fillStyle = this._fontColor;
                this.layer.canvas.context.fillText(this._text, this.position.x(), this.position.y());
                if (this.alpha.alpha() > 0 && this.alpha.alpha() <= 1)

          
                {
                    this.layer.canvas.context.restore();
                }
            }

        }

    }

}