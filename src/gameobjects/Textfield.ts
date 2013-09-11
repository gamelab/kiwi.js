
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

        //TO DO - MULTIPLE LINES OF TEXT! Use an array.

        /**
         * 
         * @constructor
         * @param {String} text
         * @param {Number} x - The new x coordinate from the Position component
         * @param {Number} y - The new y coordinate from the Position component
         * @param {String} color - The color of the pixel in 0xAARRGGBB format. Default is 0xFF000000 (black).
         * @param {Number} size - Yes we know pixels don't really have a size, but on large monitors you need to pump them up a bit!
         * @param {String} weight 
         * @param {String} fontFamily
         * @return {Kiwi.GameObjects.Textfield} This Game Object.
         **/
        constructor(state: Kiwi.State, text: string, x: number = 0, y: number = 0, color: string = '#ffffff', size: number = 32, weight: string = 'normal', fontFamily: string = 'sans-serif') {

            super(state, x,y);

            this._text = text;
            this._fontWeight = weight;
            this._fontSize = size;
            this._fontColor = color;
            this._fontFamily = fontFamily;
            this._lineHeight = 1;
            this._textAlign = 'left';
            this._baseline = 'top';
            
            this.dirty = true;
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
         * The text that is to be rendered.
         * @property _text
         * @type string
         **/
        private _text: string;
        
        /**
         * The weight of the font.
         * @property _fontWeight
         * @type string
         **/
        private _fontWeight: string;

        /**
         * The size of the font.
         * @property _fontSize
         * @type number
         **/
        private _fontSize: number;

        /**
         * The color of the text.
         * @property _fontColor
         * @type string
         **/
        private _fontColor: string;

        /**
         * The font family that is to be rendered.
         * @property _fontFamily
         * @type string
         **/
        private _fontFamily: string;

        /**
         * The line height. This is a relational measurement.
         * @property _lineHeight
         * @type number
         **/
        private _lineHeight: number;

        /**
         * The alignment of the font
         * @property _textAlign
         * @type string
         **/
        private _textAlign: string;

        /**
         * The baseline of the text to be rendered.
         * @property _baseline
         * @type string
         **/
        private _baseline: string; 

        /**
         * Sets the text that is to appear.
         * @method setText
         * @param {string} value
         **/
        public set text(value: string) {
            this._text = value;
            this.dirty = true;
        }

        /*
        * Get the text that is to appear.
        * @return {string}
        */
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
            this.dirty = true;
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
            this.dirty = true;
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
            this.dirty = true;
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
            this.dirty = true;
        }

        public get fontFamily(): string {
            return this._fontFamily;
        }
        
        public static TEXTALIGN_CENTER: string = 'center';

        public static TEXTALIGN_RIGHT: string = 'right';

        public static TEXTALIGN_LEFT: string = 'left';

        /**
         * Lets you change the text alignment.
         *
         * @method textAlign
         * @param {string} val
         * @return {string} 
         **/
        public set textAlign(val: string) {
            this._textAlign = val;
            this.dirty = true;
        }

        public get textAlign(): string {
            return this._textAlign;
        }

        /**
         * Allows you to change the baseline. COMMNENTED OUT DUE TO BUG FIX
         *
         * @method baseline
         * @param {string}
         **/
        /*public set baseline(val: string) {
            this._baseline = val;
            this.dirty = true;
        }
        
        public get baseline(): string {
            return this._baseline;
        }*/

        private _tempCanvas: HTMLCanvasElement;

        private _textImage: HTMLImageElement;

        private _renderText() {
            
            //create the canvas
            this._tempCanvas = document.createElement('canvas');
            var ctxTemp: CanvasRenderingContext2D = this._tempCanvas.getContext('2d');

            //get/set the width
            ctxTemp.font = this._fontWeight + ' ' + this._fontSize + 'px ' + this._fontFamily;
            var _measurements: TextMetrics = ctxTemp.measureText(this._text);   //when you measure the text for some reason it resets the values?! 
            this._tempCanvas.width = _measurements.width;  
            this._tempCanvas.height = this._fontSize;

            //align the text
            var x:number = 0;
            switch (this._textAlign) {
                case Kiwi.GameObjects.Textfield.TEXTALIGN_CENTER:
                    x = _measurements.width / 2;
                    break;
                case Kiwi.GameObjects.Textfield.TEXTALIGN_RIGHT:
                    x = _measurements.width;
                    break;
            }
            
            //reapply the styles....cause it unapplies after a measurement...?!?
            ctxTemp.font = this._fontWeight + ' ' + this._fontSize + 'px ' + this._fontFamily;
            ctxTemp.fillStyle = this._fontColor;
            ctxTemp.textBaseline = this._baseline;
            ctxTemp.textAlign = this._textAlign;

            //add text
            ctxTemp.fillText(this._text, x, 0);

            //create the image
            this._textImage = new Image(this._tempCanvas.width, this._tempCanvas.height);
            this._textImage.src = this._tempCanvas.toDataURL("image/png");

            this.dirty = false;
        }
       
        /**
	     * Called by the Layer to which this Game Object is attached
	     * @method render
	     **/
        public render(camera:Kiwi.Camera) {
            
            if (this.alpha > 0 && this.visiblity) {

                //has the text changed at all? 
                if (this.dirty) {
                    this._renderText();
                }
                
                //render on stage
                var ctx: CanvasRenderingContext2D = this.game.stage.ctx;
                ctx.save();

                var t: Kiwi.Geom.Transform = this.transform;
                var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();

                ctx.setTransform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX, m.ty + t.rotPointY);

                if (this.alpha > 0 && this.alpha <= 1) {
                    ctx.globalAlpha = this.alpha;
                }
               
                ctx.drawImage(this._textImage, 0, 0, this._textImage.width, this._textImage.height, -t.rotPointX, -t.rotPointY, this._textImage.width, this._textImage.height);
                
                ctx.restore();
                
            }
            
        }

    }

}