/**
* Kiwi - GameObjects
* @module Kiwi
* @submodule GameObjects 
* 
*/ 
 
module Kiwi.GameObjects {
    
    /**
    * Textfield is a GameObject that is used when you are wanting to render text onto the current State. The Textfield is not designed to have any interaction with other GameObjects and as such it does not have many (if any) components or even a width/height.
    *
    * @class Textfield
    * @namespace Kiwi.GameObjects
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

            if (this.game.renderOption === Kiwi.RENDERER_WEBGL) {
                this.glRenderer = this.game.renderer.requestSharedRenderer("TextureAtlasRenderer");
            }

            this._text = text;
            this._fontWeight = weight;
            this._fontSize = size;
            this._fontColor = color;
            this._fontFamily = fontFamily;
            this._textAlign = 'left';
            this._baseline = 'top';
            
            this._tempDirty = true;

            //Create the canvas
            this._canvas = document.createElement('canvas');
            this._canvas.width = 2;
            this._canvas.height = 2;
            this._ctx = this._canvas.getContext('2d');

            //Add it to the TextureLibrary
            this.atlas = new Kiwi.Textures.SingleImage(this.game.rnd.uuid(), this._canvas);
            this.state.textureLibrary.add(this.atlas);
            this.atlas.dirty = true;

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
            this._tempDirty = true;
      
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
            this._tempDirty = true;
   
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
            this._tempDirty = true;
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
            this._tempDirty = true;
          
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
            this._tempDirty = true;
      
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
            this._tempDirty = true;
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
        * The canvas element which the text is rendered onto. 
        * @property _canvas
        * @type HTMLCanvasElement.
        * @private
        */
        private _canvas: HTMLCanvasElement;

        /**
        * The context for the canvas element. Used whilst rendering text.
        * @property _ctx
        * @type CanvasRenderingContext2D
        * @private
        */
        private _ctx: CanvasRenderingContext2D;

        /**
        * If the temporary canvas is dirty and needs to be re-rendered. Only used when the text field rendering is being optimised.
        * @property _tempDirty
        * @type boolean
        */
        private _tempDirty: boolean = true;


        /**
        * This method is used to render the text to an offscreen-canvas which is held in a TextureAtlas (which is generated upon the instanitation of this class). 
        * This is so that the canvas doesn't render it every frame as it can be costly and so that it can be used in WebGL with the TextureAtlasRenderer.
        *
        * @method _renderText
        * @private
        */
        private _renderText() {
            
           
            //Get/Set the width
            this._ctx.font = this._fontWeight + ' ' + this._fontSize + 'px ' + this._fontFamily;


            //Get the size of the text.
            var _measurements: TextMetrics = this._ctx.measureText(this._text);   //when you measure the text for some reason it resets the values?! 
            var width = _measurements.width;
            var height = this._fontSize * 1.3; //Need to find a better way to calculate


            //Is the width base2?
            if (Kiwi.Utils.Common.base2Sizes.indexOf(width) == -1) {
                var i = 0;
                while (width > Kiwi.Utils.Common.base2Sizes[i]) i++;
                width = Kiwi.Utils.Common.base2Sizes[i];
            }

            //Is the height base2?
            if (Kiwi.Utils.Common.base2Sizes.indexOf(height) == -1) {
                var i = 0;
                while (height > Kiwi.Utils.Common.base2Sizes[i]) i++;
                height = Kiwi.Utils.Common.base2Sizes[i];
            }
            

            //Apply the width/height
            this._canvas.width = width;  
            this._canvas.height = height;

            
            //Reapply the styles....cause it unapplies after a measurement...?!?
            this._ctx.font = this._fontWeight + ' ' + this._fontSize + 'px ' + this._fontFamily;
            this._ctx.fillStyle = this._fontColor;
            this._ctx.textBaseline = this._baseline;

            //Draw the text.
            this._ctx.fillText(this._text, 0, 0);

            

            //Update the cell and dirty/undirtyfiy
            this.atlas.cells[0] = { x: 0, y: 0, w: this._canvas.width, h: this._canvas.height };
            this._tempDirty = false;
            this.atlas.dirty = true;
        }
        
        /**
	    * Called by the Layer to which this Game Object is attached
	    * @method render
        * @param {Camera}
        * @public
	    */
        public render(camera:Kiwi.Camera) {
            
            if (this.alpha > 0 && this.visible) {

                //render on stage
                var ctx: CanvasRenderingContext2D = this.game.stage.ctx;
                ctx.save();

                var t: Kiwi.Geom.Transform = this.transform;
                if (this.alpha > 0 && this.alpha <= 1) {
                    ctx.globalAlpha = this.alpha;
                }

                //Does the text need re-rendering
                if (this._tempDirty) this._renderText();

                //Align the text
                var x = 0;
                switch (this._textAlign) {
                    case Kiwi.GameObjects.Textfield.TEXT_ALIGN_LEFT:
                        x = 0;
                        break;
                    case Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER:
                        x = this._canvas.width * 0.5;
                        break;
                    case Kiwi.GameObjects.Textfield.TEXT_ALIGN_RIGHT:
                        x = this._canvas.width;
                        break;
                }


                //Draw the Image
                var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
                var ct: Kiwi.Geom.Transform = camera.transform;

                ctx.transform(m.a, m.b, m.c, m.d, (m.tx - x) + t.rotPointX - ct.rotPointX, m.ty + t.rotPointY - ct.rotPointY);
                ctx.drawImage(this._canvas, 0, 0, this._canvas.width, this._canvas.height, -t.rotPointX, -t.rotPointY, this._canvas.width, this._canvas.height);
                

                ctx.restore();
                
            }
            
        }


        public renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params: any = null) {
            
            //Does the text need re-rendering
            if (this._tempDirty) this._renderText();


            //Set-up the xyuv and alpha
            var vertexItems = [];
            


            //Transform/Matrix
            var t: Kiwi.Geom.Transform = this.transform;
            var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();

            //See where the text should be.
            var x = 0;
            switch (this._textAlign) {
                case Kiwi.GameObjects.Textfield.TEXT_ALIGN_LEFT:
                    x = 0;
                    break;
                case Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER:
                    x = -(this._canvas.width * 0.5);
                    break;
                case Kiwi.GameObjects.Textfield.TEXT_ALIGN_RIGHT:
                    x = -(this._canvas.width);
                    break;
            }


            //Create the Point Objects.
            var pt1 = new Kiwi.Geom.Point(x - t.rotPointX, 0 - t.rotPointY);
            var pt2 = new Kiwi.Geom.Point(this._canvas.width + x - t.rotPointX , 0 - t.rotPointY);
            var pt3 = new Kiwi.Geom.Point(this._canvas.width + x - t.rotPointX , this._canvas.height - t.rotPointY);
            var pt4 = new Kiwi.Geom.Point(x - t.rotPointX, this._canvas.height - t.rotPointY);


            //Add on the matrix to the points
            pt1 = m.transformPoint(pt1);
            pt2 = m.transformPoint(pt2);
            pt3 = m.transformPoint(pt3);
            pt4 = m.transformPoint(pt4);


            //Append to the xyuv and alpha arrays 
            vertexItems.push(
                pt1.x + t.rotPointX, pt1.y + t.rotPointY, 0, 0, this.alpha,                                             //Top Left Point
                pt2.x + t.rotPointX, pt2.y + t.rotPointY, this._canvas.width, 0, this.alpha,                            //Top Right Point
                pt3.x + t.rotPointX, pt3.y + t.rotPointY, this._canvas.width, this._canvas.height, this.alpha,          //Bottom Right Point
                pt4.x + t.rotPointX, pt4.y + t.rotPointY, 0, this._canvas.height, this.alpha                            //Bottom Left Point
                );
            //Add to the batch!
            (<Kiwi.Renderers.TextureAtlasRenderer>this.glRenderer).concatBatch(vertexItems);
        }
    }

}