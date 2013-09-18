/**
* Kiwi - GameObjects
* @module Kiwi
* @submodule GameObjects 
* 
*/ 
 
module Kiwi.GameObjects {
    
    /**
    *
    *
    * @class Textfield
    * @extends Entity
    * @constructor
    * @param state {State} The state that this Textfield belongs to
    * @param text {String} The text that is contained within this textfield.
    * @param [x=0] {Number} The new x coordinate from the Position component
    * @param [y=0] {Number} The new y coordinate from the Position component
    * @param [color='#000000'] {String} The color of the text. 
    * @param [size=32] {Number} The size of the text in pixels.
    * @param [weight='normal'] {String} The weight of the text.
    * @param [fontFamily='sans-serif'] {String} The font family that is to be used when rendering.
    * @return {Textfield} This Game Object.
    */
    export class Textfield extends Kiwi.Entity {

        constructor(state: Kiwi.State, text: string, x: number = 0, y: number = 0, color: string = '#000000', size: number = 32, weight: string = 'normal', fontFamily: string = 'sans-serif') {

            super(state, x,y);

            this._text = text;
            this._fontWeight = weight;
            this._fontSize = size;
            this._fontColor = color;
            this._fontFamily = fontFamily;
            this._textAlign = 'left';
            this._baseline = 'top';
            
            this.dirty = true;
        }

        /**
        * Returns the type of object that this is
        * @method objType
        * @return {string}
        * @public
        */
        public objType() {
            return "Textfield";
        }

        /**
        * The text that is to be rendered.
        * @property _text
        * @type string
        * @private
        */
        private _text: string;
        
        /**
        * The weight of the font.
        * @property _fontWeight
        * @type string
        * @default 'normal'
        * @private
        */
        private _fontWeight: string;

        /**
        * The size of the font.
        * @property _fontSize
        * @type number
        * @default 32
        * @private
        */
        private _fontSize: number;

        /**
        * The color of the text.
        * @property _fontColor
        * @type string
        * @default '#000000'
        * @private
        */
        private _fontColor: string;

        /**
        * The font family that is to be rendered.
        * @property _fontFamily
        * @type string
        * @default 'sans-serif'
        * @private
        */
        private _fontFamily: string;

        /**
        * The alignment of the text. This can either be 'left', 'right' or 'center'
        * @property _textAlign
        * @type string
        * @default 'center'
        * @private
        */
        private _textAlign: string;

        /**
        * The baseline of the text to be rendered.
        * @property _baseline
        * @type string
        * @private
        */
        private _baseline: string; 

        /**
        * The text that you would like to appear in this textfield.
        * @property text
        * @type string
        * @public
        */
        public set text(value: string) {
            this._text = value;
            this.dirty = true;
        } 
        public get text(): string {
            return this._text;
        }

        /**
        * The color of the font that is contained in this textfield.
        * @property color
        * @type string
        * @public
        */
        public set color(val: string) {
            this._fontColor = val;
            this.dirty = true;
        } 
        public get color(): string {
            return this._fontColor;
        }

        /**
        * The weight of the font.
        * @property fontWeight
        * @type string
        * @public
        */
        public set fontWeight(val: string) {
            this._fontWeight = val;
            this.dirty = true;
        }
        public get fontWeight(): string {
            return this._fontWeight;
        }

        /**
        * The size on font when being displayed onscreen.
        * @property fontSize
        * @type number
        * @public
        */
        public set fontSize(val: number) {
            this._fontSize = val;
            this.dirty = true;
        } 
        public get fontSize(): number {
            return this._fontSize;
        }

        /**
        * The font family that is being used to render the text.
        * @property fontFamily 
        * @type string
        * @public
        */
        public set fontFamily(val: string) {
            this._fontFamily = val;
            this.dirty = true;
        } 
        public get fontFamily(): string {
            return this._fontFamily;
        }
        
        /**
        * A static property that contains the string to center align the text.
        * @property TEXT_ALIGN_CENTER
        * @type string
        * @static
        * @final
        * @public
        */
        public static TEXT_ALIGN_CENTER: string = 'center';
        
        /**
        * A static property that contains the string to right align the text.
        * @property TEXT_ALIGN_RIGHT
        * @type string
        * @static
        * @final
        * @public
        */
        public static TEXT_ALIGN_RIGHT: string = 'right';
        
        /**
        * A static property that contains the string to left align the text.
        * @property TEXT_ALIGN_LEFT
        * @type string
        * @static
        * @final
        * @public
        */
        public static TEXT_ALIGN_LEFT: string = 'left';

        /**
        * Changes the alignment of the text. You can either use the static TEXT_ALIGN constants or pass a string.
        * @type string
        * @public
        */
        public set textAlign(val: string) {
            this._textAlign = val;
            this.dirty = true;
        }
        
        /**
        * Returns a string containing the text alignment for this textfield.
        * @type string
        * @public
        */
        public get textAlign(): string {
            return this._textAlign;
        }

        /**
        * A temporary property that we use to render the actual text to and then get the information from.
        * @property _tempCanvas
        * @type HTMLCanvasElement.
        * @private
        */
        private _tempCanvas: HTMLCanvasElement;

        /**
        * The HTMLImageElement which has the text rendered as an image once the _tempCanvas has generated it. 
        * @property _textImage
        * @type HTMLImageElement
        * @private
        */
        private _textImage: HTMLImageElement;

        /**
        * This method is used to render the text to a off-screen canvas, which is then saved as a HTMLImageElement. 
        * This is so that the canvas doesn't render it every frame as it can be costly.
        *
        * @method _renderText
        * @private
        */
        private _renderText() {
            
            //create the canvas
            this._tempCanvas = document.createElement('canvas');
            var ctxTemp: CanvasRenderingContext2D = this._tempCanvas.getContext('2d');

            //get/set the width
            ctxTemp.font = this._fontWeight + ' ' + this._fontSize + 'px ' + this._fontFamily;
            var _measurements: TextMetrics = ctxTemp.measureText(this._text);   //when you measure the text for some reason it resets the values?! 
            this._tempCanvas.width = _measurements.width;  
            this._tempCanvas.height = this._fontSize * 1.3; //for the characters that fall below the baseline. Should find better implementation.

            
            //reapply the styles....cause it unapplies after a measurement...?!?
            ctxTemp.font = this._fontWeight + ' ' + this._fontSize + 'px ' + this._fontFamily;
            ctxTemp.fillStyle = this._fontColor;
            ctxTemp.textBaseline = this._baseline;

            //add text
            ctxTemp.fillText(this._text, 0.5, 0.5);

            //create the image
            this._textImage = new Image(this._tempCanvas.width, this._tempCanvas.height);
            this._textImage.src = this._tempCanvas.toDataURL("image/png");

            this.dirty = false;
        }
       
        /**
	    * Called by the Layer to which this Game Object is attached
	    * @method render
        * @param {Camera}
        * @public
	    */
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

                if (this.alpha > 0 && this.alpha <= 1) {
                    ctx.globalAlpha = this.alpha;
                }
                
                //align the text
                var x = 0;
                switch (this._textAlign) {
                    case Kiwi.GameObjects.Textfield.TEXT_ALIGN_LEFT:
                        x = 0;
                        break;
                    case Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER:
                        x = this._textImage.width / 2;
                        break;
                    case Kiwi.GameObjects.Textfield.TEXT_ALIGN_RIGHT:
                        x = this._textImage.width;
                        break;
                }

                //add the alignment to the transformation
                t.x -= x;
                var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();

                ctx.setTransform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX, m.ty + t.rotPointY);
                ctx.drawImage(this._textImage, 0, 0, this._textImage.width, this._textImage.height, -t.rotPointX, -t.rotPointY, this._textImage.width, this._textImage.height);
                
                //remove it again.
                t.x += x;

                ctx.restore();
                
            }
            
        }

    }

}