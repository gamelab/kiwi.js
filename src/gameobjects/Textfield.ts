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
        constructor(text: string, x: number = 0, y: number = 0, color: string = '#ffffff', size: number = 32, weight: string = 'normal', fontFamily: string = 'cursive') {

            super();

            this.transform.x = x;
            this.transform.y = y;
            this.alpha = this.components.add(new Kiwi.Components.Alpha(1));

            this._text = text;
            this._fontWeight = weight;
            this._fontSize = size;
            this._fontColor = color;
            this._fontFamily = fontFamily;
            this._lineHeight = 1;
            this._textAlign = 'left';
            this._baseline = 'top';

            this.onAddedToLayer.add(this._onAddedToLayer, this);

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
         * The text that is to be rendered.
         **/
        private _text: string;
        
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
         * The baseline of the text to be rendered.
         **/
        private _baseline: string; 

        /**
         * Sets the text that is to appear.
         * 
         * @method setText
         * @param {string} value
         **/
        public set text(value: string) {
            this._text = value;
        
        }

        public get text(): string {
            return this._text;
        }

        /**
         * Allows the setting of the font colour if a parameter has been passed. 
         * Returns the current font colour.
         * 
         * @method fontColor
         * @param {string} val
         * @return {string} 
         **/
        public set color(val: string) {
            this._fontColor = val;
        }

        public get color(): string {
            return this._fontColor;
        }

        /**
         * Allows the changing of the font weight. Returns the current font weight.
         * 
         * @method fontWeight
         * @param {string} val
         * @return {string}
         **/
        public set fontWeight(val: string) {
            this._fontWeight = val;
        }

        public get fontWeight(): string {
            return this._fontWeight;
        }

        /**
         * Changes the font size if a parameter is passed. Returns the current font size.
         * 
         * @method fontSize
         * @param {number} val
         * @return {number}
         **/
        public set fontSize(val: number) {
            this._fontSize = val;
        }

        public get fontSize(): number {
            return this._fontSize;
        }

        /**
         * Allows the modification of the font family. Returns the current font family.
         * 
         * @method fontFamily
         * @param {string} val
         * @return {string}
         **/
        public set fontFamily(val: string) {
            this._fontFamily = val;
        }

        public get fontFamily(): string {
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
        public set lineHeight(val: number) {
            this._lineHeight = val;
        }
        
        public get lineHeight(): number {
            return this._lineHeight;
        }

        /**
         * Lets you change the text alignment.
         *
         * @method textAlign
         * @param {string} val
         * @return {string} 
         **/
        public set textAlign(val: string) {
            this._textAlign = val;
        }

        public get textAlign(): string {
            return this._textAlign;
        }

        /**
         * Allows you to change the baseline.
         *
         * @method baseline
         * @param {string}
         **/
        public set baseline(val: string) {
            this._baseline = val;
        }
        
        public get baseline(): string {
            return this._baseline;
        }

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

        /**
	     * Called by the Layer to which this Game Object is attached
	     * @method render
	     **/
        public render(camera:Kiwi.Camera) {
            

            if (this.willRender() === true && this.alpha.alpha() > 0)
            {
                var ctx: CanvasRenderingContext2D = this.game.stage.ctx;
                ctx.save();

                var m: Kiwi.Geom.Matrix = this.transform.getConcatenatedMatrix();
                ctx.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);

                if (this.alpha.alpha() > 0 && this.alpha.alpha() <= 1) {
                    ctx.globalAlpha = this.alpha.alpha();
                }

                ctx.font = this._fontWeight + ' ' + this._fontSize + 'px ' + this._fontFamily;
                ctx.textAlign = this._textAlign;
                ctx.textBaseline = this._baseline;
                ctx.fillStyle = this._fontColor;

                ctx.fillText(this._text, 0, 0);
                
                ctx.restore();
                
            }
            
        }

    }

}