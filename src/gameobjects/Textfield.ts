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
         * @constructor
         * @param {Number} x - The new x coordinate from the Position component
         * @param {Number} y - The new y coordinate from the Position component
         * @param {Number} width - The width of the text area
         * @param {Number} height - The height of the text area
         * @param {Number} color - The color of the pixel in 0xAARRGGBB format. Default is 0xFF000000 (black).
         * @param {Number} size - Yes we know pixels don't really have a size, but on large monitors you need to pump them up a bit!
         * @return {Kiwi.GameObjects.Textfield} This Game Object.
         **/
        constructor(text: string, x: number = 0, y: number = 0, width: number = 200, height: number = 100, color: string = '#ffffff', size: number = 32, weight: string = 'normal', fontFamily: string = 'cursive') {

            super();

            this.position = this.components.add(new Kiwi.Components.Position(x, y));
            //this.bounds = this.components.add(new Kiwi.Components.Bounds(x, y, size, size));
            this.alpha = this.components.add(new Kiwi.Components.Alpha(1));
            this.size = this.components.add(new Kiwi.Components.Size(width, height));

            this.setText(text);
            this._fontWeight = weight;
            this._fontSize = size;
            this._fontColor = color;
            this._fontFamily = fontFamily;
            this._lineHeight = 1;
            this._textAlign = 'left';

            //  Signals

            this.alpha.updated.add(this._updateAlpha, this);
            this.onAddedToLayer.add(this._onAddedToLayer, this);
            this.position.updated.add(this._updatePosition, this);
            this.size.updated.add(this._updateSize, this);

            klog.info('Created Textfield Game Object');

        }

        /*
        * Returns the type of object that this is
        * @method objType
        * @param {string}
        */
        public objType() {
            return "Textfield";
        }

        /** 
         * The Alpha component that controls the opacity of this Game Object
         * @property alpha
         * @type Kiwi.Components.Alpha
         **/
        public alpha: Kiwi.Components.Alpha;

        /**
         * The Size component that controls the width/height of this Game Object
         * @property size
         * @type Kiwi.Components.Size
         **/
        public size: Kiwi.Components.Size;

        /**
         * The text that is to be rendered.
         **/
        private _text: string;
        
        /**
         * Exploded version of the text
         **/
        private _explodedText: string[];

        /**
         * The weight of the font.
         **/
        private _fontWeight: string;

        /**
         * The size of the font.
         **/
        private _fontSize: number;

        /**
         * The color of the text.
         **/
        private _fontColor: string;

        /**
         * The font family that is to be rendered.
         **/
        private _fontFamily: string;

        /**
         * The line height. This is a relational measurement.
         **/
        private _lineHeight: number;

        /**
         * The alignment of the font
         **/
        private _textAlign: string;

        /**
         * Sets the text that is to appear.
         * 
         * @method setText
         * @param {string} value
         **/
        public setText(value: string) {

            this._text = value;
            this._explodedText = this._text.split(" ");
       
        }

        /**
         * Callback that runs when the size updates
         * @method _updateSize
         **/
        private _updateSize() {

          
        }

        /**
         * Allows the setting of the font colour if a parameter has been passed. 
         * Returns the current font colour.
         * 
         * @method fontColor
         * @param {string} val
         * @return {string} 
         **/
        public fontColor(val?: string):string {
            if (val !== undefined) {
                this._fontColor = val;
            }
            return this._fontColor;
        }

        /**
         * Allows the changing of the font weight. Returns the current font weight.
         * 
         * @method fontWeight
         * @param {string} val
         * @return {string}
         **/
        public fontWeight(val?: string):string {
            if (val !== undefined) {
                this._fontWeight = val;
            }
            return this._fontWeight;
        }

        /**
         * Changes the font size if a parameter is passed. Returns the current font size.
         * 
         * @method fontSize
         * @param {number} val
         * @return {number}
         **/
        public fontSize(val?: number):number {
            if (val !== undefined) {
                    
                this._fontSize = val;
            }
            return this._fontSize;
        }

        /**
         * Allows the modification of the font family. Returns the current font family.
         * 
         * @method fontFamily
         * @param {string} val
         * @return {string}
         **/
        public fontFamily(val?: string):string {
            if (val !== undefined) {
                this._fontFamily = val;
            }
            return this._fontFamily;
        }

        /**
         * Modify the spacing between lines in the textfield. This is a relative messurement that is in relation to your font-size.
         * Example: If you font size is 18px and your line height is 1.5 then each line will be roughly 18 * 1.5 = 27 pixels high.
         * 
         * @method lineHeight
         * @param {number} val
         * @return {number}
         **/
        public lineHeight(val?: number):number {
            if (val !== undefined) {
                this._lineHeight = val;
            }
            return this._lineHeight;
        }

        /**
         * Lets you change the text alignment.
         *
         * @method textAlign
         * @param {string} val
         * @return {string} 
         **/
        public textAlign(val?: string):string {
            if (val !== undefined) {
                this._textAlign = val;
            }
            return this._textAlign;
        }

         /** 
	     * Callback that runs when the alpha component gets modified.
	     * @method _updateAlpha
         * @param {Number} value
	     **/
        private _updateAlpha(value: number) {

          

        }

        /** 
	     * The Position component that controls the location of this Game Object within the game world
	     * @property position
	     * @type Kiwi.Components.Position
	     **/
        public position: Kiwi.Components.Position;

        /** 
	     * The Bounds component that controls the bounding box around this Game Object
	     * @property bounds
	     * @type Kiwi.Components.Bounds
	     **/
        //public bounds: Kiwi.Components.Bounds;

        /**
	     * Called when this Game Object is added to a Layer, usually as a result of an addChild() call or being in a Group that was added.
	     * @method _onAddedToLayer
	     * @param {Kiwi.Layer} layer - The Layer onto which this Game Object was added
	     * @return {Boolean} true if the Game Object was successfully added, otherwise false
	     * @private
	     **/
        private _onAddedToLayer(layer: Kiwi.Layer): bool {

            klog.info('Textfield added to Layer ' + layer.name);

          

            return true;
        }

        private _updatePosition(x: number, y: number, z: number, cssTranslate3d: string, cssLeft: string, cssTop: string) {

           

        }

        /**
	     * Called by the Layer to which this Game Object is attached
	     * @method render
	     **/
        public render(camera:Kiwi.Camera) {

            super.render(camera);

            if (this.willRender() === true)
            {

                if (this.alpha.alpha() > 0 && this.alpha.alpha() <= 1)
                {
                    this.layer.canvas.context.save();
                    this.alpha.setContext(this.layer.canvas);
                }

                this.layer.canvas.context.font = this._fontWeight + ' ' + this._fontSize + 'px ' + this._fontFamily;
                this.layer.canvas.context.textAlign = this._textAlign;
                this.layer.canvas.context.textBaseline = 'top';
                this.layer.canvas.context.fillStyle = this._fontColor;

                var dx = this.position.x();
                var dy = this.position.y();
                var textWidth = this.layer.canvas.context.measureText(this._text);
                
                // Render the text like normal
                if (this._textAlign === 'center') {
                    dx += this.size.halfWidth;
                } else if (this._textAlign === 'right') {
                    dx += this.size.width();
                } 

                if (this.size.width() < textWidth.width ) {
                    
                    var text = '';
                    for (var i = 0; i < this._explodedText.length; i++) {

                        if (this.layer.canvas.context.measureText((text + this._explodedText[i])).width < this.size.width()) {
                            text += this._explodedText[i] + ' ';
                        } else {
                            this.layer.canvas.context.fillText(text, dx, dy);
                            dy += (this._fontSize * this._lineHeight);
                            text = this._explodedText[i] + ' ';
                        }
                    }
                    this.layer.canvas.context.fillText(text, dx, dy);
                    
                } else {
                    this.layer.canvas.context.fillText(this._text, dx, dy);
                }

                if (this.alpha.alpha() > 0 && this.alpha.alpha() <= 1)          
                {
                    this.layer.canvas.context.restore();
                }
            }

        }

    }

}