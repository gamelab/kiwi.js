/**
* 
* @module Kiwi
* @submodule Utils
*/
module Kiwi.Utils {

    /**
    * Creates and the manages a Canvas DOMElement.
    * 
    * @class Canvas
    * @namespace Kiwi.Utils
    * @constructor
    * @param width {Number} The width of the canvas.
    * @param height {Number} The height of the canvas.
    * @param [visible=true] {boolean} If the canvas is visible or not.
    * @param [offScreen=false] {boolean} If the canvas is designed to be offscreen or not.
    * @return {Canvas} 
    *
    */
    export class Canvas {
         
        constructor (width: number, height: number, visible: boolean = true, offScreen: boolean = false) {

          

            this.domElement = <HTMLCanvasElement> document.createElement('canvas');
            this.domElement.width = width;
            this.domElement.height = height;

            this._width = width;
            this._height = height;

            this.context = this.domElement.getContext('2d');

            this._offScreen = offScreen;
            this._visible = visible;

            if (visible === false)
            {
                this.domElement.style.display = 'none';
            }

        }

        /**
        * The width of this canvas.
        * @property _width
        * @type number
        * @private
        */
        private _width: number;

        /**
        * The width of this canvas.
        * @property width
        * @type number
        * @public
        */
        public set width(value: number) {
            this._width = value;
            this._updatedSize();
        }
        public get width(): number {
            return this._width;
        }

        /**
        * The height of this canvas.
        * @property _height
        * @type number
        * @private
        */
        private _height: number;

        /**
        * The height of this canvas.
        * @property height
        * @type number
        * @private
        */
        public set height(value: number) {
            this._height = value;
            this._updatedSize();
        }
        public get height(): number {
            return this._height;
        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Canvas";
        }

        /**
        * The canvas DOM element.
        * @property domElement
        * @type HTMLCanvasElement
        * @public
	    */
        public domElement = <HTMLCanvasElement> null;

        /**
        * The 2D rendering context that is used to render anything to this canvas.
        * @property _context
        * @type CanvasRenderingContext2D
	    * @public
        */
        public context = <CanvasRenderingContext2D> null;

        /**
        * If the canvas element is visible or not.
        * @property _visible
        * @type boolean
        * @private
	    */
        private _visible = true;

        /**
        * If the canvas is offscreen or not.
        * @property _offScreen
        * @type boolean
        * @private
	    */
        private _offScreen = false;

        /**
        * The method to use when clearing the canvas.
        * @property _clearMode
        * @type Number
        * @private
	    */
        private _clearMode: number = 1;

        /**
        * A STATIC property that holds the number associated with no clear mode.
        * @property CLEARMODE_NONE
        * @type Number
        * @static
        * @final
        * @default 0
        * @public
		*/
        public static CLEARMODE_NONE: number = 0;

        /**
        * A STATIC property that holds the number associated with the clear mode that uses the clearRect method to clear the canvas.
        * @property CLEARMODE_CLEARRECT
        * @type Number
        * @static
        * @final
        * @public
        * @default 1
		*/
        public static CLEARMODE_CLEARRECT: number = 1;

        /**
        * A STATIC property that holds the number associated with the clear mode that uses a filled rectangle to clear the canvas.
        * @property CLEARMODE_FILLRECT 
        * @type Number
        * @static
        * @final
        * @public
        * @default 2
		*/
        public static CLEARMODE_FILLRECT: number = 2;

        /**
        * A STATIC property that holds the number associated with the clear mode that uses the filled alpha rectangle method.
        * @property CLEARMODE_FILLRECT_ALPHA
        * @type Number
        * @static
        * @final
        * @public
        * @default 3
		*/
        public static CLEARMODE_FILLRECT_ALPHA: number = 3;

        /**
        * The background color to use clearing the canvas using a filled rectangle approach.
        * @property bgColor
        * @type String
        * @default 'rgb(0,0,0)'
        * @public
        */
        public bgColor = 'rgb(0, 0, 0)';

        /**
        * Updates the width/height on the canvas DOM element when either one of its sizes are updated.
        * @method _updatedSize
        * @private
        */
        private _updatedSize() {

            this.domElement.width = this._width;
            this.domElement.height = this._height;

        }

        /**
        * Used to remove the canvas element completely along with this class. [NEEDS IMPLEMENTATION]
        * @method destroy
        * @public
		*/
        public destroy() {

            if (this._offScreen === false)
            {
                this.domElement.style.display = 'none';
              
            }

        }

        /**
        * If the canvas element is visible or not.
        * @property visible
        * @type boolean
        * @default true
        * @public
        */
        public set visible(value: boolean) {

            if (value !== null && value !== this._visible)
            {
                this._visible = value;

                if (value === true)
                {
                    this.domElement.style.display = 'block';

                }
                else
                {
                    this.domElement.style.display = 'none';
                }
            }

        }
        public get visible(): boolean {

            return this._visible;

        }

        /** 
        * The clearmode the is to be used when clearing the canvas.
        * @property clearMode
        * @type Number
        * @default 1
        * @public 
        */
        public set clearMode(value: number) {

            if (value !== null && value !== this._clearMode && value >= Kiwi.Utils.Canvas.CLEARMODE_NONE && value <= Kiwi.Utils.Canvas.CLEARMODE_FILLRECT_ALPHA)
            {
                this._clearMode = value;
            }

        }
        public get clearMode(): number {

            return this._clearMode;

        }

        /**
        * Clears the canvas using the method specified by the clearMode property.
        * @method clear
        * @public
		*/
        public clear() {
            
		    if (this._clearMode === Canvas.CLEARMODE_NONE)
		    {
                //  Do nothing
		    }
		    else if (this._clearMode === Canvas.CLEARMODE_CLEARRECT)
		    {
                //  Clear Rect
			    this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);
			    
		    }
		    else if (this._clearMode === Canvas.CLEARMODE_FILLRECT)
		    {
                //  Fill Rect Solid
			    this.context.fillStyle = this.bgColor;
			    this.context.fillRect(0, 0, this.domElement.width, this.domElement.height);
                
		    }
		    else if (this._clearMode === Canvas.CLEARMODE_FILLRECT_ALPHA)
		    {
                //  Clear Rect + Fill Rect (only use if bgColor contains alpha < 255)
			    this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);
			    this.context.fillStyle = this.bgColor;
			    this.context.fillRect(0, 0, this.domElement.width, this.domElement.height);
		    }

        }

        /**
        * Returns the canvas current image data as PNG.
        * @method saveAsPNG
        * @return String
        * @public
		*/
        public saveAsPNG() {

            return this.domElement.toDataURL();

        }

	    /**
	    * Returns a string representation of this object.
	    * @method toString
	    * @return {string} a string representation of the instance.
        * @public
	    */
	    public toString():string {
		
		    return '[{Canvas (width=' + this.width + ' height=' + this.height + ' visible=' + this.visible + ' offScreen=' + this._offScreen + ' clearMode=' + this.clearMode + ')}]';

	    }

    }

}