/// <reference path="../core/Game.ts" />
/// <reference path="../core/Layer.ts" />

/**
 *  Kiwi - Utils - Canvas
 *
 *  @desc       Creates a canvas DOM element and adds it to a Layer
 *
 *	@version 	1.0 - March 9th 2013
 *	@author 	Richard Davey
 *  @url        http://www.kiwijs.org
 */

//////////NOTE OFFSCREEN DOES NOTHING


module Kiwi.Utils {

    export class Canvas {

        /** 
        * 
        * @constructor
        * @param {Kiwi.Layer} layer 
        * @param {Number} width
        * @param {Number} height
        * @param {Boolean} visible
        * @param {Boolean} offScreen
        * @return {Kiwi.Utils.Canvas}
        **/
        constructor (layer: Kiwi.Layer, width: number, height: number, visible: bool = true, offScreen: bool = false) {

            if (layer === null && offScreen === false)
            {
                klog.warn('Cannot create a canvas on a null layer');
                return;
            }

            this._layer = layer;

            this.domElement = <HTMLCanvasElement> document.createElement('canvas');
            this.domElement.width = width;
            this.domElement.height = height;

            this.size = new Kiwi.Components.Size(width, height);
            this.size.updated.add(this._updatedSize, this);

            this.context = this.domElement.getContext('2d');

            this._offScreen = offScreen;
            this._visible = visible;

            if (visible === false)
            {
                this.domElement.style.display = 'none';
            }

        }

        public objType() {
            return "Canvas";
        }

        /**
        * @property _layer
        * @type Kiwi.Layer
        * @private
    	*/
        private _layer: Kiwi.Layer;

        /**
        * @property domElement
        * @type HTMLCanvasElement
	    */
        public domElement = <HTMLCanvasElement> null;

        /**
        * @property _context
        * @type CanvasRenderingContext2D
	    */
        public context = <CanvasRenderingContext2D> null;

        /**
        * @property _visible
        * @type Boolean
        * @private
	    */
        private _visible = true;

        /**
        * @property _offScreen
        * @type Boolean
        * @private
	    */
        private _offScreen = false;

        /**
        * @property _clearMode
        * @type Number
        * @private
	    */
        private _clearMode: number = 1;

        /**
        * @property CLEARMODE_NONE
        * @type Number
        * @static
		*/
        public static CLEARMODE_NONE: number = 0;

        /**
        * @property CLEARMODE_CLEARRECT
        * @type Number
        * @static
		*/
        public static CLEARMODE_CLEARRECT: number = 1;

        /**
        * @property CLEARMODE_FILLRECT 
        * @type Number
        * @static
		*/
        public static CLEARMODE_FILLRECT: number = 2;

        /**
        * @property CLEARMODE_FILLRECT_ALPHA
        * @type Number
        * @static
		*/
        public static CLEARMODE_FILLRECT_ALPHA: number = 3;

        /**
        * @property bgColor
        * @type String
        */
        //  swap for color component?
        public bgColor = 'rgb(0, 0, 0)';

        /**
        * @property size
        * @type Kiwi.Components.Size
        */
        public size: Kiwi.Components.Size;

        /**
        * @method _updatedSize
        * @param {Number} width
        * @param {Number} height
        * @private
        */
        private _updatedSize(width: number, height: number) {

            this.domElement.width = width;
            this.domElement.height = height;
            this.size.dirty = false;

        }

        /**
        * @method destroy
		*/
        public destroy() {

            if (this._offScreen === false)
            {
                this.domElement.style.display = 'none';
                this._layer.domContainer.removeChild(this.domElement);
            }

        }

        /**
        * @method visible
        * @param {Boolean} value
        * @return {Boolean}
        */
        public visible(value: bool = null): bool {

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

            return this._visible;

        }

        /** 
        * Gets 
        * @method clearMode
        * @return {Number} 
        */
        public clearMode(value:number = null): number {

            if (value !== null && value !== this._clearMode && value >= Kiwi.Utils.Canvas.CLEARMODE_NONE && value <= Kiwi.Utils.Canvas.CLEARMODE_FILLRECT_ALPHA)
            {
                this._clearMode = value;
            }

            return this._clearMode;

        }

        /**
        * @method clear
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
        * @method saveAsPNG
        * @return String
		*/
        public saveAsPNG() {

            return this.domElement.toDataURL();

        }

	    /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} a string representation of the instance.
	     **/
	    toString():string {
		
		    return '[{Canvas (width=' + this.size.width() + ' height=' + this.size.height() + ' visible=' + this.visible + ' offScreen=' + this._offScreen + ' clearMode=' + this.clearMode + ')}]';

	    }

    }

}